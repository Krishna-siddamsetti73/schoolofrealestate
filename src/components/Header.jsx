import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, GraduationCap, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// ─── Scrolling Ticker Banner ───────────────────────────────────────────────
const TickerBanner = () => {
  const messages = [
    "🎓 Next Batch Starts soon — Register NOW!",
    "📞 Call Us: 88977533213",
    "⚡ Limited Seats Available — Block Your Seat Today!",
    "🎓 Next Batch Starts Soon — Register NOW!",
    "📞 Call Us: 88977533213",
    "⚡ Limited Seats Available — Block Your Seat Today!",
  ];

  const fullText = messages.join("     ✦     ");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1E3A8A 0%, #0f2260 40%, #1E3A8A 100%)",
        borderBottom: "2px solid #D4A017",
        height: "36px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left glow fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to right, #1E3A8A, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Animated ticker */}
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "ticker-scroll 28s linear infinite",
          willChange: "transform",
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0px",
              paddingRight: "60px",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.03em",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            {messages.map((msg, idx) => (
              <React.Fragment key={idx}>
                <span
                  style={{
                    color: msg.includes("Call") ? "#F9D84A" : msg.includes("Seat") ? "#FFA07A" : "#ffffff",
                    marginRight: "0px",
                  }}
                >
                  {msg}
                </span>
                {idx < messages.length - 1 && (
                  <span style={{ color: "#D4A017", margin: "0 20px" }}>✦</span>
                )}
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>

      {/* Right glow fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to left, #1E3A8A, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Pulsing bell icon pinned left */}
      <div
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#D4A017",
          borderRadius: "20px",
          padding: "2px 10px 2px 6px",
          boxShadow: "0 0 10px rgba(212,160,23,0.6)",
          animation: "pulse-bell 2s ease-in-out infinite",
        }}
      >
        <Bell size={12} color="#fff" style={{ animation: "ring-bell 1.5s ease-in-out infinite" }} />
        <span style={{ color: "#fff", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>
          LIVE
        </span>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-bell {
          0%, 100% { box-shadow: 0 0 8px rgba(212,160,23,0.5); }
          50%       { box-shadow: 0 0 18px rgba(212,160,23,0.9); }
        }
        @keyframes ring-bell {
          0%, 100% { transform: rotate(0deg); }
          20%       { transform: rotate(-20deg); }
          40%       { transform: rotate(20deg); }
          60%       { transform: rotate(-10deg); }
          80%       { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

// ─── Main Header ────────────────────────────────────────────────────────────
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

  const navLinks = [
    { name: t("header.home"),    id: "home",    path: "/" },
    { name: t("header.about"),   id: "about",   path: "/" },
    { name: t("header.gallery"), id: "gallery", path: "/" },
    { name: t("header.faqs"),    id: "faqs",    path: "/" },
    { name: t("header.courses"), id: "courses", path: "/courses" },
    { name: t("header.contact"), id: "contact", path: "/contact" },
    {
  name: "Resources",
  id: "resources",
  dropdown: true,
  children: [
    { name: "News", path: "/news" },
    { name: "Blogs", path: "/blogs" },
    { name: "Testimonials", path: "/testimonials" },
  ],
}
  ];

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
      navLinks.filter(l => l.path === '/').forEach(l => {
        const el = document.getElementById(l.id);
        if (el) observer.observe(el);
      });
      return () => {
        navLinks.filter(l => l.path === '/').forEach(l => {
          const el = document.getElementById(l.id);
          if (el) observer.unobserve(el);
        });
      };
    } else {
      setActiveSection('');
    }
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
      {/* ── Ticker sits ABOVE the fixed header ── */}
      <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
      >
        <TickerBanner />
      </motion.div>

      {/* ── Main header pushed down by ticker height (36px) ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ top: "36px" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
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
  <div key={link.id} className="relative group">
    {link.dropdown ? (
      <>
        <button
          className="text-sm font-medium text-[#2F3542] hover:text-[#1E3A8A]"
        >
          {link.name}
        </button>

        <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          {link.children.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              {item.name}
            </button>
          ))}
        </div>
      </>
    ) : (
      <motion.button
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
      </motion.button>
    )}
  </div>
))}
            </motion.div>

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
                onClick={() => navigate("https://rzp.io/rzp/qTz2Nr1u")}
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
                        ((location.pathname === "/" && activeSection === link.id) ||
                          (location.pathname === link.path && link.path !== "/"))
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

      {/* ── Body spacer: push page content below both ticker + header ── */}
      {/* Add this class to your main layout wrapper: pt-[calc(36px+80px)] or pt-28 */}
    </>
  );
};

export default Header;