import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: `BILLING_SERVICE`,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: `billing`,
                        brokers: [`kafka:29092`],
                    },
                    consumer: {
                        groupId: `billing-consumer`,
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
