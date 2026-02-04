/* ************************************************************
                        NOTES
************************************************************ */
// Dynamic catch-all route for account setup forms
// Queries database for pages matching the URL path
// Renders account setup forms based on urlPath configured in admin
/* ************************************************************
                        IMPORTS
************************************************************ */
import { notFound } from "next/navigation";
import { getPageByUrlPath } from "@/server-actions/page";
import { 
	accountSetupFormFallbackData, 
	AccountSetupFormProps,
} from "@/app/account-setup/_config";
import AccountSetupForm from "@/components/account-setup/AccountSetupForm";
import type { Metadata } from "next";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface DynamicPageProps {
	params: Promise<{
		slug: string[];
	}>;
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
	const { slug } = await params;
	const path = `/${slug.join("/")}`;
	
	const page = await getPageByUrlPath<AccountSetupFormProps>(
		path,
		accountSetupFormFallbackData,
	);

	if (!page) {
		return {
			title: "Page Not Found",
		};
	}

	return {
		title: page.title || "Account Setup Form",
		description: page.description || "Complete your account setup",
	};
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DynamicAccountSetupPage({ params }: DynamicPageProps) {
	const { slug } = await params;
	const path = `/${slug.join("/")}`;

	// Query database for page with matching urlPath
	const accountSetupPage = await getPageByUrlPath<AccountSetupFormProps>(
		path,
		accountSetupFormFallbackData,
	);

	// If no page found, return 404
	if (!accountSetupPage) {
		notFound();
	}

	// Check if this is an account setup form (has steps array and urlPath in content)
	const content = accountSetupPage.content as { urlPath?: string; steps?: unknown[] };
	if (!content?.steps || !Array.isArray(content.steps) || !content.urlPath) {
		notFound();
	}

	/* ************************************************************
                            RENDER
    ************************************************************ */
	return (
		<main className="min-h-screen bg-white">
			<AccountSetupForm 
				content={accountSetupPage.content} 
				formUrlPath={content.urlPath || path}
			/>
		</main>
	);
}

