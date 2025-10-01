'use client';


import { BlogPost } from '@/app/types/blog';
import Image from 'next/image';
import LuxeButton from '@/components/core/LuxeButton';

interface BlogListProps {
    posts: BlogPost[];
    onEdit: (post: BlogPost) => void;
    onDelete: (id: string) => void;
}

export default function BlogList({ posts, onEdit, onDelete }: BlogListProps) {
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-black border border-white/20 p-6">
                    <div className="flex items-start gap-6">
                        {post.cover_image && (
                            <div className="relative w-48 aspect-[16/9]">
                                <Image
                                    src={post.cover_image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                            {post.excerpt && (
                                <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                                <span>{post.author}</span>
                                <span>{new Date(post.created_at || '').toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-4">
                                <LuxeButton
                                    onClick={() => onEdit(post)}
                                    className="!px-4 !py-2 text-sm"
                                >
                                    Edit Post
                                </LuxeButton>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this post?')) {
                                            if (post.id) onDelete(post.id);
                                        }
                                    }}
                                    className="px-4 py-2 text-sm text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
