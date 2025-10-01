"use client";

import { SaveBanner } from "@/components/core/save-banner";
import { useState } from "react";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import { Business, GivingBackPageContent, GivingBackPageProps } from "@/app/giving-back/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function GivingBackAdminInputs(props: GivingBackPageProps) {
    const [titleHero, setTitleHero] = useState(props.content.title);
    const [description, setDescription] = useState(props.content.description);
    const [businesses, setBusinesses] = useState<Business[]>(props.content.businesses || []);

    const { isSaving, updatePage } = useUpdatePage<GivingBackPageContent>("giving-back");

    const handleSave = async () => {
        await updatePage({
            title: props.title,
            description: props.description,
            slug: props.slug,
            content: {
                title: titleHero,
                description,
                businesses,
            },
        });
    };

    const addBusiness = () => {
        setBusinesses([
            ...businesses,
            {
                image: "/images/next.svg",
                title: "New Business",
                subheading: "Enter subheading",
                paragraph: "Enter description"
            }
        ]);
    };

    const updateBusiness = (index: number, field: keyof Business, value: string) => {
        const newBusinesses = [...businesses];
        newBusinesses[index] = { ...newBusinesses[index], [field]: value };
        setBusinesses(newBusinesses);
    };

    const deleteBusiness = (index: number) => {
        setBusinesses(businesses.filter((_, i) => i !== index));
    };

    return (
        <div>
            <SaveBanner
                pageTitle="Giving Back Page"
                onSave={handleSave}
                isSaving={isSaving}
            />
            <div className="min-h-screen bg-black">
                <div className="max-w-6xl mx-auto px-8 py-16">
                    {/* ************************** Header Section **************************/}
                    <header className="mb-16">
                        <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
                            Giving Back
                        </h1>
                    </header>

                    {/* ***************************************************************
                       HERO SECTION
                    ****************************************************************/}
                    <section className="bg-gray-900 p-8 rounded-lg mb-12">
                        <h2 className="text-2xl text-white font-bold mb-8">Hero Section</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Title
                                </label>
                                <EditableElement
                                    as="input"
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    defaultValue={titleHero}
                                    onTextChange={setTitleHero}
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Description
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    defaultValue={description}
                                    onTextChange={setDescription}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
                       BUSINESSES SECTION
                    ****************************************************************/}
                    <section className="bg-gray-900 p-8 rounded-lg mb-12">
                        <h2 className="text-2xl text-white font-bold mb-8">Businesses</h2>
                        <div className="space-y-8">
                            {businesses.map((business, index) => (
                                <div key={index} className="bg-gray-800 p-6 rounded-lg space-y-4">
                                    <div className="grid grid-cols-[120px,1fr] gap-4 items-start">
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Image
                                            </label>
                                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                                <EditableImage
                                                    src={business.image}
                                                    alt={`Business ${index + 1}`}
                                                    width={120}
                                                    height={120}
                                                    className="w-[120px] h-[120px] object-contain hover:opacity-90 transition-opacity"
                                                    onImageChange={(url) => updateBusiness(index, 'image', url)}
                                                    usage={`business-${index}`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="block text-white text-sm font-medium">
                                                    Title
                                                </label>
                                                <button
                                                    onClick={() => deleteBusiness(index)}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Delete Business
                                                </button>
                                            </div>
                                            <EditableElement
                                                as="input"
                                                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                                defaultValue={business.title}
                                                onTextChange={(value) => updateBusiness(index, 'title', value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Subheading
                                        </label>
                                        <EditableElement
                                            as="input"
                                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                            defaultValue={business.subheading}
                                            onTextChange={(value) => updateBusiness(index, 'subheading', value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Paragraph
                                        </label>
                                        <EditableElement
                                            as="textarea"
                                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                            defaultValue={business.paragraph}
                                            onTextChange={(value) => updateBusiness(index, 'paragraph', value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={addBusiness}
                                className="bg-white text-black px-6 py-3 rounded hover:bg-white/90 transition-colors"
                            >
                                Add Business
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}