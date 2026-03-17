import { Modal } from "@/components/modal"
import { useLoginModal } from "@/hooks/useLoginModal"
import React, { startTransition, useTransition } from "react";

interface LoginModalProps {
    children?: React.ReactNode;
}


export const LoginModal = ({children}: LoginModalProps) => {
    const [isPending, startTransition] = useTransition();
    const loginModal = useLoginModal();

    const onSubmit = () => {
        startTransition(() => {
            console.log("Hello world");
        })
    }

    
    return (
        <Modal 
            disabled={isPending}
            isOpen={loginModal.isOpen}
            actionLabel="Login"
            title="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
        >
            {children}
        </Modal>
    )
}