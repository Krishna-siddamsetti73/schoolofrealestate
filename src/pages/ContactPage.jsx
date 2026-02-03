import React from 'react';
import { Helmet } from 'react-helmet';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us – Hyderabad Real Estate School</title>
        <meta name="description" content="Get in touch with Hyderabad School of Real Estate. Contact us for inquiries about real estate courses, admissions, or any other information." />
      </Helmet>
      <Contact />
    </>
  );
};

export default ContactPage;