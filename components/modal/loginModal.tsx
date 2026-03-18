"use client";
import { Modal } from "@/components/modal"
import { useLoginModal } from "@/hooks/useLoginModal"
import { loginSchema } from "@/schemas/loginSchema";
import React, { useCallback, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "../ui/input";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const LoginModal = () => {
    const [isPending, startTransition] = useTransition();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const onSubmit = (values : z.infer<typeof loginSchema>) => {
        startTransition(async () => {
            console.log(values);
             
            try {
                const validatedFiels = loginSchema.safeParse(values);

                if (!validatedFiels.data) {
                    toast.error("Vérifier les champs");
                    return;
                }

                const {email, password } = validatedFiels.data;
                console.log(email, password);
                try {
                    await signIn('credentials', {
                        redirect : false,
                        email: email,
                        password: password,
                    });
                } catch (error) {
                    console.log(error);
                    toast.error("Somethnig went wrong")
                }   
                loginModal.onClose();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        });
    }

    const form = useForm<z.infer<typeof loginSchema>> ({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email : "",
            password : "",
        }
    });

    const onToggle = useCallback(() => {
        if (isPending) {
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();
    },[isPending, registerModal, loginModal]);

    const bodyContent = (
        <FieldGroup>
            <Controller
                name="email"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-email">
                            Email
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-email"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="email"
                            autoComplete="false"
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>

            </Controller>
            <Controller
                name="password"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-password">
                            password
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-password"
                            type="password"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="password"
                            autoComplete="false"
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>

            </Controller>
        </FieldGroup>
    )
    
    const footerContent = (
        <div className="text-neutral-400 mt-4">
            <p>
                First time using Lissoro ?
                <span className="
                    text-white
                    cursor-pointer
                    hover:underline 
                    mx-1
                "
                onClick={onToggle}>
                    Create an account
                </span>
            </p>
        </div>
    )
    return (
        <Modal 
            disabled={isPending}
            isOpen={loginModal.isOpen}
            actionLabel="Login"
            title="Sign in"
            onClose={loginModal.onClose}
            onSubmit={form.handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}