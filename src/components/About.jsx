import { Helmet } from "react-helmet-async";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  TrendingUp,
  Users,
  HandCoins,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const HEADER_HEIGHT = 96;

const About = () => {
  const { t } = useTranslation();
  const PAYMENT_LINK = "https://rzp.io/l/vvfKg15";

  const features = [
    { icon: Award, text: t("about.features.certification") },
    { icon: BookOpen, text: t("about.features.knowledge") },
    { icon: TrendingUp, text: t("about.features.salesSkills") },
    { icon: Users, text: t("about.features.experience") },
  ];

  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    
    <section
      id="about"
      className="bg-white flex items-center"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <Helmet>
  <title>About Hyderabad School of Real Estate | HSRE Hyderabad</title>
  <meta
    name="description"
    content="Learn about Hyderabad School of Real Estate (HSRE), a leading institute offering real estate training, RERA certification courses, and property investment education in Hyderabad."
  />
  <meta
    name="keywords"
    content="Hyderabad real estate institute, about HSRE, real estate training Hyderabad, learn real estate Hyderabad, RERA training institute Hyderabad"
  />
  <link rel="canonical" href="https://hsre.in/about" />
  <script type="application/ld+json">
{`
{
 "@context": "https://schema.org",
 "@type": "AboutPage",
 "name": "About Hyderabad School of Real Estate",
 "url": "https://hsre.in/about"
}
`}
</script>

</Helmet>

      <div className="container mx-auto px-4 md:px-6 flex flex-col">
        <div className="text-center pt-24 md:pt-6 pb-6">
          <h1 className="text-xl md:text-4xl font-bold text-[#2F3542] mb-2">
            {t("about.title")}{" "}
            <span className="text-[#D4A017]">{t("about.highlight")}</span>
          </h1>
          <div className="w-16 h-1 bg-[#1E3A8A] mx-auto rounded-full" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-8 items-center flex-1">

          {/* VIDEO */}
          <div className="flex justify-center">
            <div className="w-full max-w-[260px] md:max-w-xs">

              <div className="relative aspect-[3/4] max-h-[360px] md:max-h-[380px] rounded-2xl border-4 border-[#D4A017] shadow-xl overflow-hidden">
               <video
  ref={videoRef}
  src="/Hyderabads (1).webm"
  autoPlay
  loop
  muted
  playsInline
  aria-label="Hyderabad Real Estate Training Video at HSRE"
  className="absolute inset-0 w-full h-full object-cover"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* MUTE */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full text-white"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* PAYMENT */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2">
                  <Button
                    onClick={() => window.open(PAYMENT_LINK, "_blank")}
                    className="
                      bg-[#D4A017]
                      hover:bg-[#B8860B]
                      text-white
                      px-4 py-2
                      rounded-full
                      shadow-lg
                      flex
                      items-center
                      gap-2
                      whitespace-nowrap
                      text-sm
                      md:text-base
                    "
                  >
                    <HandCoins className="w-4 h-4 shrink-0" />
                    {t("footer.payment.button")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="max-w-2xl">

            <h3 className="text-2xl md:text-3xl font-bold text-[#2F3542] mb-4">
              {t("about.subTitle")}
            </h3>

            <p className="text-gray-700 mb-4 text-base md:text-lg">
              {t("about.description1")}
            </p>

            <p className="text-gray-700 mb-6 text-base md:text-lg">
              {t("about.description2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#FAF6EF] p-3 rounded-lg"
                >
                  <div className="bg-gradient-to-br from-[#1E3A8A] to-[#D4A017] p-2 rounded-lg text-white shrink-0">
                    <feature.icon size={18} />
                  </div>
                  <span className="font-semibold text-[#2F3542] text-sm md:text-base">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
