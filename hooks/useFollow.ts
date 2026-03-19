import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import { useLoginModal } from "./useLoginModal";
import useUser from "./useUser";
import axios from "axios";
import { toast } from "sonner";



export const useFollow = (userId : string) => {

    const {data: currentUser, mutate : mutateCurrentUser} = useCurrentUser();
    const {mutate : mutateFetchedUser, data: user} = useUser(userId);

   
    

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(user?.id);
    }, [user?.id, currentUser?.followingIds]);


    const toggleFollow = useCallback(async () =>  {

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {      
            let request;
            if (isFollowing) {
                request = () => axios.delete("/api/follow", {data : { userId}});
            } else 
                request = () => axios.post("/api/follow", { userId })
            
            await request();
    
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Following success");
        } catch (error) {
            console.log(error);
            toast.error("Something wrent wrong");
        }
    }, [isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal, currentUser]);

    return {
        isFollowing,
        toggleFollow,
    }
}