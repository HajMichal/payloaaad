import type { Block } from 'payload';

export const CustomListBlock: Block = {
  slug: 'customList',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'arrow',
      options: [
        { label: 'Arrowed list', value: 'arrow' },
        { label: 'Numbered list', value: 'number' },
      ],
      admin: {
        description: 'Select list style',
      }
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
        },
      ],
    },
  ],
};