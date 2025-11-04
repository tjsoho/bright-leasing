"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React from "react";

interface Section2Props {
  content: EmployersEmployeesPageProps["content"];
}

export default function Section2({ content }: Section2Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
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

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: -15,
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
        staggerChildren: 0.2,
      },
    },
  };

  const steps = [
    {
      title: content.section2tile1title,
      description: content.section2tile1description,
      icon: content.section2tile1icon,
      number: "01",
      titleBold: content.section2tile1titleBold,
      descriptionBold: content.section2tile1descriptionBold,
    },
    {
      title: content.section2tile2title,
      description: content.section2tile2description,
      icon: content.section2tile2icon,
      number: "02",
      titleBold: content.section2tile2titleBold,
      descriptionBold: content.section2tile2descriptionBold,
    },
    {
      title: content.section2tile3title,
      description: content.section2tile3description,
      icon: content.section2tile3icon,
      number: "03",
      titleBold: content.section2tile3titleBold,
      descriptionBold: content.section2tile3descriptionBold,
    },
    {
      title: content.section2tile4title,
      description: content.section2tile4description,
      icon: content.section2tile4icon,
      number: "04",
      titleBold: content.section2tile4titleBold,
      descriptionBold: content.section2tile4descriptionBold,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 rounded-2xl" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className={`text-black text-left mb-5 ${content.section2titleBold ? "h2-bold" : ""}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section2title} />
        </motion.h2>

        <motion.p
          className={`text-black text-left mb-12 lg:max-w-3xl ${content.section2paragraphBold ? "p-bold" : ""}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section2paragraph} />
        </motion.p>

        {/* Steps Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  "
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 relative overflow-hidden h-[400px] w-[300px] lg:w-full mx-auto"
              variants={stepVariants}
            >
              <div className="flex flex-col justify-between h-full">
                {/* Icon */}
                <div className="mb-4">
                  <div className="size-14 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={step.icon}
                      alt={`${step.title} icon`}
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-start mt-auto h-fit">
                  <h5
                    className={`text-black mb-3 ${step.titleBold ? "h5-bold" : ""}`}
                  >
                    <RenderLineBreaks text={step.title} />
                  </h5>
                  <p
                    className={`lg:text-small text-left leading-relaxed ${step.descriptionBold ? "p-bold" : ""}`}
                  >
                    <RenderLineBreaks text={step.description} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
