import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { CreatePetService } from '@/services/pets/create-pet'

export function makeCreatePetService() {
    return new CreatePetService(
        new PrismaOrgsRepository(),
        new PrismaPetsRepository()
    )
}
