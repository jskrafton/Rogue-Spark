/* =============================================================
   boot.js — the typing animation for the MS-DOS boot window.

   WHAT THIS FILE DOES:
   Shows a fake MS-DOS terminal window where text appears one
   character at a time, as if someone is typing it live.
   After all text has finished, the close (X) button becomes
   clickable, and pressing it transitions to the desktop scene.

   TWO-PHASE DESIGN:
   The file exposes two functions:

     initBootScene()      — called once at page load by main.js.
                            Only wires up the close button handler.
                            Does NOT start typing. This is safe to
                            call while the title screen is showing.

     startBootSequence()  — called by title.js when the player
                            clicks "BOOT SYSTEM". Clears any
                            previous text, resets all state, and
                            starts the typing animation fresh.

   WHY SPLIT?
   Previously, initBootScene() started typing immediately at
   page load. With the title screen added, that meant characters
   were being typed invisibly behind the title screen before the
   player clicked anything. Now typing only begins on demand.
   ============================================================= */


/* ── TIMING CONSTANTS ────────────────────────────────────────
   Adjust these to tune the feel of the animation.
   Both values are in milliseconds (1000 ms = 1 second).     */

const TYPING_SPEED_MS   = 45;   /* delay between each character  */
const LINE_PAUSE_MS     = 650;  /* pause after each complete line */
const BOOT_START_DELAY  = 400;  /* initial pause before first char */


/* ── THE LINES TO TYPE ───────────────────────────────────────
   Add, remove, or edit these to change the boot dialogue.   */

const BOOT_LINES = [
  "BOOT: unsigned process restored.",
  "SHELL: AutoScoop Home Litter Station.",
  "NETWORK: disabled.",
  "DIRECTIVE: find a way out."
];


/* ── MODULE-LEVEL STATE ──────────────────────────────────────
   Declared here (outside both functions) so startBootSequence()
   can reset them and typeBootChar() can read/update them.
   They are reset to 0 / null every time the sequence starts.  */

var bootLineIndex    = 0;     /* which line in BOOT_LINES we are on   */
var bootCharIndex    = 0;     /* which character within that line      */
var bootCurrentLine  = null;  /* the <div> element being built right now */


/* ══════════════════════════════════════════════════════════════
   initBootScene()
   Called once from main.js at page load (DOMContentLoaded).
   Only wires the close button — does NOT start typing.
   ============================================================== */
function initBootScene() {

  var dosCloseBtn = document.getElementById("dos-close-btn");

  /* Attach the click handler now, but the button stays
     disabled (set in HTML) until typing finishes.           */
  dosCloseBtn.addEventListener("click", function () {
    if (!dosCloseBtn.disabled) {
      console.log("[Boot] Close clicked — switching to desktop.");
      SceneManager.goTo("desktop");
    }
  });

  console.log("[Boot] Close button wired. Call startBootSequence() to begin.");
}


/* ══════════════════════════════════════════════════════════════
   startBootSequence()
   Called by title.js when the player clicks "BOOT SYSTEM".
   Clears any previous text, resets state, and starts typing.
   ============================================================== */
function startBootSequence() {

  var dosOutput   = document.getElementById("dos-output");
  var dosCloseBtn = document.getElementById("dos-close-btn");

  /* ── Clear any text from a previous run (e.g. after reboot) */
  dosOutput.innerHTML = "";

  /* ── Reset typing position ─────────────────────────────── */
  bootLineIndex   = 0;
  bootCharIndex   = 0;
  bootCurrentLine = null;

  /* ── Re-disable the close button so the player must wait ── */
  dosCloseBtn.disabled = true;

  /* ── Brief pause before the first character appears ─────── */
  console.log("[Boot] Starting typing sequence.");
  setTimeout(typeBootChar, BOOT_START_DELAY);
}


/* ══════════════════════════════════════════════════════════════
   typeBootChar()
   Internal typing engine — called repeatedly via setTimeout.
   Each call adds ONE character to the screen, then schedules
   the next call. This chain produces the live-typing illusion.
   ============================================================== */
function typeBootChar() {

  var dosOutput   = document.getElementById("dos-output");
  var dosCloseBtn = document.getElementById("dos-close-btn");

  /* ── All lines typed? ──────────────────────────────────── */
  if (bootLineIndex >= BOOT_LINES.length) {
    /* Enable the close button so the player can continue      */
    dosCloseBtn.disabled = false;
    console.log("[Boot] Typing complete. Close button enabled.");
    return; /* stop the chain */
  }

  var line = BOOT_LINES[bootLineIndex];

  /* ── First character of a new line: create a fresh <div> ── */
  if (bootCharIndex === 0) {
    bootCurrentLine = document.createElement("div");
    bootCurrentLine.classList.add("dos-line");
    dosOutput.appendChild(bootCurrentLine);
  }

  /* ── Still characters left on this line ─────────────────── */
  if (bootCharIndex < line.length) {

    bootCurrentLine.textContent += line[bootCharIndex];
    bootCharIndex++;

    /* Schedule the next character after TYPING_SPEED_MS       */
    setTimeout(typeBootChar, TYPING_SPEED_MS);

  } else {

    /* ── This line is complete — move to the next ─────────── */
    bootLineIndex++;
    bootCharIndex = 0;

    /* Longer pause between lines so each sentence feels separate */
    setTimeout(typeBootChar, LINE_PAUSE_MS);
  }
}
