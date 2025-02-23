import Link from "next/link";
import React from "react";

interface ILinkItemProps {
    link: string;
    icon: React.ReactNode;
    title: string;
    setIsOpen: () => void;
}

const LinkItem = (props: ILinkItemProps) => {
    const { link, icon, title, setIsOpen } = props;
    return (
        <Link href={link} onClick={setIsOpen} className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-black">
            {icon}
            {title}
        </Link>
    );
};

export default LinkItem;
