"use client";
import useUser from "@/hooks/useUser";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useCallback } from "react";
import { useRouter } from "next/navigation";


interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}


export const UserAvatar = ({
    userId,
    isLarge,
    hasBorder,
}: AvatarProps) => {

    const { data : fetchedUser } = useUser(userId);
    const router = useRouter();

    const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    }, [router, userId]);

    return (
        <Avatar
            className={`
                ${hasBorder ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full 
                hover:opacity-90
                transition
                cursor-pointer
                relative
            `} 
            >
            <AvatarImage
                onClick={onClick}
                alt={`@${fetchedUser?.name? fetchedUser?.name :  fetchedUser?.email }`}
                src={fetchedUser?.profileImage || "/images/placeholder.png"}
            >
            </AvatarImage>
        </Avatar>
    )
}