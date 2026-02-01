import { getPayloadInstance } from '@/lib/payload'
import { AVAILABLE_CATEGORIES } from '@/collections/integrations/integrations.const'

export async function seedIntegrations() {
  const payload = await getPayloadInstance()

  const integrationsData = [
    {
      category: AVAILABLE_CATEGORIES[0],
      companyName: 'Volvo Trucks',
      slogan: 'Driving Progress',
    },
    {
      category: AVAILABLE_CATEGORIES[0],
      companyName: 'Mercedes-Benz Trucks',
      slogan: 'Trucks You Can',
    },
    {
      category: AVAILABLE_CATEGORIES[0],
      companyName: 'Scania',
      slogan: 'The Future of',
    },
    {
      category: AVAILABLE_CATEGORIES[1],
      companyName: 'Schmitz Cargobull',
      slogan: 'Your Transport',
    },
    {
      category: AVAILABLE_CATEGORIES[1],
      companyName: 'Krone',
      slogan: 'Innovation First',
    },
    {
      category: AVAILABLE_CATEGORIES[1],
      companyName: 'Kögel',
      slogan: 'Trailer Solutions',
    },
    {
      category: AVAILABLE_CATEGORIES[2],
      companyName: 'Geotab',
      slogan: 'Fleet Management',
    },
    {
      category: AVAILABLE_CATEGORIES[2],
      companyName: 'Verizon Connect',
      slogan: 'Connected Fleet',
    },
    {
      category: AVAILABLE_CATEGORIES[2],
      companyName: 'Samsara',
      slogan: 'Real-Time Fleet',
    },
    {
      category: AVAILABLE_CATEGORIES[3],
      companyName: 'Oracle Transportation',
      slogan: 'Logistics Cloud',
    },
    {
      category: AVAILABLE_CATEGORIES[3],
      companyName: 'MercuryGate',
      slogan: 'Transportation TMS',
    },
    {
      category: AVAILABLE_CATEGORIES[3],
      companyName: 'Transplace',
      slogan: 'Smart Logistics',
    },
  ]

  const createdIntegrations = []

  for (const integration of integrationsData) {
    try {
      // Check if integration already exists
      const existing = await payload.find({
        collection: 'integrations',
        where: {
          and: [
            { companyName: { equals: integration.companyName } },
            { category: { equals: integration.category } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(
          `Integration "${integration.companyName}" (${integration.category}) already exists, skipping...`,
        )
        createdIntegrations.push(existing.docs[0])
        continue
      }

      const created = await payload.create({
        collection: 'integrations',
        data: integration,
      })

      createdIntegrations.push(created)
      console.log(
        `Integration "${integration.companyName}" (${integration.category}) seeded successfully`,
      )
    } catch (error) {
      console.error(
        `Error seeding integration "${integration.companyName}":`,
        error,
      )
    }
  }

  return createdIntegrations
}
