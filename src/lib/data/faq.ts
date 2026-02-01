import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Faq } from '@/payload-types'
import { LocaleCode } from '../types/localization'


export const getAllFAQs = cache(async (locale: LocaleCode = 'en'): Promise<Faq[]> => {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'faq',
      limit: 100,
      sort: 'createdAt',
      locale,
    })

    return docs
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
})

export const getFAQById = cache(
  async (id: string, locale: LocaleCode = 'en'): Promise<Faq | null> => {
    try {
      const payload = await getPayload({ config })

      const faq = await payload.findByID({
        collection: 'faq',
        id,
        locale,
      })

      return faq
    } catch (error) {
      console.error(`Error fetching FAQ with id ${id}:`, error)
      return null
    }
  },
)
