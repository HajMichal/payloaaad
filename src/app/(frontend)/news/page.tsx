import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPayloadInstance } from '@/lib/payload'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage() {
  const payload = await getPayloadInstance()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'Published' },
    },
    limit: 20,
    sort: '-publishedAt',
    depth: 1,
  })

  return (
    <div className="news-page">
      <h1>News</h1>
    </div>
  )
}
