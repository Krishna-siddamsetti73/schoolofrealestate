import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import blogPosts from '@/blog';

const BlogPost = () => {

  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

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
        "item": "https://www.hsre.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.hsre.in/blog/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hyderabad Real Estate School"
    },
    "datePublished": post.date,
    "mainEntityOfPage": `https://www.hsre.in/blog/${post.slug}`
  };

  return (
    <>

      <Helmet>
        <title>{post.title} | Hyderabad Real Estate School Blog</title>
        <meta name="description" content={post.excerpt} />

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#2F3542]" role="region" aria-labelledby="post-title">
        <div className="container mx-auto px-4">

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-gray-400 mb-6"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-[#D4A017] transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{post.category}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#D4A017] text-[#2F3542] text-xs font-bold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            <h1
              id="post-title"
              className="text-3xl md:text-5xl font-bold text-white mb-6 font-poppins leading-tight"
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-300 text-sm gap-4">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] max-w-5xl mx-auto"
        >
          <img
            className="w-full h-full object-cover"
            src={post.image}
            alt={post.title}
          />
        </motion.div>
      </div>

      {/* Content */}
      <section className="py-16 bg-white" role="region" aria-label="Article content">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {post.content.map((block, i) =>
                typeof block === 'string' ? (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6">
                    {block}
                  </p>
                ) : (
                  <h2
                    key={i}
                    className="text-2xl font-bold text-[#2F3542] mt-10 mb-4 font-poppins"
                  >
                    {block.heading}
                  </h2>
                )
              )}
            </motion.article>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 p-8 rounded-2xl bg-[#2F3542] text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3 font-poppins">
                Ready to Start Your Real Estate Career?
              </h3>
              <p className="text-gray-300 mb-6">
                Join Hyderabad Real Estate School's next training batch and learn from industry experts.
              </p>
              <Link
                to="/#contact"
                className="inline-block bg-[#D4A017] text-[#2F3542] font-bold px-8 py-3 rounded-full hover:bg-white transition-colors duration-300"
              >
                Enquire Now
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50" role="region" aria-labelledby="related-heading">
        <div className="container mx-auto px-4">
          <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-[#2F3542] mb-10 text-center font-poppins">
            More from the <span className="text-[#1E3A8A]">Blog</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedPosts.map((rp, index) => (
              <motion.article
                key={rp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link to={`/blog/${rp.slug}`}>
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={rp.image}
                      alt={rp.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#2F3542] mb-2 font-poppins leading-snug group-hover:text-[#1E3A8A] transition-colors duration-300">
                      {rp.title}
                    </h3>
                    <span className="text-[#1E3A8A] font-semibold text-sm group-hover:text-[#D4A017] transition-colors duration-300">
                      Read More →
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

export default BlogPost;