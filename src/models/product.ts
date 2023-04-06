import mongoose, { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { IStore } from './store'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface IProduct {
    title: string
    url: string
    price: number
    description: string
    store_id: string
}

export interface ProductDoc extends mongoose.Document {
    title: string
    url: string
    price: number
    description: string
    store_id: IStore
    version: number
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: IProduct): ProductDoc
}

const productSchema = new Schema<ProductDoc>(
    {
        _id: {
            type: String,
            default: function genUUID() {
                uuidv4()
            },
        },
        title: {
            type: Schema.Types.String,
            require: true,
        },
        url: {
            type: Schema.Types.String,
            require: true,
        },
        price: {
            type: Schema.Types.Number,
            require: true,
        },
        description: {
            type: Schema.Types.String,
            require: true,
        },
        store_id: {
            type: Schema.Types.String,
            ref: 'Store',
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.version
            },
        },
    }
)

productSchema.set('versionKey', 'version')
productSchema.plugin(updateIfCurrentPlugin)

productSchema.statics.build = (attrs: IProduct) => {
    return new Product({
        _id: uuidv4(),
        title: attrs.title,
        url: attrs.url,
        price: attrs.price,
        description: attrs.description,
        store_id: attrs.store_id,
    })
}

const Product = model<ProductDoc, ProductModel>('Product', productSchema)

export { Product }
