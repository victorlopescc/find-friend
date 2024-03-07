import { PetsRepository } from '@/repositories/pets.repository'
import { PetNotFoundError } from '@/errors/pet-not-found.error'
import { Pet } from '@prisma/client'

interface GetPetRequest {
    id: string
}

interface GetPetResponse {
    pet: Pet
}

export class GetPetService {
    constructor(private petsRepository: PetsRepository) { }

    async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
        const pet = await this.petsRepository.findById(id)

        if (!pet) throw new PetNotFoundError()

        return { pet }
    }
}
