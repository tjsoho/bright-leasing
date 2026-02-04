"use client";

/* ************************************************************
                        NOTES
************************************************************ */
// Account Setup Form component
// Displays one step at a time with navigation buttons
// Includes slide animations and terms & conditions on final step
/* ************************************************************
                        IMPORTS
************************************************************ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AccountSetupFormContent, StepContentItem } from "@/app/account-setup/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { createAccountSetupSubmission } from "@/server-actions/account-setup-submissions";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AccountSetupFormProps {
	content: AccountSetupFormContent;
	formUrlPath: string;
}

type SubmitStatus = "idle" | "success" | "error";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function AccountSetupForm({ content, formUrlPath }: AccountSetupFormProps) {
	/* ************************************************************
                            HOOKS
    ************************************************************ */
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [showTermsTooltip, setShowTermsTooltip] = useState(false);
	const [formAnswers, setFormAnswers] = useState<Record<string, Record<string, string>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

	const currentStep = content.steps[currentStepIndex];
	const isFirstStep = currentStepIndex === 0;
	const isLastStep = currentStepIndex === content.steps.length - 1;
	const isFinalStep = currentStep?.isFinalStep || false;

	/* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
	const [direction, setDirection] = useState(0);

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	/* ************************************************************
                            FUNCTIONS
    ************************************************************ */
	const handleStepChange = (newIndex: number) => {
		if (newIndex < 0 || newIndex >= content.steps.length) return;
		
		const newDirection = newIndex > currentStepIndex ? 1 : -1;
		setDirection(newDirection);
		setCurrentStepIndex(newIndex);
		
		// Scroll to top when step changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
		
		// Reset terms acceptance when leaving final step
		if (newIndex !== content.steps.length - 1) {
			setTermsAccepted(false);
		}
	};

	const handleInputChange = (stepIndex: number, fieldName: string, value: string) => {
		setFormAnswers((prev) => ({
			...prev,
			[stepIndex]: {
				...prev[stepIndex],
				[fieldName]: value,
			},
		}));
	};

	const getFirstAnswerByIncludes = (needle: string) => {
		const lowerNeedle = needle.toLowerCase();
		for (const step of Object.values(formAnswers)) {
			for (const [key, value] of Object.entries(step)) {
				if (key.toLowerCase().includes(lowerNeedle) && value?.trim()) {
					return value.trim();
				}
			}
		}
		return "";
	};

	const buildWeb3FormsMessage = (formData: { stepIndex: number; stepTitle?: string; answers: Record<string, string> }[]) => {
		const lines: string[] = [];
		lines.push(`FORM TYPE: ACCOUNT SET UP`);
		lines.push(`URL PATH: ${formUrlPath}`);
		lines.push("");

		for (const step of formData) {
			const title = step.stepTitle?.trim() || `Step ${step.stepIndex + 1}`;
			lines.push(`${title}`);
			lines.push("-".repeat(Math.max(8, title.length)));

			const entries = Object.entries(step.answers || {});
			if (entries.length === 0) {
				lines.push("(No answers provided)");
			} else {
				for (const [field, value] of entries) {
					lines.push(`${field}: ${value?.trim() ? value.trim() : "(blank)"}`);
				}
			}

			lines.push("");
		}

		return lines.join("\n");
	};

	const handleComplete = async () => {
		if (isFinalStep && termsAccepted) {
			setIsSubmitting(true);
			setSubmitStatus("idle");
			try {
				// Prepare form data for submission
				const formData = content.steps.map((step, stepIndex) => ({
					stepIndex,
					stepTitle: step.stepTitle,
					answers: formAnswers[stepIndex] || {},
				}));

				// 1) Save to DB
				await createAccountSetupSubmission(formUrlPath, formData);

				// 2) Send to admins via Web3Forms (same pattern as Contact form)
				const accessKey = "bbb2d5f5-41cd-4761-b498-17dccd6985ac";
				const guessedName = getFirstAnswerByIncludes("name");
				const guessedEmail = getFirstAnswerByIncludes("email");
				const guessedPhone = getFirstAnswerByIncludes("phone") || getFirstAnswerByIncludes("mobile");

				const response = await fetch("https://api.web3forms.com/submit", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_key: accessKey,
						from_name: "Bright Leasing Account Setup Form",
						subject: `ACCOUNT SET UP FORM SUBMISSION (${formUrlPath})`,
						name: guessedName || "Account Setup Submission",
						email: guessedEmail || undefined,
						phone: guessedPhone || undefined,
						reply_to: guessedEmail || undefined,
						formType: "account_setup",
						formUrlPath,
						message: buildWeb3FormsMessage(formData),
					}),
				});

				const result = await response.json();
				if (!result?.success) {
					throw new Error("Saved, but failed to send email notification to admins.");
				}

				setSubmitStatus("success");
				window.scrollTo({ top: 0, behavior: "smooth" });
				toast.success("Submitted successfully!");
			} catch (error) {
				console.error("Error submitting form:", error);
				const errorMessage = error instanceof Error 
					? error.message 
					: "Failed to submit form. Please try again.";
				toast.error(errorMessage);
				setSubmitStatus("error");
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	/* ************************************************************
                            RENDER
    ************************************************************ */
	if (submitStatus === "success") {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
					<div className="bg-brand-cream/30 border border-brand-black/10 rounded-2xl p-8 md:p-12 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
							Thank you!
						</h2>
						<p className="text-brand-black/70 leading-relaxed">
							Your account set up form has been submitted successfully. Our team has received your details and will be in touch if anything is needed.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
				<AnimatePresence mode="wait" custom={direction}>
					<motion.div
						key={currentStepIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						className="w-full"
					>
						<div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
							{/* Step Content Items */}
							{currentStep.content.map((item, itemIndex) => {
								const contentItem = item as StepContentItem;
								
								if (contentItem.type === "title") {
									return (
										<h2
											key={contentItem.id || itemIndex}
											className="text-3xl font-bold text-brand-teal md:col-span-2"
										>
											<RenderLineBreaks text={"content" in contentItem ? contentItem.content : ""} />
										</h2>
									);
								}
								
								if (contentItem.type === "subtitle") {
									return (
										<h3
											key={contentItem.id || itemIndex}
											className="text-2xl font-semibold text-brand-teal md:col-span-2"
										>
											<RenderLineBreaks text={"content" in contentItem ? contentItem.content : ""} />
										</h3>
									);
								}
								
								if (contentItem.type === "paragraph") {
									return (
										<p
											key={contentItem.id || itemIndex}
											className="text-brand-black/80 whitespace-pre-line leading-relaxed md:col-span-2"
										>
											<RenderLineBreaks text={"content" in contentItem ? contentItem.content : ""} />
										</p>
									);
								}
								
								if (contentItem.type === "question") {
									return (
										<h4
											key={contentItem.id || itemIndex}
											className="text-xl font-semibold text-brand-teal md:col-span-2"
										>
											<RenderLineBreaks text={"content" in contentItem ? contentItem.content : ""} />
										</h4>
									);
								}
								
								if (contentItem.type === "helper-text") {
									return (
										<p
											key={contentItem.id || itemIndex}
											className="text-sm text-brand-black/60 italic md:col-span-2"
										>
											<RenderLineBreaks text={"content" in contentItem ? contentItem.content : ""} />
										</p>
									);
								}
								
								if (contentItem.type === "input-field") {
									const headingLower = contentItem.heading.toLowerCase();
									const isNameOrPosition = headingLower.includes("name") || headingLower.includes("position");
									const isMobileOrPhone = headingLower.includes("mobile") || headingLower.includes("phone");
									const fieldName = contentItem.heading.replace(/[:]/g, "").trim();
									const fieldValue = formAnswers[currentStepIndex]?.[fieldName] || "";
									
									return (
										<div 
											key={contentItem.id || itemIndex} 
											className={cn(
												"space-y-2",
												{
													"md:col-span-1": isNameOrPosition || isMobileOrPhone,
													"md:col-span-2": !isNameOrPosition && !isMobileOrPhone,
												}
											)}
										>
											<label className="block text-brand-black font-medium">
												{contentItem.heading}
											</label>
											<input
												type="text"
												placeholder={contentItem.placeholder || ""}
												required={contentItem.required}
												value={fieldValue}
												onChange={(e) => handleInputChange(currentStepIndex, fieldName, e.target.value)}
												className="w-full py-2 px-3 border border-brand-black/20 rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
											/>
											{contentItem.helperText && (
												<p className="text-xs text-brand-black/60">
													<RenderLineBreaks text={contentItem.helperText} />
												</p>
											)}
											{contentItem.dotPoints && contentItem.dotPoints.length > 0 && (
												<ul className="list-disc list-inside text-sm text-brand-black/70 space-y-1 ml-4">
													{contentItem.dotPoints.map((point, pointIndex) => (
														<li key={pointIndex}>
															<RenderLineBreaks text={point} />
														</li>
													))}
												</ul>
											)}
										</div>
									);
								}
								
								return null;
							})}

							{/* Terms & Conditions - Only on final step */}
							{isFinalStep && currentStep.termsContent && (
								<div className="space-y-4 md:col-span-2">
									<h4 className="text-xl font-semibold text-brand-teal">Terms & Conditions</h4>
									<div className="h-64 overflow-y-auto border border-brand-black/20 rounded-lg p-4 bg-brand-cream/30 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
										<div className="text-sm text-brand-black/70 whitespace-pre-line pr-4">
											<RenderLineBreaks text={currentStep.termsContent} />
										</div>
									</div>
									<label className="flex items-center gap-3 cursor-pointer">
										<input
											type="checkbox"
											checked={termsAccepted}
											onChange={(e) => setTermsAccepted(e.target.checked)}
											className="w-5 h-5 rounded border-brand-black/20 focus:ring-brand-teal focus:ring-2 text-brand-teal"
										/>
										<span className="text-brand-black font-medium">
											I agree to the Terms & Conditions
										</span>
									</label>
								</div>
							)}
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Navigation Buttons */}
				<div className="mt-12 pt-8 border-t border-brand-black/10">
					{/* Mobile step indicator row */}
					<div className="w-full text-center text-brand-black/60 text-sm mb-4 md:hidden">
						Step {currentStepIndex + 1} of {content.steps.length}
					</div>

					<div className="flex justify-between items-center">
						<button
							type="button"
							onClick={() => handleStepChange(currentStepIndex - 1)}
							disabled={isFirstStep}
							className="flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-black rounded-full font-semibold hover:bg-brand-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronLeft className="w-5 h-5" />
							Previous
						</button>

						{/* Desktop step indicator inline */}
						<span className="hidden md:block text-brand-black/60 text-sm">
							Step {currentStepIndex + 1} of {content.steps.length}
						</span>

						{isLastStep ? (
							<div 
								className="relative"
								onMouseEnter={() => !termsAccepted && setShowTermsTooltip(true)}
								onMouseLeave={() => setShowTermsTooltip(false)}
							>
								<button
									type="button"
									onClick={handleComplete}
									disabled={!termsAccepted || isSubmitting}
									className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
								>
									{isSubmitting ? "Submitting..." : "Complete"}
									<ChevronRight className="w-5 h-5" />
								</button>
								{showTermsTooltip && !termsAccepted && (
									<div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-brand-black text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg">
										Please tick Terms and Conditions checkbox
										<div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-brand-black"></div>
									</div>
								)}
							</div>
						) : (
							<button
								type="button"
								onClick={() => handleStepChange(currentStepIndex + 1)}
								className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal/80 transition-colors"
							>
								Next
								<ChevronRight className="w-5 h-5" />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

