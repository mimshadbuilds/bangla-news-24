"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/news";

const activeLinkClass = "font-bold text-red-700 dark:text-red-400";

const NavMenu = ({ categories }: { categories: ICategory[] }) => {
    const pathname = usePathname();
    const isHomeActive = pathname === "/";

    return (
        <nav className="max-w-7xl mx-auto flex justify-center items-center gap-x-5 gap-y-2 text-sm text-slate-800/90 dark:text-neutral-300 mt-5">
            <Link
                href={'/'}
                aria-current={isHomeActive ? "page" : undefined}
                className={isHomeActive ? activeLinkClass : undefined}>
                হোম
            </Link>
            {categories.map((category) => {
                const isActive = pathname === `/category/${category.slug}`;

                return (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={isActive ? activeLinkClass : undefined}>
                        {category.title}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavMenu;
