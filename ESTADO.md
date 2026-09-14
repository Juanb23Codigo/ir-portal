# Estado del proyecto

Última actualización: **14 de septiembre de 2026**

---

## Qué hay hecho

### Landing "Finanzas" (`index.html`)
Réplica de la página oficial del MECON: masthead de Argentina.gob.ar, barra del
Ministerio, hero, tres accesos (Deuda Pública, Inclusión Financiera y **Relación
con Inversores**, que es el agregado), Destacados, Noticias reales de julio 2026,
Institucional y footer.

### Portal IR (`inversores.html` + 5 secciones)

| Sección | Estado |
|---|---|
| **Deuda Pública** | Dos gráficos interactivos de Deuda/PIB con datos reales (nov-23 a jun-26). Métricas clave arriba. Links a los datos oficiales. |
| **Calificaciones Crediticias** | Las tres agencias con ratings vigentes (S&P B-, Moody's B3, Fitch B-), logos, y comunicados enlazados a las páginas oficiales. |
| **Licitaciones** | Réplica de la sección oficial, con menú lateral y 4 subpáginas. Los cronogramas 2025/2026 muestran el calendario visual completo del año y descargan el PDF oficial del MECON. |
| **Presentaciones** | Estructura armada, PDFs son placeholders. |
| **Sobre Argentina** | Indicadores económicos y enlaces útiles. |

### Datos cargados

- Boletín Mensual de Deuda al **31/07/2026**
- Serie Deuda/PIB al **30/06/2026** (última disponible en esa fuente)
- Calificaciones al **21/07/2026** (último movimiento: Moody's a B3)

---

## Sin publicar

Hay **6 archivos modificados** esperando push: el fix de grilla de tarjetas
(`card-grid`) en `inversores`, `credit-ratings`, `licitaciones`,
`about-argentina`, `historico-de-resultados` y `css/styles.css`.

Está verificado y funcionando. Solo falta la confirmación de Juan para publicar.

---

## Pendientes

### 1. Alinear la estética al MECON real
Lo único que falta para que se vea igual al sitio oficial:

| | MECON | Prototipo |
|---|---|---|
| Texto base | 18px | 14px |
| Color de texto | `#141414` | `#333333` |
| Color de títulos | `#141414` (negro) | `#232D4F` (navy) |
| H1 / H2 / H3 | 45 / 31,5 / 22,5px | ~31 / 25 / 20px |

Las tipografías (Montserrat + Lora) y la paleta de fondos **ya coinciden**.

Ojo: pasar de 14px a 18px agranda todo y va a requerir reajustar tarjetas, tablas
y probablemente los gráficos. No es cosmético.

### 2. Contacto para inversores
El portal no tiene ningún dato de contacto. Los 7 portales soberanos que se
analizaron al principio lo tienen, y la propuesta original lo marcaba como
requisito de Fase 1. Es la brecha más visible que queda.

### 3. Archivos descargables
Los PDFs de presentaciones y varios Excel son placeholders. Los cronogramas de
licitaciones sí bajan el PDF oficial real.

### 4. Contenido que se sacó y habría que reponer con otra forma
Al limpiar la página de Deuda quedaron afuera la composición de deuda y los flujos
mensuales. Juan quiere repensar qué poner en su lugar, no necesariamente lo mismo.

### 5. Métricas de deuda que quedaron sin usar
Del análisis del boletín salieron dos datos sólidos que hoy no están en el portal:

- **Participación en pesos**: subió de 43,5% (jul-24) a 48,5% (jul-26). Tendencia
  real y sostenida, buen argumento de reducción de exposición cambiaria.
  (Se llegó a construir el gráfico y después se sacó por pedido.)
- **Tasa variable**: bajó de 36,1% a 32,7% en el mismo período.

Un tercero, **deuda de corto plazo**, se descartó: oscila entre 8% y 14% sin
tendencia clara, no aguanta como indicador de mejora.

---

## Contexto de origen

El proyecto salió de una propuesta más grande (`../Proposal - IR Portal
Renovation.docx`) que compara Argentina con siete portales soberanos de la región
(Chile, Brasil, México, Colombia, Uruguay, Perú, Polonia) y plantea un plan en
tres fases a 12 meses. Este prototipo es la maqueta visual de esa idea.

En la carpeta padre (`../`) también están los análisis que la originaron, en
`agentes/`.
