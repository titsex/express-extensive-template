import { NextFunction, Request, Response } from 'express'
import { HttpError } from '@class/Error'
import { getErrorMessage } from '@utils'

export function errorMiddleware(error: Error | HttpError, request: Request, response: Response, _: NextFunction) {
    if (error instanceof HttpError) {
        const { statusCode, ...data } = error

        let result = data

        if (data.errors) {
            if (
                (Array.isArray(data.errors) && !data.errors.length) ||
                (!Array.isArray(data.errors) && !Object.keys(data.errors!).length)
            )
                result = (({ errors: _, ...rest }) => rest)(data)
        }

        return response.status(statusCode).json(result)
    }

    return response.status(404).send({
        error: `An error occurred while requesting ${request.route.stack.at(-1).name || 'the API'}`,
        message: getErrorMessage(error),
    })
}
