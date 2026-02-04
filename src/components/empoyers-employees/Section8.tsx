"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Section8Props {
  content: EmployersEmployeesPageProps["content"];
}

export default function Section8({ content }: Section8Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.15,
  });

  const titleVariants = {
    hidden: {   
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const faqVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Use dynamic FAQs array, fallback to empty array if not available
  const faqs = (content.additionalSection8Faqs || []).map((faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    number: String(index + 1).padStart(2, "0"),
    questionBold: faq.questionBold,
    answerBold: faq.answerBold,
  }));

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className={`text-gray-800 mb-12 text-center ${content.section8titleBold ? "h2-bold" : ""}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section8title} />
        </motion.h2>

        {/* Two Column Layout: FAQs Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* FAQs - Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="order-2 lg:order-1"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={faqVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-b border-gray-200 bg-white data-[state=open]:bg-brand-cream px-4 py-4"
                  >
                    <AccordionTrigger className="hover:no-underline [&>svg]:bg-brand-yellow [&>svg]:text-white [&>svg]:rounded-full [&>svg]:border-2 [&>svg]:border-brand-yellow [&>svg]:p-2 [&>svg]:w-8 [&>svg]:h-8">
                      <div className="flex items-center space-x-4 text-left">
                        <span className="text-brand-yellow font-bold text-lg">
                          {faq.number}
                        </span>
                        <h4
                          className={`text-gray-800 ${faq.questionBold ? "h4-bold" : ""}`}
                        >
                          <RenderLineBreaks text={faq.question} />
                        </h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <div className="ml-12">
                        <p
                          className={`text-gray-600 leading-relaxed ${faq.answerBold ? "p-bold" : ""}`}
                        >
                          <RenderLineBreaks text={faq.answer} />
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {/* View All FAQs Link */}
            <motion.div
              variants={faqVariants}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <Link
                href={content.section8faqLinkPath || "/faqs"}
                className="group flex items-center gap-2 text-sm text-gray-600 hover:text-brand-teal transition-colors duration-300"
              >
                <span>View All FAQs</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image - Right Side (Desktop), Above FAQs (Mobile) */}
          {content.section8image && (
            <motion.div
              className="order-1 lg:order-2 flex justify-center items-center"
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src={content.section8image}
                  alt="FAQ Section Image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
