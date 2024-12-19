// Ruo Yang Jiang 261055118

import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import TodoModel from '../models/TodoModel'
import { assertIsDefined } from '../util/assertIsDefined'
import mongoose from 'mongoose'

interface CreateTodoBody {
  todo?: string
  isChecked?: boolean
}
// prettier-ignore
export const createTodo: RequestHandler<unknown,unknown,CreateTodoBody,unknown> = async (req, res, next) => {
  const { todo } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!todo ) {
      throw createHttpError(
        400,
        "Todos cannot be empty"
      );
    }
    
    const newTodo = await TodoModel.create({
      userId: authenticatedUserId,
      todo,
      isChecked: false
    });

    res.status(200).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const todos = await TodoModel.find({ userId: authenticatedUserId })
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

interface UpdateTodoParams {
  todoId: string
}

interface UpdateTodoBody {
  todo?: string
}

// prettier-ignore
export const updateTodoName: RequestHandler<UpdateTodoParams, unknown, UpdateTodoBody, unknown> = async (req, res, next) => {
  const { todoId } = req.params;
  const { todo } = req.body
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(todoId)) {
      throw createHttpError(400, "Invalid todo id");
    }

    if (!todo) {
      throw createHttpError(400, "Todos must have content");
    }

    const todoFOund = await TodoModel.findById(todoId);
    if (!todoFOund) {
      throw createHttpError(404, "Todo not found");
    }

    if (!todoFOund.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this todo");
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, { todo: todo }, {new: true});
    res.status(200).json(updatedTodo);


  } catch (error) {
    next(error);
  }
};

export const toggleTodoCheck: RequestHandler = async (req, res, next) => {
  const { todoId } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(todoId)) {
      throw createHttpError(400, 'Invalid todo id')
    }

    const todo = await TodoModel.findById(todoId).exec()

    if (!todo) {
      throw createHttpError(404, 'Todo not found')
    }

    if (!todo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this todo')
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      {
        isChecked: !todo.isChecked,
      },
      { new: true }
    )

    res.status(200).json(updatedTodo)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const { todoId } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(todoId)) {
      throw createHttpError(400, 'Invalid todo id')
    }

    const todo = await TodoModel.findById(todoId).exec()

    if (!todo) {
      throw createHttpError(404, 'Todo not found')
    }

    if (!todo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this todo')
    }

    await TodoModel.findByIdAndDelete(todoId)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
