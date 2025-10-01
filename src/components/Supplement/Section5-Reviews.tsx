'use client';

import { useEffect, useState } from 'react';
import { ProductReview, ReviewSummary } from "@/types/shopify";
import { getYotpoReviews, getYotpoReviewSummary } from "@/utils/yotpo";
import { PaginatedSlider } from "@/ui/paginated-slider";

interface Section5Props {
    productId: string;
}

export default function Section5Reviews({ productId }: Section5Props) {
    const [reviews, setReviews] = useState<ProductReview[]>([]);
    const [summary, setSummary] = useState<ReviewSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const [reviewsData, summaryData] = await Promise.all([
                    getYotpoReviews(productId, 1, 12), // Get 12 reviews for 4 sets of 3
                    getYotpoReviewSummary(productId)
                ]);

                setReviews(reviewsData.reviews);
                setSummary(summaryData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) {
        return (
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-white text-center">Loading reviews...</div>
                </div>
            </section>
        );
    }

    if (!summary || !reviews.length) {
        return null;
    }

    // Create review cards
    const reviewCards = reviews.map((review) => (
        <div
            key={review.id}
            className="bg-white/5 p-6 border border-white/10 h-full flex flex-col"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating
                                ? 'text-yellow-400'
                                : 'text-white/20'
                                }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                {review.verified && (
                    <span className="text-green-400 text-xs">
                        Verified
                    </span>
                )}
            </div>
            <h3 className="text-white font-bold mb-4 line-clamp-1">
                {review.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-4 flex-grow">
                {review.content}
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>{review.author.name}</span>
                <span>
                    {new Date(review.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    ));

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="text-3xl font-bold text-white">
                            {summary.averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-6 h-6 ${star <= summary.averageRating
                                        ? 'text-yellow-400'
                                        : 'text-white/20'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <div className="text-white/60">
                            {summary.totalReviews} reviews
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <PaginatedSlider
                        interval={3000}
                        className="py-4"
                    >
                        {reviewCards}
                    </PaginatedSlider>
                </div>
            </div>
        </section>
    );
}