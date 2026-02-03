import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[#2F3542] to-[#1a1d24] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Student <span className="text-[#D4A017]">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-[#1E3A8A] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear what our successful graduates have to say about their experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(212, 160, 23, 0.3)' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4A017] shadow-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      alt={testimonials[currentIndex].name}
                     src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="text-[#D4A017] mb-4" size={40} />
                  
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                      >
                        <Star size={24} fill="#D4A017" color="#D4A017" />
                      </motion.div>
                    ))}
                  </div>

                  <h4 className="text-2xl font-bold text-[#2F3542] mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-[#1E3A8A] font-semibold">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-[#D4A017] text-[#2F3542] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-[#D4A017] text-[#2F3542] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-[#D4A017] w-8' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;