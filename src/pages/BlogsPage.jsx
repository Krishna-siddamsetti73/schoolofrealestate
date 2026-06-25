import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import blogPosts from '@/blog';

const Blog = () => {

  /* ---------------- STRUCTURED SEO DATA ---------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.hsre.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.hsre.in/blogs"
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Hyderabad Real Estate School Blog",
    "description": "Insights, tips, and updates on real estate training, careers, and the property market in Hyderabad.",
    "url": "https://www.hsre.in/blogs"
  };

  const posts = blogPosts;

  const categories = ['All', 'Career Guidance', 'Skills & Training', 'Market Insights', 'Marketing'];

  return (
    <>

      <Helmet>
        <title>Blog | Hyderabad Real Estate School</title>
        <meta
          name="description"
          content="Insights, tips, and updates on real estate training, careers, and the property market in Hyderabad."
        />

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-[#2F3542]" role="region" aria-labelledby="blog-hero-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1
              id="blog-hero-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins"
            >
              Our <span className="text-[#D4A017]">Blog</span>
            </h1>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real estate career advice, training insights, and market trends from the HSRE team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section id="blog" className="py-20 bg-white" role="region" aria-labelledby="blog-heading">
        <div className="container mx-auto px-4">

          {/* Category Filter (static for now) */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Blog categories">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  i === 0
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : 'bg-white text-[#2F3542] border-gray-300 hover:border-[#D4A017] hover:text-[#1E3A8A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <h2 id="blog-heading" className="sr-only">Latest Blog Posts</h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Blog posts"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                role="listitem"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-[#D4A017]"
              >
                <Link to={`/blogs/${post.slug}`} aria-label={post.title}>

                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-[#D4A017] text-[#2F3542] text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#2F3542] mb-3 font-poppins leading-snug group-hover:text-[#1E3A8A] transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center text-[#1E3A8A] font-semibold text-sm group-hover:text-[#D4A017] transition-colors duration-300">
                      Read More
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                </Link>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Blog;