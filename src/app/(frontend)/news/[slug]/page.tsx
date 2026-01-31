import { notFound } from 'next/navigation'
import React from 'react'
import { getPayloadInstance } from '@/lib/payload'

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: params.slug } }, { status: { equals: 'Published' } }],
    },
    limit: 1,
    depth: 1,
  })

  const post = docs[0]

  if (!post) {
    notFound()
  }

  return (
    <div className="news-post-page">
      <h1>{post.title}</h1>
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadInstance()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'Published' },
    },
    limit: 100,
    depth: 0,
    select: {
      slug: true,
    },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: params.slug } }, { status: { equals: 'Published' } }],
    },
    limit: 1,
    depth: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}