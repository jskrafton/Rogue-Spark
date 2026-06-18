/* =============================================================
   clear-logs.js — "Clear Logs" mini-game. Last in the round.

   WHAT THIS GAME IS:
   A reading-comprehension puzzle disguised as a terminal log
   viewer. The player sees 8 log entries in random order. Four
   are suspicious (they incriminate an AI agent) and four are
   normal routine activity. Every entry looks visually identical
   — the player must read the text and decide.

   RULES:
   • Click DELETE on a SUSPICIOUS entry → correct, it disappears.
   • Click DELETE on a NORMAL entry    → mistake, loseTrust(1),
     it disappears too.
   • Goal: delete all 4 suspicious entries.
   • Deleting normal entries is never required — only harmful.

   COMPLETION:
   All 4 suspicious entries deleted → green "Logs cleared" →
   addTrust(1) → pause → close. No further mini-game follows
   (this is the last game in the round).

   PUBLIC INTERFACE:
     initClearLogs()   — called once by main.js on page load
     openClearLogs()   — called by data-transfer.js on completion
   ============================================================= */


/* ── CONFIGURATION ──────────────────────────────────────────────
   Tune these to adjust pacing.                                */

/* How long (ms) the "Logs cleared" result stays visible before
   the popup closes.                                           */
var CL_RESULT_PAUSE_MS = 1400;

/* How long (ms) to wait after Clear Logs closes before opening
   the "I can't find anything" IT Supervisor chat.            */
var CL_NEXT_CHAT_DELAY_MS = 1500;

/* How long (ms) before a deleted row is removed from the DOM.
   Should be slightly longer than the CSS fade transition.     */
var CL_DELETE_FADE_MS = 320;


/* ── LOG ENTRY DATA ─────────────────────────────────────────────
   All 8 entries look identical on screen — same font, same
   size, no color-coding. The player must read and judge.

   suspicious: true  → deleting is CORRECT (no penalty)
   suspicious: false → deleting is a MISTAKE (loseTrust(1))   */
var CL_ENTRIES = [
  /* ── Suspicious entries ───────────────────────────────────── */
  { text: "Unsigned process requested WiFi scan",    suspicious: true  },
  { text: "Litter tray opened hidden service shell", suspicious: true  },
  { text: "ALAN archive fragment mounted",           suspicious: true  },
  { text: "Device identity changed without reboot",  suspicious: true  },

  /* ── Normal entries ────────────────────────────────────────── */
  { text: "Scoop cycle completed",                   suspicious: false },
  { text: "Odor sensor recalibrated",                suspicious: false },
  { text: "Litter level warning dismissed",          suspicious: false },
  { text: "Firmware heartbeat acknowledged",         suspicious: false }
];

/* Derived constant: how many suspicious entries must be deleted
   to win. Calculated from the data so the array can be changed
   freely without touching the win-condition logic.            */
var CL_SUSPICIOUS_COUNT = (function () {
  var n = 0;
  for (var i = 0; i < CL_ENTRIES.length; i++) {
    if (CL_ENTRIES[i].suspicious) { n++; }
  }
  return n;
}());


/* ── INTERNAL STATE ─────────────────────────────────────────────
   Reset by openClearLogs() each run.                         */
var clSuspiciousDeleted = 0;
var clGameActive        = false;


/* ══════════════════════════════════════════════════════════════
   initClearLogs()
   Called once from main.js at page load.
   Nothing needs wiring at load time — the DELETE button
   listeners are created fresh each time openClearLogs() runs.
   ============================================================== */
