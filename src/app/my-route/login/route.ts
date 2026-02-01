import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { loginSchema } from '@/lib/validation/auth'
import { z } from 'zod'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const validationResult = loginSchema.safeParse(body)

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

    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    return Response.json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'

    return Response.json({ error: message }, { status: 401 })
  }
}
