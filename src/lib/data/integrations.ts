import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Integration } from '@/payload-types'
import type { IntegrationCategory } from '@/collections/integrations/integrations.type'
import { LocaleCode } from '../types/localization'


interface GetIntegrationsOptions {
  category?: IntegrationCategory
  limit?: number
  locale?: LocaleCode
}

export const getIntegrations = cache(
  async (options: GetIntegrationsOptions = {}): Promise<Integration[]> => {
    const { category, limit = 100, locale = 'en' } = options

    try {
      const payload = await getPayload({ config })

      const { docs } = await payload.find({
        collection: 'integrations',
        where: category
          ? {
              category: {
                equals: category,
              },
            }
          : undefined,
        limit,
        sort: 'createdAt',
        locale,
      })

      return docs
    } catch (error) {
      console.error('Error fetching integrations:', error)
      return []
    }
  },
)

export const getIntegrationById = cache(
  async (id: string, locale: LocaleCode = 'en'): Promise<Integration | null> => {
    try {
      const payload = await getPayload({ config })

      const integration = await payload.findByID({
        collection: 'integrations',
        id,
        locale,
      })

      return integration
    } catch (error) {
      console.error(`Error fetching integration with id ${id}:`, error)
      return null
    }
  },
)
