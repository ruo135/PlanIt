// Lucas Chew 260971542

import styled, { ThemeProvider } from 'styled-components'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { useEffect, useRef, useState } from 'react'
import { Theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export interface GearDropdownProps {
  id?: string
  theme: Theme
  hideSettings?: boolean
  hideProfile?: boolean
}

const StyledImg = styled(SettingsIcon)`
  display: flex;
  height: 4vh;
  width: auto;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    transform: rotate(45deg);
  }
`

const OptionContainer = styled.ul`
  position: absolute;

  padding: 5px 0;
  top: 100%;

  // The 2 lines below center it
  left: 50%;
  transform: translateX(-50%);

  margin-top: 2vh;
  z-index: 1;

  border-radius: 5px;
  width: max-content;
  list-style-type: none;
  background-color: ${(props) => props.theme.indent};
`

const Option = styled.li`
  padding: 5px 1vw;
  text-align: center;
  border-radius: 5px;

  font-size: max(0.833vw, 12px);

  color: ${(props) => props.theme.text};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.secondary};
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`

export default function GearDropdown(props: GearDropdownProps) {
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

  const logout = () => {
    axios.post('/api/user/logout').then(() => {
      pageRouter('/')
    })
  }

  return (
    <ThemeProvider theme={props.theme}>
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
            {!props.hideProfile && (
              <Option onClick={() => pageRouter('/profile')}>Profile</Option>
            )}
            <Option onClick={logout}>Log Out</Option>
          </OptionContainer>
        )}
      </div>
    </ThemeProvider>
  )
}
