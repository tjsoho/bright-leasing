import getPage from "@/server-actions/page";
import { givingBackPageFallbackData, GivingBackPageProps } from "@/app/giving-back/_config";
import GivingBackAdminInputs from "@/components/admin/giving-back-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function GivingBackAdmin() {
    const givingBackPage = await getPage<GivingBackPageProps>(
        "giving-back",
        givingBackPageFallbackData
    );

    return (
        <ImageLibraryProvider>
            <GivingBackAdminInputs {...givingBackPage} />
        </ImageLibraryProvider>
    );
}


