import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { CreateOrgService } from '@/services/orgs/create-org'

export function makeCreateOrgService() {
    return new CreateOrgService(new PrismaOrgsRepository())
}
