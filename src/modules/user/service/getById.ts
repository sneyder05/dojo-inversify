import { inject, } from 'inversify'
import { fluentProvide, } from 'inversify-binding-decorators'
import Loki from 'lokijs'

import { NotFoundError, } from '../../../errors'
import { TAGS, TYPES, } from '../../../ioc'
import { IService, } from '../../../types'

@fluentProvide(TYPES.Service).whenTargetNamed(TAGS.GetUserByIdService).done()
export default class GetUserByIdService implements IService<any> {
  constructor(
    @inject(TYPES.InMemoryDB) private lokiDb: Loki
  ) {}

  public async run(id: string): Promise<any> {
    const usersCollection = this.lokiDb.getCollection('users')

    const user = usersCollection.findOne({ id, })

    if (!user) {
      throw new NotFoundError(`Unable to find user with id '${id}'`)
    }

    return user
  }
}