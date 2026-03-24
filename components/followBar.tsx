"use client";
import useUsers from "@/hooks/useUsers";
import { UserAvatar } from "./user/userAvatar"



export const FollowBar = () => {
    const {data: users = [] } = useUsers();

    console.log(users);
    

    if (users.length === 0) {
        return null;
    }
    return (
        <div className="
            px-6
            py-4
            hidden
            lg:block
        ">
            <div
                className="
                bg-neutral-800 rounded-xl p-4 w-fit">
                    <h2 className="
                    text-white text-xl font-semibold">
                        Who to follow ?
                    </h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.map((user: any) => (
                        <div key={user?.id} className="flex flex-row gap-4 ">
                            <UserAvatar 
                                userId={user.id}/> 
                            <div className="flex flex-col">
                                <p className="text-white font-semibold text-sm"> 
                                    {user?.name ? user?.name : user?.gmail}
                                </p>
                                <p className="text-white font-semibold text-sm"> 
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}