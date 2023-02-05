import { BadRequestErrorType } from '@types'

export class HttpError {
    constructor(
        public readonly statusCode: number,
        public readonly error: string = 'No error details',
        public readonly message: string,
        public readonly errors?: BadRequestErrorType
    ) {}
}

export class BadRequest extends HttpError {
    constructor(message: string, error?: string) {
        super(400, error, message)
    }
}

export class Unvalidated extends HttpError {
    constructor(errors: BadRequestErrorType) {
        super(400, 'Unvalidated', 'Error during data validations', errors)
    }
}

export class Unauthorized extends HttpError {
    constructor() {
        super(401, 'Unauthorized', 'You must be logged in')
    }
}

export class Forbidden extends HttpError {
    constructor() {
        super(403, 'Forbidden', "You don't have enough rights")
    }
}
