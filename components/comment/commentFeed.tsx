import { CommentItem } from "./commentItem";


interface CommentFeedProps {
    comments: any;
}


export const CommentFeed = ({
    comments
}: CommentFeedProps) => {
    return (
        <>
            {comments?.map((comment: any) => (
                <CommentItem data={comment} key={comment?.id}/>
            ))}
        </>
    )
}