'use client';

{/* ***************************************************************
   HERO COMPONENT
   Main landing section featuring:
   - Background image with overlay (responsive for mobile/desktop)
   - Quote and author (positioned differently on mobile/desktop)
   - Description text
   - Call-to-action button
   
   NOTES:
   - Mobile: Quote appears at bottom of hero image
   - Desktop: Quote appears in middle-left
   - Mobile: Button appears above description
   - Desktop: Button appears below description
   - Uses different background images for mobile/desktop
   - Maintains consistent spacing and overlay
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import LuxeButton from "@/ui/LuxeButton";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface HeroProps {
    content: HomePageProps['content'];
}

const highlightAuthor = (text: string) => {
    // Define the name to highlight
    const name = "Mike Bates";

    // Replace the name with a bold, white-text span
    const regex = new RegExp(`(${name})`, 'gi');
    return text.replace(regex, '<span class="text-white font-bold">$1</span>');
};

export default function Hero({ content }: HeroProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3, // Trigger when 30% of the element is in view
    });

    const imageVariants = {
        initial: { scale: 1.1 },
        animate: { scale: 1, transition: { duration: 3, ease: easeOut } }
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
    };

    return (
        <section className="mt-0 bg-black" ref={ref}>
            {/* ***************************************************************
               HERO IMAGE CONTAINER
            ****************************************************************/}
            <div
                className="relative flex h-[600px] w-full items-center justify-start bg-cover bg-right text-white md:bg-center overflow-hidden"
            >
                {/* Mobile Background */}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={imageVariants}
                    className="absolute inset-0 bg-cover bg-center lg:hidden"
                    style={{ backgroundImage: `url(${content.heroImageMobile || '/images/heromob.png'})` }}
                />

                {/* Desktop Background */}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={imageVariants}
                    className="absolute inset-0 bg-cover bg-center hidden lg:block"
                    style={{ backgroundImage: `url(${content.heroImageDesktop || '/images/homehero.png'})` }}
                />

                {/* Dark Overlay */}
                <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-35"></div>

                {/* ***************************************************************
                    DESKTOP QUOTE POSITION  - Centered vertically, aligned left
                ****************************************************************/}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={textVariants}
                    className="items-center justify-center p-4 md:p-12 z-10 hidden lg:block"
                >
                    <p className="text-white text-md text-left w-full leading-relaxed mb-4 lg:w-2/5 italic">
                        &ldquo;{content.quoteHero}&rdquo;
                    </p>
                    <p className="text-white/70 text-md text-left w-full leading-relaxed mb-8 lg:w-2/5">
                        <span
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: highlightAuthor(content.quoteHeroAuthor) }}
                        />
                    </p>
                </motion.div>

                {/* ***************************************************************
                   MOBILE QUOTE POSITION
                   Fixed to bottom of hero image
                ****************************************************************/}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={textVariants}
                    className="absolute bottom-0 left-0 right-0 p-4 z-10 lg:hidden"
                >
                    <p className="text-white text-md text-left w-full leading-relaxed mb-2 italic">
                        &ldquo;{content.quoteHero}&rdquo;
                    </p>
                    <p className="text-white/70 text-md text-left w-full leading-relaxed">
                        <span
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: highlightAuthor(content.quoteHeroAuthor) }}
                        />
                    </p>
                </motion.div>
            </div>

            {/* ***************************************************************
               DESCRIPTION AND CALL-TO-ACTION
               - Mobile: Button above description
               - Desktop: Description above button
               Uses flex order to swap positions responsively
            ****************************************************************/}
            <motion.div
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={textVariants}
                className="flex flex-col justify-items-center p-4 md:p-12 z-10"
            >
                <div className="order-2 lg:order-1">
                    <p className="text-md text-white text-center w-full leading-relaxed mb-8 px-4 md:px-32">
                        {content.descriptionHero}
                    </p>
                </div>
                <div className="flex justify-center order-1 lg:order-2 mb-16 lg:mb-0">
                    <LuxeButton
                        title={content.buttonText}
                        href="/start"
                        ariaLabel="Begin your wellness journey with STAIT"
                    />
                </div>
            </motion.div>
        </section>
    );
}