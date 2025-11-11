/* ************************************************************
                        NOTES
************************************************************ */
// FAQ form component for creating and editing FAQs
// Matches app styling with AdminFormSection and brand colors
/* ************************************************************
                        IMPORTS
************************************************************ */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { createFAQ, updateFAQ } from '@/server-actions/faq';
import AdminFormSection from '@/components/admin/AdminFormSection';
import toast from 'react-hot-toast';

/* ************************************************************
                        INTERFACES
************************************************************ */
interface FAQFormProps {
    categories: FAQCategory[];
    initialData?: FAQ | null;
    onSuccess: () => void;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function FAQForm({ categories, initialData, onSuccess }: FAQFormProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FAQ>({
        defaultValues: initialData || {
            question: '',
            answer: '',
            category_id: '00000000-0000-0000-0000-000000000000' // Default to General
        }
    });

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const onSubmit = async (data: FAQ) => {
        setIsSubmitting(true);
        try {
            if (initialData) {
                await updateFAQ(initialData.id, data);
                toast.success('FAQ updated successfully!');
            } else {
                await createFAQ(data);
                toast.success('FAQ created successfully!');
                reset();
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            toast.error('Failed to save FAQ');
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <AdminFormSection title={initialData ? 'Edit FAQ' : 'Create New FAQ'}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Category Selection */}
                <div>
                    <label className="block text-brand-black text-sm font-medium mb-2">
                        Category
                    </label>
                    <select
                        {...register("category_id")}
                        className="w-full px-4 py-2 bg-white border border-brand-black/20 text-brand-black rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Question */}
                <div>
                    <label className="block text-brand-black text-sm font-medium mb-2">
                        Question
                    </label>
                    <input
                        type="text"
                        {...register("question", { required: "Question is required" })}
                        className="w-full px-4 py-2 bg-white border border-brand-black/20 text-brand-black rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
                    />
                    {errors.question && (
                        <p className="mt-1 text-sm text-red-500">{errors.question.message}</p>
                    )}
                </div>

                {/* Answer */}
                <div>
                    <label className="block text-brand-black text-sm font-medium mb-2">
                        Answer
                    </label>
                    <textarea
                        {...register("answer", { required: "Answer is required" })}
                        rows={6}
                        className="w-full px-4 py-2 bg-white border border-brand-black/20 text-brand-black rounded-lg focus:border-brand-teal focus:outline-none transition-colors resize-y"
                    />
                    {errors.answer && (
                        <p className="mt-1 text-sm text-red-500">{errors.answer.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    {initialData && (
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onSuccess();
                            }}
                            className="px-6 py-2 bg-brand-cream text-brand-black rounded-lg font-semibold hover:bg-brand-cream/80 transition-colors border border-brand-black/20"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-brand-yellow text-brand-black rounded-lg font-semibold hover:bg-brand-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : initialData ? 'Update FAQ' : 'Create FAQ'}
                    </button>
                </div>
            </form>
        </AdminFormSection>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */