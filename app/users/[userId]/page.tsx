"use client";
import { Header } from "@/components/header";
import { UserHero } from "@/components/user/userHero";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import {ClipLoader } from "react-spinners";

const UserView = () => {

    const params = useParams();
    const { userId } = params;

    const {data : fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser) {
        return (
            <div className="
                flex
                justify-center
                items-center
                h-full
            ">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }
    return (
        <>
            <Header showBackArrow label={fetchedUser?.name ? fetchedUser?.name : fetchedUser?.email}/>   
            <UserHero userId={userId as string}/>
        </>
    )
}

export default UserView;