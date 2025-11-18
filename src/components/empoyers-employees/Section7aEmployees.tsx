"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface Section7aEmployeesProps {
    content: EmployersEmployeesPageProps["content"];
}

export default function Section7aEmployees({ content }: Section7aEmployeesProps) {
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

    const imageVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <section className="py-16 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <motion.h2
                    className={cn("text-center mb-4", {
                        "h2-bold": content.employeesSection7atitleBold,
                    })}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={content.employeesSection7atitle} />
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    className={cn("text-center max-w-4xl mx-auto mb-12", {
                        "p-bold": content.employeesSection7asubheadingBold,
                    })}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={content.employeesSection7asubheading} />
                </motion.p>

                {/* Two Column Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Image */}
                    {content.employeesSection7aimage1 && (
                        <motion.div
                            className="relative w-full aspect-square rounded-lg overflow-hidden"
                            variants={imageVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            <Image
                                src={content.employeesSection7aimage1}
                                alt="Comparison Image 1"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Right Image */}
                    {content.employeesSection7aimage2 && (
                        <motion.div
                            className="relative w-full aspect-square rounded-lg overflow-hidden"
                            variants={imageVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            <Image
                                src={content.employeesSection7aimage2}
                                alt="Comparison Image 2"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

