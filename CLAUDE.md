# Portal de Relación con Inversores — Secretaría de Finanzas

Prototipo navegable de un portal de Investor Relations (IR) para la Secretaría de
Finanzas del Ministerio de Economía de Argentina. Sirve para mostrar internamente
cómo se vería la sección antes de construirla en serio.

**Publicado en:** https://juanb23codigo.github.io/ir-portal/index.html
**Repo:** https://github.com/Juanb23Codigo/ir-portal (rama `main`, GitHub Pages)

---

## ⚠️ Leer primero: los archivos de datos no están en el repo

Las fuentes de las que salen todas las cifras del portal **no viven acá**. Están en
la máquina de Juan (carpeta de Descargas y el Drive de Macrofinanzas del MECON):

- `boletin_mensual_AAAA_MM_DD.xlsx` — Boletín Mensual de Deuda
- `06. Stock Deuda <Mes> <Año>.xlsx` — serie Deuda/PIB

**Si la tarea toca cifras, pedírselos a Juan antes de arrancar.** Sin esos archivos
no se puede verificar ni actualizar ningún número, y la regla del proyecto es que
no se inventa ni se estima nada (ver "Datos" más abajo).

Es un pedido explícito de Juan: que se le recuerde mandarlos en vez de avanzar a
ciegas o asumir valores.

---

## Cómo está armado

Sitio estático: HTML + CSS + un poco de JS. Sin build, sin framework, sin
dependencias que instalar. Se edita el HTML directo y se publica con `git push`.

- **Bootstrap 3.4.1** y **Font Awesome 4.7** por CDN
- **jQuery 1.12.4** (lo usa `js/main.js`)
- `css/styles.css` — todos los estilos propios
- `js/main.js` — toggle de idioma, gate de acceso, pantalla de carga

### Estructura de navegación

Hay **dos niveles**, y es importante no confundirlos:

```
index.html          ← Landing "Finanzas": réplica de la página real del MECON.
                      Es la primera pantalla que se abre.
  └── inversores.html  ← Home del portal IR. Se entra desde la tarjeta
                         "Relación con Inversores" de la landing.
        ├── debt-statistics.html       Deuda Pública
        ├── programa-financiero.html   Programa Financiero
        ├── credit-ratings.html        Calificaciones Crediticias
        ├── licitaciones.html          Licitaciones (sección con 4 subpáginas)
        │     ├── cronograma-2026.html
        │     ├── cronograma-2025.html
        │     ├── historico-de-resultados.html
        │     └── colocaciones-de-deuda.html
        ├── investor-presentation.html Presentaciones
        └── about-argentina.html       Sobre Argentina
```

**Regla de links en la landing:** `index.html` imita la página pública del MECON,
así que sus accesos van al sitio oficial real (argentina.gob.ar). Las dos
excepciones que apuntan adentro del prototipo son **Relación con Inversores** y
**Licitaciones**.

**Navegación de vuelta:** todas las páginas del portal tienen un breadcrumb que
arranca con "Finanzas" → `index.html`.

---

## Cómo trabajar

### Ver el sitio localmente

```bash
python -m http.server 8791
```

Y abrir `http://localhost:8791/index.html`.

### Publicar

```bash
git add -A && git commit -m "..." && git push origin main
```

GitHub Pages tarda **1-2 minutos** en reconstruir. Hay que entrar con **Ctrl+F5**
porque el navegador cachea `styles.css` con ganas.

### Gate de acceso

El sitio pide una contraseña al entrar (`js/main.js`, constante `PW_HASH`, SHA-256).
Es para que el work-in-progress no quede completamente abierto, pero **no protege
nada en serio**: el hash está en el JS del cliente y el repo es público. No poner
ahí nada que no pueda verse.

---

## Datos: la regla más importante

**Nunca inventar cifras.** Todo número que se muestre tiene que venir de una fuente
oficial verificable. El prototipo arrancó con datos inventados y hubo que
reemplazarlos uno por uno; no repetir eso.

Si falta el dato, hay dos salidas válidas: pedirle el archivo a Juan, o dejar el
lugar vacío. Inventar un número plausible no es una opción.

### Fuentes en uso

