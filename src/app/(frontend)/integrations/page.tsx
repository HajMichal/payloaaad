import React from 'react'
import { getIntegrations } from '@/lib/data/integrations'
import { IntegrationCategory } from '@/collections/integrations/integrations.type'
import { AVAILABLE_CATEGORIES } from '@/collections/integrations/integrations.const'

export const metadata = {
  title: 'Integrations',
  description: 'Our integration partners',
}

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: IntegrationCategory }>
}) {
  const params = await searchParams
  const categoryParam = params.category
  const selectedCategory =
    categoryParam && AVAILABLE_CATEGORIES.includes(categoryParam)
      ? categoryParam
      : AVAILABLE_CATEGORIES[0]

  const integrations = await getIntegrations({ category: selectedCategory })

  return (
    <div className="integrations-page">
      <h1>Integrations</h1>
    </div>
  )
}
