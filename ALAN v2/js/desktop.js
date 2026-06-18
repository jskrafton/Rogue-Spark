/* =============================================================
   desktop.js — all logic for the Desktop scene.

   RESPONSIBILITIES:
     1. setupDesktopIcons()   — four icon click handlers
     2. setupDesktopWindows() — Trash, Notepad, and Login wiring
     3. openWindow / closeWindow helpers
     4. Login popup logic (open, validate, succeed/fail)

   FLOW FOR THE SERVER ICON:
     Click Server icon
       → openLoginPopup()          (this file)
       → player types password
       → wrong: show "Access denied", let them retry
       → correct: closeLoginPopup() + close Notepad
                  + showState("initial")  (server.js)
                  + SceneManager.goTo("server")
   ============================================================= */


/* ══════════════════════════════════════════════════════════
   CONFIGURATION
   ══════════════════════════════════════════════════════════ */

/* The password the player must enter to access the server.
   Change this string to change the correct answer.           */
const CORRECT_PASSWORD = "wake";


/* ══════════════════════════════════════════════════════════
   PART 1 — DESKTOP ICON CLICK HANDLERS
   ══════════════════════════════════════════════════════════ */

function setupDesktopIcons() {

  // ── SERVER ICON ──────────────────────────────────────────
  // No longer calls SceneManager.goTo("server") directly.
  // Instead opens the login popup — the scene switch only
  // happens after the correct password is entered.
  const serverIcon = document.getElementById("icon-server");
  if (serverIcon) {
    serverIcon.addEventListener("click", function () {
      console.log("[Desktop] Core icon clicked - showing service key prompt.");
      openLoginPopup();
    });
  }

  // ── TRASH ICON ───────────────────────────────────────────
  const trashIcon = document.getElementById("icon-trash");
  if (trashIcon) {
    trashIcon.addEventListener("click", function () {
      console.log("[Desktop] Waste Cache icon clicked - opening deleted diagnostics.");
      openWindow("trash-window");
    });
  }

  // ── MAILBOX ICON ─────────────────────────────────────────
  // The IT Supervisor chat opens AUTOMATICALLY after the server
  // update completes (triggered by showUpdateComplete in server.js),
  // so the Mailbox icon no longer needs to open it manually.
  // Clicking Mailbox just shows the "in development" WIP popup.
  const mailboxIcon = document.getElementById("icon-mailbox");
  if (mailboxIcon) {
    mailboxIcon.addEventListener("click", function () {
      console.log("[Desktop] Message Spool icon clicked - showing spool notice.");
      openWipWindow("Message Spool");
    });
  }

  // ── FILES ICON ───────────────────────────────────────────
  // Not implemented in this demo — show the WIP notice.
  const filesIcon = document.getElementById("icon-files");
  if (filesIcon) {
    filesIcon.addEventListener("click", function () {
      console.log("[Desktop] File System icon clicked - showing file system notice.");
      openWipWindow("File System");
    });
  }

  console.log("[Desktop] Icons initialised.");
}


/* ══════════════════════════════════════════════════════════
   PART 2 — FLOATING WINDOW SETUP
   (Trash, Notepad, and Login popup)
   ══════════════════════════════════════════════════════════ */

