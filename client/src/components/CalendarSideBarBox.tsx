import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../styles/theme'
import { useState } from 'react'
import { Tag } from '../models/Tag'
import { ReactComponent as plusIcon } from '../assets/plus.svg'
import { ReactComponent as circleIcon } from '../assets/circle.svg'

interface CalendarSideBarBoxProps {
  theme: Theme
  tags: Tag[]
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

const SideBarBoxTitleOption = styled.div<{ selected?: boolean }>`
  padding: 10px;
  flex: 1;
  text-align: center;
  color: ${(props) => props.theme.text};

  background-color: ${(props) =>
    props.selected ? props.theme.secondary : props.theme.indent};

  &:hover {
    cursor: ${(props) => (props.selected ? 'cursor' : 'pointer')};
  }
`

const SideBarBoxBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const TagContainer = styled.div`
  padding: 1vh;
  display: flex;
  flex-direction: row;
`

const TagImageContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
`

const TagColorCircle = styled(circleIcon)``

const TagPlusContainer = styled(plusIcon)``

const TagText = styled.div`
  max-width: 80%;
  color: ${(props) => props.theme.text};
  text-wrap: auto;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default function CalendarSideBarBox(props: CalendarSideBarBoxProps) {
  const [isTagOpened, setTagOpened] = useState(true)

  const renderTags = () => {
    let curRows = []

    curRows.push(
      <TagContainer>
        <TagImageContainer>
          <TagPlusContainer fill={props.theme.text} />
        </TagImageContainer>
        <TagText>Add New</TagText>
      </TagContainer>
    )

    curRows.push(
      <TagContainer>
        <TagImageContainer>
          <TagColorCircle fill={props.theme.secondary} stroke={'red'} />
        </TagImageContainer>
        <TagText>Red</TagText>
      </TagContainer>
    )

    return curRows
  }

  return (
    <ThemeProvider theme={props.theme}>
      <SideBarBox>
        <SideBarBoxTitleContainer>
          <SideBarBoxTitleOption
            selected={isTagOpened}
            onClick={() => setTagOpened(true)}
          >
            Tags
          </SideBarBoxTitleOption>
          <SideBarBoxTitleOption
            selected={!isTagOpened}
            onClick={() => setTagOpened(false)}
          >
            To-Do
          </SideBarBoxTitleOption>
        </SideBarBoxTitleContainer>
        <SideBarBoxBody>{isTagOpened && renderTags()}</SideBarBoxBody>
      </SideBarBox>
    </ThemeProvider>
  )
}
