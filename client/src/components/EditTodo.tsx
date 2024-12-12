import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import InputField from './InputField'
import { createTodo, deleteTodo, updateTodo } from '../api/todos'
import { Todo } from '../models/Todo'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  width: 80%;
`

const Label = styled.label`
  font-size: max(12px, 0.781vw);
  color: ${(props) => props.theme.calendarText};
`

const SubmitButton = styled.button`
  padding: 8px 16px;

  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

interface EditTodoProps {
  currentTodo?: Todo

  todos: Todo[]
  changeDropdownState: Dispatch<SetStateAction<string>>
  setTodoState: Dispatch<SetStateAction<Todo[]>>
}

export default function EditTodo(props: EditTodoProps) {
  const [todoString, setTodoString] = useState(props.currentTodo?.todo ?? '')
  const [error, setError] = useState(false)

  const sortTodos = (todos: Todo[]) => {
    return todos.sort((a, b) => {
      const checkedCompare = Number(a.isChecked) - Number(b.isChecked)
      if (checkedCompare !== 0) {
        return checkedCompare
      }
      // If checked status is the same, sort by name (case-insensitive)
      return a.todo.localeCompare(b.todo)
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (todoString === '') {
      setError(true)
      return
    }

    setError(false)

    createTodo(todoString).then((t) => {
      props.todos.push(t)
      props.setTodoState(sortTodos(props.todos))
      props.changeDropdownState('')
    })
  }

  const handleUpdate = (todo: Todo | undefined) => {
    if (todo) {
      if (todoString === '') {
        setError(true)
        return
      }

      setError(false)
      updateTodo({ ...todo, todo: todoString }).then(() => {
        props.setTodoState((prev) => {
          return sortTodos(
            prev.map((item) =>
              item._id === todo._id ? { ...item, todo: todoString } : item
            )
          )
        })
        props.changeDropdownState('')
      })
    }
  }

  const handleCancel = () => {
    props.changeDropdownState('')
  }

  const handleDelete = (todo: Todo | undefined) => {
    if (todo)
      deleteTodo(todo).then(() => {
        props.setTodoState((prev) => prev.filter((t) => t._id !== todo._id))
        props.changeDropdownState('')
      })
  }

  return (
    <FormContainer>
      <Label>Todo:</Label>
      <InputField
        type="text"
        value={todoString}
        onChange={(e) => setTodoString(e.target.value)}
        placeholder="Enter todo here"
        error={error}
        errorMessage={'Tag Name Required'}
        height={'1vh'}
      />

      {props.currentTodo && (
        <>
          <SubmitButton onClick={() => handleUpdate(props.currentTodo)}>
            Save
          </SubmitButton>
          <SubmitButton onClick={() => handleDelete(props.currentTodo)}>
            Delete
          </SubmitButton>
          <SubmitButton onClick={handleCancel}>Cancel</SubmitButton>
        </>
      )}
      {!props.currentTodo && (
        <SubmitButton onClick={handleSubmit}>OK</SubmitButton>
      )}
    </FormContainer>
  )
}
