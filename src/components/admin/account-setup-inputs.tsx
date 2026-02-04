"use client";

/* ************************************************************
                        NOTES
************************************************************ */
// Admin inputs for Account Setup Form
// Allows managing form steps with image upload, URL path, and dynamic step configuration
// Each step has flexible content items (title, paragraph, subtitle, question, helper-text, input-field)
// Steps can be reordered and content items can be added via dropdown
// Final step includes checkbox and scrollable terms container

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useState, useEffect } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import {
	accountSetupFormFallbackData,
	AccountSetupFormProps,
	AccountSetupStep,
	StepContentItem,
	StepContentType,
	AccountSetupFormContent,
} from "@/app/account-setup/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import AdminFormSection from "./AdminFormSection";
import { Copy, Trash2, Plus, ChevronUp, ChevronDown, GripVertical } from "lucide-react";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface StepHeaderProps {
	step: AccountSetupStep;
	stepIndex: number;
	totalSteps: number;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onDuplicate: () => void;
	onRemove: () => void;
	onTitleChange: (title: string) => void;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const StepHeader = ({
	step,
	stepIndex,
	totalSteps,
	onMoveUp,
	onMoveDown,
	onDuplicate,
	onRemove,
	onTitleChange,
}: StepHeaderProps) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [tempTitle, setTempTitle] = useState(step.stepTitle || "");

	return (
		<div className="w-full flex items-center justify-between px-6 py-4 hover:bg-brand-yellow/20 transition-colors">
			<div className="flex items-center gap-3 flex-1">
				{/* Reorder Buttons */}
				<div className="flex gap-1">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onMoveUp();
						}}
						disabled={stepIndex === 0}
						className="flex items-center justify-center w-8 h-8 bg-brand-yellow text-brand-black rounded hover:bg-brand-yellow/80 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
						title="Move step up"
					>
						<ChevronUp className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onMoveDown();
						}}
						disabled={stepIndex >= totalSteps - 1}
						className="flex items-center justify-center w-8 h-8 bg-brand-yellow text-brand-black rounded hover:bg-brand-yellow/80 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
						title="Move step down"
					>
						<ChevronDown className="w-4 h-4" />
					</button>
				</div>

				{/* Step Number and Title */}
				<div className="flex items-center gap-2 flex-1">
					<span className="text-xl text-brand-black font-bold">Step {stepIndex + 1}:</span>
					{isEditingTitle ? (
						<input
							type="text"
							value={tempTitle}
							onChange={(e) => setTempTitle(e.target.value)}
							onBlur={() => {
								onTitleChange(tempTitle);
								setIsEditingTitle(false);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									onTitleChange(tempTitle);
									setIsEditingTitle(false);
								}
								if (e.key === "Escape") {
									setTempTitle(step.stepTitle || "");
									setIsEditingTitle(false);
								}
							}}
							className="flex-1 px-2 py-1 bg-white text-brand-black rounded border border-brand-teal focus:border-brand-teal focus:outline-none text-lg font-bold"
							autoFocus
						/>
					) : (
						<h2
							onClick={() => {
								setTempTitle(step.stepTitle || "");
								setIsEditingTitle(true);
							}}
							className="text-xl text-brand-black font-bold cursor-pointer hover:text-brand-teal transition-colors flex-1"
							title="Click to edit title"
						>
							{step.stepTitle || "Click to add title"}
						</h2>
					)}
				</div>
			</div>

			{/* Expand/Collapse and Actions */}
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onDuplicate();
					}}
					className="flex items-center gap-1 px-2 py-1 bg-brand-yellow text-brand-black rounded hover:bg-brand-yellow/80 transition-colors text-xs font-medium"
					title="Duplicate step"
				>
					<Copy className="w-3 h-3" />
				</button>
				{totalSteps > 1 && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onRemove();
						}}
						className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-medium"
						title="Remove step"
					>
						<Trash2 className="w-3 h-3" />
					</button>
				)}
			</div>
		</div>
	);
};

