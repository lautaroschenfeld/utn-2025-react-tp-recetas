import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const IngredientesList = ({ ingredientes }) => {
  return (
    <List sx={{ width: '100%' }}>
      {ingredientes.map((item, index) => (
        <ListItem
          key={`${item.nombre}-${index}`}
          disableGutters
          sx={{
            px: 0,
            py: 1,
            borderBottom: index !== ingredientes.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
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
            <ListItemText
              primary={item.nombre}
              primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  )
}

export default IngredientesList
