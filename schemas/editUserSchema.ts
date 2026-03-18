import { isValid } from "date-fns";
import z from "zod";


export const editUserSchema = z.object({
    name: z.string().min(6, {
        message : "Le minimum de caractère est 6"
    }).max(30, "Le nom ne doit pas dépasser 30 caractères"),
    username: z
        .string()
        .min(5, "Le nom d'utilisateur doit contenir au moins 5 caractères")
        .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères")
        .regex(/^[A-Za-z0-9_]{5,30}$/, "Format invalide (lettres, chiffres, underscore uniquement)"),
    birthDate: z.date(),
    coverImage: z.string().optional(),
    profileImage: z.string().optional(), 
    bio: z.string().optional(),
    /* interests: z
        .string()
        .min(1, "Le groupe ethnique est obligatoire"), */
});