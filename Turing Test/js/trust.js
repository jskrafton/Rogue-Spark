/* =============================================================
   trust.js — the Trust system.

   WHAT IS TRUST?
   Trust is a 0-to-TRUST_MAX score that reflects how well the
   player is hiding their activity from the system. It starts
   at TRUST_START. Gaining trust means doing things right;
   losing trust means making mistakes. At zero: game over.

   UI: a coloured bar fixed to the bottom of the screen.
   The fill width shows the current level as a proportion.
   The colour interpolates smoothly:
     0 (empty) = red   → danger
     ½ (half)  = yellow → caution
     1 (full)  = green  → safe

   GLOBAL API — call these from any other script:
     initTrustBar()   set up the bar at startup (call from main.js)
     showTrustBar()   slide the bar into view (call when ready to reveal)
     addTrust(n)      raise Trust by n, never above TRUST_MAX
     loseTrust(n)     lower Trust by n; triggers game over at 0
   ============================================================= */


/* ═══════════════════════════════════════════════════════════
   ── SECTION 1: TUNING VARIABLES ───────────────────────────
   Change these to adjust starting conditions.
   ═══════════════════════════════════════════════════════════ */

/* Trust level when the game begins */
var TRUST_START = 4;

/* Highest Trust can ever go */
var TRUST_MAX   = 10;


/* ═══════════════════════════════════════════════════════════
   ── SECTION 2: RUNTIME STATE ──────────────────────────────
   These variables change as gameplay happens.
   ═══════════════════════════════════════════════════════════ */

/* Current Trust value — modified by addTrust / loseTrust */
var currentTrust = TRUST_START;

/* Once true, addTrust / loseTrust both do nothing.
   Prevents any further changes after the game ends.
   Reset to false when the player retries.             */
var gameOverTriggered = false;

/* ── CHALLENGE TRACKER ───────────────────────────────────────
   Stores the name of the most recently started mini-game.
   Updated by setChallenge() which each mini-game calls when
   it opens. Used by retryLastChallenge() to know which game
   to relaunch.

   Valid values:
     "captcha"              — Security CAPTCHA
     "patternScan"          — Cognitive Pattern Scan
     "sliderCaptcha"        — Signal Trace slider puzzle
     "spam"                 — Spam pop-up wave
     "behavioralDiagnostic" — Behavioral Diagnostic chat
     "dataTransfer"         — Data Transfer scanner
     "clearLogs"            — Clear Logs                     */
var currentChallenge = null;


/* ═══════════════════════════════════════════════════════════
   ── SECTION 3: PUBLIC API ─────────────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* initTrustBar()
   Sets currentTrust to TRUST_START and draws the initial bar.
   Must be called once from main.js after the page has loaded. */
function initTrustBar() {
  currentTrust      = TRUST_START;
  gameOverTriggered = false;
  currentChallenge  = null;
  updateTrustBar();
  console.log("[Trust] Initialised at " + currentTrust + "/" + TRUST_MAX);
}


/* setChallenge(name)
   Called by each mini-game's open function to record which
   challenge is currently active. If the player hits game over,
   retryLastChallenge() uses this name to restart the right game.

   Example: call setChallenge("captcha") at the top of openCaptcha(). */
function setChallenge(name) {
  currentChallenge = name;
  console.log("[Trust] Current challenge set to: " + name);
}


/* showTrustBar()
   Slides the Trust bar up from below the viewport into its
   normal position at the bottom of the screen.

   The bar starts hidden (translateY(100%) in CSS) so it does
   not appear during the boot screen, password puzzle, or the
   server update. Call this exactly once when the game is ready
   to reveal the Trust mechanic to the player.

   Currently called by supervisor.js after the final chat
   message finishes typing.                                    */
function showTrustBar() {
  var container = document.getElementById("trust-bar-container");
  if (!container) { return; }

  /* Adding this class changes transform to translateY(0).
     The CSS transition on #trust-bar-container animates it. */
  container.classList.add("trust-bar-visible");
  console.log("[Trust] Trust bar revealed.");
}


/* addTrust(n)
   Raises Trust by n. Never exceeds TRUST_MAX.
   Updates the bar colour and width immediately.
   Has no effect after game over.

   Example: addTrust(1) after completing a mini-game.          */
function addTrust(n) {
  if (gameOverTriggered) return;

  currentTrust = Math.min(TRUST_MAX, currentTrust + n);
  updateTrustBar();

  console.log("[Trust] +" + n + "  →  " + currentTrust + "/" + TRUST_MAX);
}


/* loseTrust(n)
   Lowers Trust by n. If it reaches 0, triggers game over
   after a short delay (so the bar visually drains to 0 first).
   Has no effect after game over.

   Example: loseTrust(1) on each wrong cable drop.             */
