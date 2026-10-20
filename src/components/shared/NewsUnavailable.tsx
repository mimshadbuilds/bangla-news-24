import Link from "next/link";

interface NewsUnavailableProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
}

const NewsUnavailable = ({
    title = "সংবাদ লোড করা সম্ভব হয়নি",
    description = "সংবাদ সার্ভারে সাময়িক সমস্যা হচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
    actionLabel = "আবার চেষ্টা করুন",
    actionHref = "/",
}: NewsUnavailableProps) => {
    return (
        <div className="mx-auto flex min-h-[50vh] w-full max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
            <div
                className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="size-7">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                </svg>
            </div>
            <h1 className="mt-5 text-xl font-bold text-neutral-900 sm:text-2xl dark:text-neutral-100">
                {title}
            </h1>
            <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {description}
            </p>
            <Link
                href={actionHref}
                className="mt-6 rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950">
                {actionLabel}
            </Link>
        </div>
    );
};

export default NewsUnavailable;
