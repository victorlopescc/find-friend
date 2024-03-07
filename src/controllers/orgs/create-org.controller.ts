import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgService } from '@/factories/orgs/make-org'
import { OrgAlreadyExistsError } from '@/errors/already-existis.error'

const bodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number()
})

export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body)

    const createOrgService = makeCreateOrgService()

    try {
        const { org } = await createOrgService.execute(body)

        return reply.status(201).send(org)
    } catch (err) {
        if (err instanceof OrgAlreadyExistsError) return reply.status(400).send({ message: err.message })
    }
}
