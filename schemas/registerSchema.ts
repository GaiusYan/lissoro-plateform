import { isValid } from "date-fns";
import { calculateAge } from "@/lib/utils";
import { z } from "zod";


export const dateSchema = z.object({
  
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Le nom d'utilisateur doit contenir au moins 5 caractères")
    .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères")
    .regex(/^[A-Za-z0-9_]{5,30}$/, "Format invalide (lettres, chiffres, underscore uniquement)"),

  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Doit contenir au moins une majuscule et une minuscule"),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email invalide"),

 /*  birthDate: z.preprocess((val) => {
    if (val instanceof Date) return val;
    if (typeof val === "string") return new Date(val);
  },
  z.date()
    .refine((date) => isValid(date), "Date invalide")
    .refine((date) => calculateAge(date) > 13, "Vous devez avoir plus de 13 ans")
  ),
  ethnicGroup: z
    .string()
    .min(1, "Le groupe ethnique est obligatoire"), */
});


