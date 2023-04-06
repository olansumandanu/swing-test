import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import { app } from './app'
import { Store } from './models/store'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const MONGO_URI =
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` ||
    null

const start = async () => {
    if (!MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        console.log('Connected to MongoDb')

        const user = Store.build({
            name: 'olan',
            url: 'https://test.com/image.png',
            phone: '085352211982',
            address: 'Ujung berung bandung',
            id: new mongoose.Types.ObjectId(),
        })
        await user.save()
    } catch (err) {
        console.error(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!')
    })
}

start()
