import React from 'react'
import { getPayloadInstance } from '@/lib/payload'
import { IntegrationCategory } from '@/collections/integrations/integrations.type'
import { AVAILABLE_CATEGORIES } from '@/collections/integrations/integrations.const'

export const metadata = {
  title: 'Integrations',
  description: 'Our integration partners',
}

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: { category?: IntegrationCategory }
}) {
  const categoryParam = searchParams.category
  const selectedCategory =
    categoryParam && AVAILABLE_CATEGORIES.includes(categoryParam)
      ? categoryParam
      : AVAILABLE_CATEGORIES[0]

  const payload = await getPayloadInstance()

  const { docs: integrations } = await payload.find({
    collection: 'integrations',
    where: {
      category: {
        equals: selectedCategory,
      },
    },
    limit: 100,
    sort: 'createdAt',
  })

  return (
    <div className="integrations-page">
      <h1>Integrations</h1>
    </div>
  )
}
