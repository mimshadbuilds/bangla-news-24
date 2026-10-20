import { getNews } from "@/lib/news";
import { INewsItem } from "@/types/news";
import SelectedNewsCard from "./SelectedNewsCard";

const RelatedNews = async ({
    category,
    currentId,
}: {
    category?: string | null;
    currentId: string;
}) => {
    let related: INewsItem[] = [];

    try {
        // The article endpoint can omit `category`; fall back to the news list
        // entry for the same id.
        let categoryTitle = category?.trim() ?? "";

        if (!categoryTitle) {
            const latest = await getNews(100);
            categoryTitle =
                latest.data.find((item) => item.id === currentId)?.category ?? "";
        }

        if (!categoryTitle) {
            return null;
        }

        // `getNews` filters by category title (e.g. "প্রধান খবর"), which is
        // what news items expose — unlike the slug used by /api/category.
        const data = await getNews(4, 0, categoryTitle);

        related = data.data
            .filter(
                (item) =>
                    item.id !== currentId &&
                    item.type === "article" &&
                    !item.isLive
            )
            .slice(0, 3);
    } catch {
        return null;
    }

    if (related.length === 0) {
        return null;
    }

    return (
        <section className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                আরও পড়ুন
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((item) => (
                    <SelectedNewsCard key={item.id} news={item} />
                ))}
            </div>
        </section>
    );
};

export default RelatedNews;
