// section 4 dynamic image with no text

import { HomePageProps } from "@/app/_config";
import Image from "next/image";
import Link from "next/link";

interface Section4Props {
    content: HomePageProps['content'];
}

export default function Section4({ content }: Section4Props) {
    return (
        <section className="py-8 lg:py-16">
            <div className="max-w-6xl mx-auto py-12 px-4">
                {/* Mobile Image */}
                <Link href="/supplement">
                    <Image
                        src={content.section4ImageDesktop}
                        alt="Section 4 Mobile Image"
                        className="w-full h-full object-cover lg:hidden"
                        aria-label="Section 4 Mobile Image"
                        priority
                        width={1000}
                        height={1000}
                    />
                </Link>
                {/* Desktop Image */}
                <Link href="/supplement">
                    <Image
                        src={content.section4ImageDesktop}
                        alt="Section 4 Desktop Image"
                        className="w-full h-full object-cover hidden lg:block"
                        aria-label="Section 4 Desktop Image"
                        priority
                        width={1000}
                        height={1000}
                    />
                </Link>
            </div>
        </section>
    );
}