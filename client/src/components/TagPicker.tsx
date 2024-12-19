// Ruo Yang Jiang 261055118

import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Color } from '../models/Color'
import { ReactComponent as arrowDown } from '../assets/arrowDownIcon.svg'
import { ReactComponent as closeIcon } from '../assets/closeIcon.svg'

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownButton = styled.div`
  display: inline-flex;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  padding-right: 50px;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.header};
  background-color: ${(props) => props.theme.background};

  cursor: pointer;
  font-size: 14px;
  position: relative;
`

const DropdownButtonContent = styled.div`
  display: flex;
  align-items: center;

  overflow: hidden;
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.indent};
  border-radius: 5px;
  list-style: none;

  margin: 0;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`

const DropdownItem = styled.li`
  padding: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.calendarText};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const ColorDot = styled.span`
  min-width: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`

const ArrowDownContainer = styled(arrowDown).attrs<{ isDropdownOpen: boolean }>(
  (props) => ({
    isDropdownOpen: undefined, // Prevents `isDropdownOpen` from being passed to the DOM
  })
)<{ isDropdownOpen: boolean }>`
  width: 25px;
  height: 25px;
  fill: ${(props) => props.theme.calendarText};
  position: absolute;
  right: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const CloseIconContainer = styled(closeIcon)<{ $selectedId: string }>`
  padding: 5px;
  border-radius: 50%;
  min-width: 15px;
  width: 15px;
  height: 15px;
  fill: ${(props) => props.theme.calendarText};
  display: ${(props) => (props.$selectedId ? 'block' : 'none')};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const Text = styled.div`
  color: ${(props) => props.theme.calendarText};
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
`

interface ColorPickerProps {
  selectedId: string
  tags: Color[]
  toggleDropdown: Dispatch<SetStateAction<boolean>>
  isDropdownOpen: boolean
  handleIdSelect: Dispatch<SetStateAction<string>>
}

export default function TagPicker(props: ColorPickerProps) {
  const selectedTag = props.tags.find((c) => c.tagId === props.selectedId)

  const checkLength = (name: string) => {
    if (name.length > 15) return name.slice(0, 15) + '...'
    else return name
  }

  return (
    <DropdownContainer>
      <DropdownButton
        onClick={() => props.toggleDropdown(!props.isDropdownOpen)}
      >
        <DropdownButtonContent>
          {!selectedTag && <Text>Select a tag</Text>}
          {selectedTag && (
            <>
              <ColorDot color={selectedTag.color} />
              <Text style={{ paddingRight: '5px' }}>
                {checkLength(selectedTag.name)}
              </Text>
              <CloseIconContainer
                $selectedId={props.selectedId}
                onClick={() => props.handleIdSelect('')}
              />
            </>
          )}

          <ArrowDownContainer isDropdownOpen={props.isDropdownOpen} />
        </DropdownButtonContent>
      </DropdownButton>

      {props.isDropdownOpen && (
        <DropdownList>
          {props.tags.map((c) => (
            <DropdownItem
              key={c.tagId}
              onClick={() => {
                props.handleIdSelect(c.tagId!)
                props.toggleDropdown(false)
              }}
            >
              <ColorDot color={c.color} />
              {c.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}
