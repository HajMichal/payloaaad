import { getPayload } from 'payload'
import config from '@/payload.config'
import z from 'zod'

const payloadErrorSchema = z.object({
  name: z.string(),
  status: z.number(),
  data: z.object({
    collection: z.string(),
    errors: z
      .object({
        message: z.string(),
        path: z.string(),
      })
      .array(),
  }),
})

type PayloadError = z.infer<typeof payloadErrorSchema>

function isPayloadError(error: unknown): error is PayloadError {
  return payloadErrorSchema.safeParse(error).success
}

function isDuplicateError(error: unknown): boolean {
  if (!isPayloadError(error)) return false
  return error.data.errors.some((err) => err.message.includes('already registered'))
}

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

export async function seedAdmin() {
  const payload = await getPayload({ config })
  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file')
  }

  try {
    const response = await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        roles: 'admin',
      },
    })
    console.log('Admin seeded successfully:', response)
  } catch (error) {
    if (isDuplicateError(error)) {
      console.log('Admin already seeded')
      return
    }
    throw error
  }
}
