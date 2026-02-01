import type { CollectionConfig } from 'payload'
import { adminOrWriter } from '@/lib/access/adminOrWriter'
import slugify from 'slugify'

import { QuoteBlock } from '@/blocks/Quote'
import { CustomListBlock } from '@/blocks/List'
import { ImageBlock } from '@/blocks/Image'
import { RichTextBlock } from '@/blocks/RichText'
import { calculateReadTimeHook } from './posts.service'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin') || user?.roles?.includes('writer')) {
        return true
      }
      
      return {
        _status: { equals: 'published' },
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
              return slugify(value, { lower: true, strict: true })
            }

            if (data?.title) {
              return slugify(data.title, { lower: true, strict: true })
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
      type: 'blocks',
      required: true,
      localized: true,
      blocks: [QuoteBlock, CustomListBlock, ImageBlock, RichTextBlock],
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
      defaultValue: 5,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [calculateReadTimeHook],
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
