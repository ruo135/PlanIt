// Lucas Chew 260971542

import styled from 'styled-components'
import defaultTheme from '../styles/theme'
import ReactLoading from 'react-loading'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${defaultTheme.header};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export default function LoadingComponent() {
  return (
    <Overlay>
      <ReactLoading
        type={'bars'}
        color={defaultTheme.primary}
        height={'40vh'}
        width={'25vw'}
      />
    </Overlay>
  )
}
