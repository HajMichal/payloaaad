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
      content: [
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
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          blockType: 'quote',
          quoteContent: 'The best way to predict the future is to invent it.',
          authorName: 'Alan Kay',
          authorRole: 'Computer Scientist',
        },
        {
          blockType: 'customList',
          type: 'arrow',
          items: [
            { text: 'React and Next.js for building modern UIs' },
            { text: 'TypeScript for type-safe development' },
            { text: 'Modern deployment strategies with CI/CD' },
            { text: 'Performance optimization techniques' },
          ],
        },
      ],
      image: mediaDocs.docs[0].id,
    },
    {
      title: 'The Future of Cloud Computing',
      slug: 'the-future-of-cloud-computing',
      description: 'Exploring how cloud computing is shaping the future of technology.',
      content: [
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
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          blockType: 'customList',
          type: 'number',
          items: [
            { text: 'Serverless architectures for cost-effective scaling' },
            { text: 'Edge computing for reduced latency' },
            { text: 'AI-powered cloud services for intelligent automation' },
            { text: 'Multi-cloud strategies for resilience' },
          ],
        },
      ],
      image: mediaDocs.docs[1]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-01-20').toString(),
    },
    {
      title: 'Building Scalable APIs with TypeScript',
      slug: 'building-scalable-apis-with-typescript',
      description: 'Learn how to build robust and scalable APIs using TypeScript and modern frameworks.',
      content: [
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
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          blockType: 'quote',
          quoteContent: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
          authorName: 'Martin Fowler',
          authorRole: 'Software Engineer',
        },
        {
          blockType: 'customList',
          type: 'arrow',
          items: [
            { text: 'Comprehensive error handling and validation' },
            { text: 'Secure authentication and authorization' },
            { text: 'Performance optimization and caching strategies' },
            { text: 'API documentation and versioning' },
          ],
        },
      ],
      image: mediaDocs.docs[2]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-02-01').toString(),
    },
    {
      title: 'Introduction to DevOps Best Practices',
      slug: 'introduction-to-devops-best-practices',
      description: 'A beginner-friendly guide to DevOps principles and practices.',
      content: [
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
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          blockType: 'customList',
          type: 'number',
          items: [
            { text: 'CI/CD pipelines for automated testing and deployment' },
            { text: 'Infrastructure as code for reproducible environments' },
            { text: 'Comprehensive monitoring and logging' },
            { text: 'Automation strategies to reduce manual work' },
          ],
        },
        {
          blockType: 'quote',
          quoteContent: 'DevOps is not a goal, but a never-ending process of continual improvement.',
          authorName: 'Jez Humble',
          authorRole: 'Author of Continuous Delivery',
        },
      ],
      image: mediaDocs.docs[3]?.id || mediaDocs.docs[0].id,
      publishedAt: new Date('2025-01-25').toString(),
    },
    {
      title: 'Understanding Microservices Architecture',
      slug: 'understanding-microservices-architecture',
      description: 'Deep dive into microservices architecture patterns and implementation strategies.',
      content: [
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
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          blockType: 'customList',
          type: 'arrow',
          items: [
            { text: 'Service decomposition strategies for maintainability' },
            { text: 'Communication patterns: REST, gRPC, and message queues' },
            { text: 'Data management and eventual consistency' },
            { text: 'Deployment considerations and orchestration' },
          ],
        },
        {
          blockType: 'quote',
          quoteContent: 'The microservice architectural style is an approach to developing a single application as a suite of small services.',
          authorName: 'James Lewis',
          authorRole: 'Principal Consultant at ThoughtWorks',
        },
      ],
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
