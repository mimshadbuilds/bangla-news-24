import Link from "next/link";
import { ICategoriesResponse, ICategory } from "@/types/news";

const NavLinks = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories', {
        method: 'GET',
        cache: 'no-store',  
    });
    const data: ICategoriesResponse = await res.json();
    const navItems = data.data;
    const filteredNavs = navItems.filter(n => n.scrapable)
    return (
        <nav className="max-w-7xl mx-auto flex justify-center items-center gap-x-5 gap-y-2 text-sm text-slate-800/90 mt-5">
            <Link href={'/'}>হোম</Link>
            {
                filteredNavs.map((category: ICategory) => (
                    <Link key={category.slug} href={category.url}>{category.title}</Link>
                ))
            }
        </nav>
    );
};

export default NavLinks;