import { Container, } from 'inversify'
import Loki, { Collection, } from 'lokijs'
import nanoid from 'nanoid'

import { NotFoundError, } from '../../../../../src/errors'
import { TAGS, TYPES, } from '../../../../../src/ioc'
import DeleteUserByIdService from '../../../../../src/modules/user/service/deleteById'
import GetUserByIdService from '../../../../../src/modules/user/service/getById'
import { IService, IUserCollection, } from '../../../../../src/types'

describe('DeleteUserByIdService', () => {
  let container: Container
  let db: Loki
  let usersCollection: Collection<IUserCollection>
  const uniqueUserId = nanoid()

  beforeAll(() => {
    container = new Container()

    db = new Loki('example.db')

    usersCollection = db.addCollection<IUserCollection>('users', { indices: [ 'id', ], },)

    usersCollection.insert({
      id: uniqueUserId,
      name: 'Test',
      lastname: 'Unit',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    container.bind<Loki>(TYPES.InMemoryDB).toConstantValue(db).whenTargetIsDefault()
    container.bind<IService>(TYPES.Service).to(GetUserByIdService).whenTargetNamed(TAGS.GetUserByIdService)
    container.bind<IService>(TYPES.Service).to(DeleteUserByIdService).whenTargetNamed(TAGS.DeleteUserByIdService)
  })

  afterAll(() => {
    db.close()
  })

  beforeEach(() => {
    container.snapshot()
  })

  afterEach(() => {
    container.restore()
  })

  it.skip('[Deprecated] Should delete an user given an ID', async () => {
    // Arrange
    const service = container.getNamed<DeleteUserByIdService>(TYPES.Service, TAGS.DeleteUserByIdService)

    // Act
    await service.run(uniqueUserId)

    const users = usersCollection.find()

    // Assert
    expect(service).toBeTruthy()
    expect(users).toBeTruthy()
    expect(users.length).toEqual(0)
  })

  it('Should delete an user given an ID', () => {
    // Arrange
    const userId = nanoid()
    const usersCollection = {
      findOne: jest.fn().mockReturnValue({ id: userId, name: 'X', lastname: 'Y', }),
      findAndRemove: jest.fn(),
    }
    const db = {
      getCollection: jest.fn().mockReturnValue(usersCollection),
    } as unknown as Loki

    const getUserByIdService = new GetUserByIdService(db)
    const deleteUserByIdService = new DeleteUserByIdService(db, getUserByIdService)

    const spyGetCollection = jest.spyOn(db, 'getCollection')
    const spyGetUserByIdServiceRun = jest.spyOn(getUserByIdService, 'run')

    // Act
    deleteUserByIdService.run(userId)

    // Assert
    expect(deleteUserByIdService).toBeTruthy()
    expect(spyGetCollection).toHaveBeenCalledWith('users')
    expect(spyGetUserByIdServiceRun).toHaveBeenCalledWith(userId)
  })

  it('Should throw an error due to missing user given an ID', () => {
    // Arrange
    const userId = nanoid()
    const usersCollection = {
      findOne: jest.fn().mockReturnValue(null),
    }
    const db = {
      getCollection: jest.fn().mockReturnValue(usersCollection),
    } as unknown as Loki

    const getUserByIdService = new GetUserByIdService(db)
    const deleteUserByIdService = new DeleteUserByIdService(db, getUserByIdService)

    const spyGetCollection = jest.spyOn(db, 'getCollection')
    const spyGetUserByIdServiceRun = jest.spyOn(getUserByIdService, 'run')

    // Act
    const run = async () => deleteUserByIdService.run(userId)

    // Assert
    expect(deleteUserByIdService).toBeTruthy()
    expect(run()).rejects.toThrow(NotFoundError)
    expect(spyGetCollection).toHaveBeenCalledWith('users')
    expect(spyGetUserByIdServiceRun).toHaveBeenCalledWith(userId)
  })
})