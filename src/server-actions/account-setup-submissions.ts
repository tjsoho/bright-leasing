import { supabase } from "@/utils/supabase";

/* ************************************************************
                        INTERFACES
************************************************************ */
export interface AccountSetupSubmission {
	id: string;
	form_url_path: string;
	form_data: {
		stepIndex: number;
		stepTitle?: string;
		answers: Record<string, string>;
	}[];
	created_at: string;
	updated_at: string;
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
async function initializeAccountSetupSubmissionsTable() {
	try {
		// Check if table exists by trying to query it
		const { error: checkError } = await supabase
			.from("account_setup_submissions")
			.select("id")
			.limit(1);

		// Check for table not found error codes
		// 42P01 = PostgreSQL undefined_table
		// PGRST205 = PostgREST table not found
		if (checkError && (checkError.code === "42P01" || checkError.code === "PGRST205")) {
			console.error("❌ Table 'account_setup_submissions' does not exist!");
			console.error("📋 Please run the migration in your Supabase SQL Editor:");
			console.error("   File: supabase/migrations/20250106000000_create_account_setup_submissions.sql");
			console.error("   Or copy the SQL from that file and run it in Supabase Dashboard > SQL Editor");
			return false;
		}

		// Table exists
		return true;
	} catch (error) {
		console.error("Error checking account_setup_submissions table:", error);
		return false;
	}
}

// Initialize the table check when this module loads
let tableInitialized = false;
async function ensureTableExists() {
	if (!tableInitialized) {
		tableInitialized = true;
		await initializeAccountSetupSubmissionsTable();
	}
}
export async function getAccountSetupSubmissions(): Promise<AccountSetupSubmission[]> {
	await ensureTableExists();
	
	const { data, error } = await supabase
		.from("account_setup_submissions")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		if (error.code === "42P01" || error.code === "PGRST205") {
			throw new Error(
				"Table 'account_setup_submissions' does not exist. Please run the migration: supabase/migrations/20250106000000_create_account_setup_submissions.sql in your Supabase SQL Editor."
			);
		}
		console.error("Error fetching account setup submissions:", error);
		throw error;
	}

	return (data || []) as AccountSetupSubmission[];
}

export async function createAccountSetupSubmission(
	formUrlPath: string,
	formData: AccountSetupSubmission["form_data"]
): Promise<AccountSetupSubmission> {
	await ensureTableExists();
	
	try {
		const { data, error } = await supabase
			.from("account_setup_submissions")
			.insert([
				{
					form_url_path: formUrlPath,
					form_data: formData,
				},
			])
			.select()
			.single();

		if (error) {
			if (error.code === "42P01" || error.code === "PGRST205") {
				throw new Error(
					"Table 'account_setup_submissions' does not exist. Please run the migration: supabase/migrations/20250106000000_create_account_setup_submissions.sql in your Supabase SQL Editor."
				);
			}
			console.error("Error creating account setup submission:", {
				error,
				message: error.message,
				details: error.details,
				hint: error.hint,
				code: error.code,
				formUrlPath,
				formDataLength: JSON.stringify(formData).length,
			});
			throw new Error(error.message || "Failed to create account setup submission");
		}

		if (!data) {
			throw new Error("No data returned from insert operation");
		}

		return data as AccountSetupSubmission;
	} catch (error) {
		console.error("Unexpected error in createAccountSetupSubmission:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("An unexpected error occurred while creating the submission");
	}
}

export async function deleteAccountSetupSubmission(id: string): Promise<void> {
	await ensureTableExists();
	
	const { error } = await supabase
		.from("account_setup_submissions")
		.delete()
		.eq("id", id);

	if (error) {
		if (error.code === "42P01" || error.code === "PGRST205") {
			throw new Error(
				"Table 'account_setup_submissions' does not exist. Please run the migration: supabase/migrations/20250106000000_create_account_setup_submissions.sql in your Supabase SQL Editor."
			);
		}
		console.error("Error deleting account setup submission:", error);
		throw error;
	}
}

