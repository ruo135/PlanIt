// Ruo Yang Jiang 261055118

import styled from 'styled-components'
import { Theme } from '../styles/theme'
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
  handleKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const TextField = styled.input<{ $error?: boolean; height?: string }>`
  padding: 10px;
  flex: 0 1;
  font-size: 15px;
  min-height: ${(props) => props.height ?? '35px'};
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
`

export default function InputField(props: InputFieldProps) {
  return (
    <>
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
        onKeyDown={props.handleKeyDown}
      />
      {props.error && props.errorMessage && (
        <ErrorMessage message={props.errorMessage} />
      )}
    </>
  )
}
