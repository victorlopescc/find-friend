import { FastifyInstance } from 'fastify'

import { createOrgController } from '@/controllers/orgs/create-org.controller'
import { authenticateController } from '@/controllers/orgs/authenticate.controller'
import { nearbyOrgsController } from '@/controllers/orgs/nearby.controller'

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/orgs', createOrgController)
    app.post('/orgs/authenticate', authenticateController)
    app.get('/orgs/nearby', nearbyOrgsController)
}
