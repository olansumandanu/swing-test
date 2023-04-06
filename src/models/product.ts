import mongoose, { Schema, model } from 'mongoose'
import { IStore, StoreDoc } from './store'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface IProduct {
    id: string
    title: string
    url: string
    price: Schema.Types.Decimal128
    description: string
    storeId: StoreDoc
}

export interface ProductDoc extends mongoose.Document {
    id: string
    title: string
    url: string
    price: Schema.Types.Decimal128
    description: string
    storeId: IStore
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: IProduct): ProductDoc
    findByEvent(event: {
        id: string
        version: number
    }): Promise<ProductDoc | null>
}

const productSchema = new Schema<ProductDoc>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            require: true,
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
            type: Schema.Types.Decimal128,
            require: true,
        },
        description: {
            type: Schema.Types.String,
            require: true,
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

productSchema.set('versionKey', 'version')
productSchema.plugin(updateIfCurrentPlugin)

productSchema.statics.findByEvent = (event: {
    id: string
    version: number
}) => {
    return Product.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}

productSchema.statics.build = (attrs: IProduct) => {
    return new Product({
        _id: attrs.id,
    })
}

const Product = model<ProductDoc, ProductModel>('Product', productSchema)

export { Product }
