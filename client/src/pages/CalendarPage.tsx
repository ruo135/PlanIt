import { FC } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'

const CalendarPage: FC = () => {
  return <NavBar type={'back'} theme={defaultTheme} />
}

export default CalendarPage
