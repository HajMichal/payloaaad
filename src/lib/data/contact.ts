import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Contact } from '@/payload-types'

interface CreateContactData {
  fullName: string
  email: string
  companyName: string
  phoneNumber: string
  bookedCallTime: string
}

export async function createContactSubmission(
  data: CreateContactData,
): Promise<{ success: boolean; contact?: Contact; error?: string }> {
  try {
    const payload = await getPayload({ config })

    const contact = await payload.create({
      collection: 'contact',
      data: {
        ...data,
        status: 'new',
      },
    })

    return { success: true, contact }
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create contact submission',
    }
  }
}
