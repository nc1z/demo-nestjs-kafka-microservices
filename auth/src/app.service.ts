import { Injectable, Inject } from '@nestjs/common'
import { GetUserRequest } from './dtos/get-user-request.dto'
import { UserData } from './types/UserData'
import { users } from './mock/database'

@Injectable()
export class AppService {
    private readonly users: UserData[]

    constructor() {
        this.users = users
    }

    getHello(): string {
        return 'Hello World!'
    }

    getUser(getUserRequest: GetUserRequest) {
        return this.users.find(
            (user: UserData) => user.userId === getUserRequest.userId,
        )
    }
}
