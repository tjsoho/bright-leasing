'use client';

import { useState, useEffect } from 'react';
import BlogForm from "@/components/admin/BlogForm";
import BlogList from "@/components/admin/BlogList";
import { createClient } from "@supabase/supabase-js";
import { BlogPost } from "@/app/types/blog";
import LuxeButton from "@/components/core/LuxeButton";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogAdminPage() {
  const [showList, setShowList] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (showList) {
      fetchPosts();
    }
  }, [showList]);

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setShowList(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      fetchPosts();
    }
  };

  return (
    <ImageLibraryProvider>
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {showList ? 'Manage Blog Posts' : selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <LuxeButton
              onClick={() => {
                setShowList(!showList);
                setSelectedPost(null);
              }}
            >
              {showList ? 'Create New Post' : 'View All Posts'}
            </LuxeButton>
          </div>

          {showList ? (
            isLoading ? (
              <div className="text-white text-center py-12">Loading posts...</div>
            ) : (
              <BlogList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          ) : (
            <BlogForm
              key={selectedPost?.id || 'new'}
              initialData={selectedPost}
              onCancel={() => {
                setSelectedPost(null);
                setShowList(true);
              }}
            />
          )}
        </div>
      </div>
    </ImageLibraryProvider>
  );
}