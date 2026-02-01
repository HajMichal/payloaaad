import { getPayloadInstance } from '@/lib/payload'

export async function seedUsers() {
  const payload = await getPayloadInstance()

  const usersData = [
    {
      email: 'writer1@example.com',
      password: 'password123',
      roles: 'writer' as const,
    },
    {
      email: 'user3@example.com',
      password: 'password123',
      roles: 'user' as const,
    },
  ]

  const createdUsers = []

  for (const user of usersData) {
    try {
      // Check if user already exists
      const existing = await payload.find({
        collection: 'users',
        where: {
          email: { equals: user.email },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`User "${user.email}" already exists, skipping...`)
        createdUsers.push(existing.docs[0])
        continue
      }

      const created = await payload.create({
        collection: 'users',
        data: user,
      })

      createdUsers.push(created)
      console.log(`User "${user.email}" (${user.roles}) seeded successfully`)
    } catch (error) {
      console.error(`Error seeding user "${user.email}":`, error)
    }
  }

  return createdUsers
}
