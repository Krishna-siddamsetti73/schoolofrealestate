import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Real Estate Agent',
      rating: 5,
      text: 'The training at HSRE was exceptional! I learned everything from basics to advanced sales techniques. Now I am successfully running my own real estate business in Hyderabad.',
      image: 'Professional Indian male real estate agent in formal attire'
    },
    {
      name: 'Priya Sharma',
      role: 'Property Consultant',
      rating: 5,
      text: 'Best decision I made was joining this institute. The practical training and field visits helped me understand the real estate market deeply. Highly recommended!',
      image: 'Professional Indian female property consultant smiling'
    },
    {
      name: 'Anil Reddy',
      role: 'Real Estate Entrepreneur',
      rating: 5,
      text: 'The certification from HSRE opened many doors for me. The trainers are experienced professionals who share real-world insights. Thank you for the wonderful learning experience!',
      image: 'Confident Indian male entrepreneur in business suit'
    },
    {
      name: 'Sneha Patel',
      role: 'Property Advisor',
      rating: 5,
      text: 'Amazing institute with comprehensive curriculum! From RERA regulations to digital marketing, everything was covered in detail. I feel confident in my real estate career now.',
      image: 'Young Indian female professional in office setting'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* ===== SEO STRUCTURED DATA ===== */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hsre.co.in"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Student Testimonials",
                    "item": "https://hsre.co.in/#testimonials"
                  }
                ]
              },
              {
                "@type": "Course",
                "name": "Real Estate Training Program Hyderabad",
                "description": "Professional real estate training with certification, practical learning, and RERA guidance.",
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "HSRE Real Estate Training Institute",
                  "sameAs": "https://hsre.co.in"
                }
              },
              {
                "@type": "LocalBusiness",
                "name": "HSRE Real Estate Institute",
                "image": "https://hsre.co.in/logo.png",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hyderabad",
                  "addressCountry": "India"
                },
                "telephone": "+91XXXXXXXXXX",
                "url": "https://hsre.co.in"
              },
              {
                "@type": "FAQPage",
                "mainEntity": testimonials.map((t) => ({
                  "@type": "Question",
                  "name": `What do students say about HSRE real estate training?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.text
                  }
                }))
              }
            ]
          })}
        </script>
      </Helmet>

      {/* ===== TESTIMONIAL SECTION ===== */}
      <section
        id="testimonials"
        aria-labelledby="testimonial-heading"
        className="py-20 bg-gradient-to-br from-[#2F3542] to-[#1a1d24] relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Star size={20} fill="#D4A017" color="#D4A017" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* ===== Header ===== */}
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="testimonial-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins"
              >
                Student <span className="text-[#D4A017]">Testimonials</span>
              </h2>

              <div className="w-24 h-1 bg-[#1E3A8A] mx-auto rounded-full mb-6"></div>

              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Hear what our successful graduates say about HSRE real estate training in Hyderabad.
              </p>
            </motion.div>
          </header>

          {/* ===== Testimonials Slider ===== */}
          <div
            className="max-w-4xl mx-auto relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Student testimonials carousel"
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={currentIndex}
                itemScope
                itemType="https://schema.org/Review"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">

                  {/* Student Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4A017] shadow-lg">
                      <img
                        className="w-full h-full object-cover"
                        alt={`${testimonials[currentIndex].name} HSRE Student`}
                        src="https://images.unsplash.com/photo-1644424235476-295f24d503d9"
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <Quote className="text-[#D4A017] mb-4" size={40} aria-hidden="true" />

                    <p
                      className="text-gray-700 text-lg mb-6 leading-relaxed italic"
                      itemProp="reviewBody"
                    >
                      "{testimonials[currentIndex].text}"
                    </p>

                    {/* Ratings */}
                    <div
                      className="flex items-center justify-center md:justify-start gap-1 mb-4"
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={testimonials[currentIndex].rating.toString()} />
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} size={24} fill="#D4A017" color="#D4A017" />
                      ))}
                    </div>

                    <h3
                      className="text-2xl font-bold text-[#2F3542] mb-1"
                      itemProp="author"
                    >
                      {testimonials[currentIndex].name}
                    </h3>

                    <p className="text-[#1E3A8A] font-semibold">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-[#D4A017] w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
