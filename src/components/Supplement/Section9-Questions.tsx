'use client';

import { SupplementPageProps } from "@/app/supplement/_config";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface Section9Props {
    content: SupplementPageProps['content'];
}

export default function Section9Questions({ content }: Section9Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!content.questions) return null;

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-black py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {content.questions.title}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {content.questions.items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-black/20"
                        >
                            <div className="min-h-[76px] border border-white/20 hover:border-white/40 transition-colors">
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-medium text-white">
                                        {item.question}
                                    </span>
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="flex-shrink-0 ml-4"
                                    >
                                        {openIndex === index ? (
                                            <MinusIcon className="w-6 h-6 text-white" />
                                        ) : (
                                            <PlusIcon className="w-6 h-6 text-white" />
                                        )}
                                    </motion.div>
                                </button>
                            </div>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden border-x border-b border-white/20"
                                    >
                                        <div className="p-6 ">
                                            <div className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}