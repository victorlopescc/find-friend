import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { CreatePetService } from '@/services/pets/create-pet'
import { OrgNotFoundError } from '@/errors/org-not-found.error'
import { fakerOrg } from '@/utils/faker-org'
import { fakerPet } from '@/utils/faker-pet'

describe('create pet', () => {
    let orgsRepository: InMemoryOrgsRepository
    let petsRepository: InMemoryPetsRepository
    let sut: CreatePetService

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new CreatePetService(orgsRepository, petsRepository)
    })

    it('should be able to create a new pet', async () => {
        const org = await orgsRepository.create(fakerOrg())
        const { pet } = await sut.execute(fakerPet({ org_id: org.id }))

        expect(petsRepository.items).toHaveLength(1)
        expect(pet.id).toEqual(expect.any(String))
    })

    it('should not be able to create a pet without a valid org', async () => {
        const pet = fakerPet()

        await petsRepository.create(pet)

        const promise = sut.execute(pet)

        await expect(promise).rejects.toBeInstanceOf(OrgNotFoundError)
    })
})
