"use client";

/* ************************************************************
                        NOTES
************************************************************ */
// Account Setup Leads Manager component
// Shows each submission as a compact, collapsible entry
// Renders a grid of steps; each step shows compact label/value pairs for answers
/* ************************************************************
                        IMPORTS
************************************************************ */
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Calendar, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

import { deleteAccountSetupSubmission } from "@/server-actions/account-setup-submissions";
import type { AccountSetupSubmission } from "@/server-actions/account-setup-submissions";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AccountSetupLeadsManagerProps {
	submissions: AccountSetupSubmission[];
}

interface StepGridItem {
	stepIndex: number;
	stepTitle: string;
	fields: Array<{
		heading: string;
		answer: string;
	}>;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function AccountSetupLeadsManager({ submissions }: AccountSetupLeadsManagerProps) {
	/* ************************************************************
                            HOOKS
    ************************************************************ */
	const [submissionsList, setSubmissionsList] = useState(submissions);
	const [openId, setOpenId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFormPath, setSelectedFormPath] = useState<string>("all");

	/* ************************************************************
                            FUNCTIONS
    ************************************************************ */
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-AU", {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getPayrollName = (submission: AccountSetupSubmission) => {
		// Payroll Name requested as Step 2 "Name" (stepIndex === 1)
		const stepTwo = (submission.form_data || []).find((s) => s.stepIndex === 1);
		const stepTwoName = stepTwo
			? Object.entries(stepTwo.answers || {}).find(([key]) => key.toLowerCase().includes("name"))?.[1]
			: undefined;

		if (stepTwoName && stepTwoName.trim()) return stepTwoName.trim();

		// Fallback: first non-empty "name" across any step
		for (const step of submission.form_data || []) {
			const anyName = Object.entries(step.answers || {}).find(([key]) => key.toLowerCase().includes("name"))?.[1];
			if (anyName && anyName.trim()) return anyName.trim();
		}

		return "Unknown";
	};

	const handleDelete = async (submission: AccountSetupSubmission, displayLabel: string) => {
		const firstConfirm = confirm(
			`Delete ${displayLabel}?\n\nThis will permanently remove this lead from the database. This cannot be undone.`,
		);
		if (!firstConfirm) return;

		const typed = prompt(
			`Final confirmation:\nType DELETE to permanently delete ${displayLabel}.`,
			"",
		);
		if ((typed || "").trim().toUpperCase() !== "DELETE") {
			toast.error("Delete cancelled");
			return;
		}

		try {
			await deleteAccountSetupSubmission(submission.id);
			toast.success("Submission deleted");
			setSubmissionsList((prev) => prev.filter((s) => s.id !== submission.id));
			setOpenId((prev) => (prev === submission.id ? null : prev));
		} catch (error) {
			console.error("Error deleting submission:", error);
			toast.error("Failed to delete submission");
		}
	};

	const buildStepsGrid = (submission: AccountSetupSubmission): StepGridItem[] => {
		const steps: StepGridItem[] = [];

		for (const step of submission.form_data || []) {
			const stepTitle = (step.stepTitle || `Step ${step.stepIndex + 1}`).trim();
			const fields = Object.entries(step.answers || {}).map(([heading, answer]) => ({
				heading,
				answer: answer || "",
			}));

			steps.push({
				stepIndex: step.stepIndex,
				stepTitle,
				fields,
			});
		}

		steps.sort((a, b) => a.stepIndex - b.stepIndex);
		return steps;
	};

	/* ************************************************************
                            RENDER
    ************************************************************ */
	const normalizedSearch = searchTerm.trim().toLowerCase();
	const formPathOptions = Array.from(new Set(submissionsList.map((s) => s.form_url_path))).sort((a, b) =>
		a.localeCompare(b),
	);

	const filteredSubmissions = submissionsList.filter((s) => {
		if (selectedFormPath !== "all" && s.form_url_path !== selectedFormPath) return false;
		if (!normalizedSearch) return true;

		const payrollName = getPayrollName(s).toLowerCase();
		const date = formatDate(s.created_at).toLowerCase();
		const haystack = `${s.form_url_path} ${payrollName} ${date}`.toLowerCase();
		return haystack.includes(normalizedSearch);
	});