| Dato | Fuente |
|---|---|
| Deuda bruta, composición por moneda / tasa / legislación | Boletín Mensual de Deuda (`boletin_mensual_AAAA_MM_DD.xlsx`, hojas A.1 a A.5) |
| Deuda / PIB y Deuda con Privados y OI / PIB | `06. Stock Deuda <Mes> <Año>.xlsx`, hoja `salida`, columnas 9 y 52 |
| Calificaciones crediticias | Comunicados oficiales de S&P, Moody's y Fitch |
| Cronogramas y PDFs de licitaciones | argentina.gob.ar (se enlaza el archivo oficial, no se copia) |
| Programa Financiero 2026 y 2027 | Presentación oficial del MECON del 6/7/2026, publicada en argentina.gob.ar (se enlaza el PDF oficial, no se copia) |
| Indicadores de Sobre Argentina | INDEC (IPC, EMAE, ICA) y MECON (resultado fiscal), cada tile enlazado a su informe de prensa |

**Los excels los provee Juan y no están en el repo** (ver el aviso del principio).
Si hacen falta y no los tenés a mano, pedírselos — no avanzar con valores
asumidos ni con los que quedaron escritos en el HTML de una vuelta anterior.

Cuando manda uno nuevo, conviene revisarlo con `openpyxl` antes de tocar el HTML:
las hojas tienen filas de subtotal y separadores que se confunden fácil con datos.

**Siempre validar que las sumas cierren** contra el total de la fuente antes de
publicar una tabla o un gráfico.

### Cómo se rotulan los datos

Cada página dice de qué mes es el dato y de qué boletín sale. Los números están
embebidos como foto estática: no se actualizan solos. El aviso amarillo arriba de
cada página lo aclara, y hay que actualizarlo cuando cambia el mes de referencia.

---

## Criterios de diseño

### Paleta (definida en `:root` de `css/styles.css`)

Sale del sitio real del MECON. No inventar colores nuevos.

| Variable | Valor | Uso |
|---|---|---|
| `--primary` | `#232D4F` | Navy institucional: navbar, hero, títulos |
| `--secondary` | `#3E5A7E` | Segunda serie de gráficos, acentos |
| `--celeste` | `#039BE5` | Acento, subrayado de títulos de sección |
| `--link` | `#0767A7` | Links |
| `--footer-bg` | `#FAF8ED` | Crema del footer |
| `--success` | `#2E7D32` | Variaciones positivas |

### Tipografía

- **Montserrat** para texto corrido (igual que el MECON)
- **Lora** (serif) para títulos (igual que el MECON)

**Diferencia conocida con el sitio real:** el MECON usa 18px de tamaño base y
títulos en negro `#141414`; acá el base es 14px y los títulos van en navy. Alinear
eso es un cambio pendiente y grande (afecta todo el layout). Ver el roadmap.

### Bilingüe ES/EN

Todo texto visible va duplicado en dos spans:

```html
<span class="lang-en">Public Debt</span><span class="lang-es">Deuda Pública</span>
```

El botón EN/ES del navbar alterna cuál se muestra (clase `lang-active-es` en el
`body`, se guarda en `localStorage`). **Si agregás texto, agregá las dos versiones**
o va a desaparecer al cambiar de idioma.

### Grillas de tarjetas

Las filas con 3 o más tarjetas llevan `class="row card-grid"`. Bootstrap 3 usa
`float` y, cuando las tarjetas tienen distinta altura, la grilla se rompe: las
siguientes se enganchan a la derecha en vez de arrancar fila nueva. `card-grid`
aplica flexbox y empareja alturas.

Este bug ya apareció una vez y solo se veía entre 1000px y 1170px de ancho. Si
agregás una grilla de tarjetas, ponele la clase.

**No** poner `card-grid` en filas que contengan el menú lateral de Licitaciones
(rompe ese layout).

### Separador decimal

Todo el sitio escribe los números en formato inglés (`71.4%`, `19.2`), en un solo
`div` sin duplicar por idioma. Es inconsistente con la versión en castellano, donde
correspondería `71,4%`. Está así en todas las páginas: **no lo cambies en una sola**,
porque la inconsistencia entre secciones es peor que la actual. Si se arregla, se
arregla en todo el sitio de una vez.

### Gráficos

Los de Deuda/PIB son **SVG hechos a mano**, sin librería. Las coordenadas se
generan con un script de Python a partir del excel y se pegan en el HTML. Cada
gráfico tiene:

