import { FC } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'

const LandingPage: FC = () => {
  return <NavBar type={'landing'} theme={defaultTheme} />
}

export default LandingPage
