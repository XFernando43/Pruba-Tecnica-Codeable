import z from "zod";

export const LoginSchema = z.object({
  name: z
    .string({ description: "debe ser un string" })
    .min(3, { message: "debe contener almenos 3 caracter" }),
  password: z
    .string({
      description: "contraseña es muy corta debe ser mayora 6 caracteres",
    })
    .min(6, { message: "la constraseña debe contener al menos 6 caracteres" }),
});


export const UpdateUserSchema = z.object({
    email: z
      .string({ description: "debe ser un string" })
      .min(3, { message: "debe contener almenos 3 caracter" }),
    firstName: z
      .string({
        description: "firstName es muy corta debe ser mayora 6 caracteres",
      })
      .min(3, { message: "Es muy corto" }),
    lastName: z
    .string({
      description: "lastName es muy corta debe ser mayora 6 caracteres",
    })
    .min(3, { message: "Es muy corto" }),
});
  
