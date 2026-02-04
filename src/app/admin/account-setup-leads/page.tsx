/* ************************************************************
                        NOTES
************************************************************ */
// Admin page for viewing account setup form submissions
// Displays all leads with their answers organized by step
/* ************************************************************
                        IMPORTS
************************************************************ */
import { getAccountSetupSubmissions } from "@/server-actions/account-setup-submissions";
import AccountSetupLeadsManager from "@/components/admin/account-setup-leads/AccountSetupLeadsManager";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function AccountSetupLeadsPage() {
	const submissions = await getAccountSetupSubmissions();

	return <AccountSetupLeadsManager submissions={submissions} />;
}


