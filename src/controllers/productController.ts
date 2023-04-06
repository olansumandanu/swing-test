import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { Product } from '../models/product'

const findAllProduct = (req: Request, res: Response, next: NextFunction) => {
    return res.send('the todo')
}

const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { author, title } = req.body

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
    })

    return await product
        .save()
        .then((result) => {
            return res.status(201).json({
                product: result,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            })
        })
}

export default { createProduct, findAllProduct }
