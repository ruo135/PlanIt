// Ruo Yang Jiang 261055118

// Routes contains all the routes that we use
// to interact with the db

import express from 'express'
import * as ThemeController from '../controllers/ThemeController'

const router = express.Router()

// Routes
router.get('/', ThemeController.getTheme)
router.patch('/', ThemeController.updateTheme)

export default router
