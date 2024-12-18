// Zi Xin Chen 260754924

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { darkTheme, winterTheme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'
import LoadingComponent from '../components/LoadingComponent'
import getTheme from '../api/themes'
import calDefault from '../assets/Calendar_Default.png'
import calDark from '../assets/Calendar_Dark.png'
import calWinter from '../assets/Calendar_Winter.png'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  background-color: ${(props) => props.theme.background};
  background-size: cover;
  overflow-y: auto;
`
const Grid = styled.div`
  width: auto;
  min-width: 75vh;
  height: 100%;
  min-height: 40vh;
  display: block;
  position: relative;
  margin-top: 5%;
  background-size: cover;
  background-color: ${(props) => props.theme.background};

  @media (max-width: 700px) {
    width: auto;
    min-width: 80%;
    height: 30%;
    min-height: 20%;
`

const GridDefault = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${calDefault});
`

const GridDark = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${calDark});
`

const GridWinter = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${calWinter});
`

const SettingsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(defaultTheme)
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
      prevTheme === defaultTheme ? darkTheme : defaultTheme
    )
  }

  const changeTheme = (newtheme: string) => {
    if (newtheme === 'light') setTheme(defaultTheme)
    if (newtheme === 'dark') setTheme(darkTheme)
    if (newtheme === 'winter') setTheme(winterTheme)
    axios.patch('/api/theme/', { theme: newtheme }).catch((e) => {
      setTitleError(true)
      setTitleErrorMessage('Theme could not be changed')
    })
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}

      <NavBar type={'back'} theme={theme} hideSettings={true} />
      <PageContainer>
        <br></br>
        <Grid>
          <button onClick={() => changeTheme('light')}>Light</button>
          <GridDefault />
        </Grid>
        <br></br>
        <Grid>
          <button onClick={() => changeTheme('dark')}>Dark</button>
          <GridDark />
        </Grid>
        <br></br>
        <Grid>
          <button onClick={() => changeTheme('winter')}>Winter</button>
          <GridWinter />
        </Grid>
      </PageContainer>
    </ThemeProvider>
  )
}

export default SettingsPage
