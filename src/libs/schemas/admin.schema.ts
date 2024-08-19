import { TypeOf, object } from "zod";
import { emailValidator, passwordValidator, phoneValidator, usernameValidator } from "./common.schema";

export const createAdminSchema = object({
    username: usernameValidator,
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export const updateAdminSchema = object({
    username: usernameValidator,
    email: emailValidator,
    phone: phoneValidator,
});;
export type CreateAdminInput = TypeOf<typeof createAdminSchema>;
export type UpdateAdminInput = TypeOf<typeof updateAdminSchema>;