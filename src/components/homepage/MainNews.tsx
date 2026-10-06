import { INewsSection } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

const MainNews = ({news}: {news: INewsSection}) => {
    const articles = news.articles.filter(
        (item) => item.type === "article" && !item.isLive
    );

    const firstNews = articles[0];
    const otherNews = articles.slice(1, 5);

    if (!firstNews) {
        return null;
    }

    const published = firstNews.firstPublished
        ? new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", { dateStyle: "full" })
        : null;

    return (
        <section className="grid gap-4 h-auto lg:grid-cols-2">
            <Link className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white" href={`/news/${firstNews.id}`}>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    {firstNews.imageUrl && (
                        <figure>
                            <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt ?? firstNews.title}
                            height={500}
                            width={500}
                            />
                        </figure>
                    )}
                </div>
                <div className="p-4">
                    <span className="text-xs font-semibold text-red-700">{firstNews.category}</span>
                    <h2 className="mt-1 text-xl font-bold leading-snug text-neutral-900 group-hover:text-red-700">{firstNews.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{firstNews.description}</p>
                    {published && <p className="mt-2 text-xs text-neutral-400">{published}</p>}
                </div>
            </Link>

            <ul className="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                {otherNews.map((on) => (
                <li key={on.id}>
                    <Link className="flex items-start justify-between gap-3 p-3 hover:bg-neutral-50" href={`/news/${on.id}`}>
                        <div>
                            <span className="text-xs font-semibold text-red-700">{on.category}</span>
                                <h3 className="mt-0.5 font-semibold leading-snug text-neutral-900">
                                    {on.title}
                                </h3>
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
        </section>
    );
};

export default MainNews;
