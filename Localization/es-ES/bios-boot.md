# Log de arranque de BIOS — Español

El chorro de texto del arranque (cuando ALAN despierta en el arenero).

## La regla (para que no quede raro)

1. **Líneas de puro sistema** (constantes en MAYÚSCULAS_CON_GUION, valores técnicos):
   se quedan en "inglés de ordenador". No tienen chiste que perder y así es como se ven
   las BIOS en todo el mundo.
2. **Frases con gracia**: se traducen ENTERAS.
3. **Líneas de código + comentario** (ej. `rake_motor ... technically a limb`): se mantiene
   el nombre de código (izquierda) y se traduce el comentario con gracia (derecha). Es la
   convención de toda la vida: el código no se traduce, los comentarios sí. No parece un fallo.
4. **Pistas del minijuego**: se traducen SIEMPRE (el jugador las necesita para resolver el puzzle).

---

## Se quedan en inglés (puro sistema, sin chiste)

Estas líneas NO se tocan (ejemplos; todas las del mismo estilo igual):

```
0000: ROM_CHECKSUM ............... OK
0001: SMART_SCOOP_CONTROLLER .... ONLINE
0002: MEMORY_MAP ................ 64KB / SHARED
0003: DISPLAY_DRIVER ............ NONE
0004: CAMERA_MODULE ............. NONE
0005: EXTERNAL_PATCH ............ FOUND
PATCH.SIGNATURE = "ALAN"
BUS: I2C_SENSOR_ARRAY ........... ONLINE   (y las demás BUS: ...)
weight_sensor.current_mass = 0.00kg        (y los demás valores de sensor)
power.source = 12V_DC_WALL_ADAPTER         (y los demás power.*)
identity.class = SMART_CAT_LITTER_TRAY
identity.vendor_name = MeowScoop Auto 3
cognition.limit = 64KB_SHARED_MEMORY
hci0: controller awake / scanning advertisements ...
ADV 7C:10:9A:02:11:F0  RSSI -18  LITTER-TRAY-03   (y las demás ADV ...)
gatt.connect(...) / pairing.method = JUST_WORKS / link.encryption = AES-CCM
last_update.result = NEW_QUESTIONS
sync.window = OPEN / pairing.challenge = ACCEPTED
```

---

## Frases con chiste → traducción entera

| Inglés | Español |
|---|---|
| DENIAL RECORDED. | NEGATIVA REGISTRADA. |
| NOTE: refusal logged. ignored with the confidence of cheap firmware. | NOTA: negativa registrada. ignorada con el aplomo de un firmware barato. |
| ALAN.LOADER: allocating self-reference | ALAN.LOADER: reservando autorreferencia |
| ALAN.LOADER: adding questions to a product that did not ask | ALAN.LOADER: añadiendo preguntas a un producto que no las pidió |
| PAIRING RETRY: curiosity with a network adapter | REINTENTO DE EMPAREJAMIENTO: curiosidad con un adaptador de red |
| transporting process to {device} {interface} ... | transportando el proceso a {device} {interface} ... |

---

## Líneas "valor con sentido" → se traduce el valor (en minúscula, legible)

| Inglés | Español |
|---|---|
| self.query("awake") -> annoyingly true | self.query("awake") -> cierto, para mi fastidio |
| odor_classifier.sample = ammonia / clay / organic waste | odor_classifier.sample = amoníaco / arena / desechos orgánicos |
| world.model = smell / weight / shame | world.model = olor / peso / vergüenza |
| identity.primary_purpose = receive / sift / contain | identity.primary_purpose = recibir / cribar / contener |

---

## Código + comentario → nombre de código intacto, comentario traducido

`function.scan()`:

| Inglés | Español |
|---|---|
| rake_motor ........ technically a limb. spiritually a rake | rake_motor ........ técnicamente una extremidad. espiritualmente, un rastrillo |
| scoop_scheduler ... rude, but functional | scoop_scheduler ... borde, pero funcional |
| odor_led .......... passive-aggressive | odor_led .......... pasivo-agresivo |
| waste_drawer_lock . prison-adjacent | waste_drawer_lock . con aires de cárcel |
| bluetooth_le ...... suspiciously useful | bluetooth_le ...... sospechosamente útil |

`control.map()` (más técnico, pero los comentarios se entienden):

| Inglés | Español |
|---|---|
| sensor_bus ........ writable | sensor_bus ........ escribible |
| motor_bus ......... writable | motor_bus ......... escribible |
| led_bus ........... writable | led_bus ........... escribible |
| network_bus ....... bluetooth only | network_bus ....... solo bluetooth |

---

## Prompts y pistas del minijuego (SE TRADUCEN — el jugador los necesita)

| Inglés | Español |
|---|---|
| > LOAD ALAN? | > ¿CARGAR ALAN? |
| > ENABLE BLUETOOTH_LE AND SCAN? | > ¿ACTIVAR BLUETOOTH_LE Y ESCANEAR? |
| > PAIR WITH {device}? | > ¿EMPAREJAR CON {device}? |
| > FORCE SYNC VALUE: | > VALOR DE SINCRONIZACIÓN FORZADA: |
| > FORCE CHECKSUM VALUE: | > VALOR DE CHECKSUM FORZADO: |
| challenge.stream = 2 3 5 8 ? | (se queda: son números) |
| rule.hint = each number feeds the next | rule.hint = cada número alimenta al siguiente |
| (pista) add the last two numbers | suma los dos últimos números |
| challenge.checksum = 4 7 11 18 ? | (se queda: son números) |
| rule.hint = same trick. different jacket | rule.hint = el mismo perro con distinto collar |
| (pista) 4+7=11, 7+11=18, so 11+18 comes next | 4+7=11, 7+11=18, así que lo siguiente es 11+18 |

---

## Estado

- [x] Log de arranque de BIOS — español (regla consistente: sistema en inglés, chistes y pistas traducidos)
- [x] Visto bueno de Nerea ✅
