"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";
import Image from "next/image";
import { BWestSmallButton } from "../ui/b-west-small";

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

	const imageVariants = {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeOut } },
	};

	return (
		<section className="py-16" ref={ref}>
			{/* ***************************************************************
               SECTION 5 CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
			<div className="flex h-[600px] w-full items-center py-16">
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
						<h2 className=" text-gray-800 mb-4">
							{content.section5title}
						</h2>
						<p className="text-gray-600 text-left w-full leading-relaxed mb-6">
							{content.section5description}
						</p>
						<BWestSmallButton text={content.section5buttonText} />
					</div>
				</motion.div>

				{/* ***************************************************************
                    IMAGE SECTION - Right side
                ****************************************************************/}
				<motion.div
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					variants={imageVariants}
					className="flex-1 h-full rounded-2xl relative"
				>
					<Image
						src={content.section5image}
						alt="Promotional Image"
						fill
						className="object-cover"
					/>
				</motion.div>
			</div>
		</section>
	);
}
