import * as z from "zod";
export const registerFormSchema = z.object({
    name:z.string().min(2,{message:'Too Short'}),
    username: z.string().min(2,{message:'Too short'}),
    email:z.string(),
    password:z.string().min(8,{message:'Password should be atleast eight characters long'}),
  })