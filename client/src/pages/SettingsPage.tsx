import { FC } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'

const SettingsPage: FC = () => {
  return <NavBar type={'back'} theme={defaultTheme} hideSettings={true} />
}

export default SettingsPage
