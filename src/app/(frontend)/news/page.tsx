import { getAllPublishedPosts } from '@/lib/data/posts'
import React from 'react'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage() {
  const { posts, totalDocs, totalPages, page } = await getAllPublishedPosts()
  return (
    <div className="news-page">
      <h1>News</h1>
    </div>
  )
}
