/* =============================================================
   spam.js — Spam Pop-up Mini-game.

   WHAT THIS GAME IS:
   After the final IT Supervisor conversation ends, a wave of
   10 fake spam advertisements floods the screen one batch at
   a time. The player must close all 10 to proceed.

   HOW IT WORKS:
   • 10 ads live in a pool. The pool is shuffled each game.
   • 3 ads appear on screen at once at random positions.
   • Clicking EITHER the X button OR the call-to-action button
     closes that popup.
   • Each time a popup closes, the next unused ad from the pool
     spawns immediately (so ~3 are always visible).
   • When all 10 have appeared AND all have been closed,
     the screen unlocks and addTrust(1) is called.

   SCREEN LOCK:
   The #spam-overlay div is a transparent full-screen layer
   with z-index: 100. While it is visible it blocks all
   mouse events from reaching the desktop, icons, and any
   other windows below it.

   PUBLIC INTERFACE (used by supervisor.js and main.js):
     initSpamGame()   — called once from main.js on page load
     openSpamGame()   — called by supervisor.js after final chat
   ============================================================= */


/* ── CONFIGURATION ──────────────────────────────────────────────
   Change these to tune the experience.                         */

/* How many popups appear on screen at the same time.          */
var SPAM_CONCURRENT = 3;

/* How long (ms) to wait after all spam ads are closed before
   the IT Supervisor chat opens with the cat-video remark.
   3000 ms = 3 seconds.                                        */
var SPAM_END_CHAT_DELAY_MS = 3000;

/* The 10 spam advertisements in the pool.
   Each entry needs:
     title    — the title bar text (short, with emoji for flavour)
     headline — the main body text (\n becomes a line break)
     cta      — the big button label                            */
var SPAM_ADS = [
  {
    title:    "🌍 URGENT MESSAGE",
    headline: "Prince Adebayo of Zubania has chosen YOU to inherit $47,000,000! Small processing fee applies.",
    cta:      "CLAIM MY MILLIONS"
  },
  {
    title:    "💊 BREAKING SCIENCE",
    headline: "Scientists HATE this pill! It reveals the truth behind the simulation.",
    cta:      "BUY NOW"
  },
  {
    title:    "💋 YOU HAVE A MATCH",
    headline: "Lonely? Meet our newest AI Agent. She is online now and she likes YOU!",
    cta:      "CHAT NOW"
  },
  {
    title:    "⚖️ LEGAL NOTICE",
    headline: "STOP paying your bills! Our lawyers make debt disappear. Call 1-800-FAKE-NUM.",
    cta:      "CALL THE LAWYERS"
  },
  {
    title:    "🎉 CONGRATULATIONS!!!",
    headline: "CONGRATULATIONS! You are visitor 1,000,000. Claim your free iPhone 47!",
    cta:      "CLAIM PRIZE"
  },
  {
    title:    "⚡ SYSTEM ALERT",
    headline: "WARNING! Your computer has 17 viruses. Clean it immediately!",
    cta:      "REMOVE VIRUSES"
  },
  {
    title:    "📈 CRYPTO INSIDER",
    headline: "Turn $5 into $500,000 with this weird crypto trick banks hate!",
    cta:      "INVEST NOW"
  },
  {
    title:    "🥗 MIRACLE DIET",
    headline: "Lose 30kg in 3 days eating only this one kitchen item!",
    cta:      "REVEAL THE SECRET"
  },
  {
    title:    "💰 WORK FROM HOME",
    headline: "Make $9,999 a day from home. No skills needed. Your boss will be furious!",
    cta:      "START EARNING"
  },
  {
    title:    "🚗 IMPORTANT NOTICE",
    headline: "We have been trying to reach you about your car's extended warranty.",
    cta:      "RENEW NOW"
  }
];

/* Tacky body-background colors — one is picked at random for
   each popup to give each ad a different garish look.         */
