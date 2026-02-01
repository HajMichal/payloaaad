import React from 'react'
import { getAllFAQs } from '@/lib/data/faq'

export const metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions',
}

export default async function FAQPage() {
  const faqs = await getAllFAQs()

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
    </div>
  )
}
