import Fastify from 'fastify'
import { IAppServer } from './app-server'
import { router } from '../routes/fastify'

export class FastifyServer implements IAppServer {
  async start (): Promise<void> {
    const server = Fastify()
    await server.register(router)
    await server.listen(3000)
  }
}
