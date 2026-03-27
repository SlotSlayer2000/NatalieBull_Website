import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#8A9A86] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-medium text-[#2A3026] mb-4">
            Post Not Found
          </h1>
          <p className="text-[#5C6656] mb-8">The article you're looking for doesn't exist.</p>
          <a href="/blog" className="text-[#8A9A86] hover:text-[#748570] font-medium">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-[#F9F6F0]/90 backdrop-blur-xl border-b border-[#D1C9BC]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
              Natalie C Bull
            </a>
            <a href="/blog" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium flex items-center gap-2">
              <ChevronLeft size={18} />
              Back to Blog
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-[#5C6656]">
            <span className="px-3 py-1 bg-[#8A9A86]/10 text-[#8A9A86] rounded-full font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#2A3026] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-[#5C6656] leading-relaxed mb-8 border-l-4 border-[#8A9A86] pl-6">
            {post.excerpt}
          </p>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="rounded-3xl overflow-hidden mb-12">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-[#5C6656] leading-relaxed
              prose-headings:font-['Cormorant_Garamond'] prose-headings:text-[#2A3026] prose-headings:font-medium
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:mb-6
              prose-a:text-[#8A9A86] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#2A3026]
              prose-ul:my-6 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#8A9A86] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#5C6656]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-[#D1C9BC]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src="https://customer-assets.emergentagent.com/job_care-connect-375/artifacts/boglppm6_image.png"
                  alt="Natalie C Bull"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-[#2A3026]">Natalie C Bull</p>
                <p className="text-sm text-[#5C6656]">Mental Health Social Worker & AOD Counsellor</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[#8A9A86] hover:text-[#748570] font-medium"
            >
              <ArrowLeft size={18} />
              All Posts
            </a>
            <a
              href="/book"
              className="inline-flex items-center gap-2 bg-[#8A9A86] hover:bg-[#748570] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Book a Session
            </a>
          </div>
        </motion.article>
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

export default BlogPostPage;
