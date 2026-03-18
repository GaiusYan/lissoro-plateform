import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Button } from "../ui/button";
import { BiCalendar } from "react-icons/bi";
import { useMemo } from "react";
import { format } from "date-fns";
import { useEditModal } from "@/hooks/editModal";



interface UserBioProps {
    userId: string;
}

export const UserBio = ({
    userId
}: UserBioProps) => {

    const {data : fetchedUser} = useUser(userId);
    const {data : currentUser } = useCurrentUser();
    const editModal = useEditModal();

    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }
        return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
    }, [fetchedUser]); 
 
    return (
        <div className="border-b border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId ? (
                    <Button
                        className={"cursor-pointer"} 
                        variant={"secondary"}
                        onClick={() => editModal.onOpen()}>
                        Edit
                    </Button>
                ) : (
                    <Button className={"cursor-pointer"}>
                        Follow
                    </Button>
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.email}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">  
                        {fetchedUser?.bio}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
                    <BiCalendar size={24}/>
                    <p>
                        Joined {createdAt}
                    </p>
                </div>
            </div>

            <div className="flex flex-row items-center mt-4 pl-4 gap-6">
                <div className="flex flex(row items-center gap-1">
                    <p className="text-white">
                        {fetchedUser?.followingIds?.length}
                    </p>
                    <p className="text-neutral-500">
                        Following
                    </p>
                </div>
                <div className="flex flex(row items-center gap-1">
                    <p className="text-white">
                        {fetchedUser?.followers?.length}
                    </p>
                    <p className="text-neutral-500">
                        Followers
                    </p>
                </div>
            </div>
        </div>
    )
}