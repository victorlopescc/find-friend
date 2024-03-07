import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateService } from '@/factories/orgs/make-authenticate'
import { InvalidCredentialsError } from '@/errors/credentials.error'

const bodySchema = z.object({
    email: z.string(),
    password: z.string()
})

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body)

    const authenticateService = makeAuthenticateService()

    try {
        const { org } = await authenticateService.execute(body)

        const token = await reply.jwtSign({}, {
            sign: { sub: org.id }
        })

        return reply.status(200).send({ token })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) return reply.status(400).send({ message: err.message })

        throw err
    }
} 
