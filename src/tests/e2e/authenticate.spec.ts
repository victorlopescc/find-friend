import request from 'supertest'

import { app } from '@/app'
import { fakerOrg } from '@/utils/faker-org'

describe('authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should authenticate and org', async () => {
        const org = fakerOrg()

        await request(app.server).post('/orgs').send(org)

        const response = await request(app.server).post('/orgs/authenticate').send({
            email: org.email,
            password: org.password
        })

        expect(response.status).toBe(200)
        expect(response.body.token).toEqual(expect.any(String))
    })
})
