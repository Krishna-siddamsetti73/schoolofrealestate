import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t("header.home"), id: "home", path: "/" },
    { name: t("header.about"), id: "about", path: "/" },
    { name: t("header.gallery"), id: "gallery", path: "/" },
    { name: t("header.faqs"), id: "faqs", path: "/" },
    { name: t("header.courses"), id: "courses", path: "/courses" },
    { name: t("header.contact"), id: "contact", path: "/contact" },
  ];

  /* Scroll Detection */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active Section Detection */
  useEffect(() => {
    if (location.pathname === "/") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );

      navLinks
        .filter((link) => link.path === "/")
        .forEach((link) => {
          const el = document.getElementById(link.id);
          if (el) observer.observe(el);
        });

      return () => observer.disconnect();
    } else setActiveSection("");
  }, [location.pathname]);

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
      const el = document.getElementById(link.id);
      if (el) {
        const offset = 80;
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ================= SEO STRUCTURED DATA ================= */}
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

      {/* ================= HEADER ================= */}
      <motion.header
        role="banner"
        aria-label="Main Website Header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav
          className="container mx-auto px-4 py-4"
          role="navigation"
          aria-label="Primary Navigation"
        >
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <figure
              className="cursor-pointer"
              onClick={() => navigate("/")}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <img
                src="/HSR_Logo.png"
                alt="Hyderabad School of Real Estate Logo"
                className="h-14 md:h-16 w-auto"
                itemProp="logo"
                loading="eager"
              />
            </figure>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  aria-label={`Navigate to ${link.name}`}
                  className={`relative text-sm font-medium transition-colors ${
                    ((location.pathname === "/" &&
                      activeSection === link.id) ||
                      (location.pathname === link.path &&
                        link.path !== "/"))
                      ? "text-[#D4A017]"
                      : "text-[#2F3542] hover:text-[#1E3A8A]"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* DESKTOP CTA BUTTONS */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                aria-label="Enroll Real Estate Course"
                onClick={() => navigate("/courses")}
                className="bg-[#D4A017] text-white rounded-full"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                {t("header.enroll")}
              </Button>

              <Button
                aria-label="Join Real Estate Batch"
                onClick={() => navigate("/contact")}
                className="bg-[#1E3A8A] text-white rounded-full"
              >
                <Users className="w-4 h-4 mr-2" />
                {t("header.joinBatch")}
              </Button>

              <Button
                aria-label="Call HSRE Institute"
                onClick={() => (window.location.href = "tel:9636963601")}
                className="bg-[#1E3A8A] text-white rounded-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t("header.call")}
              </Button>
            </div>

            {/* MOBILE MENU ICON */}
            <button
              aria-label="Toggle Mobile Menu"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div className="lg:hidden mt-4 pb-4">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link)}
                      className="text-left px-4 py-2 rounded-lg"
                    >
                      {link.name}
                    </button>
                  ))}
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
