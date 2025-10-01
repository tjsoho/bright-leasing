'use client';

{/* ***************************************************************
   SECTION 2 COMPONENT
   Single column layout featuring:
   - Section title
   - Full-width pill image
   Used to showcase product or service highlight
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import LuxeButton from "@/ui/LuxeButton";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";


interface Section2Props {
    content: HomePageProps['content'];
}

export default function Section2({ content }: Section2Props) {
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
                ease: easeOut,
                delay: 0.3
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
                delay: 0.6
            }
        }
    };

    return (
        <section className="pt-8 lg:py-8" ref={ref}>
            <div className="max-w-6xl mx-auto px-2">
                <div className="lg:space-y-8">
                    <motion.h2
                        className="text-4xl font-bold text-white lg:mb-6 w-2/3"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {content.section2title}
                    </motion.h2>
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="block lg:hidden"
                    >
                        <Image
                            src='/images/pillMob.png'
                            alt="Product highlight visualization"
                            className="w-full rounded-lg -mt-8"
                            aria-label="Visual representation of our product features"
                            priority
                            width={1000}
                            height={1000}
                        />
                    </motion.div>
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="hidden lg:block"
                    >
                        <Image
                            src='/images/pill.png'
                            alt="Product highlight visualization"
                            className="w-full rounded-lg"
                            aria-label="Visual representation of our product features"
                            priority
                            width={1000}
                            height={1000}
                        />
                    </motion.div>
                </div>
                <motion.div
                    className="flex justify-center -mt-8 lg:-mt-0 mb-6 lg:mb-0"
                    variants={buttonVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <LuxeButton title="The Clinically Proven Results" showArrow />
                </motion.div>
            </div>
        </section>
    );
}
