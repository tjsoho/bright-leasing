'use client';

{/* ***************************************************************
   SECTION 8 COMPONENT - Mission
   Two-column layout featuring:
   - Left side: Full-width mission image
   - Right side: Title, description, and CTA button
   Used to communicate company mission and values
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import LuxeButton from "@/ui/LuxeButton";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";


interface Section8Props {
    content: HomePageProps['content'];
}

const highlightWords = (text: string) => {
    // Define phrases to highlight - could also come from props/config
    const highlightPhrases = [
        "Why give up on feeling and being my best just because I'm getting older.",
        "Determined to outperform myself each day.",
        "STAIT",
        "unlock my full potential",
        "performance of the product over profit"
    ];

    let result = text;

    // Replace each phrase with a highlighted span version
    highlightPhrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};

export default function Section8({ content }: Section8Props) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3,
    });

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: easeOut
            }
        }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            x: 20
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: easeOut
            }
        }
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeOut,
                delay: 0.3
            }
        }
    };

    return (
        <>
            <section className="py-8 lg:py-16 px-2" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
                    {/* ***************************************************************
                       LEFT SIDE - Mission Image
                    ****************************************************************/}
                    <motion.div
                        className="flex justify-center order-2 lg:order-1"
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <Image
                            src={content.section8Image || "/placeholder.jpg"}
                            alt="Mission visualization"
                            width={1920}
                            height={1080}
                            className="lg:w-3/4 w-full h-auto object-cover "
                            aria-label="Visual representation of our mission and values"
                        />
                    </motion.div>

                    {/* ***************************************************************
                       RIGHT SIDE - Content and CTA
                    ****************************************************************/}
                    <div className="space-y-6 w-full order-1 lg:order-2">
                        <motion.h2
                            className="text-4xl font-bold text-white mb-6"
                            variants={contentVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            {content.section8title}
                        </motion.h2>
                        <motion.div
                            className="text-lg text-white/70 leading-relaxed whitespace-pre-wrap lg:w-[90%]"
                            dangerouslySetInnerHTML={{ __html: highlightWords(content.section8paragraph) }}
                            variants={contentVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        />
                        <motion.div
                            className="pt-4 flex justify-center lg:justify-start"
                            variants={buttonVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            <LuxeButton title={content.section8buttonText} onClick={() => window.location.href = '/about-us'} >

                            </LuxeButton>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}


