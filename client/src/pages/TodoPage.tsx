// Lucas Chew 260971542

import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'
import getTheme from '../api/themes'
import LoadingComponent from '../components/LoadingComponent'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'
import { ReactComponent as circleIcon } from '../assets/circle.svg'
import { ReactComponent as editIcon } from '../assets/edit.svg'
import { Todo } from '../models/Todo'
import { checkTodo, createTodo, getAllTodos } from '../api/todos'
import EditTodo from '../components/EditTodo'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - max(8vh, 60px));
  background-color: ${(props) => props.theme.primary};
`

const TodoList = styled.ul`
  list-style-type: none;
  padding: 5vh 15vw;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
`

const SectionTitle = styled.h2`
  margin: 10px 0;
  padding-bottom: 2vh;
  font-size: 18px;
  color: ${(props) => props.theme.calendarText};
`

const TodoContainer = styled.div<{ $hidehovercolor?: boolean }>`
  padding: 1vh;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  align-items: center;
  justify-content: start;

  color: ${(props) => props.theme.calendarText};

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$hidehovercolor ? 'none' : props.theme.secondary};
    color: ${(props) => props.theme.text};
  }
`

const TodoText = styled.div<{ selected?: boolean }>`
  display: inline-block;
  flex: 1;
  height: 100%;

  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  text-decoration: ${(props) => (props.selected ? 'line-through' : 'none')};

  padding: 1vh 1vw;
  border-radius: 10px;
`

const TodoTextAndButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`

const TagColorCircle = styled(circleIcon)``

// For Edit Image
const TodoImageContainer = styled.div`
  width: 3vw;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.indent};
  }
`

const TodoEditContainer = styled(editIcon)`
  stroke: ${(props) => props.theme.text};
`

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${(props) => props.theme.primary};
  bottom: env(safe-area-inset-bottom);
  justify-content: space-around;
`

const SendButton = styled.button`
  padding: 1vh 1.5vw;
  margin-left: 1vw;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

function TodoApp() {
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [error, setError] = useState(false)

  const [todos, setTodos] = useState<Todo[]>([])
  const [todoString, setTodoString] = useState<string>('')
  const [todoEditing, setTodoEditing] = useState('')

  // Setup navigation stack
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    getAuthenticated()
      .catch(() => {
        navigate('/login')
      })
      .then(() => {
        getTheme().then((t) => {
          setTheme(t)
        })

        getAllTodos().then((t) => {
          setTodos(t)
          setIsLoading(false)
        })
      })
  }, [navigate])

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

  const createNewTodo = (e: any) => {
    e.preventDefault()
    let value = todoString.trim()
    setError(false)

    if (value === '') {
      setError(true)
      setTodoString('')
      return
    }

    if (value && value !== '') {
      createTodo(todoString).then((t) => {
        todos.push(t)
        setTodos(sortTodos(todos))
        setTodoString('')
      })
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      createNewTodo(e)
    }
  }

  const checkmarkTodo = (todo: Todo) => {
    setTodos((prev) => {
      return sortTodos(
        prev.map((item) =>
          item._id === todo._id ? { ...item, isChecked: !item.isChecked } : item
        )
      )
    })

    checkTodo(todo)
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}

      <NavBar type={'back'} theme={theme} hideSettings={false} />
      <AppContainer>
        <TodoList>
          <SectionTitle>To-Do</SectionTitle>
          {todos
            .filter((t) => !t.isChecked)
            .map((todo) => (
              <span key={todo._id}>
                <TodoContainer key={todo._id}>
                  <TodoTextAndButtonWrapper
                    onClick={() => {
                      checkmarkTodo(todo)
                    }}
                  >
                    <TodoImageContainer>
                      <TagColorCircle
                        fill={theme.background}
                        stroke={theme.calendarText}
                        strokeWidth={2}
                      />
                    </TodoImageContainer>
                    <TodoText selected={false}>{todo.todo}</TodoText>
                  </TodoTextAndButtonWrapper>
                  <TodoImageContainer
                    onClick={() =>
                      todoEditing !== todo._id
                        ? setTodoEditing(todo._id ?? '')
                        : setTodoEditing('')
                    }
                  >
                    <TodoEditContainer />
                  </TodoImageContainer>
                </TodoContainer>
                {todoEditing === todo._id && (
                  <TodoContainer key={'edit'} $hidehovercolor={true}>
                    <EditTodo
                      currentTodo={todo}
                      todos={todos}
                      setTodoState={setTodos}
                      changeDropdownState={setTodoEditing}
                    />
                  </TodoContainer>
                )}
              </span>
            ))}

          <SectionTitle>Completed</SectionTitle>
          {todos
            .filter((t) => t.isChecked)
            .map((todo) => (
              <span key={todo._id}>
                <TodoContainer key={todo._id}>
                  <TodoTextAndButtonWrapper
                    onClick={() => {
                      checkmarkTodo(todo)
                    }}
                  >
                    <TodoImageContainer>
                      <TagColorCircle
                        fill={theme.calendarText}
                        stroke={theme.calendarText}
                        strokeWidth={2}
                        style={{ opacity: 0.5 }}
                      />
                    </TodoImageContainer>
                    <TodoText style={{ opacity: 0.5 }} selected={true}>
                      {todo.todo}
                    </TodoText>
                  </TodoTextAndButtonWrapper>
                  <TodoImageContainer
                    onClick={() =>
                      todoEditing !== todo._id
                        ? setTodoEditing(todo._id ?? '')
                        : setTodoEditing('')
                    }
                  >
                    <TodoEditContainer />
                  </TodoImageContainer>
                </TodoContainer>
                {todoEditing === todo._id && (
                  <TodoContainer key={'edit'} $hidehovercolor={true}>
                    <EditTodo
                      currentTodo={todo}
                      todos={todos}
                      setTodoState={setTodos}
                      changeDropdownState={setTodoEditing}
                    />
                  </TodoContainer>
                )}
              </span>
            ))}
        </TodoList>
        <InputContainer>
          <InputField
            style={{ flex: 1 }}
            type="text"
            value={todoString}
            onChange={(e) => setTodoString(e.target.value)}
            placeholder="Enter todo here"
            error={error}
            errorMessage={''}
            height={'3vh'}
            handleKeyDown={handleKeyPress}
          />
          <SendButton onClick={createNewTodo}>Send</SendButton>
        </InputContainer>
      </AppContainer>
    </ThemeProvider>
  )
}

export default TodoApp
