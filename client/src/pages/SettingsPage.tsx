import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'
import getTheme from '../api/themes'
import { ThemeProvider } from 'styled-components'
import LoadingComponent from '../components/LoadingComponent'

const SettingsPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [isLoading, setIsLoading] = useState(true)
  // Check if user is authenticated
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    getAuthenticated()
      .catch(() => {
        navigate('/login')
      })
      .then(() => {
        getTheme().then((t) => {
          setTheme(t)
        })

        setIsLoading(false)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}
      <NavBar type={'back'} theme={defaultTheme} hideSettings={true} />
    </ThemeProvider>
  )
}

export default SettingsPage
