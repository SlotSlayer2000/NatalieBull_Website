import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Header, ContactSection, Footer, staggerContainer, fadeInUp } from "../components/SharedComponents";

// Profile photo from user
const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/sd9h78bl_Natalie.png";

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
              <a href="/about" data-testid="hero-cta-secondary" className="inline-block bg-[#8A9A86] hover:bg-[#748570] text-white px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1">
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
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
