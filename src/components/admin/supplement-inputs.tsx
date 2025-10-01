'use client';

import { useState, useEffect } from "react";
import { SaveBanner } from "../core/save-banner";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import ProductSelector from "./ProductSelector";
import { SupplementPageProps } from "@/app/supplement/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import toast from "react-hot-toast";
import { getProducts } from '@/utils/shopify';
import { ShopifyProduct } from '@/types/shopify';
import Image from 'next/image';

interface Props extends SupplementPageProps {
	id?: string;
}

export default function SupplementAdminInputs(props: Props) {
	const [heroTitle, setHeroTitle] = useState(props.content?.heroTitle || '');
	const [heroSubtitle, setHeroSubtitle] = useState(props.content?.heroSubtitle || '');
	const [heroContent, setHeroContent] = useState(props.content?.heroContent || '');
	const [heroImage, setHeroImage] = useState(props.content?.heroImage || "/images/supplement/hero.jpg");
	const [featuredProductIds, setFeaturedProductIds] = useState<string[]>(props.content?.featuredProductIds || []);
	const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Benefits state
	const [benefitsTitle, setBenefitsTitle] = useState(props.content?.benefits?.title || '');
	const [benefitsContent, setBenefitsContent] = useState({
		subtitle1: props.content?.benefits?.subtitle1 || '',
		subtitle1item1: props.content?.benefits?.subtitle1item1 || '',
		subtitle1item2: props.content?.benefits?.subtitle1item2 || '',
		subtitle2: props.content?.benefits?.subtitle2 || '',
		subtitle2item1: props.content?.benefits?.subtitle2item1 || '',
		subtitle2item2: props.content?.benefits?.subtitle2item2 || '',
		subtitle3: props.content?.benefits?.subtitle3 || '',
		subtitle3item1: props.content?.benefits?.subtitle3item1 || '',
		subtitle3item2: props.content?.benefits?.subtitle3item2 || '',
		subtitle4: props.content?.benefits?.subtitle4 || '',
		subtitle4item1: props.content?.benefits?.subtitle4item1 || '',
		subtitle4item2: props.content?.benefits?.subtitle4item2 || '',
	});

	// Results state
	const [resultsTitle, setResultsTitle] = useState(props.content?.results?.title || '');
	const [resultsCards, setResultsCards] = useState(props.content?.results?.cards || Array(6).fill({
		image: '',
		title: '',
		description: ''
	}));

	// Experience state
	const [experienceTitle, setExperienceTitle] = useState(props.content?.experience?.title || '');
	const [experienceHeading, setExperienceHeading] = useState(props.content?.experience?.heading || '');
	const [experienceParagraph, setExperienceParagraph] = useState(props.content?.experience?.paragraph || '');
	const [experienceImage, setExperienceImage] = useState(props.content?.experience?.image || '');

	// Comparison state
	const [comparisonTitle, setComparisonTitle] = useState(props.content?.comparison?.title || '');
	const [comparisonImage, setComparisonImage] = useState(props.content?.comparison?.ourProductImage || '');
	const [staitTitle, setStaitTitle] = useState(props.content?.comparison?.staitTitle || '');
	const [otherProductsTitle, setOtherProductsTitle] = useState(props.content?.comparison?.otherProducts?.title || '');
	const [otherProductItems, setOtherProductItems] = useState(props.content?.comparison?.otherProducts?.items || []);
	const [featurePrice, setFeaturePrice] = useState(props.content?.comparison?.featurePrice || '');
	const [traditionalPrice, setTraditionalPrice] = useState(props.content?.comparison?.traditionalPrice || '');

	// Questions state
	const [questionsTitle, setQuestionsTitle] = useState(props.content?.questions?.title || 'WHAT PEOPLE ARE ASKING');
	const [questionsItems, setQuestionsItems] = useState(props.content?.questions?.items || [
		{
			question: "What is STAIT Supplement?",
			answer: "The STAIT Supplement is a dietary supplement that contains a proprietary formula of standardised herbal extracts and minerals designed to optimise hormone levels, improve physical and cognitive performance, enhance stress response, support a healthy immune system and promote healthy sleep."
		},
		{
			question: "What are the key benefits of taking the supplement?",
			answer: "The key benefits of taking the supplement include enhanced physical and cognitive performance, improved stress response, enhanced immune response and healthy sleep. By optimising hormone levels, the supplement can help improve energy levels, focus, and overall productivity during the day. It can also help reduce stress and promote a sense of calm, which can be beneficial for overall well-being. Additionally, the STAIT Supplement can help regulate sleep patterns, leading to more restful and restorative sleep."
		},
		{
			question: "What makes the supplement effective?",
			answer: "The supplement is effective because it contains a unique blend of natural active ingredients in the therapeutic dose that was used in double-blind, placebo-controlled human clinical trials to bring about proven results. The standardised herbal extracts and minerals in it work together to help support optimal hormone levels, which can have a profound effect on physical and cognitive performance, stress response, and sleep quality. Standardised herbs ensure that the active constituents are present in the same potency that brings about desired results from batch to batch."
		},
		{
			question: "When will I feel the benefits?",
			answer: "Everyone is different, so the time frame for results will vary. The clinical studies showed results over a 6 - 8 week test period when taking STAIT for Men / Women ingredients. Some people notice results in as little as a week. Some people notice results after 6 weeks. The Customer Reviews on the product pages of our website will give you a good indication of what to expect."
		},
		{
			question: "What are the ingredients in the STAIT Supplement?",
			answer: "The ingredients in the STAIT Supplement include a proprietary blend of standardised herbal extracts and minerals, including KSM-66® Ashwagandha, Affron®, Testofen®, tribulus, Korean ginseng, coleus, cinnamon, rosemary, zinc and selenium. You can read more about our ingredients and unique benefits above in our interactive illustration. All of our ingredients are carefully selected and provided in the exact doses as per the human clinical trials to provide optimal benefits and promote overall well-being."
		},
		{
			question: "Is the supplement a testosterone booster?",
			answer: "No, it's a hormone optimiser. STAIT Supplement helps the body optimise its hormone levels."
		}
	]);

	const { updatePage } = useUpdatePage<SupplementPageProps["content"]>("supplement");

	useEffect(() => {
		const fetchSelectedProducts = async () => {
			if (featuredProductIds.length === 0) return;

			setIsLoading(true);
			try {
				const data = await getProducts(20);
				const products = data.products.filter((product: ShopifyProduct) =>
					featuredProductIds.includes(product.id)
				);
				setSelectedProducts(products);
			} catch (error) {
				console.error('Error fetching selected products:', error);
				toast.error('Failed to load selected products');
			} finally {
				setIsLoading(false);
			}
		};

		fetchSelectedProducts();
	}, [featuredProductIds]);

	const handleSave = async () => {
		try {
			await updatePage({
				id: props.id,
				title: props.title,
				description: props.description,
				slug: props.slug,
				content: {
					heroTitle,
					heroSubtitle,
					heroContent,
					heroImage,
					featuredProductIds,
					benefits: {
						title: benefitsTitle,
						...benefitsContent
					},
					results: {
						title: resultsTitle,
						cards: resultsCards
					},
					experience: {
						title: experienceTitle,
						heading: experienceHeading,
						paragraph: experienceParagraph,
						image: experienceImage
					},
					comparison: {
						title: comparisonTitle,
						ourProductImage: comparisonImage,
						staitTitle,
						otherProducts: {
							title: otherProductsTitle,
							items: otherProductItems
						},
						featurePrice,
						traditionalPrice
					},
					questions: {
						title: questionsTitle,
						items: questionsItems
					}
				},
			});
			toast.success('Changes saved successfully');
		} catch (error) {
			console.error('Error saving:', error);
			toast.error('Failed to save changes');
		}
	};

	const handleProductsSelected = (ids: string[]) => {
		setFeaturedProductIds(ids);
	};

	const handleRemoveProduct = (productId: string) => {
		setFeaturedProductIds(prev => prev.filter(id => id !== productId));
		setSelectedProducts(prev => prev.filter(product => product.id !== productId));
	};

	const updateBenefitsContent = (key: keyof typeof benefitsContent, value: string) => {
		setBenefitsContent(prev => ({
			...prev,
			[key]: value
		}));
	};

	const updateResultCard = (index: number, field: keyof typeof resultsCards[0], value: string) => {
		setResultsCards(prev => {
			const newCards = [...prev];
			newCards[index] = { ...newCards[index], [field]: value };
			return newCards;
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Supplement Page"
				onSave={handleSave}
				isSaving={isLoading}
			/>
			<div className="min-h-screen bg-black">
				<div className="max-w-6xl mx-auto px-8 py-16">
					{/* Header */}
					<header className="mb-16">
						<h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
							Supplement
						</h1>
					</header>

					{/*************************************************  
									Hero Section
					***************************************************/}

					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Hero Section</h2>

						<div className="space-y-6">
							{/* Hero Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Hero Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={heroTitle}
									onTextChange={setHeroTitle}
								/>
							</div>

							{/************************************************************************************************** 
										Hero Subtitle 
							 **************************************************************************************************/}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Hero Subtitle
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={heroSubtitle}
									onTextChange={setHeroSubtitle}
								/>
							</div>

							{/* Hero Content */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Hero Content
								</label>
								<EditableElement
									as="textarea"
									className="w-full h-[500px] p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={heroContent}
									onTextChange={setHeroContent}
								/>
								<p className="text-gray-400 text-xs mt-1">
									Add your content here. Use line breaks and ✔️ emoji for checkmarks. All formatting will be preserved.
								</p>
							</div>

							{/* Hero Image */}
							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Hero Image
								</label>
								<div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={heroImage}
										alt="Hero Image"
										width={1920}
										height={1080}
										className="w-full h-full object-cover"
										onImageChange={setHeroImage}
										usage="hero"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1920x1080px</p>
							</div>
						</div>
					</section>

					{/**************************************************************************************************  
									Featured Products
					**************************************************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Featured Products</h2>

						<div className="space-y-6">
							{/* Selected Products */}
							{selectedProducts.length > 0 && (
								<div className="mb-6">
									<h3 className="text-white text-sm mb-3">Currently Selected:</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
										{selectedProducts.map(product => (
											<div key={product.id} className="bg-gray-800 border border-white/20 p-2">
												<div className="aspect-square relative mb-2">
													{product.images[0] && (
														<Image
															src={product.images[0].url}
															alt={product.title}
															fill
															className="object-cover"
														/>
													)}
												</div>
												<div className="text-white text-xs truncate mb-2">{product.title}</div>
												<button
													onClick={() => handleRemoveProduct(product.id)}
													className="w-full text-xs bg-red-500/20 text-red-500 py-1 hover:bg-red-500/30 transition-colors"
												>
													Remove
												</button>
											</div>
										))}
									</div>
								</div>
							)}




							<ProductSelector
								selectedProductIds={featuredProductIds}
								onProductsSelected={handleProductsSelected}
							/>
						</div>
					</section>

					{/**************************************************************************************************  
									Benefits Section
					**************************************************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Benefits Section</h2>

						<div className="space-y-8">
							{/* Benefits Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={benefitsTitle}
									onTextChange={setBenefitsTitle}
								/>
							</div>

							{/* Benefits Content */}
							{[1, 2, 3, 4].map((num) => (
								<div key={num} className="space-y-4 p-6 bg-black/50 border border-white/10">
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Subtitle {num}
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={benefitsContent[`subtitle${num}` as keyof typeof benefitsContent]}
											onTextChange={(value) => updateBenefitsContent(`subtitle${num}` as keyof typeof benefitsContent, value)}
										/>
									</div>
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Item 1
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={benefitsContent[`subtitle${num}item1` as keyof typeof benefitsContent]}
											onTextChange={(value) => updateBenefitsContent(`subtitle${num}item1` as keyof typeof benefitsContent, value)}
										/>
									</div>
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Item 2
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={benefitsContent[`subtitle${num}item2` as keyof typeof benefitsContent]}
											onTextChange={(value) => updateBenefitsContent(`subtitle${num}item2` as keyof typeof benefitsContent, value)}
										/>
									</div>
								</div>
							))}
						</div>
					</section>

					{/**************************************************************************************************    
									Results Section
					**************************************************************************************************/}


					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Results Section</h2>

						<div className="space-y-8">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={resultsTitle}
									onTextChange={setResultsTitle}
								/>
							</div>

							{/* Result Cards */}
							<div className="space-y-6">
								{resultsCards.map((card, index) => (
									<div key={index} className="p-6 bg-black/50 border border-white/10">
										<h3 className="text-white font-medium mb-4">Result Card {index + 1}</h3>

										<div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
											{/* Left Column - Image */}
											<div>
												<label className="block text-white text-sm font-medium mb-2">
													Image
												</label>
												<div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
													<EditableImage
														src={card.image}
														alt={`Result ${index + 1}`}
														width={300}
														height={225}
														className="w-full h-full object-cover"
														onImageChange={(value) => updateResultCard(index, 'image', value)}
														usage="result"
													/>
												</div>
											</div>

											{/* Right Column - Content */}
											<div className="space-y-4">
												{/* Title */}
												<div>
													<label className="block text-white text-sm font-medium mb-2">
														Title
													</label>
													<EditableElement
														as="input"
														className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
														defaultValue={card.title}
														onTextChange={(value) => updateResultCard(index, 'title', value)}
													/>
												</div>

												{/* Description */}
												<div>
													<label className="block text-white text-sm font-medium mb-2">
														Description
													</label>
													<EditableElement
														as="textarea"
														className="w-full h-32 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
														defaultValue={card.description}
														onTextChange={(value) => updateResultCard(index, 'description', value)}
													/>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					{/**************************************************************************************************    
									Comparison Section
					**************************************************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Comparison Section</h2>

						<div className="space-y-8">
							{/* Section Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={comparisonTitle}
									onTextChange={setComparisonTitle}
								/>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Left Column - STAIT Product */}
								<div className="space-y-6">
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											STAIT Title
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={staitTitle}
											onTextChange={setStaitTitle}
										/>
									</div>

									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Product Image
										</label>
										<div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
											<EditableImage
												src={comparisonImage}
												alt="STAIT Product"
												width={400}
												height={400}
												className="w-full h-full object-contain"
												onImageChange={setComparisonImage}
												usage="comparison"
											/>
										</div>
									</div>
								</div>

								{/* Right Column - Other Products */}
								<div className="space-y-6">
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Other Products Title
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={otherProductsTitle}
											onTextChange={setOtherProductsTitle}
										/>
									</div>

									{/* Other Products List */}
									<div className="space-y-4">
										{otherProductItems.map((item, index) => (
											<div key={index} className="grid grid-cols-[1fr,auto] gap-4 items-start">
												<div className="space-y-2">
													<EditableElement
														as="input"
														className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
														defaultValue={item.name}
														onTextChange={(value) => {
															const newItems = [...otherProductItems];
															newItems[index] = { ...newItems[index], name: value };
															setOtherProductItems(newItems);
														}}
													/>
													<EditableElement
														as="input"
														className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
														defaultValue={item.price}
														onTextChange={(value) => {
															const newItems = [...otherProductItems];
															newItems[index] = { ...newItems[index], price: value };
															setOtherProductItems(newItems);
														}}
													/>
												</div>
												<button
													type="button"
													onClick={() => {
														setOtherProductItems(items => items.filter((_, i) => i !== index));
													}}
													className="px-3 py-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
												>
													Remove
												</button>
											</div>
										))}

										<button
											type="button"
											onClick={() => {
												setOtherProductItems(items => [...items, { name: '', price: '' }]);
											}}
											className="w-full px-4 py-2 bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/20"
										>
											Add Product
										</button>
									</div>
								</div>
							</div>

							{/* Price Comparison */}
							<div className="space-y-6 border-t border-white/10 pt-8">
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Traditional Total Cost
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={traditionalPrice}
										onTextChange={setTraditionalPrice}
									/>
								</div>

								<div>
									<label className="block text-white text-sm font-medium mb-2">
										STAIT Complete Solution Price
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={featurePrice}
										onTextChange={setFeaturePrice}
									/>
								</div>
							</div>
						</div>
					</section>

					{/**************************************************************************************************    
									Experience Section
					**************************************************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Experience Section</h2>

						<div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
							{/* Left Column - Image */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Image
								</label>
								<div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={experienceImage}
										alt="Experience Image"
										width={800}
										height={600}
										className="w-full h-full object-cover"
										onImageChange={setExperienceImage}
										usage="experience"
									/>
								</div>
							</div>

							{/* Right Column - Content */}
							<div className="space-y-6">
								{/* Title */}
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Title
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={experienceTitle}
										onTextChange={setExperienceTitle}
									/>
								</div>

								{/* Heading */}
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Heading
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={experienceHeading}
										onTextChange={setExperienceHeading}
									/>
								</div>

								{/* Paragraph */}
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Paragraph
									</label>
									<EditableElement
										as="textarea"
										className="w-full h-32 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={experienceParagraph}
										onTextChange={setExperienceParagraph}
									/>
								</div>
							</div>
						</div>
					</section>

					{/**************************************************************************************************    
									Questions Section
					**************************************************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Questions Section</h2>

						<div className="space-y-8">
							{/* Title */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={questionsTitle}
									onTextChange={setQuestionsTitle}
								/>
							</div>

							{/* Questions */}
							<div className="space-y-6">
								{[
									{
										question: "What is STAIT Supplement?",
										answer: "The STAIT Supplement is a dietary supplement that contains a proprietary formula of standardised herbal extracts and minerals designed to optimise hormone levels, improve physical and cognitive performance, enhance stress response, support a healthy immune system and promote healthy sleep."
									},
									{
										question: "What are the key benefits of taking the supplement?",
										answer: "The key benefits of taking the supplement include enhanced physical and cognitive performance, improved stress response, enhanced immune response and healthy sleep. By optimising hormone levels, the supplement can help improve energy levels, focus, and overall productivity during the day. It can also help reduce stress and promote a sense of calm, which can be beneficial for overall well-being. Additionally, the STAIT Supplement can help regulate sleep patterns, leading to more restful and restorative sleep."
									},
									{
										question: "What makes the supplement effective?",
										answer: "The supplement is effective because it contains a unique blend of natural active ingredients in the therapeutic dose that was used in double-blind, placebo-controlled human clinical trials to bring about proven results. The standardised herbal extracts and minerals in it work together to help support optimal hormone levels, which can have a profound effect on physical and cognitive performance, stress response, and sleep quality. Standardised herbs ensure that the active constituents are present in the same potency that brings about desired results from batch to batch."
									},
									{
										question: "When will I feel the benefits?",
										answer: "Everyone is different, so the time frame for results will vary. The clinical studies showed results over a 6 - 8 week test period when taking STAIT for Men / Women ingredients. Some people notice results in as little as a week. Some people notice results after 6 weeks. The Customer Reviews on the product pages of our website will give you a good indication of what to expect."
									},
									{
										question: "What are the ingredients in the STAIT Supplement?",
										answer: "The ingredients in the STAIT Supplement include a proprietary blend of standardised herbal extracts and minerals, including KSM-66® Ashwagandha, Affron®, Testofen®, tribulus, Korean ginseng, coleus, cinnamon, rosemary, zinc and selenium. You can read more about our ingredients and unique benefits above in our interactive illustration. All of our ingredients are carefully selected and provided in the exact doses as per the human clinical trials to provide optimal benefits and promote overall well-being."
									},
									{
										question: "Is the supplement a testosterone booster?",
										answer: "No, it's a hormone optimiser. STAIT Supplement helps the body optimise its hormone levels."
									}
								].map((item, index) => (
									<div key={index} className="p-6 bg-black/50 border border-white/10">
										<div className="space-y-4">
											<div>
												<label className="block text-white text-sm font-medium mb-2">
													Question {index + 1}
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													defaultValue={questionsItems[index]?.question || item.question}
													onTextChange={(value) => {
														const newItems = [...questionsItems];
														newItems[index] = {
															...newItems[index] || {},
															question: value,
															answer: questionsItems[index]?.answer || item.answer
														};
														setQuestionsItems(newItems);
													}}
												/>
											</div>
											<div>
												<label className="block text-white text-sm font-medium mb-2">
													Answer {index + 1}
												</label>
												<EditableElement
													as="textarea"
													className="w-full h-32 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													defaultValue={questionsItems[index]?.answer || item.answer}
													onTextChange={(value) => {
														const newItems = [...questionsItems];
														newItems[index] = {
															...newItems[index] || {},
															question: questionsItems[index]?.question || item.question,
															answer: value
														};
														setQuestionsItems(newItems);
													}}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

				</div>
			</div>
		</div>
	);
}