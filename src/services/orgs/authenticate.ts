import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs.repository'
import { InvalidCredentialsError } from '@/errors/credentials.error'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    org: Org
}

export class AuthenticateService {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const org = await this.orgsRepository.findByEmail(email)

        if (!org) throw new InvalidCredentialsError()

        const passwordMatch = await compare(password, org.password)

        if (!passwordMatch) throw new InvalidCredentialsError()

        return { org }
    }
}
