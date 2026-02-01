import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/lib/access/adminOnly'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'companyName', 'bookedCallTime', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    // Anyone can submit a contact form
    create: () => true,
    // Only admins can read, update, or delete submissions
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'bookedCallTime',
      type: 'date',
      required: true,
      admin: {
        description: 'Preferred time for the call',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM dd yyyy, HH:mm',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
      defaultValue: 'new',
      required: true,
      admin: {
        description: 'Current status of the contact request',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this contact (admin only)',
      },
    },
  ],
  timestamps: true,
}
