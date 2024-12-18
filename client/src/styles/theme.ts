import { DefaultTheme } from 'styled-components'
import { ReactComponent as circleIcon } from '../assets/circle.svg'
import { ReactComponent as winterIcon } from '../assets/winter.svg'
import { ReactComponent as springIcon } from '../assets/spring.svg'
import { ReactComponent as automnIcon } from '../assets/automn.svg'
import { ReactComponent as summerIcon } from '../assets/summer.svg'
import { SVGProps } from 'react'

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
  icon: React.FC<SVGProps<SVGSVGElement>>
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
  icon: circleIcon,
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

const winterTheme = {
  header: '#6282d7',
  headerIcons: '#FFFFFF',

  primary: '#a3bcf2',
  secondary: '#6282d7',
  indent: '#90a0de',
  error: '#b64949',

  text: '#FFFFFF', //white
  calendarText: '#192b4c',
  background: '#FFFFFF',
  icon: winterIcon,
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

const beachTheme = {
  header: '#238496',
  headerIcons: '#FFFFFF',

  primary: '#77c3c3',
  secondary: '#238496',
  indent: '#106070',
  error: '#b64949',

  text: '#FFFFFF',
  calendarText: '#106070',
  background: '#d6d3c5',
}

//Dark themes
const darkThemeDefunct = {
  header: '#54527a', //dark purple
  headerIcons: '#FFFFFF',

  primary: '#2c2c2c', // dark grey
  secondary: '#54527a', // dark purple
  indent: '#424158', // darker purple
  error: '#b64949', // red

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF', //white
  background: '#353535',
  icon: winterIcon,
}

const darkTheme = {
  header: '#202020',
  headerIcons: '#FFFFFF',

  primary: '#101010',
  secondary: '#202020',
  indent: '#424158',
  error: '#b64949',

  text: '#FFFFFF', //white
  calendarText: '#FFFFFF',
  background: '#101010',
  icon: circleIcon,
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

const deepSeaTheme = {
  header: '#065a68',
  headerIcons: '#FFFFFF',

  primary: '#042637',
  secondary: '#065a68',
  indent: '#064954',
  error: '#b64949',

  text: '#FFFFFF',
  calendarText: '#FFFFFF',
  background: '#040e15',
}

const midnightTheme = {
  header: '#182439',
  headerIcons: '#FFFFFF',

  primary: '#4b5271',
  secondary: '#182439',
  indent: '#3d4059',
  error: '#b64949',

  text: '#FFFFFF',
  calendarText: '#182439',
  background: '#8e9fb3',
}

export { darkTheme, winterTheme }
export default defaultTheme
