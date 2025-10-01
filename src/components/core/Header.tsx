"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ShiningButton from "../../ui/ShiningButton";
import Menu from "./Menu";

interface HeaderProps {
	homePage?: {
		content?: {
			titleHero?: string;
		};
	};
}

const Header = ({ homePage }: HeaderProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 bg-black z-50 px-2 sm:px-4 py-2">
				<div className="max-w-7xl mx-auto relative">
					{/* Left Side - Menu Button */}
					<div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
						<button
							onClick={() => setIsMenuOpen(true)}
							className="p-1 sm:p-2 hover:bg-white/10 rounded-full text-white"
							aria-label="Open menu"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="white"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<div className="hidden md:block">
							<ShiningButton href="/supplement">Get Started</ShiningButton>
						</div>
					</div>

					{/* Center - Logo and Slogan */}
					<div className="flex flex-col items-center mx-auto w-full hover:cursor-pointer">
						<Link
							href="/"
							className="block text-3xl font-bold tracking-wider text-white my-1 sm:my-2"
						>
							<Image
								src="/placeholder.jpg"
								alt="Logo"
								width={550}
								height={100}
								className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[150px] h-auto hover:cursor-pointer"
							/>
						</Link>
						<h2 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-4">
							{homePage?.content?.titleHero || "UNAPOLOGETICALLY STRONG"}
						</h2>
					</div>
				</div>
			</header>

			<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
};

export default Header;
