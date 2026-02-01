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

const POSTS_PER_PAGE = 20

interface GetAllPublishedPostsOptions {
  page?: number
  limit?: number
}

export async function getAllPublishedPosts(options: GetAllPublishedPostsOptions = {}) {
  const { page = 1, limit = POSTS_PER_PAGE } = options
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'Published' },
    },
    page,
    limit,
    depth: 0,
    select: {
      slug: true,
    },
  })

  return {
    posts: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  }
}