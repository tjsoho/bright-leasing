/* ************************************************************
                        NOTES
************************************************************ */
// Terms of Use admin page
// Features: Hosts the TermsOfUseInputs component
// Layout: Wrapped with ImageLibraryProvider for rich text editing
/* ************************************************************
                        IMPORTS
************************************************************ */
import TermsOfUseInputs from "@/components/admin/terms-of-use-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsOfUseAdminPage() {
    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <TermsOfUseInputs />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
