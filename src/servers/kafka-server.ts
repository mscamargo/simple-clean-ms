import { Consumer, EachMessagePayload, Kafka } from 'kafkajs'
import { router } from '../routes/kafka'
import { IAppServer } from './app-server'

type Handler = (payload: EachMessagePayload) => Promise<void>

export class KafkaServer implements IAppServer {
  client: Kafka
  consumer: Consumer
  handlers = new Map<string, Handler>()

  constructor () {
    this.client = new Kafka({
      clientId: 'simple-clean-ms',
      brokers: ['localhost:9092']
    })
    this.consumer = this.client.consumer({
      groupId: 'simple-clean-ms-consumer'
    })
  }

  async start (): Promise<void> {
    await this.initHandlers()
    await this.consumer.connect()
    await this.initSubscribers()
    await this.consumer.run({
      eachMessage: async (payload) => {
        const handler = this.handlers.get(payload.topic)
        if (handler !== undefined) {
          await handler(payload)
        }
      }
    })
  }

  async initSubscribers (): Promise<void> {
    for (const topic of this.handlers.keys()) {
      await this.consumer.subscribe({ topic })
    }
  }

  async initHandlers (): Promise<void> {
    router(
      (topic, handler) => this.handlers.set(topic, handler)
    )
  }
}
