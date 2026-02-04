import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("privacy-policy");
}

export default function PrivacyLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}






