import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { PetNotFoundError } from '@/errors/pet-not-found.error'
import { GetPetService } from '@/services/pets/get-pet'
import { fakerPet } from '@/utils/faker-pet'

describe('get pet', () => {
    let orgsRepository: InMemoryOrgsRepository
    let petsRepository: InMemoryPetsRepository
    let sut: GetPetService

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new GetPetService(petsRepository)
    })

    it('should be able to get a pet', async () => {
        const pet = await petsRepository.create(fakerPet())
        const result = await sut.execute({ id: pet.id })

        expect(result.pet).toEqual(pet)
    })
    0
    it('should not be able to get a non-existing pet', async () => {
        const promise = sut.execute({
            id: 'non-existing-id'
        })

        await expect(promise).rejects.toBeInstanceOf(PetNotFoundError)
    })
})
