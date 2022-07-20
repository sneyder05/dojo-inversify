import { inject, } from 'inversify'
import { fluentProvide, } from 'inversify-binding-decorators'
import Loki from 'lokijs'

import { TAGS, TYPES, } from '../../../ioc'
import { IService, } from '../../../types'

@fluentProvide(TYPES.Service).whenTargetNamed(TAGS.GetAllUsersService).done()
export default class GetAllUsersService implements IService<any[]> {
  @inject(TYPES.InMemoryDB) private lokiDb: Loki

  public async run(): Promise<any[]> {
    const usersCollection = this.lokiDb.getCollection('users')

    const users = usersCollection.find()

    return users
  }
}