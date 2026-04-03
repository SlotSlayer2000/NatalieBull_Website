import { motion } from "framer-motion";
import { ChevronLeft, MapPin } from "lucide-react";

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/boglppm6_image.png";

const IMAGES = {
  nature: "https://images.unsplash.com/photo-1635149203040-fa2068ddac5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxieXJvbiUyMGJheSUyMG5hdHVyZSUyMGNhbG18ZW58MHx8fHwxNzc0NTc1NzE4fDA&ixlib=rb-4.1.0&q=85"
};

const approaches = [
  "Cognitive Behavioural Therapy (CBT)",
  "Motivational Interviewing (MI)",
  "Acceptance and Commitment Therapy (ACT)",
  "Mindfulness-Based Cognitive Therapy (MBCT)",
  "Psychoeducation",
  "Strength-Based Approaches"
];

const whoIWorkWith = [
  "Alcohol and other drug (AOD) concerns, including harm reduction and recovery",
  "Trauma and the effects of past or recent traumatic experiences",
  "Anxiety, stress, and emotional overwhelm",
  "Life transitions and personal growth",
  "Relationship difficulties and interpersonal challenges",
  "Grief, loss, and adjustment to difficult life events"
];

const accessAndReferrals = [
  "Medicare rebates available with a Mental Health Treatment Plan from your GP",
  "Victims Services counselling approved provider",
  "Private referrals welcome",
  "Telehealth and in-person counselling available"
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
              Natalie Bull
            </h1>
            <div className="space-y-4 text-[#5C6656] leading-relaxed mb-6">
              <p>
                I believe that meaningful change is possible. My approach to counselling is collaborative and goal oriented, working together at your pace toward the outcomes that matter most to you. Sessions are structured, confidential, and compassionate, and incorporate psychological strategies that support your change and strengthen hope. Please see therapeutic approaches below.
              </p>
              <p>
                I am an Accredited Mental Health Social Worker with extensive experience supporting people experiencing trauma, mental health challenges, and concerns related to alcohol and other drug use. This accreditation recognises advanced training and clinical experience in providing evidence-based psychological therapies. My work is grounded in a trauma-informed and compassionate approach, supporting individuals to work toward meaningful change at a pace that feels safe and manageable.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#8A9A86]">
              <MapPin size={18} />
              <span>Northern NSW, Murwillumbah, Australia</span>
            </div>
          </motion.div>
        </div>

        {/* Who I Work With */}
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
                Who I Work With
              </h2>
              <p className="text-[#5C6656] mb-6">I support adults 16+ experiencing:</p>
              <ul className="space-y-3">
                {whoIWorkWith.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#5C6656]">
                    <div className="w-2 h-2 rounded-full bg-[#FFAA80] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#FFAA80]/20 rounded-3xl" />
              <img
                src={IMAGES.nature}
                alt="Nature scene"
                className="relative z-10 w-full rounded-3xl object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </motion.div>

        {/* Access and Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-[#EAE4D9] rounded-3xl p-10 md:p-16">
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#2A3026] mb-8">
              Access and Referrals
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {accessAndReferrals.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-[#F9F6F0] rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8A9A86] mt-2 flex-shrink-0" />
                  <span className="text-[#2A3026]">{item}</span>
                </div>
              ))}
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
            href="mailto:info@nataliebull.com.au?subject=Counselling%20Enquiry"
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
