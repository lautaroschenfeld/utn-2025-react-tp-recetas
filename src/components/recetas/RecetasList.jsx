import { useMemo, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RecetaCard from './RecetaCard'
import RecetaModal from './RecetaModal'
import { useRecetas } from '../../contexts/RecetasContext'
import { useNavigate } from 'react-router-dom'

const RecetasList = () => {
  const { recetas, isLoading, error, favoritos } = useRecetas()
  const scrollersRef = useRef({})
  const [search, setSearch] = useState('')
  const [dificultad, setDificultad] = useState('todas')
  const [soloFavoritos, setSoloFavoritos] = useState(false)
  const [modalReceta, setModalReceta] = useState(null)
  const navigate = useNavigate()

  const categorias = useMemo(() => {
    const grupos = {}
    const texto = search.trim().toLowerCase()
    recetas.forEach((receta) => {
      const categoria = receta.categoria || 'Otras'
      if (categoria.toLowerCase() === 'bebidas') return

      const coincideBusqueda =
        texto.length === 0 ||
        receta.titulo.toLowerCase().includes(texto) ||
        receta.descripcion.toLowerCase().includes(texto)
      const coincideDificultad = dificultad === 'todas' || receta.dificultad === dificultad
      const coincideFavorito = !soloFavoritos || favoritos.includes(receta.id)
      if (!(coincideBusqueda && coincideDificultad && coincideFavorito)) return

      if (!grupos[categoria]) grupos[categoria] = []
      grupos[categoria].push(receta)
    })
    const orden = ['Desayunos', 'Platos Principales', 'Postres']
    return Object.entries(grupos)
      .map(([nombre, recetasCat]) => ({ nombre, recetas: recetasCat }))
      .sort((a, b) => orden.indexOf(a.nombre) - orden.indexOf(b.nombre))
  }, [recetas, search, dificultad, soloFavoritos, favoritos])

  const handleScroll = (categoria, direction) => {
    const node = scrollersRef.current[categoria]
    if (!node) return
    const scrollAmount = node.clientWidth * 0.8
    node.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      event.currentTarget.scrollLeft += event.deltaY
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          Recetas listas para probar hoy
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
          Listado pensado para el TP: recetas simples con ingredientes claros, pasos numerados y datos básicos para
          practicar filtros, favoritos y navegación.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <TextField
            label="Buscar receta"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputLabelProps={{
              sx: {
                color: (theme) => (theme.palette.mode === 'dark' ? '#e5e5e5' : undefined),
                '&.Mui-focused': {
                  color: (theme) => (theme.palette.mode === 'dark' ? '#f0f0f0' : undefined),
                },
              },
            }}
            InputProps={{
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 999,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#555' : undefined),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#777' : undefined),
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#9a9a9a' : undefined),
                },
                '& .MuiInputBase-input': {
                  color: (theme) => (theme.palette.mode === 'dark' ? '#e5e5e5' : undefined),
                  caretColor: (theme) => (theme.palette.mode === 'dark' ? '#f0f0f0' : undefined),
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel
              id="dificultad-label"
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#e5e5e5' : undefined),
                '&.Mui-focused': { color: (theme) => (theme.palette.mode === 'dark' ? '#f0f0f0' : undefined) },
              }}
            >
              Dificultad
            </InputLabel>
            <Select
              labelId="dificultad-label"
              value={dificultad}
              label="Dificultad"
              onChange={(e) => setDificultad(e.target.value)}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#555' : undefined),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#777' : undefined),
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#9a9a9a' : undefined),
                },
                '& .MuiSelect-select': {
                  color: (theme) => (theme.palette.mode === 'dark' ? '#e5e5e5' : undefined),
                  caretColor: (theme) => (theme.palette.mode === 'dark' ? '#f0f0f0' : undefined),
                },
              }}
            >
              <MenuItem value="todas">Todas</MenuItem>
              <MenuItem value="Fácil">Fácil</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Difícil">Difícil</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={soloFavoritos}
                onChange={(e) => setSoloFavoritos(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#9a9a9a' : undefined),
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#6b6b6b' : undefined),
                    opacity: 1,
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#444' : undefined),
                  },
                }}
              />
            }
            label="Solo favoritos"
          />
        </Stack>
      </Stack>

      {isLoading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!isLoading && !error && recetas.length === 0 && (
        <Alert severity="info">No hay recetas disponibles por ahora.</Alert>
      )}

      <Stack spacing={4} sx={{ mt: 2 }}>
        {categorias.map(({ nombre, recetas: recetasCat }) => (
          <Box key={nombre} component="section">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {nombre}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="Anterior" onClick={() => handleScroll(nombre, -1)} sx={{ boxShadow: 1 }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton aria-label="Siguiente" onClick={() => handleScroll(nombre, 1)} sx={{ boxShadow: 1 }}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Stack>

            <Grid
              container
              spacing={2}
              wrap="nowrap"
              ref={(el) => {
                scrollersRef.current[nombre] = el
              }}
              onWheel={handleWheel}
              sx={{
                flexWrap: 'nowrap',
                overflowX: 'auto',
                pb: 1,
                scrollSnapType: 'x mandatory',
                px: 0.5,
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {recetasCat.map((receta) => (
                <Grid
                  key={receta.id}
                  item
                  xs="auto"
                  sx={{
                    scrollSnapAlign: 'start',
                    minWidth: { xs: 260, sm: 300 },
                    maxWidth: 340,
                    display: 'flex',
                  }}
                >
                  <RecetaCard receta={receta} onOpenModal={(r) => setModalReceta(r)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>

      <RecetaModal
        open={Boolean(modalReceta)}
        receta={modalReceta}
        onClose={() => setModalReceta(null)}
        onVerPagina={() => {
          if (modalReceta) navigate(`/recetas/${modalReceta.id}`)
          setModalReceta(null)
        }}
      />
    </Container>
  )
}

export default RecetasList
