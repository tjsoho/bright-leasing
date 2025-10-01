"use client";

import Image from "next/image";
import Link from "next/link";
import { Business } from "@/app/giving-back/_config";

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8 lg:gap-16">
            {/* Image Container */}
            <div className="relative w-full lg:w-[400px] h-[300px] lg:h-[400px]">
                {/* Background border image */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-contain"
                    style={{ backgroundImage: "url('/images/border.png')" }}
                >
                    {/* Business logo centered */}
                    <div className="absolute inset-0 flex items-center justify-center -mt-60">
                        <div className="relative w-[150px] h-[100px]">
                            <Image
                                src={business.image}
                                alt={business.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6 py-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    {business.title}
                </h2>
                <h3 className="text-xl text-white/90 font-medium">
                    {business.subheading}
                </h3>
                <div className="space-y-4">
                    <p className="text-base text-white/70 leading-relaxed whitespace-pre-wrap">
                        {business.paragraph}
                    </p>
                    <Link
                        href="#"
                        className="inline-block text-white hover:text-white/90 transition-colors uppercase text-sm tracking-wider mt-4"
                    >
                        READ MORE
                    </Link>
                </div>
            </div>
        </div>
    );
}