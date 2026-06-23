/* =============================================================
   main.js — the entry point. This is the first code that runs.

   WHAT THIS FILE DOES:
   Think of this as the "start button" of the whole game.
   When the browser finishes loading all the HTML, this file
   initialises every system in the right order, then shows
   the first scene.

   WHY WE WAIT FOR "DOMContentLoaded":
   JavaScript runs very fast — sometimes before the browser has
   finished drawing all the HTML elements. If we tried to find
   an element that doesn't exist yet, we'd get an error.
   DOMContentLoaded fires only AFTER the HTML is fully ready,
   so it's the safe place to start our game logic.
   ============================================================= */

document.addEventListener("DOMContentLoaded", function () {

  console.log("[Main] Page loaded. Initialising game...");

  // ── Step 1: Initialise the Trust bar ─────────────────────
  // Sets the bar to TRUST_START and draws the initial colour.
  // Done first so it is ready before anything else fires.
  initTrustBar();

  // ── Step 2: Initialise the desktop icon handlers ─────────
  // Wires up click handlers for the four desktop icons.
  setupDesktopIcons();

  // ── Step 3: Initialise the desktop floating windows ──────
  // Wires up Trash, Notepad, and Login overlay interactions.
  setupDesktopWindows();

  // ── Step 4: Initialise the boot scene ────────────────────
  // Sets up the typewriter animation and the close button.
  // Must be called before goTo("boot") so the typing starts
  // immediately once the scene becomes visible.
  initBootScene();

  // ── Step 5: Initialise the server scene ──────────────────
  // Wires up the close button, UPDATE button, and all the
  // mini-game logic inside the server window.
  initServerScene();

  // ── Step 6: Initialise the IT Supervisor chat ────────────
  // Prepares the chat window system.
  // The window stays hidden until openSupervisorChat() is
  // called (triggered by UPDATE COMPLETE in server.js).
  initSupervisorChat();

  // ── Step 7: Initialise the CAPTCHA mini-game ─────────────
  // Wires up the VERIFY button click handler.
  // The actual popup is not shown until the security sequence
  // is triggered by the IT Supervisor conversation.
  initCaptcha();

  // ── Step 8: Initialise the Pattern Scan mini-game ─────────
  // Wires up click handlers for the four colored buttons.
  // The game itself opens only when sequence.js calls
  // openPatternGame() after the CAPTCHA is passed.
  initPatternGame();

  // ── Step 9: Initialise the Signal Trace mini-game ────────
  // Wires up the slider drag listeners for the slider-puzzle
  // CAPTCHA. The overlay stays hidden until sequence.js calls
  // openSignalTrace() after the Cognitive Pattern Scan ends.
  initSignalTrace();

  // ── Step 10: Initialise the Spam mini-game ────────────────
  // Nothing to wire up at load time; spam.js just logs that
  // it is ready. openSpamGame() is called automatically by
  // supervisor.js 2 seconds after the final chat ends.
  initSpamGame();

  // ── Step 11: Initialise the Data Transfer mini-game ────────
  // Adds the permanent document-level mousemove / mouseup
  // drag listeners. The overlay itself stays hidden until
  // openTypingTest() (→ openDataTransfer()) is called by
  // supervisor.js after the Behavioral Diagnostic chat.
  initDataTransfer();

  // ── Step 12: Initialise the Clear Logs mini-game ─────────
  // Nothing to wire up at load time — the DELETE button
  // listeners are created fresh by openClearLogs() each run.
  // openClearLogs() is called automatically by data-transfer.js
  // after the Data Transfer game ends.
  initClearLogs();

  // ── Step 13: Initialise the Behavioral Diagnostic ─────────
  // The separate BD popup is no longer active in the main flow
  // (its questions are now inside the Normie colleague chat).
  // initBehavioralDiagnostic() is kept for completeness.
  initBehavioralDiagnostic();

  // ── Step 14: Initialise the Normie colleague chat ──────────
  // The final sequence of the demo. Opens automatically after
  // the IT Supervisor's "I can't find anything" message ends.
  initNormieChat();

  // ── Step 14b: Initialise the victory animation ────────────
  // Builds the 800 pixel-grid cell divs for the world map and
  // pre-calculates wave distances so the animation is instant
  // when startVictoryAnimation() is called from normie-chat.js.
  initVictoryScreen();

  // ── Step 15: Wire the title screen button ────────────────
  // Attaches the click handler to the "BOOT SYSTEM" button.
  // Must be called after DOMContentLoaded so the element exists.
  initTitleScreen();

  // ── Step 16: Show the title screen ───────────────────────
  // The game now starts on the title screen. Clicking
  // "BOOT SYSTEM" triggers SceneManager.goTo("boot") and
  // the MS-DOS typewriter window runs as it always did.
  // "Reboot from start" (game-over + victory) calls
  // location.reload(), which naturally returns here.
  SceneManager.goTo("title");

  console.log("[Main] Game ready — showing scene: " + SceneManager.getScene());
});
