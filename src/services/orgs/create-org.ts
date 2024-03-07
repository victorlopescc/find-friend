import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { OrgAlreadyExistsError } from '@/errors/already-existis.error'
import { hash } from 'bcryptjs'

interface CreateOrgRequest {
    name: string
    author_name: string
    email: string
    whatsapp: string
    password: string
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    latitude: number
    longitude: number
}

interface CreateOrgResponse {
    org: Org
}

export class CreateOrgService {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({
        name,
        author_name,
        email,
        whatsapp,
        password,
        cep,
        state,
        city,
        neighborhood,
        street,
        latitude,
        longitude
    }: CreateOrgRequest): Promise<CreateOrgResponse> {
        const orgsByEmail = await this.orgsRepository.findByEmail(email)

        if (orgsByEmail) throw new OrgAlreadyExistsError()

        const password_hash = await hash(password, 8)

        const org = await this.orgsRepository.create({
            name,
            author_name,
            email,
            whatsapp,
            password: password_hash,
            cep,
            state,
            city,
            neighborhood,
            street,
            latitude,
            longitude
        })

        return { org }
    }
}
