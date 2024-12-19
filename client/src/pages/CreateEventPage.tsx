// Ruo Yang Jiang 261055118

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { Theme } from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import InputField from '../components/InputField'
import { ReactComponent as DescriptionIcon } from '../assets/descriptionIcon.svg'
import { ReactComponent as clockIcons } from '../assets/clockIcon.svg'
import { ReactComponent as closeIcon } from '../assets/closeIcon.svg'
import { ReactComponent as tagIcon } from '../assets/tagIcon.svg'
import { Color } from '../models/Color'
import TagPicker from '../components/TagPicker'
import getStartDate from '../helpers/getStartDate'
import getEndDate from '../helpers/getEndDate'
import SubmitButton from '../components/SubmitButton'
import fixTimeOffetset from '../helpers/fixTimeOffset'
import getTheme from '../api/themes'
import LoadingComponent from '../components/LoadingComponent'

const PageContainer = styled.div`
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - max(8vh, 60px));
  display: flex;
  background-color: ${(props) => props.theme.primary};
  @media (max-width: 900px) {
    padding-top: 10px;
    align-items: start;
  }
`

const AddEventForm = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 30px;
  width: 50%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: flex-start;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 800px) {
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - max(8vh, 60px));
    min-height: calc(100vh - max(8vh, 60px));
    border-radius: 15px 15px 0 0;
    animation: slideUp 0.2s ease-in-out forwards;
    margin: 0;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`
const CloseIconContainer = styled(closeIcon)`
  width: 25px;
  height: 25px;
  margin-left: auto;
  fill: ${(props) => props.theme.calendarText};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
    border-radius: 50%;
  }
`

const ClockIconContainer = styled(clockIcons)`
  min-width: 35px;
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const DescriptionIconContainer = styled(DescriptionIcon)`
  min-width: 35px;
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const TagIconContainer = styled(tagIcon)`
  min-width: 35px;
  width: 35px;
  height: 40px;
  stroke: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  color: ${(props) => props.theme.calendarText};
`
const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
`

