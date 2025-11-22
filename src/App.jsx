import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import GlobalStyles from '@mui/material/GlobalStyles'
import Navbar from './components/layout/Navbar'
import RecetasListPage from './pages/RecetasListPage'
import RecetaDetallePage from './pages/RecetaDetallePage'
import { RecetasProvider } from './contexts/RecetasContext'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const [mode, setMode] = useState('light')

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#0f172a',
            contrastText: '#f6f5f1',
          },
          secondary: {
            main: '#c5a572',
          },
          background: {
            default: mode === 'light' ? '#f6f5f1' : '#0a0a0a',
            paper: mode === 'light' ? '#ffffff' : '#181818',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#e5e7eb',
            secondary: mode === 'light' ? '#44403c' : '#cbd5e1',
          },
        },
        typography: {
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          h3: { fontWeight: 800, letterSpacing: '-0.01em' },
          h4: { fontWeight: 800 },
          h5: { fontWeight: 700 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          html: {
            backgroundColor: theme.palette.background.default,
          },
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        })}
      />
      <RecetasProvider>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Box component="main" sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recetas" element={<RecetasListPage />} />
              <Route path="/recetas/:id" element={<RecetaDetallePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Router>
      </RecetasProvider>
    </ThemeProvider>
  )
}

export default App
