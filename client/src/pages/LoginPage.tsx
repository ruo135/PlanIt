// Ruo Yang Jiang 261055118

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// CSS styled components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  background-color: ${defaultTheme.primary};

  @media (max-width: 400px) {
    background-color: ${defaultTheme.background};
    align-items: flex-start;
  }
`

const FormBody = styled.div`
  padding-top: 20px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 500px;
  background-color: ${defaultTheme.background};
`
const Label = styled.p`
  margin-bottom: 5px;
  text-color: ${defaultTheme.calendarText};
`

const LoginPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(Boolean)
  const [passwordError, setPasswordError] = useState(Boolean)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const navigate = useNavigate()

  // Check if user is authenticated
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

  axios.defaults.withCredentials = true

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleRedirectToRegister = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    navigate('/register')
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setEmailError(false)
    setPasswordError(false)
    setEmailErrorMessage('')
    setPasswordErrorMessage('')

    if (!email || !password) {
      if (!email) {
        setEmailError(true)
        setEmailErrorMessage('Please enter a valid email')
      }
      if (!password) {
        setPasswordError(true)
        setPasswordErrorMessage('Please enter your password')
      }
    } else {
      const loginCredentials = { email, password }

      await axios
        .post('/api/user/login', loginCredentials)
        .then(() => {
          navigate('/calendar')
        })
        .catch((e) => {
          setEmailError(true)
          setPasswordError(true)
          setEmailErrorMessage('')
          setPasswordErrorMessage('Invalid credentials')
        })
    }
  }

  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'login'} theme={theme} />
      <PageContainer>
        <FormBody>
          <h1 style={{ color: '#484848' }}>Login</h1>
          <Label>Email</Label>
          <InputField
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            errorMessage={emailErrorMessage}
            handleKeyDown={handleEnterPress}
          />

          <Label>Password</Label>
          <InputField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            errorMessage={passwordErrorMessage}
            handleKeyDown={handleEnterPress}
          />
          <Label>
            New to PlanIt?{' '}
            <a href="/register" onClick={handleRedirectToRegister}>
              Register!
            </a>
          </Label>
          <br />
          <SubmitButton title="LOG IN" handleClick={handleSubmit} />
        </FormBody>
      </PageContainer>
    </ThemeProvider>
  )
}

export default LoginPage
