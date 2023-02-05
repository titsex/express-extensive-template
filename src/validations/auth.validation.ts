import { body, param } from 'express-validator'

export class AuthValidation {
    public static registration = [
        body('email', 'The email must be an email').isEmail(),
        body('password', 'Password length is at least 8 characters').isLength({ min: 8 }),
    ]

    public static login = [
        body('email', 'The email must be an email').isEmail(),
        body('password', 'Password length is at least 8 characters').isLength({ min: 8 }),
    ]

    public static activate = [
        param('email', 'The email must be an email').isEmail(),
        param('hex', 'The hex parameter must not be empty').notEmpty(),
    ]
}
