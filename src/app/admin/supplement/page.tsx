import { supplementPageFallbackData, SupplementPageProps } from "@/app/supplement/_config";
import SupplementAdminInputs from "@/components/admin/supplement-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function SupplementAdmin() {
	const supplementPage = await getPage<SupplementPageProps>("supplement", supplementPageFallbackData);

	console.log('Admin - Loading supplement page:', supplementPage);

	return (
		<ImageLibraryProvider>
			<div>
				<SupplementAdminInputs
					id={supplementPage.id}
					title={supplementPage.title}
					description={supplementPage.description}
					slug={supplementPage.slug}
					content={{
						...supplementPageFallbackData.content,
						...supplementPage.content,
						featuredProductIds: supplementPage.content?.featuredProductIds || []
					}}
				/>
			</div>
		</ImageLibraryProvider>
	);
}