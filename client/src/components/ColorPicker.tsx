import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Color } from '../models/Color'

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownButton = styled.div<{ color: string }>`
  display: flex;
  justify-content: normal;
  align-items: center;
  padding: 8px;

  border: 1px solid ${(props) => props.theme.header};
  border-radius: 5px;
  background-color: ${(props) => props.color};

  cursor: pointer;
  font-size: max(12px, 0.781vw);
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
  font-size: max(12px, 0.781vw);
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.calendarText};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const ColorDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`

interface ColorPickerProps {
  selectedColor: string
  colors: Color[]
  toggleDropdown: Dispatch<SetStateAction<boolean>>
  isDropdownOpen: boolean
  handleColorSelect: Dispatch<SetStateAction<string>>
}

export default function ColorPicker(props: ColorPickerProps) {
  return (
    <DropdownContainer>
      <DropdownButton
        color={props.selectedColor}
        onClick={() => props.toggleDropdown(!props.isDropdownOpen)}
      />

      {props.isDropdownOpen && (
        <DropdownList>
          {props.colors.map((c) => (
            <DropdownItem
              key={c.color}
              onClick={() => {
                props.handleColorSelect(c.color)
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
