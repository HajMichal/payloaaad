import { getPayloadInstance } from '@/lib/payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export async function seedMedia() {
  const payload = await getPayloadInstance()

  const existingSeeder = await payload.find({
    collection: 'media',
    where: {
      alt: { equals: 'seeder.png-alt-text' },
    },
    limit: 1,
  })

  const createdMedia = []

  if (existingSeeder.docs.length === 0) {
    const seederImagePath = path.join(dirname, '../../../media/seeder.png')

    if (!fs.existsSync(seederImagePath)) {
      console.log('⚠️  seeder.png not found at media/seeder.png')
      console.log('   Skipping media upload. Posts will use existing media if available.')
    } else {
      try {
        const fileBuffer = fs.readFileSync(seederImagePath)
        const stats = fs.statSync(seederImagePath)

        // Create a file-like object for Payload
        const fileData = {
          data: fileBuffer,
          mimetype: 'image/png',
          name: 'seeder.png',
          size: stats.size,
        }

        const seederMedia = await payload.create({
          collection: 'media',
          data: {
            alt: 'seeder.png-alt-text',
          },
          file: fileData as any,
        })

        createdMedia.push(seederMedia)
        console.log('✅ seeder.png uploaded successfully')
      } catch (error) {
        console.error('❌ Error uploading seeder.png:', error)
      }
    }
  } else {
    console.log('seeder.png already exists, skipping upload...')
    createdMedia.push(existingSeeder.docs[0])
  }

  // Get all existing media (including the one we just created)
  const allMedia = await payload.find({
    collection: 'media',
    limit: 10,
  })

  if (allMedia.docs.length === 0) {
    console.log(
      '⚠️  No media files available. Posts seeding will be skipped.',
    )
  } else {
    console.log(
      `✅ Found ${allMedia.docs.length} media file(s) available for posts`,
    )
  }

  return allMedia.docs
}
