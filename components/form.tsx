"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAvatar } from "./user/userAvatar";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { postSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "sonner";
import usePosts from "@/hooks/usePosts";
import UsePost from "@/hooks/usePost";


interface FormProps {
    placeholder?: string;
    isComment?: boolean;
    postId?: string;
}

export const Form = ({
    placeholder,
    isComment,
    postId,
}: FormProps) => {

    const {mutate : mutateFetchedPost } = UsePost(postId as string);
    const [isPending, startTransition] = useTransition();
    const loginModal = useLoginModal();
    const registerModal= useRegisterModal();
    const {mutate : mutateFetchedPosts} = usePosts();

   
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues : {
            body: "",
        }
    });

    const { data : currentUser} = useCurrentUser();

    const onSubmit = (values : z.infer<typeof postSchema>) => {
        startTransition(async () => {
            
            try {
                const {body } = values ;
                const url = isComment ? `/api/comments` : `/api/posts`; 
                await axios.post(url , { body, postId });

                mutateFetchedPosts();
                mutateFetchedPost();
                toast.success("Succcess");
                form.reset();
                
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        });
    }
    return (
        <div className="border-b border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <UserAvatar userId={currentUser?.id}/>
                    </div>
                    <div className="w-full">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="body"
                                    control={form.control}
                                    render={({field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <Textarea
                                                {...field}
                                                id="form-body"
                                                disabled={isPending}
                                                onChange={field.onChange}
                                                aria-invalid={fieldState.invalid}
                                                placeholder={placeholder}
                                                autoComplete="false"
                                                className="
                                                    peer
                                                    resize-zone
                                                    ring-0
                                                    outline-none
                                                "
                                            />
                                        </Field>
                                    )}>
                                </Controller>
                            </FieldGroup>
                            <hr className="
                                opacity-0
                                peer-focus:opacity-100
                                h-px
                                w-full
                                transition
                                border-neutral-800
                                "/>
                            <div className="mt-4 flex flex-orw justify-end">
                                <Button
                                    type="submit"
                                    disabled={isPending} 
                                    variant={"secondary"}>
                                    Lissoro
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1
                        className="
                            text-white
                            text-2xl
                            text-center
                            mb-4
                            font-bold
                        ">
                            Bienvenue sur lissoro 
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button
                            className={"cursor-pointer"}
                            onClick={() => loginModal.onOpen()}
                        >
                            Se connecter
                        </Button>
                        <Button
                            variant={"secondary"}
                            className={"cursor-pointer"}
                            onClick={() => registerModal.onOpen()}
                        >
                            Créer un compte
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}