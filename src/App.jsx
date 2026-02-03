import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import CoursesPage from '@/pages/CoursesPage';
import ContactPage from '@/pages/ContactPage';
import { Toaster } from '@/components/ui/toaster';

function App() {

  /* ---------------- SEO STRUCTURED DATA ---------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hyderabadrealestateschool.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://hyderabadrealestateschool.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contact",
        "item": "https://hyderabadrealestateschool.com/contact"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Hyderabad Real Estate School?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hyderabad Real Estate School provides professional training on RERA, HMDA, DTCP regulations, sales skills, and real estate documentation."
        }
      },
      {
        "@type": "Question",
        "name": "Who can join real estate training courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anyone interested in starting or upgrading their career in real estate sales, brokerage, or property consulting can join."
        }
      }
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Real Estate Certification Course Hyderabad",
    "description": "Professional training covering RERA, HMDA, DTCP rules, property sales, legal documentation, and digital marketing for real estate.",
    "provider": {
      "@type": "Organization",
      "name": "Hyderabad Real Estate School",
      "sameAs": "https://hyderabadrealestateschool.com"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hyderabad Real Estate School",
    "image": "https://hyderabadrealestateschool.com/HSR_Logo.png",
    "telephone": "+91-9636963601",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "India"
    },
    "url": "https://hyderabadrealestateschool.com",
    "priceRange": "$$",
    "areaServed": "Hyderabad",
    "sameAs": [
      "https://hyderabadrealestateschool.com"
    ]
  };

  return (
    <>
      <Helmet>

        {/* Primary SEO */}
        <title>
          Hyderabad Real Estate School – Real Estate Training Institute
        </title>

        <meta
          name="description"
          content="Leading Real Estate Training Institute in Hyderabad. Learn RERA, HMDA, DTCP regulations, sales skills, documentation, and digital marketing."
        />

        <meta
          name="keywords"
          content="real estate training Hyderabad, RERA course Hyderabad, HMDA training, DTCP training, property sales training, real estate certification Hyderabad"
        />

        {/* Crawlability + Indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://hyderabadrealestateschool.com/" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Hyderabad Real Estate School" />
        <meta property="og:description" content="Professional Real Estate Training Institute in Hyderabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hyderabadrealestateschool.com/" />
        <meta property="og:image" content="https://hyderabadrealestateschool.com/HSR_Logo.png" />

        {/* Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Performance SEO */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
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

      {/* Semantic HTML + Accessibility SEO */}
      <div
        className="min-h-screen bg-[#FAF6EF]"
        role="document"
        aria-label="Hyderabad Real Estate School Application"
      >

        {/* Header Landmark */}
        <header role="banner" aria-label="Main Navigation">
          <Header />
        </header>

        {/* Main Content Landmark */}
        <main
          id="main-content"
          role="main"
          aria-label="Real Estate Training Content"
        >

          {/* Hidden SEO H1 for Heading Hierarchy */}
          <h1 className="sr-only">
            Hyderabad Real Estate Training Institute – RERA, HMDA & DTCP Certification Courses
          </h1>

          {/* Section ID for Internal Linking SEO */}
          <section id="website-routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </section>

        </main>

        {/* Footer Landmark */}
        <footer role="contentinfo" aria-label="Footer Information">
          <Footer />
        </footer>

        <Toaster />

      </div>
    </>
  );
}

export default App;
