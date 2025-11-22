# Trabajo Práctico: Aplicación de Recetas
Notas personales para seguir el TP de Programación IV sin vender humo.

## Idea general
Aplicación web con listado y detalle de recetas. Sirve para practicar rutas, Context API y componentes de Material-UI.

## Stack que estoy usando
- React 19
- React Router DOM 7
- Material-UI 7
- Vite

## Qué tiene que estar
- Rutas: `/` (puede ser home), `/recetas`, `/recetas/:id` y una 404.
- Navbar visible en todas las vistas.
- Listado de recetas con imagen, título, tiempo, dificultad, porciones y botón a detalle.
- Detalle con ingredientes (cantidad, unidad, nombre) y pasos numerados.
- JSON local con al menos 6 recetas completas en `src/data/recetas.json`.

## Estructura base (recordatorio)
```
src/
├── components/
│   ├── layout/Navbar.jsx
│   └── recetas/
│       ├── RecetaCard.jsx
│       ├── RecetasList.jsx
│       ├── RecetaDetalle.jsx
│       └── IngredientesList.jsx
├── contexts/RecetasContext.jsx
├── data/recetas.json
├── pages/
│   ├── RecetasListPage.jsx
│   └── RecetaDetallePage.jsx
├── App.jsx
└── main.jsx
```

## Cosas técnicas que no me quiero olvidar
- Context: cargar recetas desde el JSON y exponer `recetas` y `getRecetaById`.
- Material-UI: usar Container, Grid/Stack, Cards, Typography, Buttons, Chips y List/ListItem.
- Estados de carga y error al leer el JSON.

## Plan corto de trabajo
1. Levantar el JSON y el Context.
2. Armar el listado con cards responsive y filtros básicos.
3. Completar el detalle con ingredientes y pasos.
4. Revisar navegación, 404 y un README decente.

**+15 puntos:**
- Modal para ver recetas
- Sistema de calificación
- Dark mode
- Animaciones avanzadas

---

## 📚 Recursos de Ayuda

### Documentación Oficial
- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Material-UI](https://mui.com/)

### Guías Incluidas en el Proyecto
- `GUIA-MATERIAL-UI.md`: Guía completa de Material-UI
- `GUIA-REACT-ROUTER-DOM.md`: Guía de React Router DOM
- `EJEMPLO-recetas.json`: Ejemplo de JSON (8 recetas de referencia)

### Imágenes Gratuitas
- [Unsplash](https://unsplash.com/s/photos/food)
- [Pexels](https://www.pexels.com/search/food/)

---

## 💡 Consejos Importantes

1. **Lee todo el enunciado** antes de empezar a programar
2. **Empieza por lo básico**: primero funcionalidad, luego diseño
3. **Testea constantemente**: verifica cada componente que crees
4. **Usa las guías**: tienes documentación completa de Material-UI y React Router
5. **Consulta temprano**: no esperes al último día para preguntar dudas
6. **Responsive desde el inicio**: prueba en diferentes tamaños mientras desarrollas

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar CSS personalizado además de Material-UI?**  
R: Sí, pero la mayor parte del diseño debe ser con Material-UI.

**P: ¿Qué hago si una receta no existe?**  
R: Muestra un mensaje amigable y un botón para volver al listado.

**P: ¿Puedo agregar más campos al JSON?**  
R: Sí, pero no elimines los campos requeridos.

**P: ¿Necesito implementar un backend?**  
R: No, solo frontend con datos desde JSON local.

**P: ¿Puedo trabajar en grupo?**  
R: No, el trabajo es **individual**.

---

## 📧 Consultas

**Horario de consultas:** [Completar]  
**Email:** [Completar]  
**Foro:** [Completar si aplica]

**⏰ Las consultas deben realizarse con al menos 48 horas antes de la entrega**

---

## 🎯 Resultado Esperado

Tu aplicación final debería:
- ✅ Verse profesional y moderna
- ✅ Funcionar perfectamente en mobile, tablet y desktop
- ✅ Tener código limpio y bien organizado
- ✅ Cumplir con todos los requisitos técnicos
- ✅ Demostrar comprensión de React, Router y Material-UI

---

## 📖 Documento Completo

Para ver el enunciado completo con todos los detalles, ejemplos de código y especificaciones técnicas, consulta:

📄 **ENUNCIADO-TP-RECETAS.md**

---

**¡Mucho éxito con tu proyecto!** 🚀

Si sigues el cronograma sugerido y consultas dudas a tiempo, vas a lograr un excelente resultado.

---

**Fechas importantes:**
- 📅 Publicación: [Completar]
- 📅 Entrega: [Completar]
- 📅 Peso en la nota: [Completar]
