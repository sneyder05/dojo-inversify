import { Controller, Get, Response, } from '@decorators/express'

@Controller('/')
export default class GetUserByIdController {
  @Get('/:id')
  public async getById(@Response() res): Promise<void> {
    res.send(this.genFakeUser())
  }

  private genFakeUser(): any {
    return {
      id: Math.random().toString().slice(3, 10),
      name: 'Jane',
      lastname: 'Doe',
      _at: new Date().toISOString(),
    }
  }
}