/* =============================================================
   sceneManager.js — the "stage director" of the game.

   WHAT THIS FILE DOES:
   Imagine the game as a theatre play. Each scene (boot, desktop,
   server) is a different set that can be rolled on or off stage.
   The Scene Manager keeps track of which set is currently showing
   and swaps them when asked.

   HOW IT WORKS IN THE BROWSER:
   • Every scene is a <div> in the HTML with class "scene".
   • We hide them all by default (display: none in CSS).
   • To "go to" a scene we:
       1. Remove the "active" class from whichever scene is currently showing.
       2. Add the "active" class to the new scene.
   • The CSS rule `.scene.active { display: block; }` does the actual showing.
   ============================================================= */

// ── THE SCENE MANAGER OBJECT ──────────────────────────────────
// We store everything in one object so all the related code
// lives in one place and doesn't clutter the global namespace.

const SceneManager = {

  // ── currentScene ──────────────────────────────────────────
  // Tracks which scene is active right now.
  // Starts as null because no scene has been set yet.
  currentScene: null,

  // ── validScenes ───────────────────────────────────────────
  // A list of all valid scene names.
  // This makes it easy to catch typos and add new scenes later.
  validScenes: ["title", "boot", "desktop", "server"],

  // ── goTo(sceneName) ───────────────────────────────────────
  // Call this function whenever you want to switch scenes.
  // Example: SceneManager.goTo("desktop")
  //
  // sceneName — a string matching one of the validScenes above
  goTo: function (sceneName) {

    // Safety check: warn if someone passes an invalid scene name
    if (!this.validScenes.includes(sceneName)) {
      console.warn(
        "[SceneManager] Unknown scene: '" + sceneName + "'. " +
        "Valid scenes are: " + this.validScenes.join(", ")
      );
      return; // stop here — don't try to show something that doesn't exist
    }

    // ── Step 1: Hide the current scene (if there is one) ────
    if (this.currentScene !== null) {
      // Build the HTML id of the element we want to hide,
      // e.g.  "desktop"  →  "scene-desktop"
      const oldElement = document.getElementById("scene-" + this.currentScene);

      if (oldElement) {
        // Removing "active" triggers the CSS to hide this element
        oldElement.classList.remove("active");
      }
    }

    // ── Step 2: Show the new scene ───────────────────────────
    // Build the HTML id of the element we want to show,
    // e.g.  "server"  →  "scene-server"
    const newElement = document.getElementById("scene-" + sceneName);

    if (newElement) {
      // Adding "active" triggers the CSS to show this element
      newElement.classList.add("active");
    } else {
      // The HTML element is missing — this means index.html and
      // sceneManager.js are out of sync. Log a clear error.
      console.error(
        "[SceneManager] Could not find HTML element with id 'scene-" +
        sceneName + "'. Make sure it exists in index.html."
      );
      return;
    }

    // ── Step 3: Remember what scene is now active ────────────
    this.currentScene = sceneName;

    // Log the transition so we can see it in the browser console
    // (Open DevTools with F12 to see these messages)
    console.log("[SceneManager] Scene changed to: " + sceneName);
  },

  // ── getScene() ────────────────────────────────────────────
  // A helper that returns the name of the currently active scene.
  // Useful for code that needs to know "where are we right now?"
  getScene: function () {
    return this.currentScene;
  }

};
// End of SceneManager object
