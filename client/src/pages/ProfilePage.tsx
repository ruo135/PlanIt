// Zi Xin Chen 260754924

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme, { Theme } from '../styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import getTheme from '../api/themes'
import SuccessMessage from '../components/SuccessMessage'
import LoadingComponent from '../components/LoadingComponent'

// CSS styled components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  width: 100%;
  min-height: calc(100vh - max(8vh, 60px));
  background-color: ${(props) => props.theme.background};

  @media (max-width: 900px) {
    padding-top: 0;
  }
`

const FormBody = styled.div`
  padding: 0 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 500px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.calendarText};
  @media (max-width: 900px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`
const Title = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.calendarText};
  border-bottom: 1px solid ${(props) => props.theme.calendarText};
`

const Label = styled.p`
  margin-bottom: 10px;
  color: ${(props) => props.theme.calendarText};
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const PopupContainer = styled.div`
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.calendarText};
  border-radius: 8px;
  box-shadow: 0 10px 20px ${(props) => props.theme.primary};
  border: 5px;
  border-color: ${(props) => props.theme.primary};
`

const PopupTitle = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
`

const PopupBodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-content: center;
`

const PopupBodyContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
`

const PopupButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;

  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.indent};
  }
`

const ProfilePage: FC = () => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [email, setEmail] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState(Boolean)
  const [newPasswordError, setNewPasswordError] = useState(Boolean)
  const [confirmPasswordError, setConfirmPasswordError] = useState(Boolean)
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('')
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('')
  const [deleteAccount, setDeleteAccount] = useState(false)

  const navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    const getAuthenticated = () => {
      axios
        .get('/api/user')
        .then((res) => {
          setEmail(res.data.email)
          getTheme().then((t) => {
            setTheme(t)
            setIsLoading(false)
          })
        })
        .catch(() => {
          navigate('/login')
        })
    }
    getAuthenticated()
  }, [navigate])

  axios.defaults.withCredentials = true

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

  const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    axios.delete('api/user/delete').then(() => {
      navigate('/')
    })
  }

  const handleChangePassword = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    setOldPasswordError(false)
    setNewPasswordError(false)
    setConfirmPasswordError(false)
    setOldPasswordErrorMessage('')
    setNewPasswordErrorMessage('')
    setConfirmPasswordErrorMessage('')

    if (!oldPassword || !newPassword || !confirmPassword) {
      if (!oldPassword) {
        setOldPasswordError(true)
        setOldPasswordErrorMessage('Please enter your old password')
      }
      if (!newPassword) {
        setNewPasswordError(true)
        setNewPasswordErrorMessage('Please enter a new password')
      }
      if (!confirmPassword) {
        setConfirmPasswordError(true)
        setConfirmPasswordErrorMessage('Please confirm your password')
      }
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorMessage("Passwords don't match")
    } else {
      const newLoginCredentials = { email, password: oldPassword, newPassword }

      await axios
        .patch('/api/user/updatePassword', newLoginCredentials)
        .then(() => {
          setSuccess(true)
        })
        .catch((e) => {
          setOldPasswordError(true)
          setOldPasswordErrorMessage('Invalid old password')
        })
    }
  }

  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      handleChangePassword(e)
    }
  }

  const toggleChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChangePassword((prev) => !prev)
    setSuccess(false)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingComponent />}
      <NavBar type={'back'} theme={theme} hideProfile={true} />
      <PageContainer>
        <FormBody>
          <h1 style={{ color: theme.calendarText }}>Profile</h1>
          <Title>Email</Title>
          {email}
          <br />
          <br />
          <Title>
            Password
            <SubmitButton
              style={{ minHeight: '8px', whiteSpace: 'nowrap' }}
              title={changePassword ? 'Hide' : 'Change password'}
              theme={theme}
              handleClick={toggleChangePassword}
            />
          </Title>
          {!changePassword && (
            <p color={theme.calendarText} style={{ margin: '0' }}>
              Strengthen your account by ensuring your password is strong.
            </p>
          )}
          {changePassword && (
            <>
              <Label>Old password</Label>
              <InputField
                type="password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                error={oldPasswordError}
                errorMessage={oldPasswordErrorMessage}
                handleKeyDown={handleEnterPress}
                height={'15px'}
              />

              <Label>New password</Label>
              <InputField
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={newPasswordError}
                errorMessage={newPasswordErrorMessage}
                handleKeyDown={handleEnterPress}
                height={'15px'}
              />

              <Label>Confirm password</Label>
              <InputField
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                errorMessage={confirmPasswordErrorMessage}
                handleKeyDown={handleEnterPress}
                height={'15px'}
              />
              <br />

              <SubmitButton
                style={{
                  minHeight: '50px',
                  whiteSpace: 'nowrap',
                  width: '50%',
                }}
                title="Update password"
                theme={theme}
                handleClick={handleChangePassword}
              />
              {success && <SuccessMessage message="Password changed!" />}
            </>
          )}
          <br />
          <Title style={{ color: theme.error }}>Delete account </Title>
          Once you delete your account, you cannot get it back.
          <br />
          <br />
          <SubmitButton
            theme={theme}
            style={{
              minHeight: '50px',
              width: '50%',
              backgroundColor: theme.error,
            }}
            title="Delete your account"
            handleClick={(e) => setDeleteAccount(true)}
          />
          {deleteAccount && (
            <Overlay>
              <PopupContainer>
                <PopupTitle>Are you sure?</PopupTitle>
                <PopupBodyContainer>
                  <PopupBodyContainerRow>
                    <PopupButton
                      style={{ backgroundColor: theme.error }}
                      onClick={handleDeleteAccount}
                    >
                      Yes
                    </PopupButton>
                    <PopupButton onClick={() => setDeleteAccount(false)}>
                      No
                    </PopupButton>
                  </PopupBodyContainerRow>
                </PopupBodyContainer>
              </PopupContainer>
            </Overlay>
          )}
          <br />
        </FormBody>
      </PageContainer>
    </ThemeProvider>
  )
}

export default ProfilePage
