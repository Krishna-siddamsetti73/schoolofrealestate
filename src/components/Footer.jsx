import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, HandCoins } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const PAYMENT_LINK = "https://rzp.io/l/vvfKg15";

  const quickLinks = [
    { name: t("footer.quickLinks.home"), id: "home", path: "/" },
    { name: t("footer.quickLinks.about"), id: "about", path: "/" },
    { name: t("footer.quickLinks.courses"), id: "courses", path: "/courses" },
    { name: t("footer.quickLinks.gallery"), id: "gallery", path: "/" },
    { name: t("footer.quickLinks.faqs"), id: "faqs", path: "/" },
    { name: t("footer.quickLinks.contact"), id: "contact", path: "/contact" }
  ];

  const courses = [
    t("footer.courses.basics"),
    t("footer.courses.agent"),
    t("footer.courses.rera"),
    t("footer.courses.sales"),
    t("footer.courses.docs"),
    t("footer.courses.digital")
  ];

  const socialLinks = [
    { icon: Facebook, link: 'https://www.facebook.com/HyderabadSchoolofRealestate', color: 'hover:bg-blue-600' },
    { icon: Instagram, link: 'https://www.instagram.com/hsre.in', color: 'hover:bg-pink-600' },
    { icon: Twitter, link: '#', color: 'hover:bg-sky-500' },
    { icon: Linkedin, link: '#', color: 'hover:bg-blue-700' },
    { icon: Youtube, link: '#', color: 'hover:bg-red-600' }
  ];

  const handleLinkClick = (link) => {
    if (link.path !== "/") {
      navigate(link.path);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: link.id } });
    } else {
      const element = document.getElementById(link.id);
      if (element) {
        const offset = 80;
        const pos = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#2F3542] to-[#1a1d24] text-white relative overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-[#1E3A8A] via-[#D4A017] to-[#1E3A8A]"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #D4A017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* TOP CONTENT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <img src="/hsrefooterlogo.png" alt="Hyderabad School of Real Estate" className="h-20 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-300 leading-relaxed mb-4">
              {t("footer.about.description")}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.link} whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white/10 ${social.color} p-2 rounded-full`}>
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">{t("footer.quickLinks.title")}</h3>

            <ul className="space-y-2">
              {quickLinks.map((lnk, i) => (
                <li key={i}>
                  <button onClick={() => handleLinkClick(lnk)}
                    className="text-gray-300 hover:text-[#D4A017] transition-colors hover:translate-x-2 inline-block">
                    {lnk.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Course Outcomes */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">{t("footer.courses.title")}</h3>

            <ul className="space-y-2">
              {courses.map((c, i) => (
                <li key={i} className="text-gray-300">
                  <span className="text-[#1E3A8A] mr-2">▸</span>
                  <a href="/courses">{c}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">{t("footer.contact.title")}</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-[#1E3A8A]" size={20} />
                <div>
                  <p className="text-sm text-gray-400">{t("footer.contact.call")}</p>
                  <a href="tel:8977533213" className="text-white hover:text-[#1E3A8A]">89775 33213</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-[#1E3A8A]" size={20} />
                <div>
                  <p className="text-sm text-gray-400">{t("footer.contact.email")}</p>
                  <a href="mailto:info@hsre.in" className="text-white hover:text-[#1E3A8A]">info@hsre.in</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-[#1E3A8A]" size={20} />
                <div>
                  <p className="text-sm text-gray-400">{t("footer.contact.location")}</p>
                  <p className="text-white">{t("footer.contact.address")}</p>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Payment Button */}
          <motion.div>
            <Button
              onClick={() => window.open(PAYMENT_LINK, "_blank")}
              className="bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105"
            >
              <HandCoins className="w-4 h-4 mr-2" /> {t("footer.payment.button")}
            </Button>
          </motion.div>

        </div>

        {/* SEO Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h4 className="text-lg font-semibold text-[#D4A017] mb-2">{t("footer.seo.title")}</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t("footer.seo.description")}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 Hyderabad School of Real Estate. {t("footer.bottom.rights")}
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-[#1E3A8A]">{t("footer.bottom.privacy")}</button>
              <button className="text-gray-400 hover:text-[#1E3A8A]">{t("footer.bottom.terms")}</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
