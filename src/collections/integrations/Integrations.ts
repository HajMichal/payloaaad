import type { CollectionConfig } from 'payload'
import { AVAILABLE_CATEGORIES } from './integrations.const'
import { validateSloganLength } from './integrations.service'
import { adminOrWriter } from '@/lib/access/adminOrWriter'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'category', 'slogan', 'createdAt'],
  },
  access: {
    read: () => true,
    create: adminOrWriter,
    update: adminOrWriter,
    delete: adminOrWriter,
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
        description: 'Maximum 20 characters',
      },
    },
  ],
  timestamps: true,
}
