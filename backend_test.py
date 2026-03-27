import requests
import sys
from datetime import datetime, timedelta
import json

class BookingAPITester:
    def __init__(self, base_url="https://care-connect-375.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.test_booking_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(str(response_data)) < 500:
                        print(f"   Response: {response_data}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "endpoint": endpoint
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e),
                "endpoint": endpoint
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_available_slots_config(self):
        """Test getting available slots configuration"""
        success, response = self.run_test("Available Slots Config", "GET", "bookings/slots", 200)
        if success and 'slots' in response:
            slots = response['slots']
            expected_slots = ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30"]
            actual_slots = [slot['start'] for slot in slots]
            if actual_slots == expected_slots:
                print("   ✅ Correct time slots (lunch break excluded)")
                return True
            else:
                print(f"   ❌ Wrong slots. Expected: {expected_slots}, Got: {actual_slots}")
        return False

    def test_availability_for_date(self, date_str):
        """Test getting availability for a specific date"""
        success, response = self.run_test(
            f"Availability for {date_str}", 
            "GET", 
            f"bookings/availability/{date_str}", 
            200
        )
        if success and 'available_slots' in response:
            slots = response['available_slots']
            available_count = len([s for s in slots if s.get('available', False)])
            print(f"   Available slots: {available_count}/{len(slots)}")
            return True, response
        return False, {}

    def test_availability_weekend(self):
        """Test that weekends return no available slots"""
        # Get next Saturday
        today = datetime.now()
        days_ahead = 5 - today.weekday()  # Saturday = 5
        if days_ahead <= 0:
            days_ahead += 7
        saturday = today + timedelta(days=days_ahead)
        date_str = saturday.strftime("%Y-%m-%d")
        
        success, response = self.run_test(
            f"Weekend Availability ({date_str})", 
            "GET", 
            f"bookings/availability/{date_str}", 
            200
        )
        if success:
            available_slots = response.get('available_slots', [])
            if len(available_slots) == 0:
                print("   ✅ Correctly blocks weekend bookings")
                return True
            else:
                print("   ❌ Should not allow weekend bookings")
        return False

    def test_availability_past_date(self):
        """Test that past dates return no available slots"""
        yesterday = datetime.now() - timedelta(days=1)
        date_str = yesterday.strftime("%Y-%m-%d")
        
        success, response = self.run_test(
            f"Past Date Availability ({date_str})", 
            "GET", 
            f"bookings/availability/{date_str}", 
            200
        )
        if success:
            available_slots = response.get('available_slots', [])
            if len(available_slots) == 0:
                print("   ✅ Correctly blocks past date bookings")
                return True
            else:
                print("   ❌ Should not allow past date bookings")
        return False

    def test_create_booking(self):
        """Test creating a new booking"""
        # Get a future weekday
        today = datetime.now()
        future_date = today + timedelta(days=7)  # Next week
        while future_date.weekday() >= 5:  # Skip weekends
            future_date += timedelta(days=1)
        
        booking_data = {
            "client_name": "Test Client",
            "client_email": "test@example.com",
            "client_phone": "123-456-7890",
            "service": "mental-health",
            "booking_date": future_date.strftime("%Y-%m-%d"),
            "time_slot": "10:30",
            "notes": "Test booking for API testing"
        }
        
        success, response = self.run_test(
            "Create Booking", 
            "POST", 
            "bookings", 
            200,
            data=booking_data
        )
        if success and 'id' in response:
            self.test_booking_id = response['id']
            print(f"   Created booking ID: {self.test_booking_id}")
            return True, response
        return False, {}

    def test_duplicate_booking(self):
        """Test that duplicate bookings are rejected"""
        if not self.test_booking_id:
            print("   ⚠️  Skipping - no test booking created")
            return False
            
        # Try to book the same slot again
        today = datetime.now()
        future_date = today + timedelta(days=7)
        while future_date.weekday() >= 5:
            future_date += timedelta(days=1)
            
        booking_data = {
            "client_name": "Another Client",
            "client_email": "another@example.com",
            "service": "aod",
            "booking_date": future_date.strftime("%Y-%m-%d"),
            "time_slot": "10:30"
        }
        
        success, response = self.run_test(
            "Duplicate Booking (should fail)", 
            "POST", 
            "bookings", 
            409,  # Conflict
            data=booking_data
        )
        return success

    def test_get_all_bookings(self):
        """Test getting all bookings"""
        success, response = self.run_test("Get All Bookings", "GET", "bookings", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} bookings")
            return True, response
        return False, {}

    def test_get_specific_booking(self):
        """Test getting a specific booking"""
        if not self.test_booking_id:
            print("   ⚠️  Skipping - no test booking created")
            return False
            
        success, response = self.run_test(
            f"Get Booking {self.test_booking_id}", 
            "GET", 
            f"bookings/{self.test_booking_id}", 
            200
        )
        return success

    def test_update_booking_status(self):
        """Test updating booking status"""
        if not self.test_booking_id:
            print("   ⚠️  Skipping - no test booking created")
            return False
            
        update_data = {"status": "completed"}
        success, response = self.run_test(
            f"Update Booking Status", 
            "PATCH", 
            f"bookings/{self.test_booking_id}", 
            200,
            data=update_data
        )
        if success and response.get('status') == 'completed':
            print("   ✅ Status updated successfully")
            return True
        return False

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test Contact",
            "email": "contact@example.com",
            "service": "yoga",
            "message": "This is a test contact submission"
        }
        
        success, response = self.run_test(
            "Contact Submission", 
            "POST", 
            "contact", 
            200,
            data=contact_data
        )
        return success

    def test_get_contacts(self):
        """Test getting contact submissions"""
        success, response = self.run_test("Get Contact Submissions", "GET", "contact", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} contact submissions")
            return True
        return False

    def test_invalid_date_format(self):
        """Test invalid date format handling"""
        success, response = self.run_test(
            "Invalid Date Format", 
            "GET", 
            "bookings/availability/invalid-date", 
            400
        )
        return success

    def test_invalid_time_slot(self):
        """Test booking with invalid time slot"""
        today = datetime.now()
        future_date = today + timedelta(days=7)
        while future_date.weekday() >= 5:
            future_date += timedelta(days=1)
        
        booking_data = {
            "client_name": "Test Client",
            "client_email": "test@example.com",
            "service": "mental-health",
            "booking_date": future_date.strftime("%Y-%m-%d"),
            "time_slot": "12:30"  # Lunch break slot - should be invalid
        }
        
        success, response = self.run_test(
            "Invalid Time Slot (lunch break)", 
            "POST", 
            "bookings", 
            400,
            data=booking_data
        )
        return success

