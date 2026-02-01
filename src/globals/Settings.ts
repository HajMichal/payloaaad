import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    fields: [
      { name: 'siteName', type: 'text', required: true, localized: true },
      { name: 'siteDescription', type: 'textarea', localized: true },
      { name: 'contactEmail', type: 'email' },
    ],
  }