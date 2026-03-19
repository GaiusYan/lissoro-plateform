"use client";
import { FaUser } from "react-icons/fa"
import { SidebarLogo } from "./sidebar/sidebarLogo"
import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { SidebarItem } from "./sidebar/sidebarItem"
import { SidebarTweetButton } from "./sidebar/sidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";


export const Sidebar = () => {

    const {data : currentUser} = useCurrentUser();

    

    const items = [
        {
            label : "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label : "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth: true,
        },
        {
            label : "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true,
        },


    ]

    return (
        <div 
        className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-57.2">
                    <SidebarLogo/>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            auth={item.auth}
                            label={item.label}
                            href={item.href}
                            
                        />
                    ))}
                    {currentUser && (
                        <SidebarItem
                            onClick={() => signOut()}
                            icon={BiLogOut}
                            label="logout"
                            href=""
                        />
                    )}
                    <SidebarTweetButton/>
                </div>
            </div>
        </div>
    )
}