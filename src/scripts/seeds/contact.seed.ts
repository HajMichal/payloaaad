import { getPayloadInstance } from '@/lib/payload'
import { Contact } from '@/payload-types'

export async function seedContact() {
  const payload = await getPayloadInstance()

  const contactData: Omit<Contact, 'id' | 'updatedAt' | 'createdAt'>[] = [
    {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      companyName: 'Tech Solutions Inc',
      phoneNumber: '+1-555-0101',
      bookedCallTime: new Date('2026-02-15T10:00:00').toString(),
      status: 'new' as const,
    },
    {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      companyName: 'Digital Innovations LLC',
      phoneNumber: '+1-555-0102',
      bookedCallTime: new Date('2026-02-16T14:30:00').toString(),
      status: 'contacted' as const,
      notes: 'Initial contact made, waiting for response',
    },
    {
      fullName: 'Michael Chen',
      email: 'michael.chen@example.com',
      companyName: 'Cloud Services Co',
      phoneNumber: '+1-555-0103',
      bookedCallTime: new Date('2026-02-17T09:00:00').toString(),
      status: 'scheduled' as const,
      notes: 'Call scheduled for next week, sent calendar invite',
    },
    {
      fullName: 'Emily Davis',
      email: 'emily.davis@example.com',
      companyName: 'Startup Ventures',
      phoneNumber: '+1-555-0104',
      bookedCallTime: new Date('2026-02-18T11:00:00').toString(),
      status: 'new' as const,
    },
    {
      fullName: 'David Wilson',
      email: 'david.wilson@example.com',
      companyName: 'Enterprise Systems',
      phoneNumber: '+1-555-0105',
      bookedCallTime: new Date('2026-02-19T15:00:00').toString(),
      status: 'completed' as const,
      notes: 'Call completed successfully, proposal sent',
    },
    {
      fullName: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      companyName: 'Innovation Labs',
      phoneNumber: '+1-555-0106',
      bookedCallTime: new Date('2026-02-20T10:30:00').toString(),
      status: 'cancelled' as const,
      notes: 'Client cancelled due to scheduling conflict',
    },
    {
      fullName: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      companyName: 'Global Tech Partners',
      phoneNumber: '+1-555-0107',
      bookedCallTime: new Date('2026-02-21T13:00:00').toString(),
      status: 'new' as const,
    },
    {
      fullName: 'Jennifer Martinez',
      email: 'jennifer.martinez@example.com',
      companyName: 'Future Solutions',
      phoneNumber: '+1-555-0108',
      bookedCallTime: new Date('2026-02-22T16:00:00').toString(),
      status: 'contacted' as const,
      notes: 'Follow-up email sent with additional information',
    },
  ]

  const createdContacts = []

  for (const contact of contactData) {
    try {
      const existing = await payload.find({
        collection: 'contact',
        where: {
          and: [
            { email: { equals: contact.email } },
            {
              bookedCallTime: {
                equals: contact.bookedCallTime
              },
            },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(
          `Contact "${contact.fullName}" (${contact.email}) already exists, skipping...`,
        )
        createdContacts.push(existing.docs[0])
        continue
      }

      const created = await payload.create({
        collection: 'contact',
        data: contact,
      })

      createdContacts.push(created)
      console.log(`Contact "${contact.fullName}" seeded successfully`)
    } catch (error) {
      console.error(`Error seeding contact "${contact.fullName}":`, error)
    }
  }

  return createdContacts
}
