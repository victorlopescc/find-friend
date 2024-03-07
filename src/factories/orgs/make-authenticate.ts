import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthenticateService } from '@/services/orgs/authenticate'

export function makeAuthenticateService() {
    return new AuthenticateService(new PrismaOrgsRepository())
}
