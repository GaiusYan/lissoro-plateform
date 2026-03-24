import useCurrentUser from "@/hooks/useCurrentUser"
import { UseNotification } from "@/hooks/useNotification";
import { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";





export const NotificationFeed = () => {
    
    const {data: currentUser , mutate : mutateCurrentUser } = useCurrentUser();
    const {data : fetchedNotification = []} = UseNotification(currentUser?.id as string);


    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if (fetchedNotification.length === 0 ) {
        return (
            <div className="
                text-neutral-600
                text-center
                p-6
                text-xl
            ">
                {"Aucune notification"}
            </div>
        )
    }

   /*  const createAt = useMemo(() => {

    },[]); */
    return (
        <div className="flex flex-col">
            {fetchedNotification.map((notification : any) => (
                <div 
                    key={notification?.id}
                    className="
                    flex
                    flex-row
                    items-center
                    p-6
                    border-b
                    border-neutral-800
                    "
                >
                    <div>
                        {notification?.content}
                    </div>
                </div>
            ))}
        </div>
    )
}