import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs.repository'

interface NearbyOrgsRequest {
    userLatitude: number
    userLongitude: number
}

interface NearbyOrgsResponse {
    orgs: Org[]
}

export class NearbyOrgsService {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({ userLatitude, userLongitude }: NearbyOrgsRequest): Promise<NearbyOrgsResponse> {
        const orgs = await this.orgsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return { orgs }
    }
}
