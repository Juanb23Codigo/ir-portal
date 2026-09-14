# Archivos fuente

Acá van las planillas del MECON de las que salen todas las cifras del portal.

**Esta carpeta NO se publica.** Está en el `.gitignore` porque el repositorio es
público y estos archivos son de uso interno.

## Qué poner acá

| Archivo | De dónde sale | Para qué se usa |
|---|---|---|
| `boletin_mensual_AAAA_MM_DD.xlsx` | Boletín Mensual de Deuda, publicado en argentina.gob.ar/economia/finanzas/datos | Deuda bruta, composición por moneda, tasa y legislación (hojas A.1 a A.5) |
| `06. Stock Deuda <Mes> <Año>.xlsx` | Drive de Macrofinanzas del MECON | Deuda/PIB y Deuda con Privados y OI/PIB (hoja `salida`, columnas 9 y 52) |

## Cómo se leen

Con `openpyxl` desde Python. Ojo con dos cosas:

- Las hojas tienen **filas de subtotal y separadores** que se confunden fácil con
  datos (por ejemplo, una fila con el año `2024` y las celdas vacías).
- La última columna suele ser un `en %` que **no es un mes**. La última columna con
  datos reales es la anterior.

Siempre validar que las sumas cierren contra el total de la fuente antes de
publicar cualquier tabla o gráfico.
