"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React, { useState } from "react";

interface Section7Props {
	content: HomePageProps["content"];
}

export default function Section7({ content }: Section7Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

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

	const faqVariants = {
		hidden: {
			opacity: 0,
			y: 20,
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
				staggerChildren: 0.1,
			},
		},
	};

	const faqs = [
		{
			question: content.section7faq1question,
			answer: content.section7faq1answer,
			number: "01",
		},
		{
			question: content.section7faq2question,
			answer: content.section7faq2answer,
			number: "02",
		},
		{
			question: content.section7faq3question,
			answer: content.section7faq3answer,
			number: "03",
		},
		{
			question: content.section7faq4question,
			answer: content.section7faq4answer,
			number: "04",
		},
	];

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index);
	};

	return (
		<section className="py-16 bg-white" ref={ref}>
			<div className="max-w-4xl mx-auto px-4">
				{/* Section Title */}
				<motion.h2
					className="text-4xl lg:text-5xl font-bold text-gray-800 mb-12"
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{content.section7title}
				</motion.h2>

				{/* FAQ Items */}
				<motion.div
					className="space-y-4"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							className="border border-gray-200 rounded-lg overflow-hidden"
							variants={faqVariants}
						>
							{/* Question Header */}
							<button
								onClick={() => toggleFAQ(index)}
								className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-center space-x-4">
									<span className="text-orange-500 font-bold text-lg">
										{faq.number}
									</span>
									<h3 className="text-lg font-semibold text-gray-800">
										{faq.question}
									</h3>
								</div>
								<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
									<motion.svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										animate={{
											rotate: openIndex === index ? 45 : 0,
										}}
										transition={{ duration: 0.2 }}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</motion.svg>
								</div>
							</button>

							{/* Answer Content */}
							<motion.div
								initial={false}
								animate={{
									height: openIndex === index ? "auto" : 0,
									opacity: openIndex === index ? 1 : 0,
								}}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className="overflow-hidden"
							>
								<div className="px-6 pb-6">
									<div className="ml-12">
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
