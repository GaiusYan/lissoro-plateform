"use client";
import { useRouter } from "next/navigation";
import { Bs4Circle, BsClockHistory, BsStopCircle } from "react-icons/bs";



export const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push("/")}
            className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            hover:bg-blue-300
            hover:bg-opacity-10
            cursor-pointer
            transition
            ">
                <BsClockHistory size={28} color="white"/>
        </div>
    )
}