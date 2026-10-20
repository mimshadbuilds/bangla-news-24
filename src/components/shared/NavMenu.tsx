"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/news";

const activeLinkClass = "font-bold text-red-700 dark:text-red-400";

const NavMenu = ({ categories }: { categories: ICategory[] }) => {
    const pathname = usePathname();
    const isHomeActive = pathname === "/";

    return (
        <nav className="no-scrollbar mt-3 flex items-center gap-4 overflow-x-auto whitespace-nowrap px-1 pb-1 text-sm text-slate-800/90 dark:text-neutral-300 sm:mt-5 sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2 sm:overflow-visible sm:px-0">
            <Link
                href={'/'}
                aria-current={isHomeActive ? "page" : undefined}
                className={`shrink-0 py-1 ${isHomeActive ? activeLinkClass : ""}`}>
                হোম
            </Link>
            {categories.map((category) => {
                const isActive = pathname === `/category/${category.slug}`;

                return (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`shrink-0 py-1 ${isActive ? activeLinkClass : ""}`}>
                        {category.title}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavMenu;
