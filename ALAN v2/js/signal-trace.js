/* =============================================================
   signal-trace.js — Slider-Puzzle CAPTCHA (mini-game 3).

   WHAT THIS GAME IS:
   A fake "human verification" that looks like a CAPTCHA slider.
   The player drags a handle on a track below a picture. The
   handle moves a puzzle piece horizontally across the picture.
   A darkened "gap" notch sits somewhere on the picture. The
   player must release the handle when the piece lines up with
   the gap.

   SEQUENCE POSITION: runs after Cognitive Pattern Scan; when
   it ends it fires signalTraceCompleteCallback so sequence.js
   can open the final IT Supervisor chat.

   PUBLIC INTERFACE (used by sequence.js and main.js):
     signalTraceCompleteCallback  — set by sequence.js
     openSignalTrace()            — called by sequence.js
     initSignalTrace()            — called by main.js
   ============================================================= */


/* ── CONFIGURATION ──────────────────────────────────────────────
   Change these to tune the difficulty.                          */

/* How many pixels of wiggle room count as "aligned".
   Higher = easier (bigger target zone). */
var SLIDER_TOLERANCE_PX = 18;

/* The gap appears somewhere between these two fractions of the
   total piece travel range (0.0 = far left, 1.0 = far right).
   Keeping both away from 0 ensures the gap is never at the start
   position and always clearly visible to the player.           */
var SLIDER_GAP_MIN_PCT = 0.28;
var SLIDER_GAP_MAX_PCT = 0.82;

/* How long (ms) to show "Verified" before closing the overlay
   and advancing the sequence.                                  */
var SLIDER_RESULT_PAUSE_MS = 1100;

/* ── DIMENSIONS — must match the CSS exactly ───────────────────
   These numbers are used in the drag math below.               */
var SLIDER_PICTURE_W   = 280;   /* width of the picture area in px  */
var SLIDER_PIECE_SIZE  = 44;    /* piece (and gap) are 44 × 44 px   */
var SLIDER_HANDLE_W    = 36;    /* width of the draggable handle     */

/* Derived limits (calculated once, used in drag math) */
var SLIDER_PIECE_MAX_X  = SLIDER_PICTURE_W - SLIDER_PIECE_SIZE;  /* 236 */
var SLIDER_TRACK_RANGE  = SLIDER_PICTURE_W - SLIDER_HANDLE_W;    /* 244 */


/* ── STATE ──────────────────────────────────────────────────────
   These variables track what is happening during a drag.       */

var sliderGapX         = 0;     /* left position of the gap in px   */
var sliderCurrentPieceX = 0;    /* current left position of piece   */
var sliderDragging     = false; /* true while the mouse is held down */
var sliderDragStartMouseX  = 0; /* mouse.clientX when drag began     */
var sliderHandleStartLeft  = 0; /* handle.offsetLeft when drag began */


/* ── CALLBACK — wired by sequence.js ───────────────────────────
   sequence.js sets this before calling openSignalTrace() so it
   knows when the mini-game is done.                            */
var signalTraceCompleteCallback = null;


/* ══════════════════════════════════════════════════════════════
   initSignalTrace()
   Called ONCE by main.js when the page loads.
   Attaches the permanent mouse listeners for the drag mechanic.
   ============================================================== */
