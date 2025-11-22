import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { Link as RouterLink, useParams } from 'react-router-dom'
import RecetaDetalle from '../components/recetas/RecetaDetalle'
import { useRecetas } from '../contexts/RecetasContext'

const RecetaDetallePage = () => {
  const { id } = useParams()
  const { getRecetaById, isLoading, error } = useRecetas()

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Box display="flex" justifyContent="center" width="100%">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{ py: 6, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box width="100%">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button component={RouterLink} to="/recetas" variant="contained">
            Volver al listado
          </Button>
        </Box>
      </Container>
    )
  }

  const receta = getRecetaById(id)

  if (!receta) {
    return (
      <Container
        maxWidth="sm"
        sx={{ py: 6, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box width="100%">
          <Alert severity="warning" sx={{ mb: 2 }}>
            No encontramos la receta que estás buscando.
          </Alert>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            El enlace puede ser incorrecto o la receta fue movida.
          </Typography>
          <Button component={RouterLink} to="/recetas" variant="contained">
            Volver al listado
          </Button>
        </Box>
      </Container>
    )
  }

  return <RecetaDetalle receta={receta} />
}

export default RecetaDetallePage
