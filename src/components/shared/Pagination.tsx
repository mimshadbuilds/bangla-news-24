import Link from "next/link";
import { Fragment } from "react";

const Pagination = ({
    basePath,
    currentPage,
    totalPages,
}: {
    basePath: string;
    currentPage: number;
    totalPages: number;
}) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    ).filter(
        (page) =>
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1
    );

    const hrefFor = (page: number) =>
        page === 1 ? basePath : `${basePath}?page=${page}`;

    const navButtonClass =
        "rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400";
    const disabledClass = "pointer-events-none opacity-40";

    return (
        <nav
            aria-label="পৃষ্ঠা নির্বাচন"
            className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
                href={hrefFor(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage <= 1}
                className={`${navButtonClass} ${
                    currentPage <= 1 ? disabledClass : ""
                }`}>
                পূর্ববর্তী
            </Link>

            {pages.map((page, index) => {
                const previousPage = pages[index - 1];

                return (
                    <Fragment key={page}>
                        {previousPage && page - previousPage > 1 && (
                            <span className="px-1 text-neutral-400 dark:text-neutral-500">
                                …
                            </span>
                        )}
                        <Link
                            href={hrefFor(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={
                                page === currentPage
                                    ? "rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold text-white"
                                    : navButtonClass
                            }>
                            {page}
                        </Link>
                    </Fragment>
                );
            })}

            <Link
                href={hrefFor(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage >= totalPages}
                className={`${navButtonClass} ${
                    currentPage >= totalPages ? disabledClass : ""
                }`}>
                পরবর্তী
            </Link>
        </nav>
    );
};

export default Pagination;
