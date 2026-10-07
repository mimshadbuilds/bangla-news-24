import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { getCategory } from "@/lib/news";
import { ICategoryResponse } from "@/types/news";
import { notFound } from "next/navigation";

const CategoryNews = async ({params} : { params: Promise<{ categoryId: string }> }) => {
    const {categoryId} = await params;
    let data: ICategoryResponse;

    try {
        data = await getCategory(categoryId, 9);
    } catch{
        notFound();
    }

    const cateNews = data.data;

    if(!cateNews){
        notFound()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 border-red-700 mt-3 p-1">{data.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                {cateNews.map(news => 
                <SelectedNewsCard key={news.id} news={news} />
                )}
            </div>
        </div>
    );
};

export default CategoryNews;