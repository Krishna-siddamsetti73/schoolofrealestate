import React from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '@/blog';

const BlogPreview = ({ count = 3 }) => {
  const posts = Array.isArray(blogPosts) ? blogPosts.slice(0, count) : [];
  // Debug: ensure blogPosts is loaded
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('BlogPreview: blogPosts', blogPosts);
  }
  return (
    <section id="blog-preview" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2F3542] mb-6">Latest from our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length ? posts.map((post) => (
            <article key={post.slug} className="border rounded-lg overflow-hidden shadow-sm">
              <Link to={`/blogs/${post.slug}`}>
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          )) : (
            <div className="col-span-full text-center text-gray-500">No blog posts found — check console for import errors.</div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/blogs" className="inline-block bg-[#1E3A8A] text-white px-5 py-2 rounded-full">View all blogs</Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
