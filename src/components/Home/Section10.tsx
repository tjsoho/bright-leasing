'use client';

{/* ***************************************************************
   SECTION 10 COMPONENT - Support
   Simple section featuring:
   - Section title
   - Support description paragraph
   Used to highlight customer support and assistance
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlightPhrases = (text: string) => {
    const phrases = [
        "expert",
        "your success",
        "real people"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};

interface Section10Props {
    content: HomePageProps['content'];
}

export default function Section10({ content }: Section10Props) {
    const ref = useRef(null);
    const inView = useInView(ref, {
        amount: 0.2,  // Trigger when 20% visible
        once: false   // Allow animation to replay
    });
    return (
        <section
            ref={ref}
            className="py-8 lg:py-16 px-2"
        >
            <div className="flex flex-col justify-center items-center w-full">
                <div className="space-y-4 w-full flex flex-col items-center">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-6 text-left lg:text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth easing
                            delay: 0.2
                        }}
                    >
                        {content.section10title}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/70 leading-relaxed text-left lg:text-center whitespace-pre-wrap lg:w-[60%]"
                        dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section10paragraph) }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.4 // Slightly delayed after title
                        }}
                    />
                </div>
            </div>
        </section>
    );
}


