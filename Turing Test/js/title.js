/* =============================================================
   title.js — Title screen logic.

   WHAT THIS FILE DOES:
   Handles the single interactive element on the title screen:
   the "BOOT SYSTEM" button. When clicked, it switches from the
   title scene to the boot scene, starting the game proper.

   WHEN IT RUNS:
   initTitleScreen() is called by main.js at page load, after
   the DOMContentLoaded event fires. The title scene must be
   visible at that point (SceneManager.goTo("title") is called
   at the end of main.js's init block).

   WHY JUST ONE FUNCTION:
   The title screen has no game state, no timers, and no
   animations that need JavaScript — those are all handled
   in CSS. All we need is to listen for one button click.
   ============================================================= */


/* initTitleScreen()
   Wires up the "BOOT SYSTEM" button's click handler.
   Safe to call before the scene is visible.              */
function initTitleScreen() {

  var btn = document.getElementById("title-start-btn");

  if (!btn) {
    /* This would only happen if the HTML id was changed.
       Log clearly so it's easy to spot in DevTools.      */
    console.error("[Title] Could not find #title-start-btn in the HTML.");
    return;
  }

  btn.addEventListener("click", function () {

    /* ── Switch to the boot scene first ───────────────────
       SceneManager hides #scene-title and shows #scene-boot. */
    SceneManager.goTo("boot");

    /* ── Now start the typing animation ───────────────────
       startBootSequence() is in boot.js. We call it here,
       AFTER the scene switch, so the player sees the DOS
       window before the first character appears.
       Previously this was called automatically at page load,
       which caused typing to happen invisibly behind the
       title screen.                                        */
    startBootSequence();

    console.log("[Title] BOOT SYSTEM clicked — boot sequence starting.");
  });

  console.log("[Title] Title screen ready.");
}
