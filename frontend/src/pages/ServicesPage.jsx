import { useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Heart, Brain } from "lucide-react";
import { Header, ContactSection, Footer, fadeInUp } from "../components/SharedComponents";

// Images
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1606534498512-1f073c93b9eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdCUyMHdhcm18ZW58MHx8fHwxNzc0NTc1NzE3fDA&ixlib=rb-4.1.0&q=85",
  nature: "https://images.unsplash.com/photo-1635149203040-fa2068ddac5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxieXJvbiUyMGJheSUyMG5hdHVyZSUyMGNhbG18ZW58MHx8fHwxNzc0NTc1NzE4fDA&ixlib=rb-4.1.0&q=85",
  artTherapy: "https://images.pexels.com/photos/2489476/pexels-photo-2489476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
};

// Marquee Section
const MarqueeSection = () => {
  const approaches = [
    "Cognitive Behavioural Therapy",
    "Motivational Interviewing",
    "Acceptance and Commitment Therapy",
    "Art Therapy",
    "Mindfulness",
    "Yoga and Movement"
  ];

  return (
    <section data-testid="marquee-section" className="bg-[#FFAA80]/20 py-6 border-y border-[#FFAA80]/30 mt-20">
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

// Services Section
const ServicesDetailSection = () => {
  const services = [
    {
      icon: Heart,
      title: "AOD Counselling",
      description: "Compassionate AOD counselling provides a non-judgmental space to explore your relationship with substances, honoring your unique strengths and supports you in defining your own path to wellbeing.",
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
      title: "GP Referrals and Medicare Rebates",
      description: "You can access more affordable support through the Better Access initiative. Simply visit your GP to discuss a Mental Health Care Plan (MHCP). With this referral, you are eligible for Medicare rebates on your counselling sessions, significantly reducing your out-of-pocket costs."
    },
    {
      number: "2",
      title: "Private Counselling Sessions",
      description: "For those seeking immediate support without a referral, I offer private 1-on-1 sessions. This pathway ensures maximum confidentiality and flexibility, allowing you to book appointments as you need them without Medicare-related documentation or limits."
    },
    {
      number: "3",
      title: "Victims Services Counselling",
      description: "I am an Approved Victims Services Provider. I offer specialised support for those eligible for counselling through Victims Services NSW."
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

// Inspiration Section
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

// Main Services Page
const ServicesPage = () => {
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
      <MarqueeSection />
      <ServicesDetailSection />
      <GettingStartedSection />
      <LetsTalkSection />
      <InspirationSection />
      <FeesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default ServicesPage;
