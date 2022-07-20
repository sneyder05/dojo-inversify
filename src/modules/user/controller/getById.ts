
import { inject, named, } from 'inversify'
import { controller, httpGet, interfaces, requestParam, } from 'inversify-express-utils'

import { TAGS, TYPES, } from '../../../ioc'
import GetUserByIdService from '../service/getById'

@controller('/users')
export default class GetUserByIdController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.Service) @named(TAGS.GetUserByIdService) private getUserByIdService: GetUserByIdService,
  ) {}

  @httpGet('/:id')
  public async getById(@requestParam('id') id: string): Promise<any> {
    return this.getUserByIdService.run(id)
  }
}