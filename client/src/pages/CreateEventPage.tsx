import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { Theme } from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import closeIcon from '../assets/closeIcon.svg'
import clockIcon from '../assets/clockIcon.svg'
import InputField from '../components/InputField'
import { ReactComponent as DescriptionIcon } from '../assets/descriptionIcon.svg'
import { ReactComponent as clockIcons } from '../assets/clockIcon.svg'
import { ReactComponent as tagIcon } from '../assets/tagIcon.svg'
import { Color } from '../models/Color'
import TagPicker from '../components/TagPicker'
import getStartDate from '../helpers/getStarDate'
import getEndDate from '../helpers/getEndDate'
import SubmitButton from '../components/SubmitButton'

const PageContainer = styled.div`
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92vh;
  display: flex;
  background-color: ${(props) => props.theme.secondary};
`

const AddEventForm = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 30px;
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: flex-start;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 700px) {
    align-items: flex-start;
    width: 100%;
    height: 90%;
    border-radius: 15px 15px 0 0;
  }

  @media (max-width: 400px) {
    align-items: flex-start;
    width: 100%;
    height: 90%;
    border-radius: 15px 15px 0 0;
  }
`
const CloseIconContainer = styled.img`
  width: 25px;
  height: 25px;
  margin-left: auto;
  color: ${(props) => props.theme.calendarText};
  cursor: pointer;

  &:hover {
    background-color: #d7d5eb;
    border-radius: 50%;
  }
`

const LeftIconContainer = styled.img`
  width: 35px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const ClockIconContainer = styled(clockIcons)`
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const DescriptionIconContainer = styled(DescriptionIcon)`
  width: 38px;
  height: 38px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const TagIconContainer = styled(tagIcon)`
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.calendarText};
  padding-right: 30px;
`

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
`

const AddEventPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [tagId, setTagId] = useState('')
  const [tagList, setTagList] = useState<Color[]>([])
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState('')

  let navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    const getAuthenticated = () => {
      axios
        .get('/api/user')
        .then(() => {
          getTheme()
          getTags()
          setStartDate(getStartDate())
          setEndDate(getEndDate())
        })
        .catch(() => {
          navigate('/login')
        })
    }

    const getTheme = () => {
      axios.get('/api/theme').then((res) => {
        const theme = res.data.theme
        if (theme == 'light') setTheme(defaultTheme)
      })
    }

    const getTags = () => {
      axios.get('/api/tag/getAlltags').then((res) => {
        console.log(res.data)
        let colorList: Color[] = res.data.map(
          (tag: { _id: string; name: string; color: string }) => {
            return { tagId: tag._id, name: tag.name, color: tag.color }
          }
        )
        setTagList(colorList)
      })
    }

    getAuthenticated()
  }, [])

  // Check if user is authenticated
  useEffect(() => {
    console.log(tagId)
  }, [tagId])

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

    if (!title) {
      setTitleError(true)
      setTitleErrorMessage('Event must have a title')
    } else {
      const event = { title, startDate, endDate, description, tagId }
      await axios
        .post('/api/event/createEvent', event)
        .then((res) => {
          console.log(res.data)
          navigate('/calendar')
        })
        .catch((e) => {
          setTitleError(true)
          setTitleErrorMessage('Create event failed')
        })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'back'} theme={theme} />
      <PageContainer>
        <AddEventForm>
          {/* Close Icon*/}
          <CloseIconContainer
            src={closeIcon}
            onClick={(e) => navigate('/calendar')}
          />
          {/* Add Title*/}
          <InputField
            style={{
              fontSize: '30px',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderRadius: 0,
            }}
            theme={theme}
            value={title}
            onChange={handleTitleChange}
            placeholder="Add a title"
            error={titleError}
            errorMessage={titleErrorMessage}
          />
          {/* Pick date*/}
          <HorizontalContainer style={{ paddingTop: '30px' }}>
            {/* Clock Icon*/}
            <ClockIconContainer />
            {/* Start date picker Icon*/}
            <InputField
              style={{ width: '60%' }}
              type="datetime-local"
              theme={theme}
              value={startDate}
              onChange={handleDateChange}
            />
          </HorizontalContainer>
          {/* Checkbox*/}
          <HorizontalContainer style={{ padding: '10px', paddingLeft: '0' }}>
            <LeftIconContainer />
            to
          </HorizontalContainer>
          {/* Pick end date*/}
          <HorizontalContainer style={{ paddingBottom: '25px' }}>
            {/* Clock Icon*/}
            <ClockIconContainer style={{ fill: theme.background }} />
            {/* Start date picker Icon*/}
            <InputField
              style={{ width: '60%' }}
              type="datetime-local"
              theme={theme}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </HorizontalContainer>
          {/* Description*/}
          <HorizontalContainer>
            <DescriptionIconContainer />
            <InputField
              style={{ width: '60%' }}
              theme={theme}
              value={description}
              placeholder="Add a description"
              onChange={handleDescriptionChange}
            />
          </HorizontalContainer>
          {/* Tag picker*/}
          <HorizontalContainer
            style={{ paddingTop: '30px', paddingBottom: '30px' }}
          >
            <TagIconContainer />
            <TagPicker
              selectedId={tagId}
              tags={tagList}
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={setDropdownOpen}
              handleIdSelect={setTagId}
            />
          </HorizontalContainer>
          <HorizontalContainer
            style={{ paddingLeft: '60px', paddingRight: '60px' }}
          >
            <SubmitButton
              title="Save"
              theme={theme}
              handleClick={handleCreateNewEvent}
            />
          </HorizontalContainer>
        </AddEventForm>
      </PageContainer>
    </ThemeProvider>
  )
}

export default AddEventPage
