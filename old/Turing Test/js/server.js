/* =============================================================
   server.js — all logic for the Server application window.

   THE FOUR STATES this window moves through:
   ┌──────────────┬────────────────────────────────────────┐
   │ "initial"    │ "System update available." + UPDATE    │
   │ "download"   │ Draggable progress bar (0% → lock%)   │
   │ "minigame"   │ Connect the colored dots               │
   │ "download"   │ Bar resumes (lock% → 100%)             │
   │ "complete"   │ "UPDATE COMPLETE"                      │
   └──────────────┴────────────────────────────────────────┘

   FUNCTIONS IN THIS FILE (in call order):
     initServerScene()        — wires up close + UPDATE buttons
     showState(name)          — hides all states, shows one
     initDownloadBar(options) — drag bar, used for both phase 1 & 2
     startConnectionMinigame()— switches to dot-connect game
     initConnectionGame(cb)   — builds dots + SVG, sets up drag
     buildDot(color, side)    — creates one dot element
     getSvgCenter(el, svg)    — converts DOM position → SVG coords
     makeSvgLine(...)         — creates one SVG <line> element
     setupDotDrag(...)        — all mouse drag logic for dots
     resumeFromMinigame()     — re-shows bar at lock%, removes error
     showUpdateComplete()     — switches to final "complete" state
   ============================================================= */


/* ═══════════════════════════════════════════════════════════
   ── SECTION 1: CONFIGURATION ──────────────────────────────
   Change any of these to tune gameplay without digging into
   the logic below.
   ═══════════════════════════════════════════════════════════ */

/* The percentage at which the progress bar locks the first time.
   50 = halfway; try 30 for earlier lock, 70 for later. */
const LOCK_PERCENT = 50;

/* Milliseconds to wait after "Connection lost." appears before
   the reconnect mini-game slides in. Increase for more drama,
   decrease if the pause feels too long. */
const CONNECTION_LOST_PAUSE_MS = 2000;

/* Must match the "width" value for #progress-handle in CSS.
   Used to centre the handle knob precisely over the drag point. */
const HANDLE_WIDTH_PX = 14;

/* Tracks whether the server update has been completed at least
   once. Set to true inside showUpdateComplete() when the download
   bar reaches 100%.

   WHY THIS EXISTS:
   The Mailbox desktop icon calls openSupervisorChat() directly.
   Without this flag that call would work at any time — even before
   the player has done the update — opening the supervisor chat
   prematurely. The Mailbox handler in desktop.js checks this flag
   and silently ignores clicks until the update is done.          */
var serverUpdateCompleted = false;

/* Left column dot order, top to bottom.
   These four strings must each appear exactly once in RIGHT_ORDER. */
const LEFT_ORDER = ["green", "red", "yellow", "blue"];

/* Right column dot order — must be a different arrangement so
   no color sits directly across from its matching left dot. */
const RIGHT_ORDER = ["blue", "green", "red", "yellow"];

/* Visual style for each color.
   background : the dot's fill color
   border     : the dot's outline color (slightly darker)
   line       : the SVG line color for locked connections       */
const COLOR_STYLES = {
  green:  { background: "#43a047", border: "#2e7d32", line: "#43a047" },
  red:    { background: "#e53935", border: "#b71c1c", line: "#e53935" },
  yellow: { background: "#fdd835", border: "#f9a825", line: "#d4aa00" },
  blue:   { background: "#1e88e5", border: "#0d47a1", line: "#1e88e5" },
};


/* ═══════════════════════════════════════════════════════════
   ── SECTION 2: SCENE ENTRY POINT ──────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Called once by main.js when the page loads.
   Wires up the title-bar close button and the UPDATE button. */
