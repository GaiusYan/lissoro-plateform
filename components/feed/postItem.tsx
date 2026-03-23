"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { UserAvatar } from "../user/userAvatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useLike } from "@/hooks/useLike";


interface PostItemProps{
    data: any;
    userId?: string;
}




export const PostItem = ({
    data,
    userId,
}: PostItemProps)  => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const {data : currentUser } = useCurrentUser();
    
    const {hasLiked, toggleLike} = useLike({ postId: data?.id, userId: userId as string});
    
    const goToUser = useCallback((event : React.MouseEvent<HTMLParagraphElement>) => {
        event.stopPropagation();
        router.push(`/users/${currentUser?.id}`);
    },[currentUser?.id,router]);

  const postId = data?.id;

    const goToPost = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (!postId) return;

        router.push(`/posts/${postId}`);
    }, [postId, router]);

    const onLike = useCallback((event: React.MouseEvent<HTMLParagraphElement>) => {
        event.stopPropagation();

        if (!currentUser?.id) {
            loginModal.onOpen();
        }
        toggleLike();

    }, [currentUser?.id, loginModal,toggleLike]);


    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data?.createdAt));
    },[data.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
    return (
        <div 
            onClick={goToPost}
            className="
                border-b
                border-neutral-800
                p-5
                cursor-pointer
                hover:bg-neutral-900
                transition
            ">
                <div className="flex flex-col items-start gap-3">
                    <UserAvatar userId={data?.author?.id}/>
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
                                @{data?.auth?.username ? data?.auth?.username : data?.auth?.email}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data?.content}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="
                            flex
                            flex-row
                            items-center
                            text-neutral-500
                            gap-2
                            cursor-pointer
                            hover:text-sky-500
                        ">
                            <AiOutlineMessage size={20}/>
                            <p>
                                {data.comment?.length || 0}
                            </p>
                        </div>
                        <div 
                            onClick={onLike}
                            className="
                            flex
                            flex-row
                            items-center
                            text-neutral-500
                            gap-2
                            cursor-pointer
                            hover:text-red-500
                        ">
                            <LikeIcon size={20}/>
                            <p>
                                {data.likeIds.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
}


