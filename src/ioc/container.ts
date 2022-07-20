import { Container, interfaces, } from 'inversify'
import { Collection, } from 'lokijs'
import { buildProviderModule, } from 'inversify-binding-decorators'

import { IRepository, } from '../types'
import GetUserByIdRepository from '../modules/user/repository/getByIdRepository'
import db from '../databases/in-memory'

// Load metada to autoimport classes
import '../modules/user/controller/getById'
import '../modules/user/controller/deleteById'
import '../modules/user/controller/save'
import '../modules/user/controller/getAll'
import '../config'

import { FACTORIES, TYPES, } from './types'
import { TAGS, } from './tags'

const container = new Container()

container.load(buildProviderModule())

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