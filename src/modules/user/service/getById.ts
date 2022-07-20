import { inject, injectable, named, } from 'inversify'
import Loki from 'lokijs'

import { NotFoundError, } from '../../../errors'
import { TAGS, TYPES, } from '../../../ioc'
import { IService, } from '../../../types'
import GetUserByIdRepository from '../repository/getByIdRepository'

@injectable()
export default class GetUserByIdService implements IService<any> {
  @inject(TYPES.InMemoryDB) private lokiDb: Loki
  @inject(TYPES.Repository) @named(TAGS.GetUserByIdRepository) private repo: GetUserByIdRepository

  public async run(id: string): Promise<any> {
    const usersCollection = this.lokiDb.getCollection('users')

    // FIXME: Pointless call, just brings us a view of how a factory could be used
    await this.repo.exec(id)

    const user = usersCollection.findOne({ id, })

    if (!user) {
      throw new NotFoundError(`Unable to find user with id '${id}'`)
    }

    return user
  }
}