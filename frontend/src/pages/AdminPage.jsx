import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, FileText, Check, X, ChevronLeft, ChevronRight, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICES = {
  "mental-health": "Mental Health Counselling",
  "aod": "AOD Counselling",
  "yoga": "Yoga & Mindfulness"
};

const STATUS_COLORS = {
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800"
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Simple password protection (in production, use proper auth)
  const ADMIN_PASSWORD = "natalie2024";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      fetchData();
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, contactsRes] = await Promise.all([
        axios.get(`${API}/bookings`),
        axios.get(`${API}/contact`)
      ]);
      setBookings(bookingsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${API}/bookings/${bookingId}`, { status: newStatus });
      toast.success(`Booking ${newStatus}`);
      fetchData();
      setSelectedBooking(null);
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  const getWeekDays = () => {
    return Array.from({ length: 5 }, (_, i) => addDays(currentWeekStart, i));
  };

  const getBookingsForDate = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookings.filter(b => b.booking_date === dateStr && b.status !== "cancelled");
  };

  const TIME_SLOTS = ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30"];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full"
        >
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026] mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-[#5C6656] text-center mb-6">
            Enter your password to access the dashboard
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              data-testid="admin-password"
              className="w-full px-4 py-3 border border-[#D1C9BC] rounded-xl focus:border-[#8A9A86] outline-none mb-4"
            />
            <button
              type="submit"
              data-testid="admin-login-btn"
              className="w-full bg-[#8A9A86] hover:bg-[#748570] text-white py-3 rounded-full font-medium transition-colors"
            >
              Login
            </button>
          </form>

          <a
            href="/"
            className="block text-center mt-6 text-[#5C6656] hover:text-[#2A3026]"
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#D1C9BC] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
                Natalie C Bull
              </a>
              <span className="px-3 py-1 bg-[#8A9A86]/10 text-[#8A9A86] text-sm font-medium rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                disabled={isLoading}
                data-testid="refresh-btn"
                className="p-2 hover:bg-[#EAE4D9] rounded-full transition-colors"
              >
                <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
              </button>
              <button
                onClick={handleLogout}
                data-testid="logout-btn"
                className="flex items-center gap-2 text-[#5C6656] hover:text-[#2A3026]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            data-testid="tab-bookings"
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === "bookings"
                ? "bg-[#8A9A86] text-white"
                : "bg-[#EAE4D9] text-[#5C6656] hover:bg-[#D6CEC4]"
            }`}
          >
            <Calendar size={18} className="inline mr-2" />
            Bookings ({bookings.filter(b => b.status === "confirmed").length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            data-testid="tab-contacts"
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === "contacts"
                ? "bg-[#8A9A86] text-white"
                : "bg-[#EAE4D9] text-[#5C6656] hover:bg-[#D6CEC4]"
            }`}
          >
            <Mail size={18} className="inline mr-2" />
            Contact Inquiries ({contacts.length})
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
                data-testid="prev-week"
                className="p-2 hover:bg-[#EAE4D9] rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
                {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 4), "MMM d, yyyy")}
              </h2>
              <button
                onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
                data-testid="next-week"
                className="p-2 hover:bg-[#EAE4D9] rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Weekly Calendar Grid */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#D1C9BC]" data-testid="weekly-calendar">
              {/* Day Headers */}
              <div className="grid grid-cols-6 border-b border-[#D1C9BC]">
                <div className="p-4 bg-[#F4EFE6]" />
                {getWeekDays().map((day, i) => (
                  <div
                    key={i}
                    className={`p-4 text-center border-l border-[#D1C9BC] ${
                      isSameDay(day, new Date()) ? "bg-[#8A9A86]/10" : "bg-[#F4EFE6]"
                    }`}
                  >
                    <p className="text-sm text-[#5C6656]">{format(day, "EEE")}</p>
                    <p className="text-lg font-medium text-[#2A3026]">{format(day, "d")}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {TIME_SLOTS.map((slot, slotIndex) => (
                <div key={slot} className="grid grid-cols-6 border-b border-[#D1C9BC] last:border-b-0">
                  <div className="p-4 bg-[#F4EFE6] text-center text-sm text-[#5C6656]">
                    {slot}
                  </div>
                  {getWeekDays().map((day, dayIndex) => {
                    const dayBookings = getBookingsForDate(day);
                    const booking = dayBookings.find(b => b.time_slot === slot);
                    
                    return (
                      <div
                        key={dayIndex}
                        className={`p-2 border-l border-[#D1C9BC] min-h-[60px] ${
                          isSameDay(day, new Date()) ? "bg-[#8A9A86]/5" : ""
                        }`}
                      >
                        {booking && (
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            data-testid={`booking-${booking.id}`}
                            className="w-full p-2 bg-[#8A9A86] text-white rounded-lg text-xs text-left hover:bg-[#748570] transition-colors"
                          >
                            <p className="font-medium truncate">{booking.client_name}</p>
                            <p className="opacity-80 truncate">{SERVICES[booking.service]}</p>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Upcoming Bookings List */}
            <div className="mt-8">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-4">
                All Bookings
              </h3>
              <div className="bg-white rounded-3xl border border-[#D1C9BC] overflow-hidden">
                <table className="w-full" data-testid="bookings-table">
                  <thead className="bg-[#F4EFE6]">
                    <tr>
                      <th className="text-left p-4 font-medium text-[#2A3026]">Date & Time</th>
                      <th className="text-left p-4 font-medium text-[#2A3026]">Client</th>
                      <th className="text-left p-4 font-medium text-[#2A3026]">Service</th>
                      <th className="text-left p-4 font-medium text-[#2A3026]">Status</th>
                      <th className="text-left p-4 font-medium text-[#2A3026]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-[#5C6656]">
                          No bookings yet
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="border-t border-[#D1C9BC]">
                          <td className="p-4">
                            <p className="font-medium text-[#2A3026]">
                              {format(parseISO(booking.booking_date), "MMM d, yyyy")}
                            </p>
                            <p className="text-sm text-[#5C6656]">{booking.time_slot}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-[#2A3026]">{booking.client_name}</p>
                            <p className="text-sm text-[#5C6656]">{booking.client_email}</p>
                          </td>
                          <td className="p-4 text-[#5C6656]">
                            {SERVICES[booking.service] || booking.service}
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[booking.status]}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {booking.status === "confirmed" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "completed")}
                                  data-testid={`complete-${booking.id}`}
                                  className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                                  title="Mark as completed"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                  data-testid={`cancel-${booking.id}`}
                                  className="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                                  title="Cancel booking"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-3xl border border-[#D1C9BC] overflow-hidden" data-testid="contacts-table">
            <table className="w-full">
              <thead className="bg-[#F4EFE6]">
                <tr>
                  <th className="text-left p-4 font-medium text-[#2A3026]">Date</th>
                  <th className="text-left p-4 font-medium text-[#2A3026]">Name</th>
                  <th className="text-left p-4 font-medium text-[#2A3026]">Email</th>
                  <th className="text-left p-4 font-medium text-[#2A3026]">Service</th>
                  <th className="text-left p-4 font-medium text-[#2A3026]">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#5C6656]">
                      No contact inquiries yet
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="border-t border-[#D1C9BC]">
                      <td className="p-4 text-sm text-[#5C6656]">
                        {format(new Date(contact.timestamp), "MMM d, yyyy")}
                      </td>
                      <td className="p-4 font-medium text-[#2A3026]">{contact.name}</td>
                      <td className="p-4 text-[#5C6656]">{contact.email}</td>
                      <td className="p-4 text-[#5C6656]">
                        {SERVICES[contact.service] || contact.service}
                      </td>
                      <td className="p-4 text-[#5C6656] max-w-xs truncate">
                        {contact.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6" onClick={() => setSelectedBooking(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            data-testid="booking-modal"
          >
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-4">
              Booking Details
            </h3>
            
            <div className="space-y-3 text-[#5C6656] mb-6">
              <p><strong>Date:</strong> {format(parseISO(selectedBooking.booking_date), "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Time:</strong> {selectedBooking.time_slot}</p>
              <p><strong>Client:</strong> {selectedBooking.client_name}</p>
              <p><strong>Email:</strong> {selectedBooking.client_email}</p>
              {selectedBooking.client_phone && <p><strong>Phone:</strong> {selectedBooking.client_phone}</p>}
              <p><strong>Service:</strong> {SERVICES[selectedBooking.service]}</p>
              {selectedBooking.notes && <p><strong>Notes:</strong> {selectedBooking.notes}</p>}
              <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-sm ${STATUS_COLORS[selectedBooking.status]}`}>{selectedBooking.status}</span></p>
            </div>

            {selectedBooking.status === "confirmed" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition-colors"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full mt-3 border border-[#D1C9BC] text-[#5C6656] py-3 rounded-full font-medium hover:bg-[#F4EFE6] transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