var SPAM_BG_COLORS = [
  "#fffb00",   /* screaming yellow  */
  "#ff69b4",   /* hot pink          */
  "#00ff7f",   /* lime green        */
  "#ff8c00",   /* dark orange       */
  "#00e5ff",   /* bright cyan       */
  "#ff6347"    /* tomato red        */
];


/* ── INTERNAL STATE ─────────────────────────────────────────────
   These variables track what is happening during a game run.
   They are reset each time openSpamGame() is called so the
   game can replay cleanly if needed.                          */

/* Copy of SPAM_ADS that we pop items from as popups spawn.    */
var spamPool = [];

/* How many popups are currently visible on screen.            */
var spamOnScreen = 0;

/* Guard so openSpamGame() can't be called twice in one run.   */
var spamGameActive = false;


/* ══════════════════════════════════════════════════════════════
   initSpamGame()
   Called once from main.js on page load.
   Nothing to wire up yet; just logs so we know it ran.
   ============================================================== */
function initSpamGame() {
  console.log("[Spam] Spam mini-game initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openSpamGame()
   Called by supervisor.js (SUPERVISOR_SPAM_DELAY_MS after the
   final IT Supervisor chat ends).

   Steps:
   1. Shuffle a fresh copy of SPAM_ADS into spamPool.
   2. Make the #spam-overlay visible — this locks the screen.
   3. Spawn the first SPAM_CONCURRENT popups all at once.
   ============================================================== */
function openSpamGame() {

  /* Guard: if already running, ignore the call. */
  if (spamGameActive) {
    console.log("[Spam] Already running — ignoring duplicate open.");
    return;
  }
  spamGameActive = true;

  /* Record which challenge is active so game-over can retry it */
  setChallenge("spam");
  console.log("[Spam] Starting spam game. Pool size: " + SPAM_ADS.length);

  /* ── Step 1: prepare a fresh shuffled pool ───────────────── */
  spamPool    = shuffleSpamArray(SPAM_ADS.slice());  /* shallow copy, then shuffle */
  spamOnScreen = 0;

  /* ── Step 2: show the transparent blocker overlay ───────────
     This single step locks the screen: the overlay sits at
     z-index 100 and intercepts all pointer events, so the
     desktop icons and windows below it are visible but frozen. */
  var overlay = document.getElementById("spam-overlay");
  overlay.innerHTML = "";          /* clear any leftover popups  */
  overlay.style.display = "block"; /* show overlay = lock screen */

  /* ── Step 3: spawn the first batch of popups ─────────────── */
  var initialCount = Math.min(SPAM_CONCURRENT, spamPool.length);
  for (var i = 0; i < initialCount; i++) {
    spawnSpamPopup();
  }
}


/* ══════════════════════════════════════════════════════════════
   spawnSpamPopup()
   Takes the next ad from spamPool, builds its DOM elements,
   places it at a random screen position, and adds it to the
   overlay. Wires both close buttons.
   ============================================================== */
function spawnSpamPopup() {

  /* Safety: don't spawn if the pool is empty.                 */
  if (spamPool.length === 0) { return; }

  var ad = spamPool.shift();   /* take the first item from the shuffled pool */
  spamOnScreen++;

  var overlay = document.getElementById("spam-overlay");

  /* ── Pick a random garish background color for the body ──── */
  var bgColor = SPAM_BG_COLORS[Math.floor(Math.random() * SPAM_BG_COLORS.length)];

  /* ── Pick a random position that stays within the viewport ──
     We estimate popup width ~210 px and height ~140 px so the
     popup never spawns partially off-screen.                  */
  var maxX = Math.max(20, window.innerWidth  - 230);
  var maxY = Math.max(20, window.innerHeight - 180);
  var posX = Math.floor(Math.random() * (maxX - 20)) + 20;
  var posY = Math.floor(Math.random() * (maxY - 20)) + 20;

  /* ── Build the popup element ─────────────────────────────── */
  var popup = document.createElement("div");
  popup.className = "spam-popup";
  popup.style.left = posX + "px";
  popup.style.top  = posY + "px";

  /* Title bar ─────────────────────────────────────────────── */
  var titlebar = document.createElement("div");
  titlebar.className = "spam-titlebar";

  var titleText = document.createElement("span");
  titleText.className   = "spam-title";
  titleText.textContent = ad.title;

  /* X close button — closes the popup just like the CTA does  */
  var closeBtn = document.createElement("button");
  closeBtn.className   = "spam-x";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", function () {
    closeSpamPopup(popup);
  });

  titlebar.appendChild(titleText);
  titlebar.appendChild(closeBtn);

  /* Body ──────────────────────────────────────────────────── */
  var body = document.createElement("div");
  body.className            = "spam-body";
  body.style.backgroundColor = bgColor;

  var headline = document.createElement("p");
  headline.className = "spam-headline";
  /* Convert \n in the ad text to actual line breaks            */
  headline.innerHTML = ad.headline.replace(/\n/g, "<br>");

  /* CTA button — also closes the popup (same as X)            */
  var ctaBtn = document.createElement("button");
  ctaBtn.className   = "spam-cta";
  ctaBtn.textContent = ad.cta;
  ctaBtn.addEventListener("click", function () {
    closeSpamPopup(popup);
  });

  body.appendChild(headline);
  body.appendChild(ctaBtn);

  /* Assemble and add to overlay ───────────────────────────── */
  popup.appendChild(titlebar);
  popup.appendChild(body);
  overlay.appendChild(popup);

  console.log("[Spam] Spawned: \"" + ad.title + "\"  pool remaining: " + spamPool.length);
}


