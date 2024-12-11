import { FC, useEffect } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import getAuthenticated from '../api/auth'

const AddEventPage: FC = () => {
  // Setup navigation stack
  let navigate = useNavigate()
  const pageRouter = (path: string) => {
    navigate(path)
  }

  // Check if user is authenticated
  useEffect(() => {
    getAuthenticated().catch(() => {
      navigate('/login')
    })
  }, [navigate])

  return <NavBar type={'back'} theme={defaultTheme} />
}

export default AddEventPage
