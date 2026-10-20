"use client";

import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import { INewsItem } from "@/types/news";

const ReadingTracker = ({ news }: { news: INewsItem }) => {
    const { data: session } = authClient.useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) {
            return;
        }

        fetch("/api/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ news }),
        }).catch(() => {
            // Reading history is best-effort; never block the article.
        });
    }, [news, userId]);

    return null;
};

export default ReadingTracker;