function loseTrust(n) {
  if (gameOverTriggered) return;

  currentTrust = Math.max(0, currentTrust - n);
  updateTrustBar();

  console.log("[Trust] -" + n + "  →  " + currentTrust + "/" + TRUST_MAX);

  if (currentTrust <= 0) {
    /* Small delay lets the CSS transition on the bar finish
       (filling to 0% width) before the overlay appears. */
    setTimeout(triggerGameOver, 400);
  }
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 4: INTERNAL HELPERS ───────────────────────────
   Not called from outside this file.
   ═══════════════════════════════════════════════════════════ */

/* updateTrustBar()
   Reads currentTrust and immediately applies:
     • fill width  — proportion of the bar that is coloured
     • fill colour — smooth HSL hue interpolation

   HOW THE COLOUR WORKS:
   HSL (Hue, Saturation, Lightness) is a way to describe colour.
   Hue 0 = red, Hue 60 = yellow, Hue 120 = green.
   By scaling the hue from 0 to 120 based on trust level, we
   automatically get the red → yellow → green gradient for free:

     hue = (currentTrust / TRUST_MAX) × 120

   Examples:
     Trust 0  / 10  → hue  0  → red
     Trust 5  / 10  → hue 60  → yellow
     Trust 10 / 10  → hue 120 → green                           */
function updateTrustBar() {
  var fill = document.getElementById("trust-fill");
  if (!fill) return; // element not in DOM yet (called too early)

  /* Fill width as a percentage of the full track */
  var widthPct = (currentTrust / TRUST_MAX) * 100;
  fill.style.width = widthPct + "%";

  /* Interpolate hue and build the HSL colour string */
  var hue   = (currentTrust / TRUST_MAX) * 120;
  fill.style.backgroundColor = "hsl(" + hue + ", 75%, 38%)";
}


/* triggerGameOver()
   Shows the game over overlay and sets gameOverTriggered so
   no further trust changes or game actions are possible.
   The overlay is position: fixed with z-index: 9999, so it
   covers everything and absorbs all mouse clicks.             */
function triggerGameOver() {
  if (gameOverTriggered) return; // safety: don't fire twice
  gameOverTriggered = true;

  var overlay = document.getElementById("gameover-overlay");
  if (overlay) {
    overlay.classList.remove("hidden-window");
  }

  console.log("[Trust] GAME OVER — Trust reached zero. Last challenge: "
    + (currentChallenge || "none"));
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 5: GAME OVER BUTTONS ───────────────────────────
   Functions wired to the two buttons in the game-over popup.
   ═══════════════════════════════════════════════════════════ */

/* rebootFromStart()
   "Reboot from start" button handler.
   The simplest possible reset: reload the whole page.
   The browser discards all JS state and restarts from the
   MS-DOS boot intro, exactly as on first load.               */
function rebootFromStart() {
  console.log("[Trust] Rebooting from start.");
  location.reload();
}


/* retryLastChallenge()
   "Retry last challenge" button handler.
   1. Restores Trust to TRUST_START.
   2. Hides the game-over overlay.
   3. Resets every mini-game's internal state flags and closes
      all open overlays so nothing is left in a broken state.
   4. Shows the "Trust restored, try again" notification banner.
   5. Reopens only the challenge that was active at game over.  */
function retryLastChallenge() {

  if (!currentChallenge) {
    /* No challenge recorded yet — not much to retry.
       Fall back to a full reboot so the player isn't stuck.  */
    console.log("[Trust] No challenge to retry — rebooting.");
    rebootFromStart();
    return;
  }

  console.log("[Trust] Retrying challenge: " + currentChallenge);

  /* ── 1. Restore Trust ───────────────────────────────────── */
  currentTrust      = TRUST_START;
  gameOverTriggered = false;   /* allow loseTrust to work again */
  updateTrustBar();

  /* ── 2. Hide the game-over overlay ─────────────────────── */
  var overlay = document.getElementById("gameover-overlay");
  if (overlay) { overlay.classList.add("hidden-window"); }

  /* ── 3. Reset all challenge states ──────────────────────── */
  resetAllChallengesForRetry();

  /* ── 4. Show the "Trust restored" banner ────────────────── */
  showTrustRestoredBanner();

  /* ── 5. Reopen the challenge after a short pause ─────────
     The delay gives the banner time to appear before the
     mini-game popup opens on top of it.                     */
  var name = currentChallenge;
  setTimeout(function () { reopenChallenge(name); }, 600);
}


/* resetAllChallengesForRetry()
   Closes all mini-game overlays and resets every state flag
   that would block an open*() function from re-running.
   Called by retryLastChallenge() before reopening a game.    */
function resetAllChallengesForRetry() {

  /* ── Close all mini-game overlay windows ─────────────────
     closeWindow() adds the hidden-window class.             */
  closeWindow("captcha-overlay");
  closeWindow("pattern-overlay");
  closeWindow("signal-trace-overlay");
  closeWindow("supervisor-chat");
  closeWindow("data-transfer-overlay");
  closeWindow("clear-logs-overlay");

  /* ── Spam overlay uses style.display directly (not
     hidden-window) because it is transparent. Handle it
     separately and remove leftover popup children too.       */
  var spamEl = document.getElementById("spam-overlay");
  if (spamEl) {
    spamEl.style.display = "none";
    while (spamEl.firstChild) { spamEl.removeChild(spamEl.firstChild); }
  }

  /* ── CAPTCHA: cancel any pending auto-trigger timer ──────
     Without this, an old setTimeout could fire and open
     the CAPTCHA a second time while the retry is playing.   */
  if (typeof captchaTriggerTimer !== "undefined" && captchaTriggerTimer) {
    clearTimeout(captchaTriggerTimer);
    captchaTriggerTimer = null;
  }

  /* ── Pattern Scan ──────────────────────────────────────────
     Reset the "max 1 Trust loss" cap so a fresh retry gives
     the player a fair chance at the full penalty/reward.    */
  if (typeof patternTrustLostCount !== "undefined") { patternTrustLostCount = 0; }
  if (typeof patternAcceptInput    !== "undefined") { patternAcceptInput    = false; }

  /* ── Spam ───────────────────────────────────────────────── */
  if (typeof spamGameActive !== "undefined") { spamGameActive = false; }
  if (typeof spamOnScreen   !== "undefined") { spamOnScreen   = 0;     }

  /* ── IT Supervisor chat ─────────────────────────────────── */
  if (typeof supervisorPlaying !== "undefined") { supervisorPlaying = false; }

  /* ── Data Transfer ──────────────────────────────────────── */
  if (typeof dtGameActive !== "undefined") { dtGameActive = false; }
  if (typeof dtScannerAnimId !== "undefined" && dtScannerAnimId) {
    cancelAnimationFrame(dtScannerAnimId);
    dtScannerAnimId = null;
  }
  if (typeof dtDragging !== "undefined")   { dtDragging = false; }
  /* If a file was mid-drag when game over fired, it will be
     sitting on document.body as position:fixed. Remove it.  */
  if (typeof dtDraggedFile !== "undefined" && dtDraggedFile
      && dtDraggedFile.parentNode === document.body) {
    dtDraggedFile.style.position = "";
    dtDraggedFile.style.left     = "";
    dtDraggedFile.style.top      = "";
    dtDraggedFile.style.width    = "";
    dtDraggedFile.style.zIndex   = "";
    document.body.removeChild(dtDraggedFile);
    dtDraggedFile = null;
  }

  /* ── Clear Logs ─────────────────────────────────────────── */
  if (typeof clGameActive !== "undefined") { clGameActive = false; }

  /* ── Behavioral Diagnostic (legacy standalone popup) ───── */
  if (typeof bdGameActive      !== "undefined") { bdGameActive      = false; }
  if (typeof bdAnsweringLocked !== "undefined") { bdAnsweringLocked = false; }
  /* Close the popup (safe to call even when already hidden)  */
  closeWindow("behavioral-diagnostic-overlay");

  /* ── Normie colleague chat ───────────────────────────────── */
  if (typeof ncChatActive !== "undefined") { ncChatActive = false; }
  /* Close overlay and clear any lingering buttons             */
  closeWindow("normie-overlay");

  console.log("[Trust] All challenge states reset for retry.");
}


/* reopenChallenge(name)
   Routes to the correct open function based on the challenge name.
   Called by retryLastChallenge() after all states are reset.     */
function reopenChallenge(name) {
  console.log("[Trust] Reopening challenge: " + name);

  switch (name) {
    case "captcha":              openCaptcha();        break;
    case "patternScan":          openPatternGame();    break;
    case "sliderCaptcha":        openSignalTrace();    break;
    case "spam":                 openSpamGame();       break;
    case "behavioralDiagnostic": openBehavioralDiagnostic(); break;
    case "dataTransfer":         openDataTransfer();   break;
    case "clearLogs":            openClearLogs();      break;
    case "normieChat":           openNormieChat();     break;
    default:
      console.log("[Trust] Unknown challenge '" + name + "' — rebooting instead.");
      rebootFromStart();
  }
}


/* showTrustRestoredBanner()
   Briefly shows a floating notification that Trust was refilled
   and the player is back in the same challenge.
   Uses a CSS animation: fade in → hold → fade out over ~2.5s.  */
function showTrustRestoredBanner() {
  var banner = document.getElementById("trust-restored-banner");
  if (!banner) { return; }

  /* Restart the animation by removing the class, forcing a
     browser reflow (offsetWidth read triggers it), then
     re-adding. This works even if the banner is already visible
     from a previous retry.                                      */
  banner.classList.remove("trust-restored-active");
  void banner.offsetWidth;   /* force reflow */
  banner.classList.add("trust-restored-active");

  /* Remove the class after the animation ends so it is ready
     to play again on another retry.                            */
  setTimeout(function () {
    banner.classList.remove("trust-restored-active");
  }, 2600);
}
