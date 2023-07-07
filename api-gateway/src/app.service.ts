import { Inject, Injectable } from '@nestjs/common'
import { CreateOrderRequest } from './dtos/create-order-request.dto'
import { ClientKafka } from '@nestjs/microservices/client'
import { OrderCreatedEvent } from './events/order-created.event'
import { generateOrderId } from './helpers/uuid'

@Injectable()
export class AppService {
    constructor(
        @Inject(`BILLING_SERVICE`) private readonly billingClient: ClientKafka,
    ) {}

    getHello(): string {
        return 'Hello World!'
    }

    createOrder(createOrderRequest: CreateOrderRequest) {
        const { userId, price } = createOrderRequest
        this.billingClient.emit(
            `order_created`,
            new OrderCreatedEvent(generateOrderId(), userId, price),
        )
    }
}
