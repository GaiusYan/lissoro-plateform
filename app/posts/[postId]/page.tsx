"use client";
import { CommentFeed } from "@/components/comment/commentFeed";
import { PostItem } from "@/components/feed/postItem";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import UsePost from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";


const PostView = () => {
    const params = useParams();
    const { postId } = params;

    const {data : fetchedPost, isLoading } = UsePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }
     return (
        <>
            <Header label="Lissoro" showBackArrow/>
            <PostItem data={fetchedPost}/>
            <Form 
                postId={postId as string}
                isComment
                placeholder="Commentez"
                />
            <CommentFeed comments={fetchedPost?.comments}/>
        </>
    );
};

export default PostView ;