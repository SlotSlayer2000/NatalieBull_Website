from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date, time


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    service: str
    message: str


# Booking Models
class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    client_email: str
    client_phone: Optional[str] = None
    service: str
    booking_date: str  # Format: YYYY-MM-DD
    time_slot: str  # Format: HH:MM (start time)
    notes: Optional[str] = None
    status: str = "confirmed"  # confirmed, cancelled, completed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    client_name: str
    client_email: str
    client_phone: Optional[str] = None
    service: str
    booking_date: str  # Format: YYYY-MM-DD
    time_slot: str  # Format: HH:MM
    notes: Optional[str] = None

class BookingUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


# Blog Models
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    featured_image: Optional[str] = None
    status: str = "draft"  # draft, published
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    published_at: Optional[datetime] = None

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    featured_image: Optional[str] = None
    status: str = "draft"

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    featured_image: Optional[str] = None
    status: Optional[str] = None


# Available time slots (excluding lunch 12:30-13:30)
AVAILABLE_SLOTS = [
    "09:30", "10:30", "11:30",  # Morning slots
    "13:30", "14:30", "15:30", "16:30"  # Afternoon slots (after lunch)
]

def get_slot_end_time(start_time: str) -> str:
    """Get end time for a 1-hour slot"""
    hour = int(start_time.split(":")[0])
    minute = start_time.split(":")[1]
    return f"{hour + 1:02d}:{minute}"


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Natalie C Bull Counselling API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact form endpoint
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input: ContactSubmissionCreate):
    """Submit a contact form inquiry"""
    contact_dict = input.model_dump()
    contact_obj = ContactSubmission(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_submissions.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for submission in submissions:
        if isinstance(submission['timestamp'], str):
            submission['timestamp'] = datetime.fromisoformat(submission['timestamp'])
    
    return submissions


# Booking endpoints
@api_router.get("/bookings/slots")
async def get_available_slots():
    """Get all available time slots configuration"""
    slots = []
    for slot in AVAILABLE_SLOTS:
        slots.append({
            "start": slot,
            "end": get_slot_end_time(slot),
            "display": f"{slot} - {get_slot_end_time(slot)}"
        })
    return {"slots": slots}

@api_router.get("/bookings/availability/{date_str}")
async def get_availability_for_date(date_str: str):
    """Get available slots for a specific date"""
    # Validate date format
    try:
        booking_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Check if date is in the past
    today = datetime.now(timezone.utc).date()
    if booking_date < today:
        return {"date": date_str, "available_slots": [], "message": "Cannot book past dates"}
    
    # Check if it's a weekend
    if booking_date.weekday() >= 5:  # Saturday = 5, Sunday = 6
        return {"date": date_str, "available_slots": [], "message": "Not available on weekends"}
    
    # Get existing bookings for this date
    existing_bookings = await db.bookings.find(
        {"booking_date": date_str, "status": {"$ne": "cancelled"}},
        {"_id": 0, "time_slot": 1}
    ).to_list(100)
    
    booked_slots = [b["time_slot"] for b in existing_bookings]
    
    # Build available slots
    available_slots = []
    for slot in AVAILABLE_SLOTS:
        # If booking is for today, check if slot time has passed
        if booking_date == today:
            slot_hour = int(slot.split(":")[0])
            slot_minute = int(slot.split(":")[1])
            current_time = datetime.now(timezone.utc)
            # Add buffer time (e.g., can't book within 1 hour)
            if current_time.hour > slot_hour or (current_time.hour == slot_hour and current_time.minute > slot_minute):
                continue
        
        is_available = slot not in booked_slots
        available_slots.append({
            "start": slot,
            "end": get_slot_end_time(slot),
            "display": f"{slot} - {get_slot_end_time(slot)}",
            "available": is_available
        })
    
    return {"date": date_str, "available_slots": available_slots}

@api_router.post("/bookings", response_model=Booking)
async def create_booking(input: BookingCreate):
    """Create a new booking"""
    # Validate date
    try:
        booking_date = datetime.strptime(input.booking_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Check if date is in the past
    today = datetime.now(timezone.utc).date()
    if booking_date < today:
        raise HTTPException(status_code=400, detail="Cannot book past dates")
    
    # Check if it's a weekend
    if booking_date.weekday() >= 5:
        raise HTTPException(status_code=400, detail="Not available on weekends")
    
    # Validate time slot
    if input.time_slot not in AVAILABLE_SLOTS:
        raise HTTPException(status_code=400, detail="Invalid time slot")
    
    # Check if slot is already booked
    existing = await db.bookings.find_one({
        "booking_date": input.booking_date,
        "time_slot": input.time_slot,
        "status": {"$ne": "cancelled"}
    })
    
    if existing:
        raise HTTPException(status_code=409, detail="This time slot is already booked")
    
    # Create booking
    booking_dict = input.model_dump()
    booking_obj = Booking(**booking_dict)
    
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_all_bookings(status: Optional[str] = None, from_date: Optional[str] = None):
    """Get all bookings (admin endpoint)"""
    query = {}
    
    if status:
        query["status"] = status
    
    if from_date:
        query["booking_date"] = {"$gte": from_date}
    
    bookings = await db.bookings.find(query, {"_id": 0}).sort("booking_date", 1).to_list(1000)
    
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get a specific booking"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if isinstance(booking.get('created_at'), str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return booking

@api_router.patch("/bookings/{booking_id}", response_model=Booking)
async def update_booking(booking_id: str, update: BookingUpdate):
    """Update a booking (admin endpoint)"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    
    if update_data:
        await db.bookings.update_one({"id": booking_id}, {"$set": update_data})
    
    updated_booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if isinstance(updated_booking.get('created_at'), str):
        updated_booking['created_at'] = datetime.fromisoformat(updated_booking['created_at'])
    
    return updated_booking

@api_router.delete("/bookings/{booking_id}")
async def cancel_booking(booking_id: str):
    """Cancel a booking"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    await db.bookings.update_one({"id": booking_id}, {"$set": {"status": "cancelled"}})
    
    return {"message": "Booking cancelled successfully", "id": booking_id}


# Blog endpoints
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(status: Optional[str] = None):
    """Get all blog posts"""
    query = {}
    if status:
        query["status"] = status
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for post in posts:
        if isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
        if isinstance(post.get('published_at'), str):
            post['published_at'] = datetime.fromisoformat(post['published_at'])
    
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post.get('published_at'), str):
        post['published_at'] = datetime.fromisoformat(post['published_at'])
    
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    """Create a new blog post"""
    # Check if slug exists
    existing = await db.blog_posts.find_one({"slug": input.slug})
    if existing:
        raise HTTPException(status_code=409, detail="A post with this slug already exists")
    
    post_dict = input.model_dump()
    post_obj = BlogPost(**post_dict)
    
    if input.status == "published":
        post_obj.published_at = datetime.now(timezone.utc)
    
    doc = post_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    if doc.get('published_at'):
        doc['published_at'] = doc['published_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post_obj

@api_router.patch("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, update: BlogPostUpdate):
    """Update a blog post"""
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    
    # Set published_at when publishing
    if update_data.get("status") == "published" and post.get("status") != "published":
        update_data["published_at"] = datetime.now(timezone.utc).isoformat()
    
    if update_data:
        await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    if isinstance(updated_post.get('created_at'), str):
        updated_post['created_at'] = datetime.fromisoformat(updated_post['created_at'])
    if isinstance(updated_post.get('published_at'), str):
        updated_post['published_at'] = datetime.fromisoformat(updated_post['published_at'])
    
    return updated_post

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    post = await db.blog_posts.find_one({"id": post_id})
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    await db.blog_posts.delete_one({"id": post_id})
    
    return {"message": "Post deleted successfully", "id": post_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
