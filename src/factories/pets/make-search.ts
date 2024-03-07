import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { SearchPetsService } from '@/services/pets/search'

export function makeSearchPetsService() {
    return new SearchPetsService(new PrismaPetsRepository())
}
