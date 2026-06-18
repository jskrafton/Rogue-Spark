/* =============================================================
   pattern.js — Cognitive Pattern Scan mini-game.

   WHAT THIS GAME DOES:
   A sequence of 6 random colors flashes across four buttons
   (red, green, blue, yellow) very quickly. The player must
   then click the buttons in the exact same order.

   WHY IT IS HARD ON PURPOSE:
   The flash is deliberately fast (350 ms each) and the
   sequence is long (6 steps). Almost nobody will memorize
   it perfectly. The design intent is that the player fails
   and loses 1 Trust point — but ONLY ever 1 point maximum,
   no matter how many times this game runs.

   TRUST RULE:
   • Correct repeat → addTrust(1)
   • Wrong repeat   → loseTrust(1) AT MOST ONCE per session
     (tracked by patternTrustLostCount vs PATTERN_MAX_TRUST_LOSS)

   SEQUENCE (called by sequence.js):
     openPatternGame() → [game plays] → closePatternGame()
       → patternCompleteCallback() → next mini-game starts
   ============================================================= */


/* ── CONFIGURATION ───────────────────────────────────────────
   Tune these to change difficulty and pacing.                */

/* How long (ms) each button stays brightly lit during the
   system's demonstration. Lower = harder. Try 250–500.      */
var PATTERN_FLASH_MS = 350;

/* Gap (ms) of darkness between consecutive flashes.
   A small gap makes each flash feel distinct.               */
var PATTERN_GAP_MS = 80;

/* How many colors the system shows.
   6 is intentionally hard; lower to make it easier.         */
var PATTERN_SEQUENCE_LENGTH = 6;

/* Maximum Trust points this mini-game can ever deduct in one
   play session, even if it is triggered multiple times.
   Set to 1 so the penalty is always exactly 1 and no more.  */
var PATTERN_MAX_TRUST_LOSS = 1;

/* How long (ms) to display the pass/fail message before the
   popup closes itself.                                       */
var PATTERN_RESULT_PAUSE_MS = 1400;

/* The four colors. These must match the data-color attributes
   on the buttons in index.html.                              */
var PATTERN_COLORS = ["red", "green", "blue", "yellow"];


/* ── INTERNAL STATE ───────────────────────────────────────────
   These are reset/managed by openPatternGame() each time.   */

/* The correct sequence the player must copy.                 */
var patternSequence = [];

/* What the player has clicked so far in the current round.  */
var patternPlayerInput = [];

/* True only while the player is allowed to click buttons.
   False during the system's flash demonstration and after
   the last click while the result is being shown.           */
var patternAcceptInput = false;

/* Counts how many times Trust was deducted from this game.
   Once it reaches PATTERN_MAX_TRUST_LOSS, no more deductions
   happen even if the game is run again in the same session.  */
var patternTrustLostCount = 0;

/* Stores whether the player passed the most recent round.
   Set to true in checkPatternInput() on a correct sequence,
   false on a mismatch. Read by supervisor.js when building
   the final IT Supervisor conversation so the opening line
   ("Well done!" vs "Haha you failed!") reflects the result. */
var patternLastResultPassed = false;

/* Set by sequence.js before calling openPatternGame().
   Called when the game ends (pass OR fail) so the sequence
   can advance automatically to the next mini-game.          */
var patternCompleteCallback = null;


/* ── initPatternGame() ───────────────────────────────────────
   Called once from main.js after the page loads.
   Wires up click handlers for all four colored buttons.     */
function initPatternGame() {

  var buttons = document.querySelectorAll(".pattern-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {

      /* Ignore clicks unless it is the player's input phase. */
      if (!patternAcceptInput) { return; }

      var color = btn.getAttribute("data-color");
      onPatternBtnClick(color);
    });
  });

  console.log("[Pattern] Pattern game initialised.");
}


/* ── openPatternGame() ───────────────────────────────────────
   Public entry point. Called by sequence.js.
   Resets state, shows the overlay, then plays the flash.    */
function openPatternGame() {
  /* Record which challenge is active so game-over can retry it */
  setChallenge("patternScan");
  console.log("[Pattern] Opening Cognitive Pattern Scan.");

  /* Reset for a fresh round */
  patternSequence    = generatePatternSequence();
  patternPlayerInput = [];
  patternAcceptInput = false;

  /* Clear any leftover UI from a previous round */
  hidePatternMessage();
  setPatternStatus("Watch the sequence...");

  /* Show the overlay */
  openWindow("pattern-overlay");   // defined in desktop.js

  /* Brief pause so the window is fully visible before
     the first flash fires.                              */
  setTimeout(function () {
    playFlashSequence(patternSequence, function () {
      /* Flash sequence finished — now it's the player's turn */
      setPatternStatus("Your turn — repeat the sequence.");
      patternAcceptInput = true;
    });
  }, 700);
}


/* ── generatePatternSequence() ───────────────────────────────
   Returns an array of PATTERN_SEQUENCE_LENGTH random colors.
   Colors are picked independently so the same color can
   appear multiple times, making it harder to memorize.      */
function generatePatternSequence() {
  var seq = [];
  for (var i = 0; i < PATTERN_SEQUENCE_LENGTH; i++) {
    var randomIndex = Math.floor(Math.random() * PATTERN_COLORS.length);
    seq.push(PATTERN_COLORS[randomIndex]);
  }
  console.log("[Pattern] Sequence: " + seq.join(", "));
  return seq;
}


