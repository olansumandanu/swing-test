import { Decimal128 } from './../node_modules/bson/src/decimal128'
import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import { app } from './app'
import { Store } from './models/store'
import { Product } from './models/product'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, NODE_PORT } =
    process.env

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

        // Dummy Store
        const store = await Store.build({
            name: 'olan',
            url: 'https://test.com/image.png',
            phone: '085352211982',
            address: 'Ujung berung bandung',
            operationalTimeEnd: 0,
            operationalTimeStart: 0,
        }).save()
        console.log(store.toJSON())

        const product = await Product.build({
            url: '12',
            title: 'test',
            store_id: store.toJSON().id,
            description: 'desc',
            price: 0.0,
        }).save()

        console.log(product.toJSON())
    } catch (err) {
        console.error(err)
    }

    app.listen(NODE_PORT, () => {
        console.log('Listening on port ' + NODE_PORT)
    })
}

start()
