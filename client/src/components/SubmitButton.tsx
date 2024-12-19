// Ruo Yang Jiang 261055118

import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'

type ButtonProps = {
  title: string
  theme?: Theme
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void // Change handler
  style?: React.CSSProperties
}

const Button = styled.button`
  flex: 0 1;
  width: 100%;
  padding: 10px;
  min-height: 50px;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

export default function SubmitButton(props: ButtonProps) {
  return (
    <ThemeProvider theme={props.theme ?? defaultTheme}>
      <Button style={props.style} onClick={props.handleClick}>
        {props.title}
      </Button>
    </ThemeProvider>
  )
}
