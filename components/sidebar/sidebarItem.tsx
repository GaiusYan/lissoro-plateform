"use client";

import { Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";


interface SidebarItemProps {
    label: string;
    href: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}


export const SidebarItem = ({
    label,
    href,
    onClick,
    icon: Icon,
    auth,
    alert,

}: SidebarItemProps) => {

    const router = useRouter();
    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (href) {
            router.push(href);
        }
    }, [onClick, router, href]);

    return (
        <div 
        onClick={handleClick}
        className="flex flex-row items-center">
            <div className="
            relative
            rounded-full
            h-14
            w-14
            flex
            items-center
            justify-center
            p-4
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            lg:hidden
            ">
                <Icon
                    color="white"
                    size={28}/>
                    {alert ? <BsDot className="text-sky-500 -top-4 left-0" size={70} /> : null} 
            </div>
            <div 
            className="
                relative
                hidden
                lg:flex
                items-row
                gap-4
                p-4
                rounded-full
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
                items-center
            ">
                <Icon color="white" size={28}/>
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
                {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70}/> : null}
            </div>
        </div>
    )
}