'use client';

import { SupplementPageProps } from "@/app/supplement/_config";
import Image from "next/image";

interface Section4Props {
    content: SupplementPageProps['content'];
}

export default function Section4Comparison({ content }: Section4Props) {
    if (!content.comparison) return null;

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {content.comparison.title}
                </h2>

                <div className="space-y-2">
                    {/* Products Comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-12 items-start">
                        {/* Our Product */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white">
                                {content.comparison.staitTitle}
                            </h3>
                            <div className="relative aspect-square">
                                <Image
                                    src={content.comparison.ourProductImage}
                                    alt="STAIT Product"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Comparison Icon */}
                        <div className="hidden lg:flex items-center justify-center h-full ">
                            <div className="border border-white/20 p-2 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 text-white/60"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Other Products */}
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">
                                {content.comparison.otherProducts.title}
                            </h3>
                            <div className="space-y-4">
                                {content.comparison.otherProducts.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border-b border-white/10 pb-[2px]"
                                    >
                                        <p className="text-white/70 text-sm">{item.name}</p>
                                        <p className="text-white/50 line-through text-sm">{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price Comparison - Centered */}
                    <div className="max-w-2xl mx-auto bg-white/5 p-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white/70 text-xl">Traditional Total Cost</h3>
                            <h3 className="text-white/50 line-through text-xl">
                                {content.comparison.traditionalPrice}
                            </h3>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <h3 className="text-white text-xl">STAIT Complete Solution</h3>
                            <h3 className="text-white text-xl">
                                {content.comparison.featurePrice}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}