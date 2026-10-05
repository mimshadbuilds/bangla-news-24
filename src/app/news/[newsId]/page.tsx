import { ArticleBody } from "@/components/shared/ArticlesCard";
import { getArticle } from "@/lib/news";
import { IArticleResponse } from "@/types/news";
import Image from "next/image";

const DetailsNews = async ({ params }: { params: Promise<{ newsId: string }>;
}) => {
    const { newsId } = await params;
    const data: IArticleResponse = await getArticle(newsId);
    const news = data.data;

    return (
        <main className="mx-auto w-full max-w-[620px] px-4 py-8 sm:px-0 sm:py-10">
            <article>
                <header>
                    <h1 className="text-[30px] font-bold leading-[1.35] tracking-[-0.02em] text-neutral-900">
                        {news.title}
                    </h1>
                    {news.description?.blocks.map((block, index) =>
                        block.model.blocks.map((paragraph, paragraphIndex) => (
                            <p
                                key={`${index}-${paragraphIndex}`}
                                className="mt-5 text-[16px] leading-[1.7] text-neutral-600"
                            >
                                {paragraph.model.text}
                            </p>
                        ))
                    )}
                    <div className="mt-5 border-y border-neutral-200 py-3">
                        <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                            {news.firstPublished && (
                                <time dateTime={news.firstPublished}>
                                    {new Date(
                                        news.firstPublished
                                    ).toLocaleString("bn-BD", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </time>
                            )}
                            <span>{news.wordCount} শব্দ</span>
                        </div>
                    </div>
                </header>
                {news.imageUrl && (
                    <figure className="mt-7">
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src={news.imageUrl}
                                alt={news.imageAlt ?? news.title}
                                width={1200}
                                height={675}
                                priority
                                className="h-auto w-full object-cover"
                            />
                        </div>
                        {news.imageAlt && (
                            <figcaption className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                                {news.imageAlt}
                            </figcaption>
                        )}
                    </figure>
                )}
                <div className="mt-5">
                    <ArticleBody body={news.body.slice(1)} />
                </div>
                {news.tags.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200 pt-5">
                        {news.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>
        </main>
    );
};

export default DetailsNews;