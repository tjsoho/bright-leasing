'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 4 - Proof metrics
// Static colored rectangles with featured text
// No slider, just contained rectangles with brand colors

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent, AboutStat } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { cn } from "@/lib/utils";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section4Props {
    proof: AboutUsPageContent["proof"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section4({ proof }: Section4Props) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const getBgColorClass = (color: string) => {
        switch (color) {
            case "grey":
                return "bg-gray-200 text-brand-black";
            case "teal":
                return "bg-brand-teal text-white";
            case "yellow":
                return "bg-brand-yellow text-brand-black";
            case "white":
                return "bg-white text-brand-black";
            default:
                return "bg-white text-brand-black";
        }
    };

    const stats: AboutStat[] = proof?.stats || [];

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const titleVariants: Variants = {
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

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="py-16 overflow-hidden" ref={ref}>
            <div className="max-w-[1540px] mx-auto px-4">
                {/* ************************************************************
                    TOP ROW - 2 Columns
                ************************************************************ */}
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* ************************************************************
                        LEFT COLUMN - Title Section
                    ************************************************************ */}
                    <motion.div
                        className="w-full lg:w-auto mb-8 lg:mb-0"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <h2 className="text-brand-black leading-tight h2">
                            <RenderLineBreaks text={proof?.title || ""} />
                        </h2>
                    </motion.div>

                    {/* ************************************************************
                        RIGHT COLUMN - Stats Cards (Full width)
                    ************************************************************ */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex-1 w-full lg:flex-grow"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.id}
                                    variants={cardVariants}
                                    className={cn(
                                        "rounded-2xl p-8 flex flex-col justify-start items-start min-h-[200px] sm:min-h-[240px] lg:min-h-[250px] w-full",
                                        getBgColorClass(stat.bgColor || "white")
                                    )}
                                >
                                    {/********************** Stat Card - Featured Value ************************/}
                                    <div className="w-full flex flex-col space-y-4">
                                        <h2 className="leading-none">
                                            {stat.value}
                                        </h2>
                                        <div className="p leading-relaxed">
                                            <RenderLineBreaks text={stat.label} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

