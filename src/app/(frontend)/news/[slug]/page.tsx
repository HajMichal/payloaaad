import { notFound } from 'next/navigation'
import React from 'react'
import { getAllPublishedPosts, getPostBySlug } from '@/lib/data/posts'


export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="news-post-page">
      <h1>{post.title}</h1>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
  }
}
