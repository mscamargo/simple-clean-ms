import { EachMessagePayload } from 'kafkajs'

export type Handler = (payload: EachMessagePayload) => Promise<void>

export type Subscriber = (topic: string, handler: Handler) => void

export const router = (subscribe: Subscriber): void => {
  subscribe('topic-1', async (payload) => {
    console.log(payload)
  })
}
