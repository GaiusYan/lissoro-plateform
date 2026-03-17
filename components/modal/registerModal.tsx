"use client";
import { Modal } from "@/components/modal"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import { loginSchema } from "@/schemas/loginSchema";
import React, { useCallback, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z, { Schema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "../ui/input";
import { useLoginModal } from "@/hooks/useLoginModal";
import { registerSchema } from "@/schemas/registerSchema";
import { DatePicker } from "../datePicker";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "@/auth";
import { redirect, RedirectType } from "next/navigation";


export const RegisterModal = () => {
    const [isPending, startTransition] = useTransition();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const onSubmit = (values : z.infer<typeof registerSchema>) => {
        startTransition(async () => { 
            try {
                const validatedFields = registerSchema.safeParse(values);
                
                if (!validatedFields?.data) {
                    return;
                }

                const {email, password, username } =  validatedFields.data;
                await axios.post("/api/register", {
                    email, 
                    password,
                    username,
                });
                
                signIn('credentials', {
                    email,
                    password,
                });

                toast.success("Compte crée");
                redirect("/", RedirectType.push);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        });
    }

    const form = useForm<z.infer<typeof registerSchema>> ({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email : "",
            password : "",
        }
    });


    const onToggle = useCallback(() => {
        if (isPending) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    },[isPending, registerModal, loginModal]);

    const bodyContent = (
        <FieldGroup>
            <Controller
                name="username"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-username">
                            username
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-username"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="username"
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

           
            
        </FieldGroup>
    )
    
    const footerContent = (
        <div className="text-neutral-400 mt-4">
            <p>
                Already have an account ?
                <span className="
                    text-white
                    cursor-pointer
                    hover:underline 
                    mx-1
                "
                onClick={onToggle}
                >
                    Sign-in
                </span>
            </p>
        </div>
    )
    return (
        <Modal 
            disabled={isPending}
            isOpen={registerModal.isOpen}
            actionLabel="Create"
            title="Create an new account"
            onClose={registerModal.onClose}
            onSubmit={form.handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}