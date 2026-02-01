import { getPayload } from 'payload'
import config from '@/payload.config'
import { Post } from '@/payload-types'

export async function seedPosts() {
  const payload = await getPayload({ config })

  // First, get existing media for posts
  const mediaDocs = await payload.find({
    collection: 'media',
    limit: 5,
  })

  if (mediaDocs.docs.length === 0) {
    console.log(
      '⚠️  No media found. Skipping posts seeding. Please upload media files through the admin panel first.',
    )
    return []
  }

  const postsData: Omit<Post, 'id' | 'updatedAt' | 'createdAt'>[] = [
    {
      title: 'Getting Started with Modern Web Development',
      slug: 'getting-started-with-modern-web-development',
      description: 'A comprehensive guide to modern web development practices and tools.',
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
                  text: 'Modern web development has evolved significantly over the years. In this article, we explore the latest trends, tools, and best practices that can help you build better web applications.',
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
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We will cover topics such as React, Next.js, TypeScript, and modern deployment strategies. These technologies have become essential for building scalable and maintainable web applications.',
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
      image: mediaDocs.docs[0].id,
    },
    {
      title: 'The Future of Cloud Computing',
      slug: 'the-future-of-cloud-computing',
      description: 'Exploring how cloud computing is shaping the future of technology.',
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
                  text: 'Cloud computing has revolutionized how businesses operate and scale. From infrastructure to software services, the cloud offers unprecedented flexibility and efficiency.',
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
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'In this article, we discuss the latest trends in cloud computing, including serverless architectures, edge computing, and AI-powered cloud services.',
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
      image: mediaDocs.docs[1]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-01-20').toString(),
    },
    {
      title: 'Building Scalable APIs with TypeScript',
      slug: 'building-scalable-apis-with-typescript',
      description: 'Learn how to build robust and scalable APIs using TypeScript and modern frameworks.',
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
                  text: 'TypeScript has become the standard for building type-safe APIs. In this guide, we explore best practices for designing APIs that can scale with your business needs.',
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
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We cover topics such as error handling, validation, authentication, and performance optimization. These principles will help you build APIs that are both reliable and efficient.',
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
      image: mediaDocs.docs[2]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-02-01').toString(),
    },
    {
      title: 'Introduction to DevOps Best Practices',
      slug: 'introduction-to-devops-best-practices',
      description: 'A beginner-friendly guide to DevOps principles and practices.',
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
                  text: 'DevOps has transformed software development by bridging the gap between development and operations teams. This article introduces key DevOps concepts and practices.',
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
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We explore CI/CD pipelines, infrastructure as code, monitoring, and automation strategies that can help your team deliver software faster and more reliably.',
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
      image: mediaDocs.docs[3]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-01-25').toString(),
    },
    {
      title: 'Understanding Microservices Architecture',
      slug: 'understanding-microservices-architecture',
      description: 'Deep dive into microservices architecture patterns and implementation strategies.',
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
                  text: 'Microservices architecture has become a popular approach for building large-scale applications. This article explains the benefits and challenges of this architectural pattern.',
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
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We discuss service decomposition strategies, communication patterns, data management, and deployment considerations. Understanding these concepts is crucial for successfully implementing microservices.',
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
      image: mediaDocs.docs[4]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-01-30').toString(),
    },
  ]

  const createdPosts = []

  for (const post of postsData) {
    try {
      // Check if post already exists
      const existing = await payload.find({
        collection: 'posts',
        where: {
          slug: { equals: post.slug },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`Post "${post.title}" already exists, skipping...`)
        createdPosts.push(existing.docs[0])
        continue
      }

      const created = await payload.create({
        collection: 'posts',
        data: post,
      })

      createdPosts.push(created)
      console.log(`Post "${post.title}" seeded successfully`)
    } catch (error) {
      console.error(`Error seeding post "${post.title}":`, error)
    }
  }

  return createdPosts
}
