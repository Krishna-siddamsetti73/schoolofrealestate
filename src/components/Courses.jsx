import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Courses = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section
      id="courses"
      className="
        relative
        overflow-hidden
        bg-[#F6FAFF]
      "
    
  aria-labelledby="courses-heading"
    >
 <Helmet>
  <title>Real Estate Courses in Hyderabad | RERA & Property Training - HSRE</title>

  <meta
    name="description"
    content="Explore HSRE real estate courses including RERA certification, property sales training, investment strategies, and marketing courses in Hyderabad."
  />

  <link rel="canonical" href="https://hsre.in/#courses" />

  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:title" content="HSRE Real Estate Courses Hyderabad" />
  <meta property="og:description" content="Learn property sales, RERA certification, and real estate investment from Hyderabad School of Real Estate." />
  <meta property="og:url" content="https://hsre.in/#courses" />
  <meta property="og:type" content="website" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {`
    [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Real Estate Training Courses",
        "description": "Professional real estate training including RERA certification, property sales training, and investment education in Hyderabad.",
        "provider": {
          "@type": "Organization",
          "name": "Hyderabad School of Real Estate",
          "sameAs": "https://hsre.in"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "RERA Certification Course"
          },
          {
            "@type": "Course",
            "name": "Real Estate Sales Training"
          },
          {
            "@type": "Course",
            "name": "Property Investment Training"
          }
            {
 "@context": "https://schema.org",
 "@type": "Organization",
 "name": "Hyderabad School of Real Estate",
 "url": "https://www.hsre.in",
 "logo": "https://www.hsre.in/HSR_Logo.png"
}

        ]
      }
    ]
    `}
  </script>
</Helmet>


      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#D4A017]/20 rounded-[60%_40%_55%_45%] blur-3xl" />
      <div className="absolute right-24 top-1/3 w-[260px] h-[260px] bg-[#1E3A8A]/15 rounded-full blur-3xl" />
       <p className="sr-only">
  HSRE offers professional real estate certification, RERA training, and
  property investment courses in Hyderabad for beginners and professionals.
</p>

      <div className="relative z-10 container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT — CONTENT */}
          <motion.div
            loading="lazy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] mb-4 leading-snug"   id="courses-heading">
              {t("courses.title")}{" "}
              <span className="text-[#1E3A8A] font-bold">
                {t("courses.highlight")}
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-md mb-6">
              {t("courses.subtitle")}
            </p>
         <a href="/courses" data-course-link="true">
            <Button
              onClick={() => navigate("/courses")}
              className="
                bg-[#1E3A8A]
                hover:bg-[#172554]
                text-white
                rounded-full
                px-7 py-3
                text-sm md:text-base
                font-medium
                shadow-md
                hover:shadow-lg
                transition-all
              "
            >
              {t("courses.fullCurriculum")}
            </Button>
            </a>
          </motion.div>

          {/* RIGHT — DECORATIVE BLOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden md:flex justify-end"
          >
            <div className="relative w-[300px] h-[300px] bg-white rounded-[48%_52%_45%_55%] shadow-xl border border-[#D4A017]/30">
              {/* Accent dots */}
             <div className="absolute -top-6 -left-6 w-48 h-48 md:w-64 md:h-64 rounded-[45%_55%_50%_50%] overflow-hidden shadow-xl border-2 border-[#D4A017]/30">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
     preload="metadata"
  aria-label="Real estate training courses introduction video"
    src="/videos/courses-bg.webm"  /* your downloaded video path */
  />
</div>

              <div className="absolute bottom-6 right-6 w-10 h-10 bg-[#1E3A8A]/30 rounded-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default Courses;
