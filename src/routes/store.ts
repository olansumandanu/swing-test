import express from 'express'

import storeController from '../controllers/storeController'

const router = express.Router()

router.get('/api/stores', storeController.findAllStore)

export { router as storeRouter }
