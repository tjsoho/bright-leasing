/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy admin page
// Features: Admin interface for managing privacy policy content
// Layout: Clean admin layout with privacy policy inputs
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import PrivacyPolicyInputs from "@/components/admin/privacy-policy-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function PrivacyPolicyAdminPage() {
    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <PrivacyPolicyInputs />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
// Default export is already declared above
