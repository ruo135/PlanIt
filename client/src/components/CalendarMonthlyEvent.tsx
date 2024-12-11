import styled from 'styled-components'
import { Event } from '../models/Event'
import defaultTheme from '../styles/theme'

const EventContainer = styled.div<{ $backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: start;

  background-color: ${(props) => props.$backgroundColor};
  border-radius: 1vh;
  margin: 2px;
  padding: 2px 4px;

  font-size: 12px;
  color: ${(props) => props.theme.text};
  text-overflow: ellipsis;

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }
`

const Time = styled.div`
  font-size: 10px;
  min-width: 25%;
  padding-right: 3%;

  @media only screen and (max-width: 500px) {
    display: none;
  }
`

interface CalendarMonthlyEventProps {
  event: Event
  tagColor: string | undefined
}

export default function CalendarMonthlyEvent(props: CalendarMonthlyEventProps) {
  return (
    <EventContainer $backgroundColor={props.tagColor ?? defaultTheme.header}>
      <Time>
        {props.event.startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </Time>
      {props.event.title}
    </EventContainer>
  )
}
