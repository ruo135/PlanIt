// Lucas Chew 260971542

import axios from 'axios'
import defaultTheme, { Theme, darkTheme, winterTheme } from '../styles/theme'
import { ThemeDb } from '../models/ThemeDb'

export default async function getTheme(): Promise<Theme> {
  try {
    const response = await axios.get<ThemeDb>('/api/theme')
    switch (response.data.theme) {
      case 'light':
        return defaultTheme
      case 'dark':
        return darkTheme
      case 'winter':
        return winterTheme
      default:
        return defaultTheme
    }
  } catch (error) {
    return defaultTheme // On error, return the default theme
  }
}
