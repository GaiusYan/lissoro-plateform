"use client";
import { Modal } from "@/components/modal"
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "../ui/input";

import { toast } from "sonner";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useEditModal } from "@/hooks/editModal";
import { editUserSchema } from "@/schemas/editUserSchema";
import { ImageUpload } from "../imageUpload";
import { DatePicker } from "../datePicker";
import axios from "axios";

export const EditModal = () => {
    const [isPending, startTransition] = useTransition();
    const {data: currentUser} = useCurrentUser();
    const {mutate : mutateFetcherUser, } = useUser(currentUser?.id);

    const editModal = useEditModal();

    const onSubmit = (values : z.infer<typeof editUserSchema>) => {
        startTransition(async () => {
            
             
            try {
                const validatedFiels = editUserSchema.safeParse(values);

                if (!validatedFiels.data) {
                    toast.error("Vérifier les champs");
                    return;
                }

                const {profileImage, coverImage, username, birthDate, bio, name} = validatedFiels?.data;

                await axios.patch(`/api/users/edit`,{
                    profileImage,
                    coverImage,
                    username,
                    birthDate,
                    bio, 
                    name,
                });
                mutateFetcherUser();

                toast.success("Mise à jour effectuée");                
                editModal.onClose();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        });
    }

    const form = useForm<z.infer<typeof editUserSchema>> ({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            bio : currentUser?.bio,
            profileImage : "",
            coverImage : "",
            birthDate : undefined,
            username: "",
            name : "",
        }
    });

   useEffect(() => {
    if (currentUser && editModal.isOpen) {
        form.reset({
            bio: currentUser.bio || "",
            profileImage: currentUser.profileImage || "",
            coverImage: currentUser.coverImage || "",
            birthDate: currentUser.birthDate 
                ? new Date(currentUser.birthDate)
                : undefined,
            username: currentUser.username || "",
            name: currentUser.name || "",
        });
    }
    
    }, [currentUser, editModal.isOpen, form]);


   

    const bodyContent = (
        <FieldGroup>
             <Controller
                name="profileImage"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-profileImage">
                            Profile image
                        </FieldLabel>
                        <ImageUpload
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            label="Profile image"
                            value={field.value}
                            onChange={field.onChange}
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>
            </Controller>

            <Controller
                name="coverImage"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-coverImage">
                            Cover image
                        </FieldLabel>
                        <ImageUpload
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            label="Profile image"
                            value={field.value}
                            onChange={field.onChange}
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>

            </Controller>

            <Controller
                name="name"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-name">
                            Nom complet
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-name"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="nom complet"
                            autoComplete="false"
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>

            </Controller>

            <Controller
                name="username"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-username">
                            Email
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
                name="birthDate"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-birthdate">
                            Date de naissance
                        </FieldLabel>
                        <DatePicker
                            {...field}
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="Date de naissance"
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                    </Field>
                )}>

            </Controller>
            <Controller
                name="bio"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-bio">
                            Bio
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-bio"
                            type="text"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            placeholder="Bio"
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
    
    return (
        <Modal 
            disabled={isPending}
            isOpen={editModal.isOpen}
            actionLabel="Save"
            title="Edit your profile"
            onClose={editModal.onClose}
            onSubmit={form.handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}