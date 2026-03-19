import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import { useLoginModal } from "./useLoginModal";
import usePosts from "./usePosts";
import { toast } from "sonner";
import axios from "axios";
import UsePost from "./usePost";


export const useLike = ({ postId } : {postId : string}) => {

    const {data : currentUser } = useCurrentUser();
    const {data : fetchedPost, mutate: mutateFetchedPost } = UsePost(postId);
    const {mutate : mutateFetchedPosts} = usePosts(currentUser?.id);

   
    
    const loginModal = useLoginModal();
    
    const hasLiked = useMemo(() => {
        return fetchedPost?.existingLike;
    }, [fetchedPost?.existingLike]);


    const toggleLike = useCallback(async () => {

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;            
            
            if(hasLiked)
                request = () => axios.delete("/api/like", {data: { postId } });
            else 
                request = () => axios.post("/api/like", { postId });
            
            await request();
            
            toast.success("Success");
            mutateFetchedPost();
            mutateFetchedPosts();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }

    },[hasLiked,fetchedPost, postId, mutateFetchedPost, mutateFetchedPosts,loginModal,currentUser]);

    return {
        hasLiked,
        toggleLike
    }
}