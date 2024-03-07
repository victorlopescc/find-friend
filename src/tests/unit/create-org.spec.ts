import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { CreateOrgService } from '@/services/orgs/create-org'
import { OrgAlreadyExistsError } from '@/errors/already-existis.error'
import { fakerOrg } from '@/utils/faker-org'

describe('create org', () => {
    let orgsRepository: InMemoryOrgsRepository
    let sut: CreateOrgService

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new CreateOrgService(orgsRepository)
    })

    it('should be able to create a new org', async () => {
        const { org } = await sut.execute(fakerOrg())

        expect(orgsRepository.items).toHaveLength(1)
        expect(org.id).toEqual(expect.any(String))
    })

    it('should not be able to create a new org with same email', async () => {
        const org = fakerOrg()

        await orgsRepository.create(org)

        await expect(sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })

    it('should hash password upon creation', async () => {
        const password = 'password'
        const { org } = await sut.execute(fakerOrg({ password }))

        expect(await compare(password, org.password)).toBe(true)
        expect(await compare(password, orgsRepository.items[0].password)).toBe(true)
    })
})
