import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, HandCoins } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const PAYMENT_LINK = "https://rzp.io/l/vvfKg15";

  /* ---------------- SCHEMA ---------------- */

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Hyderabad School of Real Estate",
    "url": "https://hsre.in",
    "logo": "https://hsre.in/hsrefooterlogo.png",
    "sameAs": [
      "https://www.facebook.com/HyderabadSchoolofRealestate",
      "https://www.instagram.com/hsre.in"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8977533213",
      "contactType": "customer service"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Hyderabad School of Real Estate",
    "telephone": "+91-8977533213",
    "email": "info@hsre.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressCountry": "India"
    }
  };

  /* ---------------- LINKS ---------------- */

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
    { icon: Facebook, link: 'https://www.facebook.com/HyderabadSchoolofRealestate', label: "Facebook" },
    { icon: Instagram, link: 'https://www.instagram.com/hsre.in', label: "Instagram" },
    { icon: Twitter, link: '#', label: "Twitter" },
    { icon: Linkedin, link: '#', label: "LinkedIn" },
    { icon: Youtube, link: '#', label: "YouTube" }
  ];

  /* Smooth scroll preserved */
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
    <footer
      role="contentinfo"
      lang={i18n.language}
      itemScope
      itemType="https://schema.org/WPFooter"
      className="bg-gradient-to-br from-[#2F3542] to-[#1a1d24] text-white relative overflow-hidden"
    >

      {/* ---------- SCHEMA ---------- */}

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* ---------- UI BELOW UNCHANGED ---------- */}

      <div className="h-2 bg-gradient-to-r from-[#1E3A8A] via-[#D4A017] to-[#1E3A8A]"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* ABOUT */}
          <motion.div>
            <img
              src="/hsrefooterlogo.png"
              alt="Hyderabad School of Real Estate Logo"
              loading="lazy"
              className="h-20 w-auto mb-4 brightness-0 invert"
            />

            <p className="text-gray-300 leading-relaxed mb-4">
              {t("footer.about.description")}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit HSRE ${social.label}`}
                  className="bg-white/10 p-2 rounded-full"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">
              {t("footer.quickLinks.title")}
            </h3>

            <nav aria-label="Footer Navigation">
              <ul className="space-y-2">
                {quickLinks.map((lnk, i) => (
                  <li key={i}>
                    <a
                      href={lnk.path === "/" ? `/#${lnk.id}` : lnk.path}
                      onClick={() => handleLinkClick(lnk)}
                      className="text-gray-300 hover:text-[#D4A017]"
                    >
                      {lnk.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* COURSES */}
          <motion.div>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">
              {t("footer.courses.title")}
            </h3>

            <ul className="space-y-2">
              {courses.map((c, i) => (
                <li key={i}>
                  <a
                    href="/courses"
                    title="Real Estate Courses in Hyderabad"
                    className="text-gray-300"
                  >
                    ▸ {c}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div>
            <h3 className="text-xl font-bold mb-4 text-[#D4A017]">
              {t("footer.contact.title")}
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <Phone size={20} />
                <a href="tel:8977533213">89775 33213</a>
              </div>

              <div className="flex gap-3">
                <Mail size={20} />
                <a href="mailto:info@hsre.in">info@hsre.in</a>
              </div>

              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <p itemProp="streetAddress">
                  {t("footer.contact.address")}
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* PAYMENT SEO LINK */}
        <a href={PAYMENT_LINK} rel="nofollow sponsored" className="hidden">
          Payment
        </a>

        {/* PAYMENT BUTTON UI */}
        <Button
          onClick={() => window.open(PAYMENT_LINK, "_blank")}
          className="bg-[#D4A017] hover:bg-[#B8860B] text-white"
        >
          <HandCoins className="w-4 h-4 mr-2" />
          {t("footer.payment.button")}
        </Button>

      </div>
    </footer>
  );
};

export default Footer;
