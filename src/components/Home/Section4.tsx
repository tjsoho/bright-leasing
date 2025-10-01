'use client';

// section 4 dynamic image with no text
import { HomePageProps } from "@/app/_config";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section4Props {
    content: HomePageProps['content'];
}

export default function Section4({ content }: Section4Props) {
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

    return (
        <section className="py-8 lg:py-16" ref={ref}>
            <div className="max-w-6xl mx-auto py-12 px-4">
                {/* Mobile Image */}
                <Link href="/supplement">
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="lg:hidden"
                    >
                        <Image
                            src={content.section4ImageDesktop}
                            alt="Section 4 Mobile Image"
                            className="w-full h-full object-cover"
                            aria-label="Section 4 Mobile Image"
                            priority
                            width={1000}
                            height={1000}
                        />
                    </motion.div>
                </Link>
                {/* Desktop Image */}
                <Link href="/supplement">
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="hidden lg:block"
                    >
                        <Image
                            src={content.section4ImageMobile}
                            alt="Section 4 Desktop Image"
                            className="w-full h-full object-cover"
                            aria-label="Section 4 Desktop Image"
                            priority
                            width={1000}
                            height={1000}
                        />
                    </motion.div>
                </Link>
            </div>
        </section>
    );
}