import React from 'react'
import { ThemeProvider, } from 'styled-components'

import App from './App'

import 'html5-boilerplate/dist/css/normalize.css'
import 'html5-boilerplate/dist/css/main.css'
import 'highlight.js/styles/vs2015.css'
import '../global.scss'

const theme = {
  darkPurple: '#2b1740',
  lightPurple: '#9373bf',
  mediumPurple: '#6649a6',
  lightGrey: '#f3edea',
  darkGrey: '#403332',
}

export default (props) => {
  return <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
}
