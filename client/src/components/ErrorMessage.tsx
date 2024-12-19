// Ruo Yang Jiang 261055118

import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'
import ErrorIcon from '../assets/errorIcon.svg'

type ErrorMessageProps = {
  message?: string
  theme?: Theme
}

const ErrorContainer = styled.div`
  padding-top: 10px;
  display: flex;
  width: 90%;
  height: 30px;
  color: ${(props) => props.theme.error};
`

const IconContainers = styled.img`
  width: 35px;
  height: 20px;
`

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <ThemeProvider theme={props.theme ?? defaultTheme}>
      <ErrorContainer className="errorContainer">
        <IconContainers src={ErrorIcon} />
        {props.message}
      </ErrorContainer>
    </ThemeProvider>
  )
}

export default ErrorMessage
