type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div
        className="prose prose-lg prose-invert mx-auto
          prose-headings:text-white
          prose-p:text-white/80
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
          prose-strong:text-white
          prose-ul:text-white/80
          prose-ol:text-white/80
          prose-blockquote:text-white/60 prose-blockquote:border-white/20
          prose-hr:border-white/20
          prose-img:rounded-none
          prose-code:text-white/80
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/20"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}