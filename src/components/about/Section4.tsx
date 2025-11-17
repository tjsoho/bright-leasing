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
    const stats: AboutStat[] = proof?.stats || [];

    const getStatColor = (index: number) => {
        if (index === 0) return "bg-brand-yellow text-brand-black";
        if (index === 1) return "bg-brand-teal text-white";
        return "bg-gray-300 text-brand-black";
    };

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
            <div className="max-w-7xl mx-auto px-4">
                {/* ************************************************************
                    TOP ROW - 2 Columns
                ************************************************************ */}
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* ************************************************************
                        LEFT COLUMN - Title Section (1/3 width)
                    ************************************************************ */}
                    <motion.div
                        className="flex-1 max-w-lg mx-auto"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <h2 className="text-brand-black leading-tight h2">
                            <RenderLineBreaks text={proof?.title || ""} />
                        </h2>
                    </motion.div>

                    {/* ************************************************************
                        RIGHT COLUMN - Stats Cards (3/4 width)
                    ************************************************************ */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex-1 lg:w-3/4 w-full"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.id}
                                    variants={cardVariants}
                                    className={`rounded-2xl p-6 sm:p-8 lg:p-4 flex flex-col justify-start items-start min-h-[200px] sm:min-h-[240px] lg:min-h-[220px] w-full h-full lg:pt-12 ${getStatColor(index)}`}
                                >
                                    {/********************** Stat Card - Featured Value ************************/}
                                    <div className="w-full space-y-2 sm:space-y-3">
                                        <h2 className=" leading-none">
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

