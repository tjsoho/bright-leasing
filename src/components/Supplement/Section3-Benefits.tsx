'use client';

import { SupplementPageProps } from "@/app/supplement/_config";

interface BenefitsProps {
    content: SupplementPageProps['content'];
}

export default function Benefits({ content }: BenefitsProps) {
    const benefits = [
        {
            title: content.benefits?.subtitle1 || "Mental Performance",
            items: [
                content.benefits?.subtitle1item1 || "Enhanced focus and mental clarity",
                content.benefits?.subtitle1item2 || "Improved cognitive function"
            ]
        },
        {
            title: content.benefits?.subtitle2 || "Physical Optimization",
            items: [
                content.benefits?.subtitle2item1 || "Increased energy and stamina",
                content.benefits?.subtitle2item2 || "Better recovery and adaptation"
            ]
        },
        {
            title: content.benefits?.subtitle3 || "Stress Management",
            items: [
                content.benefits?.subtitle3item1 || "Reduced cortisol levels",
                content.benefits?.subtitle3item2 || "Enhanced stress resilience"
            ]
        },
        {
            title: content.benefits?.subtitle4 || "Hormonal Balance",
            items: [
                content.benefits?.subtitle4item1 || "Optimized testosterone levels",
                content.benefits?.subtitle4item2 || "Improved hormonal regulation"
            ]
        }
    ];

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {content.benefits?.title || "Key Benefits"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-black border border-white/20 p-8 hover:border-white/40 transition-colors"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">
                                {benefit.title}
                            </h3>
                            <ul className="space-y-4">
                                {benefit.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex items-start space-x-3 text-white/70"
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-white/70" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