- Eje Y con porcentajes y gridlines
- Eje X con **todos** los meses, rotados -60° a 9px (probado: con esa combinación
  no se superponen; con -55°/10px sí)
- Un marcador por dato + zonas invisibles (`.cg-hit`) que activan crosshair y tooltip
- Fila de stats arriba (último valor, pico, variación)

Si cambiás el ángulo o el tamaño de las etiquetas, **medí el solapamiento** con
`getBoundingClientRect()` antes de darlo por bueno.

---

## Decisiones tomadas (no revertir sin hablarlo)

- **Nada sobre "situación de pago"**: se eliminó toda referencia a la clasificación
  de deuda en pago normal / diferido / elegible pendiente de reestructuración.
  Es una decisión editorial de Juan. No reintroducirla, ni siquiera como nota al pie
  ni reformulada en inglés.
- **Sin "Visualización Gráfica de la Deuda"**: el dato oficial llega hasta 2023 y no
  sirve para el portal.
- Se sacaron, por pedido: los cuadros de composición de deuda, la solapa
  "Participación en Pesos", el recuadro "Cifras Clave", el "Contexto de la Escala de
  Calificación" y las Preguntas Frecuentes.
- **Logos de las agencias**: son wordmarks recreados en SVG con los colores de marca
  reales (S&P `#D6002A`, Moody's `#0028A1`, Fitch teal). El de Fitch es una
  aproximación: las fuentes no coincidían sobre su color oficial.
- **Moody's se llama "Moody's Ratings"** (se renombró en 2024, antes era Investors
  Service).
- **Sin riesgo país**: no va ninguna serie de riesgo país en el portal, ni un
  gráfico ni una comparación entre gestiones. Dos razones: el EMBI+ es propietario
  de JP Morgan y ningún organismo argentino lo publica, así que no hay fuente
  oficial verificable; y el emisor es la República, no una administración — un
  argumento construido como "esta gestión contra la anterior" le recuerda al
  tenedor de bonos que acá la política se da vuelta con cada elección, que es
  justamente el riesgo que está pricear. Decisión de Juan, 14/09/2026.
- **La caja de supuestos del ejercicio de sostenibilidad no se saca nunca.** Es lo
  que lo convierte en un ejercicio auditable en vez de una promesa del emisor. El
  HTML de `programa-financiero.html` tiene un comentario interno que explica la
  brecha entre los supuestos (sp 1,3% y g 4,5%) y los datos corrientes que el
  propio portal publica en Sobre Argentina (+0,6% y +1,9% en el 1er sem. 2026).
  Leerlo antes de tocar esa sección.
- **La presentación del programa no se aloja en el repo.** El `.pptx` (V7, versión
  interna) y el PDF van a `datos/`. La página enlaza el PDF oficial del MECON,
  misma regla que los PDFs de licitaciones.

---

## Verificar antes de publicar

El sitio no tiene tests. La verificación es en el navegador, y conviene hacerla en
serio porque varios bugs de esta clase solo aparecen a ciertos anchos:

1. Levantar el server local y abrir la página tocada
2. Revisar la consola: **cero errores**
3. Si tocaste layout, probar a **1000px, 1100px y en mobile** (no solo el ancho por defecto)
4. Si tocaste una grilla, verificar que las tarjetas de cada fila queden a la misma altura
5. Si tocaste texto, chequear que esté en ES y EN
6. Si sacaste una sección, buscar referencias que quedaron colgadas (meta description,
   textos que la mencionan, links en footers). Esto ya pasó varias veces.

Para verificar sin depender de mirar la pantalla, `getBoundingClientRect()` en la
consola responde bastante: posiciones, alturas, solapamientos, desbordes.

---

## Estilo de trabajo

Juan prefiere que le señalen el flanco débil antes que la validación. Si una idea
tiene un problema, decirlo primero.

Sobre este proyecto en particular, cuatro cosas que valoró:

- Que los datos se verifiquen contra la fuente en vez de asumirlos
- Que se le **pidan los excels** cuando hacen falta, en lugar de avanzar a ciegas
- Que se avise cuando un cambio pedido deja algo inconsistente en otro lado
- Que no se publique sin confirmación: **siempre preguntar antes de `git push`**
