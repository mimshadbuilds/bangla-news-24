import Image from "next/image";
import Link from "next/link";
import { INewsItem } from "@/types/news";

const SelectedNewsCard = ({news}: {news: INewsItem}) => {
    const published = news.firstPublished
        ? new Date(news.firstPublished).toLocaleDateString("bn-BD", { dateStyle: "full" })
        : null;
        
    const newsHref =
        news.type === "article" && !news.isLive
            ? `/news/${news.id}`
            : news.link;

    return (
        <section className="h-full">
            <Link className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white" href={newsHref} >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    {news.imageUrl && (
                        <figure>
                            <Image
                            src={news.imageUrl}
                            alt={news.imageAlt ?? news.title}
                            height={500}
                            width={500}
                            className="h-full w-full object-cover"
                            />
                        </figure>
                    )}
                </div>
                <div className="p-4">
                    <span className="text-xs font-semibold text-red-700">{news.category}</span>
                    <h2 className="mt-1 text-xl font-bold leading-snug text-neutral-900 group-hover:text-red-700">{news.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{news.description}</p>
                    {published && <p className="mt-2 text-xs text-neutral-400">{published}</p>}
                </div>
            </Link>
        </section>
    );
};

export default SelectedNewsCard;
