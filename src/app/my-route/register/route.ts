import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const user = await payload.create({
      collection: 'users',
      data: { email, password, roles: "user" },
    })

    return Response.json(
      {
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed'
    
    return Response.json(
      { error: message },
      { status: 400 }
    )
  }
}
