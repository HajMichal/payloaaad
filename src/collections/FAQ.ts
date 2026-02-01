import type { CollectionConfig } from 'payload'
import { adminOrWriter } from '@/lib/access/adminOrWriter'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'description', 'createdAt'],
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
      type: 'text',
      required: true,
      index: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Short description for the FAQ category',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
