import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Courses from '@/components/Courses'; // This is the section summary
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import FAQs from '@/components/FAQs';
import Contact from '@/components/Contact';
import HSREReviewSection from '@/components/HSREReviewSection';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Gallery/>
      <Courses />
       <Contact/>
      <HSREReviewSection />
      <WhyChooseUs/>
      <FAQs/>
     
    </>
  );
};

export default Home;