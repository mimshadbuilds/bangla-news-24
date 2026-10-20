import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/news";
import { ICategory } from "@/types/news";

const quickLinks = [
    { href: "/", label: "হোম" },
    { href: "/search", label: "সংবাদ খুঁজুন" },
    { href: "/bookmarks", label: "বুকমার্ক" },
    { href: "/history", label: "পড়ার ইতিহাস" },
    { href: "/profile", label: "প্রোফাইল" },
];

const linkClass =
    "text-neutral-600 transition-colors hover:text-red-700 dark:text-neutral-400 dark:hover:text-red-400";

const Footer = async () => {
    let categories: ICategory[] = [];

    try {
        const data = await getCategories();
        categories = Array.isArray(data.data)
            ? data.data.filter((category) => category.scrapable)
            : [];
    } catch {
        categories = [];
    }

    const year = new Date().toLocaleDateString("bn-BD", { year: "numeric" });

    return (
        <footer className="mt-8 border-t-2 border-red-700 bg-neutral-100 sm:mt-12 dark:bg-neutral-900">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-8">
                    <div className="sm:col-span-2 lg:col-span-5">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 dark:focus-visible:ring-offset-neutral-900">
                            <Image
                                src="/news-24.png"
                                alt="News 24"
                                width={44}
                                height={44}
                                className="h-10 w-10 rounded-lg object-contain"
                            />
                            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                News 24
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                            বাংলা ভাষায় সর্বশেষ সংবাদ, বিশ্লেষণ ও গুরুত্বপূর্ণ ঘটনাপ্রবাহ — নির্ভরযোগ্যভাবে, এক জায়গায়।
                        </p>
                        <p className="mt-4 text-xs font-semibold text-red-700 dark:text-red-400">
                            ২৪ ঘণ্টা সংবাদ আপডেট
                        </p>
                    </div>

                    {categories.length > 0 && (
                        <nav aria-labelledby="footer-categories" className="lg:col-span-4">
                            <h2
                                id="footer-categories"
                                className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                বিভাগসমূহ
                            </h2>
                            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:mt-4 sm:gap-y-2.5">
                                {categories.map((category) => (
                                    <li key={category.slug}>
                                        <Link
                                            href={`/category/${category.slug}`}
                                            className={linkClass}>
                                            {category.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <nav
                        aria-labelledby="footer-links"
                        className={categories.length > 0 ? "lg:col-span-3" : "sm:col-span-2 lg:col-span-7"}>
                        <h2
                            id="footer-links"
                            className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            দ্রুত লিংক
                        </h2>
                        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:mt-4 sm:grid-cols-1 sm:gap-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={linkClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-8 flex flex-col gap-2 border-t border-neutral-300 pt-5 text-xs text-neutral-500 justify-center sm:mt-10 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800 dark:text-neutral-400">
                    <p>© {year} News 24। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>সংবাদ তথ্য: News API</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
