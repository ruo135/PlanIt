import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import getAuthenticated from '../api/auth'
import { useNavigate } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import bg from '../assets/galaxy-bg.jpg'

const PageContainer = styled.div`
  align-items: stretch;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  display: flex;
  float: left;
  background-image: url('../assets/galaxy-bg.jpg');
  display: block;
  display: inline-block;
  overflow-y: auto;
`
const Grid = styled.div`
  width: 60%;
  height: 40%;

`
const Article = styled.div`
  position: relative;
  margin-top: 50px;
  padding-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: ${defaultTheme.background};
  display: flex;
  left: 15%;
  width: 60%;
  height: 80%;
`

/*
const navigate = useNavigate();

useEffect(() => {
  getAuthenticated().catch(() => {
    navigate('/login')
  })

})*/

const LandingPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
    
  return ( 
    <ThemeProvider theme={theme}>
      <NavBar type={'landing'} theme={defaultTheme} />
      <PageContainer>
        <Grid>
        </Grid>
        <Article>
          <h1 style={{ color: '#484848' }}>Test</h1>
        </Article>
      </PageContainer>
    </ThemeProvider>
  ) 
}

export default LandingPage
