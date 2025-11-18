"use client";
import { motion, useInView, Variants } from "framer-motion";
import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import CardWithIcon from "../core/CardWithIcon";

interface Props {
    content: EmployersEmployeesPageProps["content"];
}

const fadeUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const cardContainerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const checkmarkVariants: Variants = {
    initial: {
        scale: 0,
        opacity: 0,
        rotate: -45,
    },
    animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1], // Bounce effect
            delay: 0.3,
        },
    },
};

export default function Section5Employees({ content }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    const getBgColorClass = (color: string) => {
        switch (color) {
            case "grey":
                return "bg-gray-200";
            case "teal":
                return "bg-brand-teal text-white";
            case "yellow":
                return "bg-brand-yellow";
            default:
                return "bg-white";
        }
    };

    const bgColors = [
        content.employeesSection5tile1bgColor || "yellow",
        content.employeesSection5tile2bgColor || "teal",
        content.employeesSection5tile3bgColor || "grey",
        content.employeesSection5tile4bgColor || "teal",
        content.employeesSection5tile5bgColor || "yellow",
        content.employeesSection5tile6bgColor || "teal",
        content.employeesSection5tile7bgColor || "grey",
        content.employeesSection5tile8bgColor || "teal",
    ];

    // Show all 8 tiles
    const tiles = content.employeesSection5tiles?.slice(0, 8) || [];

    return (
        <div className="py-16 px-4 " ref={ref}>
            <motion.h2
                className={cn("text-center", {
                    "h2-bold": content.employeesSection5titleBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {content.employeesSection5title}
            </motion.h2>
            <motion.p
                className={cn("text-center max-w-4xl mx-auto mt-4", {
                    "p-bold": content.employeesSection5paragraphBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {content.employeesSection5paragraph}
            </motion.p>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12"
                animate={isInView ? "animate" : "initial"}
                variants={cardContainerVariants}
            >
                {tiles.map((item, index) => {
                    return (
                        <motion.div
                            key={index}
                            className="relative"
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                            variants={cardContainerVariants}
                        >
                            <CardWithIcon
                                image={item.image}
                                title={item.title}
                                titleBold={item.titleBold}
                                description={item.description}
                                descriptionBold={item.descriptionBold}
                                className={cn(getBgColorClass(bgColors[index]))}
                            />
                            {/* Handwritten Sketch Style Checkbox with Tick */}
                            <motion.div
                                className="absolute -top-2 -right-2 z-20"
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                variants={checkmarkVariants}
                            >
                                <div className="relative">
                                    {/* Checkbox Square with sketchy border */}
                                    <div className="w-12 h-12 bg-white rounded-xl border-[1px] border-brand-black  flex items-center justify-center overflow-visible">
                                        {/* Handwritten Tick with sketch style - using a slightly imperfect path */}
                                        <svg
                                            className="w-16 h-16 text-brand-yellow"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.2))",
                                                transform: "rotate(-2deg)",
                                            }}
                                        >
                                            {/* Hand-drawn style checkmark with slight imperfections */}
                                            <motion.path
                                                d="M5.5 12.5l3.5 4L18.5 7"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={
                                                    isInView
                                                        ? { pathLength: 1, opacity: 1 }
                                                        : { pathLength: 0, opacity: 0 }
                                                }
                                                transition={{
                                                    duration: 0.7,
                                                    delay: 0.4,
                                                    ease: [0.34, 1.56, 0.64, 1], // Bounce effect
                                                }}
                                                style={{
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                }}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

