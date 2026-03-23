import { useLoginModal } from "@/hooks/useLoginModal"
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa"
import { LoginModal } from "../modal/loginModal";



export const SidebarTweetButton = () => {

    const loginModal = useLoginModal();


    const onClick = useCallback(() => {
        loginModal.onOpen();
        
    },[loginModal]);

    return (
        <div onClick={onClick}>
            
            <div 
            className="
                mt-6
                lg:hidden
                h-14
                p-4
                items-center
                rounded-full
                justify-center
                bg-sky-500
                hover:bg-opacity-90
                transition
                cursor-pointer

            ">
                <FaFeather size={24} color="white"/>
            </div>
        
            <div 
            className="
                mt-6
                hidden
                lg:block
                px-4
                p-2
                items-center
                rounded-full
                justify-center
                bg-sky-500
                hover:bg-opacity-90
                transition
                cursor-pointer
            ">
                <p className="
                    hidden
                    lg:block
                    font-semibold
                    text-white
                    text-[20px]
                ">
                    Lissoro
                </p>
            </div>
        </div>
    )
}