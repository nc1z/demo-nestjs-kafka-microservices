import { v4 as uuid } from 'uuid'

const generateOrderId = (): string => {
    return uuid()
}

export { generateOrderId }
