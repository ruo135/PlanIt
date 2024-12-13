import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { Theme } from '../styles/theme'
import { testTheme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'
import LoadingComponent from '../components/LoadingComponent'
import getTheme from '../api/themes'

const PageContainer = styled.div`
  align-items: stretch;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  float: left;
  background-color: ${(props) => props.theme.background};
  background-size: cover;
  display: block;
  display: inline-block;
  overflow-y: auto;
`
const Grid = styled.div`
  min-width: 300px;
  width: 40%;
  height: 40%;
  display: block;
  display: inline-block;
  clear: left;
  left: 30%;
  position: relative;
  margin-top: 5%;
  background-color: ${(props) => props.theme.primary};
`

const SettingsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(defaultTheme)
  const theme1 = defaultTheme
  const theme2 = testTheme
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState('')

  // Setup navigation stack
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
          setIsLoading(false)
        })
      })
  }, [navigate])

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === defaultTheme ? testTheme : defaultTheme
    )
  }

  const changeTheme = (newtheme: string) => {
    if (newtheme === 'light') setTheme(defaultTheme)
    if (newtheme === 'dark') setTheme(testTheme)
    axios
      .patch('/api/theme/', { theme: newtheme })
      .then(() => {
        navigate('/calendar')
      })
      .catch((e) => {
        setTitleError(true)
        setTitleErrorMessage('Theme could not be changed')
      })
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}

      <NavBar type={'back'} theme={theme} hideSettings={true} />
      <PageContainer>
        <Grid>
          <button onClick={() => changeTheme('light')}>Theme 1</button>
        </Grid>
        <br></br>
        <Grid>
          <button onClick={() => changeTheme('dark')}>Theme 2</button>
        </Grid>
        <br></br>
        <Grid>
          <button onClick={toggleTheme}>Toggle</button>
        </Grid>
      </PageContainer>
    </ThemeProvider>
  )
}

export default SettingsPage
