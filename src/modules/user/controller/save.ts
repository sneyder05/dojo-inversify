
import { inject, named, } from 'inversify'
import { controller, httpPost, interfaces, requestBody, } from 'inversify-express-utils'

import { TAGS, TYPES, } from '../../../ioc'
import SaveUserByIdService from '../service/save'

@controller('/users')
export default class SaveUserController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.Service) @named(TAGS.SaveUserByIdService) private saveUserByIdService: SaveUserByIdService,
  ) {}

  @httpPost('')
  public async save(@requestBody() user: any): Promise<any> {
    return this.saveUserByIdService.run(user)
  }
}