import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/lib/access/adminOnly'
import { adminOrSelf } from '@/lib/access/adminOrSelf'
import { resetPasswordTemplate, verifyEmailTemplate } from './emailTemplates'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'createdAt'],
  },

  // In  the production application I would split this collection into two: one for casual users and one for admins/editors.
  auth: {
     verify: {
      generateEmailHTML: ({ token, user }) => {
        return verifyEmailTemplate(token, user.email)
      },
      generateEmailSubject: () => 'Verify your email',
    },

    forgotPassword: {
      generateEmailHTML: (data) => {
        if (!data?.token) return ''
        return resetPasswordTemplate(data.token, data.user.email)
      },
      generateEmailSubject: () => 'Reset your password',
    },

    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes

    tokenExpiration: 7200, // 2 hours (in seconds)

    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    
  },
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
      hasMany: true,
      options: ['admin', 'writer', 'user'],
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
