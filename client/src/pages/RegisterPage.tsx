// Ruo Yang Jiang 261055118

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import checkValidity from '../helpers/checkValidity'

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
  justify-content: top;
  align-items: left;
  width: 500px;
  height: 80%;
  background-color: ${defaultTheme.background};
`
const Label = styled.p`
  margin-bottom: 5px;
  text-color: ${defaultTheme.calendarText};
`

const RegisterPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState(Boolean)
  const [passwordError, setPasswordError] = useState(Boolean)
  const [confirmPasswordError, setConfirmPasswordError] = useState(Boolean)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('')

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
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

  const handleRedirectToLogin = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    navigate('/login')
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    setEmailErrorMessage('')
    setPasswordErrorMessage('')
    setConfirmPasswordErrorMessage('')

    if (!email || !checkValidity(email) || !password || !confirmPassword) {
      if (!email || !checkValidity(email)) {
        setEmailError(true)
        setEmailErrorMessage('Please enter a valid email')
      }
      if (!password) {
        setPasswordError(true)
        setPasswordErrorMessage('Please enter your password')
      }
      if (!confirmPassword) {
        setConfirmPasswordError(true)
        setConfirmPasswordErrorMessage('Please confirm your password')
      }
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorMessage("Passwords don't match")
    } else {
      const loginCredentials = { email, password }

      await axios
        .post('/api/user/signup', loginCredentials)
        .then(() => {
          navigate('/login')
        })
        .catch((e) => {
          setEmailError(true)
          setPasswordError(false)
          setEmailErrorMessage(
            'A user with this email already exists. Please log in instead'
          )
          setPasswordErrorMessage('')
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
          <h1 style={{ color: '#484848' }}>Register</h1>
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

          <Label>Confirm password</Label>
          <InputField
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={confirmPasswordError}
            errorMessage={confirmPasswordErrorMessage}
            handleKeyDown={handleEnterPress}
          />

          <Label>
            Already have an account?{' '}
            <a href="/login" onClick={handleRedirectToLogin}>
              Log in!
            </a>
          </Label>
          <br />
          <SubmitButton title="REGISTER" handleClick={handleSubmit} />
        </FormBody>
      </PageContainer>
    </ThemeProvider>
  )
}

export default RegisterPage
