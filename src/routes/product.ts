import express from 'express'

import productController from '../controllers/productController'

const router = express.Router()

router.post('/', productController.createProduct)
router.get('/api/todo', productController.findAllProduct)

export { router as productRouter }
