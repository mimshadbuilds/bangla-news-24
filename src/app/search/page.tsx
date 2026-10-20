import SearchBar from "@/components/shared/SearchBar";
import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { getNews } from "@/lib/news";
import { INewsResponse } from "@/types/news";

const SearchPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) => {
    const { q } = await searchParams;
    const query = q?.trim() ?? "";

    if (!query) {
        return (
            <div className="mx-auto w-full max-w-3xl px-4 py-10">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    সংবাদ খুঁজুন
                </h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    যেকোনো বিষয়, ব্যক্তি বা ঘটনা লিখে খুঁজুন।
                </p>
                <SearchBar className="mt-5 w-full max-w-xl" />
            </div>
        );
    }

    let data: INewsResponse | null = null;
    let failed = false;

    try {
        data = await getNews(20, 0, undefined, query);
    } catch {
        failed = true;
    }

    return (
        <div className="px-4 py-8">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                খোঁজ: “{query}”
            </h1>
            <SearchBar
                key={query}
                defaultValue={query}
                className="mt-4 w-full max-w-xl"
            />

            {failed && (
                <p className="mt-8 text-neutral-600 dark:text-neutral-400">
                    সংবাদ লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
                </p>
            )}

            {!failed && data && data.data.length === 0 && (
                <p className="mt-8 text-neutral-600 dark:text-neutral-400">
                    এই বিষয়ে কোনো সংবাদ পাওয়া যায়নি।
                </p>
            )}

            {!failed && data && data.data.length > 0 && (
                <>
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                        {data.total} টি ফলাফল
                    </p>
                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {data.data.map((news) => (
                            <SelectedNewsCard key={news.id} news={news} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPage;
