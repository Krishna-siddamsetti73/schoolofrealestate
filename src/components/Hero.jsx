import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, MapPin, Award } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides with translation keys
  const slides = [
    {
      type: "video",
      src: "/4185235-hd_1920_1080_25fps.webm",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
      description: t("hero.slide1.description"),
    },
    {
      type: "image",
      src: "/bailey-anselme-Bkp3gLygyeA-unsplash.jpg",
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
      description: t("hero.slide2.description"),
    },
    {
      type: "image",
      src: "/chase-chappell-_HWTcSrzXF4-unsplash.jpg",
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
      description: t("hero.slide3.description"),
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const floatingIcons = [
    { Icon: Home, delay: 0, x: 100, y: 50 },
    { Icon: MapPin, delay: 0.5, x: -80, y: 80 },
    { Icon: Award, delay: 1, x: 120, y: -60 }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-[#1E3A8A]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            {slides[currentSlide].type === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                src={slides[currentSlide].src}
              />
            ) : (
              <img
                className="object-cover w-full h-full"
                src={slides[currentSlide].src}
                alt={slides[currentSlide].title}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/65 via-[#1E3A8A]/50 to-[#1E3A8A]/35"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating icons & particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-[#D4A017]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 360}deg`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-[#D4A017] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {slides[currentSlide].title}
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#D4A017] mb-6 font-semibold">
              {slides[currentSlide].subtitle}
            </h2>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => document.getElementById("courses").scrollIntoView({ behavior: "smooth" })}
                className="bg-[#D4A017] hover:bg-[#B8860B] text-white px-10 py-4 rounded-full font-semibold text-lg"
              >
                {t("hero.buttons.explore")}
              </button>

              <button
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1E3A8A] px-10 py-4 rounded-full font-semibold text-lg"
              >
                {t("hero.buttons.contact")}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-[#D4A017] w-12" : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
