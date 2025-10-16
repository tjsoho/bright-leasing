/* ************************************************************
                        NOTES
************************************************************ */
// Terms & Conditions admin page
// Features: Hosts the TermsAndConditionsInputs component
// Layout: Wrapped with ImageLibraryProvider for rich text editing
/* ************************************************************
                        IMPORTS
************************************************************ */
import TermsAndConditionsInputs from "@/components/admin/terms-and-conditions-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsAndConditionsAdminPage() {
    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <TermsAndConditionsInputs />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
