import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Menu, X, Heart, Brain, Flower2, GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

// Profile photo from user
const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/sd9h78bl_Natalie.png";

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
    { name: "About", href: "/about" },
    { name: "Services", href: "#services" },
    { name: "Crisis Support", href: "/crisis" },
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
          <a href="/" data-testid="logo" className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026]">
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
            <motion.h1
              variants={fadeInUp}
              className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6"
            >
              Alcohol and Other Drugs Counselling<br />
              <span className="text-[#8A9A86]">and Trauma Therapy</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#5C6656] leading-relaxed mb-8 max-w-lg"
            >
              Accredited Mental Health Social Worker providing compassionate counselling for Alcohol and Other Drugs (AOD) concerns and therapy for trauma.
              <br /><br />
              Working together to support meaningful, sustainable change that reflects your values and unique goals.
              <br /><br />
              Telehealth support across Australia or in-person counselling based in Murwillumbah.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href="#contact" data-testid="hero-cta-primary" className="btn-primary">
                Get in Touch
              </a>
              <a href="/about" data-testid="hero-cta-secondary" className="btn-secondary">
                Learn More
              </a>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mt-8 text-[#5C6656]">
              <MapPin size={18} className="text-[#8A9A86]" />
              <span className="text-sm">Northern NSW, Murwillumbah, Australia</span>
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
        {approaches.map((approach) => (
          <span key={approach} className="marquee-item text-[#2A3026]">
            {approach}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

// About Section - Teaser linking to full page
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
                My practice focuses on identifying individual strengths and supporting clients 
                to create meaningful, sustainable change aligned with their goals and dreams.
              </p>
            </div>
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-[#8A9A86] hover:bg-[#748570] text-white px-6 py-3 rounded-full font-medium transition-all hover:-translate-y-1"
            >
              Learn More About Me
            </a>
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
      icon: Heart,
      title: "AOD Counselling",
      description: "Compassionate AOD counselling provides a non-judgmental space to explore your relationship with substances, honoring your unique strengths and supports you in defining your own path to well-being.",
      image: IMAGES.nature
    },
    {
      icon: Brain,
      title: "Trauma Therapy",
      description: "Providing a safe and confidential space to process trauma at your pace. Helping you to identify strategies to move forward in ways that align with your values.",
      image: IMAGES.hero
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
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

// Getting Started Section
const GettingStartedSection = () => {
  const pathways = [
    {
      number: "1",
      title: "GP Referrals & Medicare Rebates",
      description: "You can access more affordable support through the Better Access initiative. Simply visit your GP to discuss a Mental Health Care Plan (MHCP). With this referral, you are eligible for Medicare rebates on your counselling sessions, significantly reducing your out-of-pocket costs."
    },
    {
      number: "2",
      title: "Private Counselling Sessions",
      description: "For those seeking immediate support without a referral, I offer private 1-on-1 sessions. This pathway ensures maximum confidentiality and flexibility, allowing you to book appointments as you need them without Medicare-related documentation or limits."
    },
    {
      number: "3",
      title: "Victims Services Counselling (Coming Soon)",
      description: "I am currently in the process of becoming an Approved Victims Services Provider. Soon, I will offer specialised support for those eligible for counselling through Victims Services NSW."
    }
  ];

  return (
    <section id="getting-started" data-testid="getting-started-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
            Your Path to Support
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
            How to Get Started with Counselling
          </h2>
          <p className="text-[#5C6656] max-w-3xl mx-auto">
            Taking the first step toward accessing support can feel overwhelming, but finding the right path shouldn't be. Whether you're looking for in-person sessions or the convenience of Telehealth, I offer several flexible ways to access professional care tailored to your needs.
          </p>
        </motion.div>

        {/* Pathways */}
        <div className="mb-16">
          <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium text-[#2A3026] mb-8 text-center">
            Choose the Pathway That Works for You
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pathways.map((pathway) => (
              <motion.div
                key={pathway.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#F4EFE6] rounded-3xl p-8 border border-transparent hover:border-[#D1C9BC] transition-colors"
              >
                <div className="w-12 h-12 bg-[#FFAA80]/25 rounded-full flex items-center justify-center mb-6">
                  <span className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#C87961]">{pathway.number}</span>
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#2A3026] mb-4">
                  {pathway.title}
                </h4>
                <p className="text-[#5C6656] text-sm leading-relaxed">
                  {pathway.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flexible Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#2A3026] rounded-3xl p-10 md:p-16"
        >
          <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium text-[#F9F6F0] mb-4 text-center">
            Flexible Support, Your Way
          </h3>
          <p className="text-[#8A9A86] text-center mb-10 max-w-2xl mx-auto">
            All my services are available via:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#3A4036] rounded-2xl p-6">
              <h4 className="font-medium text-[#FFAA80] mb-2">In-Person Counselling</h4>
              <p className="text-[#8A9A86] text-sm">
                Traditional face-to-face sessions in a safe, professional environment.
              </p>
            </div>
            <div className="bg-[#3A4036] rounded-2xl p-6">
              <h4 className="font-medium text-[#FFAA80] mb-2">Telehealth</h4>
              <p className="text-[#8A9A86] text-sm">
                Secure online video or phone consultations from the comfort and privacy of your own home.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Let's Talk CTA Section
const LetsTalkSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#2A3026] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFAA80]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl lg:text-7xl font-medium text-[#F9F6F0] mb-6">
            Let's Talk
          </h2>
          <p className="text-[#8A9A86] text-lg max-w-md mx-auto mb-8">
            Taking the first step is often the hardest. I'm here when you're ready.
          </p>
          <a href="#contact" className="inline-block bg-[#FFAA80] hover:bg-[#FF9966] text-[#2A3026] px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1">
            Get in Touch
          </a>
        </motion.div>
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
            Next Steps
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
            Change is possible
          </h2>
          <p className="text-[#5C6656] max-w-2xl mx-auto italic">
            "The curious paradox is that when I accept myself just as I am, then I can change."
            <span className="block mt-2 not-italic text-[#8A9A86]">— Carl Rogers</span>
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

// Fees Section
const FeesSection = () => {
  const fees = [
    {
      service: "GP Referrals with Medicare Rebates (Care Plan)",
      upfrontFee: "$150",
      medicareRebate: "$87.24",
      outOfPocket: "$62.76"
    },
    {
      service: "Private Counselling Sessions",
      upfrontFee: "$150",
      medicareRebate: "NA",
      outOfPocket: "$150"
    },
    {
      service: "Victims Services Counselling",
      upfrontFee: "$0",
      medicareRebate: "NA",
      outOfPocket: "$0"
    }
  ];

  return (
    <section id="fees" data-testid="fees-section" className="py-24 md:py-32 bg-[#F4EFE6]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              Investment
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-4">
              Pricing
            </h2>
            <p className="text-[#5C6656]">All sessions are scheduled for 50 minutes</p>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[#2A3026] text-white">
              <div className="p-4 md:p-6 font-medium"></div>
              <div className="p-4 md:p-6 font-medium text-center">Upfront Fee</div>
              <div className="p-4 md:p-6 font-medium text-center">Medicare Rebate</div>
              <div className="p-4 md:p-6 font-medium text-center">Out of Pocket (gap)</div>
            </div>
            
            {/* Table Rows */}
            {fees.map((fee, index) => (
              <div 
                key={fee.service} 
                className={`grid grid-cols-4 ${index !== fees.length - 1 ? 'border-b border-[#D1C9BC]' : ''}`}
              >
                <div className="p-4 md:p-6 text-[#2A3026] font-medium">{fee.service}</div>
                <div className="p-4 md:p-6 text-center font-['Cormorant_Garamond'] text-xl text-[#2A3026]">{fee.upfrontFee}</div>
                <div className="p-4 md:p-6 text-center font-['Cormorant_Garamond'] text-xl text-[#8A9A86]">{fee.medicareRebate}</div>
                <div className="p-4 md:p-6 text-center font-['Cormorant_Garamond'] text-xl text-[#C87961] font-medium">{fee.outOfPocket}</div>
              </div>
            ))}
          </div>
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

// Footer Section
const Footer = () => {
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

// Main Landing Page
const LandingPage = () => {
  useEffect(() => {
    // Handle scroll to section when navigating from other pages
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <main>
      <Header />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <GettingStartedSection />
      <LetsTalkSection />
      <InspirationSection />
      <FeesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
