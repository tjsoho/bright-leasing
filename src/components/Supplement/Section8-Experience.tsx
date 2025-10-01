'use client';

import { SupplementPageProps } from "@/app/supplement/_config";
import Image from "next/image";
import LuxeButton from "@/components/core/LuxeButton";

interface Section8Props {
    content: SupplementPageProps['content'];
}

export default function Section8Experience({ content }: Section8Props) {
    if (!content.experience) return null;

    return (
        <section className="bg-black h-[80vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-medium text-white/70">
                            {content.experience.title}
                        </h3>
                        <h2 className="text-4xl font-bold text-white">
                            {content.experience.heading}
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed">
                            {content.experience.paragraph}
                        </p>
                        <div>
                            <LuxeButton
                                onClick={() => window.location.href = '/reviews'}
                                aria-label="Begin your wellness journey with STAIT"
                            >
                                FIND OUT MORE
                            </LuxeButton>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative aspect-[4/3] lg:aspect-square">
                        <Image
                            src={content.experience.image}
                            alt="Experience STAIT"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
