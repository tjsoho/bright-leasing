import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("contact");
}

export default function ContactLayout({ children }: { children: ReactNode }) {
    return children;
}




