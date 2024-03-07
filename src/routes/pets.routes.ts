import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt'

import { createPetController } from '@/controllers/pets/create-pet.controller'
import { getPetController } from '@/controllers/pets/get-pet.controller'
import { searchPetsController } from '@/controllers/pets/search.controller'

export async function petsRoutes(app: FastifyInstance) {
    app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetController)
    app.get('/orgs/pets/:id', getPetController)
    app.get('/orgs/pets', searchPetsController)
}
