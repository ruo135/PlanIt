import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ReactLoading from 'react-loading'
import theme from '../styles/theme'
import styled from 'styled-components'

// const Page = lazy(() => import("../pages/___"))
const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const CalendarPage = lazy(() => import('../pages/CalendarPage'))
const CreateEventPage = lazy(() => import('../pages/CreateEventPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))

const LoadingPage = styled.div`
  background-color: ${theme.header};
  min-height: 100vh;
  min-width: 100vw;

  justify-content: center;
  align-items: center;
  display: flex;
`

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <LoadingPage>
            <ReactLoading
              type={'bars'}
              color={theme.primary}
              height="50%"
              width="50%"
            />
          </LoadingPage>
        }
      >
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/calendar" Component={CalendarPage} />
          <Route path="/createEvent" Component={CreateEventPage} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="*" Component={() => <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
