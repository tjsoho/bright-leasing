/* ************************************************************
                        NOTES
************************************************************ */
// Bubble menu component with Framer Motion animations and delayed text appearance
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navigationLinks } from "@/components/core/navigation";
import { BWestButton } from "../ui/b-west-button";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface BubbleMenuProps {
    isOpen: boolean;
    onClose: () => void;
    headerButtonText?: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const BubbleMenu = ({ isOpen, onClose, headerButtonText = "Start In 60 Seconds" }: BubbleMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Bubble Menu */}
                    <motion.div
                        className="bg-brand-yellow rounded-2xl relative z-10 flex flex-col"
                        style={{
                            width: '98vw',
                            height: '98vh',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                        initial={{
                            width: '40px',
                            height: '40px',
                            opacity: 0
                        }}
                        animate={{
                            width: '95vw',
                            height: '95vh',
                            opacity: 1
                        }}
                        exit={{
                            width: '40px',
                            height: '40px',
                            opacity: 0,
                            transition: { delay: 0.3, duration: 0.6, ease: "easeOut" }
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 bg-brand-black text-white rounded-full flex items-center justify-center hover:bg-brand-black/80 transition-colors z-20"
                            aria-label="Close menu"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0, transition: { delay: 0.4, duration: 0.2 } }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Logo - Top Left */}
                        <motion.div
                            className="absolute top-6 left-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <Link href="/" className="flex items-center">
                                <Image src="/images/bwlogo.png" alt="Logo" width={120} height={100} className="w-[150px] h-auto" />
                            </Link>
                        </motion.div>

                        {/* Menu Content - Middle */}
                        <motion.div
                            className="flex flex-col items-center justify-center h-full text-brand-black px-4 sm:px-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <motion.h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center text-brand-black"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                Menu
                            </motion.h2>

                            {/* Navigation Links */}
                            <motion.div
                                className="flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-6xl w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {/* Left Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(0, Math.ceil(navigationLinks.length / 3)).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + (index * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* First Divider */}
                                <div className="hidden lg:block w-px bg-brand-black/20"></div>

                                {/* Middle Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(Math.ceil(navigationLinks.length / 3), Math.ceil(navigationLinks.length / 3) * 2).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + ((index + Math.ceil(navigationLinks.length / 3)) * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Second Divider */}
                                <div className="hidden lg:block w-px bg-brand-black/20"></div>

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(Math.ceil(navigationLinks.length / 3) * 2).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + ((index + Math.ceil(navigationLinks.length / 3) * 2) * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Action Button */}
                            <motion.div
                                className="mt-16 w-full flex justify-center items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.7, duration: 0.3 }}
                            >
                                <BWestButton text={headerButtonText} variant="inverted" onClick={() => window.location.href = '/contact'} className="w-1/4" />
                            </motion.div>
                        </motion.div>

                        {/* Divider and Legal Links - Bottom */}
                        <motion.div
                            className="absolute bottom-6 left-6 right-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                        >
                            {/* Divider */}
                            <div className="border-t border-brand-black/20 mb-4"></div>

                            {/* Legal Links and Socials */}
                            <div className="relative flex flex-col md:flex-row items-center gap-4 text-sm text-brand-black/70">
                                {/* Privacy Links - Left */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:flex-1">
                                    <Link href="/privacy-policy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
                                    <Link href="/terms-and-conditions" className="hover:text-brand-teal transition-colors">Terms & Conditions</Link>
                                    <Link href="/admin" className="hover:text-brand-teal transition-colors">Admin</Link>
                                </div>

                                {/* Designed By Section - Center (Absolute on desktop) */}
                                <div className="flex items-center gap-2 text-brand-black/70 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                                    <span>Designed By</span>
                                    <Link href="https://www.ai-guy.co" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/images/ai.png"
                                            alt="Ai Guy Business Solutions"
                                            width={80}
                                            height={30}
                                            className="h-5 w-auto"
                                        />
                                    </Link>
                                    <span>Ai Guy Business Solutions</span>
                                </div>

                                {/* Social Links - Right */}
                                <div className="flex justify-center md:justify-end gap-4 md:flex-1">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61584022475229"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-teal transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/bright_leasing/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-teal transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/company/bright-leasing-pty-ltd/?viewAsMember=true"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-teal transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/* ************************************************************
                        EXPORTS
************************************************************ */
export default BubbleMenu;
