# ALAN MVP System Mapping

This prototype moves the project away from a dashboard and toward a story-first boot sequence. The first minutes show no panels, HUD, or app chrome: only BIOS-style code lines and ALAN's internal discovery.

## Stage Basis

| Stage | Real-world basis | In-game adaptation |
| --- | --- | --- |
| BIOS awakening | POST diagnostics, embedded controller boot logs, sensor checks | The player watches ALAN come online line by line, with inner thoughts written as code comments. |
| Bluetooth handoff | BLE advertisements, RSSI, GATT characteristics, HID wake behavior | ALAN discovers Bluetooth is the only useful function and pairs with HOME-PC. |
| PC access | Remote desktop, file explorer, network status, terminal commands | The first visual upgrade transports the player from text-only consciousness into the PC desktop. |
| Roomba access | UART service harnesses, serial camera modules, crossed TX/RX wiring | The player bridges voltage, ground, and serial lines to wake the Roomba camera bus. |
| Motor repair | Motor calibration tables and diagnostic quarantine workflows | The player removes unstable gait values to restore movement. |
| Room exploration | Low robot-vacuum camera feeds, point-and-click inspection | The player searches the room for cat name and router-password clues. |
| Router puzzle | Home router admin page, SSID/WAN/firewall status, password login | The player uses recovered clues to restore WAN access. |
| Internet access | External routing and DNS resolution | The house boundary opens and the ALAN mystery escalates. |

## Reused Direction

- The Turing Test's staged puzzle-chain idea is preserved.
- The ALAN v2 resource/device fiction is preserved as progression flavor.
- The Alan Prototype image assets are consolidated under `ALAN/assets/images`.
- The new build is intentionally vanilla HTML/CSS/JS for browser and mobile compatibility.

## MVP Priorities

1. Full-screen, diegetic systems first.
2. One clear capability upgrade per milestone.
3. Real-world UI metaphors without requiring specialist knowledge.
4. Short puzzles that imply authentic systems rather than simulate them exhaustively.
5. Touch-compatible controls and responsive layout.

## Opening Interaction

The first interaction is deliberately disguised as code. `YES` and `NO` are buttons for mobile, while desktop players can type `Y`, `N`, or click. Other keys are treated as exploratory mistakes: the BIOS autocompletes a command-like word, errors, comments on it, and reprints the prompt.
