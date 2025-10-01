'use client';

import Image from 'next/image';
import { SupplementPageProps } from '@/app/supplement/_config';

interface HeroProps {
    content: SupplementPageProps['content'];
}

export default function Hero({ content }: HeroProps) {
    return (
        <section className="relative py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {content.heroTitle}
                    </h1>
                    <p className="text-xl text-white/80">{content.heroSubtitle}</p>
                    <div className="text-white/80 whitespace-pre-wrap">{content.heroContent}</div>
                </div>

                {/* Right Column - Image */}
                <div className="relative aspect-square">
                    <Image
                        src={content.heroImage || '/images/supplement/hero.jpg'}
                        alt="STAIT Supplements"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}