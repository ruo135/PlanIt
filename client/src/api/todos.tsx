// Lucas Chew 260971542

import axios from 'axios'
import { Todo } from '../models/Todo'

async function getAllTodos(): Promise<Todo[]> {
  try {
    const response = await axios.get<Todo[]>('/api/todo/getAllTodos')
    const items: Todo[] = response.data
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

async function createTodo(name: string): Promise<Todo> {
  return await axios
    .post('/api/todo/createTodo', {
      todo: name,
    })
    .catch(() => {
      return null
    })
    .then((t) => {
      return t?.data
    })
}

async function updateTodo(t: Todo) {
  const { todo } = t

  return await axios
    .patch(`/api/todo/updateTodo/${t._id}`, {
      todo,
    })
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function checkTodo(todo: Todo) {
  return await axios
    .patch(`/api/todo/checkTodo/${todo._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function deleteTodo(todo: Todo) {
  return await axios
    .delete(`/api/todo/${todo._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

export { createTodo, getAllTodos, updateTodo, checkTodo, deleteTodo }
