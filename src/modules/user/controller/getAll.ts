
import { inject, named, } from 'inversify'
import { controller, httpGet, interfaces, } from 'inversify-express-utils'

import { TAGS, TYPES, } from '../../../ioc'
import GetAllUsersService from '../service/getAll'

@controller('/users')
export default class GetAllUsesController implements interfaces.Controller {
  @inject(TYPES.Service) @named(TAGS.GetAllUsersService) private getAllUsersService: GetAllUsersService

  @httpGet('/')
  public async getById(): Promise<any[]> {
    return this.getAllUsersService.run()
  }
}