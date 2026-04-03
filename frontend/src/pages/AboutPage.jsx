import { motion } from "framer-motion";
import { ChevronLeft, MapPin } from "lucide-react";

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/boglppm6_image.png";

const IMAGES = {
  nature: "https://images.unsplash.com/photo-1635149203040-fa2068ddac5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxieXJvbiUyMGJheSUyMG5hdHVyZSUyMGNhbG18ZW58MHx8fHwxNzc0NTc1NzE4fDA&ixlib=rb-4.1.0&q=85"
};

const approaches = [
  "Cognitive Behavioural Therapy (CBT)",
  "Motivational Interviewing",
  "Acceptance & Commitment Therapy (ACT)",
  "Art Therapy",
  "Mindfulness-Based Approaches",
  "Strength-Based Practice"
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-[#F9F6F0]/90 backdrop-blur-xl border-b border-[#D1C9BC]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
              Natalie Bull
            </a>
            <div className="flex items-center gap-6">
              <a href="/resources" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium">
                Resources
              </a>
              <a href="/blog" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium">
                Blog
              </a>
              <a href="/" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium flex items-center gap-2">
                <ChevronLeft size={18} />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Hero Section with Photo */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 w-full h-full bg-[#FFAA80]/30 blob-shape" />
            <div className="relative z-10">
              <img
                src={PROFILE_IMAGE}
                alt="Natalie Bull - Mental Health Social Worker"
                className="w-full max-w-md mx-auto rounded-3xl object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              About Me
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl tracking-tight leading-none font-medium text-[#2A3026] mb-6">
              Rooted in human connection
            </h1>
            <p className="text-lg text-[#5C6656] leading-relaxed mb-6">
              I am an experienced Mental Health Social Worker, AOD Counsellor, and Yoga Teacher 
              with over 30 years of experience across government and non-government sectors, 
              including NSW Health.
            </p>
            <div className="flex items-center gap-2 text-[#8A9A86]">
              <MapPin size={18} />
              <span>Northern NSW (Byron Bay Region), Australia</span>
            </div>
          </motion.div>
        </div>

        {/* My Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#2A3026] mb-6">
                My Approach
              </h2>
              <div className="space-y-4 text-[#5C6656] leading-relaxed">
                <p>
                  I bring strong interpersonal skills, warmth, and professionalism to my work, 
                  grounded in a deep belief in the power of therapeutic alliance and human connection.
                </p>
                <p>
                  My practice focuses on identifying individual strengths and supporting clients 
                  to create meaningful, sustainable change aligned with their goals and dreams.
                </p>
                <p>
                  I draw on evidence-based modalities tailored to each individual's needs, 
                  creating a safe and supportive space for exploration and growth.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#FFAA80]/20 rounded-3xl" />
              <img
                src={IMAGES.nature}
                alt="Byron Bay nature"
                className="relative z-10 w-full rounded-3xl object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </motion.div>

        {/* Therapeutic Approaches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-[#F4EFE6] rounded-3xl p-10 md:p-16">
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
              Modalities
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#2A3026] mb-8">
              Therapeutic Approaches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {approaches.map((approach, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border-l-4 border-[#FFAA80]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FFAA80]" />
                  <span className="text-[#2A3026]">{approach}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Future Training */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="bg-[#2A3026] rounded-3xl p-10 md:p-16">
            <p className="text-[#FFAA80] text-sm tracking-[0.2em] uppercase font-semibold mb-4">
              Coming Soon
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#F9F6F0] mb-4">
              Psychedelic-Assisted Therapy
            </h2>
            <p className="text-[#8A9A86] max-w-2xl mx-auto">
              I am currently training in Psychedelic-Assisted Therapy (commencing 2026), 
              expanding my toolkit to offer innovative approaches to mental health and healing.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#2A3026] mb-4">
            Ready to Begin?
          </h2>
          <p className="text-[#5C6656] mb-8 max-w-md mx-auto">
            I'd love to hear from you. Let's explore how we can work together 
            towards meaningful change.
          </p>
          <a
            href="mailto:hello@nataliecbull.com?subject=Counselling%20Enquiry"
            className="inline-block bg-[#8A9A86] hover:bg-[#748570] text-white px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1"
          >
            Get in Touch
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#EAE4D9] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center text-[#5C6656]">
          <p>© {new Date().getFullYear()} Natalie Bull. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
