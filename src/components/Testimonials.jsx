import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Testimonials = () => {

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
        "name": "Testimonials",
        "item": "https://www.hsre.in/#testimonials"
      }
    ]
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Real Estate Training Course - Hyderabad Real Estate School",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What do students say about Hyderabad Real Estate School?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Students consistently highlight the practical field training, mentorship from industry experts, and career support that helped them launch successful real estate careers."
        }
      },
      {
        "@type": "Question",
        "name": "Have HSRE graduates found success after the course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many HSRE graduates have gone on to build successful careers as independent agents, brokers, and real estate consultants across Hyderabad."
        }
      },
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hyderabad Real Estate School",
    "image": "https://www.hsre.in/HSR_Logo.png",
    "telephone": "+91-89775 33213",
    "url": "https://hyderabadrealestateschool.com"
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Real Estate Training Course Hyderabad",
    "provider": {
      "@type": "Organization",
      "name": "Hyderabad Real Estate School"
    }
  };

  /* ---------------- SAMPLE TESTIMONIAL DATA (replace with real content later) ---------------- */

  const testimonials = [
    {
      name: 'Priya Reddy',
      role: 'Independent Real Estate Agent',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'HSRE gave me the confidence and practical skills to start my own real estate practice within three months of finishing the course. The field training made all the difference.'
    },
    {
      name: 'Arjun Varma',
      role: 'Property Consultant',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'The mentorship from Gampa Nageshwer Rao sir and the negotiation training completely changed how I approach client conversations. I closed my first deal within weeks of graduating.'
    },
    {
      name: 'Sneha Kumari',
      role: 'Real Estate Broker',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'I came from a non-sales background with zero industry knowledge. HSRE built me up from the basics to running my own brokerage today. Forever grateful for this program.'
    },
    {
      name: 'Mohammed Faizan',
      role: 'Sales Manager, Property Group',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'The certification carries real weight in the industry. Clients trust me more, and the digital marketing module helped me build a strong personal brand online.'
    },
    {
      name: 'Lakshmi Narayana',
      role: 'Independent Property Advisor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'What sets HSRE apart is the practical site visits. Reading a property the right way is something you simply cannot learn from a textbook alone.'
    },
    {
      name: 'Ravi Teja',
      role: 'Real Estate Entrepreneur',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      rating: 5,
      quote: 'Best decision I made for my career. The trainers genuinely care about your growth and stay accessible long after the course ends.'
    }
  ];

  const maxVideoSlots = 30;
  const maxImageSlots = 50;

  const videoItems = [
    {
      type: 'video',
      batch: 'Batch 7',
      url: '/VID_20251124_143314.webm',
      poster: 'https://lh3.googleusercontent.com/pw/AP1GczOafXRCpIPPC36TX0kYVKfRBcsCW_kach7VURimE7-3KboTTjU4sfyOyGJda9QeS5NW1TKCKqkgR8JNIGwvBEpLFHC4GSjnTiJNCVAKARW9b_5PNuGvA8yWDtZtVpi2CTGA9-msHuj-jHhDVeiM7ffa=w1170-h878-s-no-gm?authuser=0',
      caption: 'Student testimonial from practical field training session'
    }
  ];

  const imageItems = [
    {
      type: 'image',
      batch: 'Batch 7',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=900&fit=crop',
      caption: 'Hands-on real estate training in the field'
    },
    {
      type: 'image',
      batch: 'Batch 7',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=900&fit=crop',
      caption: 'Classroom learning with expert mentorship'
    },
    {
      type: 'image',
      batch: 'Batch 7',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=900&fit=crop',
      caption: 'Certification and student achievement showcase'
    }
  ];

  const videoSlotsAvailable = maxVideoSlots - videoItems.length;
  const imageSlotsAvailable = maxImageSlots - imageItems.length;

  const renderStars = (rating) => (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-[#D4A017]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.063 9.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" />
        </svg>
      ))}
    </div>
  );

  return (
    <>

      <Helmet>

        {/* JSON-LD SEO */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>

      </Helmet>

      {/* ============ SECTION 1: TESTIMONIALS ============ */}
      <section
        id="testimonials"
        className="py-20 bg-gray-50"
        role="region"
        aria-labelledby="testimonials-heading"
      >

        <div className="container mx-auto px-4">

          {/* Heading Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >

            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins"
            >
              Voices of Our <span className="text-[#1E3A8A]">Students</span>
            </h2>

            <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>

            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Real stories from students who built successful real estate careers through Hyderabad Real Estate School's training programs
            </p>

          </motion.div>

          {/* Testimonials Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Student testimonials"
          >

            {testimonials.map((t, index) => (
              <motion.figure
                key={index}
                role="listitem"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-[#D4A017]"
              >

                {/* Quote mark */}
                <svg
                  className="absolute top-6 right-6 w-10 h-10 text-[#1E3A8A]/10"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm17.472 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L26.824 4z" />
                </svg>

                {renderStars(t.rating)}

                <p className="text-gray-700 text-base leading-relaxed my-6 relative z-10">
                  "{t.quote}"
                </p>

                <figcaption className="flex items-center gap-4 mt-auto">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4A017]"
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                  />
                  <div>
                    <p className="font-bold text-[#2F3542] font-poppins">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </figcaption>

                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ boxShadow: '0 0 0px rgba(212,160,23,0)' }}
                  whileHover={{ boxShadow: '0 0 25px rgba(212,160,23,0.6)' }}
                  transition={{ duration: 0.3 }}
                />

              </motion.figure>
            ))}

          </div>

          {/* ============ SECTION 2: VIDEO & IMAGES ============ */}
          <section
            id="testimonial-media"
            className="py-20 bg-white"
            role="region"
            aria-labelledby="testimonial-media-heading"
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2
                  id="testimonial-media-heading"
                  className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins"
                >
                  Testimonials <span className="text-[#1E3A8A]">Video & Images</span>
                </h2>
                <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Watch real student stories and see moments from our live training sessions.
                </p>
              </motion.div>

              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
                >
                  <div className="relative overflow-hidden bg-black">
                    <video
                      src={videoItems[0].url}
                      poster={videoItems[0].poster}
                      controls
                      className="w-full h-full max-h-[520px] object-cover"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">
                      {videoItems[0].batch}
                    </span>
                  </div>
                  <div className="bg-[#f8fafc] px-6 py-4">
                    <p className="text-sm text-gray-500">Video testimonial</p>
                    <p className="mt-3 text-gray-700">{videoItems[0].caption}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {videoItems.length} of {maxVideoSlots} Batch 7 video slots filled.
                    </p>
                  </div>
                </motion.div>

                <div className="grid gap-6">
                  {imageItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="rounded-3xl overflow-hidden shadow-lg border border-gray-200"
                    >
                      <div className="relative">
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="w-full h-56 object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-4 left-4 rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">
                          {item.batch}
                        </span>
                      </div>
                      <div className="bg-white px-5 py-4">
                        <p className="text-gray-700">{item.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: imageItems.length * 0.1 }}
                    className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500"
                  >
                    <p className="font-semibold text-[#2F3542]">{imageSlotsAvailable} more Batch 7 image slots available</p>
                    <p className="mt-2 text-sm">Add more image URLs to the code and these cards will grow.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-700 text-lg mb-6">
              Ready to write your own success story?
            </p>
            <a
              href="/#contact"
              className="inline-block bg-[#1E3A8A] text-white font-bold px-8 py-3 rounded-full hover:bg-[#D4A017] hover:text-[#2F3542] transition-colors duration-300"
            >
              Join Our Next Batch
            </a>
          </motion.div>

        </div>

      </section>

    </>
  );
};

export default Testimonials;