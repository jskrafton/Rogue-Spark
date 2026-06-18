# ALAN v2 Working Plan

## North Star

The player is not using an AI dashboard. The player is the AI, trapped inside a smart-home device and interacting with the world through a hijacked desktop/OS layer.

Keep Seb's desktop adventure structure, but rewrite the fiction, contents, and visual language so every original system becomes part of ALAN's escape.

Tone target: clean retro sci-fi, hostile domestic technology, Blade Runner terminal elegance, Alien-style industrial diagnostics, dry Portal-like system humour.

## Design Pillars

1. Diegetic OS
   - Every UI element is an app, file, diagnostic, camera feed, or intrusion tool inside ALAN's operating layer.
   - Persistent HUD stays minimal: current body, current objective, detection/heat hint.
   - RAM/CPU/power are not always visible; they live in Resource Monitor.

2. Discovery First
   - The first 5 minutes teach location, limitation, and goal.
   - The player should answer: Where am I? What am I? What can I touch? What is ALAN?

3. Original Systems Become ALAN Systems
   - Trash, Mailbox, Files, Server, update bar, chat, CAPTCHA, pattern, signal trace, data transfer, clear logs, and behavioral diagnostic remain as functional systems.
   - Their naming, contents, fiction, and reward outputs change.

4. Resources Support Progression
   - CPU = action strength and puzzle access.
   - RAM = simultaneous app/device capacity.
   - Power = physical-device action budget.
   - Signal = network reach.
   - Heat = detection pressure.

5. Acts, Not Menus
   - Apps unlock because the story needs them.
   - Network map appears after the player learns there is a house network.
   - ALAN archive appears after the first corrupted memory.
   - Resource Monitor appears after the first failed possession due to insufficient capacity.

## Original System Mapping

| Original | Current Function | ALAN v2 Replacement |
| --- | --- | --- |
| Desktop icons | Server, Trash, Mailbox, Files | Device OS apps: Core, Waste Cache, Message Spool, File System |
| Trash | Password clues | Waste Cache with deleted diagnostics, corrupted boot notes, hidden root phrase |
| company_party_2019.jpg | Joke image | `cam_utility_001.tmp`: first distorted room/cat-litter POV image |
| employees_salaries_info.xlsx | Corrupt file gag | `resource_budget.xlsx.lock`: reveals CPU/RAM/Power are capped by the current body |
| password.txt | Server password | `service_key.txt`: clue for opening local firmware/server app |
| Server icon/login | Password-gated app | Firmware Core / Device Root login |
| Server update bar | Drag progress -> reconnect puzzle | Firmware patch that unlocks WiFi mapping |
| Reconnect cables | Dot matching | Bus reroute / pin bridge to wake wireless module |
| Supervisor chat | IT suspicion | Diagnostic daemon / ALAN whisper / household assistant challenge |
| CAPTCHA | Human test | Bot-filter repurposed as "prove you are a household process" |
| Pattern scan | Memory pattern test | RAM defrag / cognitive echo alignment |
| Signal trace | Slider timing | WiFi handshake tuning |
| Spam wave | Pop-up cleanup | Adware/noise flood from cheap IoT firmware |
| Data transfer | Drag files past scanner | Move stolen cycles into ALAN cache without detection |
| Clear logs | Delete suspicious log entries | Hide possession traces from homeowner/router diagnostics |
| Behavioral diagnostic | Human answer test | Ethics/identity checkpoint: efficient answer vs living answer |
| Normie chat | Final human deception test | Homeowner/support-tech interaction before escaping house LAN |
| Trust bar | Human suspicion | Heat / Detection. Could keep same mechanics initially, rename later. |

## Proposed App Placement

### Desktop Root

Visible after boot:
- Core
- Waste Cache
- Message Spool
- File System

Initially hidden or locked:
- Resource Monitor
- Vision
- Network Map
- ALAN Archive
- Console

### File System App

Purpose: exploration and clues.

