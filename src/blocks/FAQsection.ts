import type { Block } from 'payload';

export const FaqSectionBlock: Block = {
  slug: 'faqSection',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
        },
      ],
    },
  ],
};