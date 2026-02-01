import type { CollectionConfig } from 'payload'
import { adminOrWriter } from '@/lib/access/adminOrWriter'
import { FaqSectionBlock } from '@/blocks/FAQsection'

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
      name: 'content',
      type: 'blocks',
      required: true,
      localized: true,
      minRows: 1,
      blocks: [FaqSectionBlock],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
