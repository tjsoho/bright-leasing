'use client';

{/* ***************************************************************
   SECTION 3 COMPONENT
   Features section with:
   - Section title and descriptive paragraph
   - Grid of 6 profile images
   Used to showcase team, customers, or community
****************************************************************/}

import { HomePageProps } from "@/app/_config";

const highlightPhrases = (text: string) => {
    const phrases = [
        "STAIT",
        "science-backed formulas"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section3Props {
    content: HomePageProps['content'];
}

export default function Section3({ content }: Section3Props) {
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

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: easeOut
            }
        }
    };
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
    };

    const images = [1, 2, 3, 4, 5, 6].map((index) => (
        <motion.div
            key={index}
            className="relative aspect-[9/16] px-1"
            variants={imageVariants}
        >
            <Image
                src={content.section3Images?.[`profile${index}` as keyof typeof content.section3Images] || '/images/next.svg'}
                alt={`Profile ${index}`}
                className="w-full h-full object-cover"
                aria-label={`Community member profile ${index}`}
                width={180}
                height={320}
            />
        </motion.div>
    ));

    return (
        <section className="py-8 lg:py-16" ref={ref}>
            <div className="">
                <div className="space-y-8">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-6 w-4/5 lg:w-full lg:text-center px-2"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {content.section3title}
                    </motion.h2>
                    <motion.p
                        className="text-sm text-white/70 leading-relaxed mb-6 text-center hidden lg:block whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section3paragraph) }}
                        variants={paragraphVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    />
                    {/* Mobile Slider */}
                    <motion.div
                        className="md:hidden overflow-hidden"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <Slider {...sliderSettings}>
                            {images}
                            {/* Duplicate images for seamless infinite loop */}
                            {images}
                            {images}
                        </Slider>
                    </motion.div>

                    {/* Desktop Grid */}
                    <motion.div
                        className="hidden md:grid md:grid-cols-6 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {images}
                    </motion.div>
                    <motion.p
                        className="text-sm text-gray-300 leading-relaxed mb-6 text-center lg:hidden whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section3paragraph) }}
                        variants={paragraphVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    />
                </div>
            </div>
        </section>
    );
}


