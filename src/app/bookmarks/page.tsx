"use client";

import { TrashBin } from "@gravity-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { authClient } from "@/lib/auth-client";
import { ISavedNews } from "@/types/library";

const BookmarksPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [items, setItems] = useState<ISavedNews[] | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (isPending || !userId) {
            return;
        }

        let cancelled = false;

        fetch("/api/bookmarks")
            .then((response) =>
                response.ok
                    ? response.json()
                    : Promise.reject(new Error("Failed to load bookmarks"))
            )
            .then((payload: { data: ISavedNews[] }) => {
                if (!cancelled) {
                    setItems(payload.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setFailed(true);
                    setItems([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [isPending, userId]);

    const removeBookmark = async (id: string) => {
        const previousItems = items ?? [];

        setItems(previousItems.filter((item) => item.id !== id));

        try {
            const response = await fetch(
                `/api/bookmarks?id=${encodeURIComponent(id)}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to remove bookmark");
            }
        } catch {
            setItems(previousItems);
        }
    };

    return (
        <main className="px-4 py-8">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                সংরক্ষিত সংবাদ
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                পরে পড়ার জন্য সংরক্ষণ করা সংবাদ।
            </p>

            {items === null && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
                        />
                    ))}
                </div>
            )}

            {failed && (
                <p className="mt-6 text-neutral-600 dark:text-neutral-400">
                    সংরক্ষিত সংবাদ লোড করা যায়নি।
                </p>
            )}

            {items?.length === 0 && !failed && (
                <div className="mt-10 text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        এখনো কোনো সংবাদ সংরক্ষণ করা হয়নি।
                    </p>
                    <Link
                        href="/"
                        className="mt-4 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">
                        সংবাদ পড়ুন
                    </Link>
                </div>
            )}

            {items && items.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {items.map((news) => (
                        <div key={news.id} className="flex flex-col gap-2">
                            <SelectedNewsCard news={news} />
                            <button
                                type="button"
                                onClick={() => removeBookmark(news.id)}
                                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400">
                                <TrashBin className="size-4" />
                                সরান
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default BookmarksPage;
