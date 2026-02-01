import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { registerSchema } from '@/lib/validation/auth'
import z from 'zod'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const validationResult = registerSchema.safeParse(body)

    if (!validationResult.success) {
      return Response.json(
        {
          error: 'Validation failed',
          details: z.treeifyError(validationResult.error),
        },
        { status: 400 },
      )
    }

    const { email, password } = validationResult.data

    const payload = await getPayload({ config: configPromise })

    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        roles: ['user'],
      },
    })

    return Response.json(
      {
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed'

    return Response.json({ error: message }, { status: 400 })
  }
}
