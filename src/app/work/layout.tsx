/* ************************************************************
                        NOTES
************************************************************ */
// Layout wrapper for the Work page
// Provides access to shared SEO metadata builder
/* ************************************************************
                        IMPORTS
************************************************************ */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface WorkLayoutProps {
	children: ReactNode;
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata("work");
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function WorkLayout({ children }: WorkLayoutProps) {
	/* ************************************************************
                            RENDER
    ************************************************************ */
	return <>{children}</>;
}