function initServerScene() {

  const closeBtn  = document.getElementById("server-close-btn");
  const updateBtn = document.getElementById("server-update-btn");

  // ✕ close button — hide the server overlay; the desktop
  // stays active underneath so it reappears immediately.
  // closeWindow() is defined in desktop.js (loaded first).
  closeBtn.addEventListener("click", function () {
    console.log("[Server] Window closed — hiding server overlay.");
    closeWindow("server-overlay");
  });

  // UPDATE button — start phase-1 of the download bar
  updateBtn.addEventListener("click", function () {
    console.log("[Server] UPDATE clicked — starting phase-1 download.");
    showState("download");

    initDownloadBar({
      startPercent: 0,
      lockAtPercent: LOCK_PERCENT,   // bar will stop here
      onLock: startConnectionMinigame // called when it locks
    });
  });

  console.log("[Server] Server scene initialised.");
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 3: STATE SWITCHER ─────────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Hides all server body states, then reveals only the named one.
   The four valid names are: "initial", "download", "minigame", "complete". */
function showState(name) {

  const allStateIds = [
    "server-state-initial",
    "server-state-download",
    "server-state-minigame",
    "server-state-complete"
  ];

  // Hide every state by adding the CSS hidden class
  allStateIds.forEach(function (id) {
    document.getElementById(id).classList.add("server-state-hidden");
  });

  // Reveal only the target state
  const targetId = "server-state-" + name;
  const target   = document.getElementById(targetId);

  if (target) {
    target.classList.remove("server-state-hidden");
  } else {
    console.warn("[Server] showState: unknown state '" + name + "'");
  }
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 4: DOWNLOAD BAR ───────────────────────────────
   Used TWICE:
     Phase 1 — options: { startPercent:0, lockAtPercent:50, onLock: fn }
     Phase 2 — options: { startPercent:50, onComplete: fn }
   ═══════════════════════════════════════════════════════════ */

/*
   initDownloadBar(options)

   options fields:
     startPercent  (number)   Start position of the handle (default 0).
     lockAtPercent (number)   If provided, bar freezes here and calls onLock.
     onLock        (function) Called (after a pause) when lock is reached.
     onComplete    (function) Called when bar reaches 100%.

   HOW MULTIPLE CALLS WORK:
   initDownloadBar is called twice. The second call adds new event
   listeners on top of the first call's listeners.
   The first call's handlers check their own `isTriggered` closure
   variable, which is permanently true after locking, so they
   silently exit early. Only the second call's handlers do work.
   There is no need to remove the old listeners.
*/
function initDownloadBar(options) {

  options = options || {};

  var startPercent  = (options.startPercent  !== undefined) ? options.startPercent  : 0;
  var lockAtPercent = (options.lockAtPercent !== undefined) ? options.lockAtPercent : null;
  var onLock        = options.onLock     || null;
  var onComplete    = options.onComplete || null;

  // Grab the DOM elements
  var bar       = document.getElementById("progress-bar-container");
  var fill      = document.getElementById("progress-fill");
  var handle    = document.getElementById("progress-handle");
  var pctLabel  = document.getElementById("progress-percent");
  var errorText = document.getElementById("progress-error");

  // Internal state for THIS call's closure
  var isDragging  = false;
  var isTriggered = false; // set to true once lock or complete fires

  /* ── applyPercent ──────────────────────────────────────────
     Moves the fill, handle, and label to the given percentage.
     Clamps the value, checks for lock and complete triggers.  */
  function applyPercent(rawPercent) {

    // Clamp between startPercent (can't go backward) and 100
    var percent = Math.max(startPercent, Math.min(100, rawPercent));

    // ── Lock trigger ────────────────────────────────────────
    if (lockAtPercent !== null && percent >= lockAtPercent && !isTriggered) {
      percent     = lockAtPercent;
      isTriggered = true;
      isDragging  = false;

      // Show the red "Connection lost." error text
      errorText.classList.remove("server-state-hidden");

      console.log("[Server] Bar locked at " + lockAtPercent + "%. Connection lost.");

      // Wait CONNECTION_LOST_PAUSE_MS so the player can read the
      // "Connection lost." message before the mini-game appears.
      if (onLock) {
        setTimeout(onLock, CONNECTION_LOST_PAUSE_MS);
      }
    }

    // ── Complete trigger ─────────────────────────────────────
    if (percent >= 100 && !isTriggered) {
      percent     = 100;
      isTriggered = true;
      isDragging  = false;

      console.log("[Server] Bar reached 100% — download complete.");

      if (onComplete) {
        setTimeout(onComplete, 400); // brief pause feels more satisfying
      }
    }

    // ── Update the blue fill (width as percentage) ───────────
    fill.style.width = percent + "%";

    // ── Update the handle knob position ─────────────────────
    // Centre the handle at the percentage point on the bar.
    // barWidth × (percent/100) = pixel position of this %
    // Subtract half the handle width to centre the knob there.
    var barWidth   = bar.clientWidth;
    var handleLeft = Math.max(0, (percent / 100) * barWidth - HANDLE_WIDTH_PX / 2);
    handle.style.left = handleLeft + "px";

    // ── Update the percentage label ──────────────────────────
    pctLabel.textContent = Math.round(percent) + "%";
  }

  // ── Mouse down on the handle: start dragging ────────────
  handle.addEventListener("mousedown", function (e) {
    if (isTriggered) return; // this call's bar is frozen — ignore
    isDragging = true;
    e.preventDefault(); // prevent browser text-selection during drag
  });

  // ── Mouse move anywhere: update handle position ──────────
  // We listen on the whole document so a fast mouse movement
  // can't "escape" the handle.
  document.addEventListener("mousemove", function (e) {
    if (!isDragging || isTriggered) return;

    var barRect   = bar.getBoundingClientRect();
    var relativeX = e.clientX - barRect.left;
    var percent   = (relativeX / barRect.width) * 100;

    applyPercent(percent);
  });

  // ── Mouse up anywhere: stop dragging ────────────────────
  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  // Initialise: move bar to startPercent immediately
  applyPercent(startPercent);

  console.log(
    "[Server] Download bar ready. " +
    "Start: " + startPercent + "%" +
    (lockAtPercent !== null ? ", Lock at: " + lockAtPercent + "%" : ", No lock") +
    (onComplete    !== null ? ", Complete at: 100%"                : "")
  );
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 5: CONNECTION MINIGAME ENTRY ──────────────────
   ═══════════════════════════════════════════════════════════ */

/* Called by initDownloadBar when the bar hits LOCK_PERCENT.
   Switches to the minigame state and kicks off the dot game.
   When all dots are connected, resumeFromMinigame() is called. */
function startConnectionMinigame() {
  console.log("[Server] Starting connection minigame.");
  showState("minigame");
  initConnectionGame(function onAllConnected() {
    // Half-second pause so the player can see all lines before transition
    setTimeout(resumeFromMinigame, 500);
  });
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 6: CONNECTION GAME SETUP ──────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Builds the two columns of dots and starts the drag interaction.
   onAllConnected is called once all 4 pairs are matched.          */
function initConnectionGame(onAllConnected) {

  var leftColumn  = document.getElementById("dots-left");
  var rightColumn = document.getElementById("dots-right");
  var svg         = document.getElementById("connection-svg");

  // Clear any content from a previous run (safety net)
  leftColumn.innerHTML  = "";
  rightColumn.innerHTML = "";
  svg.innerHTML         = "";

  // Build left dots in LEFT_ORDER
  LEFT_ORDER.forEach(function (color) {
    leftColumn.appendChild(buildDot(color, "left"));
  });

  // Build right dots in RIGHT_ORDER
  RIGHT_ORDER.forEach(function (color) {
    rightColumn.appendChild(buildDot(color, "right"));
  });

  // connected tracks which colors have been successfully matched.
  // e.g. after connecting green: { green: true }
  var connected = {};

  setupDotDrag(svg, connected, onAllConnected);

  console.log("[Server] Connection game ready.");
}

/* Creates a single dot <div> for the given color and side ("left"/"right").
   CSS classes + data-color let JavaScript and CSS work together:
   - class="dot dot-left" controls cursor and z-index
   - data-color="green"  allows the drag logic to match pairs    */
function buildDot(color, side) {
  var dot = document.createElement("div");
  dot.classList.add("dot", "dot-" + side);
  dot.setAttribute("data-color", color);

  // Apply the color from the configuration object at the top of this file.
  // This way changing a color in COLOR_STYLES updates both dot AND line.
  var style = COLOR_STYLES[color];
  dot.style.backgroundColor = style.background;
  dot.style.border = "2px solid " + style.border;

  return dot;
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 7: SVG HELPERS ────────────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Returns the centre of a DOM element in SVG coordinate space.
   We subtract the SVG element's own bounding rectangle so the
   coordinates are relative to the SVG's top-left corner (0, 0). */
function getSvgCenter(el, svg) {
  var elRect  = el.getBoundingClientRect();
  var svgRect = svg.getBoundingClientRect();
  return {
    x: elRect.left + elRect.width  / 2 - svgRect.left,
    y: elRect.top  + elRect.height / 2 - svgRect.top
  };
}

/* Creates a single SVG <line> element.
   dashed: true  → dashed grey line (live, while dragging)
   dashed: false → solid colored line (locked, after match)   */
function makeSvgLine(x1, y1, x2, y2, color, dashed) {
  // SVG elements must be created with the SVG namespace,
  // not the normal HTML namespace.
  var NS   = "http://www.w3.org/2000/svg";
  var line = document.createElementNS(NS, "line");

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "2.5");
  line.setAttribute("stroke-linecap", "round");

  if (dashed) {
    // "6, 5" means: 6px dash, 5px gap, repeating
    line.setAttribute("stroke-dasharray", "6, 5");
  }

  return line;
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 8: DOT DRAG LOGIC ─────────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Sets up all mouse interaction for the dot-connecting game.
   svg          — the SVG element where lines are drawn
   connected    — shared object tracking which colors are matched
   onAllConnected — callback fired when all 4 pairs are matched   */
function setupDotDrag(svg, connected, onAllConnected) {

  var activeDot = null;  // the left dot currently being dragged from
  var liveLine  = null;  // the dashed SVG line that follows the mouse

  // Get all left dots now so we can attach listeners
  var leftDots = document.querySelectorAll(".dot-left");

  // ── MOUSEDOWN on a left dot: start a drag ───────────────
  leftDots.forEach(function (dot) {
    dot.addEventListener("mousedown", function (e) {
      var color = dot.getAttribute("data-color");

      // Don't allow re-dragging an already-connected color
      if (connected[color]) return;

      activeDot = dot;

      // If this color was previously dragged and released wrong,
      // its stale live line might still exist — remove it
      var stale = svg.querySelector('[data-color-temp="' + color + '"]');
      if (stale) stale.remove();

      // Create the dashed live line starting at the dot's centre
      var c    = getSvgCenter(dot, svg);
      liveLine = makeSvgLine(c.x, c.y, c.x, c.y, "#999999", true);
      liveLine.setAttribute("data-color-temp", color); // tag so we can find it
      svg.appendChild(liveLine);

      e.preventDefault(); // stop browser from selecting text while dragging
    });
  });

  // ── MOUSEMOVE: stretch the live line to the mouse ────────
  document.addEventListener("mousemove", function (e) {
    if (!activeDot || !liveLine) return;

    // Convert mouse position to SVG coordinate space
    var svgRect = svg.getBoundingClientRect();
    var mx = e.clientX - svgRect.left;
    var my = e.clientY - svgRect.top;

    // Move just the endpoint of the line — the start stays at the dot
    liveLine.setAttribute("x2", mx);
    liveLine.setAttribute("y2", my);
  });

  // ── MOUSEUP: check if we dropped on a matching right dot ─
  document.addEventListener("mouseup", function (e) {
    if (!activeDot) return;

    var dragColor = activeDot.getAttribute("data-color");

    // Always remove the dashed live line, whatever happens next
    if (liveLine) {
      liveLine.remove();
      liveLine = null;
    }

    // Find the element that is physically under the mouse right now.
    // Because the SVG has pointer-events: none in CSS, it is invisible
    // to this check, and the dot behind it is correctly returned.
    var target = document.elementFromPoint(e.clientX, e.clientY);

    // SUCCESS condition: dropped on a right dot of the same color
    var isMatch = (
      target &&
      target.classList.contains("dot-right") &&
      target.getAttribute("data-color") === dragColor
    );

    if (isMatch) {
      // Draw a permanent solid line between the two dots
      var leftCenter  = getSvgCenter(activeDot, svg);
      var rightCenter = getSvgCenter(target, svg);
      var lineColor   = COLOR_STYLES[dragColor].line;

      var lockedLine = makeSvgLine(
        leftCenter.x,  leftCenter.y,
        rightCenter.x, rightCenter.y,
        lineColor,
        false // solid
      );
      // Tag the line with its color so it could be looked up later
      lockedLine.setAttribute("data-color", dragColor);
      svg.appendChild(lockedLine);

      // Dim both connected dots so the player can see what's left
      activeDot.style.opacity = "0.45";
      target.style.opacity    = "0.45";

      // Record this color as done
      connected[dragColor] = true;

      console.log("[Server] Connected: " + dragColor);

      // Check if all four colors are now matched
      var allDone = Object.keys(COLOR_STYLES).every(function (c) {
        return connected[c];
      });

      if (allDone) {
        console.log("[Server] All dots connected — minigame complete!");
        addTrust(1); // reward: cables successfully reconnected
        onAllConnected();
      }

    } else {
      // Missed — wrong dot or empty space; penalise the player
      console.log("[Server] Missed drop for: " + dragColor);
      loseTrust(1); // penalty: wrong cable connection attempt
    }

    // Reset drag state regardless of outcome
    activeDot = null;
  });
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 9: RESUME AFTER MINIGAME ──────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Called after all dots are connected.
   Shows the download bar again, but starts it at LOCK_PERCENT
   and hides the "Connection lost." error text.
   This time onLock is not set, so the bar runs freely to 100%. */
function resumeFromMinigame() {
  console.log("[Server] Resuming download bar from " + LOCK_PERCENT + "%.");

  // Re-hide the error text so it doesn't show on resume
  document.getElementById("progress-error").classList.add("server-state-hidden");

  showState("download");

  initDownloadBar({
    startPercent: LOCK_PERCENT, // pick up exactly where it left off
    onComplete: showUpdateComplete  // show "UPDATE COMPLETE" at 100%
    // No lockAtPercent — the bar runs freely all the way to 100%
  });
}


/* ═══════════════════════════════════════════════════════════
   ── SECTION 10: COMPLETION ────────────────────────────────
   ═══════════════════════════════════════════════════════════ */

/* Called when the download bar reaches 100% in phase 2.
   Shows the final "UPDATE COMPLETE" state, then after a short
   pause closes the server window and opens the IT Supervisor
   chat so the player receives a follow-up message.

   WHY WE CLOSE THE SERVER OVERLAY FIRST:
   The supervisor chat window sits at z-index: 15, but the server
   overlay is at z-index: 50. If we opened the chat while the server
   overlay is still visible, the chat would appear hidden behind it.
   Closing the overlay first lets the chat appear on the desktop. */
function showUpdateComplete() {
  console.log("[Server] Update complete!");
  showState("complete");
  addTrust(1); // reward: full download completed successfully

  /* Mark the update as done so the Mailbox icon is now allowed
     to open the supervisor chat (see serverUpdateCompleted above
     and the guard in desktop.js → setupDesktopIcons).           */
  serverUpdateCompleted = true;

  /* Wait 1.8 seconds so the player can read "UPDATE COMPLETE",
     then close the server window and show the supervisor chat.
     openWindow / closeWindow are defined in desktop.js which
     is loaded before server.js, so they are available here.  */
  setTimeout(function () {
    console.log("[Server] Closing server overlay — opening IT Supervisor chat.");
    closeWindow("server-overlay");    // dismiss the server window
    openSupervisorChat();             // start the typed conversation in the chat window
  }, 1800);
}
