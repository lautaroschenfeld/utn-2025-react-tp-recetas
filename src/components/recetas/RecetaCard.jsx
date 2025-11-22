import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Rating from '@mui/material/Rating'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'
import { useRecetas } from '../../contexts/RecetasContext'

const dificultadColor = {
  Fácil: 'success',
  Media: 'warning',
  Difícil: 'error',
}

const RecetaCard = ({ receta, onOpenModal }) => {
  const { toggleFavorito, esFavorito, getRating } = useRecetas()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const ratingValue = getRating(receta.id)

  const handleFavorito = (event) => {
    event.stopPropagation()
    toggleFavorito(receta.id)
  }

  const handleShare = async (event) => {
    event.stopPropagation()
    const link = `${window.location.origin}/recetas/${receta.id}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch (err) {
      console.error('No se pudo copiar el enlace', err)
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 3,
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: 'none',
        transition: 'box-shadow 0.25s ease, background 0.25s ease',
        background: (theme) => theme.palette.background.paper,
        '&:hover': {
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
          borderColor: 'rgba(15, 23, 42, 0.2)',
          background: (theme) => theme.palette.background.paper,
        },
        '&:hover .receta-media': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={receta.imagen}
          alt={receta.titulo}
          className="receta-media"
          loading="lazy"
          sx={{ objectFit: 'cover', transition: 'transform 0.35s ease' }}
        />
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Tooltip title={esFavorito(receta.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            <IconButton
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#0f172a',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.8)', color: '#0f172a' },
              }}
              onClick={handleFavorito}
            >
              {esFavorito(receta.id) ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Copiar enlace">
            <IconButton
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#0f172a',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.8)', color: '#0f172a' },
              }}
              onClick={handleShare}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Receta
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }} gutterBottom>
          {receta.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, flexGrow: 1, lineHeight: 1.6 }}>
          {receta.descripcion}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating
            value={ratingValue}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              color: '#f5c542',
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {ratingValue.toFixed(1)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Chip
            label={receta.dificultad}
            size="small"
            color={dificultadColor[receta.dificultad] || 'default'}
            variant="contained"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={receta.tiempoPreparacion}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<PeopleIcon />}
            label={`${receta.porciones} porciones`}
            size="small"
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="large"
          fullWidth
          variant="contained"
          onClick={() => (onOpenModal ? onOpenModal(receta) : navigate(`/recetas/${receta.id}`))}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            backgroundColor: '#0f172a',
            color: '#f6f5f1',
            transition: 'all 0.2s ease',
            border: '1px solid #0f172a',
            '&:hover': {
              backgroundColor: '#f6f5f1',
              color: '#0f172a',
              borderColor: '#0f172a',
            },
          }}
        >
          Ver receta
        </Button>
      </CardActions>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Enlace copiado"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Card>
  )
}

export default RecetaCard
