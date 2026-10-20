"use client";

import { Bookmark, BookmarkFill } from "@gravity-ui/icons";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { INewsItem } from "@/types/news";

const BookmarkButton = ({ news }: { news: INewsItem }) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!userId) {
            return;
        }

        let cancelled = false;

        fetch("/api/bookmarks")
            .then((response) =>
                response.ok
                    ? response.json()
                    : Promise.reject(new Error("Failed to load bookmarks"))
            )
            .then((payload: { data?: { id: string }[] }) => {
                if (!cancelled) {
                    setSaved(
                        Boolean(payload.data?.some((item) => item.id === news.id))
                    );
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setSaved(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [news.id, userId]);

    const toggleBookmark = async () => {
        if (!userId) {
            router.push("/sign-in");
            return;
        }

        setIsSaving(true);

        try {
            const response = saved
                ? await fetch(
                      `/api/bookmarks?id=${encodeURIComponent(news.id)}`,
                      { method: "DELETE" }
                  )
                : await fetch("/api/bookmarks", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ news }),
                  });

            if (!response.ok) {
                throw new Error("Bookmark request failed");
            }

            setSaved(!saved);
            toast.success(
                saved
                    ? "সংবাদটি সংরক্ষিত তালিকা থেকে সরানো হয়েছে"
                    : "সংবাদটি সংরক্ষণ করা হয়েছে"
            );
        } catch {
            toast.danger("সংবাদটি সংরক্ষণ করা যায়নি, আবার চেষ্টা করুন");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleBookmark}
            disabled={isSaving || isPending}
            aria-pressed={saved}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                saved
                    ? "border-red-700 bg-red-700 text-white hover:bg-red-800"
                    : "border-neutral-300 text-neutral-700 hover:border-red-700 hover:text-red-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400"
            }`}>
            {saved ? (
                <BookmarkFill className="size-4" />
            ) : (
                <Bookmark className="size-4" />
            )}
            {saved ? "সংরক্ষিত" : "সংরক্ষণ করুন"}
        </button>
    );
};

export default BookmarkButton;
