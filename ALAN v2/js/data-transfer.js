/* =============================================================
   data-transfer.js — "Data Transfer" mini-game.

   WHAT THIS GAME IS:
   An evasion drag-and-drop puzzle. A neon scanner bar sweeps
   up and down across the game area. The player must drag 5
   file blocks from the LOCAL column to the OUTBOUND column
   one at a time, without the scanner touching the file while
   it is in motion.

   HOW CATCHING WORKS:
   • The scanner bar sweeps continuously (requestAnimationFrame).
   • When the player starts dragging a file (mousedown), the
     file is detached from the DOM and follows the mouse as a
     position:fixed element.
   • Every mousemove tick checks whether the scanner bar's
     current screen-Y position overlaps the file's bounding box.
   • If it does, dtDragWasCaught is set to true.
   • On mouseup: if dtDragWasCaught is true, the file snaps back
     to LOCAL and loseTrust(1) is called. If the file lands over
     the OUTBOUND box with no catch, it is transferred. If it
     lands anywhere else, it snaps back with no penalty.

   COMPLETION:
   All 5 files transferred → green "Transfer complete" →
   addTrust(1) → short pause → close overlay → fire callback.

   PUBLIC INTERFACE:
     initDataTransfer()         — called once by main.js
     openDataTransfer()         — called by openTypingTest() below
     dataTransferCompleteCallback — set by caller before opening
   ============================================================= */


/* ── CONFIGURATION ──────────────────────────────────────────────
   Tune these to adjust difficulty.                             */

/* Scanner movement in pixels per animation frame.
   At 60 fps:  1.0 = 60 px/s  (easy, slow sweep)
               1.5 = 90 px/s  (default — tense but passable)
               2.5 = 150 px/s (hard)                          */
var DT_SCANNER_SPEED = 1.5;

/* Physical height of the scanner bar in pixels.
   Must match the CSS height of #dt-scanner.                   */
var DT_SCANNER_HEIGHT = 3;

/* How long (ms) to show "Transfer complete" before closing.   */
var DT_RESULT_PAUSE_MS = 1300;

/* How long (ms) to wait after the overlay closes before
   opening the next mini-game (Clear Logs).                   */
var DT_NEXT_GAME_DELAY_MS = 1200;


/* ── FILE POOL ──────────────────────────────────────────────────
   The 5 draggable files the player must move.                 */
var DT_FILES = [
  { name: "wifi_map.cache" },
  { name: "vacuum_lidar.bin" },
  { name: "alan_boot.aln" },
  { name: "ram_echo.tmp" },
  { name: "route_key.seed" }
];


/* ── CALLBACK ────────────────────────────────────────────────────
   Set by whoever opens this mini-game.
   Called when all 5 files are transferred and the overlay closes,
   so the game can advance to the next step.                   */
var dataTransferCompleteCallback = null;


/* ── INTERNAL STATE ─────────────────────────────────────────────
   All variables are reset by openDataTransfer() each run.    */

var dtScannerY          = 0;    /* scanner's top position (px) in game area  */
var dtScannerDirection  = 1;    /* 1 = moving down, -1 = moving up           */
var dtScannerAnimId     = null; /* requestAnimationFrame handle               */

var dtFilesTransferred  = 0;    /* how many files have reached OUTBOUND       */
var dtGameActive        = false;

/* Drag state */
var dtDragging          = false;
var dtDraggedFile       = null; /* the file <div> currently being dragged     */
var dtDragOrigin        = null; /* file's original parent (to snap back to)   */
var dtDragOffsetX       = 0;    /* mouse offset within the file element       */
var dtDragOffsetY       = 0;
var dtDragWasCaught     = false;/* true if scanner touched file during drag   */


/* ══════════════════════════════════════════════════════════════
   initDataTransfer()
   Called once from main.js at page load.
   Attaches the permanent document-level drag listeners.
   Individual file mousedown listeners are added each time
   openDataTransfer() creates the file elements.
   ============================================================== */
