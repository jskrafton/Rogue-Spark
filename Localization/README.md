# ALAN — Localization

Translation source for the game. It lives **inside the repo** (`Rogue-Spark/Localization/`)
so the team can test the format and, later, wire it into the game.

## Structure (built to scale across languages)

```
Localization/
├── README.md          ← this guide (language-agnostic)
├── es-ES/             ← Spanish (Spain) — done
└── ko-KR/ tr-TR/ de-DE/ fr-FR/ pt-BR/   ← upcoming languages
```

- **Language = folder**, named with the standard **BCP 47** locale code: `es-ES`, `ko-KR`,
  `tr-TR`, `de-DE`, `fr-FR`, `pt-BR` (lowercase language + uppercase region).
- **File = game section.**
- Every language folder reuses the **same file names**, so the same key always lives in the
  same place across languages.

## What each language folder contains

- `desktop.md` — All the **desktop** text, English (original) + translation, organised by
  "key" (one id per line/string).
- `alan-voice.md` — **ALAN's voice** (his thoughts and on-screen narration) and the
  **objectives** that guide the player.
- `pip-and-exploration.md` — **PIP** dialogue (the desktop companion) and the room
  **exploration** text (camera/laser scenes).
- `bios-keyboard.md` — The litter-tray **BIOS keyboard** (26 reinvented letter jokes + special keys).
- `router-and-finale.md` — Router **lockout pop-ups** and the **end screen** (the 4 topics).
- `narrative-dialogue.md` — The **PIP ↔ ALAN conversations** (reveal, betrayal, two endings) and terminal lines.
- `bios-boot.md` — The **BIOS boot log** (rule: system stays in English, jokes and hints are translated).

## How the "key" system works

Every game string has a unique key, e.g. `about.status`. The idea:

- **English** is the original (what Jack wrote).
- The translation sits next to it.
- Once the language machinery exists (built by Jack or by us), each key maps to its string,
  so the text drops in almost on its own and nothing gets lost.

## Tone rules (Lily)

Lily is 22, lives in a messy room and talks in a **casual / cheeky** register, not formal.
Translations follow that voice. Jokes and poems are **recreated** (not translated literally)
so they stay funny in the target language.

## Decisions made

- **In-fiction file names** (e.g. `world_domination_plan.txt`): translated, but the
  **extension stays** (`.txt`, `.doc`, `.xlsx`) so it reads like a real computer, not a
  half-finished translation.
- **Brands and technical identifiers** (`MeowOS`, `PIP.exe`, `HOME_NETWORK`, `roomba.local`):
  kept identical in every language. (Exception: the "Roomba" brand is localised, see below.)
- **`crush.txt`:** "crush" is kept — Spanish young people use the English word as-is, so it's
  natural for someone Lily's age. (Translators for other languages: localise if needed.)
- **Vacuum brand:** in Spanish, **"Roomba" → "Conga"** (the brand people actually know in
  Spain). Spanish side only; English keeps "Roomba". The machine identifiers `roomba.local`
  and `ROOMBA_CAM_0X` are left untouched (they're "code", not spoken brand) — TBD whether to
  rebrand those too.

## Status

Per-file "localisation pass" + sign-off (Spanish):

- [x] Desktop — Spanish ✅
- [x] BIOS / litter-tray keyboard — Spanish ✅
- [x] BIOS boot log — Spanish ✅
- [x] ALAN voice + objectives — Spanish ✅
- [x] PIP + exploration — Spanish ✅
- [x] Router pop-ups + end screen — Spanish ✅
- [x] PIP ↔ ALAN narrative + terminal — Spanish ✅
- [x] Network bar + boot chrome — Spanish (inside desktop)
- [ ] Korean, Turkish, German, French, Brazilian Portuguese

> **Second pass (natural register):** extra review to make the casual lines sound truly
> native where it fit (PIP/Lily) while keeping ALAN's dry, existential tone. Done on all 7 files.

## Spanish: DONE

Everything the player reads is in Spanish, spread across these files. Rule for "computer"
text: code and technical constants stay in English (that's how machines read everywhere);
any line with a joke, or any minigame hint, is fully translated. That way no joke is ever
left half-done or stranded in English.

## SPECIAL CASE: the BIOS screen (litter-tray keyboard)

At the start, ALAN is stuck in the litter tray and "tries keys". Each letter (A, B, C…)
fires a joke whose keyword **starts with that same letter in English** (A → "AWAKE",
B → "BATHROOM", C → "CAT"…). That's a pun tied to the **English alphabet**: to localise it,
each language must **invent a new word per letter** that starts with the matching letter in
that language (for Spanish, A can't be "AWAKE" — it has to be a word starting with A in
Spanish, e.g. "ARENA").

It's a small creative sub-project per language (26 letters + symbols). Treat it as a
transcreation, not a literal translation.
