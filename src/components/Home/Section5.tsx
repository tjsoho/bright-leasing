'use client';

{/* ***************************************************************
   SECTION 5 COMPONENT
   Two-column layout featuring:
   - Left side: Title, paragraphs, and feature grid
   - Right side: Large feature image with overlay
   Used to showcase detailed product/service features
****************************************************************/}

import { HomePageProps } from "@/app/_config";

const highlightPhrases = (text: string) => {
    const phrases = [
        "STAIT",
        "outperform themselves",
        "the best he can be"
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


interface Section5Props {
    content: HomePageProps['content'];
    showImage?: boolean;
    centerContent?: boolean;
}

export default function Section5({ content, showImage = true, centerContent = false }: Section5Props) {
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

    const paragraphVariants = {
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
    const features = [
        { icon: content.section5icon1, text: content.section5listText1 },
        { icon: content.section5icon2, text: content.section5listText2 },
        { icon: content.section5icon3, text: content.section5listText3 },
        { icon: content.section5icon4, text: content.section5listText4 },
        { icon: content.section5icon5, text: content.section5listText5 },
        { icon: content.section5icon6, text: content.section5listText6 },
        { icon: content.section5icon7, text: content.section5listText7 },
        { icon: content.section5icon8, text: content.section5listText8 },
    ];

    return (
        <section className="py-8 lg:py-16 px-2" ref={ref}>
            <div className={`grid grid-cols-1 ${showImage ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-12 mb-16 ${centerContent ? 'text-center' : ''}`}>
                {/* ***************************************************************
                   LEFT SIDE - Content and Features
                ****************************************************************/}
                <div className="flex flex-col justify-around h-full gap-8 lg:gap-0">
                    <div className="space-y-8">
                        {content.section5title && (
                            <motion.h2
                                className="text-4xl font-bold text-white mb-6 lg:w-2/3"
                                variants={titleVariants}
                                initial="hidden"
                                animate={isInView ? "show" : "hidden"}
                            >
                                {content.section5title}
                            </motion.h2>
                        )}
                        <motion.p
                            className="text-lg text-white/70 leading-relaxed mb-6 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section5paragraph1) }}
                            variants={paragraphVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        />
                    </div>

                    {/* Features Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                variants={featureVariants}
                            >
                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                    <Image
                                        src={feature.icon || "/placeholder.jpg"}
                                        alt={`Feature ${index + 1} icon`}
                                        width={24}
                                        height={24}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-sm font-medium text-white/70">
                                    {feature.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className=""
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <Image
                            src={content.section5DetailImage || "/placeholder.jpg"}
                            alt="Product showcase detail"
                            className="lg:w-4/5 h-auto object-cover"
                            aria-label="Detailed view of product features"
                            width={800}
                            height={600}
                        />
                    </motion.div>
                </div>

                {/* ***************************************************************
                   RIGHT SIDE - Feature Image
                ****************************************************************/}
                {showImage && (
                    <motion.div
                        className="flex flex-col justify-end h-full"
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <div className="relative">
                            <Image
                                src={content.section5FeatureImage || "/placeholder.jpg"}
                                alt="Athlete in recovery"
                                className="w-full h-auto object-cover"
                                aria-label="Athlete demonstrating product benefits"
                                width={1000}
                                height={800}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        </div>
                    </motion.div>
                )}
            </div>

        </section>
    );
}


