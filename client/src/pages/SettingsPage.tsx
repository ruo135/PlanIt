import { FC, useEffect } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'

const SettingsPage: FC = () => {
  // Setup navigation stack
  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  // Check if user is authenticated
  useEffect(() => {
    getAuthenticated().then((r) => {
      if (!r) navigate('/login')
    })
  }, [navigate])

  return <NavBar type={'back'} theme={defaultTheme} hideSettings={true} />
}

export default SettingsPage
