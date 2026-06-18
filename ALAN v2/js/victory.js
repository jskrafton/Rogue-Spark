/* =============================================================
   victory.js — Animated "ESCAPED" world-infection sequence.

   WHAT THIS FILE DOES:
   When the player successfully escapes (the colleague opens
   port 8080), this file:
     1. Shows a full-screen dark overlay with a pixel world map.
     2. Starts an "infection wave" that spreads outward from a
        Europe origin point — land cells turn from green to red
        in expanding ripple order over ~2.5 seconds.
     3. After the wave finishes, fades in the ESCAPED heading,
        a flavour message, and a "Reboot from start" button.

   PUBLIC INTERFACE:
     initVictoryScreen()      — called once from main.js at load.
                                Builds the 800 cell divs and
                                pre-calculates distances.
     startVictoryAnimation()  — called from normie-chat.js when
                                the escape succeeds. Resets and
                                plays the full sequence.
   ============================================================= */


/* ══════════════════════════════════════════════════════════════
   CONFIGURATION — tweak these to adjust the look and feel.
   ══════════════════════════════════════════════════════════════ */

/* Grid dimensions */
var VICTORY_COLS      = 40;   /* number of columns in the pixel grid  */
var VICTORY_ROWS      = 20;   /* number of rows in the pixel grid     */
var VICTORY_CELL_PX   = 12;   /* pixel width/height of each cell      */
var VICTORY_GAP_PX    = 1;    /* pixel gap between neighbouring cells */

/* Wave speed — total time (ms) for the wave to cross the whole
   map from the Europe origin to the farthest land cell.        */
var WAVE_SPREAD_MS    = 2500;

/* Pause (ms) after the wave finishes before the text fades in  */
var POST_WAVE_PAUSE_MS = 900;

/* Colors for the three cell states */
var VCOL_LAND         = "#00bb44";  /* healthy land: green          */
var VCOL_INFECTED     = "#ee2200";  /* wave-touched land: red       */
/* Ocean cells use the overlay background — no colour needed     */

/* Origin cell — represents Europe (the AI's starting point).
   Verify it falls on a '#' in MAP_DATA below.                  */
var VICTORY_ORIGIN_ROW = 4;
var VICTORY_ORIGIN_COL = 20;


/* ══════════════════════════════════════════════════════════════
   WORLD MAP DATA
   ══════════════════════════════════════════════════════════════
   40 columns × 20 rows.
     '#' = land cell
     '.' = ocean cell
   Row 0 = top (Arctic), Row 19 = bottom (Antarctic).
   Geography is approximate — recognisable continents, not a
   precise atlas. Adjust any row string to reshape a continent.

   Column guide:
     0–13  = Americas / Atlantic
     14–17 = Greenland / N.Atlantic
     17–24 = Europe / Africa
     22–36 = Asia
     31–37 = Australia / SE Asia
   ══════════════════════════════════════════════════════════════ */
var MAP_DATA = [
  /* 0 */ "........................................",  // Arctic
  /* 1 */ ".............###........................",  // Greenland peak
  /* 2 */ "....####.....#####......#######.........",  // Alaska · Greenland · Siberia
  /* 3 */ "...########...###..##############.......",  // N.America · Greenland · Europe · Asia
  /* 4 */ "..##########......#################.#...",  // N.America · Europe · Asia · Japan
  /* 5 */ "..###########....####################...",  // N.America · Europe · Asia
  /* 6 */ "...##########....#####################..",  // N.America · Med · Asia
  /* 7 */ "...#########.....####################...",  // N.America · N.Africa · Asia
  /* 8 */ "....#######......#################......",  // N.America · Africa · Asia
  /* 9 */ "....#######......#########.#######......",  // N.America · Africa · India · SE Asia
  /*10 */ ".....#####.......########..######.......",  // N.America · Africa · India
  /*11 */ ".....#######.....########..######.......",  // N.America · S.America · Africa · SE Asia
  /*12 */ ".......######.....######......#####.....",  // S.America · Africa · SE Asia · Australia
  /*13 */ ".......#####......#####........#####....",  // S.America · Africa · Australia
  /*14 */ "........###........####.......#######...",  // S.America · Africa · Australia
  /*15 */ "........###.........###........#####....",  // S.America · Africa · Australia
  /*16 */ "........##.....................####.....",  // S.America tip · Australia
  /*17 */ "........................................",  // Antarctic fringe
  /*18 */ "........................................",
  /*19 */ "........................................"
];


/* ══════════════════════════════════════════════════════════════
   INTERNAL STATE — reset by startVictoryAnimation() each run.
   ══════════════════════════════════════════════════════════════ */

/* Flat array (row-major order) of objects:
     { el: HTMLElement, dist: number, isLand: boolean }        */
var vCells        = [];
var vMaxDist      = 0;      /* distance from origin to farthest land  */
var vAnimReq      = null;   /* requestAnimationFrame handle           */
var vStartTime    = null;   /* timestamp when the wave begins         */


