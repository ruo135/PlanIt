import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../styles/theme'
import { useState } from 'react'

interface CalendarSideBarBoxProps {
  theme: Theme
  tags: string[]
  changeTagVisibility: (tagName: string) => void
}

const SideBarBox = styled.div`
  height: 80%;
  width: 80%;

  background-color: ${(props) => props.theme.secondary};
`

const SideBarBoxTitleContainer = styled.div`
  display: flex;
  width: auto;
  height: auto;

  justify-content: space-around;
  gap: 1px;
  background-color: ${(props) => props.theme.secondary};
`

const SideBarBoxTitleOption = styled.div`
  padding: 10px;
  flex: 1;
  text-align: center;
  color: ${(props) => props.theme.text};

  background-color: ${(props) =>
    props.id === 'true' ? props.theme.secondary : props.theme.indent};

  &:hover {
    cursor: ${(props) => (props.id === 'true' ? 'cursor' : 'pointer')};
  }
`

export default function CalendarSideBarBox(props: CalendarSideBarBoxProps) {
  const [isTagOpened, setTagOpened] = useState(true)

  return (
    <ThemeProvider theme={props.theme}>
      <SideBarBox>
        <SideBarBoxTitleContainer>
          <SideBarBoxTitleOption
            id={isTagOpened.toString()}
            onClick={() => setTagOpened(true)}
          >
            Tags
          </SideBarBoxTitleOption>
          <SideBarBoxTitleOption
            id={(!isTagOpened).toString()}
            onClick={() => setTagOpened(false)}
          >
            To-Do
          </SideBarBoxTitleOption>
        </SideBarBoxTitleContainer>
      </SideBarBox>
    </ThemeProvider>
  )
}
