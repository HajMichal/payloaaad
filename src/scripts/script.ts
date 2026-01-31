import { seedAdmin } from './seeds/admin.seed'

async function main() {
  await seedAdmin()
}

main().catch((error) => {
  console.error('Error seeding admin:', error)
  process.exit(1)
})
