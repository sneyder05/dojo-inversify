
import { inject, named, } from 'inversify'
import { controller, httpDelete, interfaces, requestParam, } from 'inversify-express-utils'

import { TAGS, TYPES, } from '../../../ioc'
import DeleteUserByIdService from '../service/deleteById'

@controller('/users')
export default class DeleteUserByIdController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.Service) @named(TAGS.DeleteUserByIdService) private deleteUserByIdService: DeleteUserByIdService,
  ) {}

  @httpDelete('/:id')
  public async deleteById(@requestParam('id') id: string): Promise<void> {
    await this.deleteUserByIdService.run(id)
  }
}