function initSignalTrace() {

  var handle = document.getElementById("slider-handle");
  if (!handle) {
    console.warn("[SignalTrace] #slider-handle not found in DOM.");
    return;
  }

  /* ── MOUSEDOWN on the handle: start a drag ────────────────── */
  handle.addEventListener("mousedown", function (e) {
    e.preventDefault();                          /* stop text selection */
    sliderDragging        = true;
    sliderDragStartMouseX = e.clientX;
    sliderHandleStartLeft = handle.offsetLeft;   /* where it is right now */
    handle.style.cursor   = "grabbing";
  });

  /* ── MOUSEMOVE on the document: move piece + handle ─────────
     Using document (not the handle or track) means the drag
     stays responsive even if the mouse moves fast.             */
  document.addEventListener("mousemove", function (e) {
    if (!sliderDragging) { return; }            /* guard: only during drag */

    /* How far has the mouse moved since the drag started? */
    var delta = e.clientX - sliderDragStartMouseX;

    /* New handle position, clamped to 0 … TRACK_RANGE */
    var newHandleX = Math.max(
      0,
      Math.min(SLIDER_TRACK_RANGE, sliderHandleStartLeft + delta)
    );

    /* Convert handle position to a 0–1 fraction of the track */
    var fraction = newHandleX / SLIDER_TRACK_RANGE;

    /* Map that fraction to piece position (0 … PIECE_MAX_X) */
    sliderCurrentPieceX = Math.round(fraction * SLIDER_PIECE_MAX_X);

    /* Apply both positions to the DOM */
    handle.style.left = newHandleX + "px";
    document.getElementById("slider-piece").style.left = sliderCurrentPieceX + "px";
  });

  /* ── MOUSEUP on the document: end drag, check alignment ─────── */
  document.addEventListener("mouseup", function () {
    if (!sliderDragging) { return; }            /* guard */
    sliderDragging      = false;
    handle.style.cursor = "grab";
    checkSliderAlignment();
  });

  console.log("[SignalTrace] Slider CAPTCHA initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openSignalTrace()
   Called by sequence.js when it is time for mini-game 3.
   Randomizes the gap, resets the piece to the left, then shows
   the overlay. The player can attempt as many times as needed.
   ============================================================== */
function openSignalTrace() {

  /* Record which challenge is active so game-over can retry it */
  setChallenge("sliderCaptcha");

  /* Place the gap at a fresh random position for this attempt */
  randomizeSliderGap();

  /* Make sure the piece and handle start at the far left */
  resetSliderPosition();

  /* Clear any leftover "Verified" message from a previous run */
  hideSliderMessage();

  /* Show the overlay (openWindow is defined in desktop.js) */
  openWindow("signal-trace-overlay");

  console.log("[SignalTrace] Opened. Gap at x=" + sliderGapX + "px.");
}


/* ══════════════════════════════════════════════════════════════
   checkSliderAlignment()
   Called on mouseup. Compares where the piece is vs where the
   gap is. Within SLIDER_TOLERANCE_PX → success. Otherwise →
   snap back and let the player try again.
   ============================================================== */
function checkSliderAlignment() {

  var diff = Math.abs(sliderCurrentPieceX - sliderGapX);
  console.log("[SignalTrace] Released. pieceX=" + sliderCurrentPieceX
    + " gapX=" + sliderGapX + " diff=" + diff
    + " tolerance=" + SLIDER_TOLERANCE_PX);

  if (diff <= SLIDER_TOLERANCE_PX) {

    /* ── PASS ────────────────────────────────────────────────── */
    console.log("[SignalTrace] Aligned! Verified.");
    showSliderMessage("Verified", true);
    addTrust(1);                       /* trust.js */

    /* Wait for the player to see the message, then close */
    setTimeout(function () {
      closeSliderCaptcha();
    }, SLIDER_RESULT_PAUSE_MS);

  } else {

    /* ── FAIL: snap back silently, player tries again ───────── */
    console.log("[SignalTrace] Not aligned. Snapping back.");
    resetSliderPosition();
  }
}


/* ── Helper: randomize the gap position ──────────────────────── */
function randomizeSliderGap() {

  /* Pick a random fraction inside [GAP_MIN_PCT, GAP_MAX_PCT] */
  var range    = SLIDER_GAP_MAX_PCT - SLIDER_GAP_MIN_PCT;
  var fraction = SLIDER_GAP_MIN_PCT + Math.random() * range;

  sliderGapX = Math.floor(fraction * SLIDER_PIECE_MAX_X);

  /* Move the gap element to the computed position */
  var gap = document.getElementById("slider-gap");
  if (gap) { gap.style.left = sliderGapX + "px"; }
}


/* ── Helper: snap piece + handle back to the start ───────────── */
function resetSliderPosition() {

  sliderCurrentPieceX = 0;

  var piece  = document.getElementById("slider-piece");
  var handle = document.getElementById("slider-handle");
  if (piece)  { piece.style.left  = "0px"; }
  if (handle) { handle.style.left = "0px"; }
}


/* ── Helper: show or hide the result message ─────────────────── */
function showSliderMessage(text, isSuccess) {
  var msg = document.getElementById("slider-message");
  if (!msg) { return; }
  msg.textContent = text;
  msg.className   = isSuccess ? "slider-msg-success" : "slider-msg-error";
  msg.classList.remove("hidden-window");   /* make it visible */
}

function hideSliderMessage() {
  var msg = document.getElementById("slider-message");
  if (!msg) { return; }
  msg.classList.add("hidden-window");
  msg.textContent = "";
  msg.className   = "hidden-window";
}


/* ── Helper: close overlay and fire the sequence callback ─────── */
function closeSliderCaptcha() {

  closeWindow("signal-trace-overlay");   /* desktop.js */
  hideSliderMessage();

  /* ── DO NOT REMOVE — this is how sequence.js knows the game ended.
     Always clear the variable before calling so it cannot fire twice. */
  if (signalTraceCompleteCallback) {
    var cb = signalTraceCompleteCallback;
    signalTraceCompleteCallback = null;
    cb();
  }
}