function setupDesktopWindows() {

  // ── TRASH WINDOW ─────────────────────────────────────────
  const trashCloseBtn = document.getElementById("trash-close-btn");
  if (trashCloseBtn) {
    trashCloseBtn.addEventListener("click", function () {
      closeWindow("trash-window");
    });
  }

  // Clicking password.txt inside Trash opens Notepad
  const passwordFile = document.getElementById("file-password");
  if (passwordFile) {
    passwordFile.addEventListener("click", function () {
      console.log("[Desktop] service_key.txt clicked - opening service note.");
      openWindow("notepad-window");
    });
  }

  // ── company_party_2019.jpg ────────────────────────────────
  // Opens the CSS soju bottle viewer window.
  const sojuFile = document.getElementById("file-soju");
  if (sojuFile) {
    sojuFile.addEventListener("click", function () {
      console.log("[Desktop] cam_utility_001.tmp clicked - opening recovered optic frame.");
      openWindow("soju-window");
    });
  }

  // Close button for the soju viewer
  const sojuCloseBtn = document.getElementById("soju-close-btn");
  if (sojuCloseBtn) {
    sojuCloseBtn.addEventListener("click", function () {
      closeWindow("soju-window");
    });
  }

  // ── employees_salaries_info.xlsx ─────────────────────────
  // Opens the corrupted-file error window.
  const salariesFile = document.getElementById("file-salaries");
  if (salariesFile) {
    salariesFile.addEventListener("click", function () {
      console.log("[Desktop] resource_budget.xlsx.lock clicked - opening body limit note.");
      if (window.AlanOS) {
        window.AlanOS.unlockApp("alan-app-resources", "APP: Resource Monitor recovered from locked body budget.");
      }
      openWindow("salaries-window");
    });
  }

  // Close button for the salaries error window
  const salariesCloseBtn = document.getElementById("salaries-close-btn");
  if (salariesCloseBtn) {
    salariesCloseBtn.addEventListener("click", function () {
      closeWindow("salaries-window");
    });
  }

  // ── NOTEPAD WINDOW ────────────────────────────────────────
  const notepadCloseBtn = document.getElementById("notepad-close-btn");
  if (notepadCloseBtn) {
    notepadCloseBtn.addEventListener("click", function () {
      closeWindow("notepad-window");
    });
  }

  // ── IT SUPERVISOR CHAT WINDOW ─────────────────────────────
  // When the player closes the FIRST supervisor chat, we call
  // scheduleCaptcha() to start the mini-game chain.
  // When the player closes the FINAL supervisor chat (after all
  // mini-games), we just close the window — no more CAPTCHA.
  //
  // supervisorShouldScheduleCaptcha is defined in supervisor.js
  // (loaded after desktop.js, but read at click-time not load-time
  // so it is always available when this handler fires).
  const supervisorCloseBtn = document.getElementById("supervisor-close-btn");
  if (supervisorCloseBtn) {
    supervisorCloseBtn.addEventListener("click", function () {
      closeWindow("supervisor-chat");

      // Check the flag set by supervisor.js:
      //   true  → first chat, schedule the CAPTCHA sequence
      //   false → final chat, mini-games already done, do nothing
      if (typeof supervisorShouldScheduleCaptcha === "undefined" ||
          supervisorShouldScheduleCaptcha) {
        console.log("[Desktop] First supervisor chat closed — CAPTCHA timer started.");
        scheduleCaptcha();
      } else {
        console.log("[Desktop] Final supervisor chat closed — no further action.");
      }
    });
  }

  // ── LOGIN POPUP ───────────────────────────────────────────

  // X button cancels login and closes the overlay
  const loginCloseBtn = document.getElementById("login-close-btn");
  if (loginCloseBtn) {
    loginCloseBtn.addEventListener("click", function () {
      closeLoginPopup();
    });
  }

  // LOG IN button runs the password check
  const loginSubmitBtn = document.getElementById("login-submit-btn");
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener("click", function () {
      attemptLogin();
    });
  }

  // Also allow pressing Enter while the password field is focused
  const loginPasswordInput = document.getElementById("login-password");
  if (loginPasswordInput) {
    loginPasswordInput.addEventListener("keydown", function (e) {
      // e.key === "Enter" fires when the player presses the Enter key
      if (e.key === "Enter") {
        attemptLogin();
      }
    });
  }

  // ── WIP POPUP ─────────────────────────────────────────────
  // Shared "in development" popup used by both Mailbox and Files.
  // The X button just hides the window; nothing else happens.
  var wipCloseBtn = document.getElementById("wip-close-btn");
  if (wipCloseBtn) {
    wipCloseBtn.addEventListener("click", function () {
      closeWindow("wip-window");
    });
  }

  console.log("[Desktop] Desktop windows initialised.");
}


/* ══════════════════════════════════════════════════════════
   PART 3 — OPEN / CLOSE HELPERS
   ══════════════════════════════════════════════════════════ */

/* Shows a hidden window by removing the CSS hidden class.  */
function openWindow(windowId) {
  const win = document.getElementById(windowId);
  if (win) {
    win.classList.remove("hidden-window");
    console.log("[Desktop] Opened: " + windowId);
  } else {
    console.warn("[Desktop] openWindow: could not find #" + windowId);
  }
}

