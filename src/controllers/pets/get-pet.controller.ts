import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeGetPetService } from '@/factories/pets/make-get'
import { PetNotFoundError } from '@/errors/pet-not-found.error'

const routeSchema = z.object({
    id: z.string()
})

export async function getPetController(request: FastifyRequest, reply: FastifyReply) {
    const { id } = routeSchema.parse(request.params)

    const getPetService = makeGetPetService()

    try {
        const { pet } = await getPetService.execute({ id })

        return reply.status(200).send(pet)
    } catch (err) {
        if (err instanceof PetNotFoundError) return reply.status(404).send({ message: err.message })

        console.error(err);

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
