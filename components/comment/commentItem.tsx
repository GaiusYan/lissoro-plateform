"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { UserAvatar } from "../user/userAvatar";

interface CommentItemsProps {
    data : any;
}

export const CommentItem = ({
    data
}: CommentItemsProps) => {
    
    const router = useRouter();

    const goToUser = useCallback((event : React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        router.push(`/users/${data?.author?.id}`);
    }, [router, data?.author?.id]);


    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data?.createdAt));
    }, [data?.createdAt]); 

    return (
        <div
            className="
            border-b
            border-neutral-900
            p-5
            hover:cursor-pointer
            transition 
            hover:bg-neutral-900
            ">
                <div className=" flex flex-row items-start gap-3">
                    <div onClick={goToUser}>
                        <UserAvatar userId={data?.author?.id}/>
                    </div>
                    <div>
                        <div className="flex flex-row items-center gap-2">
                            <p
                                onClick={goToUser}
                                className="
                                text-white
                                font-semibold
                                cursor-pointer
                                hover:underline">
                                {data?.author?.name}
                            </p>
                            <span
                                onClick={goToUser}
                                className="
                                text-neutral-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
                            ">
                                @{data?.author?.username ? data?.author?.username : data?.author?.email }
                            </span>
                            <span>
                                {createdAt}
                            </span>
                        </div>
                        <div className="text-white mt-1">
                            {data?.content}
                        </div>
                    </div>
                </div>
        </div>
    )
}