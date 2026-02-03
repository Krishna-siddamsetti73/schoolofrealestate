import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import CoursesPage from '@/pages/CoursesPage';
import ContactPage from '@/pages/ContactPage'; // Import the new ContactPage
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Hyderabad Real Estate School – Real Estate Training Institute</title>
        <meta name="description" content="Leading Real Estate Training Institute in Hyderabad. Learn RERA, HMDA, DTCP regulations, sales skills, documentation, and digital marketing. Get certified and start your real estate career today." />
        <meta name="keywords" content="real estate training Hyderabad, real estate agent course, RERA training, HMDA DTCP course, property sales training, real estate certification Hyderabad" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="min-h-screen bg-[#FAF6EF]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* New route for ContactPage */}
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;