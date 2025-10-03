"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section4Props {
	content: HomePageProps["content"];
}

export default function Section4({ content }: Section4Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut,
			},
		},
	};

	const stepVariants = {
		hidden: {
			opacity: 0,
			y: 30,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: easeOut,
			},
		},
	};

	const containerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const steps = [
		{
			title: content.section4step1title,
			description: content.section4step1description,
			icon: "🚗",
			number: "01",
		},
		{
			title: content.section4step2title,
			description: content.section4step2description,
			icon: "📋",
			number: "02",
		},
		{
			title: content.section4step3title,
			description: content.section4step3description,
			icon: "💰",
			number: "03",
		},
		{
			title: content.section4step4title,
			description: content.section4step4description,
			icon: "😊",
			number: "04",
		},
	];

	return (
		<section className="py-16 bg-gray-100" ref={ref}>
			<div className="max-w-6xl mx-auto px-4">
				{/* Section Title */}
				<motion.h2
					className="text-4xl lg:text-5xl font-bold text-black text-center mb-16"
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{content.section4title}
				</motion.h2>

				{/* Steps Container */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-2xl p-6 relative overflow-hidden h-full"
							variants={stepVariants}
						>
							<div className="flex flex-col items-center text-center h-full">
								{/* Icon */}
								<div className="mb-4">
									<div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
										{step.icon}
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 flex flex-col justify-center">
									<h3 className="text-xl font-bold text-black mb-3">
										{step.title}
									</h3>
									<p className="text-gray-600 text-sm leading-relaxed">
										{step.description}
									</p>
								</div>

								{/* Step Number */}
								<div className="absolute bottom-2 right-2 text-4xl font-bold text-gray-200 leading-none opacity-30">
									{step.number}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
