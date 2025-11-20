"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { cn } from "@/lib/utils";
import { Briefcase, Users } from "lucide-react";

interface Section4Props {
  content: EmployersEmployeesPageProps["content"];
  isEmployersPage?: boolean;
}

export default function Section4({ content, isEmployersPage = false }: Section4Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.15,
  });
  const [activeTab, setActiveTab] = useState<"employers" | "employees">("employers");

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

  // Get content based on active tab
  const getParagraph = () => {
    if (isEmployersPage && activeTab === "employees") {
      return content.section4employeesParagraph || content.section4paragraph;
    }
    return content.section4paragraph;
  };

  const getParagraphBold = () => {
    if (isEmployersPage && activeTab === "employees") {
      return content.section4employeesParagraphBold ?? content.section4paragraphBold;
    }
    return content.section4paragraphBold;
  };

  const getStepIcon = (stepIndex: number) => {
    if (isEmployersPage && activeTab === "employees") {
      const employeesIcons = [
        content.section4employeesStep1icon,
        content.section4employeesStep2icon,
        content.section4employeesStep3icon,
        content.section4employeesStep4icon,
      ];
      return employeesIcons[stepIndex] || "/placeholder.jpg";
    }

    const stepIcons = [
      content.section4step1icon,
      content.section4step2icon,
      content.section4step3icon,
      content.section4step4icon,
    ];
    const originalIndices = [0, 2, 3, 4];

    if (stepIcons[stepIndex] && stepIcons[stepIndex] !== "/placeholder.jpg") {
      return stepIcons[stepIndex];
    }

    const originalItem = content.section9tab1items?.[originalIndices[stepIndex]];
    return originalItem?.image || stepIcons[stepIndex] || "/placeholder.jpg";
  };

  const getSteps = () => {
    if (isEmployersPage && activeTab === "employees") {
      return [
        {
          title: content.section4employeesStep1title,
          description: content.section4employeesStep1description,
          icon: getStepIcon(0),
          number: "01",
          titleBold: content.section4employeesStep1titleBold,
          descriptionBold: content.section4employeesStep1descriptionBold,
        },
        {
          title: content.section4employeesStep2title,
          description: content.section4employeesStep2description,
          icon: getStepIcon(1),
          number: "02",
          titleBold: content.section4employeesStep2titleBold,
          descriptionBold: content.section4employeesStep2descriptionBold,
        },
        {
          title: content.section4employeesStep3title,
          description: content.section4employeesStep3description,
          icon: getStepIcon(2),
          number: "03",
          titleBold: content.section4employeesStep3titleBold,
          descriptionBold: content.section4employeesStep3descriptionBold,
        },
        {
          title: content.section4employeesStep4title,
          description: content.section4employeesStep4description,
          icon: getStepIcon(3),
          number: "04",
          titleBold: content.section4employeesStep4titleBold,
          descriptionBold: content.section4employeesStep4descriptionBold,
        },
      ];
    }

    return [
      {
        title: content.section4step1title,
        description: content.section4step1description,
        icon: getStepIcon(0),
        number: "01",
        titleBold: content.section4step1titleBold,
        descriptionBold: content.section4step1descriptionBold,
      },
      {
        title: content.section4step2title,
        description: content.section4step2description,
        icon: getStepIcon(1),
        number: "02",
        titleBold: content.section4step2titleBold,
        descriptionBold: content.section4step2descriptionBold,
      },
      {
        title: content.section4step3title,
        description: content.section4step3description,
        icon: getStepIcon(2),
        number: "03",
        titleBold: content.section4step3titleBold,
        descriptionBold: content.section4step3descriptionBold,
      },
      {
        title: content.section4step4title,
        description: content.section4step4description,
        icon: getStepIcon(3),
        number: "04",
        titleBold: content.section4step4titleBold,
        descriptionBold: content.section4step4descriptionBold,
      },
    ];
  };

  const steps = getSteps();

  return (
    <section className="py-16 bg-gray-100 rounded-2xl" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className={`text-black text-center mb-4 ${content.section4titleBold ? 'h2-bold' : ''}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section4title} />
        </motion.h2>

        {/* Toggle Button - Only show on employers page */}
        {isEmployersPage && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-gray-200 p-1">
              <button
                onClick={() => setActiveTab("employers")}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === "employers"
                    ? "bg-brand-yellow text-brand-black shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Briefcase size={16} />
                Employers
              </button>
              <button
                onClick={() => setActiveTab("employees")}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === "employees"
                    ? "bg-brand-yellow text-brand-black shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Users size={16} />
                Employees
              </button>
            </div>
          </div>
        )}

        {/* Section Paragraph */}
        <motion.p
          className={cn("text-black text-center mb-16", {
            "p-bold": getParagraphBold(),
          })}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={getParagraph()} />
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
              <div className="flex flex-col items-center text-center h-[300px]">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={step.icon}
                      alt={`${step.title} icon`}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className={`text-black mb-3 ${step.titleBold ? 'h4-bold' : ''}`}>
                    <RenderLineBreaks text={step.title} />
                  </h4>
                  <p className={`lg:text-small text-gray-600 text-left leading-relaxed ${step.descriptionBold ? 'p-bold' : ''}`}>
                    <RenderLineBreaks text={step.description} />
                  </p>
                </div>

                {/* Step Number */}
                <div className="absolute -bottom-4 -left-3 text-[112px] lg:text-[92px] text-gray-300 leading-none opacity-30" style={{ fontFamily: 'var(--font-avant-garde-bold)', fontWeight: 700 }}>
                  {step.number}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
