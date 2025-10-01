'use client';

import { SupplementPageProps } from "@/app/supplement/_config";
import Image from "next/image";

interface Section7Props {
    content: SupplementPageProps['content'];
}

export default function Section7Results({ content }: Section7Props) {
    if (!content.results) return null;

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {content.results.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.results.cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 overflow-hidden group"
                        >
                            <div className="aspect-[4/2] relative">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 space-y-4">
                                <h4 className="text-lg font-bold text-white">
                                    {card.title}
                                </h4>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