const AddEventPage: FC = () => {
  // Get state from calendar page for editing events
  const { state } = useLocation()

  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [title, setTitle] = useState(state?.prevEvent?.title ?? '')
  const [startDate, setStartDate] = useState(
    state?.prevEvent?.startDate
      ? fixTimeOffetset(state.prevEvent.startDate, false)
          .toISOString()
          .slice(0, 16)
      : getStartDate()
  )
  const [endDate, setEndDate] = useState(
    state?.prevEvent?.endDate
      ? fixTimeOffetset(state.prevEvent.endDate, false)
          .toISOString()
          .slice(0, 16)
      : getEndDate()
  )
  const [description, setDescription] = useState(
    state?.prevEvent?.description ?? ''
  )
  const [tagId, setTagId] = useState(state?.prevEvent?.tagId ?? '')
  const [tagList, setTagList] = useState<Color[]>([])
  const [tagsFound, setTagsFound] = useState(true)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [startDateError, setStartDateError] = useState(false)
  const [startDateErrorMessage, setStartDateErrorMessage] = useState('')
  const [endDateError, setEndDateError] = useState(false)
  const [endDateErrorMessage, setEndDateErrorMessage] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  let navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    setIsLoading(true)

    const getAuthenticated = () => {
      axios
        .get('/api/user')
        .then(() => {
          getTheme().then((t) => {
            setTheme(t)
          })
          getTags()
        })
        .catch(() => {
          navigate('/login')
        })
    }

    const getTags = () => {
      axios
        .get('/api/tag/getAlltags')
        .then((res) => {
          if (res.data.length === 0) setTagsFound(false)
          else {
            let colorList: Color[] = res.data.map(
              (tag: { _id: string; name: string; color: string }) => {
                return { tagId: tag._id, name: tag.name, color: tag.color }
              }
            )
            setTagList(colorList)
          }
        })
        .then(() => {
          setIsLoading(false)
        })
    }

    getAuthenticated()
  }, [navigate])

  useEffect(() => {
    if (!startDate) setEndDate('')
    else if (startDate.localeCompare(endDate) >= 0) {
      setEndDate(getEndDate(startDate))
    }
  }, [startDate])

  useEffect(() => {
    if (new Date(endDate) < new Date(startDate)) {
      setEndDateError(true)
      setEndDateErrorMessage('Event must end after its start date')
    } else {
      setEndDateError(false)
      setEndDateErrorMessage('')
    }
  }, [endDate])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value)
  }

  const handleCreateNewEvent = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setTitleError(false)
    setTitleErrorMessage('')
    setStartDateError(false)
    setStartDateErrorMessage('')
    setEndDateError(false)
    setEndDateErrorMessage('')

    if (!title || !startDate || !endDate) {
      if (!title) {
        setTitleError(true)
        setTitleErrorMessage('Event must have a title')
      }
      if (!startDate) {
        setStartDateError(true)
        setStartDateErrorMessage('Event must have a start date')
      }
      if (!endDate) {
        setEndDateError(true)
        setEndDateErrorMessage('Event must have an end date')
      }
    } else if (endDateError) {
    } else {
      const event = {
        title,
        startDate: fixTimeOffetset(new Date(startDate), true).toISOString(),
        endDate: fixTimeOffetset(new Date(endDate), true).toISOString(),
        description,
        tagId: tagId ? tagId : null,
      }
      await axios
        .post('/api/event/createEvent', event)
        .then((res) => {
          navigate('/calendar')
        })
        .catch((e) => {
          setTitleError(true)
          setTitleErrorMessage('Create event failed')
        })
    }
  }

  const handleUpdateEvent = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setTitleError(false)
    setStartDateError(false)
    setStartDateErrorMessage('')
    setEndDateError(false)
    setEndDateErrorMessage('')

    if (!title || !startDate || !endDate) {
      if (!title) {
        setTitleError(true)
        setTitleErrorMessage('Event must have a title')
      }
      if (!startDate) {
        setStartDateError(true)
        setStartDateErrorMessage('Event must have a start date')
      }
      if (!endDate) {
        setEndDateError(true)
        setEndDateErrorMessage('Event must have an end date')
      }
    } else {
      const event = {
        title,
        startDate: fixTimeOffetset(new Date(startDate), true).toISOString(),
        endDate: fixTimeOffetset(new Date(endDate), true).toISOString(),
        description,
        tagId,
      }
      await axios
        .patch(`/api/event/updateEvent/${state.prevEvent._id}`, event)
        .then(() => {
          navigate('/calendar')
        })
        .catch(() => {
          setTitleError(true)
          setTitleErrorMessage('Create event failed')
        })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}
      <NavBar type={'back'} theme={theme} />
      <PageContainer>
        <AddEventForm>
          {/* Close Icon*/}
          <CloseIconContainer onClick={(e) => navigate('/calendar')} />
          {/* Add Title*/}
          <InputField
            style={{
              fontSize: '30px',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderRadius: 0,
              width: '90%',
            }}
            theme={theme}
            value={title}
            onChange={handleTitleChange}
            placeholder="Add a title"
            error={titleError}
            errorMessage={titleErrorMessage}
          />
          {/* Pick dates*/}
          <HorizontalContainer style={{ paddingTop: '30px' }}>
            {/* Clock Icon*/}
            <ClockIconContainer />
            {/* Start date picker Icon*/}
            <VerticalContainer style={{ display: 'flex' }}>
              <InputField
                style={{
                  width: 'calc((100% + 30px + 35px) * 0.6)',
                }}
                type="datetime-local"
                theme={theme}
                value={startDate}
                onChange={handleDateChange}
                error={startDateError}
                errorMessage={startDateErrorMessage}
              />
            </VerticalContainer>
          </HorizontalContainer>
          {/* Checkbox*/}
          <HorizontalContainer style={{ padding: '10px', paddingLeft: '0' }}>
            <ClockIconContainer style={{ fill: theme.background }} />
            to
          </HorizontalContainer>
          {/* Pick end date*/}
          <HorizontalContainer style={{ paddingBottom: '30px' }}>
            {/* Clock Icon*/}
            <ClockIconContainer
              style={{ height: '35px', fill: theme.background }}
            />
            {/* End date picker */}
            <VerticalContainer style={{ display: 'flex' }}>
              <InputField
                style={{
                  width: 'calc((100% + 30px + 35px) * 0.6)',
                }}
                type="datetime-local"
                theme={theme}
                value={endDate}
                onChange={handleEndDateChange}
                error={endDateError}
                errorMessage={endDateErrorMessage}
              />
            </VerticalContainer>
          </HorizontalContainer>
          {/* Description*/}
          <HorizontalContainer style={{ paddingBottom: '30px' }}>
            <DescriptionIconContainer />
            <InputField
              style={{ minWidth: '60%', fontSize: '15px' }}
              theme={theme}
              value={description}
              placeholder="Add a description"
              onChange={handleDescriptionChange}
            />
          </HorizontalContainer>
          {/* Tag picker*/}
          {tagsFound && (
            <HorizontalContainer style={{ paddingBottom: '30px' }}>
              <TagIconContainer />
              <TagPicker
                selectedId={tagId}
                tags={tagList}
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={setDropdownOpen}
                handleIdSelect={setTagId}
              />
            </HorizontalContainer>
          )}

          <HorizontalContainer
            style={{
              paddingLeft: '60px',
              paddingRight: '60px',
              flexDirection: 'column',
            }}
          >
            <SubmitButton
              title="Save"
              theme={theme}
              handleClick={
                state?.prevEvent ? handleUpdateEvent : handleCreateNewEvent
              }
            />
          </HorizontalContainer>
        </AddEventForm>
      </PageContainer>
    </ThemeProvider>
  )
}

export default AddEventPage
