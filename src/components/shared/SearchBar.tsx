"use client";

import { Magnifier } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SearchBar = ({
    defaultValue = "",
    className = "",
}: {
    defaultValue?: string;
    className?: string;
}) => {
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const query = String(formData.get("q") ?? "").trim();

        router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    };

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className={`relative ${className}`}>
            <input
                type="search"
                name="q"
                defaultValue={defaultValue}
                placeholder="সংবাদ খুঁজুন..."
                aria-label="সংবাদ খুঁজুন"
                className="w-full rounded-full border border-neutral-300 bg-white py-2 pl-4 pr-11 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
            <button
                type="submit"
                aria-label="খুঁজুন"
                className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-red-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-red-400">
                <Magnifier className="size-5" />
            </button>
        </form>
    );
};

export default SearchBar;
