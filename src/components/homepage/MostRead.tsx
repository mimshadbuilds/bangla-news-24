import { getMostRead } from "@/lib/news";
import Link from "next/link";

const MostRead = async () => {
    const data = await getMostRead().catch(() => null);

    if (!data) {
        return null;
    }

    const mostread = Array.isArray(data.data)
        ? data.data.filter(
              (item) => item.type === "article" && !item.isLive
          )
        : [];

    if (mostread.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2 rounded-xl border border-gray-200 px-5 py-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {mostread.length > 0 && (
                <>
                    <h1 className="px-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {mostread[0].category}
                    </h1>

                    <ol className="list-decimal space-y-2 pl-7 marker:text-red-600 marker:text-lg marker:font-bold dark:marker:text-red-400">
                        {mostread.map((mr) => (
                            <li key={mr.id}>
                                <Link href={`/news/${mr.id}`}>
                                    <h2 className="px-2 text-base font-semibold hover:text-red-700 dark:text-neutral-200 dark:hover:text-red-400">
                                        {mr.title}
                                    </h2>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </div>
    );
};

export default MostRead;