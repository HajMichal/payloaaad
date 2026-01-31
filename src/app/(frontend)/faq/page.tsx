import React from 'react'
import { getPayloadInstance } from '@/lib/payload'

export const metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions',
}

export default async function FAQPage() {
  const payload = await getPayloadInstance()

  const { docs: faqs } = await payload.find({
    collection: 'faq',
    limit: 100,
    sort: 'createdAt',
  })

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
    </div>
  )
}
