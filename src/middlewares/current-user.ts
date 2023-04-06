import { Request, Response, NextFunction } from 'express'
import { IStore, Store } from '../models/store'

interface UserPayload {
    store: IStore
}

declare global {
    namespace Express {
        interface Request {
            stores?: IStore[]
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
    } catch (err) {}

    next()
}
