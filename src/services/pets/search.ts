import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface SearchPetsRequest {
    city: string
    age?: string
    size?: string
    energy_level?: string
    environment?: string
}

interface SearchPetsResponse {
    pets: Pet[]
}

export class SearchPetsService {
    constructor(private petsRepository: PetsRepository) { }

    async execute({
        city,
        age,
        size,
        energy_level,
        environment
    }: SearchPetsRequest): Promise<SearchPetsResponse> {
        const pets = await this.petsRepository.findAll({
            city,
            age,
            size,
            energy_level,
            environment
        })

        return { pets }
    }
}
