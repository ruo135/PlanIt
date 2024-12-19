// Lucas Chew 260971542
// Zi Xin Chen 260754924

import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../styles/theme'

import logo from '../assets/Logo.png'
import logoText from '../assets/Logo_Text.png'
import { useNavigate } from 'react-router-dom'
import GearDropdown from './GearDropdown'

export interface NavBarProps {
  type: 'landing' | 'login' | 'back'
  id?: string
  hideSettings?: boolean
  hideProfile?: boolean
  theme: Theme
}

const StyledSpan = styled.span`
  background-color: ${(props) => props.theme.header};
  display: flex;
  width: auto;
  height: max(8vh, 60px);
  padding: 0 5vw;

  justify-content: space-between;
  align-items: center;
`

const LoginButton = styled.button`
  display: flex;
  margin-right: 1vw;
  height: 50%;
  padding: 0 15px;

  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: max(12px, 0.833vw);
  font-weight: bold;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
`

const Logo = styled.img`
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

export default function NavBar(props: NavBarProps) {
  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  var curLogo = logoText
  // if (props.type === 'landing') {
  //   curLogo = logoText
  // } else {
  //   curLogo = logo
  // }

  return (
    <ThemeProvider theme={props.theme}>
      <StyledSpan>
        <Logo
          src={curLogo}
          onClick={() =>
            props.type === 'back' ? pageRouter('/calendar') : pageRouter('/')
          }
        />

        {/* Login Button for Landing */}
        {props.type === 'landing' && (
          <LoginButton onClick={() => pageRouter('/login')}>Log In</LoginButton>
        )}

        {/* Gear Button for Private Pages */}
        {props.type === 'back' && (
          <GearDropdown
            theme={props.theme}
            hideSettings={props.hideSettings}
            hideProfile={props.hideProfile}
          />
        )}
      </StyledSpan>
    </ThemeProvider>
  )
}
