import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/lib/access/adminOnly'
import { adminOrSelf } from '@/lib/access/adminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'createdAt'],
  },
  auth: true,
  access: {
    create: () => true,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
    admin: ({ req: { user } }) => user?.roles?.includes('admin') || false,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      options: ['admin', 'editor', 'user'],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true,
      access: {
        read: ({ req: { user } }) => user?.roles?.includes('admin') || false,
        create: ({ req: { user } }) => user?.roles?.includes('admin') || false,
        update: ({ req: { user } }) => user?.roles?.includes('admin') || false,
      },
    },
  ],
}
