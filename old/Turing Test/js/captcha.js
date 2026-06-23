/* =============================================================
   captcha.js — the "Security Verification" CAPTCHA mini-game.

   WHAT THIS FILE DOES:
   This is the signature mechanic of the whole game. A popup
   appears in the centre of the screen asking the player to
   "select all squares with a cat". It looks like a real internet
   CAPTCHA, but has a twist: if you click VERIFY too quickly, you
   are flagged as a bot and lose Trust.

   HOW IT FITS IN:
   - The IT Supervisor chat window (opened via the Mailbox icon)
     triggers this CAPTCHA a few seconds after it is closed.
   - On success  → addTrust(1), popup closes automatically.
   - On failure  → loseTrust(1), grid reshuffles, player tries again.
   - addTrust / loseTrust come from trust.js (loaded before this file).

   FLOW:
     Mailbox icon clicked
       → IT Supervisor chat window opens
           → player closes chat
               → CAPTCHA_TRIGGER_DELAY_MS timer starts
                   → openCaptcha() is called
                       → player solves (or fails) the CAPTCHA
   ============================================================= */


/* ── CONFIGURATION VARIABLES ─────────────────────────────────
   Change these numbers to tune the mini-game.                 */

/* Minimum real time (in milliseconds) the player must wait before
   clicking VERIFY. Below this threshold, the answer is flagged
   as "bot-like" even if it is correct.
   2500 ms = 2.5 seconds.                                      */
var CAPTCHA_MIN_HUMAN_TIME_MS = 2500;

/* The grid is CAPTCHA_GRID_SIZE × CAPTCHA_GRID_SIZE tiles.
   3 means a 3×3 grid (9 tiles total).                         */
var CAPTCHA_GRID_SIZE = 3;

/* How many tiles can show a cat — the game picks a random count
   between these two values each time the grid is built.       */
var CAPTCHA_CAT_MIN = 2;
var CAPTCHA_CAT_MAX = 4;

/* How many milliseconds to wait after the IT Supervisor chat
   is closed before the CAPTCHA pops up.
   3000 ms = 3 seconds.                                        */
var CAPTCHA_TRIGGER_DELAY_MS = 3000;

/* How long (ms) to show the result message before:
   - On failure: reshuffling the grid so the player can try again.
   - On success: closing the popup.                            */
var CAPTCHA_RESULT_PAUSE_MS = 1400;


/* ── EMOJI POOLS ──────────────────────────────────────────────
   CAT_EMOJI  — shown on "correct" tiles.
   DECOY_ANIMALS — shown on all other tiles. Add or remove
   entries here to change which decoy animals appear.         */
var CAT_EMOJI = "🐱";

var DECOY_ANIMALS = [
  "🐶", // dog
  "🦊", // fox
  "🐦", // bird
  "🐸", // frog
  "🐭", // mouse
  "🐻", // bear
  "🐼", // panda
  "🦁", // lion
  "🐰", // rabbit
  "🐹"  // hamster
];


/* ── SEQUENCE CALLBACK ────────────────────────────────────────
   Set by sequence.js before calling openCaptcha().
   Fired inside closeCaptcha() when the player passes so the
   sequence manager knows CAPTCHA is done and can start the
   next mini-game.

   Only fires on SUCCESS (the sequence only advances when the
   player passes; on failure the grid resets and they try again
   until they get it right or Trust hits 0).                  */
var captchaCompleteCallback = null;


/* ── INTERNAL STATE ───────────────────────────────────────────
   These variables track the current state of the CAPTCHA.
   They are reset each time a new grid is built.              */

/* Which tile indices (0 to GRID_SIZE²-1) contain cats.
   Set by buildCaptchaGrid() so verifyCaptcha() can check them. */
var captchaCatPositions = [];

/* The exact timestamp when the current grid was shown.
   Used to calculate how long the player took to click VERIFY. */
var captchaOpenedAt = 0;

/* ID of the pending setTimeout that will call openCaptcha().
   Stored so we can cancel it if the player re-opens the chat
   before the timer fires (avoids stacking multiple triggers). */
var captchaTriggerTimer = null;


/* ── initCaptcha() ────────────────────────────────────────────
   Called once from main.js when the page loads.
   Wires up the VERIFY button's click handler.
   The actual grid is not built until openCaptcha() is called. */
function initCaptcha() {
  var verifyBtn = document.getElementById("captcha-verify-btn");
  if (!verifyBtn) {
    console.error("[Captcha] #captcha-verify-btn not found in HTML.");
    return;
  }

  verifyBtn.addEventListener("click", function () {
    console.log("[Captcha] VERIFY clicked.");
    verifyCaptcha();
  });

  console.log("[Captcha] CAPTCHA system initialised.");
}


