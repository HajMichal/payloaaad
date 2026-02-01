import { getPayloadInstance } from '@/lib/payload'

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

export async function seedAdmin() {
  const payload = await getPayloadInstance()
  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file')
  }

  try {
    // Check if admin already exists
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: adminEmail },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log('Admin already seeded')
      return existing.docs[0]
    }

    const response = await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        roles: 'admin',
      },
    })
    console.log('Admin seeded successfully')
    return response
  } catch (error) {
    console.error('Error seeding admin:', error)
    throw error
  }
}
