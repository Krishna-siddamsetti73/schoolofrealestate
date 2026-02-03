import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section logic
  useEffect(() => {
    if (location.pathname === '/') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      );

      navLinks
        .filter(link => link.path === '/')
        .forEach(link => {
          const element = document.getElementById(link.id);
          if (element) observer.observe(element);
        });

      return () => {
        navLinks
          .filter(link => link.path === '/')
          .forEach(link => {
            const element = document.getElementById(link.id);
            if (element) observer.unobserve(element);
          });
      };
    } else {
      setActiveSection('');
    }
  }, [location.pathname]);
  const navLinks = [
    { name: t("header.home"), id: "home", path: "/" },
    { name: t("header.about"), id: "about", path: "/" },
    { name: t("header.gallery"), id: "gallery", path: "/" },
    { name: t("header.faqs"), id: "faqs", path: "/" },
    { name: t("header.courses"), id: "courses", path: "/courses" },
    { name: t("header.contact"), id: "contact", path: "/contact" },
  ];

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
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
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(link.id);
      } else if (link.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
    <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Hyderabad School of Real Estate",
                url: "https://hsre.co.in",
                logo: "https://hsre.co.in/HSR_Logo.png",
                sameAs: ["https://hsre.co.in"]
              },
              {
                "@type": "LocalBusiness",
                name: "Hyderabad School of Real Estate",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hyderabad",
                  addressCountry: "India"
                },
                telephone: "+91 9636963601",
                url: "https://hsre.co.in"
              },
              {
                "@type": "Course",
                name: "Real Estate Certification Training Hyderabad",
                provider: {
                  "@type": "Organization",
                  name: "Hyderabad School of Real Estate"
                }
              },
              {
                "@type": "SiteNavigationElement",
                name: navLinks.map((l) => l.name),
                url: navLinks.map((l) =>
                  l.path === "/" ? `https://hsre.co.in/#${l.id}` : `https://hsre.co.in${l.path}`
                )
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://hsre.co.in"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What courses does HSRE offer?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "HSRE offers real estate certification, RERA training, property sales, and investment courses."
                    }
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>
  
    <motion.header
     role="banner"
      aria-label="Main Website Header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-4"
      role="navigation"
          aria-label="Primary Navigation">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/HSR_Logo.png"
              alt="Logo"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavClick(link)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  ((location.pathname === "/" && activeSection === link.id) ||
                    (location.pathname === link.path && link.path !== "/"))
                    ? "text-[#D4A017]"
                    : "text-[#2F3542] hover:text-[#1E3A8A]"
                }`}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#D4A017]"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      (location.pathname === "/" && activeSection === link.id) ||
                      (location.pathname === link.path && link.path !== "/")
                        ? "100%"
                        : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Language Switcher
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-20 h-8 bg-gray-200 rounded-full flex items-center cursor-pointer select-none"
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
            >
              {/* {i18n.language === "en" ? "EN" : "TE"} */}
            {/* </motion.div> */}

            {/* <span className="absolute left-2 text-xs text-gray-500 font-semibold">
              EN
            </span>
            <span className="absolute right-2 text-xs text-gray-500 font-semibold">
              తె
            </span>
          </motion.div> */} 

          {/* Desktop Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden md:flex items-center gap-4"
          >
            <Button
              onClick={() => navigate("/courses")}
              className="bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              {t("header.enroll")}
            </Button>

            <Button
              onClick={() => navigate("/contact")}
              className="bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Users className="w-4 h-4 mr-2" />
              {t("header.joinBatch")}
            </Button>

            <Button
              onClick={() => window.location.href = "tel:9636963601"}
              className="bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t("header.call")}
            </Button>
          </motion.div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#2F3542] hover:text-[#1E3A8A]"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      ((location.pathname === "/" &&
                        activeSection === link.id) ||
                        (location.pathname === link.path &&
                          link.path !== "/"))
                        ? "bg-[#D4A017] text-white"
                        : "text-[#2F3542] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}

                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-[#D4A017] hover:bg-[#B8860B] text-white w-full"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {t("header.enroll")}
                </Button>

                <Button
                  onClick={() => navigate("/contact")}
                  className="bg-[#1E3A8A] hover:bg-[#172554] text-white w-full"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {t("header.joinBatch")}
                </Button>

                <Button
                  onClick={() => window.location.href = "tel:9636963601"}
                  className="bg-[#1E3A8A] hover:bg-[#172554] text-white w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t("header.call")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
      </>
  );
};

export default Header;
