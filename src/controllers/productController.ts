import { NextFunction, Request, Response } from 'express'

const findAllProduct = (req: Request, res: Response, next: NextFunction) => {
    res.send(req.products)
}

export default { findAllProduct }
