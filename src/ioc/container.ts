import { Container, interfaces, } from 'inversify'
import { Collection, } from 'lokijs'

import GetUserByIdService from '../modules/user/service/getById'
import DeleteUserByIdService from '../modules/user/service/deleteById'
import { IRepository, IService, } from '../types'
import SaveUserByIdService from '../modules/user/service/save'
import GetUserByIdRepository from '../modules/user/repository/getByIdRepository'
import db from '../databases/in-memory'

// Load metada for controllers - Autoimport by default
import '../modules/user/controller/getById'
import '../modules/user/controller/deleteById'
import '../modules/user/controller/save'

import { FACTORIES, TYPES, } from './types'
import { TAGS, } from './tags'

const container = new Container()

container.bind<IService>(TYPES.Service).to(GetUserByIdService).whenTargetNamed(TAGS.GetUserByIdService)
container.bind<IService>(TYPES.Service).to(DeleteUserByIdService).whenTargetNamed(TAGS.DeleteUserByIdService)
container.bind<IService>(TYPES.Service).to(SaveUserByIdService).whenTargetNamed(TAGS.SaveUserByIdService)

container.bind<IRepository>(TYPES.Repository).to(GetUserByIdRepository).whenTargetNamed(TAGS.GetUserByIdRepository)

container.bind<Loki>(TYPES.InMemoryDB).toConstantValue(db).whenTargetIsDefault()

container.bind<interfaces.Factory<Collection>>(FACTORIES.LokiCollection).toFactory<Collection>((context: interfaces.Context) => {
  return (collectionName: string) => {
    const db = context.container.get<Loki>(TYPES.InMemoryDB)
    const collection = db.getCollection(collectionName)

    if (!collection) {
      throw new Error(`The collection '${collectionName}' does not exist`)
    }

    return collection
  }
})

export default container