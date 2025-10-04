"use client";
import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { HomePageContent, HomePageProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function HomeAdminInputs(props: HomePageProps) {
	const [heroImage, setHeroImage] = useState(
		props.content.heroImage || "/placeholder.jpg",
	);
	const [heroTitle, setHeroTitle] = useState(props.content.heroTitle);
	const [heroParagraph, setHeroParagraph] = useState(
		props.content.heroParagraph,
	);
	const [section2title, setSection2title] = useState(
		props.content.section2title,
	);
	const [section2paragraph, setSection2paragraph] = useState(
		props.content.section2paragraph,
	);
	const [section3title, setSection3title] = useState(
		props.content.section3title,
	);
	const [section3tile1title, setSection3tile1title] = useState(
		props.content.section3tile1title,
	);
	const [section3tile1description, setSection3tile1description] = useState(
		props.content.section3tile1description,
	);
	const [section3tile2title, setSection3tile2title] = useState(
		props.content.section3tile2title,
	);
	const [section3tile2description, setSection3tile2description] = useState(
		props.content.section3tile2description,
	);
	const [section3tile3title, setSection3tile3title] = useState(
		props.content.section3tile3title,
	);
	const [section3tile3description, setSection3tile3description] = useState(
		props.content.section3tile3description,
	);
	const [section4title, setSection4title] = useState(
		props.content.section4title,
	);
	const [section4step1title, setSection4step1title] = useState(
		props.content.section4step1title,
	);
	const [section4step1description, setSection4step1description] = useState(
		props.content.section4step1description,
	);
	const [section4step1icon, setSection4step1icon] = useState(
		props.content.section4step1icon || "/placeholder.jpg",
	);
	const [section4step2title, setSection4step2title] = useState(
		props.content.section4step2title,
	);
	const [section4step2description, setSection4step2description] = useState(
		props.content.section4step2description,
	);
	const [section4step2icon, setSection4step2icon] = useState(
		props.content.section4step2icon || "/placeholder.jpg",
	);
	const [section4step3title, setSection4step3title] = useState(
		props.content.section4step3title,
	);
	const [section4step3description, setSection4step3description] = useState(
		props.content.section4step3description,
	);
	const [section4step3icon, setSection4step3icon] = useState(
		props.content.section4step3icon || "/placeholder.jpg",
	);
	const [section4step4title, setSection4step4title] = useState(
		props.content.section4step4title,
	);
	const [section4step4description, setSection4step4description] = useState(
		props.content.section4step4description,
	);
	const [section4step4icon, setSection4step4icon] = useState(
		props.content.section4step4icon || "/placeholder.jpg",
	);
	const [section5title, setSection5title] = useState(
		props.content.section5title,
	);
	const [section5description, setSection5description] = useState(
		props.content.section5description,
	);
	const [section5buttonText, setSection5buttonText] = useState(
		props.content.section5buttonText,
	);
	const [section5image, setSection5image] = useState(
		props.content.section5image || "/placeholder.jpg",
	);
	const [section6title, setSection6title] = useState(
		props.content.section6title,
	);
	const [section6tile1title, setSection6tile1title] = useState(
		props.content.section6tile1title,
	);
	const [section6tile1description, setSection6tile1description] = useState(
		props.content.section6tile1description,
	);
	const [section6tile2title, setSection6tile2title] = useState(
		props.content.section6tile2title,
	);
	const [section6tile2description, setSection6tile2description] = useState(
		props.content.section6tile2description,
	);
	const [section6tile3title, setSection6tile3title] = useState(
		props.content.section6tile3title,
	);
	const [section6tile3description, setSection6tile3description] = useState(
		props.content.section6tile3description,
	);
	const [section7title, setSection7title] = useState(
		props.content.section7title,
	);
	const [section7faq1question, setSection7faq1question] = useState(
		props.content.section7faq1question,
	);
	const [section7faq1answer, setSection7faq1answer] = useState(
		props.content.section7faq1answer,
	);
	const [section7faq2question, setSection7faq2question] = useState(
		props.content.section7faq2question,
	);
	const [section7faq2answer, setSection7faq2answer] = useState(
		props.content.section7faq2answer,
	);
	const [section7faq3question, setSection7faq3question] = useState(
		props.content.section7faq3question,
	);
	const [section7faq3answer, setSection7faq3answer] = useState(
		props.content.section7faq3answer,
	);
	const [section7faq4question, setSection7faq4question] = useState(
		props.content.section7faq4question,
	);
	const [section7faq4answer, setSection7faq4answer] = useState(
		props.content.section7faq4answer,
	);

	const { isSaving, updatePage } = useUpdatePage<HomePageContent>("home");

	const handleSave = async () => {
		await updatePage({
			...props,
			content: {
				...props.content,
				heroImage,
				heroTitle,
				heroParagraph,
				section2title,
				section2paragraph,
				section3title,
				section3tile1title,
				section3tile1description,
				section3tile2title,
				section3tile2description,
				section3tile3title,
				section3tile3description,
				section4title,
				section4step1title,
				section4step1description,
				section4step1icon,
				section4step2title,
				section4step2description,
				section4step2icon,
				section4step3title,
				section4step3description,
				section4step3icon,
				section4step4title,
				section4step4description,
				section4step4icon,
				section5title,
				section5description,
				section5buttonText,
				section5image,
				section6title,
				section6tile1title,
				section6tile1description,
				section6tile2title,
				section6tile2description,
				section6tile3title,
				section6tile3description,
				section7title,
				section7faq1question,
				section7faq1answer,
				section7faq2question,
				section7faq2answer,
				section7faq3question,
				section7faq3answer,
				section7faq4question,
				section7faq4answer,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Home Page"
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-black">
				<div className="max-w-6xl mx-auto px-8 py-16">
					{/* ************************** Header Section **************************/}

					<header className="mb-16">
						<h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
							Home
						</h1>
					</header>

					{/* ***************************************************************
					   HERO SECTION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Hero Section</h2>

						{/* Background Images */}
						<div className="grid md:grid-cols-2 gap-8 mb-8">
							{/* Desktop Background */}
							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Desktop Hero Image
								</label>
								<div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={heroImage}
										alt="Hero Desktop Background"
										width={1920}
										height={1080}
										className="w-full h-full object-cover hover:opacity-90 transition-opacity"
										onImageChange={setHeroImage}
										usage="desktop"
									/>
								</div>
								<p className="text-gray-400 text-xs">
									Click image to change. Recommended size: 1920x1080px
								</p>
							</div>

							{/* ************************** Text Content **************************/}

							<div className="space-y-6">
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Hero Title
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										onTextChange={setHeroTitle}
										defaultValue={heroTitle}
									/>
								</div>

								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Hero Paragraph
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										onTextChange={setHeroParagraph}
										defaultValue={heroParagraph}
									/>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 2: WHAT IS NOVATED LEASING
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 2 - What is Novated Leasing
						</h2>

						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection2title}
									defaultValue={section2title}
								/>
								<p className="text-gray-400 text-xs mt-1">
									This appears as the small uppercase title above the main
									paragraph
								</p>
							</div>

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Main Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
									onTextChange={setSection2paragraph}
									defaultValue={section2paragraph}
								/>
								<p className="text-gray-400 text-xs mt-1">
									This appears as the large paragraph text explaining novated
									leasing
								</p>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 3: WHY CHOOSE BRIGHT LEASING TILES
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 3 - Why Choose Bright Leasing
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection3title}
									defaultValue={section3title}
								/>
								<p className="text-gray-400 text-xs mt-1">
									The main title that appears on the left side
								</p>
							</div>

							{/* Tiles */}
							<div className="space-y-6">
								{/* Tile 1 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection3tile1title}
												defaultValue={section3tile1title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection3tile1description}
												defaultValue={section3tile1description}
											/>
										</div>
									</div>
								</div>

								{/* Tile 2 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection3tile2title}
												defaultValue={section3tile2title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection3tile2description}
												defaultValue={section3tile2description}
											/>
										</div>
									</div>
								</div>

								{/* Tile 3 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection3tile3title}
												defaultValue={section3tile3title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection3tile3description}
												defaultValue={section3tile3description}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 4: HOW IT WORKS
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 4 - How It Works
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection4title}
									defaultValue={section4title}
								/>
								<p className="text-gray-400 text-xs mt-1">
									The main title for the How It Works section
								</p>
							</div>

							{/* Steps */}
							<div className="space-y-6">
								{/* Step 1 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Step 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection4step1title}
												defaultValue={section4step1title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection4step1description}
												defaultValue={section4step1description}
											/>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-gray-300 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step1icon}
											alt="Step 1 Icon"
											width={64}
											height={64}
											onImageChange={setSection4step1icon}
											className="w-16 h-16 rounded-lg object-cover"
										/>
									</div>
								</div>

								{/* Step 2 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Step 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection4step2title}
												defaultValue={section4step2title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection4step2description}
												defaultValue={section4step2description}
											/>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-gray-300 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step2icon}
											alt="Step 2 Icon"
											width={64}
											height={64}
											onImageChange={setSection4step2icon}
											className="w-16 h-16 rounded-lg object-cover"
										/>
									</div>
								</div>

								{/* Step 3 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Step 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection4step3title}
												defaultValue={section4step3title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection4step3description}
												defaultValue={section4step3description}
											/>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-gray-300 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step3icon}
											alt="Step 3 Icon"
											width={64}
											height={64}
											onImageChange={setSection4step3icon}
											className="w-16 h-16 rounded-lg object-cover"
										/>
									</div>
								</div>

								{/* Step 4 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Step 4</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection4step4title}
												defaultValue={section4step4title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection4step4description}
												defaultValue={section4step4description}
											/>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-gray-300 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step4icon}
											alt="Step 4 Icon"
											width={64}
											height={64}
											onImageChange={setSection4step4icon}
											className="w-16 h-16 rounded-lg object-cover"
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 5: PROMOTIONAL BANNER
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 5 - Promotional Banner
						</h2>

						<div className="space-y-6">
							{/* Background Images */}
							<div className="grid md:grid-cols-2 gap-8 mb-8">
								{/* Promotional Image */}
								<div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Promotional Image
									</label>
									<div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
										<EditableImage
											src={section5image}
											alt="Section 5 Promotional Image"
											width={1920}
											height={1080}
											className="w-full h-full object-cover hover:opacity-90 transition-opacity"
											onImageChange={setSection5image}
											usage="section5"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change. Recommended size: 1920x1080px
									</p>
								</div>

								{/* ************************** Text Content **************************/}

								<div className="space-y-6">
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Title
										</label>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={setSection5title}
											defaultValue={section5title}
										/>
									</div>

									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Description
										</label>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
											onTextChange={setSection5description}
											defaultValue={section5description}
										/>
									</div>

									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Button Text
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={setSection5buttonText}
											defaultValue={section5buttonText}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 6: CUSTOMER SUCCESS STORIES
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 6 - Customer Success Stories
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection6title}
									defaultValue={section6title}
								/>
								<p className="text-gray-400 text-xs mt-1">
									The main title that appears on the left side
								</p>
							</div>

							{/* Tiles */}
							<div className="space-y-6">
								{/* Tile 1 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection6tile1title}
												defaultValue={section6tile1title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection6tile1description}
												defaultValue={section6tile1description}
											/>
										</div>
									</div>
								</div>

								{/* Tile 2 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection6tile2title}
												defaultValue={section6tile2title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection6tile2description}
												defaultValue={section6tile2description}
											/>
										</div>
									</div>
								</div>

								{/* Tile 3 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection6tile3title}
												defaultValue={section6tile3title}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-16"
												onTextChange={setSection6tile3description}
												defaultValue={section6tile3description}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 7: FAQ ACCORDION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">
							Section 7 - FAQ Accordion
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection7title}
									defaultValue={section7title}
								/>
								<p className="text-gray-400 text-xs mt-1">
									The main title for the FAQ section
								</p>
							</div>

							{/* FAQ Items */}
							<div className="space-y-6">
								{/* FAQ 1 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">FAQ 1</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection7faq1question}
												defaultValue={section7faq1question}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq1answer}
												defaultValue={section7faq1answer}
											/>
										</div>
									</div>
								</div>

								{/* FAQ 2 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">FAQ 2</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection7faq2question}
												defaultValue={section7faq2question}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq2answer}
												defaultValue={section7faq2answer}
											/>
										</div>
									</div>
								</div>

								{/* FAQ 3 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">FAQ 3</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection7faq3question}
												defaultValue={section7faq3question}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq3answer}
												defaultValue={section7faq3answer}
											/>
										</div>
									</div>
								</div>

								{/* FAQ 4 */}
								<div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">FAQ 4</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm"
												onTextChange={setSection7faq4question}
												defaultValue={section7faq4question}
											/>
										</div>
										<div>
											<label className="block text-gray-300 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq4answer}
												defaultValue={section7faq4answer}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 1: FEATURES
					****************************************************************/}
					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Section 1</h2>
						<div className="space-y-6">
							

							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{[1, 2, 3, 4].map((num, index) => (
									<div key={num} className="space-y-4">
										<label className="block text-white text-sm font-medium mb-2">
											Feature {num}
										</label>
										<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
											<EditableImage
												src={
													section1Images[
														`icon${num}` as keyof typeof section1Images
													]
												}
												alt={`Feature ${num} Icon`}
												width={100}
												height={100}
												className="w-full h-full object-contain p-4"
												onImageChange={(url) => {
													setSection1Images((prev) => ({
														...prev,
														[`icon${num}` as keyof typeof section1Images]: url,
													}));
												}}
												usage={`feature-${num}`}
											/>
										</div>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={
												[
													setSection1tile1,
													setSection1tile2,
													setSection1tile3,
													setSection1tile4,
												][index]
											}
											defaultValue={
												[
													section1tile1,
													section1tile2,
													section1tile3,
													section1tile4,
												][index]
											}
										/>
									</div>
								))}
							</div>

							

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Summary
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection1paragraph}
									defaultValue={section1paragraph}
								/>
							</div>
						</div>
					</section> */}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section2title}
									onTextChange={setSection2title}
								/>
							</div>

							

							<div className="grid md:grid-cols-2 gap-8">
								

								<div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Desktop Image
									</label>
									<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
										<EditableImage
											src={section2ImageDesktop}
											alt="Section 2 Desktop Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection2ImageDesktop}
											usage="section2-desktop"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change. Recommended size: 1000x1000px
									</p>
								</div>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 3: TRUSTED BY THOUSANDS
					****************************************************************/}
					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section3title}
									onTextChange={setSection3title}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section3paragraph}
									onTextChange={setSection3paragraph}
								/>
							</div> */}

					{/* ************************** Profile Images **************************/}

					{/* <div>
								<label className="block text-white text-sm font-medium mb-2">
									Profile Images
								</label>
								<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
									{[1, 2, 3, 4, 5, 6].map((index) => (
										<div key={index} className="space-y-2">
											<div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
												<EditableImage
													src={
														section3Images[
															`profile${index}` as keyof typeof section3Images
														]
													}
													alt={`Profile ${index}`}
													width={180}
													height={320}
													className="w-full h-full object-cover"
													onImageChange={(url) => {
														setSection3Images((prev) => ({
															...prev,
															[`profile${index}`]: url,
														}));
													}}
													usage={`profile-${index}`}
												/>
											</div>
											<p className="text-gray-400 text-xs text-center">
												Profile {index}
											</p>
										</div>
									))}
								</div>
								<p className="text-gray-400 text-xs mt-2">
									Click images to change. Recommended size: 180x320px
								</p>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 4: DYNAMIC IMAGES
					****************************************************************/}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-8 h-full w-full">
							 */}

					{/* ************************** Desktop Image **************************/}

					{/* <div className="space-y-4 flex flex-col justify-start items-start h-full w-full">
									<label className="block text-white text-sm font-medium mb-2">
										Mobile Image
									</label>
									<div className=" bg-gray-800  overflow-hidden">
										<EditableImage
											src={section4ImageDesktop}
											alt="Section 4 Desktop Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection4ImageDesktop}
											usage="section4-desktop"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change.{" "}
									</p>
								</div>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 5: HOW WE AGE
					****************************************************************/}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section5title}
									onTextChange={setSection5title}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									First Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section5paragraph1}
									onTextChange={setSection5paragraph1}
								/>
							</div> */}

					{/****************************  Section 5 Features *************************/}
					{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{[...Array(8)].map((_, index) => (
									<div key={index} className="space-y-4">
										<label className="block text-white text-sm font-medium mb-2">
											Feature {index + 1}
										</label>
										<div className="flex space-x-2">
											<div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
												<EditableImage
													src={section5Features.icons[index]}
													alt={`Feature ${index + 1} icon`}
													width={48}
													height={48}
													className="w-full h-full object-contain"
													onImageChange={(url) => {
														const newIcons = [...section5Features.icons];
														newIcons[index] = url;
														setSection5Features((prev) => ({
															...prev,
															icons: newIcons,
														}));
													}}
													usage={`feature-icon-${index + 1}`}
												/>
											</div>
											<EditableElement
												as="input"
												className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												defaultValue={section5Features.texts[index]}
												onTextChange={(value) => {
													const newTexts = [...section5Features.texts];
													newTexts[index] = value;
													setSection5Features((prev) => ({
														...prev,
														texts: newTexts,
													}));
												}}
											/>
										</div>
									</div>
								))}
							</div> */}

					{/* ************************* Section 5 Images * *************************/}

					{/* <div className="grid md:grid-cols-2 gap-8"> */}
					{/* Detail Image */}
					{/* <div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Detail Image
									</label>
									<div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
										<EditableImage
											src={section5DetailImage}
											alt="Section 5 Detail Image"
											width={800}
											height={600}
											className="w-full h-full object-contain"
											onImageChange={setSection5DetailImage}
											usage="section5-detail"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change. Recommended size: 800x600px
									</p>
								</div> */}

					{/* ************************** Feature Image **************************/}
					{/* <div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Feature Image
									</label>
									<div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
										<EditableImage
											src={section5FeatureImage}
											alt="Section 5 Feature Image"
											width={1000}
											height={800}
											className="w-full h-full object-contain"
											onImageChange={setSection5FeatureImage}
											usage="section5-feature"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change. Recommended size: 1000x800px
									</p>
								</div>
							</div>
						</div>
					</section> */}
				</div>
			</div>
		</div>
	);
}
