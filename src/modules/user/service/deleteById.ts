import { inject, named, } from 'inversify'
import { fluentProvide, } from 'inversify-binding-decorators'
import Loki from 'lokijs'

import { NotFoundError, } from '../../../errors'
import { TAGS, TYPES, } from '../../../ioc'
import { IService, } from '../../../types'

import GetUserByIdService from './getById'

@fluentProvide(TYPES.Service).whenTargetNamed(TAGS.DeleteUserByIdService).done()
export default class DeleteUserByIdService implements IService<void> {
  @inject(TYPES.InMemoryDB) private lokiDb: Loki
  @inject(TYPES.Service) @named(TAGS.GetUserByIdService) private getUserByIdService: GetUserByIdService

  public async run(id: string): Promise<void> {
    const usersCollection = this.lokiDb.getCollection('users')
    const user = await this.getUserByIdService.run(id)

    if (!user) {
      throw new NotFoundError(`Unable to delete user with id '${id}', the user does not exist`)
    }

    usersCollection.findAndRemove({ id: user.id, })
  }
}