import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Menu, X, Heart, Brain, Flower2, GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Profile photo from user
const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/boglppm6_image.png";

// Images from design guidelines
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1606534498512-1f073c93b9eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdCUyMHdhcm18ZW58MHx8fHwxNzc0NTc1NzE3fDA&ixlib=rb-4.1.0&q=85",
  nature: "https://images.unsplash.com/photo-1635149203040-fa2068ddac5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxieXJvbiUyMGJheSUyMG5hdHVyZSUyMGNhbG18ZW58MHx8fHwxNzc0NTc1NzE4fDA&ixlib=rb-4.1.0&q=85",
  yoga: "https://images.pexels.com/photos/6240645/pexels-photo-6240645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  artTherapy: "https://images.pexels.com/photos/6920239/pexels-photo-6920239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Contact", href: "#contact" }
  ];

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
          <a href="#" data-testid="logo" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
            Natalie C Bull
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-${link.name.toLowerCase()}`}
                className="nav-link text-[#5C6656] hover:text-[#2A3026] text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              data-testid="nav-book-btn"
              className="btn-primary text-sm px-6 py-3"
            >
              Book Consultation
            </a>
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#F9F6F0] border-b border-[#D1C9BC]"
          data-testid="mobile-menu"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-[#5C6656] hover:text-[#2A3026] text-lg font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary inline-block text-center w-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Consultation
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section data-testid="hero-section" className="min-h-screen pt-20 flex items-center bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 md:order-1"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4"
            >
              Accredited Mental Health Social Worker / AOD Counsellor
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none font-medium text-[#2A3026] mb-6"
            >
              Meaningful,<br />sustainable<br />change.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#5C6656] leading-relaxed mb-8 max-w-lg"
            >
              Grounded in therapeutic alliance and human connection, 
              supporting you to create lasting transformation aligned with your goals and dreams.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href="#contact" data-testid="hero-cta-primary" className="btn-primary">
                Let's Connect
              </a>
              <a href="#about" data-testid="hero-cta-secondary" className="btn-secondary">
                Learn More
              </a>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mt-8 text-[#5C6656]">
              <MapPin size={18} className="text-[#8A9A86]" />
              <span className="text-sm">Northern NSW, Australia</span>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            {/* Decorative blob */}
            <div className="absolute -top-8 -right-8 w-full h-full bg-[#8A9A86]/15 blob-shape" />
            <div className="profile-image-container relative z-10 img-hover-lift">
              <img
                src={PROFILE_IMAGE}
                alt="Natalie C Bull - Mental Health Social Worker"
                data-testid="hero-image"
                className="w-full max-w-md mx-auto rounded-3xl object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Marquee Section
const MarqueeSection = () => {
  const approaches = [
    "Cognitive Behavioural Therapy",
    "Motivational Interviewing",
    "Acceptance & Commitment Therapy",
    "Art Therapy",
    "Mindfulness",
    "Yoga & Movement"
  ];

  return (
    <section data-testid="marquee-section" className="bg-[#EAE4D9] py-6">
      <Marquee speed={30} gradient={false} pauseOnHover>
        {approaches.map((approach, index) => (
          <span key={index} className="marquee-item">
            {approach}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#C87961]/10 rounded-3xl" />
              <img
                src={IMAGES.nature}
                alt="Byron Bay region nature"
                data-testid="about-image"
                className="relative z-10 w-full rounded-3xl object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              About
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
              Rooted in human connection
            </h2>
            <div className="space-y-4 text-[#5C6656] leading-relaxed">
              <p>
                I am an experienced Mental Health Social Worker, AOD Counsellor, and Yoga Teacher 
                with over 30 years of experience across government and non-government sectors, 
                including NSW Health.
              </p>
              <p>
                I bring strong interpersonal skills, warmth, and professionalism to my work, 
                grounded in a deep belief in the power of therapeutic alliance and human connection.
              </p>
              <p>
                My practice focuses on identifying individual strengths and supporting clients 
                to create meaningful, sustainable change aligned with their goals and dreams.
              </p>
              <p className="text-[#8A9A86] font-medium italic">
                Currently training in Psychedelic-Assisted Therapy (commencing 2026).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "Mental Health Counselling",
      description: "Evidence-based support for anxiety, depression, stress, and emotional wellbeing using CBT, ACT, and Motivational Interviewing.",
      image: IMAGES.hero
    },
    {
      icon: Heart,
      title: "AOD Counselling",
      description: "Compassionate alcohol and other drug counselling, supporting you through recovery with understanding and proven therapeutic approaches.",
      image: IMAGES.nature
    },
    {
      icon: Flower2,
      title: "Yoga & Mindfulness",
      description: "Integrating 24+ years of yoga teaching experience into holistic wellbeing practices, including pre and post-natal support.",
      image: IMAGES.yoga
    }
  ];

  return (
    <section id="services" data-testid="services-section" className="py-24 md:py-32 bg-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
            Services
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026]">
            How I can help
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`service-card-${index}`}
              className="service-card bg-[#F4EFE6] rounded-3xl p-8 md:p-10 card-hover border border-transparent hover:border-[#D1C9BC] group"
            >
              <div className="w-14 h-14 bg-[#8A9A86]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8A9A86]/20 transition-colors">
                <service.icon className="w-7 h-7 text-[#8A9A86]" strokeWidth={1.5} />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-4">
                {service.title}
              </h3>
              <p className="text-[#5C6656] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Approach Section (Qualifications)
const ApproachSection = () => {
  const qualifications = [
    { title: "Master of Social Work", institution: "Southern Cross University", year: "2020-2022" },
    { title: "Postgraduate Certificate in Experiential and Creative Arts Therapy", institution: "Melbourne Institute", year: "2004-2005" },
    { title: "Bachelor of Social Science (Counselling & Mediation)", institution: "Southern Cross University", year: "1999-2001" },
    { title: "Diploma of Yoga Teaching", institution: "International Yoga Teachers Association", year: "2016" },
    { title: "Bachelor of Science - Nursing", institution: "QUT", year: "1990-1993" }
  ];

  const approaches = [
    "Cognitive Behavioural Therapy (CBT)",
    "Motivational Interviewing",
    "Acceptance & Commitment Therapy (ACT)",
    "Art Therapy",
    "Mindfulness-Based Approaches",
    "Strength-Based Practice"
  ];

  return (
    <section id="approach" data-testid="approach-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          {/* Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              Qualifications
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-10">
              Education & Training
            </h2>
            <div className="space-y-0">
              {qualifications.map((qual, index) => (
                <div key={index} data-testid={`qualification-${index}`} className="qual-item">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#2A3026] mb-1">{qual.title}</h4>
                      <p className="text-sm text-[#5C6656]">{qual.institution}</p>
                    </div>
                    <span className="text-sm text-[#8A9A86] font-medium">{qual.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Therapeutic Approaches */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              Modalities
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-10">
              Therapeutic Approaches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {approaches.map((approach, index) => (
                <div
                  key={index}
                  data-testid={`approach-item-${index}`}
                  className="flex items-center gap-3 p-4 bg-[#F4EFE6] rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8A9A86]" />
                  <span className="text-[#2A3026]">{approach}</span>
                </div>
              ))}
            </div>

            {/* Art Therapy Image */}
            <div className="mt-10">
              <img
                src={IMAGES.artTherapy}
                alt="Art therapy session"
                className="w-full rounded-2xl object-cover aspect-video"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you for your message! I'll be in touch soon.");
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16">
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
              and discover how we can work together towards meaningful change.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8A9A86]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#8A9A86]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#8A9A86] font-medium">Location</p>
                  <p className="text-[#2A3026]">Northern NSW (Byron Bay Region)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8A9A86]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#8A9A86]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#8A9A86] font-medium">Email</p>
                  <p className="text-[#2A3026]">hello@nataliecbull.com</p>
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
            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  data-testid="contact-name"
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  data-testid="contact-email"
                  className="form-input"
                />
              </div>
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  data-testid="contact-service"
                  className="form-input bg-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select a Service</option>
                  <option value="mental-health">Mental Health Counselling</option>
                  <option value="aod">AOD Counselling</option>
                  <option value="yoga">Yoga & Mindfulness</option>
                  <option value="general">General Enquiry</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  data-testid="contact-message"
                  className="form-input resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="contact-submit"
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-24 md:py-32 bg-[#2A3026]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="footer-cta text-[#F9F6F0] mb-6">
            Let's Talk
          </h2>
          <p className="text-[#8A9A86] text-lg max-w-md mx-auto mb-8">
            Taking the first step is often the hardest. I'm here when you're ready.
          </p>
          <a href="#contact" data-testid="footer-cta" className="btn-primary bg-[#8A9A86] hover:bg-[#748570]">
            Book a Consultation
          </a>
        </motion.div>

        <div className="border-t border-[#5C6656]/30 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[#8A9A86]">
            <MapPin size={18} />
            <span>Northern NSW, Australia</span>
          </div>
          <p className="text-[#5C6656] text-sm">
            © {new Date().getFullYear()} Natalie C Bull. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
