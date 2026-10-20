import { getCategories } from "@/lib/news";
import NavMenu from "./NavMenu";

const NavLinks = async () => {
    const data = await getCategories();
    const navItems = data.data.filter(n => n.scrapable)

    return <NavMenu categories={navItems} />;
};

export default NavLinks;
