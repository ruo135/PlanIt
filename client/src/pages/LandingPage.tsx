// Zi Xin Chen 260754924

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import bg from '../assets/galaxy-bg.jpg'
import cal from '../assets/Calendar_Default.png'
import axios from 'axios'

const PageContainer = styled.div`
  width: 100%;
  height: calc(100vh - max(8vh, 60px)); // Adjust for navbar and top spacing
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
      to top,
      ${defaultTheme.primary} -15%,
      rgba(0, 0, 0, 0.3)
    ),
    url(${bg});
  background-size: cover;
  overflow-y: auto;
  html,
  body {
    min-width: 375px;
  }
`

// Grid container for slogan and sign up button
const Grid = styled.div`
  min-width: 300px;
  width: 40%;
  height: 40%;
  display: block;
  display: inline-block;
  left: -12%;
  position: relative;
  padding-top: 5%;
  padding-left: 5%;

  @media (max-width: 1200px) {
    margin-bottom: 50px;
    left: -11%;
  }

  @media (max-width: 760px) {
    margin-bottom: 50px;
    width: 70%;
    left: -5%;
  }

  @media (max-width: 425px) {
    margin-bottom: 125px;
    left: 0%;
  }
`

// Main article styling that holds the calendar and description
const Article = styled.div`
  width: 60%;
  height: 80%;
  min-height: 60vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 0px;
  padding-top: 30px;
  padding-bottom: 50px;
  padding-left: 5%;
  padding-right: 5%;
  h1 {
    display: block;
  }

  @media (max-width: 1200px) {
    min-height: 70%;
    display: block;
    margin-top: 75px;
    margin-left: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    h1 {
      display: block;
    }
  }

  @media (max-width: 760px) {
    display: grid;
    grid-template-rows: 30px 49% 20%;
    align-items: center;
    padding-top: 50px;
    padding-right: 50px;
    width: 100%;
    height: 80%;
    h1 {
      display: block;
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 30px;
    width: 100%;
    height: 90%;
    h1 {
      display: block;
    }
  }
`

// Mock calendar image
const Calendar_Mock = styled.div`
  margin-top: 25px;
  min-width: 65%;
  height: 60%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${cal});

  @media (max-width: 1670px) {
    min-width: 60%;
  }

  @media (max-width: 1200px) {
    margin-top: 30px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    margin-top: 30px;
    left: -0%;
    min-width: 100%;
    min-height: 15%;
  }
`

// Side description of the article
const Side = styled.div`
  margin-top: 20px;
  margin-left: 50px;
  height: 60%;
  max-width: 30%;
  min-width: 30%;
  text-align: justify;
  flex-shrink: 0;
  span {
    line-height: 2;
  }

  @media (max-width: 1750px) {
    margin-top: 20px;
    span {
      font-size: 14px;
      line-height: 2;
    }
  }

  @media (max-width: 1600px) {
    margin-top: 20px;
    span {
      font-size: 13px;
      line-height: 1.5;
    }
  }

  @media (max-width: 1200px) {
    margin-top: 20px;
    margin-left: 50px;
    width: 100%;
    max-width: 80%;
    height: 15%;
    span {
      font-size: 12px;
      line-height: 1.5;
    }
  }

  @media (max-width: 800px) {
    display: inline;
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
    width: 90%;
    max-width: 75%;
    height: 50%;
    span {
      font-size: 12px;
    }
  }

  @media (max-width: 800px) {
    margin-top: 30px;
    margin-left: 10px;
    width: 100%;
    min-width: 90%;
    height: 50%;
    span {
      font-size: 12px;
    }
  }
`
const Title = styled.div`
  margin-top: 20px;
  @media (max-width: 1200px) {
    display: none;
  }
`

// Footer for the article, for the reviews
const ArticleFooter = styled.div`
  min-width: 80%;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 15px;
  padding: 25px 15px 25px 15px;
  margin-bottom: 25px;
  border-style: solid;
  border-color: ${defaultTheme.text};
  span {
    color: ${defaultTheme.text};
    font-style: italic;
    font-size: 16px;
    font-family: 'Times New Roman';
  }
  @media (max-width: 1200px) {
    display: none;
  }
`

//Sign up button in the grid
const SignUpButton = styled.button`
  display: flex;
  height: 3vw;
  padding: 15px 15px;

  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: max(15px, 1vw);
  font-weight: bold;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
`

const LandingPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const navigate = useNavigate()

  useEffect(() => {
    const getAuthenticated = () => {
      axios
        .get('/api/user')
        .then((e) => {
          navigate('/calendar')
        })
        .catch((e) => {})
    }
    getAuthenticated()
  }, [navigate])

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'landing'} theme={defaultTheme} />
      <PageContainer>
        <Grid>
          <h1
            style={{
              color: theme.text,
              font: 'bold 45px Verdana',
              lineHeight: '1.5',
            }}
          >
            PlanIt, View it, Do it.
          </h1>
          <p style={{ color: theme.text }}>
            {' '}
            PlanIt is not just a calendar app; it's your personal time
            assistant, designed to simplify the way you organize and manage your
            day-to-day activities.{' '}
          </p>
          <br></br>
          <SignUpButton onClick={() => navigate('/register')}>
            Sign Up
          </SignUpButton>
        </Grid>
        <Article>
          <h1 style={{ font: 'bold 25px Verdana', color: theme.text }}>
            PlanIt: The all-in-one calendar solution
          </h1>
          <Calendar_Mock />
          <Side>
            <span style={{ color: theme.text }}>
              Introducing <b>PlanIt</b> – the smart, intuitive calendar app that
              does more than just schedule your events; it helps you plan your
              life. In today’s fast-paced world, staying organized is crucial,
              but managing multiple calendars, to-do lists, and reminders can be
              overwhelming. PlanIt consolidates everything you need into one
              seamless experience, giving you more time to focus on what truly
              matters.
            </span>
          </Side>
          <Title>
            <h3 style={{ color: theme.text }}>Reviews</h3>
          </Title>
          <ArticleFooter>
            <span>
              "Revolutionary groundbreaking product. I cant live without it.
              Literally."
            </span>
            <span>
              "I'm never using Google Calendar again after discovering this
              gem."
            </span>
            <span>"This is a student project? I think it deserves an A+."</span>
          </ArticleFooter>
        </Article>
      </PageContainer>
    </ThemeProvider>
  )
}

export default LandingPage
