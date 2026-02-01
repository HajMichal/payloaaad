import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('wrong_email'),
  password: z.string('wrong_pwd').min(6, 'too_short_pwd'),
})

export const registerSchema = z.object({
  email: z.email('wrong_email'),
  password: z
    .string('wrong_pwd')
    .min(6, 'too_short_pwd')
    .max(32, 'too_long_pwd'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
