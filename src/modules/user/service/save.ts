import { inject, injectable, } from 'inversify'
import Loki from 'lokijs'
import nanoid from 'nanoid'

import { TYPES, } from '../../../ioc'
import { IService, } from '../../../types'

@injectable()
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