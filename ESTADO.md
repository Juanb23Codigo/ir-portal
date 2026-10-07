# Estado del proyecto

Última actualización: **7 de octubre de 2026**

Este archivo lista los pendientes **conceptuales**. El estado del árbol de git
(qué está commiteado, qué falta pushear) lo dice `git status`, no este archivo.

---

## Qué hay hecho

### Landing "Finanzas" (`index.html`)
Réplica de la página oficial del MECON: masthead de Argentina.gob.ar, barra del
Ministerio, hero, tres accesos (Deuda Pública, Inclusión Financiera y **Relación
con Inversores**, que es el agregado), Destacados, Noticias reales de julio 2026,
Institucional y footer.

### Portal IR (`inversores.html` + 6 secciones)

| Sección | Estado |
|---|---|
| **Programa Financiero** | Sección nueva. Lineamientos, tablas de necesidades y fuentes 2026 y 2027 (cifras del PDF oficial del MECON del 6/7/2026, sumas validadas) y enlaces al PDF y al comunicado oficiales. |
| **Deuda Pública** | Dos gráficos interactivos de Deuda/PIB con datos reales (nov-23 a jun-26). Métricas clave arriba. Links a los datos oficiales. |
| **Calificaciones Crediticias** | Las tres agencias con ratings vigentes (S&P B-, Moody's B3, Fitch B-), logos, la calificación en sí linkea al comunicado oficial de cada agencia, y se mantiene el listado de comunicados de prensa recientes. |
| **Licitaciones** | Réplica de la sección oficial, con menú lateral y 4 subpáginas. Los cronogramas 2025/2026 muestran el calendario visual completo del año y descargan el PDF oficial del MECON. |
| **Presentaciones** | Estructura armada, PDFs son placeholders. Pendiente de decisión: ocultarla hasta tener una PPT real (ver Pendientes 7). |
| ~~**Sobre Argentina**~~ | **Eliminada el 7/10/2026** (decisión de Juan: "no tiene sentido"). En su lugar, bloque **Links útiles** al pie de `inversores.html` con cinco destinos oficiales (MECON, BCRA, INDEC, BYMA, FMI). Lo que se perdió está anotado en Pendientes 8. |

El fix de grilla de tarjetas (`card-grid`) está aplicado y publicado en las cuatro
páginas con grilla: `inversores`, `credit-ratings`, `licitaciones` e `historico-de-resultados`. Corregía el layout roto entre
1000px y 1170px de ancho.

Las planillas del MECON están fuera del repo público (`.gitignore`: `datos/*` con
excepción de `LEEME.md`, más `*.xlsx` / `*.xls` / `*.xlsm`). Verificado que
ninguna entró nunca al historial.

### Datos cargados

- Boletín Mensual de Deuda al **31/07/2026**
- Serie Deuda/PIB al **30/06/2026** (última disponible en esa fuente)
- Calificaciones al **21/07/2026** (último movimiento: Moody's a B3)

---

## Pendientes

### 1. Contacto para inversores
El portal no tiene ningún dato de contacto. Los 7 portales soberanos que se
analizaron al principio lo tienen, y la propuesta original lo marcaba como
requisito de Fase 1. Es la brecha más visible que queda, y la única que un
revisor externo va a notar en los primeros treinta segundos.

### 2. Alinear la estética al MECON real

| | MECON | Prototipo |
|---|---|---|
| Texto base | 18px | 14px |
| Color de texto | `#141414` | `#333333` |
| Color de títulos | `#141414` (negro) | `#232D4F` (navy) |
| H1 / H2 / H3 | 45 / 31,5 / 22,5px | ~31 / 25 / 20px |

Las tipografías (Montserrat + Lora) y la paleta de fondos **ya coinciden**.

Ojo: pasar de 14px a 18px agranda todo y va a requerir reajustar tarjetas, tablas
y probablemente los gráficos. No es cosmético, y obliga a re-verificar el layout
a los tres anchos. Rinde recién cuando esto pase de maqueta a construcción real.

### 3. Reservas internacionales sin fuente oficial
El tile de reservas se sacó de Sobre Argentina porque no se consiguió el dato de
fuente oficial directa: el PDF del informe monetario diario del BCRA devuelve 403.
Prensa hay de sobra, pero no alcanza para este proyecto. Falta conseguir el dato
de cierre de mes desde el BCRA.

### 4. Archivos descargables
Los PDFs de presentaciones y varios Excel son placeholders. Los cronogramas de
licitaciones sí bajan el PDF oficial real. La sección Presentaciones se ocultó el
7/10/2026 justamente por esto (ver `OCULTO.md`): sigue abierta como pendiente,
porque falta la PPT real.

### 5. Contenido que se sacó y habría que reponer con otra forma
Al limpiar la página de Deuda quedaron afuera la composición de deuda y los flujos
mensuales. Juan quiere repensar qué poner en su lugar, no necesariamente lo mismo.

### 6. Métrica de deuda que quedó sin usar
Del análisis del boletín quedó un dato sólido que hoy no está en el portal:

- **Tasa variable**: bajó de 36,1% (jul-24) a 32,7% (jul-26).

Otras dos se descartaron y **no hay que reponerlas**:

- **Participación en pesos** — decisión editorial de Juan (14/09/2026). Se llegó a
  construir el gráfico y se sacó; no volver a proponerla. Coincide con lo que ya
  dice CLAUDE.md en "decisiones tomadas".
- **Deuda de corto plazo** — oscila entre 8% y 14% sin tendencia clara, no aguanta
  como indicador de mejora.

### 7. Presentaciones: ocultar hasta tener PPT — HECHO (7/10/2026)
Se ocultó la sección Presentaciones con el mecanismo `.oculto` (navbar y footer de
las 11 páginas, botón del hero y tarjeta de "Secciones" en `inversores.html`). La
página `investor-presentation.html` **no se borró**: sigue accesible por URL
directa. Registrado en `OCULTO.md`, con las condiciones para reactivarla (entre
ellas volver la grilla de Secciones de `col-md-6` a `col-md-4`). Queda pendiente la
PPT real (ver pendiente 4).

### 8. Indicadores que se perdieron al eliminar Sobre Argentina
La página traía seis indicadores con fuente oficial verificada, cada uno con su
período de referencia y link al informe de prensa: EMAE, inflación mensual,
inflación interanual, resultado primario, resultado financiero y superávit
comercial. Conseguir esas fuentes llevó trabajo. Si en algún momento se quiere un
bloque macro en el portal, el punto de partida está en el historial de git
(`about-argentina.html`, última versión antes del 7/10/2026), no hay que
reconstruirlo de cero.

### 9. Lo que falta contra el listado del FMI
Contra el inventario de contenidos que el FMI recomienda para el sitio de un emisor
soberano (IMF WP/20/204), el portal cumple bien la mitad que responde *qué emitimos
y cuánto debemos*, y casi nada de la mitad que responde *cómo nos contactás y cómo
se opera*. En orden de importancia, lo que falta:

1. **Contacto IR**: formulario y personas de contacto. Es la brecha más grave —
   hoy no hay ningún dato de contacto. (Coincide con lo que ya decía la propuesta
   de Fase 1.)
2. **Perfil de amortizaciones e indicadores de costo y riesgo** (vida promedio,
   costo promedio): no está.
3. **Series históricas descargables (CSV)**: se enlaza al origen, no hay descarga
   propia.
4. Marco legal, prospectos, mecánica de mercado primario/secundario, custodia,
   liquidación y tributación: no está.
5. Estrategia y reporte anual de gestión de deuda; lista de suscripción; materiales
   de conferencias: no está.

El detalle completo (cumplido vs no cumplido) está en el anexo del plan
`datos/PLAN-2026-10-07.md`.

---

## Contexto de origen

El proyecto salió de una propuesta más grande (`../Proposal - IR Portal
Renovation.docx`) que compara Argentina con siete portales soberanos de la región
(Chile, Brasil, México, Colombia, Uruguay, Perú, Polonia) y plantea un plan en
tres fases a 12 meses. Este prototipo es la maqueta visual de esa idea.

En la carpeta padre (`../`) también están los análisis que la originaron, en
`agentes/`.