/* ── openCaptcha() ────────────────────────────────────────────
   Shows the CAPTCHA popup and builds a fresh grid.
   Called after CAPTCHA_TRIGGER_DELAY_MS from desktop.js
   (triggered when the IT Supervisor chat window closes).    */
function openCaptcha() {
  /* Record which challenge is active so game-over can retry it */
  setChallenge("captcha");
  console.log("[Captcha] Opening CAPTCHA popup.");

  // Hide any leftover result message from a previous attempt
  hideCaptchaMessage();

  // Build a brand-new randomised grid (also resets the timer)
  buildCaptchaGrid();

  // Show the overlay (removes the hidden-window class)
  openWindow("captcha-overlay");
}


/* ── closeCaptcha() ───────────────────────────────────────────
   Hides the CAPTCHA popup and tidies up its state.
   Called automatically on a successful VERIFY.              */
function closeCaptcha() {
  console.log("[Captcha] Closing CAPTCHA popup.");
  closeWindow("captcha-overlay");

  // Clear the grid HTML so it is fresh next time
  var grid = document.getElementById("captcha-grid");
  if (grid) { grid.innerHTML = ""; }

  hideCaptchaMessage();

  /* Notify sequence.js that CAPTCHA is done.
     Clear the variable first to prevent any possibility of
     the callback being triggered twice.                    */
  if (captchaCompleteCallback) {
    var cb = captchaCompleteCallback;
    captchaCompleteCallback = null;
    cb();
  }
}


/* ── buildCaptchaGrid() ───────────────────────────────────────
   Creates a new set of randomised tiles and injects them into
   #captcha-grid in the HTML.

   STEPS:
     1. Pick a random cat count between CAPTCHA_CAT_MIN and MAX.
     2. Assign each tile position either a cat or a random decoy.
     3. Render a <div> for each tile with click-to-select behaviour.
     4. Record the current time so verifyCaptcha() can measure
        how long the player takes.                              */
function buildCaptchaGrid() {
  var grid = document.getElementById("captcha-grid");
  if (!grid) { return; }

  // ── Step 1: clear any existing tiles ──────────────────────
  grid.innerHTML = "";
  captchaCatPositions = [];

  var totalTiles = CAPTCHA_GRID_SIZE * CAPTCHA_GRID_SIZE;

  // ── Step 2: choose a random cat count ─────────────────────
  // Math.random() gives a decimal in [0, 1).
  // Multiply by the range and floor to get a whole number.
  var catCount = CAPTCHA_CAT_MIN +
    Math.floor(Math.random() * (CAPTCHA_CAT_MAX - CAPTCHA_CAT_MIN + 1));

  // ── Step 3: pick which tile positions will be cats ────────
  // Start with an array of all positions [0, 1, 2, ..., totalTiles-1]
  var positions = [];
  for (var i = 0; i < totalTiles; i++) {
    positions.push(i);
  }

  // Shuffle the positions array so cat spots are truly random.
  // Fisher-Yates shuffle: go from end to start, swap each
  // element with a random earlier (or same) position.
  for (var i = positions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = positions[i];
    positions[i] = positions[j];
    positions[j] = temp;
  }

  // The first catCount positions in the shuffled array are cats
  captchaCatPositions = positions.slice(0, catCount);

  // ── Step 4: build an emoji for each tile position ─────────
  for (var tileIndex = 0; tileIndex < totalTiles; tileIndex++) {

    var isCat = (captchaCatPositions.indexOf(tileIndex) !== -1);

    // Pick the emoji for this tile
    var emoji;
    if (isCat) {
      emoji = CAT_EMOJI;
    } else {
      // Random decoy from the pool
      emoji = DECOY_ANIMALS[Math.floor(Math.random() * DECOY_ANIMALS.length)];
    }

    // ── Step 5: create the DOM element ──────────────────────
    var tile = document.createElement("div");
    tile.classList.add("captcha-tile");
    tile.setAttribute("data-index", tileIndex);  // used by verifyCaptcha()
    tile.textContent = emoji;

    // Toggle .selected when clicked (CSS handles the blue highlight)
    tile.addEventListener("click", function () {
      this.classList.toggle("selected");
    });

    grid.appendChild(tile);
  }

  // ── Step 6: record when the grid became visible ───────────
  // verifyCaptcha() subtracts this from Date.now() to get
  // how many milliseconds the player spent on the puzzle.
  captchaOpenedAt = Date.now();

  console.log(
    "[Captcha] Grid built. Cat positions: [" + captchaCatPositions.join(", ") + "]"
  );
}


/* ── verifyCaptcha() ─────────────────────────────────────────
   Runs when the player clicks the VERIFY button.

   THREE POSSIBLE OUTCOMES:
     1. Wrong selection      → red message, loseTrust(1), new grid
     2. Correct but too fast → red message, loseTrust(1), new grid
     3. Correct and slow     → green message, addTrust(1), close popup
                                                                */
