import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ py: 8, textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Página no encontrada
        </Typography>
        <Typography color="text.secondary">
          El enlace podría ser incorrecto o la receta ya no está disponible.
        </Typography>
        <Button component={RouterLink} to="/recetas" variant="contained" size="large">
          Volver al listado
        </Button>
      </Stack>
    </Container>
  )
}

export default NotFoundPage
