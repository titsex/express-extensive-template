import { NextFunction } from 'express'
import { CreateDto } from '@dto/auth'
import { Request } from 'express'

export enum COLORS {
    NONE = '\x1b[0',
    CYAN = '\x1b[36',
    RED = '\x1b[31',
    YELLOW = '\x1b[33',
}

export interface IRequest extends Request {
    user?: CreateDto
}

export interface IValidationErrors {
    param: string
    message: string
}

export type BadRequestErrorType = IValidationErrors | IValidationErrors[]

export enum COLOR_TYPES {
    NONE = 'm',
    BOLD = ';1m',
}

export enum Roles {
    USER = 'user',
    DEVELOPER = 'developer',
}

export type expressFn = (req: Request, res: Response, next: NextFunction) => unknown

export type CacheType = 'Registration' | 'Login' | 'OfferSending'

export interface CustomRoute {
    stack: Stack[]
}

export interface Stack {
    handle: expressFn
    name?: string
}
