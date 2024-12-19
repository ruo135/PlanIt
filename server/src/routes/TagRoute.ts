// Ruo Yang Jiang 261055118

// Routes contains all the routes that we use
// to interact with the db

import express from 'express'
import * as TagControllers from '../controllers/TagController'

const router = express.Router()

// Routes
router.post('/createTag', TagControllers.createTag)
router.get('/getAllTags', TagControllers.getAllTags)
router.patch('/updateTag/:tagId', TagControllers.updateTag)
router.patch('/toggleVisibility/:tagId', TagControllers.toggleVisibility)
router.delete('/:tagId', TagControllers.deleteTag)

export default router
