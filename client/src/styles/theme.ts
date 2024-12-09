import { DefaultTheme } from 'styled-components'

export interface Theme extends DefaultTheme {
  header: string
  headerIcons: string

  primary: string
  secondary: string
  indent: string

  text: string
  calendarText: string
  background: string
}

const defaultTheme = {
  header: '#484848',
  headerIcons: '#FFFFFF',

  primary: '#7671BA',
  secondary: '#9894cb',
  indent: '#8682c2',

  text: '#FFFFFF',
  calendarText: '#4b4b4b',
  background: '#FFFFFF',
}

export default defaultTheme
