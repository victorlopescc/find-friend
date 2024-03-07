import request from 'supertest'

import { app } from '@/app'
import { fakerOrg } from '@/utils/faker-org'
import { fakerPet } from '@/utils/faker-pet'

describe('search pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search pets by city', async () => {
        const org = fakerOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server).post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server).post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(fakerPet())

        await request(app.server).post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(fakerPet())

        const response = await request(app.server).get('/orgs/pets')
            .query({ city: org.city })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)
    })

    it('should be able to search pets by city and all filters', async () => {
        const org = fakerOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server).post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const pets = [
            fakerPet({
                age: '1',
                size: 'small',
                energy_level: 'low',
                environment: 'indoor',
            }),
            fakerPet({
                age: '2',
                size: 'medium',
                energy_level: 'medium',
                environment: 'outdoor',
            }),
            fakerPet({
                age: '1',
                size: 'large',
                energy_level: 'high',
                environment: 'indoor',
            }),
            fakerPet({
                age: '4',
                size: 'small',
                energy_level: 'low',
                environment: 'outdoor',
            }),
            fakerPet({
                age: '5',
                size: 'medium',
                energy_level: 'medium',
                environment: 'indoor',
            }),
        ]

        await Promise.all(
            pets.map((pet) =>
                request(app.server).post('/orgs/pets')
                    .set('Authorization', `Bearer ${authResponse.body.token}`)
                    .send(pet),
            ),
        )

        let response = await request(app.server).get('/orgs/pets').query({
            city: org.city,
            age: '1',
            size: 'small',
            energy_level: 'low',
            environment: 'indoor',
        })

        expect(response.body.pets).toHaveLength(1)

        response = await request(app.server).get('/orgs/pets').query({
            city: org.city,
            size: 'medium',
        })

        expect(response.body.pets).toHaveLength(2)

        response = await request(app.server).get('/orgs/pets').query({
            city: org.city,
            energy_level: 'low',
        })

        expect(response.body.pets).toHaveLength(2)
    })
})