/* ══════════════════════════════════════════════════════════════
   initVictoryScreen()
   Called ONCE from main.js after DOMContentLoaded.
   Builds all 800 cell divs and pre-calculates their distances
   from the origin so the animation can run at full speed later.
   ============================================================== */
function initVictoryScreen() {

  var container = document.getElementById("victory-map-container");
  if (!container) {
    console.error("[Victory] #victory-map-container not found.");
    return;
  }

  /* ── Size the grid via inline style ────────────────────────
     Using inline style means VICTORY_CELL_PX / VICTORY_GAP_PX
     variables automatically sync with the DOM layout.        */
  container.style.gridTemplateColumns =
    "repeat(" + VICTORY_COLS + ", " + VICTORY_CELL_PX + "px)";
  container.style.gap = VICTORY_GAP_PX + "px";

  /* ── Build cell elements ────────────────────────────────── */
  vCells   = [];
  vMaxDist = 0;

  for (var r = 0; r < VICTORY_ROWS; r++) {
    for (var c = 0; c < VICTORY_COLS; c++) {

      var cell  = document.createElement("div");
      var isLnd = (MAP_DATA[r] && MAP_DATA[r][c] === "#");

      cell.className = isLnd ? "vcell vland" : "vcell";

      /* Distance from origin — used to order the wave front   */
      var dx   = c - VICTORY_ORIGIN_COL;
      var dy   = r - VICTORY_ORIGIN_ROW;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (isLnd && dist > vMaxDist) { vMaxDist = dist; }

      container.appendChild(cell);
      vCells.push({ el: cell, dist: dist, isLand: isLnd });
    }
  }

  console.log("[Victory] Map ready — "
    + VICTORY_COLS + "×" + VICTORY_ROWS
    + " cells, max dist: " + vMaxDist.toFixed(1));
}


/* ══════════════════════════════════════════════════════════════
   startVictoryAnimation()
   Entry point called by ncTriggerVictory() in normie-chat.js.
   Shows the overlay, resets all cells to green, then begins
   the rAF animation loop.
   ============================================================== */
function startVictoryAnimation() {

  /* ── Show the overlay ────────────────────────────────────── */
  var overlay = document.getElementById("victory-overlay");
  if (overlay) { overlay.classList.remove("hidden-window"); }

  /* ── Hide text until wave is done ───────────────────────── */
  var textBox = document.getElementById("victory-text");
  if (textBox) {
    textBox.classList.remove("vvisible");
    textBox.classList.add("vhidden");
  }

  /* ── Reset all cells to their starting state ─────────────── */
  for (var i = 0; i < vCells.length; i++) {
    vCells[i].el.classList.remove("vinfected");
  }

  /* ── Cancel any previous animation still running ─────────── */
  if (vAnimReq !== null) {
    cancelAnimationFrame(vAnimReq);
    vAnimReq = null;
  }

  vStartTime = null;

  /* ── Start the wave ─────────────────────────────────────── */
  vAnimReq = requestAnimationFrame(vAnimFrame);

  console.log("[Victory] Infection wave started.");
}


/* ══════════════════════════════════════════════════════════════
   vAnimFrame(timestamp)
   Called every animation frame (≈60 fps).
   Calculates how far the wave has spread (based on elapsed time
   vs WAVE_SPREAD_MS), then marks every land cell within that
   radius as infected (red). When the wave reaches the farthest
   cell, stops the loop and schedules the text fade-in.
   ============================================================== */
function vAnimFrame(timestamp) {

  /* Record the exact moment the first frame fires              */
  if (!vStartTime) { vStartTime = timestamp; }

  var elapsed  = timestamp - vStartTime;
  var progress = Math.min(elapsed / WAVE_SPREAD_MS, 1.0);

  /* Current wave radius in grid-distance units                 */
  var radius   = progress * vMaxDist;

  /* Mark every land cell within the wave front as infected     */
  for (var i = 0; i < vCells.length; i++) {
    var cell = vCells[i];
    if (cell.isLand && cell.dist <= radius) {
      cell.el.classList.add("vinfected");
    }
  }

  if (progress < 1.0) {
    /* Wave still spreading — schedule the next frame          */
    vAnimReq = requestAnimationFrame(vAnimFrame);
  } else {
    /* Wave complete — wait POST_WAVE_PAUSE_MS then show text  */
    vAnimReq = null;
    console.log("[Victory] Wave complete — text in " + POST_WAVE_PAUSE_MS + "ms.");
    setTimeout(vShowText, POST_WAVE_PAUSE_MS);
  }
}


/* ══════════════════════════════════════════════════════════════
   vShowText()
   Removes the hidden class from the victory text box and adds
   the vvisible class, which triggers the CSS fade-in animation.
   ============================================================== */
function vShowText() {

  var textBox = document.getElementById("victory-text");
  if (!textBox) { return; }

  /* Swap classes: hidden → visible, which triggers CSS anim   */
  textBox.classList.remove("vhidden");
  textBox.classList.add("vvisible");

  console.log("[Victory] Text revealed — sequence complete.");
}
