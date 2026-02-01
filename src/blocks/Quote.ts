import type { Block } from 'payload';

export const QuoteBlock: Block = {
  slug: 'quote',
  imageURL: '/admin/quote.png',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quoteContent',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
    },
  ],
};