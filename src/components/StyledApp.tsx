import React from 'react'
import { ThemeProvider } from 'styled-components'

import 'normalize.css'
import 'highlight.js/styles/vs2015.css'
import '../global.scss'

import { App } from './App'

const theme = {
  darkGrey: '#403332',
  darkPurple: '#2b1740',
  lightGrey: '#f3edea',
  lightPurple: '#9373bf',
  mediumPurple: '#6649a6',
}

export const StyledApp = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
