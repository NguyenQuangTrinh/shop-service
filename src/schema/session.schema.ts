import {string, object, TypeOf} from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is require"
        }),
        password: string({
            required_error: "password is require"
        })
    })
})
