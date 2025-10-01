import { PostBody } from "@/components/blog/post-body";
import { PostHeader } from "@/components/blog/post-header";
import { getPostBySlug } from "@/server-actions/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Post(props: Params) {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	return (
		<main className="min-h-screen bg-black">
			<article>
				<PostHeader
					title={post.title}
					coverImage={post.cover_image || ""}
					date={post.created_at || new Date().toISOString()}
					author={post.author}
				/>
				<PostBody content={post.content || ""} />
				<div id="__clipara-embed" style={{ width: "100%" }}></div>
				{/* Back Button */}
				<div className="max-w-4xl mx-auto px-4 pb-16 flex justify-center">
					<Link
						href="/blog"
						className="inline-block px-8 py-3 bg-black border border-white/20 text-white 
              transition-all duration-300 hover:border-white group relative overflow-hidden"
					>
						<span className="relative z-10">BACK TO STAIT BLOG ARTICLES</span>
						<div
							className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
              transition-transform duration-700 bg-gradient-to-r from-transparent 
              via-white/10 to-transparent"
						/>
					</Link>
				</div>
			</article>
		</main>
	);
}

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	const title = `${post.title}`;

	return {
		title,
		description: post.excerpt,
		openGraph: {
			title,
			description: post.excerpt,
			images: [post.cover_image || ""],
		},
	};
}
