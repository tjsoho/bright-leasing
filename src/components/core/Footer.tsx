/* ************************************************************
                        NOTES
************************************************************ */
// Footer component with company branding, navigation links, and copyright
// Features animated sections and responsive design
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    const footerColumns: FooterColumn[] = [
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about-us" },
                { label: "Team", href: "/team" },
                { label: "Blog", href: "/blog" }
            ]
        },
        {
            title: "Services",
            links: [
                { label: "Employees", href: "/services" },
                { label: "Employers", href: "/services" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" }
            ]
        },
        {
            title: "Say Hi",
            links: [
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Facebook", href: "https://facebook.com" },
                { label: "Linked In", href: "https://linkedin.com" },
                { label: "Contact", href: "/contact" }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <footer className="bg-brand-black text-white py-16" ref={ref}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
                >
                    {/* ************************************************************
              COMPANY BRANDING - Left section
          ************************************************************ */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1"
                    >
                        <Link href="/" className="block mb-6">
                            <Image
                                src="/images/bwlogo.png"
                                alt="Bright Leasing Logo"
                                width={120}
                                height={80}
                                className="w-auto h-16"
                            />
                        </Link>
                        <motion.p
                            variants={itemVariants}
                            className="text-white/80 leading-relaxed"
                        >
                            Intelligent car ownership<br />
                            made simple
                        </motion.p>
                    </motion.div>

                    {/* ************************************************************
              NAVIGATION COLUMNS - Right section
          ************************************************************ */}
                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerColumns.map((column, columnIndex) => (
                            <motion.div
                                key={column.title}
                                variants={itemVariants}
                                className="space-y-4"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-white font-semibold text-lg mb-4"
                                >
                                    {column.title}
                                </motion.h3>
                                <motion.ul
                                    variants={containerVariants}
                                    className="space-y-3"
                                >
                                    {column.links.map((link, linkIndex) => (
                                        <motion.li
                                            key={link.href}
                                            variants={itemVariants}
                                        >
                                            <Link
                                                href={link.href}
                                                className="text-white/70 hover:text-white transition-colors duration-300 block"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ************************************************************
            COPYRIGHT - Bottom section
        ************************************************************ */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <p className="text-white/60 text-sm">
                        © Bright Leasing Limited. All Rights Reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
