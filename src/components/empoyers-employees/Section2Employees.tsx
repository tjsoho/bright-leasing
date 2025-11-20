"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface Section2EmployeesProps {
    content: EmployersEmployeesPageProps["content"];
}

export default function Section2Employees({ content }: Section2EmployeesProps) {
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

    const cardVariants = {
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
                staggerChildren: 0.1,
            },
        },
    };

    const getBgColorClass = (color: string) => {
        switch (color) {
            case "grey":
                return "bg-gray-200";
            case "teal":
                return "bg-brand-teal text-white";
            case "yellow":
                return "bg-brand-yellow";
            case "white":
                return "bg-white";
            default:
                return "bg-white";
        }
    };

    const boxes = [
        {
            title: content.employeesSection2box1title,
            content: content.employeesSection2box1content,
            icon: content.employeesSection2box1icon,
            titleBold: content.employeesSection2box1titleBold,
            contentBold: content.employeesSection2box1contentBold,
            bgColor: content.employeesSection2box1bgColor || "white",
        },
        {
            title: content.employeesSection2box2title,
            content: content.employeesSection2box2content,
            icon: content.employeesSection2box2icon,
            titleBold: content.employeesSection2box2titleBold,
            contentBold: content.employeesSection2box2contentBold,
            bgColor: content.employeesSection2box2bgColor || "white",
        },
        {
            title: content.employeesSection2box3title,
            content: content.employeesSection2box3content,
            icon: content.employeesSection2box3icon,
            titleBold: content.employeesSection2box3titleBold,
            contentBold: content.employeesSection2box3contentBold,
            bgColor: content.employeesSection2box3bgColor || "white",
        },
        {
            title: content.employeesSection2box4title,
            content: content.employeesSection2box4content,
            icon: content.employeesSection2box4icon,
            titleBold: content.employeesSection2box4titleBold,
            contentBold: content.employeesSection2box4contentBold,
            bgColor: content.employeesSection2box4bgColor || "white",
        },
        {
            title: content.employeesSection2box5title,
            content: content.employeesSection2box5content,
            icon: content.employeesSection2box5icon,
            titleBold: content.employeesSection2box5titleBold,
            contentBold: content.employeesSection2box5contentBold,
            bgColor: content.employeesSection2box5bgColor || "white",
        },
        {
            title: content.employeesSection2box6title,
            content: content.employeesSection2box6content,
            icon: content.employeesSection2box6icon,
            titleBold: content.employeesSection2box6titleBold,
            contentBold: content.employeesSection2box6contentBold,
            bgColor: content.employeesSection2box6bgColor || "white",
        },
    ];

    return (
        <section className="py-16 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <motion.h2
                    className={cn("text-center mb-4", {
                        "h2-bold": content.employeesSection2titleBold,
                    })}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={content.employeesSection2title} />
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    className={cn("text-center max-w-4xl mx-auto mb-12", {
                        "p-bold": content.employeesSection2subheadingBold,
                    })}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={content.employeesSection2subheading} />
                </motion.p>

                {/* Boxes Container */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    {boxes.map((box, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                getBgColorClass(box.bgColor),
                                "rounded-2xl p-6 relative overflow-hidden min-h-[300px] flex flex-col"
                            )}
                            variants={cardVariants}
                        >
                            <div className="flex flex-col h-full">
                                {/* Icon */}
                                {box.icon && (
                                    <div className="mb-4">
                                        <div className="size-14 border border-black rounded-full flex items-center justify-center overflow-hidden bg-transparent">
                                            <Image
                                                src={box.icon}
                                                alt={`${box.title} icon`}
                                                width={26}
                                                height={26}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Title */}
                                <h5
                                    className={cn("mb-3", {
                                        "h5-bold": box.titleBold,
                                    })}
                                >
                                    <RenderLineBreaks text={box.title} />
                                </h5>

                                {/* Content */}
                                <p
                                    className={cn("text-left leading-relaxed flex-grow", {
                                        "p-bold": box.contentBold,
                                    })}
                                >
                                    <RenderLineBreaks text={box.content} />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

