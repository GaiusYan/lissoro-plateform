"use client";

import { Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { Button } from "../ui/button";


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
            <Button className="
                relative
                rounded-full
                h-14
                w-14
                flex
                items-center
                justify-center
                p-4
                cursor-pointer
                lg:hidden
            "
            variant={"outline"}>
                <Icon
                    color="white"
                    size={28}/>
                    {alert ? <BsDot className="text-sky-500 -top-4 left-0" size={70} /> : null}
            </Button>
           
            <Button 
                className="
                    relative
                    hidden
                    lg:flex
                    items-row
                    gap-4
                    p-4
                    rounded-full
                    cursor-pointer
                    items-center
                " variant={"ghost"}>
                <Icon color="white" size={28}/>
                <p 
                    className="
                        hidden 
                        lg:block 
                        text-sm 
                        font-normal">
                    {label}
                </p>
                {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70}/> : null}
            </Button>
        </div>
    )
}