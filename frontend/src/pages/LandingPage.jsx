import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Menu, X, Heart, Brain, Flower2, GraduationCap, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";

// Profile photo from user
const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/boglppm6_image.png";

// Images from design guidelines
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1606534498512-1f073c93b9eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdCUyMHdhcm18ZW58MHx8fHwxNzc0NTc1NzE3fDA&ixlib=rb-4.1.0&q=85",
  nature: "https://images.unsplash.com/photo-1635149203040-fa2068ddac5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxieXJvbiUyMGJheSUyMG5hdHVyZSUyMGNhbG18ZW58MHx8fHwxNzc0NTc1NzE4fDA&ixlib=rb-4.1.0&q=85",
  yoga: "https://images.pexels.com/photos/6240645/pexels-photo-6240645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  artTherapy: "https://images.pexels.com/photos/2489476/pexels-photo-2489476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
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
            Natalie Bull
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
              Get in Touch
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
              Get in Touch
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
                Get in Touch
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
            <div className="absolute -top-8 -right-8 w-full h-full bg-[#FFAA80]/50 blob-shape" />
            <div className="profile-image-container relative z-10 img-hover-lift">
              <img
                src={PROFILE_IMAGE}
                alt="Natalie Bull - Mental Health Social Worker"
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
    <section data-testid="marquee-section" className="bg-[#FFAA80]/20 py-6 border-y border-[#FFAA80]/30">
      <Marquee speed={30} gradient={false} pauseOnHover>
        {approaches.map((approach, index) => (
          <span key={index} className="marquee-item text-[#2A3026]">
            {approach}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const approaches = [
    "Cognitive Behavioural Therapy (CBT)",
    "Motivational Interviewing",
    "Acceptance & Commitment Therapy (ACT)",
    "Art Therapy",
    "Mindfulness-Based Approaches",
    "Strength-Based Practice"
  ];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#FFAA80]/25 rounded-3xl" />
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
            <div className="space-y-4 text-[#5C6656] leading-relaxed mb-8">
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

            {/* Therapeutic Approaches */}
            <div className="pt-6 border-t border-[#D1C9BC]">
              <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
                Therapeutic Approaches
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {approaches.map((approach, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#F4EFE6] rounded-lg border-l-4 border-[#FFAA80]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FFAA80]" />
                    <span className="text-[#2A3026] text-sm">{approach}</span>
                  </div>
                ))}
              </div>
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
              <div className="w-14 h-14 bg-[#FFAA80]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FFAA80]/35 transition-colors">
                <service.icon className="w-7 h-7 text-[#C87961]" strokeWidth={1.5} />
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

// Inspiration Section (Beach Image)
const InspirationSection = () => {
  return (
    <section id="approach" data-testid="approach-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
            A New Beginning
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
            Every sunrise brings new possibilities
          </h2>
          <p className="text-[#5C6656] max-w-2xl mx-auto">
            Just as each day offers a fresh start, therapy provides the opportunity 
            to explore new perspectives and create meaningful change in your life.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={IMAGES.artTherapy}
            alt="Colorful beach sunrise over the ocean"
            className="w-full rounded-3xl object-cover aspect-[21/9]"
          />
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
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
              and discover how we can work together towards meaningful change.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#C87961]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#C87961] font-medium">Location</p>
                  <p className="text-[#2A3026]">Northern NSW (Byron Bay Region)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#C87961]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[#C87961] font-medium">Email</p>
                  <p className="text-[#2A3026]">hello@nataliecbull.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F4EFE6] rounded-3xl p-10 text-center"
          >
            <div className="w-20 h-20 bg-[#FFAA80]/25 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-[#C87961]" strokeWidth={1.5} />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026] mb-4">
              Let's Connect
            </h3>
            <p className="text-[#5C6656] leading-relaxed mb-8">
              I'd love to hear from you. Send me an email and I'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:hello@nataliecbull.com?subject=Counselling%20Enquiry"
              data-testid="contact-email-btn"
              className="inline-block bg-[#8A9A86] hover:bg-[#748570] text-white px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1"
            >
              Send Email
            </a>
            <p className="text-sm text-[#5C6656] mt-6">
              hello@nataliecbull.com
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-24 md:py-32 bg-[#2A3026] relative overflow-hidden">
      {/* Decorative peach accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFAA80]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
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
          <a href="#contact" data-testid="footer-cta" className="inline-block bg-[#FFAA80] hover:bg-[#FF9966] text-[#2A3026] px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1">
            Get in Touch
          </a>
        </motion.div>

        <div className="border-t border-[#5C6656]/30 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[#FFAA80]">
            <MapPin size={18} />
            <span>Northern NSW, Australia</span>
          </div>
          <p className="text-[#5C6656] text-sm">
            © {new Date().getFullYear()} Natalie Bull. All rights reserved.
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
      <InspirationSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
