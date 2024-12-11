import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import InputField from './InputField'
import { Tag } from '../models/Tag'
import { createTag, deleteTag, updateTag } from '../api/tags'
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
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const colors = [
  { name: 'Red', color: '#E34234' },
  { name: 'Crimson', color: '#DC143C' },
  { name: 'Orange', color: '#FF9A4D' },
  { name: 'Peach', color: '#F8B88B' },
  { name: 'Yellow', color: '#FFE066' },
  { name: 'Chartreuse', color: '#A8C65C' },
  { name: 'Lime', color: '#B2D47A' },
  { name: 'Green', color: '#88C799' },
  { name: 'Mint', color: '#98D7A5' },
  { name: 'Turquoise', color: '#69C8D1' },
  { name: 'Teal', color: '#5EA3A8' },
  { name: 'Cyan', color: '#66D9E8' },
  { name: 'Blue', color: '#4A89D3' },
  { name: 'Periwinkle', color: '#9DABEB' },
  { name: 'Lavender', color: '#C1C5E9' },
  { name: 'Violet', color: '#9173C7' },
  { name: 'Indigo', color: '#705BA5' },
  { name: 'Purple', color: '#8461A3' },
  { name: 'Pink', color: '#D893C2' },
]

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

  const sortTags = (tags: Tag[]) => {
    return tags.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    createTag(tagName, selectedColor).then((t) => {
      props.tags.push(t)
      props.setTagState(sortTags(props.tags))
      props.changeDropdownState('')
    })
  }

  const handleUpdate = (tag: Tag | undefined) => {
    if (tag)
      updateTag({ ...tag, name: tagName, color: selectedColor }).then(() => {
        props.setTagState((prev) => {
          return sortTags(
            prev.map((item) =>
              item._id === tag._id
                ? { ...item, name: tagName, color: selectedColor }
                : item
            )
          )
        })
        props.changeDropdownState('')
      })
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
        <>
          <SubmitButton onClick={() => handleUpdate(props.currentTag)}>
            Save
          </SubmitButton>
          <SubmitButton onClick={() => handleDelete(props.currentTag)}>
            Delete
          </SubmitButton>
          <SubmitButton onClick={handleCancel}>Cancel</SubmitButton>
        </>
      )}
      {!props.currentTag && (
        <SubmitButton onClick={handleSubmit}>OK</SubmitButton>
      )}
    </FormContainer>
  )
}
