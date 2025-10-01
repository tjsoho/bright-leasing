'use client';

{/* ***************************************************************
   SECTION 3 COMPONENT
   Features section with:
   - Section title and descriptive paragraph
   - Grid of 6 profile images
   Used to showcase team, customers, or community
****************************************************************/}

import { HomePageProps } from "@/app/_config";

const highlightPhrases = (text: string) => {
    const phrases = [
        "STAIT",
        "science-backed formulas"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="text-white">$1</span>');
    });

    return result;
};
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Section3Props {
    content: HomePageProps['content'];
}

export default function Section3({ content }: Section3Props) {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
    };

    const images = [1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="relative aspect-[9/16] px-1">
            <Image
                src={content.section3Images?.[`profile${index}` as keyof typeof content.section3Images] || '/images/next.svg'}
                alt={`Profile ${index}`}
                className="w-full h-full object-cover"
                aria-label={`Community member profile ${index}`}
                width={180}
                height={320}
            />
        </div>
    ));

    return (
        <section className="py-8 lg:py-16">
            <div className="">
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white mb-6 w-4/5 lg:w-full lg:text-center px-2">
                        {content.section3title}
                    </h2>
                    <p
                        className="text-sm text-white/70 leading-relaxed mb-6 text-center hidden lg:block whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section3paragraph) }}
                    />
                    {/* Mobile Slider */}
                    <div className="md:hidden overflow-hidden">
                        <Slider {...sliderSettings}>
                            {images}
                            {/* Duplicate images for seamless infinite loop */}
                            {images}
                            {images}
                        </Slider>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-6 gap-4">
                        {images}
                    </div>
                    <p
                        className="text-sm text-gray-300 leading-relaxed mb-6 text-center lg:hidden whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightPhrases(content.section3paragraph) }}
                    />
                </div>
            </div>
        </section>
    );
}


