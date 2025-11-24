/* ************************************************************
                        NOTES
************************************************************ */
// FAQs page component matching home page design
// Features category tabs and accordion-style FAQ items
// Uses brand colors and typography consistent with site design
/* ************************************************************
                        IMPORTS
************************************************************ */
'use client';

import { useEffect, useState } from 'react';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { getFAQs, getFAQCategories } from '@/server-actions/faq';
import { motion, Variants } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { FAQsPageProps, faqsPageFallbackData } from './_config';
import getPage from '@/server-actions/page';

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function FAQsPage() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
    const [pageData, setPageData] = useState<FAQsPageProps>(faqsPageFallbackData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const [faqsData, categoriesData, pageContent] = await Promise.all([
                    getFAQs(),
                    getFAQCategories(),
                    getPage<FAQsPageProps>("faqs", faqsPageFallbackData)
                ]);

                setPageData(pageContent);

                // Handle null/undefined data
                const safeFaqs = faqsData || [];
                const safeCategories = categoriesData || [];

                // Sort categories to ensure General is first
                const sortedCategories = safeCategories.sort((a, b) => {
                    if (a.slug === 'general') return -1;
                    if (b.slug === 'general') return 1;
                    return a.name.localeCompare(b.name);
                });

                // Sort FAQs by order_index within each category
                // The getFAQs function already orders by order_index, so we just need to maintain that order
                // Group by category and maintain order_index order
                const sortedFaqs = safeFaqs.sort((a, b) => {
                    // First, sort by category (General first)
                    const aIsGeneral = a.category?.slug === 'general';
                    const bIsGeneral = b.category?.slug === 'general';
                    if (aIsGeneral && !bIsGeneral) return -1;
                    if (!aIsGeneral && bIsGeneral) return 1;

                    // If same category, sort by order_index
                    if (a.category_id === b.category_id) {
                        const aOrder = a.order_index ?? 0;
                        const bOrder = b.order_index ?? 0;
                        return aOrder - bOrder;
                    }

                    // Different categories, maintain category order
                    return 0;
                });

                setFaqs(sortedFaqs);
                setCategories(sortedCategories);
                console.log('Categories loaded:', sortedCategories);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const filteredFaqs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category_id === selectedCategory);

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const heroVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const tabsContainerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const tabVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 10,
            scale: 0.95,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const faqVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
            rotateX: -10,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1920px] mx-auto lg:px-8 py-4 pt-24">
                {/* ************************************************************
                    HERO SECTION
                ************************************************************ */}
                <section className="pt-16 pb-8 px-4">
                    <div className="max-w-[1540px] mx-auto">
                        <motion.h1
                            className="h1 text-brand-black text-center mb-6"
                            variants={heroVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <RenderLineBreaks text={pageData.content.title || "Frequently Asked Questions"} />
                        </motion.h1>
                        <motion.p
                            className="p text-center max-w-3xl mx-auto text-brand-black/70"
                            variants={heroVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <RenderLineBreaks text={pageData.content.subheading || "Discover the most intelligent approach to vehicle ownership and unlock smarter ways to drive the car you want."} />
                        </motion.p>
                    </div>
                </section>

                <div className="max-w-[1540px] mx-auto px-4">
                    {/* ************************************************************
                        CATEGORY TABS SECTION
                    ************************************************************ */}
                    {categories.length > 0 && (
                        <section className="pt-8 pb-4">
                            <motion.div
                                className="flex flex-wrap gap-3 justify-center"
                                variants={tabsContainerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                <motion.button
                                    variants={tabVariants}
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'all'
                                        ? 'bg-brand-yellow text-brand-black shadow-lg scale-105'
                                        : 'bg-brand-cream text-brand-black hover:bg-brand-teal hover:text-white border border-brand-black/10'
                                        }`}
                                >
                                    All
                                </motion.button>
                                {categories.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        variants={tabVariants}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                                            ? 'bg-brand-yellow text-brand-black shadow-lg scale-105'
                                            : 'bg-brand-cream text-brand-black hover:bg-brand-teal hover:text-white border border-brand-black/10'
                                            }`}
                                    >
                                        {category.name}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </section>
                    )}

                    {/* ************************************************************
                        FAQS ACCORDION SECTION
                    ************************************************************ */}
                    <section className=" bg-white">
                        <div className="max-w-4xl mx-auto px-4">
                            {isLoading ? (
                                <div className="text-center py-16">
                                    <p className="p text-brand-black/50">Loading FAQs...</p>
                                </div>
                            ) : filteredFaqs.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="p text-brand-black/50 italic">
                                        No FAQs found{selectedCategory !== 'all' ? ' in this category' : ''}.
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <Accordion type="single" collapsible className="w-full">
                                        {filteredFaqs.map((faq, index) => (
                                            <motion.div
                                                key={faq.id}
                                                variants={faqVariants}
                                            >
                                                <AccordionItem
                                                    value={`item-${index}`}
                                                    className="border-b border-gray-200 bg-white data-[state=open]:bg-brand-cream px-4 py-4"
                                                >
                                                    <AccordionTrigger className="hover:no-underline [&>svg]:bg-brand-yellow [&>svg]:text-white [&>svg]:rounded-full [&>svg]:border-2 [&>svg]:border-brand-yellow [&>svg]:p-2 [&>svg]:w-8 [&>svg]:h-8">
                                                        <div className="flex items-center space-x-4 text-left">
                                                            <span className="text-brand-yellow font-bold text-lg">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                            <h4 className="text-gray-800 h4">
                                                                <RenderLineBreaks text={faq.question} />
                                                            </h4>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground">
                                                        <div className="ml-12">
                                                            <p className="text-gray-600 leading-relaxed p whitespace-pre-wrap">
                                                                <RenderLineBreaks text={faq.answer} />
                                                            </p>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </motion.div>
                                        ))}
                                    </Accordion>
                                </motion.div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
