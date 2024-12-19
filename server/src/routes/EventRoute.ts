// Ruo Yang Jiang 261055118

// Routes contains all the routes that we use
// to interact with the db

import express from 'express'
import * as EventControllers from '../controllers/EventController'

const router = express.Router()

// Routes
router.post('/createEvent', EventControllers.createEvent)
router.patch('/updateEvent/:eventId', EventControllers.updateEvent)
router.get('/get/:monthAndYear', EventControllers.getEventsForMonth)
// prettier-ignore
router.get("/getAllEvents", EventControllers.getAllEvents)
// prettier-ignore
router.get("/getCurrentMonthEvents", EventControllers.getAllVisibileEventsForCurrentMonth);
router.delete('/:eventId', EventControllers.deleteEvent)

export default router
