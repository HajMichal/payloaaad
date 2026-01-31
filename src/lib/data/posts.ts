import { cache } from 'react'
import { getPayloadInstance } from '@/lib/payload'
import type { Post } from '@/payload-types'

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'Published' } }],
    },
    limit: 1,
    depth: 1,
  })

  return docs[0] || null
})

export async function getAllPublishedPosts() {
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

  return posts
}