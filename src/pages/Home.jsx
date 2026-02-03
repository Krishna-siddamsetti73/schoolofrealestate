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
import { Helmet } from "react-helmet-async";


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
  <main>
    <Helmet>
<title>Real Estate Training Institute in Hyderabad | HSRE</title>

<meta
  name="description"
  content="Hyderabad School of Real Estate (HSRE) offers professional real estate training, RERA certification, and career-focused property education in Hyderabad."
/>

<link rel="canonical" href="https://hsre.in/" />
<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "EducationalOrganization",
      "@id": "https://hsre.in/#organization",
      "name": "Hyderabad School of Real Estate",
      "url": "https://hsre.in",
      "logo": "https://www.hsre.in/HSR_Logo.png",
      "sameAs": [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://www.linkedin.com/"
      ]
    },

    {
      "@type": "LocalBusiness",
      "@id": "https://hsre.in/#localbusiness",
      "name": "Hyderabad School of Real Estate",
      "image": "https://www.hsre.in/HSR_Logo.png",
      "url": "https://hsre.in",
      "telephone": "+91-8977533213",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "India"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "priceRange": "₹₹",
      "parentOrganization": {
        "@id": "https://hsre.in/#organization"
      }
    },

    {
      "@type": "WebSite",
      "@id": "https://hsre.in/#website",
      "url": "https://hsre.in",
      "name": "Hyderabad School of Real Estate",
      "publisher": {
        "@id": "https://hsre.in/#organization"
      },
      "inLanguage": "en-IN"
    }

  ]
}
`}
</script>
</Helmet>



    <h1 className="sr-only">
      Real Estate Training Institute in Hyderabad – Hyderabad School of Real Estate
    </h1>

    <section id="hero">
      <Hero />
    </section>

    <section id="about">
      <About />
    </section>

    <section id="gallery">
      <Gallery />
    </section>

    <section id="courses">
      <Courses />
    </section>

    <section id="contact">
      <Contact />
    </section>

    <section id="reviews">
      <HSREReviewSection />
    </section>

    <section id="why-choose-us">
      <WhyChooseUs />
    </section>

    <section id="faqs">
      <FAQs />
    </section>

  </main>
);
};

export default Home;