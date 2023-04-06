import { Request, Response, NextFunction } from 'express'
import { IStore, Store } from '../models/store'
import { IProduct, Product } from '../models/product'

declare global {
    namespace Express {
        interface Request {
            stores?: IStore[]
            products?: any
        }
    }
}

export const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        req.stores = await Store.find()
        req.products = await Product.find().populate('store_id').exec()
    } catch (err) {}

    next()
}
