import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeNearbyOrgsService } from '@/factories/orgs/make-nearby'

const querySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
    })
})

export async function nearbyOrgsController(request: FastifyRequest, reply: FastifyReply) {
    const query = querySchema.parse(request.query)

    const nearbyOrgsService = makeNearbyOrgsService()

    try {
        const { orgs } = await nearbyOrgsService.execute({
            userLatitude: query.latitude,
            userLongitude: query.longitude
        })

        return reply.status(200).send({ orgs })
    } catch (err) {
        console.error(err)

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
