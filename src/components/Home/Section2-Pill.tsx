'use client';

{/* ***************************************************************
   SECTION 2 COMPONENT
   Single column layout featuring:
   - Section title
   - Full-width pill image
   Used to showcase product or service highlight
****************************************************************/}

import { HomePageProps } from "@/app/_config";
import LuxeButton from "@/ui/LuxeButton";
import Image from "next/image";


interface Section2Props {
    content: HomePageProps['content'];
}

export default function Section2({ content }: Section2Props) {
    return (
        <section className="pt-8 lg:py-8">
            <div className="max-w-6xl mx-auto px-2">
                <div className="lg:space-y-8">
                    <h2 className="text-4xl font-bold text-white lg:mb-6 w-2/3">
                        {content.section2title}
                    </h2>
                    <Image
                        src='/placeholder.jpg'
                        alt="Product highlight visualization"
                        className="w-full rounded-lg block lg:hidden -mt-8"
                        aria-label="Visual representation of our product features"
                        priority
                        width={1000}
                        height={1000}
                    />
                    <Image
                        src='/placeholder.jpg'
                        alt="Product highlight visualization"
                        className="w-full rounded-lg hidden lg:block"
                        aria-label="Visual representation of our product features"
                        priority
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="flex justify-center -mt-8 lg:-mt-0 mb-6 lg:mb-0">
                    <LuxeButton title="The Clinically Proven Results" showArrow />
                </div>
            </div>
        </section>
    );
}
