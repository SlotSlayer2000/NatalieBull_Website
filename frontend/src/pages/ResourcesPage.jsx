import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, ExternalLink, ChevronLeft } from "lucide-react";

const BOOKS = [
  {
    title: "On Becoming a Person",
    subtitle: "A Therapist's View of Psychotherapy",
    author: "Carl Rogers",
    description: "A classic exploration of the therapeutic relationship and the process of becoming one's true self through client-centered therapy.",
    category: "Psychotherapy",
    amazonUrl: "https://www.amazon.com/s?k=On+Becoming+a+Person+Carl+Rogers"
  },
  {
    title: "The Resilient Practitioner",
    subtitle: "Burnout Prevention and Self-Care Strategies for Counselors, Therapists, Teachers, and Health Professionals",
    author: "Thomas M. Skovholt",
    description: "Essential reading for helping professionals on maintaining wellbeing and preventing burnout while caring for others.",
    category: "Self-Care",
    amazonUrl: "https://www.amazon.com/s?k=The+Resilient+Practitioner+Skovholt"
  },
  {
    title: "Adult Attachment and Couple Psychotherapy",
    subtitle: "The 'Secure Base' in Practice and Research",
    author: "Christopher Clulow",
    description: "An insightful look at how attachment theory applies to couples therapy and building secure relationships.",
    category: "Relationships",
    amazonUrl: "https://www.amazon.com/s?k=Adult+Attachment+Couple+Psychotherapy+Clulow"
  },
  {
    title: "The 5 Love Languages of Children",
    subtitle: "The Secret to Loving Children Effectively",
    author: "Gary Chapman & Ross Campbell",
    description: "A practical guide to understanding and speaking your child's unique love language for deeper connection.",
    category: "Family",
    amazonUrl: "https://www.amazon.com/s?k=5+Love+Languages+Children+Chapman"
  }
];

const PEOPLE = [
  {
    name: "Brené Brown",
    focus: "Vulnerability, Courage & Shame Research",
    description: "Research professor and bestselling author known for her work on vulnerability, courage, empathy, and shame. Her TED talk on vulnerability is one of the most viewed of all time.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    links: {
      website: "https://brenebrown.com",
      podcast: "https://brenebrown.com/podcasts/"
    }
  },
  {
    name: "Andrew Huberman",
    focus: "Neuroscience & Health Optimization",
    description: "Stanford neuroscientist and host of the Huberman Lab podcast, sharing science-based tools for everyday life, mental health, and performance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    links: {
      website: "https://hubermanlab.com",
      podcast: "https://hubermanlab.com/podcast/"
    }
  },
  {
    name: "Howard Gardner",
    focus: "Multiple Intelligences & Education",
    description: "Developmental psychologist known for his theory of multiple intelligences, transforming how we understand human potential and learning.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    links: {
      website: "https://howardgardner.com"
    }
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("books");

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
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold text-[#8A9A86] mb-4">
            Resources
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl tracking-tight leading-none font-medium text-[#2A3026] mb-6">
            Learning & Inspiration
          </h1>
          <p className="text-[#5C6656] text-lg max-w-2xl mx-auto">
            A collection of books, thought leaders, and ideas that have shaped my practice 
            and continue to inspire my work in mental health and wellbeing.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("books")}
            data-testid="tab-books"
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              activeTab === "books"
                ? "bg-[#8A9A86] text-white"
                : "bg-[#EAE4D9] text-[#5C6656] hover:bg-[#D6CEC4]"
            }`}
          >
            <BookOpen size={18} className="inline mr-2" />
            Recommended Books
          </button>
          <button
            onClick={() => setActiveTab("people")}
            data-testid="tab-people"
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              activeTab === "people"
                ? "bg-[#8A9A86] text-white"
                : "bg-[#EAE4D9] text-[#5C6656] hover:bg-[#D6CEC4]"
            }`}
          >
            <User size={18} className="inline mr-2" />
            People I Follow
          </button>
        </div>

        {/* Books Section */}
        {activeTab === "books" && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8"
            data-testid="books-section"
          >
            {BOOKS.map((book) => (
              <motion.div
                key={book.title}
                variants={fadeInUp}
                className="bg-[#F4EFE6] rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-[#D1C9BC]"
                data-testid={`book-card-${book.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="inline-block px-3 py-1 bg-[#8A9A86]/10 text-[#8A9A86] text-sm font-medium rounded-full mb-4">
                  {book.category}
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-1">
                  {book.title}
                </h3>
                <p className="text-[#8A9A86] text-sm mb-2 italic">
                  {book.subtitle}
                </p>
                <p className="text-[#5C6656] font-medium mb-4">
                  by {book.author}
                </p>
                <p className="text-[#5C6656] leading-relaxed mb-6">
                  {book.description}
                </p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#8A9A86] hover:text-[#748570] font-medium"
                >
                  Find on Amazon
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* People Section */}
        {activeTab === "people" && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
            data-testid="people-section"
          >
            {PEOPLE.map((person) => (
              <motion.div
                key={person.name}
                variants={fadeInUp}
                className="bg-[#F4EFE6] rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-[#D1C9BC]"
                data-testid={`person-card-${person.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-[#8A9A86]/20">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-2">
                  {person.name}
                </h3>
                <p className="text-[#8A9A86] text-sm font-medium mb-4">
                  {person.focus}
                </p>
                <p className="text-[#5C6656] leading-relaxed mb-6 text-sm">
                  {person.description}
                </p>
                <div className="flex justify-center gap-3">
                  {person.links.website && (
                    <a
                      href={person.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#8A9A86] text-white rounded-full text-sm font-medium hover:bg-[#748570] transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {person.links.podcast && (
                    <a
                      href={person.links.podcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-[#8A9A86] text-[#2A3026] rounded-full text-sm font-medium hover:bg-[#8A9A86] hover:text-white transition-colors"
                    >
                      Podcast
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#2A3026] rounded-3xl p-12">
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-[#F9F6F0] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-[#8A9A86] mb-8 max-w-md mx-auto">
              These resources have helped shape my approach to therapy. 
              Let's explore how I can support you.
            </p>
            <a
              href="#contact"
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
          <p>© {new Date().getFullYear()} Natalie Bull. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
