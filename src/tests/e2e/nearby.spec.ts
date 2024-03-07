import request from 'supertest'

import { app } from '@/app'
import { fakerOrg } from '@/utils/faker-org'

describe('nearby orgs (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to find nearby orgs', async () => {
        const org = await fakerOrg()

        await request(app.server).post('/orgs').send(org).expect(201)

        const response = await request(app.server).get('/orgs/nearby')
            .query({ latitude: org.latitude, longitude: org.longitude })
            .expect(200)

        expect(response.body.orgs).toHaveLength(1)
        expect(response.body.orgs[0].name).toBe(org.name)
    })
})
