import { getMostRead } from "@/lib/news";
import Link from "next/link";

const MostRead = async () => {
    const data = await getMostRead();
    const mostread = data.data;
    // console.log(mostread);
    return (
        <div className="space-y-2 rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
            <h1 className="px-2 text-lg font-bold text-neutral-900">
                {mostread[0].category}
            </h1>

            <ol className="list-decimal space-y-2 pl-7 marker:text-red-600 marker:text-lg marker:font-bold">
                {mostread.map((mr) => (
                    <li key={mr.id}>
                        <Link href={mr.link}>
                            <h2 className="px-2 text-base font-semibold hover:text-red-700">
                                {mr.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default MostRead;