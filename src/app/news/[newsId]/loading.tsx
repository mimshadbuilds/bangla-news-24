export default function Loading() {
    return (
        <main
            className="mx-auto w-full max-w-[620px] animate-pulse px-4 py-8 sm:px-0 sm:py-10"
            aria-busy="true"
            aria-live="polite">
            <span className="sr-only">সংবাদ লোড হচ্ছে...</span>
            <div className="h-10 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-4 h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-2 h-4 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-6 h-4 w-2/5 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-7 aspect-[16/9] w-full rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-6 space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800"
                    />
                ))}
            </div>
        </main>
    );
}
