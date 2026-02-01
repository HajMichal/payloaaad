import { getAllPublishedPosts } from '@/lib/data/posts'
import React from 'react'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const { posts, totalDocs, totalPages, page, hasNextPage, hasPrevPage } =
    await getAllPublishedPosts({ page: currentPage })

  return (
    <div className="news-page">
      <h1>News</h1>
    </div>
  )
}
