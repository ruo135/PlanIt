// Lucas Chew 260971542

import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LoadingComponent from '../components/LoadingComponent'

// const Page = lazy(() => import("../pages/___"))
const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const CalendarPage = lazy(() => import('../pages/CalendarPage'))
const CreateEventPage = lazy(() => import('../pages/CreateEventPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const TodoPage = lazy(() => import('../pages/TodoPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/calendar" Component={CalendarPage} />
          <Route path="/createEvent" Component={CreateEventPage} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="/todo" Component={TodoPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="*" Component={() => <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