function verifyCaptcha() {

  // ── Collect which tiles the player selected ───────────────
  var selectedTiles = document.querySelectorAll(".captcha-tile.selected");
  var selectedIndices = [];
  selectedTiles.forEach(function (tile) {
    selectedIndices.push(parseInt(tile.getAttribute("data-index")));
  });

  // ── Check correctness ─────────────────────────────────────
  // The selection is correct when:
  //   - the number of selected tiles equals the number of cats, AND
  //   - every cat position is among the selected tiles
  // If both conditions are true, no cat was missed and no decoy
  // was selected.
  var isCorrect = (selectedIndices.length === captchaCatPositions.length) &&
    captchaCatPositions.every(function (pos) {
      return selectedIndices.indexOf(pos) !== -1;
    });

  // ── Check timing ──────────────────────────────────────────
  // Date.now() gives the current time in milliseconds.
  // Subtract captchaOpenedAt (set when the grid was built) to
  // get how long the player spent before clicking VERIFY.
  var elapsed = Date.now() - captchaOpenedAt;
  var tookLongEnough = (elapsed >= CAPTCHA_MIN_HUMAN_TIME_MS);

  console.log(
    "[Captcha] Verify — correct: " + isCorrect +
    ", elapsed: " + elapsed + "ms" +
    ", threshold: " + CAPTCHA_MIN_HUMAN_TIME_MS + "ms"
  );

  // ── OUTCOME 1: wrong selection ─────────────────────────────
  if (!isCorrect) {
    showCaptchaMessage("Verification failed", false);
    loseTrust(1);
    // Wait a moment so the player can read the message, then
    // reshuffle the grid and let them try again.
    setTimeout(resetCaptchaGrid, CAPTCHA_RESULT_PAUSE_MS);
    return;
  }

  // ── OUTCOME 2: correct but too fast ───────────────────────
  if (!tookLongEnough) {
    showCaptchaMessage("Bot-like response detected", false);
    loseTrust(1);
    setTimeout(resetCaptchaGrid, CAPTCHA_RESULT_PAUSE_MS);
    return;
  }

  // ── OUTCOME 3: correct AND slow enough — PASS ─────────────
  showCaptchaMessage("Verified", true);
  addTrust(1);
  // Close the popup after a short pause so the player can see
  // the green "Verified" message.
  setTimeout(closeCaptcha, CAPTCHA_RESULT_PAUSE_MS);
}


/* ── resetCaptchaGrid() ───────────────────────────────────────
   Called after a failed VERIFY attempt.
   Hides the result message and builds a fresh grid with new
   random cat positions so the player can try again.          */
function resetCaptchaGrid() {
  hideCaptchaMessage();
  buildCaptchaGrid(); // also resets captchaOpenedAt (timer restarts)
  console.log("[Captcha] Grid reset for new attempt.");
}


/* ── showCaptchaMessage(text, isSuccess) ──────────────────────
   Displays feedback text below the grid.
   isSuccess = true  → green text ("Verified")
   isSuccess = false → red text ("Verification failed", etc.)  */
function showCaptchaMessage(text, isSuccess) {
  var msg = document.getElementById("captcha-message");
  if (!msg) { return; }

  msg.textContent = text;

  // Apply the correct colour class, removing the other first
  msg.classList.remove("captcha-msg-success", "captcha-msg-error");
  msg.classList.add(isSuccess ? "captcha-msg-success" : "captcha-msg-error");

  // Make it visible (remove the hidden-window class)
  msg.classList.remove("hidden-window");
}


/* ── hideCaptchaMessage() ────────────────────────────────────
   Hides the feedback text element.                           */
function hideCaptchaMessage() {
  var msg = document.getElementById("captcha-message");
  if (!msg) { return; }
  msg.classList.add("hidden-window");
  msg.textContent = "";
}


/* ── scheduleCaptcha() ───────────────────────────────────────
   Called by desktop.js when the IT Supervisor chat closes.
   Waits CAPTCHA_TRIGGER_DELAY_MS, then opens the CAPTCHA.

   We cancel any existing pending timer first to prevent
   multiple CAPTCHAs stacking if the player opens and closes
   the chat window more than once.                           */
function scheduleCaptcha() {
  // Cancel any previous pending trigger
  if (captchaTriggerTimer !== null) {
    clearTimeout(captchaTriggerTimer);
    console.log("[Captcha] Previous trigger timer cancelled.");
  }

  console.log(
    "[Captcha] CAPTCHA scheduled in " + CAPTCHA_TRIGGER_DELAY_MS + "ms."
  );

  captchaTriggerTimer = setTimeout(function () {
    captchaTriggerTimer = null; // timer has fired, clear the ID
    openCaptcha();
  }, CAPTCHA_TRIGGER_DELAY_MS);
}