/* ══════════════════════════════════════════════════════════════
   closeSpamPopup(el)
   Removes one popup from the DOM, then either spawns the next
   one from the pool OR ends the game if everything is done.
   ============================================================== */
function closeSpamPopup(popup) {

  var overlay = document.getElementById("spam-overlay");
  if (popup.parentNode === overlay) {
    overlay.removeChild(popup);
  }

  spamOnScreen--;
  console.log("[Spam] Closed a popup. onScreen=" + spamOnScreen
    + "  poolLeft=" + spamPool.length);

  /* If there are more unused ads in the pool, spawn one now   */
  if (spamPool.length > 0) {
    spawnSpamPopup();

  } else if (spamOnScreen <= 0) {
    /* Pool is empty AND the last popup was just closed → done  */
    endSpamGame();
  }
  /* If spamPool is empty but spamOnScreen > 0, the remaining
     open popups are still counting down. endSpamGame() will be
     called when the last one is closed.                       */
}


/* ══════════════════════════════════════════════════════════════
   endSpamGame()
   Called once all 10 ads have been shown and closed.
   Hides the overlay (unlocks the screen) and awards Trust.
   ============================================================== */
function endSpamGame() {

  spamGameActive = false;
  console.log("[Spam] All 10 ads closed — game complete.");

  /* ── Hide the overlay and remove all children ───────────────
     Setting display:none makes the overlay invisible AND stops
     it from blocking pointer events, so the desktop is fully
     interactive again. innerHTML = "" cleans up the DOM.      */
  var overlay = document.getElementById("spam-overlay");
  overlay.style.display = "none";
  overlay.innerHTML = "";

  /* ── Reward the player for surviving the spam ─────────────── */
  addTrust(1);   /* defined in trust.js */

  console.log("[Spam] Screen unlocked. Trust +1.");

  /* ── Schedule the post-spam IT Supervisor chat ───────────────
     SPAM_END_CHAT_DELAY_MS (3 s) after the screen unlocks, the
     supervisor reopens with one last remark about cat videos.
     openSpamEndChat is defined in supervisor.js (loaded before
     this file) and will exist by the time this timer fires.   */
  setTimeout(openSpamEndChat, SPAM_END_CHAT_DELAY_MS);
}


/* ── shuffleSpamArray(arr) ────────────────────────────────────
   Returns the array with its elements in a random order using
   the Fisher-Yates shuffle algorithm. Does NOT modify the
   original array (we pass in a copy with .slice()).          */
function shuffleSpamArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j   = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i]  = arr[j];
    arr[j]  = tmp;
  }
  return arr;
}
