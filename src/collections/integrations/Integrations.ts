import type { CollectionConfig } from 'payload'
import { AVAILABLE_CATEGORIES } from './integrations.const'
import { validateSloganLength } from './integrations.service'
import { authenticated } from '@/lib/access/authenticated'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'category', 'slogan', 'createdAt'],
  },
  access: {
    create: authenticated,
    update: authenticated,
    delete: authenticated,
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
