import { PostBody } from "@/components/blog/post-body";
import { getPostBySlug } from "@/server-actions/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default async function Post(props: Params) {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	return (
		<main className="min-h-screen bg-white">
			{/* ************************************************************
								HERO SECTION
			************************************************************ */}
			<section className="bg-brand-yellow/10 border-b border-brand-yellow/20">
				<div className="max-w-4xl mx-auto px-4 py-16">
					{/* ************************************************************
										BACK BUTTON
					************************************************************ */}
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-yellow transition-colors duration-300 mb-8 group"
					>
						<ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
						<span className="font-medium">Back to Articles</span>
					</Link>

					{/* ************************************************************
										POST HEADER
					************************************************************ */}
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-6 leading-tight">
							{post.title}
						</h1>

						{/* ************************************************************
											META INFORMATION
						************************************************************ */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-brand-black/70 mb-8">
							<div className="flex items-center gap-2">
								<User className="w-4 h-4" />
								<span className="font-medium">{post.author}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								<span>{new Date(post.created_at || new Date().toISOString()).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}</span>
							</div>
						</div>

						{/* ************************************************************
											COVER IMAGE
						************************************************************ */}
						{post.cover_image && (
							<div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-brand-yellow/20 shadow-lg">
								<img
									src={post.cover_image}
									alt={post.title}
									className="w-full h-full object-cover"
								/>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* ************************************************************
								CONTENT SECTION
			************************************************************ */}
			<article className="max-w-4xl mx-auto px-4 py-16">
				<div className="prose prose-lg max-w-none">
					<PostBody content={post.content || ""} />
				</div>

				{/* ************************************************************
									CLIPARA EMBED
				************************************************************ */}
				<div id="__clipara-embed" style={{ width: "100%" }}></div>
			</article>

			{/* ************************************************************
								FOOTER SECTION
			************************************************************ */}
			<section className="bg-brand-cream/30 border-t border-brand-yellow/20">
				<div className="max-w-4xl mx-auto px-4 py-12">
					<div className="text-center">
						<h3 className="text-2xl font-bold text-brand-black mb-4">
							Enjoyed this article?
						</h3>
						<p className="text-brand-black/70 mb-8">
							Stay updated with our latest insights and tips on novated leasing.
						</p>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 px-8 py-3 bg-brand-yellow text-brand-black rounded-full font-semibold hover:bg-brand-yellow/80 transition-colors duration-300 shadow-md"
						>
							<span>View All Articles</span>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>
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
