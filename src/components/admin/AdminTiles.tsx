/* ************************************************************
                        NOTES
************************************************************ */
// Admin tiles component for the admin dashboard
// Features brand-colored cards with smooth animations
// Matches home page design language and styling
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AdminTile {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const AdminTiles = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
  });

  /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  /* ************************************************************
                            TILE DATA
    ************************************************************ */
  const adminTiles: AdminTile[] = [
    {
      href: "/admin/seo",
      icon: "📈",
      title: "SEO",
      description: "Control titles, descriptions, keywords",
      color: "bg-brand-black text-brand-cream",
    },
    {
      href: "/admin/home",
      icon: "🏠",
      title: "Home",
      description: "Manage homepage content",
      color: "bg-brand-yellow text-brand-black",
    },
    {
      href: "/admin/contact",
      icon: "📞",
      title: "Contact",
      description: "Manage contact page content",
      color: "bg-brand-teal text-white",
    },
    {
      href: "/admin/employers",
      icon: "💼",
      title: "Employers",
      description: "Manage employer page content",
      color: "bg-brand-yellow text-brand-black",
    },
    {
      href: "/admin/employees",
      icon: "🧑‍💼",
      title: "Employees",
      description: "Manage employee page content",
      color: "bg-brand-teal text-white",
    },
    {
      href: "/admin/footer",
      icon: "🦶",
      title: "Footer",
      description: "Manage footer content",
      color: "bg-gray-300 text-brand-black",
    },
    {
      href: "/admin/about-us",
      icon: "👥",
      title: "About Us",
      description: "Manage company information",
      color: "bg-gray-300 text-brand-black",
    },
    {
      href: "/admin/team",
      icon: "👥",
      title: "Team",
      description: "Manage team members",
      color: "bg-brand-yellow text-brand-black",
    },
    {
      href: "/admin/blog",
      icon: "📝",
      title: "Articles",
      description: "Manage blog posts and content",
      color: "bg-brand-teal text-white",
    },

    {
      href: "/admin/faqs",
      icon: "❓",
      title: "FAQs",
      description: "Manage FAQs and categories",
      color: "bg-brand-yellow text-brand-black",
    },
    {
      href: "/admin/privacy-policy",
      icon: "🔒",
      title: "Privacy Policy",
      description: "Manage privacy policy content",
      color: "bg-brand-teal text-white",
    },
    {
      href: "/admin/terms-and-conditions",
      icon: "📋",
      title: "Terms & Conditions",
      description: "Manage terms and conditions content",
      color: "bg-brand-yellow text-brand-black",
    },
    {
      href: "/admin/terms-of-use",
      icon: "📄",
      title: "Terms of Use",
      description: "Manage terms of use content",
      color: "bg-brand-teal text-white",
    },
  ];

  /* ************************************************************
                            RENDER
    ************************************************************ */
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="contents"
      >
        {adminTiles.map((tile, index) => (
          <motion.div key={`${tile.href}-${index}`} variants={itemVariants}>
            <Link
              href={tile.href}
              className={`group flex flex-col justify-center h-64 rounded-2xl p-8 ${tile.color} hover:scale-105 transition-all duration-300 hover:shadow-xl block`}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <span className="text-2xl">{tile.icon}</span>
                </div>
                <h2 className="text-md font-semibold mb-2">{tile.title}</h2>
                <p className="text-small opacity-80">{tile.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminTiles;
