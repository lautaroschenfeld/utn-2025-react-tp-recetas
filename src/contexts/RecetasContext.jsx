import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RecetasContext = createContext(null)

export const RecetasProvider = ({ children }) => {
  const [recetas, setRecetas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favoritos, setFavoritos] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('favoritos_recetas')
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error('No se pudieron leer favoritos', err)
      return []
    }
  })
  const [ratings, setRatings] = useState(() => {
    if (typeof window === 'undefined') return {}
    try {
      const stored = localStorage.getItem('ratings_recetas')
      return stored ? JSON.parse(stored) : {}
    } catch (err) {
      console.error('No se pudieron leer calificaciones', err)
      return {}
    }
  })

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const url = new URL('../data/recetas.json', import.meta.url)
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('No se pudieron cargar las recetas')
        }

        const data = await response.json()
        setRecetas(data)
      } catch (err) {
        console.error('Error al cargar recetas:', err)
        setError('No pudimos cargar las recetas. Intenta nuevamente más tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    cargarRecetas()
  }, [])

  const getRecetaById = useCallback(
    (id) => recetas.find((receta) => receta.id === Number(id)),
    [recetas],
  )

  const toggleFavorito = useCallback((id) => {
    setFavoritos((prev) => {
      if (prev.includes(id)) return prev.filter((fav) => fav !== id)
      return [...prev, id]
    })
  }, [])

  const esFavorito = useCallback((id) => favoritos.includes(id), [favoritos])

  const setRating = useCallback((id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }))
  }, [])

  const getRating = useCallback(
    (id) => ratings[id] ?? recetas.find((r) => r.id === id)?.calificacion ?? 0,
    [ratings, recetas],
  )

  useEffect(() => {
    try {
      localStorage.setItem('favoritos_recetas', JSON.stringify(favoritos))
    } catch (err) {
      console.error('No se pudieron guardar favoritos', err)
    }
  }, [favoritos])

  useEffect(() => {
    try {
      localStorage.setItem('ratings_recetas', JSON.stringify(ratings))
    } catch (err) {
      console.error('No se pudieron guardar calificaciones', err)
    }
  }, [ratings])

  const value = useMemo(
    () => ({
      recetas,
      isLoading,
      error,
      getRecetaById,
      favoritos,
      toggleFavorito,
      esFavorito,
      getRating,
      setRating,
    }),
    [recetas, isLoading, error, getRecetaById, favoritos, toggleFavorito, esFavorito, getRating, setRating],
  )

  return <RecetasContext.Provider value={value}>{children}</RecetasContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRecetas = () => {
  const context = useContext(RecetasContext)
  if (!context) {
    throw new Error('useRecetas debe usarse dentro de un RecetasProvider')
  }
  return context
}
