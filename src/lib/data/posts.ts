import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Post } from '@/payload-types'
import { LocaleCode } from '../types/localization'


export const getPostBySlug = cache(
  async (slug: string, locale: LocaleCode = 'en'): Promise<Post | null> => {
    try {
      const payload = await getPayload({ config })

      const { docs } = await payload.find({
        collection: 'posts',
        where: {
          and: [{ slug: { equals: slug } }, { status: { equals: 'Published' } }],
        },
        limit: 1,
        depth: 1,
        locale,
      })

      return docs[0] || null
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error)
      return null
    }
  },
)

const POSTS_PER_PAGE = 20

interface GetAllPublishedPostsOptions {
  page?: number
  limit?: number
  locale?: LocaleCode
}

export const getAllPublishedPosts = cache(
  async (options: GetAllPublishedPostsOptions = {}) => {
    const { page = 1, limit = POSTS_PER_PAGE, locale = 'en' } = options

    try {
      const payload = await getPayload({ config })

      const result = await payload.find({
        collection: 'posts',
        where: {
          status: { equals: 'Published' },
        },
        page,
        limit,
        depth: 0,
        sort: '-publishedAt',
        locale,
      })

      return {
        posts: result.docs,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      }
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return {
        posts: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
  },
)