import Box from '@mui/material/Box'
import RecetasList from '../components/recetas/RecetasList'

const RecetasListPage = () => {
  return (
    <Box component="section" sx={{ backgroundColor: 'background.default' }}>
      <RecetasList />
    </Box>
  )
}

export default RecetasListPage
