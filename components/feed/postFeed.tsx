"use client";
import usePosts from "@/hooks/usePosts"
import { ClipLoader } from "react-spinners";
import { PostSkeleton } from "./postSkeleton";
import { PostItem } from "./postItem";


interface PostFeedProps {
    userId?: string;
}


export const PostFeed = ({ userId } : PostFeedProps) => {

    const {data : posts = [], isLoading } = usePosts(userId);
    
    if (isLoading) {
        return (
            <PostSkeleton/>
        )
    }
    return (
        <div>
            {posts.map((post) => (
                <PostItem
                    key={post?.id}
                    userId={userId}
                    data={post}
                />
            ))}
        </div>
    )
}