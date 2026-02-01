import type { CollectionConfig } from 'payload'
import { adminOrWriter } from '@/lib/access/adminOrWriter'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: adminOrWriter,
    update: adminOrWriter,
    delete: adminOrWriter,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
