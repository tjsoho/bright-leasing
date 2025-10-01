'use client';

import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { useState, } from "react";
import { createSlug } from "@/utils/create-slug";
import { BlogFormData, BlogPost } from "@/app/types/blog";
import { useImageLibrary } from "@/contexts/ImageLibraryContext";
import RichTextEditor from "@/components/core/RichTextEditor";
import LuxeButton from "@/components/core/LuxeButton";

interface BlogFormProps {
    initialData?: BlogPost | null;
    onCancel?: () => void;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogForm({ initialData, onCancel }: BlogFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>(initialData?.cover_image || "");
    const [submitMessage, setSubmitMessage] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const { openImageLibrary } = useImageLibrary();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm<BlogFormData>({
        defaultValues: {
            title: initialData?.title || "",
            cover_image: initialData?.cover_image || "",
            excerpt: initialData?.excerpt || "",
            author: initialData?.author || "",
            content: initialData?.content || "",
        },
    });

    const title = watch("title");

    const onSubmit = async (data: BlogFormData) => {
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const slug = createSlug(data.title);

            const blogPost: BlogPost = {
                title: data.title,
                cover_image: data.cover_image || undefined,
                excerpt: data.excerpt || undefined,
                author: data.author,
                content: data.content || undefined,
                slug,
            };

            const { error } = initialData
                ? await supabase
                    .from("blogs")
                    .update(blogPost)
                    .eq('id', initialData.id)
                : await supabase
                    .from("blogs")
                    .insert(blogPost);

            if (error) {
                console.error("Error saving blog post:", error);
                setSubmitMessage({
                    type: "error",
                    message: error.message || "Failed to save blog post",
                });
            } else {
                setSubmitMessage({
                    type: "success",
                    message: `Blog post ${initialData ? 'updated' : 'created'} successfully!`,
                });

                if (!initialData) {
                    // Only reset form for new posts
                    reset({
                        title: "",
                        cover_image: "",
                        excerpt: "",
                        author: "",
                        content: "",
                    });
                    setSelectedImage("");
                    setValue("content", "", { shouldDirty: false });
                }

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSubmitMessage(null);
                    if (initialData && onCancel) {
                        onCancel(); // Return to list view after editing
                    }
                }, 3000);
            }
        } catch (error) {
            console.error("Error saving blog post:", error);
            setSubmitMessage({
                type: "error",
                message: "An unexpected error occurred",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-black border border-white/20 p-8">
                <h1 className="text-3xl font-bold text-white mb-8">
                    {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h1>

                {submitMessage && (
                    <div
                        className={`mb-6 p-4 border ${submitMessage.type === "success"
                            ? "bg-black border-green-500 text-green-500"
                            : "bg-black border-red-500 text-red-500"
                            }`}
                    >
                        {submitMessage.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Top Section - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Title & Author */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                                    Title *
                                </label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Enter blog post title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                                {title && (
                                    <p className="mt-1 text-sm text-white/50">Slug: {createSlug(title)}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    {...register("excerpt")}
                                    id="excerpt"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Brief description of the blog post"
                                />
                            </div>
                        </div>

                        {/* Right Column - Author & Cover Image */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-white mb-2">
                                    Author *
                                </label>
                                <input
                                    {...register("author", { required: "Author is required" })}
                                    type="text"
                                    id="author"
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Enter author name"
                                />
                                {errors.author && (
                                    <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                                )}
                            </div>

                            {/* Cover Image */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Cover Image
                                </label>
                                <div className="mt-1">
                                    {selectedImage ? (
                                        <div className="relative group">
                                            <img
                                                src={selectedImage}
                                                alt="Blog cover"
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        openImageLibrary((url) => {
                                                            if (url) {
                                                                setSelectedImage(url);
                                                                register("cover_image").onChange({
                                                                    target: { value: url, name: "cover_image" },
                                                                });
                                                            }
                                                        }, "blog-cover");
                                                    }}
                                                    className="px-4 py-2 bg-black text-white border border-white/20 text-sm font-medium hover:border-white transition-colors"
                                                >
                                                    Change Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-32 border border-dashed border-white/20 flex flex-col items-center justify-center bg-black hover:border-white transition-colors cursor-pointer"
                                            onClick={() => {
                                                openImageLibrary((url) => {
                                                    if (url) {
                                                        setSelectedImage(url);
                                                        register("cover_image").onChange({
                                                            target: { value: url, name: "cover_image" },
                                                        });
                                                    }
                                                }, "blog-cover");
                                            }}
                                        >
                                            <svg
                                                className="w-8 h-8 text-white/50 mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-white hover:text-white/80"
                                            >
                                                Upload Cover Image
                                            </button>
                                            <p className="text-xs text-white/50 mt-1">
                                                Recommended size: 1200 x 675 pixels
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Content */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                                Content
                            </label>
                            <RichTextEditor
                                content={watch("content") || ""}
                                onChange={(newContent) => {
                                    register("content").onChange({
                                        target: { value: newContent, name: "content" },
                                    });
                                }}
                            />
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="flex justify-end gap-4">
                            {onCancel && (
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-6 py-2 border border-white/20 text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <LuxeButton
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                {initialData ? 'Update Post' : 'Create Post'}
                            </LuxeButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}