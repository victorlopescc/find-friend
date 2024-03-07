import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { NearbyOrgsService } from '@/services/orgs/nearby'
import { fakerOrg } from '@/utils/faker-org'

describe('nearby orgs', () => {
    let orgsRepository: InMemoryOrgsRepository
    let sut: NearbyOrgsService

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new NearbyOrgsService(orgsRepository)
    })

    it('should be able to find nearby orgs', async () => {
        const org = await orgsRepository.create(fakerOrg())

        const nearbyOrgs = await sut.execute({
            userLatitude: org.latitude.toNumber(),
            userLongitude: org.longitude.toNumber()
        })

        expect(nearbyOrgs.orgs).toEqual([org])
    })
})
