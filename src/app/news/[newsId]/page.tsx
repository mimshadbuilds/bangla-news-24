import { ArticleBody } from "@/components/shared/ArticlesCard";
import BookmarkButton from "@/components/shared/BookmarkButton";
import NewsUnavailable from "@/components/shared/NewsUnavailable";
import ReadingTracker from "@/components/shared/ReadingTracker";
import RelatedNews from "@/components/shared/RelatedNews";
import ShareButtons from "@/components/shared/ShareButtons";
import { getArticle, NewsApiError } from "@/lib/news";
import { IArticleResponse, INewsItem } from "@/types/news";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const DetailsNews = async ({ params }: { params: Promise<{ newsId: string }>;
}) => {
    const { newsId } = await params;

    let data: IArticleResponse;

    try {
        data = await getArticle(newsId);
    } catch (error) {
        if (error instanceof NewsApiError && error.status === 404) {
            notFound();
        }

        return (
            <NewsUnavailable
                title="সংবাদটি এখন পাওয়া যাচ্ছে না"
                description="সংবাদ সার্ভারে সাময়িক সমস্যা হচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                actionLabel="হোমে ফিরুন"
            />
        );
    }
    
    const news = data.data;
    
    if(!news){
        notFound();
    }

    const libraryItem: INewsItem = {
        id: news.id,
        title: news.title,
        description:
            news.description?.blocks
                .flatMap((block) => block.model.blocks)
                .map((paragraph) => paragraph.model.text)
                .join(" ")
                .trim() || null,
        link: news.link,
        imageUrl: news.imageUrl,
        imageAlt: news.imageAlt,
        category: news.category,
        type: news.type,
        isLive: news.isLive,
        firstPublished: news.firstPublished,
        lastPublished: news.lastPublished,
        source: news.source,
    };

    return (
        <main className="mx-auto w-full max-w-[620px] px-4 py-8 sm:px-0 sm:py-10">
            <article>
                <header>
                    <h1 className="text-[30px] font-bold leading-[1.35] tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
                        {news.title}
                    </h1>
                    {news.description?.blocks.map((block, index) =>
                        block.model.blocks.map((paragraph, paragraphIndex) => (
                            <p
                                key={`${index}-${paragraphIndex}`}
                                className="mt-5 text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
                                {paragraph.model.text}
                            </p>
                        ))
                    )}
                    <div className="mt-5 border-y border-neutral-200 py-3 dark:border-neutral-700">
                        <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
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
                    <div className="mt-4">
                        <BookmarkButton news={libraryItem} />
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
                            <figcaption className="mt-2 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                                {news.imageAlt}
                            </figcaption>
                        )}
                    </figure>
                )}
                <div className="mt-5">
                    <ArticleBody body={news.body.slice(1)} />
                </div>
                {news.tags.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200 pt-5 dark:border-neutral-700">
                        {news.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <ShareButtons title={news.title} />
            </article>
            <Suspense fallback={null}>
                <RelatedNews category={news.category} currentId={news.id} />
            </Suspense>
            <ReadingTracker news={libraryItem} />
        </main>
    );
};

export default DetailsNews;
