import { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import Rating from '@mui/material/Rating'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ShareIcon from '@mui/icons-material/Share'
import { Link as RouterLink } from 'react-router-dom'
import IngredientesList from './IngredientesList'
import { useRecetas } from '../../contexts/RecetasContext'

const dificultadColor = {
  Fácil: 'success',
  Media: 'warning',
  Difícil: 'error',
}

const RecetaDetalle = ({ receta }) => {
  const { getRating, setRating } = useRecetas()
  const [copied, setCopied] = useState(false)
  const currentRating = getRating(receta.id)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch (err) {
      console.error('No se pudo copiar el enlace', err)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          component={RouterLink}
          to="/recetas"
          variant="text"
          sx={{ fontWeight: 700, color: 'text.primary' }}
        >
          Volver al listado
        </Button>
        <Tooltip title="Copiar enlace">
          <IconButton
            onClick={handleCopyLink}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#2a2a2a' : 'rgba(255,255,255,0.9)',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#3a3a3a' : 'rgba(255,255,255,0.8)',
                color: 'text.primary',
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: 'background.paper',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
        }}
      >
        <Box
          component="img"
          src={receta.imagen}
          alt={receta.titulo}
          loading="lazy"
          sx={{ width: '100%', height: { xs: 240, md: 380 }, objectFit: 'cover' }}
        />
        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {receta.titulo}
              </Typography>
              <Chip
                label={receta.categoria}
                variant="outlined"
                icon={<RestaurantIcon />}
                sx={{ fontWeight: 700 }}
              />
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {receta.descripcion}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
              <Chip
                label={receta.dificultad}
                color={dificultadColor[receta.dificultad] || 'default'}
                variant="contained"
              />
              <Chip icon={<AccessTimeIcon />} label={receta.tiempoPreparacion} />
              <Chip icon={<PeopleIcon />} label={`${receta.porciones} porciones`} variant="outlined" />
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Rating
                value={currentRating}
                precision={0.5}
                sx={{ color: '#f5c542' }}
                onChange={(e, value) => {
                  if (value) setRating(receta.id, value)
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {currentRating.toFixed(1)}
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Ingredientes
              </Typography>
              <IngredientesList ingredientes={receta.ingredientes} />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Preparación paso a paso
              </Typography>
              <List sx={{ width: '100%', p: 0 }}>
                {receta.pasos.map((paso, index) => (
                  <ListItem
                    key={`${receta.id}-paso-${index}`}
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 1.2,
                      borderBottom: index !== receta.pasos.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Chip
                        label={index + 1}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#2a2a2a' : '#eef1f5',
                          color: (theme) => theme.palette.text.primary,
                        }}
                      />
                      <ListItemText
                        primary={paso}
                        primaryTypographyProps={{ variant: 'body1', lineHeight: 1.6 }}
                      />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message="Enlace copiado"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  )
}

export default RecetaDetalle
