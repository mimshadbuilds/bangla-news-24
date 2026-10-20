"use client";

import { Copy } from "@gravity-ui/icons";
import { toast } from "@heroui/react";

const ShareButtons = ({ title }: { title: string }) => {
    const getUrl = () => window.location.href;

    const openShare = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer,width=640,height=560");
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(getUrl());
            toast.success("লিংক কপি হয়েছে");
        } catch {
            toast.danger("লিংক কপি করা যায়নি");
        }
    };

    const buttonClass =
        "inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400";

    return (
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-5 dark:border-neutral-700">
            <span className="mr-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                শেয়ার করুন:
            </span>

            <button
                type="button"
                className={buttonClass}
                onClick={() =>
                    openShare(
                        `https://wa.me/?text=${encodeURIComponent(
                            `${title} ${getUrl()}`
                        )}`
                    )
                }>
                WhatsApp
            </button>

            <button
                type="button"
                className={buttonClass}
                onClick={() =>
                    openShare(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            getUrl()
                        )}`
                    )
                }>
                Facebook
            </button>

            <button
                type="button"
                className={buttonClass}
                onClick={() =>
                    openShare(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            title
                        )}&url=${encodeURIComponent(getUrl())}`
                    )
                }>
                X
            </button>

            <button type="button" className={buttonClass} onClick={copyLink}>
                <Copy className="size-4" />
                লিংক কপি
            </button>
        </div>
    );
};

export default ShareButtons;
