"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BWestSmallButton } from "../ui/b-west-small";
import BubbleMenu from "./BubbleMenu";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// coding notes format

	/************************************************************
		RENDER
	************************************************************/

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					{ /* ************************************************************
								Left Column - Logo and Navigation
					************************************************************/}
					<motion.div
						className="flex items-center gap-6 bg-brand-teal rounded-full px-6 py-4 justify-between relative overflow-hidden"
						initial={{ scaleX: 0, opacity: 0 }}
						animate={isLoaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
						transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
						style={{ transformOrigin: "left center" }}
					>
						{/* Content that appears as bubble grows */}
						<motion.div
							className="flex items-center gap-6 relative z-10"
							initial={{ opacity: 0 }}
							animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
							transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
						>
							<div>
								{/* Logo */}
								<Link href="/" className="flex items-center gap-3">
									<Image src="/images/brightlogo.png" alt="Logo" width={120} height={100} className="w-full h-auto" />
								</Link>
							</div>
							{/* Navigation Tabs */}
							<div className="flex bg-brand-teal rounded-full p-1">
								<button className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-white hover:text-brand-black hover:scale-105 group"
								>
									Employees
									{/* add a plus icon to the right of the text */}
									<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
								</button>
								<button
									className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-black hover:scale-105 group"
								>
									Employers
									{/* add a plus icon to the right of the text */}
									<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
								</button>
							</div>
						</motion.div>
					</motion.div>

					{/* ************************************************************
						Right Column - Action Buttons
					************************************************************/}
					<div className="flex items-center gap-4 bg-brand-cream rounded-full px-6 py-5">
						<BWestSmallButton text="Start in 60 seconds" />
						<button className=" border border-brand-black rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-colors text-sm px-8 py-2">
							How it works
						</button>
						<div className="relative">
							<button
								onClick={() => setIsMenuOpen(true)}
								className="w-10 h-10 border border-brand-black rounded-full flex items-center justify-center hover:bg-brand-black hover:text-white transition-colors relative z-20"
								aria-label="Open menu"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>

							{/* Bubble Menu */}
							<BubbleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
						</div>
					</div>
				</div>
			</header>

		</>
	);
};

export default Header;