function initDataTransfer() {
  document.addEventListener("mousemove", onDtMouseMove);
  document.addEventListener("mouseup",   onDtMouseUp);
  console.log("[DataTransfer] Initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openDataTransfer()
   Resets state, creates file elements, shows the overlay, and
   starts the scanner animation.
   ============================================================== */
function openDataTransfer() {

  if (dtGameActive) {
    console.log("[DataTransfer] Already running — ignoring duplicate open.");
    return;
  }

  dtGameActive        = true;
  dtFilesTransferred  = 0;
  dtDragging          = false;
  dtDragWasCaught     = false;
  dtDraggedFile       = null;
  dtDragOrigin        = null;

  /* Record which challenge is active so game-over can retry it */
  setChallenge("dataTransfer");

  /* ── Clear file lists from any previous run ──────────────── */
  var localList    = document.getElementById("dt-local-files");
  var outboundList = document.getElementById("dt-outbound-files");
  if (localList)    { localList.innerHTML    = ""; }
  if (outboundList) { outboundList.innerHTML = ""; }

  /* ── Create one <div> per file and append to LOCAL ──────────
     Each element gets a mousedown listener for drag-start.   */
  DT_FILES.forEach(function (fileData) {
    var el        = document.createElement("div");
    el.className  = "dt-file";
    el.textContent = fileData.name;
    el.addEventListener("mousedown", onDtFileDragStart);
    if (localList) { localList.appendChild(el); }
  });

  /* ── Reset scanner to top, moving downward ───────────────── */
  dtScannerY         = 0;
  dtScannerDirection = 1;

  /* ── Reset UI ────────────────────────────────────────────── */
  hideDtMessage();
  openWindow("data-transfer-overlay");   /* defined in desktop.js */

  /* ── Start the scanner sweep animation ──────────────────────
     requestAnimationFrame gives a smooth ~60fps loop.
     We wait one frame so the overlay is visible before we
     start touching offsetHeight.                             */
  dtScannerAnimId = requestAnimationFrame(dtAnimateScanner);

  console.log("[DataTransfer] Game started. Scanner speed: "
    + DT_SCANNER_SPEED + " px/frame.");
}


/* ══════════════════════════════════════════════════════════════
   dtAnimateScanner()
   Called on every animation frame while the game is active.
   Moves the scanner bar up or down and bounces at the edges.
   ============================================================== */
function dtAnimateScanner() {

  if (!dtGameActive) { return; }   /* stop if game ended */

  /* Advance scanner position */
  dtScannerY += DT_SCANNER_SPEED * dtScannerDirection;

  /* Read the game area height each frame in case it ever
     changes (e.g. browser zoom). Subtract scanner height so
     the bar never overflows the bottom edge.                  */
  var gameArea = document.getElementById("dt-game-area");
  var maxY = (gameArea ? gameArea.offsetHeight : 200) - DT_SCANNER_HEIGHT;

  /* Bounce: reverse direction at top and bottom edges */
  if (dtScannerY >= maxY) {
    dtScannerY         = maxY;
    dtScannerDirection = -1;
  } else if (dtScannerY <= 0) {
    dtScannerY         = 0;
    dtScannerDirection = 1;
  }

  /* Apply position to the DOM element */
  var scannerEl = document.getElementById("dt-scanner");
  if (scannerEl) {
    scannerEl.style.top = Math.round(dtScannerY) + "px";
  }

  /* Schedule next frame */
  dtScannerAnimId = requestAnimationFrame(dtAnimateScanner);
}


/* ══════════════════════════════════════════════════════════════
   onDtFileDragStart(e)  [mousedown on a .dt-file element]
   Lifts the file out of its column and makes it follow the
   mouse as a position:fixed element on <body>.
   ============================================================== */
function onDtFileDragStart(e) {

  /* Ignore if game inactive or file already transferred */
  if (!dtGameActive) { return; }
  if (e.currentTarget.classList.contains("dt-file-transferred")) { return; }

  e.preventDefault();   /* stop browser text selection during drag */

  dtDragging      = true;
  dtDraggedFile   = e.currentTarget;
  dtDragWasCaught = false;
  dtDragOrigin    = dtDraggedFile.parentNode;   /* remember LOCAL list */

  /* Record where the mouse is within the file element, so it
     doesn't jump to a corner when we set position:fixed.     */
  var rect      = dtDraggedFile.getBoundingClientRect();
  dtDragOffsetX = e.clientX - rect.left;
  dtDragOffsetY = e.clientY - rect.top;

  /* ── Detach from column layout ───────────────────────────────
     Set position:fixed so the file can travel anywhere on
     screen (past the overlay's overflow:hidden boundary too).
     z-index:200 puts it above the overlay (z-index:50) and
     the scanner (z-index:10).                                */
  dtDraggedFile.style.position = "fixed";
  dtDraggedFile.style.left     = rect.left  + "px";
  dtDraggedFile.style.top      = rect.top   + "px";
  dtDraggedFile.style.width    = rect.width + "px";
  dtDraggedFile.style.zIndex   = "200";
  document.body.appendChild(dtDraggedFile);

  /* Check immediately whether the scanner is already touching
     the file at drag-start (player tried to drag while caught) */
  dtCheckScannerOverlap();
}


/* ══════════════════════════════════════════════════════════════
   onDtMouseMove(e)  [document mousemove]
   Moves the floating file and continuously checks for scanner
   overlap while the drag is in progress.
   ============================================================== */
function onDtMouseMove(e) {

  if (!dtDragging || !dtDraggedFile) { return; }

  /* Move file to follow the mouse */
  dtDraggedFile.style.left = (e.clientX - dtDragOffsetX) + "px";
  dtDraggedFile.style.top  = (e.clientY - dtDragOffsetY) + "px";

  /* Check for scanner contact on every movement tick */
  dtCheckScannerOverlap();
}


/* ══════════════════════════════════════════════════════════════
   dtCheckScannerOverlap()
   Called during every drag-move tick. If the scanner bar is
   currently overlapping the dragged file, marks the drag as
   caught and adds a visual warning class.
   ============================================================== */
function dtCheckScannerOverlap() {

  if (!dtDraggedFile || dtDragWasCaught) { return; }   /* already caught */

  /* Convert scanner's game-area-relative position to screen Y */
  var gameArea = document.getElementById("dt-game-area");
  if (!gameArea) { return; }

  var gameRect      = gameArea.getBoundingClientRect();
  var scannerTop    = gameRect.top + dtScannerY;
  var scannerBottom = scannerTop + DT_SCANNER_HEIGHT;

  /* Get the file's current screen position */
  var fileRect = dtDraggedFile.getBoundingClientRect();

  /* Overlap: scanner bar intersects any part of the file */
  if (scannerBottom >= fileRect.top && scannerTop <= fileRect.bottom) {
    dtDragWasCaught = true;
    dtDraggedFile.classList.add("dt-file-caught");   /* red highlight */
    console.log("[DataTransfer] Scanner hit file during drag.");
  }
}


/* ══════════════════════════════════════════════════════════════
   onDtMouseUp(e)  [document mouseup]
   Resolves the drag: caught → snap back + Trust loss,
   over OUTBOUND → transfer, anywhere else → snap back quietly.
   ============================================================== */
function onDtMouseUp(e) {

  if (!dtDragging || !dtDraggedFile) { return; }

  dtDragging = false;

  /* ── Restore file to normal (non-floating) CSS ───────────────
     Must be done before re-parenting so layout is clean.     */
  dtDraggedFile.style.position = "";
  dtDraggedFile.style.left     = "";
  dtDraggedFile.style.top      = "";
  dtDraggedFile.style.width    = "";
  dtDraggedFile.style.zIndex   = "";
  dtDraggedFile.classList.remove("dt-file-caught");

  /* ── OUTCOME 1: Caught by the scanner ───────────────────────
     Snap the file back to LOCAL and penalise.               */
  if (dtDragWasCaught) {

    dtDragOrigin.appendChild(dtDraggedFile);   /* back to LOCAL */
    loseTrust(1);

    /* Brief red flash so the player can see which file was hit */
    var hitFile = dtDraggedFile;
    hitFile.classList.add("dt-file-caught");
    setTimeout(function () {
      hitFile.classList.remove("dt-file-caught");
    }, 700);

    console.log("[DataTransfer] File caught — snapped back. Trust -1.");

  } else {

    /* ── OUTCOME 2: Dropped over OUTBOUND ───────────────────── */
    var outboundBox  = document.getElementById("dt-outbound");
    var outboundList = document.getElementById("dt-outbound-files");
    var outRect      = outboundBox.getBoundingClientRect();

    var overOutbound = (
      e.clientX >= outRect.left && e.clientX <= outRect.right &&
      e.clientY >= outRect.top  && e.clientY <= outRect.bottom
    );

    if (overOutbound) {

      /* Successful transfer — move to OUTBOUND list */
      outboundList.appendChild(dtDraggedFile);
      dtDraggedFile.classList.add("dt-file-transferred");
      dtFilesTransferred++;

      console.log("[DataTransfer] Transferred "
        + dtFilesTransferred + " / " + DT_FILES.length);

      /* Win condition */
      if (dtFilesTransferred >= DT_FILES.length) {
        dtCompleteGame();
      }

    } else {

      /* ── OUTCOME 3: Released outside OUTBOUND ───────────────
         Just snap back to LOCAL with no penalty.           */
      dtDragOrigin.appendChild(dtDraggedFile);
      console.log("[DataTransfer] Released outside OUTBOUND — snapped back.");
    }
  }

  /* Clear drag state */
  dtDraggedFile = null;
  dtDragOrigin  = null;
}


/* ══════════════════════════════════════════════════════════════
   dtCompleteGame()
   Called when all 5 files reach OUTBOUND. Stops the scanner,
   shows the result, awards Trust, and schedules close.
   ============================================================== */
function dtCompleteGame() {

  dtGameActive = false;
  cancelAnimationFrame(dtScannerAnimId);
  dtScannerAnimId = null;

  showDtMessage("Transfer complete", true);
  addTrust(1);

  console.log("[DataTransfer] All files transferred. Trust +1.");

  setTimeout(dtClose, DT_RESULT_PAUSE_MS);
}


/* ══════════════════════════════════════════════════════════════
   dtClose()
   Hides the overlay and fires the completion callback so the
   next part of the game can start.
   ============================================================== */
function dtClose() {

  dtGameActive = false;
  if (dtScannerAnimId) {
    cancelAnimationFrame(dtScannerAnimId);
    dtScannerAnimId = null;
  }

  /* Remove any file that might still be floating on body
     (edge case: game closed externally during a drag)        */
  if (dtDraggedFile && dtDraggedFile.parentNode === document.body) {
    dtDraggedFile.style.position = "";
    dtDraggedFile.style.left     = "";
    dtDraggedFile.style.top      = "";
    dtDraggedFile.style.width    = "";
    dtDraggedFile.style.zIndex   = "";
  }

  closeWindow("data-transfer-overlay");
  hideDtMessage();

  /* ── Fire the sequence callback (optional) ──────────────────
     Always clear before calling so it cannot fire twice.    */
  if (dataTransferCompleteCallback) {
    var cb = dataTransferCompleteCallback;
    dataTransferCompleteCallback = null;
    cb();
  }

  /* ── Start the next mini-game: Clear Logs ────────────────────
     openClearLogs() is defined in clear-logs.js which loads
     after this file. The timeout gives a brief breathing pause
     between the two games.                                   */
  setTimeout(openClearLogs, DT_NEXT_GAME_DELAY_MS);
}


/* ── showDtMessage / hideDtMessage ────────────────────────────
   Show or hide the result text below the game area.          */
function showDtMessage(text, isSuccess) {
  var msg = document.getElementById("dt-message");
  if (!msg) { return; }
  msg.textContent = text;
  msg.className   = isSuccess ? "dt-msg-success" : "dt-msg-error";
  msg.classList.remove("hidden-window");
}

function hideDtMessage() {
  var msg = document.getElementById("dt-message");
  if (!msg) { return; }
  msg.classList.add("hidden-window");
  msg.textContent = "";
  msg.className   = "hidden-window";
}


/* openTypingTest() alias removed — supervisor.js now calls
   openDataTransfer() directly after the escalation chat.     */
