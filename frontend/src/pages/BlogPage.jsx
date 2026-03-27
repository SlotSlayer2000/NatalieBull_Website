import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ArrowRight, Tag } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

const CATEGORY_COLORS = {
  "Mental Health": "bg-blue-100 text-blue-800",
  "Mindfulness": "bg-green-100 text-green-800",
  "Personal Growth": "bg-purple-100 text-purple-800",
  "Relationships": "bg-pink-100 text-pink-800",
  "Yoga": "bg-teal-100 text-teal-800",
  "Self-Care": "bg-orange-100 text-orange-800",
  "default": "bg-[#8A9A86]/10 text-[#8A9A86]"
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setPosts(response.data.filter(post => post.status === "published"));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["all", ...new Set(posts.map(post => post.category))];
  
  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  };

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

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#8A9A86] text-white"
                    : "bg-[#EAE4D9] text-[#5C6656] hover:bg-[#D6CEC4]"
                }`}
              >
                {category === "all" ? "All Posts" : category}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[#8A9A86] border-t-transparent rounded-full mx-auto" />
            <p className="text-[#5C6656] mt-4">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-[#F4EFE6] rounded-3xl"
          >
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-4">
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
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="blog-posts"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                className="bg-[#F4EFE6] rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-[#D1C9BC] group"
                data-testid={`blog-post-${post.id}`}
              >
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-[#5C6656] text-sm flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026] mb-3 group-hover:text-[#8A9A86] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#5C6656] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#8A9A86] hover:text-[#748570] font-medium"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
