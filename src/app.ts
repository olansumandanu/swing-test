import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { storeRouter } from './routes/store'
import { currentUser } from './middlewares/current-user'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(currentUser)

app.use(storeRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
