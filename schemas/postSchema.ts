import z from "zod";


export const postSchema = z.object({
    body: z.string()
        .min(10,{
            message : "Ajouter une histoire"
        }),
})