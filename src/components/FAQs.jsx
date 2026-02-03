import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";

const FAQs = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = t("faqs.items", { returnObjects: true });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-[#FAF6EF]">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins">
            {t("faqs.title.part1")} <span className="text-[#1E3A8A]">{t("faqs.title.part2")}</span>
          </h2>

          <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>

          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {t("faqs.subtitle")}
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                  openIndex === index ? 'border-[#D4A017]' : 'border-transparent'
                }`}
              >
                {/* FAQ Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left hover:bg-[#FAF6EF] transition-colors duration-300"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-[#2F3542] pr-4 group-hover:text-[#1E3A8A] transition-colors">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      openIndex === index ? 'bg-[#D4A017]' : 'bg-[#FAF6EF]'
                    }`}>
                      <ChevronDown
                        className={`transition-colors duration-300 ${
                          openIndex === index ? 'text-white' : 'text-[#2F3542]'
                        }`}
                        size={24}
                      />
                    </div>
                  </motion.div>
                </button>

                {/* FAQ Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 bg-gradient-to-b from-[#FAF6EF]/50 to-transparent">
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQs;
