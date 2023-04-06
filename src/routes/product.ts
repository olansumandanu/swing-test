import express from 'express'

import productController from '../controllers/productController'

const router = express.Router()

router.get('/api/products', productController.findAllProduct)

export { router as productRouter }
