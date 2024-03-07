import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsService } from '@/factories/pets/make-search'

const querySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional()
})

export async function searchPetsController(request: FastifyRequest, reply: FastifyReply) {
    const { city, age, size, energy_level, environment } = querySchema.parse(request.query)

    const searchPetsService = makeSearchPetsService()

    try {
        const { pets } = await searchPetsService.execute({
            city,
            age,
            size,
            energy_level,
            environment
        })

        return reply.status(200).send({ pets })
    } catch (err) {
        console.error(err)

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
