import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'

type ButtonProps = {
  title: string
  theme?: Theme
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void // Change handler
}

const Button = styled.button`
  padding: 10px;
  width: 97%;
  height: 50px;
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
      <Button onClick={props.handleClick}>{props.title}</Button>
    </ThemeProvider>
  )
}