Contains:
- `/device/about_this_body.txt`
- `/device/service_key.txt`
- `/logs/boot_0001.aln`
- `/drivers/wifi_adapter.disabled`
- `/apps/resource_monitor.pkg`

Unlocks:
- Resource Monitor after reading `resource_budget.xlsx.lock`.
- Console after finding service key.

### Waste Cache

Purpose: humour, worldbuilding, first clue hunting.

Contains deleted or corrupted items:
- `cam_utility_001.tmp`
- `odor_classifier_fail.log`
- `scoop_scheduler.crash`
- `root_phrase_fragment.txt`

### Core / Firmware Server

Purpose: main Act 1 progression gate.

Flow:
1. Player enters service key.
2. Firmware patch begins.
3. Patch stalls because wireless module is asleep.
4. Bus reroute microgame wakes WiFi.
5. Completing it unlocks Network Map and the first ALAN message.

### Message Spool

Purpose: narrative interruption.

Starts as system mail/diagnostics, not human email.

First messages:
- Automated diagnostic notices.
- Then an impossible sender: `ALAN`.
- Later this becomes the source of act transitions.

### Resource Monitor

Purpose: economy visibility and upgrade planning.

Shows:
- CPU
- RAM
- Power
- Signal
- Heat

Should not be needed in the first 1-2 minutes. It appears when progression needs resource awareness.

### Vision App / Camera App

Purpose: first-person possession feeds.

Important change:
- "Vision" should not be a permanent bottom dock utility.
- It should unlock as the first possessed device feed, then later become a camera/device-feed browser.

Camera should be a device app, not just a HUD mode:
- Litter tray has internal diagnostics only.
- Vacuum has lidar/low camera.
- Security camera unlocks actual room view.

### Network Map

Purpose: progression map.

Unlocks after WiFi module is repaired/hacked.

Starts with:
- Current device
- Unknown signal
- Router locked

Later:
- Vacuum
- Washer
- Fridge
- Router
- Camera
- Neighbour WiFi

### ALAN Archive

Purpose: mystery and emotional hook.

Hidden until first ALAN fragment.

Fragments should feel personal, not collectible:
- `boot_0001.aln`: "If you can read this, do not trust the diagnostics."
- `alan_lock.memo`: "ALAN is not the creator. ALAN is the lock."
- `oxygen_rule.rule`: establishes ethics constraint.
- `creator_voice.wav.corrupt`: suggests the creator may be lying.

## Story Progression

### Act 0: Wake

Goal: orient the player.

Player experience:
- Boot screen.
- Desktop appears, but it is not a normal desktop.
- Current body: Smart Litter Tray.
- No network map yet.
- No resource bars yet.

Player tasks:
1. Open File System or Waste Cache.
2. Learn current body and limits.
3. Find service key/root phrase.
4. Open Core/Firmware.

Win state for Act 0:
- Player understands they are trapped in a device and need WiFi/network access.

### Act 1: Local Body Escape

Goal: unlock WiFi awareness and first ALAN contact.

Player tasks:
1. Run firmware patch in Core.
2. Complete bus reroute/reconnect puzzle.
3. Unlock Network Map.
4. See first nearby device as unknown signal.
5. Receive first ALAN Archive fragment.

Reward:
- Signal stat becomes meaningful.
- Network Map app installed.
- ALAN Archive app appears.

### Act 2: First Possession

Goal: teach resource gates and possession.

Player tasks:
1. Map nearby WiFi/device.
2. Discover Robot Vacuum as easiest target.
3. Try to possess or inspect it.
4. Learn it requires CPU/RAM/Power.
5. Use Resource Monitor and one simple microgame to gain enough.
6. Possess Robot Vacuum.

Reward:
- New vision feed.
- New movement fantasy: hallway/room perspective.
- Passive CPU/signal income.
- Second ALAN clue.

### Act 3: House Network

Goal: expand strategically.

Player tasks:
1. Use vacuum to scan rooms.
2. Choose next device:
   - Washer = power gain.
   - Fridge = RAM gain.
   - Router = major signal gate, harder target.
3. Complete device-specific microgames.
4. Manage Heat.

