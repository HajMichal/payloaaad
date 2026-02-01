import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { CollectionConfig } from 'payload'
import { adminOrWriter } from '@/lib/access/adminOrWriter'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin') || user?.roles?.includes('writer')) {
        return true
      }
      
      return {
        status: { equals: 'Published' },
      }
    },
    create: adminOrWriter,
    update: adminOrWriter,
    delete: adminOrWriter,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (value) {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }

            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }

            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'readTime',
      type: 'number',
      defaultValue: 0,
      hooks: {
        beforeChange: [({ siblingData }) => delete siblingData.readTime],
        afterRead: [
          ({ data }) => {
            if (!data) return 0

            const text = convertLexicalToPlaintext({ data: data.content })
            const words = text.trim().split(/\s+/).length

            return Math.max(1, Math.ceil(words / 200))
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM dd yyyy' },
      },
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
