import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { NearbyOrgsService } from '@/services/orgs/nearby'

export function makeNearbyOrgsService() {
    return new NearbyOrgsService(new PrismaOrgsRepository())
}