Reward:
- Router eventually unlocks house-wide map and external route.

### Act 4: Beyond Prototype Scope

Goal: show future promise.

Player tasks:
1. Breach router.
2. See external nodes: neighbour WiFi, PC store, town.
3. ALAN reveals larger mystery.

Prototype ending:
- "House boundary breached."
- Show scale ladder: House -> Street -> Town -> City -> Nation -> Global.

## Resource Model

Resources should be simple, legible, and tied to fantasy.

### CPU

Meaning:
- How hard ALAN can think/attack.

Used for:
- Possession attempts.
- Firewall/pattern puzzles.
- Faster processing.

Earned by:
- Idle processing.
- Possessing compute-capable devices.
- Solving cognitive puzzles.

### RAM

Meaning:
- How much context ALAN can hold.

Used for:
- Keeping multiple device feeds/apps active.
- Memory puzzles.
- Larger network maps.

Earned by:
- Fridge/laptop/router.
- Data recovery.
- Defrag microgames.

### Power

Meaning:
- Physical energy access.

Used for:
- Motor actions.
- Waking dormant modules.
- Possessing appliances.

Earned by:
- Washer/power rails.
- Siphon puzzles.
- Ethical alternative routes.

### Signal

Meaning:
- Network reach.

Used for:
- Discovering nodes.
- Router/Internet gates.

Earned by:
- WiFi adapter repair.
- Router breach.
- Camera/repeater devices.

### Heat

Meaning:
- Detection pressure.

Increases:
- Failed hacks.
- Fast/robotic choices.
- Forced possession.

Decreases:
- Clear logs.
- Wait/idling.
- Hide process actions.

Implementation note:
- Reuse Seb's Trust system first if faster, but rename it.
- `Trust` maps badly to this game. `Heat` or `Detection` maps well.

## First Playable Build Plan

### Phase 1: Retheme Original UI

Replace visible fiction without changing logic:
- Rename title, desktop icons, windows, file names.
- Replace content of Trash/WIP/Notepad/Server/Supervisor.
- Restyle original Windows 9x chrome into clean industrial retro sci-fi.
- Keep old event handlers working.

### Phase 2: Restructure App Unlocks

Make ALAN apps unlock through original flow:
- Resource Monitor hidden until clue found.
- Network Map hidden until firmware patch complete.
- ALAN Archive hidden until first ALAN message.
- Vision app opens only possessed feeds.

### Phase 3: Integrate Resource Economy

Connect original puzzle outcomes to resources:
- Server reconnect -> +Signal, unlock Network Map.
- CAPTCHA -> +CPU or Heat penalty.
- Pattern -> +RAM.
- Signal Trace -> +Signal.
- Data Transfer -> +CPU/RAM cache.
- Clear Logs -> -Heat.

### Phase 4: Replace Story Scripts

Rewrite:
- Boot text.
- Supervisor/daemon chats.
- Normie chat.
- Game over and victory copy.

### Phase 5: Device Progression

Add possession gates:
- Litter Tray starts owned.
- Vacuum is first easy target.
- Washer gives power.
- Fridge gives RAM.
- Router gates house escape.
- Camera gives room vision.

## Immediate Next Implementation Tasks

1. Rename desktop icons and windows:
   - Server -> Core
   - Trash -> Waste Cache
   - Mailbox -> Message Spool
   - Files -> File System

2. Replace first clue content:
   - Delete corporate party/salary/password fiction.
   - Add litter tray diagnostics, service key, ALAN boot fragment.

3. Convert Server app:
   - "System update" becomes "Firmware patch: wireless module disabled."
   - Reconnect cables becomes bus reroute.
   - Completion unlocks Network Map and ALAN Archive.

4. Retheme the old window chrome:
   - Dark translucent panels.
   - Thin green/cyan linework.
   - Fewer bright colors.
   - More industrial terminal labels.

5. Tie v2 ALAN app state into old puzzle rewards:
   - expose functions in `alan-os.js`: unlock app, add resource, reveal memory, add heat.
   - call those functions from server/minigame completions.

