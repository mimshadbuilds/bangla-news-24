"use client";

import { TrashBin } from "@gravity-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { authClient } from "@/lib/auth-client";
import { IHistoryNews } from "@/types/library";

const HistoryPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [items, setItems] = useState<IHistoryNews[] | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (isPending || !userId) {
            return;
        }

        let cancelled = false;

        fetch("/api/history")
            .then((response) =>
                response.ok
                    ? response.json()
                    : Promise.reject(new Error("Failed to load history"))
            )
            .then((payload: { data: IHistoryNews[] }) => {
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

    const clearHistory = async () => {
        const previousItems = items ?? [];

        setItems([]);

        try {
            const response = await fetch("/api/history", { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Failed to clear history");
            }
        } catch {
            setItems(previousItems);
        }
    };

    return (
        <main className="px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        পড়ার ইতিহাস
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        সম্প্রতি পড়া সংবাদ।
                    </p>
                </div>

                {items && items.length > 0 && (
                    <button
                        type="button"
                        onClick={clearHistory}
                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400">
                        <TrashBin className="size-4" />
                        ইতিহাস মুছুন
                    </button>
                )}
            </div>

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
                    পড়ার ইতিহাস লোড করা যায়নি।
                </p>
            )}

            {items?.length === 0 && !failed && (
                <div className="mt-10 text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        এখনো কোনো সংবাদ পড়া হয়নি।
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
                        <div key={news.id}>
                            <SelectedNewsCard news={news} />
                            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                                পঠিত:{" "}
                                {new Date(news.viewedAt).toLocaleString("bn-BD", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default HistoryPage;
