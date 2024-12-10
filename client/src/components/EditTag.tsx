import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import InputField from './InputField'
import { Tag } from '../models/Tag'
import { createTag } from '../api/tags'
import ColorPicker from './ColorPicker'

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
  font-size: 14px;
  color: ${(props) => props.theme.calendarText};
`

const SubmitButton = styled.button`
  padding: 8px 16px;

  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const colors = [
  { name: 'Violet', color: '#8e44ad' },
  { name: 'Pink', color: '#ff4081' },
  { name: 'Blue', color: '#3498db' },
]

interface EditTagProps {
  tags: Tag[]
  changeDropdownState: Dispatch<SetStateAction<boolean>>
  setTagState: Dispatch<SetStateAction<Tag[]>>
}

export default function EditTag(props: EditTagProps) {
  const [tagName, setTagName] = useState('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSubmit = (e: any) => {
    const sortTags = (tags: Tag[]) => {
      return tags.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }

    e.preventDefault()

    createTag(tagName, selectedColor).then((t) => {
      props.tags.push(t)
      props.setTagState(sortTags(props.tags))
      props.changeDropdownState(false)
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

      <SubmitButton onClick={handleSubmit}>OK</SubmitButton>
    </FormContainer>
  )
}