	return (
		<div className="min-h-screen bg-brand-cream p-6 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* ************************************************************
                    HEADER - TITLE + BACK BUTTON
                ************************************************************ */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<div>
						<h1 className="text-3xl font-bold text-brand-black mb-1">
							Account Setup Leads
						</h1>
						<p className="text-brand-black/70 text-small">
							Compact view of submitted account setup forms
						</p>
					</div>
					<Link href="/admin">
						<button className="px-6 py-3 bg-brand-yellow text-brand-black rounded-full font-semibold hover:bg-brand-yellow/80 transition-colors">
							Back To Admin
						</button>
					</Link>
				</div>

				{/* ************************************************************
                    CONTENT - SUBMISSIONS LIST
                ************************************************************ */}
				{submissionsList.length === 0 ? (
					<div className="text-brand-black/60 text-small">
						No submissions yet. Entries will appear here after users complete the account set up form.
					</div>
				) : (
					<div className="space-y-4">
						{/* Filters */}
						<div className="flex flex-col md:flex-row md:items-end gap-3">
							<div className="flex-1">
								<label className="block text-xs text-brand-black/60 mb-1">
									Search (submission, payroll name, date)
								</label>
								<input
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search…"
									className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 text-brand-black placeholder:text-brand-black/40 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
								/>
							</div>
							<div className="w-full md:w-64">
								<label className="block text-xs text-brand-black/60 mb-1">
									Form Path
								</label>
								<select
									value={selectedFormPath}
									onChange={(e) => setSelectedFormPath(e.target.value)}
									className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
								>
									<option value="all">All</option>
									{formPathOptions.map((p) => (
										<option key={p} value={p}>
											{p}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="text-xs text-brand-black/50">
							Showing <span className="font-semibold text-brand-black/70">{filteredSubmissions.length}</span>{" "}
							of <span className="font-semibold text-brand-black/70">{submissionsList.length}</span>
						</div>

						<div className="space-y-3">
						{filteredSubmissions.map((submission, index) => {
							const isOpen = openId === submission.id;

							const stepsGrid = buildStepsGrid(submission);
							const allFields = stepsGrid.flatMap((s) => s.fields);
							const answeredCount = allFields.filter((f) => f.answer.trim()).length;
							const totalCount = allFields.length;
							const payrollName = getPayrollName(submission);
							const displayLabel = `Submission ${index + 1} (${payrollName} • ${formatDate(
								submission.created_at,
							)})`;

							return (
								<div
									key={submission.id}
									className="bg-white border border-brand-black/10 rounded-2xl overflow-hidden"
								>
									<button
										type="button"
										onClick={() => setOpenId(isOpen ? null : submission.id)}
										className="w-full text-left px-5 py-4 hover:bg-brand-cream/40 transition-colors flex items-start justify-between gap-4"
									>
										<div className="min-w-0">
											<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
												<h3 className="font-semibold text-brand-black truncate">
													Submission {index + 1}
												</h3>
												<span className="text-xs text-brand-black/50">
													{answeredCount}/{totalCount} answered
												</span>
											</div>

											<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-black/60">
												<span className="font-medium text-brand-black/70">
													{payrollName}
												</span>
												<Calendar className="w-4 h-4" />
												<span>{formatDate(submission.created_at)}</span>
												<span className="text-brand-black/40">•</span>
												<span className="text-brand-black/50">{submission.form_url_path}</span>
											</div>
										</div>

										<div className="flex items-center gap-2 shrink-0">
											<button
												type="button"
												onClick={(e) => {
													e.stopPropagation();
													void handleDelete(submission, displayLabel);
												}}
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
												title="Delete submission"
												aria-label="Delete submission"
											>
												<Trash2 className="w-5 h-5" />
											</button>
											<div className="p-2 text-brand-black/60">
												{isOpen ? (
													<ChevronUp className="w-5 h-5" />
												) : (
													<ChevronDown className="w-5 h-5" />
												)}
											</div>
										</div>
									</button>

									{isOpen && (
										<div className="px-5 pb-5">
											{stepsGrid.length === 0 ? (
												<div className="text-brand-black/50 text-small">
													No fields captured for this submission.
												</div>
											) : (
												<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
													{stepsGrid.map((step) => (
														<div
															key={step.stepIndex}
															className="border border-brand-black/10 rounded-xl bg-brand-cream/20 p-4"
														>
															<div className="flex items-baseline justify-between gap-3 mb-3">
																<h4 className="font-semibold text-brand-teal truncate">
																	{step.stepTitle}
																</h4>
																<span className="text-xs text-brand-black/50 shrink-0">
																	{step.stepIndex + 1}
																</span>
															</div>

															<div className="space-y-3">
																{(step.fields || []).length === 0 ? (
																	<div className="text-brand-black/50 text-small">
																		No fields in this step.
																	</div>
																) : (
																	step.fields.map((field) => (
																		<div key={`${step.stepIndex}-${field.heading}`} className="space-y-1">
																			<div className="text-xs text-brand-black/60">
																				{field.heading}
																			</div>
																			<div className="text-sm text-brand-black font-medium leading-snug break-words">
																				{field.answer.trim() ? field.answer : <span className="text-brand-black/40 italic">—</span>}
																			</div>
																		</div>
																	))
																)}
															</div>
														</div>
													))}
												</div>
											)}
										</div>
									)}
								</div>
							);
						})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

