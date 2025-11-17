"use client";

/* ************************************************************
						NOTES
************************************************************ */
// Admin inputs for About page
// Mirrors public layout sections for hero, narrative, differentiators, proof, closing, and video
// Ensures every icon, image, and text element remains fully editable

/* ************************************************************
						IMPORTS
************************************************************ */
import { useState } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import {
	aboutUsPageFallbackData,
	AboutDifferentiator,
	AboutNarrativeBlock,
	AboutStat,
	AboutUsPageContent,
	AboutUsPageProps,
} from "@/app/about-us/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

/* ************************************************************
						COMPONENTS
************************************************************ */
export default function AboutUsAdminInputs(props: AboutUsPageProps) {
	/* ************************************************************
							HOOKS
	************************************************************ */
	const fallbackContent = aboutUsPageFallbackData.content;
	const [hero, setHero] = useState(props.content.hero ?? fallbackContent.hero);
	const [introduction, setIntroduction] = useState(
		props.content.introduction ?? fallbackContent.introduction,
	);
	const [differentiators, setDifferentiators] = useState(
		props.content.differentiators ?? fallbackContent.differentiators,
	);
	const [proof, setProof] = useState(props.content.proof ?? fallbackContent.proof);
	const [closing, setClosing] = useState(props.content.closing ?? fallbackContent.closing);
	const [values, setValues] = useState(props.content.values ?? fallbackContent.values);
	const [section7, setSection7] = useState(
		props.content.section7 ?? fallbackContent.section7,
	);

	const { isSaving, updatePage } = useUpdatePage<AboutUsPageContent>("about-us");

	/* ************************************************************
							FUNCTIONS
	************************************************************ */
	const handleNarrativeChange = (
		index: number,
		key: keyof AboutNarrativeBlock,
		value: string,
	) => {
		setIntroduction((prev) => {
			const nextBlocks = [...(prev?.blocks || [])];
			nextBlocks[index] = { ...nextBlocks[index], [key]: value };
			return { ...prev, blocks: nextBlocks };
		});
	};

	const handleDifferentiatorChange = (
		index: number,
		key: keyof AboutDifferentiator,
		value: string,
	) => {
		setDifferentiators((prev) => {
			const nextItems = [...(prev?.items || [])];
			nextItems[index] = { ...nextItems[index], [key]: value };
			return { ...prev, items: nextItems };
		});
	};

	const handleStatChange = (index: number, key: keyof AboutStat, value: string) => {
		setProof((prev) => {
			const nextStats = [...(prev?.stats || [])];
			nextStats[index] = { ...nextStats[index], [key]: value };
			return { ...prev, stats: nextStats };
		});
	};

	const handleValuesChange = (
		index: number,
		key: keyof AboutNarrativeBlock,
		value: string,
	) => {
		setValues((prev) => {
			const nextBlocks = [...(prev?.blocks || [])];
			nextBlocks[index] = { ...nextBlocks[index], [key]: value };
			return { ...prev, blocks: nextBlocks };
		});
	};

	const handleSave = async () => {
		await updatePage({
			...props,
			content: {
				hero,
				introduction,
				differentiators,
				proof,
				closing,
				values,
				section7,
				youtubeVideoId: props.content.youtubeVideoId || "",
			},
		});
	};

	/* ************************************************************
							RENDER
	************************************************************ */
	return (
		<div>
			<SaveBanner pageTitle="About Page" onSave={handleSave} isSaving={isSaving} />
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					{/* ***************************************************************
					   HERO SECTION
					****************************************************************/}
					<section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">Hero Section</h2>
						<div className="grid md:grid-cols-2 gap-6 mb-6">
							{/* ************************** Text Content **************************/}
							<div className="space-y-4">
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Eyebrow
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.eyebrow}
										onTextChange={(value) => setHero((prev) => ({ ...prev, eyebrow: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Title
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.title}
										onTextChange={(value) => setHero((prev) => ({ ...prev, title: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Description
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.description}
										onTextChange={(value) => setHero((prev) => ({ ...prev, description: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										CTA Label
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.ctaLabel}
										onTextChange={(value) => setHero((prev) => ({ ...prev, ctaLabel: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										CTA Link
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.ctaLink}
										onTextChange={(value) => setHero((prev) => ({ ...prev, ctaLink: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Image Alt Text
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={hero.imageAlt}
										onTextChange={(value) => setHero((prev) => ({ ...prev, imageAlt: value }))}
									/>
								</div>
							</div>

							{/* ************************** Hero Image **************************/}
							<div className="space-y-3">
								<label className="block text-brand-black text-sm font-medium mb-2">
									Hero Image
								</label>
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={hero.image}
										alt={hero.imageAlt || "Hero imagery"}
										width={1600}
										height={1200}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={(value) => setHero((prev) => ({ ...prev, image: value }))}
										usage="about-hero-image"
									/>
								</div>
								<p className="text-gray-400 text-xs">
									Click image to choose from library. Recommended 1600x1200px.
								</p>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 2: INTRODUCTION / NARRATIVE BLOCKS
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 2 - Introduction / Narrative Blocks
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Eyebrow
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={introduction.eyebrow}
									onTextChange={(value) => setIntroduction((prev) => ({ ...prev, eyebrow: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={introduction.title}
									onTextChange={(value) => setIntroduction((prev) => ({ ...prev, title: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Description
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={introduction.description}
									onTextChange={(value) =>
										setIntroduction((prev) => ({ ...prev, description: value }))
									}
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							{(introduction.blocks || []).map((block, index) => (
								<div
									key={block.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<h3 className="text-white font-medium mb-3">Block {index + 1}</h3>
									<div className="space-y-3">
										<div>
											<label className="block text-white text-xs mb-1">Title</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={block.title}
												onTextChange={(value) => handleNarrativeChange(index, "title", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Description</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={block.description}
												onTextChange={(value) => handleNarrativeChange(index, "description", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Block Image</label>
											<div className="bg-gray-800 rounded-lg overflow-hidden w-32 h-32 flex items-center justify-center">
												<EditableImage
													src={block.image}
													alt={block.title}
													width={128}
													height={128}
													className="w-full h-full object-contain hover:opacity-90 transition-opacity p-2"
													onImageChange={(value) => handleNarrativeChange(index, "image", value)}
													usage={`about-intro-block-${index + 1}`}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ***************************************************************
						SECTION 3: DIFFERENTIATORS
					****************************************************************/}
					<section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 3 - Differentiators
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Eyebrow
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={differentiators.eyebrow}
									onTextChange={(value) =>
										setDifferentiators((prev) => ({ ...prev, eyebrow: value }))
									}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={differentiators.title}
									onTextChange={(value) =>
										setDifferentiators((prev) => ({ ...prev, title: value }))
									}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Description
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={differentiators.description}
									onTextChange={(value) =>
										setDifferentiators((prev) => ({ ...prev, description: value }))
									}
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							{(differentiators.items || []).map((item, index) => (
								<div
									key={item.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<h3 className="text-white font-medium mb-3">Item {index + 1}</h3>
									<div className="space-y-3">
										<div>
											<label className="block text-white text-xs mb-1">Title</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={item.title}
												onTextChange={(value) => handleDifferentiatorChange(index, "title", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Description</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={item.description}
												onTextChange={(value) => handleDifferentiatorChange(index, "description", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Icon</label>
											<div className="bg-gray-800 rounded-lg overflow-hidden w-32 h-32 flex items-center justify-center">
												<EditableImage
													src={item.icon}
													alt={item.title}
													width={128}
													height={128}
													className="w-full h-full object-contain hover:opacity-90 transition-opacity p-2"
													onImageChange={(value) => handleDifferentiatorChange(index, "icon", value)}
													usage={`about-differentiator-${index + 1}`}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ***************************************************************
						SECTION 4: PROOF / STATS
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 4 - Proof & Stats
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Eyebrow
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={proof.eyebrow}
									onTextChange={(value) => setProof((prev) => ({ ...prev, eyebrow: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={proof.title}
									onTextChange={(value) => setProof((prev) => ({ ...prev, title: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Description
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={proof.description}
									onTextChange={(value) => setProof((prev) => ({ ...prev, description: value }))}
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							{(proof.stats || []).map((stat, index) => (
								<div
									key={stat.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<h3 className="text-white font-medium mb-3">Stat {index + 1}</h3>
									<div className="space-y-3">
										<div>
											<label className="block text-white text-xs mb-1">Value</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={stat.value}
												onTextChange={(value) => handleStatChange(index, "value", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Label</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={stat.label}
												onTextChange={(value) => handleStatChange(index, "label", value)}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ***************************************************************
						SECTION 5: CLOSING STATEMENT
					****************************************************************/}
					<section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 5 - Closing Statement
						</h2>
						<div className="grid md:grid-cols-2 gap-6 mb-6">
							{/* ************************** Text Content **************************/}
							<div className="space-y-4">
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Title
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={closing.title}
										onTextChange={(value) => setClosing((prev) => ({ ...prev, title: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Description
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={closing.description}
										onTextChange={(value) => setClosing((prev) => ({ ...prev, description: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Emphasis
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={closing.emphasis}
										onTextChange={(value) => setClosing((prev) => ({ ...prev, emphasis: value }))}
									/>
								</div>
							</div>

							{/* ************************** Closing Image **************************/}
							<div className="space-y-3">
								<label className="block text-brand-black text-sm font-medium mb-2">
									Image
								</label>
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={closing.image}
										alt={closing.title}
										width={1200}
										height={900}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={(value) => setClosing((prev) => ({ ...prev, image: value }))}
										usage="about-closing-image"
									/>
								</div>
								<p className="text-gray-400 text-xs">
									Click image to choose from library. Recommended 1200x900px.
								</p>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 6: BRIGHT VALUES
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 6 - Bright Values
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={values.title}
									onTextChange={(value) => setValues((prev) => ({ ...prev, title: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Description
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={values.description}
									onTextChange={(value) => setValues((prev) => ({ ...prev, description: value }))}
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							{(values.blocks || []).map((block, index) => (
								<div
									key={block.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<h3 className="text-white font-medium mb-3">Value {index + 1}</h3>
									<div className="space-y-3">
										<div>
											<label className="block text-white text-xs mb-1">Title</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={block.title}
												onTextChange={(value) => handleValuesChange(index, "title", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Description</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												defaultValue={block.description}
												onTextChange={(value) => handleValuesChange(index, "description", value)}
											/>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Icon</label>
											<div className="bg-gray-800 rounded-lg overflow-hidden w-32 h-32 flex items-center justify-center">
												<EditableImage
													src={block.image}
													alt={block.title}
													width={128}
													height={128}
													className="w-full h-full object-contain hover:opacity-90 transition-opacity p-2"
													onImageChange={(value) => handleValuesChange(index, "image", value)}
													usage={`about-value-${index + 1}`}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ***************************************************************
						SECTION 7: CTA WITH IMAGE
					****************************************************************/}
					<section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 7 - CTA with Image
						</h2>
						<div className="grid md:grid-cols-2 gap-6 mb-6">
							{/* ************************** Text Content **************************/}
							<div className="space-y-4">
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Title
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section7.title}
										onTextChange={(value) => setSection7((prev) => ({ ...prev, title: value }))}
									/>
									<div className="mt-2">
										<label className="flex items-center text-brand-black text-sm">
											<input
												type="checkbox"
												checked={section7.titleBold}
												onChange={(e) =>
													setSection7((prev) => ({ ...prev, titleBold: e.target.checked }))
												}
												className="mr-2"
											/>
											Bold
										</label>
									</div>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Description
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section7.description}
										onTextChange={(value) =>
											setSection7((prev) => ({ ...prev, description: value }))
										}
									/>
									<div className="mt-2">
										<label className="flex items-center text-brand-black text-sm">
											<input
												type="checkbox"
												checked={section7.descriptionBold}
												onChange={(e) =>
													setSection7((prev) => ({ ...prev, descriptionBold: e.target.checked }))
												}
												className="mr-2"
											/>
											Bold
										</label>
									</div>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Button Text
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section7.buttonText}
										onTextChange={(value) =>
											setSection7((prev) => ({ ...prev, buttonText: value }))
										}
									/>
								</div>
							</div>

							{/* ************************** Section 7 Image **************************/}
							<div className="space-y-3">
								<label className="block text-brand-black text-sm font-medium mb-2">
									Image
								</label>
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={section7.image}
										alt="Section 7 promotional image"
										width={1200}
										height={900}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={(value) => setSection7((prev) => ({ ...prev, image: value }))}
										usage="about-section7-image"
									/>
								</div>
								<p className="text-gray-400 text-xs">
									Click image to choose from library. Recommended 1200x900px.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

/* ************************************************************
						EXPORTS
************************************************************ */
