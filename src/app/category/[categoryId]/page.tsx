import Pagination from "@/components/shared/Pagination";
import NewsUnavailable from "@/components/shared/NewsUnavailable";
import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { getCategory, NewsApiError } from "@/lib/news";
import { ICategoryResponse } from "@/types/news";
import { notFound } from "next/navigation";

const PAGE_SIZE = 9;

const CategoryNews = async ({ params, searchParams }: {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ page?: string }>;
}) => {
    const { categoryId } = await params;
    const { page: pageParam } = await searchParams;
    const parsedPage = Number.parseInt(pageParam ?? "1", 10);
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    let data: ICategoryResponse;

    try {
        data = await getCategory(categoryId, PAGE_SIZE, page);
    } catch (error) {
        if (error instanceof NewsApiError && error.status === 404) {
            notFound();
        }

        return (
            <NewsUnavailable
                title="বিভাগটি এখন পাওয়া যাচ্ছে না"
                description="সংবাদ সার্ভারে সাময়িক সমস্যা হচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                actionLabel="হোমে ফিরুন"
            />
        );
    }

    const cateNews = data.data;

    if(!cateNews){
        notFound()
    }

    const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

    return (
        <div className="px-4">
            <h1 className="text-2xl font-bold border-b-2 border-red-700 mt-3 p-1 dark:text-neutral-100">{data.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                {cateNews.map(news => 
                <SelectedNewsCard key={news.id} news={news} />
                )}
            </div>
            <Pagination
                basePath={`/category/${categoryId}`}
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
};

export default CategoryNews;
