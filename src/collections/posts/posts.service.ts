import { Post } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { FieldHook } from 'payload'

const countWords = (text?: string | null): number => {
    if (!text) return 0
    return text.trim().split(/\s+/).length
  }
  
export const calculateReadTimeHook: FieldHook<Post, number> = async ({ data, siblingData }) => {
    const content = siblingData?.content || data?.content
    if (!content) return 1
    
    let totalWords = 0
  
    content.forEach((block: any) => {
      switch (block.blockType) {
        case 'richText':
            if (block.content) { 
             const text = convertLexicalToPlaintext({ data: block.content }) 
             totalWords += countWords(text)
            }
            break
  
        case 'quote':
            totalWords += countWords(block.quoteContent)
            break
  
        case 'customList': 
            block?.items?.forEach((item: any) => {
              totalWords += countWords(item.text)
            })
            break
      }
    })
  
    const minutes = Math.ceil(totalWords / 200)
    return Math.max(1, minutes)
  }