/* ── playFlashSequence(sequence, onDone) ─────────────────────
   Steps through the sequence array, lighting each button in
   turn. Calls onDone() after the final flash fades out.

   Uses a recursive inner function so the timing of each
   step depends only on the previous step finishing.        */
function playFlashSequence(sequence, onDone) {

  var index = 0;

  function flashNext() {
    if (index >= sequence.length) {
      onDone();   /* all steps played */
      return;
    }

    var color = sequence[index];
    index++;

    /* Light up the button, then wait for the gap before
       starting the next flash.                          */
    flashOneButton(color, function () {
      setTimeout(flashNext, PATTERN_GAP_MS);
    });
  }

  flashNext();
}


/* ── flashOneButton(color, onDone) ───────────────────────────
   Adds the .lit class to brighten the matching button, waits
   PATTERN_FLASH_MS, removes it, then calls onDone.

   Also fires when the player clicks a button to give visual
   feedback on their selection.                             */
function flashOneButton(color, onDone) {
  var btn = document.querySelector(".pattern-btn[data-color='" + color + "']");
  if (!btn) { if (onDone) { onDone(); } return; }

  btn.classList.add("lit");

  setTimeout(function () {
    btn.classList.remove("lit");
    if (onDone) { onDone(); }
  }, PATTERN_FLASH_MS);
}


/* ── onPatternBtnClick(color) ────────────────────────────────
   Called each time the player taps a button during input.
   Briefly flashes the button for confirmation feedback, adds
   the color to their input array, and checks for completion. */
function onPatternBtnClick(color) {

  patternPlayerInput.push(color);

  /* Flash the button so the player can see their click registered */
  flashOneButton(color, null);

  /* If the player has entered enough colors, check immediately */
  if (patternPlayerInput.length >= PATTERN_SEQUENCE_LENGTH) {
    patternAcceptInput = false;   /* prevent extra clicks */
    setPatternStatus("");
    /* Small delay so the last button's flash is visible before
       the result message appears.                           */
    setTimeout(checkPatternInput, PATTERN_FLASH_MS + 50);
  }
}


/* ── checkPatternInput() ─────────────────────────────────────
   Compares patternPlayerInput against patternSequence.
   Shows the result, updates Trust (with the 1-point cap),
   then schedules closePatternGame().                        */
function checkPatternInput() {

  /* Array.every() returns true only if every element matches */
  var isCorrect = patternSequence.every(function (color, i) {
    return patternPlayerInput[i] === color;
  });

  /* Record the result so supervisor.js can read it later when
     building the final conversation's opening line.          */
  patternLastResultPassed = isCorrect;

  if (isCorrect) {

    /* ── PASS ─────────────────────────────────────────────── */
    console.log("[Pattern] Correct! Trust +1.");
    showPatternMessage("Pattern matched", true);
    addTrust(1);   /* reward: pattern memorized successfully */

  } else {

    /* ── FAIL ─────────────────────────────────────────────── */
    console.log("[Pattern] Mismatch.");
    showPatternMessage("Pattern mismatch", false);

    /* Apply the Trust penalty, but only up to PATTERN_MAX_TRUST_LOSS
       across the entire session. Once the cap is hit, the game
       closing still advances the sequence — it just doesn't
       deduct Trust a second time.                           */
    if (patternTrustLostCount < PATTERN_MAX_TRUST_LOSS) {
      patternTrustLostCount++;
      loseTrust(1);
      console.log("[Pattern] Trust -1 (total deducted this session: " +
        patternTrustLostCount + "/" + PATTERN_MAX_TRUST_LOSS + ").");
    } else {
      console.log("[Pattern] Trust cap reached — no further deduction.");
    }
  }

  /* Close the game after the result message has been visible
     long enough for the player to read it.                 */
  setTimeout(closePatternGame, PATTERN_RESULT_PAUSE_MS);
}


/* ── closePatternGame() ──────────────────────────────────────
   Hides the overlay and fires patternCompleteCallback so the
   sequence manager knows this step is finished.
   Called on both pass and fail — the sequence always advances.*/
function closePatternGame() {
  console.log("[Pattern] Closing pattern game.");
  closeWindow("pattern-overlay");
  hidePatternMessage();

  /* Fire the callback registered by sequence.js.
     Clear it first to prevent it being called twice. */
  if (patternCompleteCallback) {
    var cb = patternCompleteCallback;
    patternCompleteCallback = null;
    cb();
  }
}


/* ── showPatternMessage(text, isSuccess) ─────────────────────
   Displays a result message below the buttons.
   isSuccess true  → green ("Pattern matched")
   isSuccess false → red   ("Pattern mismatch")              */
function showPatternMessage(text, isSuccess) {
  var msg = document.getElementById("pattern-message");
  if (!msg) { return; }

  msg.textContent = text;
  msg.classList.remove("pattern-msg-success", "pattern-msg-error", "hidden-window");
  msg.classList.add(isSuccess ? "pattern-msg-success" : "pattern-msg-error");
}


/* ── hidePatternMessage() ────────────────────────────────────
   Hides the result message element.                          */
function hidePatternMessage() {
  var msg = document.getElementById("pattern-message");
  if (msg) { msg.classList.add("hidden-window"); }
}


/* ── setPatternStatus(text) ──────────────────────────────────
   Updates the status line that tells the player what to do.
   Shown above/below the buttons:
     "Watch the sequence..."      ← during flash demo
     "Your turn — repeat..."      ← during player input
     ""                           ← while result is showing  */
function setPatternStatus(text) {
  var status = document.getElementById("pattern-status");
  if (status) { status.textContent = text; }
}