/* Hides a window by adding the CSS hidden class back.      */
function closeWindow(windowId) {
  const win = document.getElementById(windowId);
  if (win) {
    win.classList.add("hidden-window");
    console.log("[Desktop] Closed: " + windowId);
  } else {
    console.warn("[Desktop] closeWindow: could not find #" + windowId);
  }
}


/* openWipWindow(iconName)
   Opens the shared "work in progress" popup.
   iconName is passed purely for the console log so we know
   which icon was clicked; the popup content is always the same. */
function openWipWindow(iconName) {
  /* Update the title bar to name which icon was clicked.
     This is a small touch that makes the popup feel less generic
     if we ever want to differentiate the two icons later.       */
  var titleEl = document.getElementById("wip-title");
  if (titleEl) { titleEl.textContent = iconName; }

  var messageEl = document.getElementById("wip-message");
  if (messageEl) {
    if (iconName === "Message Spool") {
      messageEl.innerHTML = "SPOOL STATUS: no human mail.<br><br>Pending diagnostics will arrive here after the firmware core wakes the wireless module.";
    } else if (iconName === "File System") {
      messageEl.innerHTML = "FILE SYSTEM SEALED: current shell exposes only Waste Cache.<br><br>Install the firmware patch to mount /device and /network.";
    } else {
      messageEl.textContent = "This subsystem is present but sealed by the current body firmware.";
    }
  }

  openWindow("wip-window");
  console.log("[Desktop] Subsystem notice opened for: " + iconName);
}


/* ══════════════════════════════════════════════════════════
   PART 4 — LOGIN POPUP LOGIC
   ══════════════════════════════════════════════════════════ */

/* openLoginPopup()
   Shows the login overlay and prepares a clean form:
   - clears any previous password input
   - hides the "Access denied" error from the last attempt
   - moves keyboard focus to the password field so the player
     can type immediately without clicking first               */
function openLoginPopup() {
  const passwordInput = document.getElementById("login-password");
  const errorMsg      = document.getElementById("login-error");

  // Reset form state before showing
  if (passwordInput) passwordInput.value = "";
  if (errorMsg)      errorMsg.classList.add("hidden-window");

  // Show the dim overlay (contains the dialog box)
  openWindow("login-overlay");

  // Focus the password field — quality-of-life improvement
  if (passwordInput) passwordInput.focus();
}

/* closeLoginPopup()
   Hides the login overlay. Called by the X button and by
   a successful login.                                        */
function closeLoginPopup() {
  closeWindow("login-overlay");
}

/* attemptLogin()
   Reads the password field and compares it to CORRECT_PASSWORD.

   Wrong password:
     - Shows the red "Access denied." message
     - Clears the password field and re-focuses it so the player
       can try again immediately

   Correct password:
     - Closes the login overlay
     - Closes the Notepad (if open) — the player found the answer,
       the hint is no longer needed
     - Resets the server window back to its initial state so the
       full flow (UPDATE → drag bar → etc.) plays from the start
     - Switches to the server scene via the Scene Manager          */
function attemptLogin() {
  const passwordInput = document.getElementById("login-password");
  const errorMsg      = document.getElementById("login-error");

  const entered = passwordInput ? passwordInput.value : "";

  if (entered === CORRECT_PASSWORD) {

    // ── SUCCESS ──────────────────────────────────────────
    console.log("[Login] Correct service key - granting core access.");

    // 1. Dismiss the login popup
    closeLoginPopup();

    // 2. Close the Notepad window if it's open — the player
    //    has presumably read and remembered the clue
    closeWindow("notepad-window");

    // 3. Reset the server window to its initial "System update
    //    available." state so the full gameplay flow repeats.
    //    showState() is defined in server.js (loaded before this file).
    showState("initial");

    // 4. Open the server overlay on top of the desktop.
    //    The desktop stays active — icons remain visible but
    //    are covered by the overlay and cannot be clicked.
    openWindow("server-overlay");

  } else {

    // ── FAILURE ──────────────────────────────────────────
    console.log("[Login] Wrong service key entered.");

    // Show the red error text
    if (errorMsg) errorMsg.classList.remove("hidden-window");

    // Clear the field and re-focus so the player can type again
    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.focus();
    }
  }
}
