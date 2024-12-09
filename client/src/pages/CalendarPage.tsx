import { FC, JSX, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import getMonthName from '../helpers/MonthToString'
import arrowLeft from '../assets/arrowLeft.svg'
import arrowRight from '../assets/arrowRight.svg'
import { useNavigate } from 'react-router-dom'
import CalendarSideBarBox from '../components/CalendarSideBarBox'

const PageContainer = styled.div`
  align-items: stretch;
  width: 100%;
  height: 92vh;
  display: flex;
`

const SideBarContainer = styled.div`
  flex-direction: column;
  width: 25%;
  height: auto;
  background-color: ${(props) => props.theme.primary};
  display: flex;

  align-items: center;
  justify-content: space-around;
`

const AddEventButtonContainer = styled.button`
  width: 80%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.secondary};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const CalendarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 75%;
  background-color: ${(props) => props.theme.background};
`

const DateControllerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  height: 7vh;
  background-color: ${(props) => props.theme.primary};
`

const DateContainer = styled.span`
  display: flex;
  width: 20%;
  min-width: fit-content;
  padding: 0px min(10px, 5vw);

  justify-content: center;
  align-self: center;
  text-align: center;

  color: ${(props) => props.theme.text};
  font-size: 25px;
  font-weight: bold;
`

const ArrowContainers = styled.img`
  padding: 5px 20px;

  &:hover {
    cursor: pointer;
  }
`

const TodayButtonContainer = styled.button`
  margin: auto 0;

  width: fit-content;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const DayOfWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${(props) => props.theme.secondary};
  height: fit-content;
  padding: 5px 0;
`

const DayofWeekCell = styled.div`
  color: ${(props) => props.theme.text};
  text-align: center;
`

const CalendarBody = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  background-color: ${(props) => props.theme.secondary};
`

const CalendarCell = styled.div`
  border: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.background};
  text-align: center;
  padding: 5px;
`

const CalendarCellDate = styled.span`
  font-size: 16px;
  display: block;
  color: ${(props) => props.theme.calendarText};
`

const CalendarPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [tags, setTags] = useState<string[]>([])
  const [events, setEvents] = useState([])

  const [year, setYear] = useState(new Date().getFullYear())
  // Month is 0 -> 11
  const [month, setMonth] = useState(new Date().getMonth())

  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  const goToToday = () => {
    setYear(new Date().getFullYear())
    setMonth(new Date().getMonth())
  }

  const changeMonth = (value: number) => {
    if (month + value > 11) {
      setMonth(0)
      setYear(year + 1)
    } else if (month + value < 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month + value)
    }
  }

  const renderDays = () => {
    const daysInMonth = (month: number, year: number) =>
      new Date(year, month, 0).getDate()
    const getFirstDayOfMonth = (month: number, year: number) =>
      new Date(year, month - 1, 1).getDay()

    const firstDay = getFirstDayOfMonth(month + 1, year)
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay()
    const days = daysInMonth(month + 1, year)

    const calendar: JSX.Element[] = []

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<CalendarCell key={`prev-${i}`} />)
    }

    const today = new Date()
    for (let day = 1; day <= days; day++) {
      calendar.push(
        <CalendarCell key={day}>
          {day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear() ? (
            <CalendarCellDate
              style={{
                display: 'block',
                backgroundColor: theme.indent,
                borderRadius: '5px',
                color: theme.text,
                width: '25%',
                margin: '0 auto',
                // TODO: Match this with the font-size of this above
                minWidth: '16px',
              }}
            >
              {day}
            </CalendarCellDate>
          ) : (
            <CalendarCellDate>{day}</CalendarCellDate>
          )}
        </CalendarCell>
      )
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      calendar.push(<CalendarCell key={`next-${i}`} />)
    }

    return calendar
  }

  const renderDaysofWeek = () => {
    const dOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const res: JSX.Element[] = []

    dOfWeek.forEach((d) => {
      res.push(<DayofWeekCell key={d}>{d}</DayofWeekCell>)
    })

    return res
  }

  const changeTagVisibility = (name: string) => {
    // check if tag is in tags arr
    // Change visibility option of that tag
    // Send update to db
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'back'} theme={theme} />
      <PageContainer>
        {/* Left side of the screen */}
        <SideBarContainer>
          <AddEventButtonContainer onClick={() => pageRouter('/createEvent')}>
            Add Event
          </AddEventButtonContainer>
          <CalendarSideBarBox
            theme={theme}
            tags={tags}
            changeTagVisibility={changeTagVisibility}
          />
        </SideBarContainer>
        {/* Right side of the screen */}
        <CalendarContainer>
          <DateControllerContainer>
            <TodayButtonContainer onClick={() => goToToday()}>
              Today
            </TodayButtonContainer>
            <ArrowContainers src={arrowLeft} onClick={() => changeMonth(-1)} />
            <DateContainer>
              {getMonthName(month)} {year}
            </DateContainer>
            <ArrowContainers src={arrowRight} onClick={() => changeMonth(1)} />
          </DateControllerContainer>
          <DayOfWeekContainer>{renderDaysofWeek()}</DayOfWeekContainer>
          <CalendarBody>{renderDays()}</CalendarBody>
        </CalendarContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default CalendarPage
