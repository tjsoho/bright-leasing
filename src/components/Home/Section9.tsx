'use client';

{/* ***************************************************************
   SECTION 9 COMPONENT
   Features section with:
   - Section title
   - Grid of 4 feature items with icons
   Used to highlight key benefits or features
****************************************************************/}

import { HomePageProps } from "@/app/_config";

const highlightPhrases = (text: string) => {
    const phrases = [
        "Bio-signature",
        "Therapeutic dose",
        "No synthetic",
        "Whole-herb"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section9Props {
    content: HomePageProps['content'];
}

export default function Section9({ content }: Section9Props) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3,
    });

    const titleVariants = {
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

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const featureVariants = {
        hidden: {
            opacity: 0,
            x: -20
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: easeOut
            }
        }
    };
    const features = [
        { icon: content.section9icon1, text: content.section9listText1 },
        { icon: content.section9icon2, text: content.section9listText2 },
        { icon: content.section9icon3, text: content.section9listText3 },
        { icon: content.section9icon4, text: content.section9listText4 },
    ];

    return (
        <>
            <section className="py-8 lg:py-16 px-2" ref={ref}>
                <div className="flex flex-col justify-center items-center">
                    <div className="space-y-8">
                        <motion.h2
                            className="text-4xl font-bold text-white mb-6"
                            variants={titleVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            {content.section9title}
                        </motion.h2>
                    </div>
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full lg:justify-center lg:items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex lg:items-center lg:justify-center gap-3"
                                variants={featureVariants}
                            >
                                <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={feature.icon || "/images/next.svg"}
                                        alt={`Feature ${index + 1} icon`}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                                <span
                                    className="text-sm font-medium text-white/70 whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: highlightPhrases(feature.text) }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}


