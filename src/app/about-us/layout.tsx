/* ************************************************************
                        NOTES
************************************************************ */
// Layout wrapper for the About page
// Provides SEO metadata via the shared builder utility
/* ************************************************************
                        IMPORTS
************************************************************ */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AboutLayoutProps {
	children: ReactNode;
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata("about");
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function AboutLayout({ children }: AboutLayoutProps) {
	/* ************************************************************
                            RENDER
    ************************************************************ */
	return <>{children}</>;
}
