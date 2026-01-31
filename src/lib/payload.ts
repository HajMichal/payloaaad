import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from '@/payload.config'

export async function getPayloadInstance(): Promise<Payload> {
  const payloadConfig = await config
  return await getPayload({ config: payloadConfig })
}
