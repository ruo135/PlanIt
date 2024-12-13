import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'
import getTheme from '../api/themes'

const SettingsPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  // Check if user is authenticated
  useEffect(() => {
    let navigate = useNavigate()

    getAuthenticated()
      .catch(() => {
        navigate('/login')
      })
      .then(() => {
        getTheme().then((t) => {
          setTheme(t)
        })
      })
  }, [])

  return <NavBar type={'back'} theme={defaultTheme} hideSettings={true} />
}

export default SettingsPage
