import { seedAdmin } from './seeds/admin.seed'
import { seedUsers } from './seeds/users.seed'
import { seedMedia } from './seeds/media.seed'
import { seedPosts } from './seeds/posts.seed'
import { seedFAQ } from './seeds/faq.seed'
import { seedIntegrations } from './seeds/integrations.seed'
import { seedContact } from './seeds/contact.seed'

async function main() {
  console.log('Starting seed process...\n')

  try {
    console.log('1. Seeding admin...')
    await seedAdmin()
    console.log('')

    console.log('2. Seeding users...')
    await seedUsers()
    console.log('')

    console.log('3. Seeding media...')
    await seedMedia()
    console.log('')

    console.log('4. Seeding posts...')
    await seedPosts()
    console.log('')

    console.log('5. Seeding FAQ...')
    await seedFAQ()
    console.log('')

    console.log('6. Seeding integrations...')
    await seedIntegrations()
    console.log('')

    console.log('7. Seeding contact...')
    await seedContact()
    console.log('')

    console.log('✅ All seeds completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main().catch((error) => {
  console.error('Error seeding:', error)
  process.exit(1)
})
