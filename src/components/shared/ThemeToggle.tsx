"use client";

import { Moon, Sun } from "@gravity-ui/icons";

const ThemeToggle = () => {
    const toggleTheme = () => {
        const nextIsDark =
            !document.documentElement.classList.contains("dark");

        document.documentElement.classList.toggle("dark", nextIsDark);
        document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
        window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="থিম পরিবর্তন করুন"
            className="flex size-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-red-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-red-400">
            <Sun className="hidden size-5 dark:block" />
            <Moon className="size-5 dark:hidden" />
        </button>
    );
};

export default ThemeToggle;
