import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "../components/ui/calendar";
import { ChevronLeft, Clock, User, Mail, Phone, FileText, Check, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { format, addDays, isWeekend } from "date-fns";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICES = [
  { value: "mental-health", label: "Mental Health Counselling" },
  { value: "aod", label: "AOD Counselling" },
  { value: "yoga", label: "Yoga & Mindfulness" }
];

const BookingPage = () => {
  const [step, setStep] = useState(1); // 1: date, 2: time, 3: details, 4: confirmation
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service: "",
    notes: ""
  });
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date) => {
    setIsLoading(true);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const response = await axios.get(`${API}/bookings/availability/${dateStr}`);
      setAvailableSlots(response.data.available_slots || []);
    } catch (error) {
      toast.error("Failed to load available times");
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    if (date && !isWeekend(date)) {
      setSelectedDate(date);
      setSelectedSlot(null);
      setStep(2);
    }
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setStep(3);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bookingData = {
        ...formData,
        booking_date: format(selectedDate, "yyyy-MM-dd"),
        time_slot: selectedSlot.start
      };

      const response = await axios.post(`${API}/bookings`, bookingData);
      setBookingConfirmation(response.data);
      setStep(4);
      toast.success("Booking confirmed!");
    } catch (error) {
      const message = error.response?.data?.detail || "Failed to create booking";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      service: "",
      notes: ""
    });
    setBookingConfirmation(null);
  };

  const disabledDays = [
    { before: new Date() },
    { dayOfWeek: [0, 6] } // Disable weekends
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-[#F9F6F0]/90 backdrop-blur-xl border-b border-[#D1C9BC]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a href="/" data-testid="booking-logo" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
              Natalie C Bull
            </a>
            <a href="/" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium flex items-center gap-2">
              <ChevronLeft size={18} />
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  data-testid={`step-${s}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    step >= s
                      ? "bg-[#8A9A86] text-white"
                      : "bg-[#EAE4D9] text-[#5C6656]"
                  }`}
                >
                  {step > s ? <Check size={18} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > s ? "bg-[#8A9A86]" : "bg-[#D1C9BC]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#2A3026] mb-4">
                Book a Session
              </h1>
              <p className="text-[#5C6656] mb-8">
                Select a date for your consultation
              </p>

              <div className="flex justify-center">
                <div className="bg-[#F4EFE6] rounded-3xl p-6 inline-block" data-testid="booking-calendar">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="rounded-xl"
                    classNames={{
                      day_selected: "bg-[#8A9A86] text-white hover:bg-[#748570]",
                      day_today: "bg-[#C87961]/20 text-[#C87961]",
                    }}
                  />
                </div>
              </div>

              <p className="text-sm text-[#8A9A86] mt-6">
                Sessions available Monday - Friday, 9:30 AM - 5:30 PM
              </p>
            </motion.div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[#5C6656] hover:text-[#2A3026] mb-6"
                data-testid="back-to-date"
              >
                <ChevronLeft size={18} />
                Change Date
              </button>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#2A3026] mb-2">
                Select a Time
              </h1>
              <p className="text-[#5C6656] mb-8">
                {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-[#8A9A86] border-t-transparent rounded-full mx-auto" />
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-12 bg-[#F4EFE6] rounded-3xl">
                  <p className="text-[#5C6656]">No available slots for this date</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-[#8A9A86] hover:text-[#748570] font-medium"
                  >
                    Choose another date
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" data-testid="time-slots">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      disabled={!slot.available}
                      data-testid={`slot-${slot.start}`}
                      className={`p-4 rounded-xl text-center transition-all ${
                        slot.available
                          ? "bg-[#F4EFE6] hover:bg-[#8A9A86] hover:text-white border border-transparent hover:border-[#8A9A86]"
                          : "bg-[#EAE4D9] text-[#5C6656]/50 cursor-not-allowed line-through"
                      }`}
                    >
                      <Clock size={18} className="mx-auto mb-2 opacity-70" />
                      <span className="font-medium">{slot.display}</span>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-sm text-[#8A9A86] mt-6 text-center">
                Each session is 1 hour. Lunch break: 12:30 PM - 1:30 PM
              </p>
            </motion.div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-[#5C6656] hover:text-[#2A3026] mb-6"
                data-testid="back-to-time"
              >
                <ChevronLeft size={18} />
                Change Time
              </button>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#2A3026] mb-2">
                Your Details
              </h1>
              <p className="text-[#5C6656] mb-8">
                {selectedDate && format(selectedDate, "EEEE, MMMM d")} at {selectedSlot?.display}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl" data-testid="booking-form">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-0 top-3 w-5 h-5 text-[#8A9A86]" />
                    <input
                      type="text"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      data-testid="booking-name"
                      className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-0 top-3 w-5 h-5 text-[#8A9A86]" />
                    <input
                      type="email"
                      name="client_email"
                      value={formData.client_email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      required
                      data-testid="booking-email"
                      className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-0 top-3 w-5 h-5 text-[#8A9A86]" />
                    <input
                      type="tel"
                      name="client_phone"
                      value={formData.client_phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number (optional)"
                      data-testid="booking-phone"
                      className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      data-testid="booking-service"
                      className="w-full py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a Service</option>
                      {SERVICES.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <FileText className="absolute left-0 top-3 w-5 h-5 text-[#8A9A86]" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional notes (optional)"
                      rows={3}
                      data-testid="booking-notes"
                      className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  data-testid="booking-submit"
                  className="w-full bg-[#8A9A86] hover:bg-[#748570] text-white py-4 rounded-full font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && bookingConfirmation && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#8A9A86] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-white" />
              </div>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#2A3026] mb-4">
                Booking Confirmed
              </h1>
              <p className="text-[#5C6656] mb-8">
                Thank you for booking with us. We look forward to seeing you!
              </p>

              <div className="bg-[#F4EFE6] rounded-3xl p-8 max-w-md mx-auto text-left" data-testid="booking-confirmation">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-4">
                  Booking Details
                </h3>
                <div className="space-y-3 text-[#5C6656]">
                  <p><strong>Date:</strong> {format(new Date(bookingConfirmation.booking_date), "EEEE, MMMM d, yyyy")}</p>
                  <p><strong>Time:</strong> {bookingConfirmation.time_slot} - {
                    `${parseInt(bookingConfirmation.time_slot.split(":")[0]) + 1}:${bookingConfirmation.time_slot.split(":")[1]}`
                  }</p>
                  <p><strong>Service:</strong> {SERVICES.find(s => s.value === bookingConfirmation.service)?.label}</p>
                  <p><strong>Name:</strong> {bookingConfirmation.client_name}</p>
                  <p><strong>Confirmation #:</strong> {bookingConfirmation.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={resetBooking}
                  data-testid="book-another"
                  className="bg-[#8A9A86] hover:bg-[#748570] text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Book Another Session
                </button>
                <a
                  href="/"
                  className="border border-[#8A9A86] text-[#2A3026] hover:bg-[#8A9A86] hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Return Home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BookingPage;
