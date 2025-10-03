"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React, { useState } from "react";

interface Section6Props {
	content: HomePageProps["content"];
}

export default function Section6({ content }: Section6Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const [currentSlide, setCurrentSlide] = useState(0);

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

	const tileVariants = {
		hidden: {
			opacity: 0,
			x: 20,
		},
		show: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.6,
				ease: easeOut,
			},
		},
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % 3);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + 3) % 3);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	return (
		<section className="py-16 bg-white" ref={ref}>
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
					{/* Title Section */}
					<motion.div
						className="flex-1"
						variants={titleVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
							{content.section6title}
						</h2>
					</motion.div>

					{/* Tiles Carousel */}
					<div className="flex-1 w-full lg:w-auto">
						<div className="relative">
							{/* Tiles Container */}
							<div className="overflow-hidden">
								<div
									className="flex transition-transform duration-500 ease-in-out"
									style={{
										transform: `translateX(-${currentSlide * 100}%)`,
									}}
								>
									{/* Tile 1 */}
									<motion.div
										className="w-full flex-shrink-0 px-2"
										variants={tileVariants}
										initial="hidden"
										animate={isInView ? "show" : "hidden"}
										transition={{ delay: 0 * 0.1 }}
									>
										<div
											className={`bg-yellow-400 rounded-lg p-6 h-48 flex flex-col justify-center text-black`}
										>
											<h3 className="text-xl font-bold mb-3">
												{content.section6tile1title}
											</h3>
											<p className="text-sm leading-relaxed">
												{content.section6tile1description}
											</p>
										</div>
									</motion.div>

									{/* Tile 2 */}
									<motion.div
										className="w-full flex-shrink-0 px-2"
										variants={tileVariants}
										initial="hidden"
										animate={isInView ? "show" : "hidden"}
										transition={{ delay: 1 * 0.1 }}
									>
										<div
											className={`bg-teal-500 rounded-lg p-6 h-48 flex flex-col justify-center text-black`}
										>
											<h3 className="text-xl font-bold mb-3">
												{content.section6tile2title}
											</h3>
											<p className="text-sm leading-relaxed">
												{content.section6tile2description}
											</p>
										</div>
									</motion.div>

									{/* Tile 3 */}
									<motion.div
										className="w-full flex-shrink-0 px-2"
										variants={tileVariants}
										initial="hidden"
										animate={isInView ? "show" : "hidden"}
										transition={{ delay: 2 * 0.1 }}
									>
										<div
											className={`bg-gray-400 rounded-lg p-6 h-48 flex flex-col justify-center text-black`}
										>
											<h3 className="text-xl font-bold mb-3">
												{content.section6tile3title}
											</h3>
											<p className="text-sm leading-relaxed">
												{content.section6tile3description}
											</p>
										</div>
									</motion.div>
								</div>
							</div>

							{/* Navigation Dots */}
							<div className="flex justify-center mt-6">
								<div className="flex space-x-2 bg-gray-200 rounded-full p-1">
									{[0, 1, 2].map((index) => (
										<button
											key={index}
											onClick={() => goToSlide(index)}
											className={`w-2 h-2 rounded-full transition-colors ${
												index === currentSlide ? "bg-gray-600" : "bg-gray-300"
											}`}
											aria-label={`Go to slide ${index + 1}`}
										/>
									))}
								</div>
							</div>

							{/* Navigation Arrows */}
							<div className="flex justify-end mt-4 space-x-2">
								<button
									onClick={prevSlide}
									className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-600 transition-colors"
									aria-label="Previous slide"
								>
									<svg
										className="w-4 h-4 text-gray-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 19l-7-7 7-7"
										/>
									</svg>
								</button>
								<button
									onClick={nextSlide}
									className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center hover:border-gray-800 transition-colors"
									aria-label="Next slide"
								>
									<svg
										className="w-4 h-4 text-gray-600"
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
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
