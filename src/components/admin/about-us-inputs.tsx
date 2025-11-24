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
import { useState, useEffect } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import {
	aboutUsPageFallbackData,
	AboutDifferentiator,
	AboutNarrativeBlock,
	AboutStat,
	AboutClosingTile,
	AboutUsPageContent,
	AboutUsPageProps,
} from "@/app/about-us/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import AdminFormSection from "./AdminFormSection";

/* ************************************************************
						COMPONENTS
************************************************************ */
export default function AboutUsAdminInputs(props: AboutUsPageProps) {
	/* ************************************************************
							HOOKS
	************************************************************ */
	const fallbackContent = aboutUsPageFallbackData.content;
	// Admin Section Titles
	const [adminSection1Title, setAdminSection1Title] = useState(
		props.content.adminSection1Title ?? "Hero Section",
	);
	const [adminSection2Title, setAdminSection2Title] = useState(
		props.content.adminSection2Title ?? "Section 6 - Bright Values",
	);
	const [adminSection3Title, setAdminSection3Title] = useState(
		props.content.adminSection3Title ?? "Section 3 - Differentiators",
	);
	const [adminSection4Title, setAdminSection4Title] = useState(
		props.content.adminSection4Title ?? "Section 4 - Proof & Stats",
	);
	const [adminSection4aTitle, setAdminSection4aTitle] = useState(
		props.content.adminSection4aTitle ?? "Section 4a - Love Every Step",
	);
	const [adminSection5Title, setAdminSection5Title] = useState(
		props.content.adminSection5Title ?? "Section 5 - Testimonials",
	);
	const [hero, setHero] = useState(props.content.hero ?? fallbackContent.hero);
	const [values, setValues] = useState(props.content.values ?? fallbackContent.values);
	const [differentiators, setDifferentiators] = useState(
		props.content.differentiators ?? fallbackContent.differentiators,
	);
	const [proof, setProof] = useState(props.content.proof ?? fallbackContent.proof);
	const [section4a, setSection4a] = useState(
		props.content.section4a ?? fallbackContent.section4a,
	);
	const [closing, setClosing] = useState(props.content.closing ?? fallbackContent.closing);

	const { isSaving, updatePage } = useUpdatePage<AboutUsPageContent>("about-us");

	// Sync admin section titles when props change (after save/reload)
	useEffect(() => {
		setAdminSection1Title(props.content.adminSection1Title ?? "Hero Section");
		setAdminSection2Title(props.content.adminSection2Title ?? "Section 6 - Bright Values");
		setAdminSection3Title(props.content.adminSection3Title ?? "Section 3 - Differentiators");
		setAdminSection4Title(props.content.adminSection4Title ?? "Section 4 - Proof & Stats");
		setAdminSection4aTitle(props.content.adminSection4aTitle ?? "Section 4a - Love Every Step");
		setAdminSection5Title(props.content.adminSection5Title ?? "Section 5 - Testimonials");
	}, [props.content.adminSection1Title, props.content.adminSection2Title, props.content.adminSection3Title, props.content.adminSection4Title, props.content.adminSection4aTitle, props.content.adminSection5Title]);

	/* ************************************************************
							FUNCTIONS
	************************************************************ */

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

	const handleAddDifferentiator = () => {
		setDifferentiators((prev) => {
			const currentItems = prev?.items || [];
			const newItem: AboutDifferentiator = {
				id: `differentiator-${Date.now()}`,
				title: "New Item",
				description: "Add description here",
				icon: "/placeholder.jpg",
				bgColor: "white",
			};
			return { ...prev, items: [...currentItems, newItem] };
		});
	};

	const handleRemoveDifferentiator = (index: number) => {
		setDifferentiators((prev) => {
			const nextItems = [...(prev?.items || [])];
			nextItems.splice(index, 1);
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

	const handleAddStat = () => {
		setProof((prev) => {
			const currentStats = prev?.stats || [];
			const newStat: AboutStat = {
				id: `stat-${Date.now()}`,
				value: "New Value",
				label: "New Label",
				bgColor: "white",
			};
			return { ...prev, stats: [...currentStats, newStat] };
		});
	};

	const handleRemoveStat = (index: number) => {
		setProof((prev) => {
			const nextStats = [...(prev?.stats || [])];
			nextStats.splice(index, 1);
			return { ...prev, stats: nextStats };
		});
	};

	const handleClosingTileChange = (
		index: number,
		key: keyof AboutClosingTile,
		value: string | boolean,
	) => {
		setClosing((prev) => {
			const nextTiles = [...(prev?.tiles || [])];
			nextTiles[index] = { ...nextTiles[index], [key]: value };
			return { ...prev, tiles: nextTiles };
		});
	};

	const handleAddClosingTile = () => {
		setClosing((prev) => {
			const currentTiles = prev?.tiles || [];
			const newTile: AboutClosingTile = {
				title: "",
				titleBold: false,
				description: "",
				descriptionBold: false,
				image: "/placeholder.jpg",
				bgColor: "white",
			};
			return { ...prev, tiles: [...currentTiles, newTile] };
		});
	};

	const handleRemoveClosingTile = (index: number) => {
		setClosing((prev) => {
			const nextTiles = [...(prev?.tiles || [])];
			nextTiles.splice(index, 1);
			return { ...prev, tiles: nextTiles };
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
				...props.content,
				adminSection1Title,
				adminSection2Title,
				adminSection3Title,
				adminSection4Title,
				adminSection4aTitle,
				adminSection5Title,
				hero,
				values,
				differentiators,
				proof,
				section4a,
				closing,
			} as AboutUsPageContent,
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
					<AdminFormSection title={adminSection1Title}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection1Title}
								defaultValue={adminSection1Title}
							/>
						</div>
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
					</AdminFormSection>

					{/* ***************************************************************
						SECTION 6: BRIGHT VALUES
					****************************************************************/}
					<AdminFormSection title={adminSection2Title}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection2Title}
								defaultValue={adminSection2Title}
							/>
						</div>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="textarea"
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
											<div className="bg-gray-400 rounded-lg p-1 inline-block">
												<EditableImage
													src={block.image}
													alt={block.title}
													width={64}
													height={64}
													className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
													onImageChange={(value) => handleValuesChange(index, "image", value)}
													usage={`about-value-${index + 1}`}
												/>
											</div>
										</div>
										<div>
											<label className="block text-white text-xs mb-1">Background Color</label>
											<select
												value={block.bgColor || "white"}
												onChange={(e) => handleValuesChange(index, "bgColor", e.target.value)}
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
											>
												<option value="white">White</option>
												<option value="yellow">Yellow</option>
												<option value="teal">Teal</option>
												<option value="grey">Grey</option>
											</select>
										</div>
									</div>
								</div>
							))}
						</div>
					</AdminFormSection>

					{/* ***************************************************************
						SECTION 3: DIFFERENTIATORS
					****************************************************************/}
					<AdminFormSection title={adminSection3Title}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection3Title}
								defaultValue={adminSection3Title}
							/>
						</div>
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
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-brand-black font-medium">
									Items ({(differentiators.items || []).length})
								</h3>
								<button
									type="button"
									onClick={handleAddDifferentiator}
									className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors text-sm font-medium"
								>
									+ Add Item
								</button>
							</div>
							{(differentiators.items || []).map((item, index) => (
								<div
									key={item.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<div className="flex justify-between items-center mb-3">
										<h3 className="text-white font-medium">Item {index + 1}</h3>
										{(differentiators.items || []).length > 1 && (
											<button
												type="button"
												onClick={() => handleRemoveDifferentiator(index)}
												className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
											>
												Remove
											</button>
										)}
									</div>
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
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-white text-xs mb-1">Icon</label>
												<div className="bg-gray-400 rounded-lg p-1 inline-block">
													<EditableImage
														src={item.icon}
														alt={item.title}
														width={64}
														height={64}
														className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
														onImageChange={(value) => handleDifferentiatorChange(index, "icon", value)}
														usage={`about-differentiator-${index + 1}`}
													/>
												</div>
											</div>
											<div>
												<label className="block text-white text-xs mb-1">Background Color</label>
												<select
													value={item.bgColor || "white"}
													onChange={(e) => handleDifferentiatorChange(index, "bgColor", e.target.value)}
													className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												>
													<option value="white">White</option>
													<option value="yellow">Yellow</option>
													<option value="teal">Teal</option>
													<option value="grey">Grey</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</AdminFormSection>

					{/* ***************************************************************
						SECTION 4: PROOF / STATS
					****************************************************************/}
					<AdminFormSection title={adminSection4Title}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection4Title}
								defaultValue={adminSection4Title}
							/>
						</div>
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
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-brand-black font-medium">
									Stats ({(proof.stats || []).length})
								</h3>
								<button
									type="button"
									onClick={handleAddStat}
									className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors text-sm font-medium"
								>
									+ Add Stat
								</button>
							</div>
							{(proof.stats || []).map((stat, index) => (
								<div
									key={stat.id}
									className="bg-brand-black p-3 rounded-lg border border-gray-700"
								>
									<div className="flex justify-between items-center mb-3">
										<h3 className="text-white font-medium">Stat {index + 1}</h3>
										{(proof.stats || []).length > 1 && (
											<button
												type="button"
												onClick={() => handleRemoveStat(index)}
												className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
											>
												Remove
											</button>
										)}
									</div>
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
										<div>
											<label className="block text-white text-xs mb-1">Background Color</label>
											<select
												value={stat.bgColor || "white"}
												onChange={(e) => handleStatChange(index, "bgColor", e.target.value)}
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
											>
												<option value="white">White</option>
												<option value="yellow">Yellow</option>
												<option value="teal">Teal</option>
												<option value="grey">Grey</option>
											</select>
										</div>
									</div>
								</div>
							))}
						</div>
					</AdminFormSection>

					{/* ***************************************************************
						SECTION 4A: LOVE EVERY STEP
					****************************************************************/}
					<AdminFormSection title={adminSection4aTitle}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection4aTitle}
								defaultValue={adminSection4aTitle}
							/>
						</div>
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
										defaultValue={section4a.title}
										onTextChange={(value) => setSection4a((prev) => ({ ...prev, title: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Description
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section4a.description}
										onTextChange={(value) => setSection4a((prev) => ({ ...prev, description: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										CTA Label
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section4a.ctaLabel}
										onTextChange={(value) => setSection4a((prev) => ({ ...prev, ctaLabel: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										CTA Link
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section4a.ctaLink}
										onTextChange={(value) => setSection4a((prev) => ({ ...prev, ctaLink: value }))}
									/>
								</div>
								<div>
									<label className="block text-brand-black text-sm font-medium mb-2">
										Image Alt Text
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={section4a.imageAlt}
										onTextChange={(value) => setSection4a((prev) => ({ ...prev, imageAlt: value }))}
									/>
								</div>
							</div>

							{/* ************************** Section 4a Image **************************/}
							<div className="space-y-3">
								<label className="block text-brand-black text-sm font-medium mb-2">
									Image
								</label>
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={section4a.image}
										alt={section4a.imageAlt || "Section 4a imagery"}
										width={1600}
										height={1200}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={(value) => setSection4a((prev) => ({ ...prev, image: value }))}
										usage="about-section4a-image"
									/>
								</div>
								<p className="text-gray-400 text-xs">
									Click image to choose from library. Recommended 1600x1200px.
								</p>
							</div>
						</div>
					</AdminFormSection>

					{/* ***************************************************************
						SECTION 5: CLOSING STATEMENT
					****************************************************************/}
					<AdminFormSection title={adminSection5Title}>
						<div className="mb-6 pb-6 border-b border-brand-yellow/30">
							<label className="block text-brand-black text-sm font-medium mb-2">
								Section Title
							</label>
							<EditableElement
								as="textarea"
								className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
								onTextChange={setAdminSection5Title}
								defaultValue={adminSection5Title}
							/>
						</div>
						<div className="space-y-4">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={closing.title}
									onTextChange={(value) => setClosing((prev) => ({ ...prev, title: value }))}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={closing.paragraph}
									onTextChange={(value) => setClosing((prev) => ({ ...prev, paragraph: value }))}
								/>
							</div>
						</div>
						<div className="mt-4 space-y-4">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-brand-black font-medium">
									Tiles ({(closing.tiles || []).length})
								</h3>
								<button
									type="button"
									onClick={handleAddClosingTile}
									className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors text-sm font-medium"
								>
									+ Add Tile
								</button>
							</div>
							<p className="text-gray-600 text-sm mb-4">
								Note: The 2nd tile (index 1) will display as a tall image card in the middle. Colors are automatically assigned: Tile 1 = Yellow, Tiles 2-4 = Teal, Tile 5 = Grey.
							</p>
							{(closing.tiles || []).length === 0 ? (
								<p className="text-gray-500 text-sm italic">No tiles added yet. Click &quot;+ Add Tile&quot; to add tiles.</p>
							) : (
								(closing.tiles || []).map((tile, index) => (
									<div
										key={index}
										className="bg-brand-black p-3 rounded-lg border border-gray-700"
									>
										<div className="flex justify-between items-center mb-3">
											<h3 className="text-white font-medium">
												Tile {index + 1} {index === 1 && "(Tall Image Card)"}
											</h3>
											{(closing.tiles || []).length > 1 && (
												<button
													type="button"
													onClick={() => handleRemoveClosingTile(index)}
													className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
												>
													Remove
												</button>
											)}
										</div>
										<div className="space-y-3">
											<div>
												<label className="block text-white text-xs mb-1">Title</label>
												<EditableElement
													as="input"
													className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
													defaultValue={tile.title}
													onTextChange={(value) => handleClosingTileChange(index, "title", value)}
												/>
											</div>
											<div>
												<label className="block text-white text-xs mb-1">Description</label>
												<EditableElement
													as="textarea"
													className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
													defaultValue={tile.description}
													onTextChange={(value) => handleClosingTileChange(index, "description", value)}
												/>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-white text-xs mb-1">Image</label>
													<div className="bg-gray-400 rounded-lg p-1 inline-block">
														<EditableImage
															src={tile.image || "/placeholder.jpg"}
															alt={tile.title || `Tile ${index + 1}`}
															width={64}
															height={64}
															className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
															onImageChange={(value) => handleClosingTileChange(index, "image", value)}
															usage={`about-closing-tile-${index + 1}`}
														/>
													</div>
												</div>
												<div>
													<label className="block text-white text-xs mb-1">Title Bold</label>
													<input
														type="checkbox"
														checked={tile.titleBold || false}
														onChange={(e) => handleClosingTileChange(index, "titleBold", e.target.checked)}
														className="w-4 h-4 text-brand-teal bg-gray-700 border-gray-600 rounded focus:ring-brand-teal"
													/>
												</div>
												<div>
													<label className="block text-white text-xs mb-1">Description Bold</label>
													<input
														type="checkbox"
														checked={tile.descriptionBold || false}
														onChange={(e) => handleClosingTileChange(index, "descriptionBold", e.target.checked)}
														className="w-4 h-4 text-brand-teal bg-gray-700 border-gray-600 rounded focus:ring-brand-teal"
													/>
												</div>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</AdminFormSection>
				</div>
			</div>
		</div>
	);
}

/* ************************************************************
						EXPORTS
************************************************************ */
