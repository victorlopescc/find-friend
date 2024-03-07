import { OrgsRepository } from '@/repositories/orgs.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { OrgNotFoundError } from '@/errors/org-not-found.error'
import { Pet } from '@prisma/client'

interface CreatePetRequest {
    name: string
    about: string
    age: string
    size: string
    energy_level: string
    environment: string
    org_id: string
}

interface CreatePetResponse {
    pet: Pet
}

export class CreatePetService {
    constructor(private orgsRepository: OrgsRepository, private petsRepository: PetsRepository) { }

    async execute({
        name,
        about,
        age,
        size,
        energy_level,
        environment,
        org_id
    }: CreatePetRequest): Promise<CreatePetResponse> {
        const org = await this.orgsRepository.findById(org_id)

        if (!org) throw new OrgNotFoundError()

        const pet = await this.petsRepository.create({
            name,
            about,
            age,
            size,
            energy_level,
            environment,
            org_id
        })

        return { pet }
    }
}
