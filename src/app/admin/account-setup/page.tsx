import {
	accountSetupFormFallbackData,
	AccountSetupFormProps,
} from "@/app/account-setup/_config";
import AccountSetupAdminInputs from "@/components/admin/account-setup-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function AccountSetupAdmin() {
	const accountSetupPage = await getPage<AccountSetupFormProps>(
		"account-setup",
		accountSetupFormFallbackData,
	);

	return (
		<ImageLibraryProvider>
			<AccountSetupAdminInputs
				title={accountSetupPage.title}
				description={accountSetupPage.description}
				slug={accountSetupPage.slug}
				content={accountSetupPage.content}
			/>
		</ImageLibraryProvider>
	);
}



