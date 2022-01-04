import { FastifyServer } from './servers/fastify-server'
import { KafkaServer } from './servers/kafka-server'

async function main (): Promise<void> {
  try {
    await Promise.all([new FastifyServer().start(), new KafkaServer().start()])
  } catch (err) {
    console.error(err)
  }
}
void main()
