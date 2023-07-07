import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { MessagePattern } from '@nestjs/microservices'
import { UserRequestData } from './types/UserRequestData'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @MessagePattern(`get_user`)
    getUser(userRequestData: UserRequestData) {
        return this.appService.getUser(userRequestData)
    }
}
