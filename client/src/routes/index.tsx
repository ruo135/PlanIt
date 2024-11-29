import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ReactLoading from 'react-loading'
import theme from '../styles/theme'
import styled from 'styled-components'

// const Page = lazy(() => import("../pages/___"))
const LandingPage = null
const LoginPage = null
const RegisterPage = null
const CalendarPage = null
const AddEventPage = null
const SettingsPage = null

const LoadingPage = styled.div`
  background-color: ${theme.colors.background};
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
              color={theme.colors.lightGray}
              height="20%"
              width="20%"
            />
          </LoadingPage>
        }
      >
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/calendar" Component={CalendarPage} />
          <Route path="/addEvent" Component={AddEventPage} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="*" Component={() => <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
