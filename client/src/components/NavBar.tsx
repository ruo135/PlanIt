import styled from 'styled-components'
import theme from '../styles/theme'
import logo from '../assets/Logo_black.png'
import { useNavigate } from 'react-router-dom'

export interface NavBarProps {
  type: 'landing' | 'login' | 'back'
  id?: string
}

const StyledSpan = styled.span`
  background-color: ${theme.defaultTheme.header};
  display: flex;
  width: auto;
  height: 10vh;
  padding: 0 5vw;

  justify-content: center;
  align-items: center;
`

const LoginButton = styled.button`
  display: flex;
  margin-left: auto;
  margin-right: 1vw;
  height: 50%;
  padding: 0 15px;

  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  align-items: center;

  color: ${theme.defaultTheme.text};
  background-color: ${theme.defaultTheme.background};

  &:hover {
    background-color: ${theme.defaultTheme.innerBackground};
    cursor: pointer;
  }
`

const Logo = styled.img`
  height: 100%;
  margin-right: auto;

  &:hover {
    cursor: pointer;
  }
`

export default function NavBar(props: NavBarProps) {
  let navigate = useNavigate()
  const routeChange = (path: string) => {
    navigate(path)
  }

  return (
    <StyledSpan>
      <Logo src={logo} onClick={() => routeChange('/')} />
      {props.type === 'landing' && (
        <LoginButton onClick={() => routeChange('/login')}>Log In</LoginButton>
      )}
    </StyledSpan>
  )
}
