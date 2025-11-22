import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Rating from '@mui/material/Rating'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { useRecetas } from '../../contexts/RecetasContext'

const dificultadColor = {
  Fácil: 'success',
  Media: 'warning',
  Difícil: 'error',
}

const RecetaModal = ({ open, onClose, receta, onVerPagina }) => {
  const { getRating, setRating } = useRecetas()

  if (!receta) return null

  const currentRating = getRating(receta.id)

  const handleShare = async () => {
    const link = `${window.location.origin}/recetas/${receta.id}`
    try {
      await navigator.clipboard.writeText(link)
    } catch (err) {
      console.error('No se pudo copiar el enlace', err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogContent sx={{ p: 0, backgroundColor: 'background.paper' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={receta.imagen}
            alt={receta.titulo}
            loading="lazy"
            sx={{ width: '100%', height: { xs: 240, md: 320 }, objectFit: 'cover' }}
          />
          <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 12, right: 12 }}>
            <Tooltip title="Compartir">
              <IconButton
                size="small"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2a2a2a' : 'rgba(255,255,255,0.9)',
                  color: (theme) => theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#3a3a3a' : 'rgba(255,255,255,0.8)',
                    color: (theme) => theme.palette.text.primary,
                  },
                }}
                onClick={handleShare}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#2a2a2a' : 'rgba(255,255,255,0.9)',
                color: (theme) => theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#3a3a3a' : 'rgba(255,255,255,0.8)',
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {receta.titulo}
              </Typography>
              <Chip
                label={receta.categoria}
                icon={<RestaurantIcon />}
                variant="outlined"
                sx={{ color: 'text.primary', borderColor: 'text.secondary' }}
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

          <Divider sx={{ my: 2.5 }} />

          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Ingredientes
          </Typography>
          <List sx={{ width: '100%', p: 0, mb: 2 }}>
            {receta.ingredientes.map((item, index) => (
              <ListItem
                key={`${receta.id}-modal-ingrediente-${index}`}
                disableGutters
                sx={{
                  px: 0,
                  py: 0.8,
                  borderBottom: index !== receta.ingredientes.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                  <Chip
                    label={`${item.cantidad} ${item.unidad}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      minWidth: 110,
                      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#3a3a3a' : undefined),
                      color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.text.secondary : undefined),
                    }}
                  />
                  <ListItemText primary={item.nombre} primaryTypographyProps={{ variant: 'body2' }} />
                </Stack>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Preparación
          </Typography>
          <List sx={{ width: '100%', p: 0, mb: 2 }}>
            {receta.pasos.map((paso, index) => (
              <ListItem
                key={`${receta.id}-modal-paso-${index}`}
                alignItems="flex-start"
                sx={{
                  px: 0,
                  py: 0.8,
                  borderBottom: index !== receta.pasos.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Chip
                    label={index + 1}
                    size="small"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#2a2a2a' : '#eef1f5',
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                  <ListItemText primary={paso} primaryTypographyProps={{ variant: 'body2', lineHeight: 1.6 }} />
                </Stack>
              </ListItem>
            ))}
          </List>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
              onClick={onClose}
              color="primary"
              variant="outlined"
              sx={{
                color: (theme) => theme.palette.text.primary,
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#565656' : '#b0b0b0'),
                '&:hover': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#777' : '#8a8a8a'),
                },
              }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onVerPagina}
              sx={{ color: (theme) => theme.palette.getContrastText(theme.palette.primary.main) }}
            >
              Ver página completa
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default RecetaModal
