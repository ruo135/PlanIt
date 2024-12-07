import styled from 'styled-components'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { useEffect, useRef, useState } from 'react'
import { Theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'

export interface GearDropdownProps {
  id?: string
  theme: Theme
  hideSettings?: boolean
}

export default function GearDropdown(props: GearDropdownProps) {
  const StyledImg = styled(SettingsIcon)`
    display: flex;
    height: 5vh;
    width: 100%;
  `

  const OptionContainer = styled.ul`
    position: absolute;

    padding: 5px 0;
    top: 100%;
    left: 50%; /* Center horizontally relative to the button */
    transform: translateX(-50%); /* Adjust position back by 50% of its width */
    margin-top: 2.5vh;
    z-index: 1;

    border-radius: 5px;
    width: max-content;
    list-style-type: none;
    background-color: ${props.theme.indent};
  `

  const Option = styled.li`
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
    color: ${props.theme.text};

    &:hover {
      background-color: ${props.theme.secondary};
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  `

  // Dropdown State
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Close dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // React Navigator
  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      ref={dropdownRef}
    >
      <StyledImg
        fill={props.theme.text}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      {dropdownOpen && (
        <OptionContainer>
          {/* Only show if hideSettings is false or undefined */}
          {!props.hideSettings && (
            <Option onClick={() => pageRouter('/settings')}>Settings</Option>
          )}
          <Option onClick={() => pageRouter('/')}>Log Out</Option>
        </OptionContainer>
      )}
    </div>
  )
}
