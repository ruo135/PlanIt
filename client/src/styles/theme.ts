import { DefaultTheme } from 'styled-components'

export interface Theme extends DefaultTheme {
  header: string
  headerIcons: string

  primary: string
  secondary: string
  indent: string
  error: string

  text: string
  calendarText: string
  background: string
}

const defaultTheme = {
  header: '#484848',
  headerIcons: '#FFFFFF',

  primary: '#7671BA', // og purple
  secondary: '#9894cb', // lighter purple
  indent: '#8682c2', // darker purple
  error: '#b64949', // red

  text: '#FFFFFF', //white
  calendarText: '#484848', //grey
  background: '#FFFFFF',
}

const testTheme = {
  header: '#484848',
  headerIcons: '#FFFFFF',

  primary: '#FFFFFF', // og purple
  secondary: '#FFFFFF', // lighter purple
  indent: '#FFFFFF', // darker purple
  error: '#FFFFFF', // red

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF', //grey
  background: '#000000',
}

export { testTheme }
export default defaultTheme
