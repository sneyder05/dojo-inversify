import { inject, injectable, } from 'inversify'
import { Collection, } from 'lokijs'

import { FACTORIES, } from '../../../ioc'
import { IRepository, } from '../../../types'

@injectable()
export default class GetUserByIdRepository implements IRepository<any> {
  @inject(FACTORIES.LokiCollection) private lokiCollectionFactory: (collection: string) => Collection

  public async exec(id: string): Promise<any> {
    const user = this.lokiCollectionFactory('users').findOne({ id, })

    console.log('💀 TCL -> ~ file: getByIdRepository.ts ~ line 13 ~ GetUserByIdRepository ~ exec ~ user', user)

    return user
  }
}