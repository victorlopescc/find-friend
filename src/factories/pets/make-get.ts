import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { GetPetService } from '@/services/pets/get-pet'

export function makeGetPetService() {
    return new GetPetService(new PrismaPetsRepository())
}
