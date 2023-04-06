import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface IStore {
    name: string
    url: string
    address: string
    phone: string
    operationalTimeStart: number
    operationalTimeEnd: number
}

export interface StoreDoc extends Document {
    name: string
    url: string
    address: string
    phone: string
    operationalTimeStart: number
    operationalTimeEnd: number
    version: number
}

interface StoreModel extends mongoose.Model<StoreDoc> {
    build(attrs: IStore): StoreDoc
}

const storeSchema = new Schema<StoreDoc>(
    {
        _id: {
            type: String,
            default: function genUUID() {
                uuidv4()
            },
        },
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
        operationalTimeStart: {
            type: Number,
        },
        operationalTimeEnd: {
            type: Number,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                ret.operational_time_start = ret.operationalTimeStart
                ret.operational_time_end = ret.operationalTimeEnd

                delete ret._id
                delete ret.version
                delete ret.operationalTimeStart
                delete ret.operationalTimeEnd
            },
        },
    }
)

storeSchema.set('versionKey', 'version')
storeSchema.plugin(updateIfCurrentPlugin)

storeSchema.statics.build = (attrs: IStore) => {
    return new Store({
        _id: uuidv4(),
        name: attrs.name,
        url: attrs.url,
        address: attrs.address,
        phone: attrs.phone,
        operationalTimeStart: attrs.operationalTimeStart,
        operationalTimeEnd: attrs.operationalTimeEnd,
    })
}

const Store = mongoose.model<StoreDoc, StoreModel>('Store', storeSchema)

export { Store }
