# Portal de Relación con Inversores — Secretaría de Finanzas

Prototipo navegable de un portal de Investor Relations para la Secretaría de
Finanzas del Ministerio de Economía de Argentina.

**Ver online:** https://juanb23codigo.github.io/ir-portal/index.html

> Prototipo interno, no es un sitio oficial. Requiere contraseña para entrar.

## Qué es

Una maqueta funcional para mostrar cómo se vería una sección de Investor Relations
en el sitio de la Secretaría, siguiendo el estándar de los portales soberanos de la
región (Chile, Brasil, Colombia, Uruguay).

La primera pantalla replica la página real de Finanzas del MECON, con un acceso
nuevo — "Relación con Inversores" — que entra al portal propuesto.

Las cifras son **datos reales** del Boletín Mensual de Deuda y de las series
oficiales de la Secretaría, cargados como foto estática a la fecha que indica cada
página. No se actualizan solos.

## Correrlo localmente

```bash
python -m http.server 8791
```

Abrir `http://localhost:8791/index.html`.

No hay build ni dependencias: es HTML, CSS y JS plano.

## Estructura

```
index.html              Landing "Finanzas" (réplica del MECON)
inversores.html         Home del portal IR
  debt-statistics.html    Deuda Pública
  credit-ratings.html     Calificaciones Crediticias
  licitaciones.html       Licitaciones (+ 4 subpáginas)
  investor-presentation.html
  about-argentina.html
css/styles.css
js/main.js
```

## Documentación

- **`CLAUDE.md`** — convenciones, fuentes de datos, decisiones tomadas y qué
  verificar antes de publicar.
- **`ESTADO.md`** — qué está hecho y qué queda pendiente.
