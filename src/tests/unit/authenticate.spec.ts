import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { fakerOrg } from '@/utils/faker-org'
import { AuthenticateService } from '@/services/orgs/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/credentials.error'

describe('authenticate org', () => {
    let orgsRepository: InMemoryOrgsRepository
    let sut: AuthenticateService

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new AuthenticateService(orgsRepository)
    })

    it('should be able to authenticate an org', async () => {
        const password = 'password'

        const org = await orgsRepository.create(
            fakerOrg({ password: await hash(password, 8) })
        )

        const { org: authenticatedOrg } = await sut.execute({
            email: org.email,
            password
        })

        expect(authenticatedOrg).toEqual(org)
    })

    it('should not be able to authenticate with wrong email', async () => {
        const promise = sut.execute({
            email: 'user@email.com',
            password: 'password'
        })

        await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const password = 'password'

        const org = await orgsRepository.create(
            fakerOrg({ password: await hash(password, 8) })
        )

        const promise = sut.execute({
            email: org.email,
            password: 'wrong-password'
        })

        await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
