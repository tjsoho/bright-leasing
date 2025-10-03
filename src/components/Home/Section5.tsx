"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";
import Image from "next/image";

interface Section5Props {
	content: HomePageProps["content"];
}

export default function Section5({ content }: Section5Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const textVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
	};

	return (
		<section className="mt-0" ref={ref}>
			{/* ***************************************************************
               SECTION 5 CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
			<div className="flex h-[600px] w-full items-center bg-gray-50">
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
						<h2 className="text-4xl font-bold text-gray-800 mb-4">
							{content.section5title}
						</h2>
						<p className="text-gray-600 text-lg text-left w-full leading-relaxed mb-6">
							{content.section5description}
						</p>
						<button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2">
							<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
							<span className="font-medium">{content.section5buttonText}</span>
						</button>
					</div>
				</motion.div>

				{/* ***************************************************************
                    IMAGE SECTION - Right side
                ****************************************************************/}
				<div className="flex-1 relative h-full">
					<Image
						src={content.section5image}
						alt="Promotional Image"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
