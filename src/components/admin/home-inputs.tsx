"use client";
import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { HomePageContent, HomePageProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function HomeAdminInputs(props: HomePageProps) {
	const [heroImageMobile, setHeroImageMobile] = useState(props.content.heroImageMobile || "/placeholder.jpg");
	const [heroImageDesktop, setHeroImageDesktop] = useState(props.content.heroImageDesktop || "/placeholder.jpg");
	const [section1Images, setSection1Images] = useState({
		icon1: props.content.section1Images?.icon1 || "/placeholder.jpg",
		icon2: props.content.section1Images?.icon2 || "/placeholder.jpg",
		icon3: props.content.section1Images?.icon3 || "/placeholder.jpg",
		icon4: props.content.section1Images?.icon4 || "/placeholder.jpg",
	});
	const [descriptionHero, setDescriptionHero] = useState(
		props.content.descriptionHero,
	);
	const [buttonText, setButtonText] = useState(props.content.buttonText);
	const [quoteHero, setQuoteHero] = useState(props.content.quoteHero);
	const [quoteHeroAuthor, setQuoteHeroAuthor] = useState(
		props.content.quoteHeroAuthor,
	);
	const [section1tile1, setSection1tile1] = useState(
		props.content.section1tile1,
	);
	const [section1tile2, setSection1tile2] = useState(
		props.content.section1tile2,
	);
	const [section1tile3, setSection1tile3] = useState(
		props.content.section1tile3,
	);
	const [section1tile4, setSection1tile4] = useState(
		props.content.section1tile4,
	);
	const [section1paragraph, setSection1paragraph] = useState(props.content.section1paragraph);
	const [section2title, setSection2title] = useState(props.content.section2title);
	const [section2ImageDesktop, setSection2ImageDesktop] = useState(props.content.section2ImageDesktop || "/placeholder.jpg");
	const [section2ImageMobile, setSection2ImageMobile] = useState(props.content.section2ImageMobile || "/placeholder.jpg");
	const [section3title, setSection3title] = useState(props.content.section3title);
	const [section3paragraph, setSection3paragraph] = useState(props.content.section3paragraph);
	const [section3Images, setSection3Images] = useState(props.content.section3Images || {
		profile1: "/placeholder.jpg",
		profile2: "/placeholder.jpg",
		profile3: "/placeholder.jpg",
		profile4: "/placeholder.jpg",
		profile5: "/placeholder.jpg",
		profile6: "/placeholder.jpg",
	});
	const [section4ImageDesktop, setSection4ImageDesktop] = useState(props.content.section4ImageDesktop || "/placeholder.jpg");
	const [section4ImageMobile, setSection4ImageMobile] = useState(props.content.section4ImageMobile || "/placeholder.jpg");
	const [section5title, setSection5title] = useState(props.content.section5title);
	const [section5paragraph1, setSection5paragraph1] = useState(props.content.section5paragraph1);
	const [section5DetailImage, setSection5DetailImage] = useState(props.content.section5DetailImage || "/placeholder.jpg");
	const [section5FeatureImage, setSection5FeatureImage] = useState(props.content.section5FeatureImage || "/placeholder.jpg");
	const [section6title, setSection6title] = useState(props.content.section6title);
	const [section6logos, setSection6logos] = useState<string[]>(props.content.section6logos || []);
	const [section7title, setSection7title] = useState(props.content.section7title);
	const [section8title, setSection8title] = useState(props.content.section8title);
	const [section8paragraph, setSection8paragraph] = useState(props.content.section8paragraph);
	const [section8buttonText, setSection8buttonText] = useState(props.content.section8buttonText);
	const [section8Image, setSection8Image] = useState(props.content.section8Image || "/placeholder.jpg");
	const [section9title, setSection9title] = useState(props.content.section9title);
	const [section10title, setSection10title] = useState(props.content.section10title);
	const [section10paragraph, setSection10paragraph] = useState(props.content.section10paragraph);
	const [section11title, setSection11title] = useState(props.content.section11title);
	const [section11paragraph, setSection11paragraph] = useState(props.content.section11paragraph);
	const [section11buttonText, setSection11buttonText] = useState(props.content.section11buttonText);
	const [section11Image, setSection11Image] = useState(props.content.section11Image || "/placeholder.jpg");

	// ************************** Section 5 icons and text **************************/

	interface Features {
		icons: string[];
		texts: string[];
	}

	const [section5Features, setSection5Features] = useState<Features>({
		icons: Array.from({ length: 8 }, (_, i) => {
			const key = `section5icon${i + 1}` as keyof HomePageContent;
			return typeof props.content[key] === 'string' ? props.content[key] as string : '';
		}),
		texts: Array.from({ length: 8 }, (_, i) => {
			const key = `section5listText${i + 1}` as keyof HomePageContent;
			return typeof props.content[key] === 'string' ? props.content[key] as string : '';
		})
	});

	// ************************** Section 9 icons and text **************************/

	const [section9Features, setSection9Features] = useState<Features>({
		icons: Array.from({ length: 4 }, (_, i) => {
			const key = `section9icon${i + 1}` as keyof HomePageContent;
			return typeof props.content[key] === 'string' ? props.content[key] as string : '';
		}),
		texts: Array.from({ length: 4 }, (_, i) => {
			const key = `section9listText${i + 1}` as keyof HomePageContent;
			return typeof props.content[key] === 'string' ? props.content[key] as string : '';
		})
	});

	const { isSaving, updatePage } = useUpdatePage<HomePageContent>("home");

	const handleSave = async () => {
		await updatePage({
			...props,
			content: {
				...props.content,
				heroImageDesktop,
				heroImageMobile,
				section1Images,
				descriptionHero,
				buttonText,
				quoteHero,
				quoteHeroAuthor,
				section1tile1,
				section1tile2,
				section1tile3,
				section1tile4,
				section1paragraph,
				section2title,
				section2ImageDesktop,
				section2ImageMobile,
				section3title,
				section3Images,
				section3paragraph,
				section4ImageDesktop,
				section4ImageMobile,
				section5title,
				section5paragraph1,

				section5DetailImage,
				section5FeatureImage,
				section6title,
				section6logos,
				section7title,
				section8title,
				section8paragraph,
				section8buttonText,
				section8Image,
				section9title,
				section10title,
				section10paragraph,
				section11title,
				section11paragraph,
				section11buttonText,
				section11Image,
				// Section 5 features
				...Object.fromEntries(section5Features.icons.map((icon, i) => [`section5icon${i + 1}`, icon])),
				...Object.fromEntries(section5Features.texts.map((text, i) => [`section5listText${i + 1}`, text])),
				// Section 9 features
				...Object.fromEntries(section9Features.icons.map((icon, i) => [`section9icon${i + 1}`, icon])),
				...Object.fromEntries(section9Features.texts.map((text, i) => [`section9listText${i + 1}`, text])),
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
										src={heroImageDesktop}
										alt="Hero Desktop Background"
										width={1920}
										height={1080}
										className="w-full h-full object-cover hover:opacity-90 transition-opacity"
										onImageChange={setHeroImageDesktop}
										usage="desktop"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1920x1080px</p>
							</div>

							{/* ************************** Mobile Background **************************/}

							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Mobile Hero Image
								</label>
								<div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={heroImageMobile}
										alt="Hero Mobile Background"
										width={1080}
										height={1920}
										className="w-full h-full object-contain hover:opacity-90 transition-opacity"
										onImageChange={setHeroImageMobile}
										usage="mobile"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1080x1920px</p>
							</div>
						</div>

						{/* ************************** Text Content **************************/}

						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Hero Quote
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setQuoteHero}
									defaultValue={quoteHero}
								/>
							</div>

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Quote Author
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setQuoteHeroAuthor}
									defaultValue={quoteHeroAuthor}
								/>
							</div>

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Hero Description
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setDescriptionHero}
									defaultValue={descriptionHero}
								/>
							</div>

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Button Text
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setButtonText}
									defaultValue={buttonText}
								/>
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 1: FEATURES
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Section 1</h2>
						<div className="space-y-6">
							{/* ************************** Feature Tiles **************************/}

							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{[1, 2, 3, 4].map((num, index) => (
									<div key={num} className="space-y-4">
										<label className="block text-white text-sm font-medium mb-2">
											Feature {num}
										</label>
										<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
											<EditableImage
												src={section1Images[`icon${num}` as keyof typeof section1Images]}
												alt={`Feature ${num} Icon`}
												width={100}
												height={100}
												className="w-full h-full object-contain p-4"
												onImageChange={(url) => {
													setSection1Images(prev => ({
														...prev,
														[`icon${num}` as keyof typeof section1Images]: url
													}));
												}}
												usage={`feature-${num}`}
											/>
										</div>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={[setSection1tile1, setSection1tile2, setSection1tile3, setSection1tile4][index]}
											defaultValue={[section1tile1, section1tile2, section1tile3, section1tile4][index]}
										/>
									</div>
								))}
							</div>

							{/* ************************** Summary **************************/}

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
					</section>

					<section className="bg-gray-900 p-8 rounded-lg mb-12">
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

							{/* ************************** Images **************************/}

							<div className="grid md:grid-cols-2 gap-8">
								{/* ************************** Mobile Image **************************/}
								<div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Mobile Image
									</label>
									<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
										<EditableImage
											src={section2ImageMobile}
											alt="Section 2 Mobile Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection2ImageMobile}
											usage="section2-mobile"
										/>
									</div>
									<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1000x1000px</p>
								</div>

								{/* ************************** Desktop Image **************************/}

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
									<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1000x1000px</p>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 3: TRUSTED BY THOUSANDS
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
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
							</div>

							{/* ************************** Profile Images **************************/}

							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Profile Images
								</label>
								<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
									{[1, 2, 3, 4, 5, 6].map((index) => (
										<div key={index} className="space-y-2">
											<div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
												<EditableImage
													src={section3Images[`profile${index}` as keyof typeof section3Images]}
													alt={`Profile ${index}`}
													width={180}
													height={320}
													className="w-full h-full object-cover"
													onImageChange={(url) => {
														setSection3Images(prev => ({
															...prev,
															[`profile${index}`]: url
														}));
													}}
													usage={`profile-${index}`}
												/>
											</div>
											<p className="text-gray-400 text-xs text-center">Profile {index}</p>
										</div>
									))}
								</div>
								<p className="text-gray-400 text-xs mt-2">Click images to change. Recommended size: 180x320px</p>
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 4: DYNAMIC IMAGES
					****************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-8 h-full w-full">
								{/* ************************** Mobile Image **************************/}

								<div className="space-y-4">
									<label className="block text-white text-sm font-medium mb-2">
										Desktop Image
									</label>
									<div className="e bg-gray-800 object-cover overflow-hidden">
										<EditableImage
											src={section4ImageMobile}
											alt="Section 4 Mobile Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection4ImageMobile}
											usage="section4-mobile"
										/>
									</div>
									<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1000x1000px</p>
								</div>

								{/* ************************** Desktop Image **************************/}

								<div className="space-y-4 flex flex-col justify-start items-start h-full w-full">
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
									<p className="text-gray-400 text-xs">Click image to change. </p>
								</div>
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 5: HOW WE AGE
					****************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
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
							</div>

							{/****************************  Section 5 Features *************************/}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
														setSection5Features(prev => ({ ...prev, icons: newIcons }));
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
													setSection5Features(prev => ({ ...prev, texts: newTexts }));
												}}
											/>
										</div>
									</div>
								))}
							</div>


							{/* ************************* Section 5 Images * *************************/}

							<div className="grid md:grid-cols-2 gap-8">
								{/* Detail Image */}
								<div className="space-y-4">
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
									<p className="text-gray-400 text-xs">Click image to change. Recommended size: 800x600px</p>
								</div>

								{/* ************************** Feature Image **************************/}
								<div className="space-y-4">
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
									<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1000x800px</p>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 6: AS FEATURED IN
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section6title}
									onTextChange={setSection6title}
								/>
							</div>
						</div>

						<div className="space-y-8 mt-8">
							<div className="flex justify-between items-center">
								<label className="block text-white text-sm font-medium">
									Section Logos
								</label>
								<button
									onClick={() => setSection6logos([...section6logos, "/placeholder.jpg"])}
									className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
								>
									+ Add Logo
								</button>
							</div>
							<div className="grid grid-cols-4 md:grid-cols-6 gap-4">
								{section6logos.map((logo, index) => (
									<div key={index} className="relative group">
										<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
											<EditableImage
												src={logo}
												alt={`Logo ${index + 1}`}
												width={60}
												height={60}
												className="w-full h-full object-contain p-1"
												onImageChange={(url) => {
													const newLogos = [...section6logos];
													newLogos[index] = url;
													setSection6logos(newLogos);
												}}
												usage={`logo-${index + 1}`}
											/>
										</div>
										<button
											onClick={() => {
												const newLogos = section6logos.filter((_, i) => i !== index);
												setSection6logos(newLogos);
											}}
											className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
										>
											×
										</button>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 7: TESTIMONIALS
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section7title}
									onTextChange={setSection7title}
								/>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 8: OUR MISSION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section8title}
									onTextChange={setSection8title}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section8paragraph}
									onTextChange={setSection8paragraph}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Button Text
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section8buttonText}
									onTextChange={setSection8buttonText}
								/>
							</div>

							{/* ************************** Mission Image **************************/}
							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Mission Image
								</label>
								<div className="max-w-md bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={section8Image}
										alt="Mission visualization"
										width={1920}
										height={1080}
										className="w-full h-auto object-contain"
										onImageChange={setSection8Image}
										usage="section8"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1920x1080px</p>
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 9: GROUND WORK
					****************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section9title}
									onTextChange={setSection9title}
								/>
							</div>

							{/* ************************** Section 9 Features **************************/}

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{[...Array(4)].map((_, index) => (
									<div key={index} className="space-y-4">
										<label className="block text-white text-sm font-medium mb-2">
											Feature {index + 1}
										</label>
										<div className="flex space-x-2">
											<div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
												<EditableImage
													src={section9Features.icons[index]}
													alt={`Feature ${index + 1} icon`}
													width={48}
													height={48}
													className="w-full h-full object-contain p-2"
													onImageChange={(url) => {
														const newIcons = [...section9Features.icons];
														newIcons[index] = url;
														setSection9Features(prev => ({ ...prev, icons: newIcons }));
													}}
													usage={`section9-icon-${index + 1}`}
												/>
											</div>
											<EditableElement
												as="textarea"
												className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												defaultValue={section9Features.texts[index]}
												onTextChange={(value) => {
													const newTexts = [...section9Features.texts];
													newTexts[index] = value;
													setSection9Features(prev => ({ ...prev, texts: newTexts }));
												}}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 10: REAL SUPPORT
					****************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section10title}
									onTextChange={setSection10title}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section10paragraph}
									onTextChange={setSection10paragraph}
								/>
							</div>
						</div>
					</section>


					{/* ***************************************************************
						SECTION 11: BECOME UNSTOPPABLE
					****************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section11title}
									onTextChange={setSection11title}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section11paragraph}
									onTextChange={setSection11paragraph}
								/>
							</div>
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Button Text
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section11buttonText}
									onTextChange={setSection11buttonText}
								/>
							</div>

							{/* ************************** Background Image **************************/}
							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Background Image
								</label>
								<div className="max-w-md bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={section11Image}
										alt="Section 11 background"
										width={1920}
										height={1080}
										className="w-full h-auto object-contain"
										onImageChange={setSection11Image}
										usage="section11"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1920x1080px</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
