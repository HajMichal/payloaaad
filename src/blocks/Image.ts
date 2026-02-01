import type { Block } from 'payload';

export const ImageBlock: Block = {
  slug: 'image',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};