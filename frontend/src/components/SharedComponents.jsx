import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, MapPin, Mail, Phone } from "lucide-react";

// Animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Shared Header Component
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Crisis Support", href: "/crisis" }
  ];

  const handleGetInTouch = (e) => {
    e.preventDefault();
    
    // On Crisis page, navigate to Services page contact section
    if (location.pathname === "/crisis") {
      navigate("/services#contact");
      return;
    }
    
    // On other pages, scroll to contact section on current page
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid="header"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#F9F6F0]/90 header-blur border-b border-[#D1C9BC]/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" data-testid="logo" className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026]">
            Natalie Bull
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                className={`nav-link text-[#5C6656] hover:text-[#2A3026] text-sm font-medium ${
                  location.pathname === link.href ? "text-[#2A3026]" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleGetInTouch}
              data-testid="nav-book-btn"
              className="btn-primary text-sm px-6 py-3"
            >
              Get in Touch
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F9F6F0] border-t border-[#D1C9BC]/50 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={(e) => {
                  handleGetInTouch(e);
                  setIsMobileMenuOpen(false);
                }}
                className="btn-primary text-sm px-6 py-3 text-center"
              >
                Get in Touch
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

// Shared Contact Section Component
export const ContactSection = () => {
  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              Get in Touch
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
              Begin your journey
            </h2>
            <p className="text-[#5C6656] leading-relaxed mb-8 max-w-md">
              Ready to take the first step? Reach out to schedule a consultation 
              and discover how I can support you towards meaningful change.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#C87961]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#C87961] font-medium">Location</p>
                  <p className="text-[#2A3026]">Northern NSW, Murwillumbah, Australia</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#C87961]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#C87961] font-medium">Phone</p>
                  <a href="tel:0451618449" className="text-[#2A3026] hover:text-[#8A9A86]">0451 618 449</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#C87961]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#C87961] font-medium">Email</p>
                  <p className="text-[#2A3026]">info@nataliebull.com.au</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form 
              data-testid="contact-form" 
              className="space-y-6"
              action="https://formsubmit.co/info@nataliebull.com.au"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Counselling Enquiry from Website" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  data-testid="contact-name"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors text-[#2A3026] placeholder-[#5C6656]/70"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  data-testid="contact-email"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors text-[#2A3026] placeholder-[#5C6656]/70"
                />
              </div>
              <div>
                <select
                  name="service"
                  required
                  data-testid="contact-service"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors text-[#2A3026] appearance-none cursor-pointer"
                >
                  <option value="">Select a Service</option>
                  <option value="AOD Counselling">AOD Counselling</option>
                  <option value="Trauma Therapy">Trauma Therapy</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  data-testid="contact-message"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#D1C9BC] focus:border-[#8A9A86] outline-none transition-colors text-[#2A3026] placeholder-[#5C6656]/70 resize-none"
                />
              </div>
              <button
                type="submit"
                data-testid="contact-submit"
                className="w-full bg-[#8A9A86] hover:bg-[#748570] text-white py-4 rounded-full font-medium transition-all hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Shared Footer Component
export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#2A3026] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[#FFAA80]">
            <MapPin size={18} />
            <span>Northern NSW, Murwillumbah, Australia</span>
          </div>
          <p className="text-[#5C6656] text-sm">
            © {new Date().getFullYear()} Natalie Bull. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
