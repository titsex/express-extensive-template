const NODE_ENV = process.env.NODE_ENV || 'development'

import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '..', `.${NODE_ENV}.env`) })

import { errorMiddleware } from '@middleware/error.middleware'
import { asyncHandlerStack } from '@utils'
import { Logger } from '@class/Logger'
import { Cache } from '@class/Cache'
import { DB } from '@database'

import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import express from 'express'
import router from '@router'
import cors from 'cors'

const app = express()
const port = 7000 || process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(cors())

app.use(express.static('public'))
app.use('/api', asyncHandlerStack(router))
app.use(errorMiddleware)

const start = async () => {
    try {
        await new DB(process.env.PG_URL!)
        await Cache.connect()
        app.listen(port, () => Logger.info(`Server has been started on ${port} port.`))
    } catch (error) {
        Logger.error(error)
    }
}

start().then()
