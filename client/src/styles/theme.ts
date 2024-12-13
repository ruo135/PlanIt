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
const defaultThemeHS = {
  header: '#484848',
  headerIcons: '#FFFFFF',

  primary: '#7671BA', // og purple
  secondary: '#a598cd', // lighter purple
  indent: '#9687c5', // darker purple
  error: '#b64949', // red

  text: '#FFFFFF', //white
  calendarText: '#484848', //grey
  background: '#FFFFFF',
}

const darkTheme = {
  header: '#54527a', //dark purple
  headerIcons: '#FFFFFF',

  primary: '#2c2c2c', // dark grey
  secondary: '#54527a', // dark purple
  indent: '#424158', // darker purple
  error: '#b64949', // red

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF', //white
  background: '#353535',
}

const halloweenTheme = {
  header: '#d18c61', //orange
  headerIcons: '#FFFFFF',

  primary: '#2c2c2c', // dark grey
  secondary: '#d18c61', // orange
  indent: '#585775', // dark purple
  error: '#b64949', // red

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF', //white
  background: '#353535',
}

export { darkTheme }
export default defaultTheme
