'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
    title: string;
    excerpt?: string;
    coverImage?: string;
    slug: string;
    author: string;
    date: string;
}

export default function BlogCard({
    title,
    excerpt,
    coverImage,
    slug,
    author,
    date
}: BlogCardProps) {
    return (
        <Link
            href={`/blog/posts/${slug}`}
            className="block bg-black border border-white/20 group transition-all duration-300 hover:border-white"
        >
            <div className="relative aspect-[16/9] overflow-hidden">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-black" />
                )}
            </div>
            <div className="p-6 space-y-3">
                <h2 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {title}
                </h2>
                {excerpt && (
                    <p className="text-white/70 line-clamp-2">
                        {excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between text-sm text-white/50">
                    <span>{author}</span>
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    );
}
