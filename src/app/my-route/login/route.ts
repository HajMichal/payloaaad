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
    
    return Response.json(
      { error: message },
      { status: 401 }
    )
  }
}
