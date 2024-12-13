import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'
import ErrorMessage from './ErrorMessage'

type InputFieldProps = {
  type?: string // Input type, default is 'text'
  theme?: Theme
  value?: string // User input value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Change handler
  placeholder?: string // Optional placeholder
  error?: boolean
  errorMessage?: string
  style?: React.CSSProperties
  name?: string
  checked?: boolean
  height?: string
}

const TextField = styled.input<{ $error?: boolean; height?: string }>`
  padding: 10px;
  width: 90%;
  font-size: 15px;
  height: ${(props) => props.height ?? '35px'};
  border-radius: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.calendarText};
  border: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.$error ? props.theme.error : props.theme.header};
  color: ${(props) => props.theme.calendarText};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`

export default function InputField(props: InputFieldProps) {
  return (
    <ThemeProvider theme={props.theme ?? defaultTheme}>
      <TextField
        type={props.type ?? 'text'}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ?? ''}
        $error={props.error}
        style={props.style}
        name={props.name ?? ''}
        checked={props.checked ?? false}
        height={props.height}
      />
      {props.error && props.errorMessage && (
        <ErrorMessage message={props.errorMessage} />
      )}
    </ThemeProvider>
  )
}
