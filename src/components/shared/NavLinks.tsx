import Link from "next/link";
import { getCategories } from "@/lib/news";

const NavLinks = async () => {
    const data = await getCategories();
    const navItems = data.data;
    const filteredNavs = navItems.filter(n => n.scrapable)
    return (
        <nav className="max-w-7xl mx-auto flex justify-center items-center gap-x-5 gap-y-2 text-sm text-slate-800/90 mt-5">
            <Link href={'/'}>হোম</Link>
            {
                filteredNavs.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}> {category.title}</Link>
                ))
            }
        </nav>
    );
};

export default NavLinks;