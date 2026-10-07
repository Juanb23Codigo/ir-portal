# Registro de bloques ocultos

> ⚠️ **El ocultamiento es VISUAL, no seguridad.** Los bloques marcados con
> `class="oculto"` siguen estando en el HTML, y **el repositorio es público**.
> Esto sirve solo para "todavía no está listo para mostrar". **Nada confidencial
> va acá: eso se borra, no se oculta.**

## Cómo revisar lo oculto

Abrir cualquier página con `?ver=todo` al final de la URL. Ejemplos:

```
https://juanb23codigo.github.io/ir-portal/inversores.html?ver=todo
https://juanb23codigo.github.io/ir-portal/debt-statistics.html?ver=todo
```

En esa vista aparecen todos los bloques ocultos, marcados con **borde naranja
punteado**, y una **banda naranja al pie** con un link para volver a la versión
pública. La implementación está en `css/styles.css` (`.oculto` / `.ver-todo`) y en
`js/main.js` (bloque "Vista de previsualización").

---

## Entradas

### 1. Sección Presentaciones

- **Qué:** la sección "Presentaciones" para inversores (`investor-presentation.html`)
  y **las 23 referencias que la enlazan** en 11 archivos (ítem del navbar y del
  footer en cada página; en `inversores.html` además el botón del hero y la
  tarjeta de la grilla "Secciones").
- **Dónde:** navbar + footer de las 11 páginas; `inversores.html` (hero + tarjeta).
  La página `investor-presentation.html` **no se borró**: sigue accesible por URL
  directa, solo se ocultaron los accesos.
- **Desde cuándo:** 7/10/2026.
- **Por qué:** los PDFs de la sección son placeholders; todavía no hay una
  presentación real para inversores. Pedido de Juani.
- **Para reactivar:** cuando exista la PPT real. Quitar los `<span class="oculto">`
  que envuelven las 23 referencias. **Además**, en `inversores.html` la grilla
  "Secciones" quedó en 2×2 con 4 tarjetas en `col-md-6`; al reponer la quinta
  tarjeta (Presentaciones) hay que volver las cinco a `col-md-4` para que la grilla
  cierre en filas de 3.

### 2. Métricas Clave (Deuda Pública)

- **Qué:** el bloque "Métricas Clave / Key Metrics" con las dos tarjetas
  (Deuda Bruta/PIB 71,4% y Deuda con Privados y OI/PIB 40,9%) y su línea de fuente.
- **Dónde:** `debt-statistics.html`. El gráfico interactivo de Deuda/PIB que está
  debajo **queda visible**: solo se ocultaron las dos tarjetas de métricas.
- **Desde cuándo:** 7/10/2026.
- **Por qué:** pedido de Juani, hasta que valide las cifras.
- **Para reactivar:** cuando Juani valide los números. Quitar el
  `<span class="oculto">` que envuelve el bloque.

### 3. Novedades inventadas (home de Inversores) — RESUELTO (7/10/2026)

Las cuatro noticias inventadas del prototipo (incluida la falsa acción de
calificación de S&P) **se borraron** y se reemplazaron por las **últimas 4 noticias
reales** de la Secretaría de Finanzas, tomadas de
`https://www.argentina.gob.ar/economia/finanzas`, cada una enlazada a su comunicado
oficial en `/noticias`. Ya no hay nada oculto acá.

- **Mantenimiento:** son una **foto estática** (últimas al 28/09/2026). No se
  actualizan solas — GitHub Pages no puede leer el sitio del MECON por CORS. Para
  refrescarlas hay que reemplazar las 4 a mano en `inversores.html` por las más
  recientes del link de arriba, con su fecha y su URL. Es la misma lógica de "foto
  con fecha" que el resto del portal.
