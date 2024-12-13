import { FC, JSX, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { Theme } from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import getMonthName from '../helpers/MonthToString'
import arrowLeft from '../assets/arrowLeft.svg'
import arrowRight from '../assets/arrowRight.svg'
import { useNavigate } from 'react-router-dom'
import CalendarSideBarBox from '../components/CalendarSideBarBox'
import { Tag } from '../models/Tag'
import getAuthenticated from '../api/auth'
import { getAllTags } from '../api/tags'
import { Todo } from '../models/Todo'
import { getAllTodos } from '../api/todos'
import AnimationComponent from '../components/AnimationComponent'
import { ReactComponent as menuIcon } from '../assets/menu.svg'
import { ReactComponent as exitIcon } from '../assets/plus.svg'
import { getAllEvents } from '../api/events'
import { Event } from '../models/Event'
import CalendarMonthlyEvent from '../components/CalendarMonthlyEvent'
import fixTimeOffset from '../helpers/fixTimeOffset'
import getTheme from '../api/themes'

const PageContainer = styled.div`
  align-items: stretch;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  display: flex;
  position: relative;
`

const SideBarContainer = styled.div<{ open: boolean }>`
  flex-direction: column;
  width: 25%;
  height: 100%;
  background-color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media only screen and (max-width: 1000px) {
    z-index: 10;
    display: ${(props) => (props.open ? 'flex' : 'none')};
    position: absolute;
    width: 100%;
  }
`

const HamburgerMenu = styled(menuIcon)`
  position: absolute;
  left: 1vh;
  top: calc(3.5vh - 10px);
  fill: ${(props) => props.theme.background};
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media only screen and (min-width: 1000px) {
    display: none;
  }
`

const ExitIcon = styled(exitIcon)`
  width: auto;
  height: 5vw;
  aspect-ratio: 1/1;
  position: absolute;
  top: 1vh;
  right: 1vw;
  fill: ${(props) => props.theme.text};
  transform: rotate(45deg);

  @media only screen and (min-width: 1000px) {
    display: none;
  }
`

const AddEventButtonContainer = styled.button`
  width: 50%;
  padding: 2vh 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: max(14px, 1.042vw);
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
  font-size: max(16px, 1.302vw);
  font-weight: bold;
`

const ArrowContainers = styled.img`
  padding: 5px 1vw;

  &:hover {
    cursor: pointer;
  }
`

const TodayButtonContainer = styled.button`
  margin: auto 0;

  width: fit-content;
  padding: 10px 1vw;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: max(0.781vw, 12px);
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
  font-size: max(0.833vw, 12px);
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
  font-size: max(0.833vw, 12px);
  display: block;
  color: ${(props) => props.theme.calendarText};
`

const CalendarPage: FC = () => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const [year, setYear] = useState(new Date().getFullYear())
  // Month is 0 -> 11
  const [month, setMonth] = useState(new Date().getMonth())

  // Setup navigation stack
  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  // Check if user is authenticated
  // Gets data for the calendar (Tags, Todos, Events)
  useEffect(() => {
    getAuthenticated()
      .catch(() => {
        navigate('/login')
      })
      .then(() => {
        getTheme().then((t) => {
          setTheme(t)
        })

        // Get Tags then sort by alphabet
        getAllTags().then((d) =>
          setTags(
            d.sort((a, b) => {
              return a.name.localeCompare(b.name)
            })
          )
        )

        // Get Todos and Sort by whether it is checked, then by alphabetical
        getAllTodos().then((d) =>
          setTodos(
            d.sort((a, b) => {
              const checkedCompare = Number(a.isChecked) - Number(b.isChecked)
              if (checkedCompare !== 0) {
                return checkedCompare
              }
              // If checked status is the same, sort by name (case-insensitive)
              return a.todo.localeCompare(b.todo)
            })
          )
        )

        // Set Events
        getAllEvents().then((d) => {
          setEvents(
            d.map((e) => ({
              ...e,
              startDate: fixTimeOffset(new Date(e.startDate), false),
              endDate: fixTimeOffset(new Date(e.endDate), false),
            }))
          )
        })
      })
  }, [navigate])

  const goToToday = () => {
    setYear(new Date().getFullYear())
    setMonth(new Date().getMonth())
  }

  const changeMonthState = (value: number) => {
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
      // Pushes the top date of each calendar cell
      // If it is current date, then highlight it
      calendar.push(
        <CalendarCell key={day}>
          {day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear() ? (
            <CalendarCellDate
              style={{
                display: 'flex',
                backgroundColor: theme.indent,
                borderRadius: '5px',
                color: theme.text,
                width: '25%',
                margin: '0 auto',

                justifyContent: 'center',
                alignItems: 'center',
                // TODO: Match this with the font-size of this above
                minWidth: '16px',
              }}
            >
              {day}
            </CalendarCellDate>
          ) : (
            <CalendarCellDate>{day}</CalendarCellDate>
          )}
          {/* Put each event that matches into the cell */}
          {events
            .filter(
              (e) =>
                e.startDate.getFullYear() === year &&
                e.startDate.getMonth() === month &&
                e.startDate.getDate() === day
            )
            .map((e) => {
              return (
                <CalendarMonthlyEvent
                  key={e._id}
                  event={e}
                  tag={tags.find((t) => t._id === e.tagId)}
                  setEventState={setEvents}
                />
              )
            })}
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

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'back'} theme={theme} />
      <PageContainer>
        {/* Left side of the screen */}
        <SideBarContainer open={sidebarOpen}>
          {sidebarOpen && <ExitIcon onClick={() => setSidebarOpen(false)} />}
          <AddEventButtonContainer onClick={() => pageRouter('/createEvent')}>
            Add Event
          </AddEventButtonContainer>
          <CalendarSideBarBox
            theme={theme}
            tags={tags}
            setTags={setTags}
            todos={todos}
            setTodos={setTodos}
          />
        </SideBarContainer>
        {/* Right side of the screen */}
        <CalendarContainer>
          <DateControllerContainer>
            <HamburgerMenu onClick={() => setSidebarOpen(true)} />
            <TodayButtonContainer onClick={() => goToToday()}>
              Today
            </TodayButtonContainer>
            <ArrowContainers
              src={arrowLeft}
              onClick={() => changeMonthState(-1)}
            />
            <DateContainer>
              {getMonthName(month)} {year}
            </DateContainer>
            <ArrowContainers
              src={arrowRight}
              onClick={() => changeMonthState(1)}
            />
          </DateControllerContainer>
          <DayOfWeekContainer>{renderDaysofWeek()}</DayOfWeekContainer>
          <CalendarBody>{renderDays()}</CalendarBody>
        </CalendarContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default CalendarPage
