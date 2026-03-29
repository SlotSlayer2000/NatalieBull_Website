import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-[#F9F6F0]/90 backdrop-blur-xl border-b border-[#D1C9BC]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
              Natalie C Bull
            </a>
            <div className="flex items-center gap-6">
              <a href="/resources" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium">
                Resources
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
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
            Blog
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl tracking-tight leading-none font-medium text-[#2A3026] mb-6">
            Thoughts & Reflections
          </h1>
          <p className="text-[#5C6656] text-lg max-w-2xl mx-auto">
            Insights on mental health, wellbeing, and the journey of personal growth.
          </p>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[#F4EFE6] rounded-3xl"
        >
          <div className="w-20 h-20 bg-[#FFAA80]/25 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✨</span>
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026] mb-4">
            Coming Soon
          </h3>
          <p className="text-[#5C6656] mb-8 max-w-md mx-auto">
            I'm working on some thoughtful content to share with you. 
            Check back soon for articles on mental health, mindfulness, and personal growth.
          </p>
          <a
            href="/resources"
            className="inline-flex items-center gap-2 text-[#8A9A86] hover:text-[#748570] font-medium"
          >
            Explore Resources
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#EAE4D9] rounded-3xl p-12">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#2A3026] mb-4">
              Stay Connected
            </h2>
            <p className="text-[#5C6656] mb-8 max-w-md mx-auto">
              Want to be notified when new articles are published? 
              Reach out and let me know.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-[#8A9A86] hover:bg-[#748570] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#EAE4D9] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center text-[#5C6656]">
          <p>© {new Date().getFullYear()} Natalie C Bull. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
