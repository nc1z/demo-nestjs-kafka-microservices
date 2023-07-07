import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common'
import { AppService } from './app.service'
import { EventPattern, ClientKafka } from '@nestjs/microservices'
import { OrderData } from './types/OrderData'

@Controller()
export class AppController implements OnModuleInit {
    constructor(
        private readonly appService: AppService,
        @Inject(`AUTH_SERVICE`) private readonly authClient: ClientKafka,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @EventPattern(`order_created`)
    handleOrderCreated(orderData: OrderData) {
        this.appService.handleOrderCreated(orderData)
    }

    onModuleInit() {
        this.authClient.subscribeToResponseOf(`get_user`)
    }
}
