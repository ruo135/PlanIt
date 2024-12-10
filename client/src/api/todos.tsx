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

async function createTodo(name: string) {
  return await axios
    .post('/api/todo/createTodo', {
      name,
    })
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
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
    .delete(`/api/tag/${todo._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

export { createTodo, getAllTodos, updateTodo, checkTodo, deleteTodo }
