import {string, object, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is require"
        }),
        password: string({
            required_error: "password is require"
        }).min(6, "Password to shot - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is require"
        }),
        email: string({
            required_error: "Email is require"
        }).email("Not a vaild email")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["Password Confirmation"]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">