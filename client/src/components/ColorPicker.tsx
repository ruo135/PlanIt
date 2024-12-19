// Ruo Yang Jiang 261055118

import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Color } from '../models/Color'
import { ReactComponent as arrowDown } from '../assets/arrowDownIcon.svg'
import defaultTheme, { Theme } from '../styles/theme'

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`
const DropdownButtonContent = styled.div`
  display: flex;
  align-items: center;
`

const DropdownButton = styled.div<{ color: string }>`
  display: flex;
  justify-content: normal;
  align-items: center;
  padding: 8px;
  height: 20px;

  border: 1px solid ${(props) => props.theme.header};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};

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

const ColorDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`
const Text = styled.p`
  color: ${(props) => props.theme.calendarText};
`

interface ColorPickerProps {
  selectedColor: string
  theme?: Theme
  colors: Color[]
  toggleDropdown: Dispatch<SetStateAction<boolean>>
  isDropdownOpen: boolean
  handleColorSelect: Dispatch<SetStateAction<string>>
}

export default function ColorPicker(props: ColorPickerProps) {
  const selectedColor = props.selectedColor

  return (
    <DropdownContainer>
      <DropdownButton
        color={props.theme?.background ?? defaultTheme.background}
        onClick={() => props.toggleDropdown(!props.isDropdownOpen)}
      >
        <DropdownButtonContent>
          {!selectedColor && <Text>Select a color</Text>}
          {selectedColor && (
            <>
              <ColorDot color={selectedColor} />
              <Text style={{ paddingRight: '5px' }}>
                {props.colors.find((c) => c.color === selectedColor)?.name}
              </Text>
            </>
          )}

          <ArrowDownContainer isDropdownOpen={props.isDropdownOpen} />
        </DropdownButtonContent>
      </DropdownButton>

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
