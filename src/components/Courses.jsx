import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    >
      {/* 🌿 Soft Organic Background Shape */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#D4A017]/20 rounded-[60%_40%_55%_45%] blur-3xl" />
      <div className="absolute right-24 top-1/3 w-[260px] h-[260px] bg-[#1E3A8A]/15 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] mb-4 leading-snug">
              {t("courses.title")}{" "}
              <span className="text-[#1E3A8A] font-bold">
                {t("courses.highlight")}
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-md mb-6">
              {t("courses.subtitle")}
            </p>

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
