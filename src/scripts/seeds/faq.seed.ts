import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedFAQ() {
  const payload = await getPayload({ config })

  const faqData = [
    {
      category: 'General',
      description: 'Common questions about our services and platform',
      content: [
        {
          blockType: 'faqSection',
          questions: [
            {
              question: 'What services do you offer?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'We offer a comprehensive range of web development, cloud computing, and digital transformation services to help businesses grow and succeed in the digital age.',
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
              question: 'How can I get started?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Getting started is easy! Simply contact us through our contact form, and our team will reach out to discuss your needs and provide a customized solution.',
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
              question: 'Do you offer support after project completion?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Yes, we provide ongoing support and maintenance services to ensure your project continues to perform optimally. We offer various support packages to meet your needs.',
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
          ],
        },
      ],
    },
    {
      category: 'Technical',
      description: 'Technical questions about our development process and technologies',
      content: [
        {
          blockType: 'faqSection',
          questions: [
            {
              question: 'What technologies do you use?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'We use modern technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms. Our tech stack is chosen based on project requirements and best practices.',
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
              question: 'How long does a typical project take?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during the planning phase.',
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
              question: 'Do you provide API documentation?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Yes, we provide comprehensive API documentation for all our projects. This includes endpoints, request/response formats, authentication methods, and code examples.',
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
              question: 'Can you integrate with third-party services?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Absolutely! We have experience integrating with various third-party services including payment gateways, CRM systems, analytics platforms, and more.',
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
          ],
        },
      ],
    },
    {
      category: 'Pricing',
      description: 'Questions about our pricing and payment options',
      content: [
        {
          blockType: 'faqSection',
          questions: [
            {
              question: 'How do you price your projects?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Pricing is based on project scope, complexity, and requirements. We provide detailed quotes after understanding your needs. Contact us for a personalized estimate.',
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
              question: 'Do you offer payment plans?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Yes, we offer flexible payment plans for larger projects. Typically, we require a deposit upfront, with milestone-based payments throughout the project.',
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
              question: 'Are there any hidden fees?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'No, we believe in transparent pricing. All costs are discussed and agreed upon before project commencement. Any additional work is discussed and approved before proceeding.',
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
          ],
        },
      ],
    },
    {
      category: 'Support',
      description: 'Questions about ongoing support and maintenance',
      content: [
        {
          blockType: 'faqSection',
          questions: [
            {
              question: 'What support options are available?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'We offer various support packages including email support, priority support, and dedicated support teams. Support hours and response times vary by package.',
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
              question: 'How quickly do you respond to support requests?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Response times depend on your support package. Standard support typically responds within 24-48 hours, while priority support responds within 4-8 hours during business days.',
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
              question: 'Do you provide training for our team?',
              answer: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Yes, we provide training sessions to help your team understand and manage the systems we build. Training can be conducted on-site or remotely, depending on your preference.',
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
          ],
        },
      ],
    },
  ]

  const createdFAQs = []

  for (const faq of faqData) {
    try {
      // Check if FAQ already exists
      const existing = await payload.find({
        collection: 'faq',
        where: {
          category: { equals: faq.category },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`FAQ category "${faq.category}" already exists, skipping...`)
        createdFAQs.push(existing.docs[0])
        continue
      }

      const created = await payload.create({
        collection: 'faq',
        data: faq as any,
      })

      createdFAQs.push(created)
      console.log(`FAQ category "${faq.category}" seeded successfully`)
    } catch (error) {
      console.error(`Error seeding FAQ category "${faq.category}":`, error)
    }
  }

  return createdFAQs
}
