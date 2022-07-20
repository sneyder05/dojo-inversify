import { inject, } from 'inversify'
import { fluentProvide, } from 'inversify-binding-decorators'
import Loki from 'lokijs'
import nanoid from 'nanoid'

import { TAGS, TYPES, } from '../../../ioc'
import { IService, } from '../../../types'

@fluentProvide(TYPES.Service).whenTargetNamed(TAGS.SaveUserByIdService).done()
export default class SaveUserByIdService implements IService<void> {
  @inject(TYPES.InMemoryDB) private lokiDb: Loki

  public async run(user: any): Promise<any> {
    const usersCollection = this.lokiDb.getCollection('users')

    user.id = nanoid()
    user.createdAt = new Date().toISOString()
    user.updateAt = new Date().toISOString()

    return usersCollection.insert(user)
  }
}