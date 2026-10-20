import { getCategories } from "@/lib/news";
import NavMenu from "./NavMenu";

const NavLinks = async () => {
    const data = await getCategories().catch(() => null);
    const navItems =
        data && Array.isArray(data.data)
            ? data.data.filter(n => n.scrapable)
            : [];

    return <NavMenu categories={navItems} />;
};

export default NavLinks;
