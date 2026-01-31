import type { CollectionConfig } from 'payload'
import { authenticated } from '@/lib/access/authenticated'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'description', 'createdAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description for the FAQ category',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
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
}
