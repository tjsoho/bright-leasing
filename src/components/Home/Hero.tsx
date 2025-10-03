"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";
import Image from "next/image";

interface HeroProps {
	content: HomePageProps["content"];
}

export default function Hero({ content }: HeroProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3, // Trigger when 30% of the element is in view
	});

	const textVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
	};

	return (
		<section className="mt-0" ref={ref}>
			{/* ***************************************************************
               HERO CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
			<div className="flex h-[600px] w-full items-center bg-white">
				{/* ***************************************************************
                    CONTENT SECTION - Left side
                ****************************************************************/}
				<motion.div
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					variants={textVariants}
					className="flex-1 flex items-center justify-center p-4 md:p-12"
				>
					<div className="max-w-lg">
						<h2 className="text-4xl font-bold text-black mb-4">
							{content.heroTitle}
						</h2>
						<p className="text-black text-md text-left w-full leading-relaxed mb-6">
							{content.heroParagraph}
						</p>
						<button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
							Get Started
						</button>
					</div>
				</motion.div>

				{/* ***************************************************************
                    IMAGE SECTION - Right side
                ****************************************************************/}
				<div className="flex-1 relative h-full">
					<Image
						src={content.heroImage}
						alt="Hero Image"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
