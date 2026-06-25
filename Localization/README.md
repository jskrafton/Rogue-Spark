# ALAN — Localización

Carpeta de traducciones del juego. Vive **dentro del repo** (`Rouge-Spark/Localization/`)
para que el equipo (Jack) pueda probar el formato y, más adelante, engancharlo al juego.

## Estructura (preparada para varios idiomas)

```
Localization/
├── README.md          ← esta guía (vale para todos los idiomas)
├── es-ES/             ← español de España (terminado)
└── ko-KR/ tr-TR/ de-DE/ fr-FR/ pt-BR/   ← futuros idiomas
```

- **Idioma = carpeta**, con **código de idioma estándar** (BCP 47): `es-ES`, `ko-KR`,
  `tr-TR`, `de-DE`, `fr-FR`, `pt-BR` (idioma en minúscula + región en mayúscula).
- **Fichero = sección** del juego.
- Dentro de cada idioma se repiten **los mismos nombres de archivo**, así una misma
  etiqueta se encuentra en el mismo sitio en todos los idiomas.

## Qué hay en cada carpeta de idioma

- `desktop.md` — Todo el texto del **escritorio** del juego, en inglés (original) y
  traducción, ordenado por "etiqueta" (una id por frase).
- `alan-voice.md` — La **voz de ALAN** (sus pensamientos y avisos) y los **objetivos**
  que guían al jugador.
- `pip-and-exploration.md` — Diálogos de **PIP** (el tamagotchi) y textos de la
  **exploración** de la habitación (escenas de cámara/láser).
- `bios-keyboard.md` — El **teclado del arenero** de la BIOS (26 chistes reinventados + teclas especiales).
- `router-and-finale.md` — **Pop-ups del router** y la **pantalla final** (los 4 temas).
- `narrative-dialogue.md` — Las **conversaciones PIP ↔ ALAN** (revelación, traición, final x2) y líneas de terminal.
- `bios-boot.md` — El **log de arranque** de la BIOS (regla: sistema en inglés, chistes y pistas traducidos).

## Cómo funciona el sistema de "etiquetas"

Cada frase del juego lleva una etiqueta única, p. ej. `about.status`. La idea:

- El **inglés** es el original (lo que escribió Jack).
- Debajo va nuestra traducción.
- Cuando exista la maquinaria de idiomas (la monte Jack o nosotras), cada etiqueta
  se conecta con su frase. Así el texto encaja casi solo y no se pierde nada.

## Reglas de tono (Lily)

Lily tiene 22 años, vive en una habitación desastre y habla **en plan canalla/casual**,
no fino. Las traducciones siguen ese tono. Los chistes y poemas se **recrean** (no se
traducen literal) para que mantengan la gracia.

## Decisiones tomadas

- **Nombres de archivo:** se traducen PERO se mantiene la extensión (`.txt`, `.doc`, `.xlsx`)
  para que parezca un ordenador de verdad y no un fallo de traducción a medias.
- **Marcas y nombres técnicos** (`MeowOS`, `PIP.exe`, `HOME_NETWORK`,
  `roomba.local`): se quedan igual en todos los idiomas. (Excepción: la marca "Roomba"
  se localiza, ver abajo.)
- **`crush.txt`:** se mantiene "crush" — en España la gente joven lo usa tal cual, así
  que es natural para alguien de la edad de Lily.
- **Marca de la aspiradora:** en español, **"Roomba" → "Conga"** (la marca española, da
  rollazo local). Solo en el lado español; el inglés mantiene "Roomba". Los códigos de
  máquina `roomba.local` y `ROOMBA_CAM_0X` se dejan como están (son "código", no marca
  hablada) — pendiente de confirmar si se "conganizan" también.

## Estado

Repaso "españolización" + visto bueno de Nerea, archivo por archivo:

- [x] Escritorio — español ✅ visto bueno
- [x] BIOS / teclado del arenero — español ✅ visto bueno
- [x] Log de arranque de BIOS — español ✅ visto bueno
- [x] Voz de ALAN + objetivos — español ✅ visto bueno
- [x] PIP + exploración — español ✅ visto bueno
- [x] Pop-ups del router + pantalla final — español ✅ visto bueno
- [x] Diálogos narrativos PIP ↔ ALAN + terminal — español ✅ visto bueno
- [x] Barra de red + chrome del arranque — español (dentro de desktop)
- [ ] Traducción a coreano, turco, alemán, francés y portugués (BR)

> **Segunda pasada (tono cercano):** repaso extra para meter español de calle natural
> donde encajaba (PIP/Lily) y respetar el tono seco-existencial de ALAN. Hecho en los 7 archivos.

## Español: CERRADO

Todo lo que el jugador lee está en español, repartido en estos archivos. La regla para el
texto "de ordenador": el código y las constantes técnicas se quedan en inglés (así son las
máquinas en todo el mundo); cualquier frase con chiste o cualquier pista de minijuego se
traduce entera. Así nunca queda un chiste a medias ni perdido en inglés.

## CASO ESPECIAL: la pantalla de BIOS (teclado del arenero)

Al principio, ALAN está atrapado en el arenero y "prueba teclas". Cada letra del teclado
(A, B, C…) responde con un chiste que **empieza por esa misma letra en inglés**
(A → "AWAKE", B → "BATHROOM", C → "CAT"…). Eso es un juego de palabras atado al
**alfabeto inglés**: si traducimos, hay que **inventar una palabra española nueva para
cada letra** (A → "AWAKE" no vale, tendría que ser algo con A en español).

Es un mini-proyecto creativo aparte (26 letras + símbolos). Lo dejo apartado para
hablarlo contigo y decidir cómo enfocarlo, en vez de traducirlo a lo loco.