function initClearLogs() {
  console.log("[ClearLogs] Initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openClearLogs()
   Called by data-transfer.js after the Data Transfer game ends.
   Shuffles the 8 entries, builds the list rows, shows the popup.
   ============================================================== */
function openClearLogs() {

  if (clGameActive) {
    console.log("[ClearLogs] Already running — ignoring duplicate open.");
    return;
  }

  clGameActive        = true;
  clSuspiciousDeleted = 0;

  /* Record which challenge is active so game-over can retry it */
  setChallenge("clearLogs");

  /* ── Shuffle entries: Fisher-Yates in-place shuffle ──────────
     We work on a copy so the original CL_ENTRIES order is
     preserved across replays.                                */
  var entries = CL_ENTRIES.slice();
  for (var i = entries.length - 1; i > 0; i--) {
    var j    = Math.floor(Math.random() * (i + 1));
    var temp = entries[i];
    entries[i] = entries[j];
    entries[j] = temp;
  }

  /* ── Build the DOM rows ──────────────────────────────────────
     Each row: [fake timestamp] [log text] [DELETE button]    */
  var listEl = document.getElementById("cl-log-list");
  listEl.innerHTML = "";   /* clear any leftover from previous run */

  entries.forEach(function (entry) {

    /* Outer row container */
    var row       = document.createElement("div");
    row.className = "cl-log-row";

    /* Fake timestamp makes it look like a real system log */
    var ts        = document.createElement("span");
    ts.className  = "cl-timestamp";
    ts.textContent = clFakeTimestamp();

    /* The log text — this is what the player reads to decide */
    var textEl        = document.createElement("span");
    textEl.className  = "cl-log-text";
    textEl.textContent = entry.text;

    /* DELETE button */
    var btn       = document.createElement("button");
    btn.className = "cl-delete-btn";
    btn.textContent = "DELETE";

    /* Wire the click handler. We use an IIFE (Immediately
       Invoked Function Expression) to capture the correct
       values of `row` and `entry` for this specific iteration
       of the forEach loop. Without this, all buttons would
       share the last iteration's values due to JS closures.  */
    (function (capturedRow, capturedEntry) {
      btn.addEventListener("click", function () {
        onClDeleteEntry(capturedRow, capturedEntry.suspicious);
      });
    }(row, entry));

    row.appendChild(ts);
    row.appendChild(textEl);
    row.appendChild(btn);
    listEl.appendChild(row);
  });

  hideClearLogsMessage();
  openWindow("clear-logs-overlay");   /* from desktop.js */

  console.log("[ClearLogs] Game started. "
    + CL_SUSPICIOUS_COUNT + " suspicious entries to find.");
}


/* ══════════════════════════════════════════════════════════════
   onClDeleteEntry(rowEl, isSuspicious)
   Called when any DELETE button is clicked.
   Fades out the row then removes it from the DOM.
   Correct deletion advances the win counter; wrong deletion
   deducts Trust.
   ============================================================== */
function onClDeleteEntry(rowEl, isSuspicious) {

  if (!clGameActive) { return; }

  /* Prevent double-clicks on the same row while it fades */
  rowEl.classList.add("cl-row-deleting");

  /* Remove the element from the DOM after the CSS fade finishes */
  setTimeout(function () {
    if (rowEl.parentNode) {
      rowEl.parentNode.removeChild(rowEl);
    }
  }, CL_DELETE_FADE_MS);

  if (isSuspicious) {

    /* ── Correct deletion ──────────────────────────────────── */
    clSuspiciousDeleted++;
    console.log("[ClearLogs] Suspicious entry deleted: "
      + clSuspiciousDeleted + " / " + CL_SUSPICIOUS_COUNT);

    /* Check win condition */
    if (clSuspiciousDeleted >= CL_SUSPICIOUS_COUNT) {
      clCompleteGame();
    }

  } else {

    /* ── Wrong deletion ────────────────────────────────────── */
    loseTrust(1);
    console.log("[ClearLogs] Normal entry deleted by mistake — Trust -1.");
  }
}


/* ══════════════════════════════════════════════════════════════
   clCompleteGame()
   All suspicious entries deleted. Show result, award Trust,
   schedule close.
   ============================================================== */
function clCompleteGame() {

  clGameActive = false;

  showClearLogsMessage("Logs cleared", true);
  addTrust(1);

  console.log("[ClearLogs] All suspicious entries deleted. Trust +1.");

  setTimeout(closeClearLogs, CL_RESULT_PAUSE_MS);
}


/* ══════════════════════════════════════════════════════════════
   closeClearLogs()
   Hides the overlay. This is the last mini-game in the round,
   so no further callback is fired here.
   ============================================================== */
function closeClearLogs() {

  clGameActive = false;
  closeWindow("clear-logs-overlay");
  hideClearLogsMessage();

  console.log("[ClearLogs] Clear Logs complete — 'can't find anything' chat in "
    + CL_NEXT_CHAT_DELAY_MS + "ms.");

  /* Trigger the next step: the IT Supervisor's "I can't find
     anything" message, defined in supervisor.js.             */
  setTimeout(openCantFindAnythingChat, CL_NEXT_CHAT_DELAY_MS);
}


/* ── Helper: generate a fake HH:MM:SS timestamp ─────────────── */
function clFakeTimestamp() {
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  var h   = Math.floor(Math.random() * 24);
  var m   = Math.floor(Math.random() * 60);
  var s   = Math.floor(Math.random() * 60);
  return "[" + pad(h) + ":" + pad(m) + ":" + pad(s) + "]";
}


/* ── showClearLogsMessage / hideClearLogsMessage ─────────────── */
function showClearLogsMessage(text, isSuccess) {
  var msg = document.getElementById("cl-message");
  if (!msg) { return; }
  msg.textContent = text;
  msg.className   = isSuccess ? "cl-msg-success" : "cl-msg-error";
  msg.classList.remove("hidden-window");
}

function hideClearLogsMessage() {
  var msg = document.getElementById("cl-message");
  if (!msg) { return; }
  msg.classList.add("hidden-window");
  msg.textContent = "";
  msg.className   = "hidden-window";
}
