export default function Loading() {
    return (
        <div
            className="mx-auto w-full max-w-7xl px-4 py-5"
            aria-busy="true"
            aria-live="polite">
            <span className="sr-only">সংবাদ লোড হচ্ছে...</span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <div className="h-72 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
                            />
                        ))}
                    </div>
                </div>
                <div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
            </div>
        </div>
    );
}
