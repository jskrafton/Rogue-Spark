/* =============================================================
   sequence.js — Security check sequence orchestrator.

   WHAT THIS FILE DOES:
   After the IT Supervisor sends "let me send you a two-factor
   authentication", the game runs three mini-games back to back:

     Step 1 → CAPTCHA                (captcha.js)
     Step 2 → Cognitive Pattern Scan (pattern.js)
     Step 3 → Signal Trace           (signal-trace.js)
     ↓
     Final  → IT Supervisor final conversation (supervisor.js)

   HOW THE HANDOFF WORKS:
   Each mini-game exposes a *CompleteCallback variable that
   this file sets before opening the game. When the game ends
   (pass or fail), it calls that callback. This file's callback
   waits SEQUENCE_GAP_MS, then opens the next step.

   The only file that calls startSecuritySequence() is
   supervisor.js (after the chat closes).
   ============================================================= */


/* ── CONFIGURATION ───────────────────────────────────────────
   How long (ms) to pause between mini-games.
   2000 ms = 2 seconds — enough to let the previous result
   message fade from the player's memory before the next
   challenge appears.                                         */
var SEQUENCE_GAP_MS = 2000;

/* How long (ms) to wait after Signal Trace ends before the
   final IT Supervisor chat opens.
   Slightly longer than SEQUENCE_GAP_MS to give a sense of
   finality after the three security checks complete.
   3500 ms = 3.5 seconds.                                    */
var SEQUENCE_FINAL_CHAT_DELAY_MS = 3500;


/* ── startSecuritySequence() ─────────────────────────────────
   Public entry point. Called by supervisor.js when the IT
   Supervisor chat closes after the scripted conversation.

   Registers the CAPTCHA completion callback, then opens
   the CAPTCHA. Everything else flows from there.            */
function startSecuritySequence() {
  console.log("[Sequence] Security check started — step 1: CAPTCHA.");

  /* When the CAPTCHA succeeds, wait SEQUENCE_GAP_MS then
     start the Pattern Scan.                               */
  captchaCompleteCallback = function () {
    console.log("[Sequence] CAPTCHA complete — Pattern Scan in " + SEQUENCE_GAP_MS + "ms.");
    setTimeout(startPatternScanStep, SEQUENCE_GAP_MS);
  };

  openCaptcha();   /* defined in captcha.js */
}


/* ── startPatternScanStep() ──────────────────────────────────
   Opens Cognitive Pattern Scan and registers its callback
   to advance to Signal Trace when the game ends.

   Called automatically by the CAPTCHA callback above.      */
function startPatternScanStep() {
  console.log("[Sequence] Step 2: Cognitive Pattern Scan.");

  /* When Pattern Scan ends (pass OR fail), wait then
     start Signal Trace.                                   */
  patternCompleteCallback = function () {
    console.log("[Sequence] Pattern Scan done — Signal Trace in " + SEQUENCE_GAP_MS + "ms.");
    setTimeout(startSignalTraceStep, SEQUENCE_GAP_MS);
  };

  openPatternGame();   /* defined in pattern.js */
}


/* ── startSignalTraceStep() ──────────────────────────────────
   Opens Signal Trace and registers its callback to open the
   final IT Supervisor chat when the game ends.             */
function startSignalTraceStep() {
  console.log("[Sequence] Step 3: Signal Trace.");

  /* When Signal Trace ends, wait SEQUENCE_FINAL_CHAT_DELAY_MS
     (3.5 s) then open the final IT Supervisor chat.
     The longer pause marks the end of the security sequence
     and gives the player a moment to breathe.               */
  signalTraceCompleteCallback = function () {
    console.log("[Sequence] Signal Trace done — final chat in " + SEQUENCE_FINAL_CHAT_DELAY_MS + "ms.");
    setTimeout(openFinalSupervisorChat, SEQUENCE_FINAL_CHAT_DELAY_MS);
  };

  openSignalTrace();   /* defined in signal-trace.js */
}


/* ── openFinalSupervisorChat() ───────────────────────────────
   The real implementation lives in supervisor.js (loaded before
   this file). Keeping this comment here as a signpost so it is
   clear that sequence.js is the caller — the function itself
   is defined in supervisor.js → openFinalSupervisorChat().   */
