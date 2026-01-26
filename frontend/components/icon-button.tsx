import { cn } from '@/lib/utils'
import Link from "next/link";

interface IconButtonProps {
    onClick?: () => void;
    href?: string;            // ← añadimos esto
    icon: React.ReactElement;
    className?: string;
    ariaLabel?: string
}

const IconButton = ({ onClick, href, icon, className,ariaLabel }: IconButtonProps) => {
    
    const baseClasses = cn(
        "rounded-full flex items-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
    );

    // Si tiene href → renderizamos <Link> (activa NextTopLoader)
    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {icon}
            </Link>
        );
    }

    // Caso normal → botón
    return (
        <button onClick={onClick} className={baseClasses} aria-label={ariaLabel}>
            {icon}
        </button>
    );
}

export default IconButton;
