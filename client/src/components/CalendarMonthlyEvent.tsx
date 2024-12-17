// Lucas Chew 260971542

import styled from 'styled-components'
import { Event } from '../models/Event'
import defaultTheme from '../styles/theme'
import { Dispatch, SetStateAction, useState } from 'react'
import { Tag } from '../models/Tag'
import { deleteEvent } from '../api/events'
import { useNavigate } from 'react-router-dom'

const EventContainer = styled.div<{ $backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${(props) => props.$backgroundColor};
  border-radius: 1vh;
  margin: 2px;
  padding: 2px 4px;

  font-size: 12px;
  color: ${(props) => props.theme.text};
  text-overflow: ellipsis;
  text-align: center;

  cursor: pointer;

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }
`

const Time = styled.div`
  font-size: 0.625rem;
  min-width: 25%;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`

const Title = styled.div`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const PopupContainer = styled.div`
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.calendarText};
  border-radius: 8px;
  box-shadow: 0 10px 20px ${(props) => props.theme.primary};
  border: 5px;
  border-color: ${(props) => props.theme.primary};
`

const PopupTitle = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  font-size: 20px;
`

const PopupBodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-content: center;
`

const PopupBodyContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const PopupBodyContainerTitle = styled.div`
  width: 25%;
  padding-right: 5%;
`

const PopupBodyContainerDetails = styled.div`
  text-align: start;
  margin-bottom: 15px;
`

const PopupButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

interface CalendarMonthlyEventProps {
  event: Event
  tag: Tag | undefined
  setEventState: Dispatch<SetStateAction<Event[]>>
  currentDate: Date
}

export default function CalendarMonthlyEvent(props: CalendarMonthlyEventProps) {
  const [isPopupVisible, setPopupVisible] = useState(false)

  const startedToday =
    props.currentDate.getFullYear() === props.event.startDate.getFullYear() &&
    props.currentDate.getMonth() === props.event.startDate.getMonth() &&
    props.currentDate.getDate() === props.event.startDate.getDate()

  const endedToday =
    props.currentDate.getFullYear() === props.event.endDate.getFullYear() &&
    props.currentDate.getMonth() === props.event.endDate.getMonth() &&
    props.currentDate.getDate() === props.event.endDate.getDate()

  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path, { state: { prevEvent: props.event } })
  }

  const handleDelete = (event: Event) => {
    deleteEvent(event).then(() => {
      props.setEventState((prev) => prev.filter((e) => e._id !== event._id))
      setPopupVisible(false)
    })
  }

  return (
    <>
      <EventContainer
        $backgroundColor={props.tag?.color ?? defaultTheme.header}
        onClick={() => setPopupVisible(true)}
      >
        {startedToday && (
          <Time style={{ paddingRight: '3%' }}>
            {props.event.startDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </Time>
        )}
        <Title>{props.event.title}</Title>
        {!startedToday && endedToday && (
          <Time style={{ paddingLeft: '3%' }}>
            {props.event.endDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </Time>
        )}
      </EventContainer>
      {isPopupVisible && (
        <Overlay onClick={() => setPopupVisible(false)}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <PopupTitle>{props.event.title}</PopupTitle>

            <PopupBodyContainer>
              <PopupBodyContainerRow>
                <PopupBodyContainerTitle>Start:</PopupBodyContainerTitle>
                <PopupBodyContainerDetails>
                  {new Date(props.event.startDate).toLocaleString()}
                </PopupBodyContainerDetails>
              </PopupBodyContainerRow>

              <PopupBodyContainerRow>
                <PopupBodyContainerTitle>End:</PopupBodyContainerTitle>
                <PopupBodyContainerDetails>
                  {new Date(props.event.endDate).toLocaleString()}
                </PopupBodyContainerDetails>
              </PopupBodyContainerRow>

              <PopupBodyContainerRow>
                <PopupBodyContainerTitle>Description:</PopupBodyContainerTitle>
                <PopupBodyContainerDetails>
                  {props.event.description}
                </PopupBodyContainerDetails>
              </PopupBodyContainerRow>

              {props.tag && (
                <PopupBodyContainerRow>
                  <PopupBodyContainerTitle>Tag:</PopupBodyContainerTitle>
                  <PopupBodyContainerDetails>
                    {props.tag.name}
                  </PopupBodyContainerDetails>
                </PopupBodyContainerRow>
              )}

              <div>
                <PopupButton onClick={() => pageRouter('/createEvent')}>
                  Edit
                </PopupButton>
                <PopupButton onClick={() => handleDelete(props.event)}>
                  Delete
                </PopupButton>
                <PopupButton onClick={() => setPopupVisible(false)}>
                  Close
                </PopupButton>
              </div>
            </PopupBodyContainer>
          </PopupContainer>
        </Overlay>
      )}
    </>
  )
}
