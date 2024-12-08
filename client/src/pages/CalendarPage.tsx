import { FC, JSX, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import styled from 'styled-components'
import getMonthName from '../helpers/MonthToString'
import arrowLeft from '../assets/arrowLeft.svg'
import arrowRight from '../assets/arrowRight.svg'

const CalendarPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [year, setYear] = useState(new Date().getFullYear())
  // Month is 0 -> 11
  const [month, setMonth] = useState(new Date().getMonth())

  const PageContainer = styled.div`
    align-items: stretch;
    width: 100%;
    height: 92vh;
    display: flex;
  `

  const SideBarContainer = styled.div`
    flex: '0 0 25%';
    flex-direction: column;
    width: 25%;
    height: auto;
    background-color: ${theme.primary};
  `

  const CalendarContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 75%;
    background-color: ${theme.background};
  `

  const DateControllerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    height: 7vh;
    background-color: ${theme.secondary};
  `

  const DateContainer = styled.span`
    display: flex;
    width: 20%;
    min-width: fit-content;
    padding: 0px min(10px, 5vw);

    justify-content: center;
    align-self: center;
    text-align: center;

    color: ${theme.text};
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
    color: ${theme.text};
    background-color: ${theme.secondary};

    &:hover {
      background-color: ${theme.indent};
    }
  `

  const DayOfWeekContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: ${theme.secondary};
    height: fit-content;
    padding: 5px 0;
  `

  const DayofWeekCell = styled.div`
    color: ${theme.text};
    text-align: center;
  `

  const CalendarBody = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: stretch;
  `

  const CalendarCell = styled.div`
    padding: 10px;
    text-align: center;
    border: 1px solid ${theme.secondary};
  `

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

    for (let day = 1; day <= days; day++) {
      calendar.push(<CalendarCell key={day}>{day}</CalendarCell>)
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
    <>
      <NavBar type={'back'} theme={defaultTheme} />
      <PageContainer>
        {/* Left side of the screen */}
        <SideBarContainer></SideBarContainer>
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
    </>
  )
}

export default CalendarPage
