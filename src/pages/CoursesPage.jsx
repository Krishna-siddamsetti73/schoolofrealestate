import React from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  FileCheck,
  Smartphone,
  Award,
  CheckCircle,
  Target,
  Briefcase,
  Monitor,
  Globe,
  Search,
  Phone,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { MdPayments } from "react-icons/md";
import { useTranslation } from "react-i18next";

const PAYMENT_LINK = "https://rzp.io/l/vvfKg15";

const CoursesPage = () => {
  const { t } = useTranslation();

  const handleEnroll = () => {
    window.open(PAYMENT_LINK, "_blank", "noopener,noreferrer");
  };

  const handleCall = () => {
    window.location.href = "tel:8977533213";
  };

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const blobTopY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blobBottomY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const iconY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const iconY2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const iconY3 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const iconY4 = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // Course modules
  const courses = [
    {
      icon: BookOpen,
      title: t("coursesPage.courses.basics.title"),
      desc: t("coursesPage.courses.basics.desc"),
      topics: [
        t("coursesPage.courses.basics.topic1"),
        t("coursesPage.courses.basics.topic2"),
        t("coursesPage.courses.basics.topic3"),
      ],
      gradient: "from-blue-900 to-blue-600",
    },
    {
      icon: Users,
      title: t("coursesPage.courses.agent.title"),
      desc: t("coursesPage.courses.agent.desc"),
      topics: [
        t("coursesPage.courses.agent.topic1"),
        t("coursesPage.courses.agent.topic2"),
        t("coursesPage.courses.agent.topic3"),
      ],
      gradient: "from-amber-700 to-amber-500",
    },
    {
      icon: FileText,
      title: t("coursesPage.courses.rera.title"),
      desc: t("coursesPage.courses.rera.desc"),
      topics: [
        t("coursesPage.courses.rera.topic1"),
        t("coursesPage.courses.rera.topic2"),
        t("coursesPage.courses.rera.topic3"),
      ],
      gradient: "from-blue-900 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: t("coursesPage.courses.sales.title"),
      desc: t("coursesPage.courses.sales.desc"),
      topics: [
        t("coursesPage.courses.sales.topic1"),
        t("coursesPage.courses.sales.topic2"),
        t("coursesPage.courses.sales.topic3"),
      ],
      gradient: "from-amber-700 to-amber-500",
    },
    {
      icon: FileCheck,
      title: t("coursesPage.courses.docs.title"),
      desc: t("coursesPage.courses.docs.desc"),
      topics: [
        t("coursesPage.courses.docs.topic1"),
        t("coursesPage.courses.docs.topic2"),
        t("coursesPage.courses.docs.topic3"),
      ],
      gradient: "from-blue-900 to-blue-600",
    },
    {
      icon: Smartphone,
      title: t("coursesPage.courses.digital.title"),
      desc: t("coursesPage.courses.digital.desc"),
      topics: [
        t("coursesPage.courses.digital.topic1"),
        t("coursesPage.courses.digital.topic2"),
        t("coursesPage.courses.digital.topic3"),
      ],
      gradient: "from-amber-700 to-amber-500",
    },
  ];

  // What you'll learn
  const learnItems = [
    {
      icon: Target,
      title: t("coursesPage.learn.target.title"),
      desc: t("coursesPage.learn.target.desc"),
    },
    {
      icon: Briefcase,
      title: t("coursesPage.learn.prof.title"),
      desc: t("coursesPage.learn.prof.desc"),
    },
    {
      icon: Monitor,
      title: t("coursesPage.learn.tech.title"),
      desc: t("coursesPage.learn.tech.desc"),
    },
    {
      icon: Globe,
      title: t("coursesPage.learn.market.title"),
      desc: t("coursesPage.learn.market.desc"),
    },
    {
      icon: Search,
      title: t("coursesPage.learn.valuation.title"),
      desc: t("coursesPage.learn.valuation.desc"),
    },
    {
      icon: Award,
      title: t("coursesPage.learn.compliance.title"),
      desc: t("coursesPage.learn.compliance.desc"),
    },
  ];

  // Benefits
  const benefits = [
    t("coursesPage.benefits.b1"),
    t("coursesPage.benefits.b2"),
    t("coursesPage.benefits.b3"),
    t("coursesPage.benefits.b4"),
    t("coursesPage.benefits.b5"),
    t("coursesPage.benefits.b6"),
  ];

  return (
    <>
      {/* SEO (English only) */}
      <Helmet>
        <title>Real Estate Courses in Hyderabad | Certification & Placement</title>
        <meta
          name="description"
          content="Best real estate courses in Hyderabad with RERA training, placement assistance, and practical projects. Enroll now!"
        />
      </Helmet>

      <div className="mt-38"></div>

      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#FAF6EF] via-[#FFF5DA] to-[#FFE8C5]">

        {/* Parallax floating blobs + icons */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            style={{ y: blobTopY }}
            className="absolute top-[-40px] left-[-40px] w-64 h-64 bg-[#D4A017]/25 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: blobBottomY }}
            className="absolute bottom-[-60px] right-[-40px] w-80 h-80 bg-[#1E3A8A]/20 rounded-full blur-3xl"
          />

          <motion.div
            style={{ y: iconY1 }}
            className="absolute top-16 left-10 text-[#D4A017]/45"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          >
            <Award size={70} />
          </motion.div>

          <motion.div
            style={{ y: iconY2 }}
            className="absolute top-32 right-10 text-[#1E3A8A]/45"
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          >
            <Star size={60} fill="currentColor" />
          </motion.div>

          <motion.div
            style={{ y: iconY3 }}
            className="absolute bottom-32 left-24 text-[#D4A017]/35"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          >
            <Zap size={60} />
          </motion.div>

          <motion.div
            style={{ y: iconY4 }}
            className="absolute top-1/2 right-16 text-[#1E3A8A]/35"
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          >
            <Sparkles size={80} />
          </motion.div>
        </div>

        {/* HERO CONTENT */}
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* LEFT TEXT */}
            <motion.div
              className="flex-1 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 shadow-sm border border-amber-100 mb-2">
                <Sparkles className="text-[#D4A017]" size={18} />
              <span className="leading-snug text-[10px] sm:text-xs md:text-sm font-semibold text-[#1E3A8A]">

                  {t("coursesPage.hero.tagline")}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
                {t("coursesPage.hero.title1")}{" "}
                <span className="bg-gradient-to-r from-[#D4A017] to-[#FBBF24] bg-clip-text text-transparent">
                  {t("coursesPage.hero.title2")}{" "}
                </span>
                {t("coursesPage.hero.title3")}
              </h1>

              <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
                {t("coursesPage.hero.subtitle1")}{" "}
                <span className="font-semibold text-[#1E3A8A]">
                  {t("coursesPage.hero.subtitle2")}
                </span>{" "}
                {t("coursesPage.hero.subtitle3")}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 mt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-gray-100"
                >
                  <p className="text-lg md:text-xl font-bold text-[#1E3A8A]">2000+</p>
                  <p className="text-gray-600 text-[11px] md:text-xs">{t("coursesPage.hero.stats1")}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-gray-100"
                >
                  <p className="text-lg md:text-xl font-bold text-[#1E3A8A]">₹8.4 Cr</p>
                  <p className="text-gray-600 text-[11px] md:text-xs">{t("coursesPage.hero.stats2")}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-gray-100"
                >
                  <p className="text-lg md:text-xl font-bold text-[#1E3A8A]">4.9★</p>
                  <p className="text-gray-600 text-[11px] md:text-xs">{t("coursesPage.hero.stats3")}</p>
                </motion.div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-md mx-auto lg:mx-0">
                <Button
                  onClick={handleEnroll}
                  className="w-full whitespace-normal bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1E3A8A] text-white font-semibold text-base md:text-lg py-7 px-8 rounded-full shadow-xl flex items-center justify-center gap-2  text-xs sm:text-sm "
                >
                  {t("coursesPage.hero.enrollBtn")}
                  <ArrowRight className="animate-pulse" size={18} />
                </Button>

                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="w-full border-2 border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017] hover:text-white font-semibold text-base md:text-lg py-7 px-15 rounded-full flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> {t("coursesPage.hero.callBtn")}
                </Button>
              </div>

              <p className="text-xs md:text-sm text-gray-600 mt-3">
                {t("coursesPage.hero.batchInfo")}
              </p>
            </motion.div>

            {/* RIGHT SIDE — CARD */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-blue-900/70 to-blue-600/70 blur-sm scale-95" />

                <motion.div
                  className="relative rounded-3xl bg-white shadow-2xl border border-blue-50 p-6 md:p-7 space-y-4"
                  whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
                  style={{ transformPerspective: 1100 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white">
                      <BookOpen size={22} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-blue-500 font-semibold">
                        {t("coursesPage.card.flagship")}
                      </p>
                      <p className="font-bold text-lg text-gray-900">
                        {t("coursesPage.card.title")}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-emerald-500" size={18} />
                      {t("coursesPage.card.point1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-emerald-500" size={18} />
                      {t("coursesPage.card.point2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-emerald-500" size={18} />
                      {t("coursesPage.card.point3")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-emerald-500" size={18} />
                      {t("coursesPage.card.point4")}
                    </li>
                  </ul>

                  <div className="flex items-center justify-between mt-4">
                    <div>
  <p className="text-xs text-gray-500">
    {t("coursesPage.card.starting")}
  </p>

  {/* Original Price (Striked) */}
  <p className="text-xl font-bold text-red-500 line-through">
    ₹15,000
  </p>

  {/* Discounted Price */}
  <p className="text-xl font-semibold text-[#1E3A8A]">
    ₹9,999
  </p>

  {/* <p className="text-[11px] text-emerald-600 font-semibold">
    {t("coursesPage.card.emi")}
  </p> */}
</div>

                    <Button
                      onClick={handleEnroll}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs md:text-sm px-4 py-2 rounded-full"
                    >
                      {t("coursesPage.card.enrollNow")}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COURSE MODULES SECTION */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            {t("coursesPage.modules.heading")}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("coursesPage.modules.subheading")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />
                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    <course.icon size={32} />
                  </div>

                  <h3 className="text-2xl font-bold mt-5">{course.title}</h3>
                  <p className="text-gray-600 mt-3">{course.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {course.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t("coursesPage.cta.title")}
                </h2>

                <p className="text-lg md:text-xl mb-8 text-blue-100">
                  {t("coursesPage.cta.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleEnroll}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg px-10 py-7 rounded-xl"
                  >
                    {t("coursesPage.cta.enroll")}
                  </Button>

                  <Button
                    onClick={handleCall}
                    variant="secondary"
                    className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border border-white/30 font-bold px-8 py-7 rounded-xl"
                  >
                    {t("coursesPage.cta.call")}
                  </Button>
                </div>
              </div>

              <div className="hidden md:block">
                <img
                  src="/1311520_610.svg"
                  alt="Students celebrating success"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t("coursesPage.learnHeading")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {learnItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <item.icon size={36} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            {t("coursesPage.benefits.heading")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl backdrop-blur"
              >
                <CheckCircle className="text-amber-500 flex-shrink-0" size={32} />
                <span className="text-lg font-medium">{b}</span>
              </div>
            ))}
          </div>

          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-2xl"
            onClick={handleEnroll}
          >
            {t("coursesPage.benefits.cta")}
          </Button>
        </div>
      </section>

      {/* Floating Buttons */}
      <motion.a
        href="https://rzp.io/l/vvfKg15"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-40 right-6 bg-[#D4A017] hover:bg-[#B8860B] text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ rotate: 360 }}
      >
        <MdPayments size={28} />
      </motion.a>

      <motion.a
        href="https://wa.me/918977533213"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ rotate: 360 }}
      >
        <BsWhatsapp size={28} />
      </motion.a>

      <motion.a
        href="tel:8977533213"
        className="fixed bottom-24 right-6 bg-[#1E3A8A] hover:bg-[#2563EB] text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ rotate: 360 }}
      >
        <Phone size={28} />
      </motion.a>
    </>
  );
};

export default CoursesPage;
