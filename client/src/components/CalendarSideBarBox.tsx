import styled from 'styled-components'
import { Theme } from '../styles/theme'
import { Dispatch, SetStateAction, useState } from 'react'
import { Tag } from '../models/Tag'
import { ReactComponent as plusIcon } from '../assets/plus.svg'
import { ReactComponent as circleIcon } from '../assets/circle.svg'
import { ReactComponent as editIcon } from '../assets/edit.svg'
import { Todo } from '../models/Todo'
import { toggleTagVisibility } from '../api/tags'
import { checkTodo } from '../api/todos'
import EditTag from './EditTag'
import EditTodo from './EditTodo'

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

const OptionContainer = styled.div<{ $hidehovercolor?: boolean }>`
  padding: 1vh;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$hidehovercolor ? 'none' : props.theme.indent};
  }
`

const OptionImageContainer = styled.div<{
  $hidehovercolor: boolean
  $justifyContent: string
}>`
  width: 10%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: ${(props) => props.$justifyContent};
  align-items: center;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$hidehovercolor ? 'none' : props.theme.secondary};
  }
`

const TagColorCircle = styled(circleIcon)``

const TagPlusContainer = styled(plusIcon)``

const TodoEditContainer = styled(editIcon)`
  stroke: ${(props) => props.theme.background};
`

const OptionText = styled.div<{ selected?: boolean }>`
  flex: 1;
  max-width: 85%;
  color: ${(props) => props.theme.text};
  text-wrap: auto;
  text-overflow: ellipsis;
  overflow: hidden;

  text-decoration: ${(props) => (props.selected ? 'line-through' : 'none')};
`

export default function CalendarSideBarBox(props: CalendarSideBarBoxProps) {
  // Whether I am on the Tags or Todo tab
  const [isTagTabOpened, setTagTab] = useState(true)
  // Which tag editor is opened
  const [tagEditing, setTagEditing] = useState('')
  // Which todo editor is opened
  const [todoEditing, setTodoEditing] = useState('')

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
      <span key={'add'}>
        <OptionContainer
          key={'add-new'}
          onClick={() => {
            tagEditing !== 'new' ? setTagEditing('new') : setTagEditing('')
          }}
        >
          <OptionImageContainer
            $hidehovercolor={true}
            $justifyContent={'center'}
          >
            <TagPlusContainer fill={props.theme.text} />
          </OptionImageContainer>
          <OptionText>
            {tagEditing !== 'new' ? 'Add New' : 'Cancel New'}
          </OptionText>
        </OptionContainer>
        {tagEditing === 'new' && (
          <OptionContainer key={'add-dropdown'} $hidehovercolor={true}>
            <EditTag
              tags={props.tags}
              setTagState={props.setTags}
              changeDropdownState={setTagEditing}
            />
          </OptionContainer>
        )}
      </span>
    )

    props.tags.forEach((tag) => {
      curRows.push(
        <span key={tag._id}>
          <OptionContainer key={'data'}>
            <OptionImageContainer
              $hidehovercolor={false}
              onClick={() => changeTagVisibility(tag)}
              $justifyContent={'center'}
            >
              <TagColorCircle
                fill={tag.isVisible ? tag.color : props.theme.background}
                stroke={tag.color}
                strokeWidth={2}
              />
            </OptionImageContainer>
            <OptionText
              onClick={() =>
                tagEditing !== tag._id
                  ? setTagEditing(tag._id ?? '')
                  : setTagEditing('')
              }
            >
              {tag.name}
            </OptionText>
          </OptionContainer>
          {tagEditing === tag._id && (
            <OptionContainer key={'add-dropdown'} $hidehovercolor={true}>
              <EditTag
                currentTag={tag}
                tags={props.tags}
                setTagState={props.setTags}
                changeDropdownState={setTagEditing}
              />
            </OptionContainer>
          )}
        </span>
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
      <span key={'add-new'}>
        <OptionContainer
          key={'add-button'}
          onClick={() => {
            todoEditing !== 'new' ? setTodoEditing('new') : setTodoEditing('')
          }}
        >
          <OptionImageContainer
            $hidehovercolor={true}
            $justifyContent={'center'}
          >
            <TagPlusContainer fill={props.theme.text} />
          </OptionImageContainer>
          <OptionText>
            {todoEditing !== 'new' ? 'Add New' : 'Cancel New'}
          </OptionText>
        </OptionContainer>
        {todoEditing === 'new' && (
          <OptionContainer key={'add-dropdown'} $hidehovercolor={true}>
            <EditTodo
              todos={props.todos}
              setTodoState={props.setTodos}
              changeDropdownState={setTodoEditing}
            />
          </OptionContainer>
        )}
      </span>
    )

    props.todos.forEach((todo) => {
      curRows.push(
        <span key={todo._id}>
          <OptionContainer key={'data'}>
            <OptionText
              selected={todo.isChecked ?? false}
              onClick={() => {
                checkmarkTodo(todo)
              }}
            >
              {todo.todo}
            </OptionText>
            <OptionImageContainer
              $hidehovercolor={false}
              $justifyContent={'center'}
              onClick={() =>
                todoEditing !== todo._id
                  ? setTodoEditing(todo._id ?? '')
                  : setTodoEditing('')
              }
            >
              <TodoEditContainer />
            </OptionImageContainer>
          </OptionContainer>
          {todoEditing === todo._id && (
            <OptionContainer key={'edit'} $hidehovercolor={true}>
              <EditTodo
                currentTodo={todo}
                todos={props.todos}
                setTodoState={props.setTodos}
                changeDropdownState={setTodoEditing}
              />
            </OptionContainer>
          )}
        </span>
      )
    })

    return curRows
  }

  return (
    <SideBarBox>
      <SideBarBoxTitleContainer>
        <SideBarBoxTitleOption
          selected={isTagTabOpened}
          onClick={() => setTagTab(true)}
          key={'tags'}
        >
          Tags
        </SideBarBoxTitleOption>
        <SideBarBoxTitleOption
          selected={!isTagTabOpened}
          onClick={() => setTagTab(false)}
          key={'todo'}
        >
          To-Do
        </SideBarBoxTitleOption>
      </SideBarBoxTitleContainer>
      <SideBarBoxBody>
        {isTagTabOpened && renderTags()}
        {!isTagTabOpened && renderTodos()}
      </SideBarBoxBody>
    </SideBarBox>
  )
}
