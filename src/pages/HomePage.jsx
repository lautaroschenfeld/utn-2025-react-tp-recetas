import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={2.5} alignItems="center" textAlign="center">
          <Typography
            variant="h3"
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main),
              fontWeight: 800,
            }}
          >
            Colección de Sabores
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 680 }} color="text.secondary">
            Trabajo práctico de Programación IV con un listado de recetas que se pueden buscar, filtrar y abrir sin
            perder el contexto. Todo el contenido está pensado para probar la UI y la navegación más que para venderte
            nada.
          </Typography>
          <Button
            component={RouterLink}
            to="/recetas"
            variant="contained"
            size="large"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Ver recetas
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default HomePage
