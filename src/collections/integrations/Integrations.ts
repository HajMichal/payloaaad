import type { CollectionConfig } from 'payload'
import { AVAILABLE_CATEGORIES } from './integrations.const'
import { validateSloganLength } from './integrations.service'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'category', 'slogan', 'createdAt'],
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: AVAILABLE_CATEGORIES,
      index: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'slogan',
      type: 'text',
      required: true,
      validate: validateSloganLength,
      admin: {
        description: 'Maximum 15 characters',
      },
    },
  ],
  timestamps: true,
}
