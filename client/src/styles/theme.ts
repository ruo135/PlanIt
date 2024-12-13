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

//Light themes
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

const safariLightTheme = {
  header: '#818076',
  headerIcons: '#FFFFFF',

  primary: '#52554d',
  secondary: '#818076',
  indent: '#6A716A',
  error: '#b64949',

  text: '#FFFFFF',
  calendarText: '#52554d',
  background: '#acaa9f',
}

const pinkTheme = {
  header: '#f9b5d1',
  headerIcons: '#FFFFFF',

  primary: '#f989a2',
  secondary: '#f9b5d1',
  indent: '#d6b4e6',
  error: '#b64949',

  text: '#FFFFFF',
  calendarText: '#484848',
  background: '#FFFFFF',
}

const matchaTheme = {
  header: '#34492a', //orange
  headerIcons: '#FFFFFF',

  primary: '#888c3e',
  secondary: '#c1b676',
  indent: '#e9e2d5',
  error: '#b64949',

  text: '#34492a',
  calendarText: '#34492a',
  background: '#e9e2d5',
}

//Dark themes
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

const allDarkTheme = {
  header: '#202020',
  headerIcons: '#FFFFFF',

  primary: '#101010',
  secondary: '#202020',
  indent: '#424158',
  error: '#b64949',

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF',
  background: '#101010',
}

const safariDarkTheme = {
  header: '#697569',
  headerIcons: '#FFFFFF',

  primary: '#2e2f2d',
  secondary: '#77766E',
  indent: '#52554d',
  error: '#b64949',

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF', //white
  background: '#353535',
}

export { darkTheme }
export default defaultTheme
