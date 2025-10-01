'use client';

{/* ***************************************************************
   SECTION 11 COMPONENT - Final Call to Action
   Full-width hero-style section featuring:
   - Background image with overlay
   - Title and description
   - CTA button
   Used as final conversion point
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import LuxeButton from "@/ui/LuxeButton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Section11Props {
    content: HomePageProps['content'];
}

export default function Section11({ content }: Section11Props) {
    const ref = useRef(null);
    const inView = useInView(ref, {
        amount: 0.2,
        once: false
    });
    return (
        <section ref={ref} className="space-y-8 pt-8">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-8 px-2">
                <motion.h3
                    className="text-h3 font-semibold text-white text-left lg:text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    {content.section11title}
                </motion.h3>

                <motion.div
                    className="relative h-[400px] w-full bg-cover bg-[55%] bg-no-repeat"
                    style={{
                        backgroundImage: `url(${content.section11Image || "/images/next.svg"})`,
                    }}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >

                </motion.div>

                <motion.div
                    className="px-4 space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                >
                    <p className="text-md text-white/70 leading-relaxed whitespace-pre-wrap text-left lg:text-center">
                        {content.section11paragraph}
                    </p>
                    <div className="flex justify-center pt-4">
                        <LuxeButton title={content.section11buttonText} />
                    </div>
                </motion.div>
            </div>

            {/* Desktop Layout */}
            <motion.div
                className="relative hidden md:flex h-[400px] w-full items-center justify-start bg-cover bg-center p-4 text-white overflow-hidden"
                style={{
                    backgroundImage: `url(${content.section11Image || "/images/next.svg"})`,
                }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >

                <motion.div
                    className="justify-items-center bottom-0 p-12 m-4 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                    <h3 className="text-h3 font-semibold text-white mb-6">
                        {content.section11title}
                    </h3>
                    <p className="text-md text-white/70 text-center w-[50%] leading-relaxed mb-8 whitespace-pre-wrap">
                        {content.section11paragraph}
                    </p>
                    <div className="flex justify-center">
                        <LuxeButton title={content.section11buttonText} onClick={() => window.location.href = '/products'} />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}


