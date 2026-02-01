import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect, beforeEach, afterEach } from 'vitest'
import { Post, User } from '@/payload-types'

let payload: Payload
let testMediaId: number
let adminUser: User
let writerUser: User
let regularUser: User

const sampleLexicalContent: Post['content'] = [
  {
    blockType: 'richText',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'This is a test post content with enough words to calculate read time properly.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
]

describe('Posts Collection', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  beforeEach(async () => {
    // Create test media
    const media = await payload.find({
      collection: 'media',
      limit: 1,
    })

    if (media.docs.length === 0) {
      // Create a minimal media entry for testing
      const newMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'Test image',
        },
      })
      testMediaId = newMedia.id
    } else {
      testMediaId = media.docs[0].id
    }

    // Create test users with unique emails
    const timestamp = Date.now()

    // Check if admin user exists, otherwise create
    const existingAdmin = await payload.find({
      collection: 'users',
      where: {
        email: { equals: `admin-${timestamp}@test.com` },
      },
      limit: 1,
    })

    if (existingAdmin.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: `admin-${timestamp}@test.com`,
          password: 'test123',
          roles: ['admin'],
        },
      })
    } else {
      adminUser = existingAdmin.docs[0]
    }

    // Check if writer user exists, otherwise create
    const existingWriter = await payload.find({
      collection: 'users',
      where: {
        email: { equals: `writer-${timestamp}@test.com` },
      },
      limit: 1,
    })

    if (existingWriter.docs.length === 0) {
      writerUser = await payload.create({
        collection: 'users',
        data: {
          email: `writer-${timestamp}@test.com`,
          password: 'test123',
          roles: ['writer'],
        },
      })
    } else {
      writerUser = existingWriter.docs[0]
    }

    // Check if regular user exists, otherwise create
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: { equals: `user-${timestamp}@test.com` },
      },
      limit: 1,
    })

    if (existingUser.docs.length === 0) {
      regularUser = await payload.create({
        collection: 'users',
        data: {
          email: `user-${timestamp}@test.com`,
          password: 'test123',
          roles: ['user'],
        },
      })
    } else {
      regularUser = existingUser.docs[0]
    }
  })

  afterEach(async () => {
    // Clean up test posts
    const posts = await payload.find({
      collection: 'posts',
      where: {
        title: { contains: 'Test Post' },
      },
    })

    for (const post of posts.docs) {
      try {
        await payload.delete({
          collection: 'posts',
          id: post.id,
        })
      } catch (error) {
        // Ignore deletion errors
      }
    }
  })

  describe('Access Control', () => {
    it('allows admin to create posts', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Admin',
          slug: `test-post-admin-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
        overrideAccess: false,
      })

      expect(post).toBeDefined()
      expect(post.title).toBe('Test Post Admin')
    })

    it('allows writer to create posts', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Writer',
          slug: `test-post-writer-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: writerUser,
        overrideAccess: false,
      })

      expect(post).toBeDefined()
      expect(post.title).toBe('Test Post Writer')
    })

    it('prevents regular user from creating posts', async () => {
      await expect(
        payload.create({
          collection: 'posts',
          data: {
            title: 'Test Post User',
            slug: `test-post-user-${Date.now()}`,
            description: 'Test description',
            content: sampleLexicalContent,
            image: testMediaId,
            publishedAt: new Date().toString(),
          },
          user: regularUser,
          overrideAccess: false,
        }),
      ).rejects.toThrow()
    })

    it('prevents unauthenticated user from creating posts', async () => {
      await expect(
        payload.create({
          collection: 'posts',
          data: {
            title: 'Test Post Unauthenticated',
            slug: `test-post-unauthenticated-${Date.now()}`,
            description: 'Test description',
            content: sampleLexicalContent,
            image: testMediaId,
            publishedAt: new Date().toString(),
          },
          overrideAccess: false,
        }),
      ).rejects.toThrow()
    })
  })

  describe('Field Validation', () => {
    it('requires all mandatory fields', async () => {
      await expect(
        payload.create({
          collection: 'posts',
          data: {
            title: 'Test Post',
            // Missing required fields
          } as any,
          user: adminUser,
        }),
      ).rejects.toThrow()
    })

    it('enforces unique slug constraint', async () => {
      const slug = `test-slug-${Date.now()}`

      await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post 1',
          slug,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
      })

      // Try to create another post with the same slug
      await expect(
        payload.create({
          collection: 'posts',
          data: {
            title: 'Test Post 1',
            slug,
            description: 'Test description',
            content: sampleLexicalContent,
            image: testMediaId,
            publishedAt: new Date().toString(),
          },
          user: adminUser,
        }),
      ).rejects.toThrow()
    })
  })

  describe('Hooks', () => {
    it('auto-generates slug from title when slug is not provided', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Auto Slug',
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        // Missing slug - should be generated
        } as any,
        user: adminUser,
      })

      expect(post.slug).toBe('test-post-auto-slug')
    })

    it('calculates readTime based on content word count', async () => {
      const longContent: any = [
        {
          blockType: 'richText',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: Array(500).fill('word').join(' '), // 500 words
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      ]

      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post ReadTime',
          slug: `test-post-readtime-${Date.now()}`,
          description: 'Test description',
          content: longContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
      })

      // Read the post to trigger afterRead hook
      const readPost = await payload.findByID({
        collection: 'posts',
        id: post.id,
      })

      // 500 words / 200 words per minute = ~3 minutes (rounded up)
      expect(readPost.readTime).toBeGreaterThanOrEqual(2)
      expect(readPost.readTime).toBeLessThanOrEqual(3)
    })

    it('does not allow readTime to be set directly', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post ReadTime',
          slug: `test-post-readtime-direct-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
          readTime: 999, // Try to set readTime directly
        },
        user: adminUser,
      })

      // readTime should not be 999, it should be calculated
      expect(post.readTime).not.toBe(999)
    })
  })

  describe('CRUD Operations', () => {
    it('creates a post successfully', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Create',
          slug: `test-post-create-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
      })

      expect(post.id).toBeDefined()
      expect(post.title).toBe('Test Post Create')
    })

    it('updates a post successfully', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Update',
          slug: `test-post-update-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
      })

      const updated = await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          title: 'Test Post Updated',
        },
        user: adminUser,
        overrideAccess: false,
      })

      expect(updated.title).toBe('Test Post Updated')
    })

    it('deletes a post successfully', async () => {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: 'Test Post Delete',
          slug: `test-post-delete-${Date.now()}`,
          description: 'Test description',
          content: sampleLexicalContent,
          image: testMediaId,
          publishedAt: new Date().toString(),
        },
        user: adminUser,
      })

      await payload.delete({
        collection: 'posts',
        id: post.id,
        user: adminUser,
        overrideAccess: false,
      })

      await expect(
        payload.findByID({
          collection: 'posts',
          id: post.id,
        }),
      ).rejects.toThrow()
    })
  })
})
