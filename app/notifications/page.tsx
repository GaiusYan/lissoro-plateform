"use client";
import { Header } from "@/components/header";
import { NotificationFeed } from "@/components/notification/notificationFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";




const Notifications = () => {
    
    const { data : currentUser } = useCurrentUser();
    const router = useRouter();

    if (!currentUser?.id) {
        router.push("/");
    }
    return (
        <>
            <Header showBackArrow label="Notifications"/>
            <NotificationFeed/>
        </>
    );
}

export default Notifications;