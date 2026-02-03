import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Briefcase,
  DollarSign,
  Award,
  Target,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Lightbulb,
      title: t("why.features.easy.title"),
      description: t("why.features.easy.description"),
    },
    {
      icon: Briefcase,
      title: t("why.features.practical.title"),
      description: t("why.features.practical.description"),
    },
    {
      icon: DollarSign,
      title: t("why.features.affordable.title"),
      description: t("why.features.affordable.description"),
    },
    {
      icon: Award,
      title: t("why.features.certification.title"),
      description: t("why.features.certification.description"),
    },
    {
      icon: Target,
      title: t("why.features.realExamples.title"),
      description: t("why.features.realExamples.description"),
    },
    {
      icon: MapPin,
      title: t("why.features.hyderabadFocus.title"),
      description: t("why.features.hyderabadFocus.description"),
    },
  ];

  /* ------------------- SEO SCHEMAS ------------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hsre.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Why Choose Us",
        item: "https://hsre.in/#why-choose-us",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: features.map((feature) => ({
      "@type": "Question",
      name: feature.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: feature.description,
      },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Real Estate Training Program",
    description: t("why.subtitle"),
    provider: {
      "@type": "EducationalOrganization",
      name: "Hyderabad School of Real Estate",
      url: "https://hsre.in",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Hyderabad School of Real Estate",
    url: "https://hsre.in",
    telephone: "+91-8977533213",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "India",
    },
  };

  return (
    <>
      {/* -------- STRUCTURED DATA -------- */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* -------- MAIN SECTION -------- */}
      <section
        id="why-choose-us"
        aria-labelledby="why-choose-heading"
        role="region"
        className="py-20 bg-gradient-to-br from-[#FAF6EF] to-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #D4A017 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* ---------- HEADER ---------- */}
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="why-choose-heading"
                className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins"
              >
                {t("why.title.part1")}{" "}
                <span className="text-[#1E3A8A]">
                  {t("why.title.part2")}
                </span>
              </h2>

              <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>

              <p
                className="text-gray-700 text-lg max-w-2xl mx-auto"
                itemProp="description"
              >
                {t("why.subtitle")}
              </p>
            </motion.div>
          </header>

          {/* ---------- FEATURES ---------- */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Why choose HSRE real estate training features"
          >
            {features.map((feature, index) => (
              <motion.article
                key={index}
                role="listitem"
                itemScope
                itemType="https://schema.org/Service"
                aria-labelledby={`feature-title-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#1E3A8A] h-full">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#D4A017] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl"
                    aria-hidden="true"
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>

                  <h3
                    id={`feature-title-${index}`}
                    itemProp="name"
                    className="text-xl font-bold text-[#2F3542] mb-3 text-center group-hover:text-[#1E3A8A] transition-colors"
                  >
                    {feature.title}
                  </h3>

                  <p
                    itemProp="description"
                    className="text-gray-600 text-center leading-relaxed"
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
