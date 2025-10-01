'use client';

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import React from "react";

export default function Admin() {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3
			}
		}
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: easeOut
			}
		}
	};

	return (
		<main className="min-h-screen bg-black">
			<div className="max-w-6xl mx-auto px-8 py-16">
				<h1 className="text-6xl font-bold text-white mb-16 tracking-tight">
					Admin Dashboard
				</h1>
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
					variants={containerVariants}
					initial="hidden"
					animate="show"
				>
					<motion.div variants={itemVariants}>
						<Link
							href="/admin/blog"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">📝</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Articles</h2>
								<p className="text-white/70 text-sm">Manage blog posts and content</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/supplement"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">⚙️</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">SUPPLEMENT</h2>
								<p className="text-white/70 text-sm">Manage service offerings</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/about-us"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">👥</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">About Us</h2>
								<p className="text-white/70 text-sm">Manage company information</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/home"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">🏠</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Home</h2>
								<p className="text-white/70 text-sm">Manage homepage content</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/team"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">👥</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Team</h2>
								<p className="text-white/70 text-sm">Manage team members</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/science"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">🧬</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Stait Science</h2>
								<p className="text-white/70 text-sm">Manage science articles</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/podcasts"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">🎙️</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Podcasts</h2>
								<p className="text-white/70 text-sm">Manage podcast links</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/faqs"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">❓</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">FAQs</h2>
								<p className="text-white/70 text-sm">Manage FAQs and categories</p>
							</div>
						</Link>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Link
							href="/admin/giving-back"
							className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
						>
							<div className="text-center">
								<div className="w-12 h-12 mx-auto mb-4 bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<span className="text-2xl">❓</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">Giving Back</h2>
								<p className="text-white/70 text-sm">Manage Giving Back content</p>
							</div>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</main>
	);
}