export default function AccountSetupAdminInputs(props: AccountSetupFormProps) {
	/* ************************************************************
                            HOOKS
    ************************************************************ */
	const fallbackContent = accountSetupFormFallbackData.content;
	const [formImage, setFormImage] = useState(
		props.content.image || "/placeholder.jpg",
	);
	const [urlPath, setUrlPath] = useState(
		props.content.urlPath || "/account-setup",
	);
	const [steps, setSteps] = useState<AccountSetupStep[]>(
		props.content.steps || fallbackContent.steps,
	);

	const { isSaving, updatePage } = useUpdatePage<AccountSetupFormContent>("account-setup");

	// Sync state when props change
	useEffect(() => {
		setFormImage(props.content.image || "/placeholder.jpg");
		setUrlPath(props.content.urlPath || "/account-setup");
		setSteps(props.content.steps || fallbackContent.steps);
	}, [props.content]);

	/* ************************************************************
                            FUNCTIONS
    ************************************************************ */
	const handleSave = async () => {
		await updatePage({
			title: props.title,
			description: props.description,
			slug: props.slug,
			content: {
				image: formImage,
				urlPath: urlPath,
				steps: steps,
			} as AccountSetupFormContent,
		});
	};

	const handleMoveStepUp = (stepIndex: number) => {
		if (stepIndex === 0) return;
		setSteps((prev) => {
			const updated = [...prev];
			[updated[stepIndex - 1], updated[stepIndex]] = [updated[stepIndex], updated[stepIndex - 1]];
			return updated;
		});
	};

	const handleMoveStepDown = (stepIndex: number) => {
		if (stepIndex >= steps.length - 1) return;
		setSteps((prev) => {
			const updated = [...prev];
			[updated[stepIndex], updated[stepIndex + 1]] = [updated[stepIndex + 1], updated[stepIndex]];
			return updated;
		});
	};

	const handleAddStep = () => {
		const newStep: AccountSetupStep = {
			id: `step-${Date.now()}`,
			stepTitle: "",
			content: [],
			isFinalStep: false,
			termsContent: "",
		};
		setSteps((prev) => [...prev, newStep]);
	};

	const handleDuplicateStep = (stepIndex: number) => {
		const stepToDuplicate = steps[stepIndex];
		const duplicatedStep: AccountSetupStep = {
			...stepToDuplicate,
			id: `step-${Date.now()}`,
			content: stepToDuplicate.content.map((item) => ({
				...item,
				id: `content-${Date.now()}-${Math.random()}`,
			})),
		};
		setSteps((prev) => {
			const updated = [...prev];
			updated.splice(stepIndex + 1, 0, duplicatedStep);
			return updated;
		});
	};

	const handleRemoveStep = (stepIndex: number) => {
		if (steps.length > 1) {
			setSteps((prev) => prev.filter((_, index) => index !== stepIndex));
		}
	};

	const handleAddContentItem = (stepIndex: number, type: StepContentType) => {
		setSteps((prev) => {
			const updated = [...prev];
			let newItem: StepContentItem;

			switch (type) {
				case "title":
				case "paragraph":
				case "subtitle":
				case "question":
				case "helper-text":
					newItem = {
						id: `content-${Date.now()}-${Math.random()}`,
						type,
						content: "",
					} as StepContentItem;
					break;
				case "input-field":
					newItem = {
						id: `content-${Date.now()}-${Math.random()}`,
						type: "input-field",
						heading: "",
						placeholder: "",
						required: false,
						helperText: "",
						dotPoints: [],
					};
					break;
			}

			updated[stepIndex] = {
				...updated[stepIndex],
				content: [...updated[stepIndex].content, newItem],
			};
			return updated;
		});
	};

	const handleContentItemChange = (
		stepIndex: number,
		contentIndex: number,
		updates: Partial<StepContentItem>,
	) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			content[contentIndex] = {
				...content[contentIndex],
				...updates,
			} as StepContentItem;
			updated[stepIndex] = {
				...updated[stepIndex],
				content: content,
			};
			return updated;
		});
	};

	const handleRemoveContentItem = (stepIndex: number, contentIndex: number) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = updated[stepIndex].content.filter(
				(_, index) => index !== contentIndex,
			);
			updated[stepIndex] = {
				...updated[stepIndex],
				content: content,
			};
			return updated;
		});
	};

	const handleMoveContentItemUp = (stepIndex: number, contentIndex: number) => {
		if (contentIndex === 0) return;
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			[content[contentIndex - 1], content[contentIndex]] = [content[contentIndex], content[contentIndex - 1]];
			updated[stepIndex] = {
				...updated[stepIndex],
				content: content,
			};
			return updated;
		});
	};

	const handleMoveContentItemDown = (stepIndex: number, contentIndex: number) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			if (contentIndex >= content.length - 1) return prev;
			[content[contentIndex], content[contentIndex + 1]] = [content[contentIndex + 1], content[contentIndex]];
			updated[stepIndex] = {
				...updated[stepIndex],
				content: content,
			};
			return updated;
		});
	};

	const handleAddDotPoint = (stepIndex: number, contentIndex: number) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			const item = content[contentIndex];
			if (item.type === "input-field") {
				content[contentIndex] = {
					...item,
					dotPoints: [...(item.dotPoints || []), ""],
				};
				updated[stepIndex] = {
					...updated[stepIndex],
					content: content,
				};
			}
			return updated;
		});
	};

	const handleDotPointChange = (
		stepIndex: number,
		contentIndex: number,
		dotPointIndex: number,
		value: string,
	) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			const item = content[contentIndex];
			if (item.type === "input-field") {
				const dotPoints = [...(item.dotPoints || [])];
				dotPoints[dotPointIndex] = value;
				content[contentIndex] = {
					...item,
					dotPoints: dotPoints,
				};
				updated[stepIndex] = {
					...updated[stepIndex],
					content: content,
				};
			}
			return updated;
		});
	};

	const handleRemoveDotPoint = (stepIndex: number, contentIndex: number, dotPointIndex: number) => {
		setSteps((prev) => {
			const updated = [...prev];
			const content = [...updated[stepIndex].content];
			const item = content[contentIndex];
			if (item.type === "input-field") {
				const dotPoints = (item.dotPoints || []).filter((_, index) => index !== dotPointIndex);
				content[contentIndex] = {
					...item,
					dotPoints: dotPoints,
				};
				updated[stepIndex] = {
					...updated[stepIndex],
					content: content,
				};
			}
			return updated;
		});
	};

	/* ************************************************************
                            RENDER
    ************************************************************ */
	return (
		<div>
			<SaveBanner
				pageTitle="Account Setup Form"
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					{/* ***************************************************************
					   FORM SETTINGS
					****************************************************************/}
					<AdminFormSection title="Form Settings">
						<div className="space-y-6">
							{/* Image Upload */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Form Image
								</label>
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={formImage}
										alt="Account Setup Form Image"
										width={1920}
										height={1080}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={setFormImage}
										usage="account-setup-form"
									/>
								</div>
							</div>

							{/* URL Path */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									URL Path
								</label>
								<EditableElement
									as="input"
									className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
									defaultValue={urlPath}
									onTextChange={setUrlPath}
								/>
								<p className="text-xs text-brand-black/60 mt-1">
									The URL path where this form will be accessible
								</p>
							</div>
						</div>
					</AdminFormSection>

					{/* ***************************************************************
					   FORM STEPS
					****************************************************************/}
					<div className="space-y-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl text-brand-black font-bold">Form Steps</h2>
							<button
								type="button"
								onClick={handleAddStep}
								className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/80 transition-colors text-sm font-medium"
							>
								<Plus className="w-4 h-4" />
								Add Step
							</button>
						</div>

						{steps.map((step, stepIndex) => {
							return (
								<section
									key={step.id}
									className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl mb-8 overflow-hidden"
								>
									{/* Step Header with Controls */}
									<StepHeader
										step={step}
										stepIndex={stepIndex}
										totalSteps={steps.length}
										onMoveUp={() => handleMoveStepUp(stepIndex)}
										onMoveDown={() => handleMoveStepDown(stepIndex)}
										onDuplicate={() => handleDuplicateStep(stepIndex)}
										onRemove={() => handleRemoveStep(stepIndex)}
										onTitleChange={(title) => {
											setSteps((prev) => {
												const updated = [...prev];
												updated[stepIndex] = {
													...updated[stepIndex],
													stepTitle: title,
												};
												return updated;
											});
										}}
									/>
									
									{/* Step Content */}
									<AdminFormSection title="" className="border-0 bg-transparent mb-0">
									<div className="space-y-6">

										{/* Add Content Dropdown */}
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Add Content
											</label>
											<select
												onChange={(e) => {
													if (e.target.value) {
														handleAddContentItem(stepIndex, e.target.value as StepContentType);
														e.target.value = "";
													}
												}}
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
											>
												<option value="">Select content type to add...</option>
												<option value="title">Title</option>
												<option value="subtitle">Sub Title</option>
												<option value="paragraph">Paragraph</option>
												<option value="question">Question</option>
												<option value="helper-text">Helper Text</option>
												<option value="input-field">Input Field</option>
											</select>
										</div>

										{/* Content Items */}
										<div className="space-y-4">
											{step.content.map((item, contentIndex) => (
												<div
													key={item.id}
													className="bg-brand-black/5 p-4 rounded-lg border border-brand-black/10"
												>
													<div className="flex justify-between items-center mb-3">
														<div className="flex items-center gap-2">
															<GripVertical className="w-4 h-4 text-brand-black/40" />
															<span className="text-xs font-semibold text-brand-black/70 uppercase">
																{item.type.replace("-", " ")}
															</span>
														</div>
														<div className="flex gap-1">
															<button
																type="button"
																onClick={() => handleMoveContentItemUp(stepIndex, contentIndex)}
																disabled={contentIndex === 0}
																className="p-1 text-brand-black/60 hover:text-brand-black disabled:opacity-30 disabled:cursor-not-allowed"
																title="Move up"
															>
																<ChevronUp className="w-3 h-3" />
															</button>
															<button
																type="button"
																onClick={() => handleMoveContentItemDown(stepIndex, contentIndex)}
																disabled={contentIndex >= step.content.length - 1}
																className="p-1 text-brand-black/60 hover:text-brand-black disabled:opacity-30 disabled:cursor-not-allowed"
																title="Move down"
															>
																<ChevronDown className="w-3 h-3" />
															</button>
															<button
																type="button"
																onClick={() => handleRemoveContentItem(stepIndex, contentIndex)}
																className="p-1 text-red-600 hover:text-red-700"
																title="Remove"
															>
																<Trash2 className="w-3 h-3" />
															</button>
														</div>
													</div>

													{/* Render content based on type */}
													{item.type === "title" ||
													item.type === "paragraph" ||
													item.type === "subtitle" ||
													item.type === "question" ||
													item.type === "helper-text" ? (
														<div>
															<label className="block text-brand-black text-xs font-medium mb-1">
																Content
															</label>
															<EditableElement
																as={item.type === "paragraph" ? "textarea" : "input"}
																className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
																defaultValue={"content" in item ? item.content : ""}
																onTextChange={(value) =>
																	handleContentItemChange(stepIndex, contentIndex, {
																		content: value,
																	})
																}
															/>
															{item.type === "paragraph" && (
																<p className="text-xs text-brand-black/60 mt-1">
																	Line breaks will be preserved
																</p>
															)}
														</div>
													) : item.type === "input-field" ? (
														<div className="space-y-3">
															<div>
																<label className="block text-brand-black text-xs font-medium mb-1">
																	Heading
																</label>
																<EditableElement
																	as="input"
																	className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
																	defaultValue={item.heading}
																	onTextChange={(value) =>
																		handleContentItemChange(stepIndex, contentIndex, {
																			heading: value,
																		})
																	}
																/>
															</div>
															<div>
																<label className="block text-brand-black text-xs font-medium mb-1">
																	Placeholder (Optional)
																</label>
																<EditableElement
																	as="input"
																	className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
																	defaultValue={item.placeholder || ""}
																	onTextChange={(value) =>
																		handleContentItemChange(stepIndex, contentIndex, {
																			placeholder: value,
																		})
																	}
																/>
															</div>
															<div>
																<label className="block text-brand-black text-xs font-medium mb-1">
																	Helper Text (Optional)
																</label>
																<EditableElement
																	as="textarea"
																	className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm min-h-[60px]"
																	defaultValue={item.helperText || ""}
																	onTextChange={(value) =>
																		handleContentItemChange(stepIndex, contentIndex, {
																			helperText: value,
																		})
																	}
																/>
															</div>
															<div>
																<div className="flex justify-between items-center mb-2">
																	<label className="block text-brand-black text-xs font-medium">
																		Dot Points (Optional)
																	</label>
																	<button
																		type="button"
																		onClick={() => handleAddDotPoint(stepIndex, contentIndex)}
																		className="flex items-center gap-1 px-2 py-1 bg-brand-teal text-white rounded hover:bg-brand-teal/80 transition-colors text-xs"
																	>
																		<Plus className="w-3 h-3" />
																		Add Dot Point
																	</button>
																</div>
																<div className="space-y-2">
																	{(item.dotPoints || []).map((dotPoint, dotPointIndex) => (
																		<div key={dotPointIndex} className="flex gap-2">
																			<EditableElement
																				as="input"
																				className="flex-1 p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
																				defaultValue={dotPoint}
																				onTextChange={(value) =>
																					handleDotPointChange(stepIndex, contentIndex, dotPointIndex, value)
																				}
																			/>
																			<button
																				type="button"
																				onClick={() => handleRemoveDotPoint(stepIndex, contentIndex, dotPointIndex)}
																				className="px-2 py-1 text-red-600 hover:text-red-700 text-xs"
																			>
																				Remove
																			</button>
																		</div>
																	))}
																</div>
															</div>
															<div>
																<label className="flex items-center gap-2 text-brand-black text-xs">
																	<input
																		type="checkbox"
																		checked={item.required || false}
																		onChange={(e) =>
																			handleContentItemChange(stepIndex, contentIndex, {
																				required: e.target.checked,
																			})
																		}
																		className="w-4 h-4 rounded border-brand-black/20 focus:ring-brand-teal focus:ring-2"
																	/>
																	<span>Required Field</span>
																</label>
															</div>
														</div>
													) : null}
												</div>
											))}
										</div>

										{/* Final Step Options */}
										<div className="pt-4 border-t border-brand-black/10">
											<label className="flex items-center gap-2 text-brand-black text-sm font-medium mb-3">
												<input
													type="checkbox"
													checked={step.isFinalStep || false}
													onChange={(e) => {
														setSteps((prev) => {
															const updated = [...prev];
															updated[stepIndex] = {
																...updated[stepIndex],
																isFinalStep: e.target.checked,
															};
															return updated;
														});
													}}
													className="w-4 h-4 rounded border-brand-black/20 focus:ring-brand-teal focus:ring-2"
												/>
												<span>This is the final step (includes Terms & Conditions)</span>
											</label>

											{step.isFinalStep && (
												<div className="mt-4">
													<label className="block text-brand-black text-sm font-medium mb-2">
														Terms & Conditions Content
													</label>
													<div className="bg-white border border-brand-black/20 rounded-lg p-4 max-h-64 overflow-y-auto">
														<EditableElement
															as="textarea"
															className="w-full p-2 bg-transparent text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm min-h-[200px]"
															defaultValue={step.termsContent || ""}
															onTextChange={(value) =>
																setSteps((prev) => {
																	const updated = [...prev];
																	updated[stepIndex] = {
																		...updated[stepIndex],
																		termsContent: value,
																	};
																	return updated;
																})
															}
														/>
													</div>
													<p className="text-xs text-brand-black/60 mt-1">
														This content will appear in a scrollable container with a checkbox
													</p>
												</div>
											)}
										</div>
									</div>
								</AdminFormSection>
								</section>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
