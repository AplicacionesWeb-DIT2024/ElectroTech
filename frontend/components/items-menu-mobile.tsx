import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="#" className="block">Notebooks</Link>
                <Link href="#" className="block">Smartphones</Link>
                <Link href="#" className="block">Tablets</Link>
            </PopoverContent>
        </Popover>
    );
}

export default ItemsMenuMobile;