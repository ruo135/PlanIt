// Routes contains all the routes that we use
// to interact with the db

import express from 'express'
import { registerUser } from '../controllers/UserController'

const router = express.Router()

// Routes
router.post('/register', registerUser)

export default router
