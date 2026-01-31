import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import type { CollectionConfig } from 'payload'


export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
        name: "title",
        type: "text",
        required: true,
    },
    {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
        index: true,
        admin: {
            description: "URL-friendly version of the title",
        },
        hooks: {
            beforeValidate: [
                ({ data, operation, value }) => {
                    if (operation === 'create' && !value && data?.title) {
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
        name: "description",
        type: "textarea",
        required: true,
    },
    {
        name: "content",
        type: "richText",
        required: true,
    },
    {
        name: "image",
        type: "upload",
        relationTo: "media",
        required: true,
    },
    {
        name: "readTime",
        type: "number",
        defaultValue: 0,
        hooks: {
            beforeChange: [({siblingData}) => delete siblingData.readTime],
            afterRead: [({ data }) => {
                if (!data) return 0;

                const text = convertLexicalToPlaintext({data: data.content});
                const words = text.trim().split(/\s+/).length;

                return Math.max(1, Math.ceil(words / 200));
            }]
        }
    },
    {
        name: "status",
        type: "select",
        options: ["Draft", "Published"],
        defaultValue: "Draft",
        required: true,
    },
    {
        name: "publishedAt",
        type: "date",
        required: true,
        admin: {
            condition: ({status}) => status === "Published",
            date: { pickerAppearance: "dayOnly", displayFormat: "MMM DD YYYY" }
        }
    }
  ],
}
