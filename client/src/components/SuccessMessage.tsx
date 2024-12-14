import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'
import SuccessIcon from '../assets/successIcon.svg'

type SuccessMessageProps = {
  message?: string
  theme?: Theme
}

const SuccessContainer = styled.div`
  padding-top: 10px;
  display: flex;
  width: 90%;
  height: 30px;
`

const IconContainers = styled.img`
  width: 20px;
  height: 20px;
`

const SuccessMessage = (props: SuccessMessageProps) => {
  return (
    <ThemeProvider theme={props.theme ?? defaultTheme}>
      <SuccessContainer className="SuccessContainer">
        <IconContainers src={SuccessIcon} />
        {props.message}
      </SuccessContainer>
    </ThemeProvider>
  )
}

export default SuccessMessage
