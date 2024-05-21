import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      contrastText: '#000',
      dark: '#fff',
      light: '#fff',
      main: '#fff',
    },
    secondary: {
      contrastText: '#fff',
      dark: '#000',
      light: '#000',
      main: '#000',
    },
  },
})
