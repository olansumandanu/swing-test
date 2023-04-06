import mongoose, { Document, Schema } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface IStore {
    id: mongoose.Types.ObjectId
    name: string
    url: string
    address: string
    phone: string
    // operationalTimeStart?: number;
    // operationalTimeEnd?: number;
}

export interface StoreDoc extends Document {
    name: string
    url: string
    address: string
    phone: string
    version: number
}

interface StoreModel extends mongoose.Model<StoreDoc> {
    build(attrs: IStore): StoreDoc
}

const storeSchema = new Schema<StoreDoc>(
    {
        name: {
            type: String,
        },
        url: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        // operationalTimeStart: {
        //     type: Number,
        // },
        // operationalTimeEnd: {
        //     type: Number,
        // },
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

storeSchema.set('versionKey', 'version')
storeSchema.plugin(updateIfCurrentPlugin)

storeSchema.statics.build = (attrs: IStore) => {
    return new Store({
        _id: attrs.id,
        name: attrs.name,
        url: attrs.url,
        address: attrs.address,
        phone: attrs.phone,
    })
}

const Store = mongoose.model<StoreDoc, StoreModel>('Store', storeSchema)

export { Store }
