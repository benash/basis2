import React from 'react'
import { ThemeProvider } from 'styled-components'

import App from './App'

import 'normalize.css'
import 'highlight.js/styles/vs2015.css'
import '../global.scss'

const theme = {
  darkGrey: '#403332',
  darkPurple: '#2b1740',
  lightGrey: '#f3edea',
  lightPurple: '#9373bf',
  mediumPurple: '#6649a6',
}

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
