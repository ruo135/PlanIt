// Ruo Yang Jiang 261055118

// Routes contains all the routes that we use
// to interact with the db

import express from 'express'
import * as TodoControllers from '../controllers/TodoController'

const router = express.Router()

// Routes
router.post('/createTodo', TodoControllers.createTodo)
router.get('/getAllTodos', TodoControllers.getAllTodos)
router.patch('/updateTodo/:todoId', TodoControllers.updateTodoName)
router.patch('/checkTodo/:todoId', TodoControllers.toggleTodoCheck)
router.delete('/:todoId', TodoControllers.deleteTodo)

export default router
