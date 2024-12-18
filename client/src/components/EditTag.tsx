// Lucas Chew 260971542

import React, { Dispatch, SetStateAction, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import InputField from './InputField'
import { Tag } from '../models/Tag'
import { createTag, deleteTag, updateTag } from '../api/tags'
import ColorPicker from './ColorPicker'
import { colors } from '../helpers/tagColors'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  width: -webkit-fill-available;
  // height: inherit;
`

const Label = styled.label`
  font-size: max(12px, 0.781vw);
  color: ${(props) => props.theme.calendarText};
`

const SubmitButton = styled.button`
  padding: 8px min(16px, 0.5vw);

  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

interface EditTagProps {
  currentTag?: Tag

  tags: Tag[]
  changeDropdownState: Dispatch<SetStateAction<string>>
  setTagState: Dispatch<SetStateAction<Tag[]>>
}

export default function EditTag(props: EditTagProps) {
  const [tagName, setTagName] = useState(props.currentTag?.name ?? '')
  const [selectedColor, setSelectedColor] = useState<string>(
    props.currentTag?.color ?? colors[0].color
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const sortTags = (tags: Tag[]) => {
    return tags.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // If tag name exists or tag is empty, give error
    if (tagName.trim() === '') {
      setErrorMessage('Tag Name Required')
      setError(true)
      return
    }
    if (props.tags.find((t) => t.name === tagName.trim())) {
      setErrorMessage('Tag Name Exists')
      setError(true)
      return
    }

    setError(false)

    createTag(tagName.trim(), selectedColor).then((t) => {
      props.tags.push(t)
      props.setTagState(sortTags(props.tags))
      props.changeDropdownState('')
    })
  }

  const handleUpdate = (tag: Tag | undefined) => {
    if (tag) {
      if (tagName.trim() === '') {
        setError(true)
        return
      }

      setError(false)

      updateTag({ ...tag, name: tagName.trim(), color: selectedColor }).then(
        () => {
          props.setTagState((prev) => {
            return sortTags(
              prev.map((item) =>
                item._id === tag._id
                  ? { ...item, name: tagName.trim(), color: selectedColor }
                  : item
              )
            )
          })
          props.changeDropdownState('')
        }
      )
    }
  }

  const handleCancel = () => {
    props.changeDropdownState('')
  }

  const handleDelete = (tag: Tag | undefined) => {
    if (tag)
      deleteTag(tag).then(() => {
        props.setTagState((prev) => prev.filter((t) => t._id !== tag._id))
        props.changeDropdownState('')
      })
  }

  return (
    <FormContainer>
      <Label>Tag:</Label>
      <InputField
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Enter tag name"
        error={error}
        errorMessage={errorMessage}
        height={'1vh'}
      />

      <Label>Color:</Label>
      <ColorPicker
        selectedColor={selectedColor}
        colors={colors}
        toggleDropdown={setIsDropdownOpen}
        isDropdownOpen={isDropdownOpen}
        handleColorSelect={setSelectedColor}
      />

      {props.currentTag && (
        <div style={{ display: 'flex', gap: '5px' }}>
          <SubmitButton
            style={{ flex: 1 }}
            onClick={() => handleUpdate(props.currentTag)}
          >
            Save
          </SubmitButton>
          <SubmitButton
            style={{ flex: 1 }}
            onClick={() => handleDelete(props.currentTag)}
          >
            Delete
          </SubmitButton>
          <SubmitButton style={{ flex: 1 }} onClick={handleCancel}>
            Cancel
          </SubmitButton>
        </div>
      )}
      {!props.currentTag && (
        <SubmitButton onClick={handleSubmit}>OK</SubmitButton>
      )}
    </FormContainer>
  )
}
