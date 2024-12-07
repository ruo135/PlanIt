import { FC } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'

const LoginPage: FC = () => {
  return <NavBar type={'login'} theme={defaultTheme} />
}

export default LoginPage
