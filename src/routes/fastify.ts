import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export const router = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
  fastify.get('/', (): any => {
    return { message: 'hello' }
  })
}
