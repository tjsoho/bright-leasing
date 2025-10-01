'use client';

{/* ***************************************************************
   SECTION 6 COMPONENT - Endorsements
   Simple section featuring:
   - Section title
   Used to showcase endorsements and social proof
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import Image from "next/image";
import { InfiniteSlider } from "@/ui/infinite-slider";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section6Props {
    content: HomePageProps['content'];
}

export default function Section6({ content }: Section6Props) {
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
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: easeOut,
                delay: 0.3
            }
        }
    };

    return (
        <>
            <section className="py-8 lg:py-16" ref={ref}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-8">
                        <motion.h2
                            className="text-4xl font-bold text-white mb-6 text-center"
                            variants={titleVariants}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                        >
                            {content.section6title}
                        </motion.h2>
                    </div>
                    {/* Logo Slider */}
                    <motion.div
                        className="mt-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <InfiniteSlider durationOnHover={75} gap={24}>
                            {(content.section6logos || []).map((logo, index) => (
                                <div key={index} className="aspect-square w-[80px] flex items-center justify-center p-2 bg-black/20 rounded-[4px]">
                                    <Image
                                        src={logo}
                                        alt={`Logo ${index + 1}`}
                                        width={60}
                                        height={60}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>
                    </motion.div>
                </div>
            </section>
        </>
    );
}


