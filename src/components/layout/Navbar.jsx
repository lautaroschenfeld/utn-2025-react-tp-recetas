import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Recetas', to: '/recetas' },
]

const Navbar = ({ mode = 'light', toggleMode }) => {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', py: 1 }}>
        <Box display="flex" alignItems="center" flexGrow={1} gap={1.5}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'inline-flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
                p: 0.8,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MenuBookRoundedIcon />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, ml: 1 }}>
              Colección de Sabores
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {links.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              component={RouterLink}
              to={link.to}
              variant={pathname === link.to ? 'contained' : 'text'}
              sx={{
                backgroundColor:
                  pathname === link.to ? 'rgba(255,255,255,0.18)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                fontWeight: 600,
              }}
            >
              {link.label}
            </Button>
          ))}
          <IconButton color="inherit" onClick={toggleMode} aria-label="Cambiar tema">
            {mode === 'light' ? <NightlightRoundIcon /> : <WbSunnyOutlinedIcon />}
          </IconButton>
        </Stack>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          onClick={handleOpenMenu}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {links.map((link) => (
            <MenuItem
              key={link.to}
              component={RouterLink}
              to={link.to}
              onClick={handleCloseMenu}
              selected={pathname === link.to}
            >
              {link.label}
            </MenuItem>
          ))}
          <MenuItem onClick={() => { handleCloseMenu(); toggleMode?.() }}>
            {mode === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
