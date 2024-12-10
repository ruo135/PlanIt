import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../styles/theme'
import { Dispatch, SetStateAction, useState } from 'react'
import { Tag } from '../models/Tag'
import { ReactComponent as plusIcon } from '../assets/plus.svg'
import { ReactComponent as circleIcon } from '../assets/circle.svg'
import { Todo } from '../models/Todo'
import { toggleTagVisibility } from '../api/tags'
import Checkbox from './Checkbox'
import { checkTodo } from '../api/todos'

interface CalendarSideBarBoxProps {
  theme: Theme
  tags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

const SideBarBox = styled.span`
  height: 75%;
  width: 90%;

  overflow: hidden;
  overflow-y: auto;

  background-color: ${(props) => props.theme.secondary};
`

const SideBarBoxTitleContainer = styled.div`
  display: flex;
  width: auto;
  height: auto;

  position: sticky;
  top: 0px;

  justify-content: space-around;
  gap: 1px;
  background-color: ${(props) => props.theme.secondary};
`

const SideBarBoxTitleOption = styled.div<{ selected?: boolean }>`
  padding: 10px;
  flex: 1;
  text-align: center;
  color: ${(props) => props.theme.text};

  background-color: ${(props) =>
    props.selected ? props.theme.secondary : props.theme.indent};

  &:hover {
    cursor: ${(props) => (props.selected ? 'cursor' : 'pointer')};
  }
`

const SideBarBoxBody = styled.div`
  overflow: hidden;
  overflow-y: auto;
  padding: 20px;
  display: block;
`

const OptionContainer = styled.div`
  padding: 1vh;
  display: flex;
  flex-direction: row;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.indent};
  }
`

const OptionImageContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
`

const TagColorCircle = styled(circleIcon)``

const TagPlusContainer = styled(plusIcon)``

const OptionText = styled.div<{ crossed?: boolean }>`
  max-width: 80%;
  color: ${(props) => props.theme.text};
  text-wrap: auto;
  text-overflow: ellipsis;
  overflow: hidden;

  text-decoration: ${(props) => (props.crossed ? 'line-through' : 'none')};
`

export default function CalendarSideBarBox(props: CalendarSideBarBoxProps) {
  const [isTagOpened, setTagOpened] = useState(true)

  const sortTags = (tags: Tag[]) => {
    return tags.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  const changeTagVisibility = (tag: Tag) => {
    props.setTags((prev) =>
      prev.map((item) =>
        item._id === tag._id ? { ...item, isVisible: !item.isVisible } : item
      )
    )

    toggleTagVisibility(tag)
  }

  const renderTags = () => {
    let curRows = []

    curRows.push(
      <OptionContainer key={'add-new'}>
        <OptionImageContainer>
          <TagPlusContainer fill={props.theme.text} />
        </OptionImageContainer>
        <OptionText>Add New</OptionText>
      </OptionContainer>
    )

    props.tags.forEach((tag) => {
      curRows.push(
        <OptionContainer key={tag._id} onClick={() => changeTagVisibility(tag)}>
          <OptionImageContainer>
            <TagColorCircle
              fill={tag.isVisible ? tag.color : props.theme.background}
              stroke={tag.color}
              strokeWidth={2}
            />
          </OptionImageContainer>
          <OptionText>{tag.name}</OptionText>
        </OptionContainer>
      )
    })

    return curRows
  }

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

  const checkmarkTodo = (todo: Todo) => {
    props.setTodos((prev) => {
      return sortTodos(
        prev.map((item) =>
          item._id === todo._id ? { ...item, isChecked: !item.isChecked } : item
        )
      )
    })

    checkTodo(todo)
  }

  const renderTodos = () => {
    let curRows = []

    curRows.push(
      <OptionContainer key={'add-new'}>
        <OptionImageContainer>
          <TagPlusContainer fill={props.theme.text} />
        </OptionImageContainer>
        <OptionText>Add New</OptionText>
      </OptionContainer>
    )

    props.todos.forEach((todo) => {
      curRows.push(
        <OptionContainer
          key={todo._id}
          onClick={() => {
            checkmarkTodo(todo)
          }}
        >
          <OptionText crossed={todo.isChecked}>{todo.todo}</OptionText>
        </OptionContainer>
      )
    })

    return curRows
  }

  return (
    <ThemeProvider theme={props.theme}>
      <SideBarBox>
        <SideBarBoxTitleContainer>
          <SideBarBoxTitleOption
            selected={isTagOpened}
            onClick={() => setTagOpened(true)}
            key={'tags'}
          >
            Tags
          </SideBarBoxTitleOption>
          <SideBarBoxTitleOption
            selected={!isTagOpened}
            onClick={() => setTagOpened(false)}
            key={'todo'}
          >
            To-Do
          </SideBarBoxTitleOption>
        </SideBarBoxTitleContainer>
        <SideBarBoxBody>
          {isTagOpened && renderTags()}
          {!isTagOpened && renderTodos()}
        </SideBarBoxBody>
      </SideBarBox>
    </ThemeProvider>
  )
}
