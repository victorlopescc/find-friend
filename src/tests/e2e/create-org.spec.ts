import request from 'supertest'

import { app } from '@/app'
import { fakerOrg } from '@/utils/faker-org'

describe('create org (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should create an org', async () => {
        const response = await request(app.server).post('/orgs').send(fakerOrg())

        expect(response.status).toBe(201)
    })
})
