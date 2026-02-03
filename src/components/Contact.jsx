import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Helmet } from "react-helmet-async";
const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return toast({
          title: t("contact.toast.errorTitle"),
          description: data?.message || t("contact.toast.errorDescription"),
          variant: "destructive",
        });
      }

      toast({
        title: t("contact.toast.successTitle"),
        description: t("contact.toast.successDescription"),
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("🚨 Server unreachable:", error);

      toast({
        title: t("contact.toast.networkTitle"),
        description: t("contact.toast.networkDescription"),
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.info.callTitle"),
      content: "8977533213",
      link: "tel:8977533213"
    },
    {
      icon: Mail,
      title: t("contact.info.emailTitle"),
      content: "info@hsre.in",
      link: "mailto:info@hsre.in"
    },
    {
      icon: MapPin,
      title: t("contact.info.visitTitle"),
      content: t("contact.info.address"),
      link: "https://maps.app.goo.gl/c6dSscyKdMz6wb1f8"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">

  <Helmet>
  <title>Contact HSRE | Real Estate Training Institute Hyderabad</title>

  <meta
    name="description"
    content="Contact Hyderabad School of Real Estate for RERA training, property investment courses, and real estate certification in Hyderabad. Call, WhatsApp, or visit our institute today."
  />

  <link rel="canonical" href="https://hsre.in/#contact" />

  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:title" content="Contact Hyderabad School of Real Estate" />
  <meta property="og:description" content="Get in touch with HSRE for real estate training and certification courses in Hyderabad." />
  <meta property="og:url" content="https://hsre.in/#contact" />
  <meta property="og:type" content="website" />

  {/* Local Business Structured Data */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Hyderabad School of Real Estate",
      "image": "https://hsre.in/favicon.ico",
      "url": "https://hsre.in",
      "telephone": "+91-8977533213",
      "email": "info@hsre.in",

      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.4242,
        "longitude": 78.4230
      },

      "openingHours": "Mo-Sa 10:00-19:00",

      "sameAs": [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://www.linkedin.com/"
      ]
    }
    `}
  </script>
</Helmet>


      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017),
                             linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins">
            {t("contact.title.part1")} <span className="text-[#1E3A8A]">{t("contact.title.part2")}</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#FAF6EF] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-[#2F3542] mb-6">
                {t("contact.form.heading")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#2F3542] font-semibold mb-2">
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#1E3A8A]/20"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-[#2F3542] font-semibold mb-2">
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#1E3A8A]/20"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-[#2F3542] font-semibold mb-2">
                    {t("contact.form.phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#1E3A8A]/20"
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-[#2F3542] font-semibold mb-2">
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#1E3A8A]/20 resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Send className="mr-2" size={20} />
                  {t("contact.form.submit")}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4A017] group"
                >
                  <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] p-4 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <info.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2F3542] mb-1">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#D4A017]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7412413288534!2d78.42302377494829!3d17.42420128346931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97823b1eb9e1%3A0xb7c018bc7fb59f46!2sHyderabad%20School%20of%20Realestate%20(HSR)!5e0!3m2!1sen!2sin!4v1765178442085!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                title={t("contact.mapTitle")}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Buttons */}
        <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 1, type: "spring" }}
  whileHover={{ scale: 1.1 }}
  className="fixed bottom-40 right-6 z-50"
>
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="relative w-20 h-8 bg-gray-200 rounded-full flex items-center cursor-pointer select-none shadow-lg"
    onClick={() =>
      i18n.changeLanguage(i18n.language === "en" ? "te" : "en")
    }
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute w-10 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
        i18n.language === "en"
          ? "bg-[#D4A017] text-white left-0"
          : "bg-[#1E3A8A] text-white right-0"
      }`}
    />

    <span className="absolute left-2 text-xs text-gray-600 font-semibold">
      EN
    </span>
    <span className="absolute right-2 text-xs text-gray-600 font-semibold">
      తె
    </span>
  </motion.div>
</motion.div>

      
      <motion.a
        href="https://wa.me/918977533213"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ rotate: 360 }}
      >
        <BsWhatsapp size={28} />
      </motion.a>

      <motion.a
        href="tel:8977533213"
        className="fixed bottom-24 right-6 bg-[#1E3A8A] hover:bg-[#2563EB] text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ rotate: 360 }}
      >
        <Phone size={28} />
      </motion.a>
    </section>
  );
};

export default Contact;
