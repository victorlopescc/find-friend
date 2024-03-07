import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreatePetService } from '@/factories/pets/make-pet'
import { OrgNotFoundError } from '@/errors/org-not-found.error'

const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string()
})

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body)

    const createPetService = makeCreatePetService()

    const org_id = request.user.sub

    try {
        const { pet } = await createPetService.execute({ ...body, org_id })

        return reply.code(201).send(pet)
    } catch (err) {
        if (err instanceof OrgNotFoundError) return reply.status(404).send({ message: err.message })

        console.error(err);

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
