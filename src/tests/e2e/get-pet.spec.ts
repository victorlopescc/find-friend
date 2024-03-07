import request from 'supertest'

import { app } from '@/app'
import { fakerOrg } from '@/utils/faker-org'
import { fakerPet } from '@/utils/faker-pet'

describe('get pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should get a pet', async () => {
        const org = fakerOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server).post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const response = await request(app.server).post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(fakerPet())

        const getPetResponse = await request(app.server)
            .get(`/orgs/pets/${response.body.id}`)
            .set('Authorization', `Bearer ${authResponse.body.token}`)

        expect(getPetResponse.status).toBe(200)
    })
})
