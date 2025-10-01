'use client';

{/* ***************************************************************
   SECTION 1 COMPONENT
   Grid layout showcasing 4 key features with images and descriptions
   
   LAYOUT:
   - Mobile: Horizontal rows (icon + text side by side)
   - Desktop: 4-column grid with vertical alignment
   
   FEATURES:
   - Responsive grid/flex layout
   - Left-aligned on mobile
   - Centered content on desktop
   - Consistent spacing and alignment
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

const highlightPhrases = (text: string) => {
    const phrases = [
        "high-performing men",
        "No shortcuts",
        "No crash"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};
import Image from "next/image";

interface Section1Props {
    content: HomePageProps['content'];
}

export default function Section1({ content }: Section1Props) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3,
    });

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeOut
            }
        }
    };

    return (
        <section className="px-2 w-full justify-center items-center flex flex-col py-8 lg:py-16" ref={ref}>
            <motion.div
                className="flex flex-col lg:grid lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                {/* ***************************************************************
                   FEATURE TILE 1 
                   Mobile: Icon + text horizontally aligned
                   Desktop: Vertical stack, centered
                ****************************************************************/}
                <motion.div
                    className="flex flex-row lg:flex-col items-start lg:items-center gap-4"
                    variants={itemVariants}
                >
                    <div className="w-6 h-6 flex-shrink-0">
                        <Image
                            src='/images/icon1.png'
                            alt="Feature 1 illustration"
                            className="w-full h-full object-cover rounded-lg"
                            aria-label="Visual representation of feature 1"
                            priority
                            width={50}
                            height={100}
                        />
                    </div>
                    <h2 className="text-sm text-white leading-relaxed lg:w-2/3 text-left lg:text-center">
                        {content.section1tile1}
                    </h2>
                </motion.div>

                {/* ***************************************************************
                   FEATURE TILE 2
                   Mobile: Icon + text horizontally aligned
                   Desktop: Vertical stack, centered
                ****************************************************************/}
                <motion.div
                    className="flex flex-row lg:flex-col items-start lg:items-center gap-4"
                    variants={itemVariants}
                >
                    <div className="w-6 h-6 flex-shrink-0">
                        <Image
                            src='/images/icon4.png'
                            alt="Feature 2 illustration"
                            className="w-full h-full object-cover rounded-lg"
                            aria-label="Visual representation of feature 2"
                            priority
                            width={50}
                            height={100}
                        />
                    </div>
                    <h2 className="text-sm text-white leading-relaxed lg:w-2/3 text-left lg:text-center">
                        {content.section1tile2}
                    </h2>
                </motion.div>

                {/* ***************************************************************
                   FEATURE TILE 3
                   Mobile: Icon + text horizontally aligned
                   Desktop: Vertical stack, centered
                ****************************************************************/}
                <motion.div
                    className="flex flex-row lg:flex-col items-start lg:items-center gap-4"
                    variants={itemVariants}
                >
                    <div className="w-6 h-6 flex-shrink-0">
                        <Image
                            src='/images/icon2.png'
                            alt="Feature 3 illustration"
                            className="w-full h-full object-cover rounded-lg"
                            aria-label="Visual representation of feature 3"
                            priority
                            width={50}
                            height={100}
                        />
                    </div>
                    <h2 className="text-sm text-white leading-relaxed lg:w-2/3 text-left lg:text-center">
                        {content.section1tile3}
                    </h2>
                </motion.div>

                {/* ***************************************************************
                   FEATURE TILE 4
                   Mobile: Icon + text horizontally aligned
                   Desktop: Vertical stack, centered
                ****************************************************************/}
                <motion.div
                    className="flex flex-row lg:flex-col items-start lg:items-center gap-4"
                    variants={itemVariants}
                >
                    <div className="w-6 h-6 flex-shrink-0">
                        <Image
                            src='/images/icon3.png'
                            alt="Feature 4 illustration"
                            className="w-full h-full object-cover rounded-lg"
                            aria-label="Visual representation of feature 4"
                            priority
                            width={50}
                            height={100}
                        />
                    </div>
                    <h2 className="text-sm text-white leading-relaxed lg:w-2/3 text-left lg:text-center">
                        {content.section1tile4}
                    </h2>
                </motion.div>
            </motion.div>

            {/* ***************************************************************
               SUMMARY PARAGRAPH
               Consistent styling across breakpoints
            ****************************************************************/}
            <motion.div
                className="flex w-full justify-center items-center"
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <p
                    className="text-white/50 text-center pt-16 lg:w-3/4"
                    dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section1paragraph) }}
                />
            </motion.div>
        </section>
    );
}