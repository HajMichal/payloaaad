import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPayloadInstance } from '@/lib/payload'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage() {
  const payload = await getPayloadInstance()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'Published' },
    },
    limit: 20,
    sort: '-publishedAt',
    depth: 1,
  })

  return (
    <div className="news-page">
      <div className="container">
        <h1>News</h1>
        <div className="news-grid">
          {posts.map((post) => {
            const imageUrl =
              typeof post.image === 'object' && post.image?.url
                ? post.image.url
                : '/placeholder.jpg'

            return (
              <article key={post.id} className="news-card">
                <Link href={`/news/${post.slug}`}>
                  <div className="image-wrapper">
                    <Image
                      src={imageUrl}
                      alt={post.title || ''}
                      width={400}
                      height={250}
                      className="news-image"
                    />
                  </div>
                  <div className="content">
                    <h2>{post.title}</h2>
                    <p className="description">{post.description}</p>
                    <div className="meta">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </time>
                      )}
                      {post.readTime && <span>{post.readTime} min read</span>}
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
        {posts.length === 0 && <p>No news posts available.</p>}
      </div>
    </div>
  )
}