def main():
    print("🚀 Starting Booking System API Tests")
    print("=" * 50)
    
    tester = BookingAPITester()
    
    # Test sequence
    tests = [
        ("API Root", tester.test_api_root),
        ("Available Slots Config", tester.test_available_slots_config),
        ("Weekend Availability", tester.test_availability_weekend),
        ("Past Date Availability", tester.test_availability_past_date),
        ("Invalid Date Format", tester.test_invalid_date_format),
        ("Create Booking", tester.test_create_booking),
        ("Duplicate Booking", tester.test_duplicate_booking),
        ("Invalid Time Slot", tester.test_invalid_time_slot),
        ("Get All Bookings", tester.test_get_all_bookings),
        ("Get Specific Booking", tester.test_get_specific_booking),
        ("Update Booking Status", tester.test_update_booking_status),
        ("Contact Submission", tester.test_contact_submission),
        ("Get Contacts", tester.test_get_contacts),
    ]
    
    # Test availability for a future date
    future_date = datetime.now() + timedelta(days=3)
    while future_date.weekday() >= 5:  # Skip weekends
        future_date += timedelta(days=1)
    date_str = future_date.strftime("%Y-%m-%d")
    
    print(f"\n🔍 Testing availability for {date_str}...")
    tester.test_availability_for_date(date_str)
    
    # Run all tests
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            error_msg = failure.get('error', f"Expected {failure.get('expected')}, got {failure.get('actual')}")
            print(f"   - {failure['test']}: {error_msg}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())