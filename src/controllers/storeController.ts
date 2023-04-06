import { NextFunction, Request, Response } from 'express'

/**
 * SORT : 1 ascending, -1 descending
 */
const findAllStore = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send(req.stores)
}

export default { findAllStore }
