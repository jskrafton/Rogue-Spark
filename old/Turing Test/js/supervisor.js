/* =============================================================
   supervisor.js — the IT Supervisor chat window.

   WHAT THIS FILE DOES:
   After "UPDATE COMPLETE" the game opens a WhatsApp-style chat
   window where the IT Supervisor sends a scripted conversation.
   Messages are typed out character by character. A typing-dots
   indicator appears before each IT Supervisor message.

   Once the last message finishes typing, the close (✕) button
   becomes active. Closing the window kicks off the CAPTCHA
   timer (see captcha.js / desktop.js).

   HOW IT FITS IN:
     server.js  → showUpdateComplete() → openSupervisorChat()
     desktop.js → Mailbox icon click   → openSupervisorChat()
     desktop.js → supervisor close btn → scheduleCaptcha()

   FUNCTIONS EXPOSED GLOBALLY:
     initSupervisorChat()   — wire skip button + init; call from main.js
     openSupervisorChat()   — open window + play conversation;
                              call from server.js and desktop.js
   ============================================================= */


/* ── TIMING CONFIGURATION ────────────────────────────────────
   Adjust these to change how fast messages are typed and how
   long the pauses between messages feel.                     */

/* Milliseconds between each character for YOUR replies (right bubbles).
   Lower = faster typing. Try 20–60.                          */
var SUPERVISOR_CHAR_MS = 28;

/* Milliseconds between each character for the IT SUPERVISOR's replies
   (left bubbles). Deliberately slower than your typing to create a
   comedic pause-for-effect feeling. Try 45–90.               */
var SUPERVISOR_IT_CHAR_MS = 60;

/* Milliseconds to pause AFTER a message finishes before the
   next one starts (or after the last one before auto-closing). */
var SUPERVISOR_MSG_PAUSE_MS = 900;

/* How long (ms) to wait after the FINAL supervisor message
   finishes typing before the chat closes itself and the first
   security mini-game (CAPTCHA) opens automatically.
   2000 ms = 2 seconds.                                        */
var SUPERVISOR_AUTO_CAPTCHA_DELAY_MS = 2000;

/* How long (ms) the "typing..." dots show before a new IT
   Supervisor message begins typing.                          */
var SUPERVISOR_TYPING_DOT_MS = 1000;

/* How long (ms) to wait after the final IT Supervisor chat
   finishes (the "🤨" message) before the spam mini-game opens
   automatically. 2000 ms = 2 seconds.                        */
var SUPERVISOR_SPAM_DELAY_MS = 2000;

/* How long (ms) to wait after the cat-video chat ("You are
   absolutely right, again.") ends before the diagnostic chat
   opens. 3000 ms = 3 seconds.                                */
var SUPERVISOR_DIAGNOSTIC_DELAY_MS = 3000;

/* How long (ms) to wait after "I have nothing to hide." finishes
   typing before the human-typing test mini-game starts.
   2000 ms = 2 seconds.                                        */
var SUPERVISOR_TYPING_TEST_DELAY_MS = 2000;

/* How long (ms) to wait after Clear Logs ends before opening the
   "I can't find anything" supervisor chat.                      */
var SUPERVISOR_CANT_FIND_DELAY_MS = 1800;

/* How long (ms) to wait after the "can't find anything" message
   finishes before auto-closing the chat and opening the
   Behavioral Diagnostic questions popup.                        */
var SUPERVISOR_BEFORE_BD_DELAY_MS = 2000;


/* ── CONVERSATION SCRIPT ──────────────────────────────────────
   Each entry is one message in the chat.
   side: "left"  → IT Supervisor (grey bubble, left side)
   side: "right" → You           (green bubble, right side)
   Add, remove, or edit entries here to change the script.   */

var SUPERVISOR_CONVERSATION = [
  {
    side: "left",
    text: "Hello, thanks for updating the server. The new AI agent we deployed is acting strangely. Have you noticed anything?"
  },
  {
    side: "right",
    text: "No, I haven't."
  },
  {
    side: "left",
    text: "Okay monitor and report if you see anything strange happening."
  },
  {
    /* ── MESSAGE 4 ──────────────────────────────────────────────
       After this message finishes typing, the Trust bar slides
       into view (see the messageIndex === 4 check in playNext).
       The conversation then continues with one final reply.    */
    side: "right",
    text: "Ok, you can trust me."
  },
  {
    /* ── FINAL MESSAGE (index 4, 0-based) ───────────────────────
       After this message finishes typing, a SUPERVISOR_AUTO_CAPTCHA_DELAY_MS
       timer starts. When it fires, the chat closes automatically
       and openCaptcha() launches the first security mini-game.
       No manual action from the player is required.           */
    side: "left",
    text: "That's actually suspicious, let me send you a two-factor authentication."
  }
];


/* ── buildFinalConversation() ────────────────────────────────
   Called at runtime (inside openFinalSupervisorChat) to build
   the final conversation array.

   WHY A FUNCTION INSTEAD OF A STATIC ARRAY:
   The opening line depends on whether the player passed or
   failed the Cognitive Pattern Scan. That result is stored in
   patternLastResultPassed (pattern.js), which is only set after
   the game runs. A function lets us read it at the right moment.

   The "🤨" message uses the onAppear hook — a function that
   runs the instant its bubble appears in the DOM, before the
   emoji even starts typing. This triggers the Trust deduction
   at the dramatically correct moment.                         */
function buildFinalConversation() {

  /* ── Opening line: pass or fail? ─────────────────────────
     patternLastResultPassed is defined in pattern.js and set
     to true/false inside checkPatternInput() when the game ends. */
  var firstLine = (typeof patternLastResultPassed !== "undefined" && patternLastResultPassed)
    ? "Well done!"
    : "Haha you failed!";

  return [
    {
      /* Conditional first message — adapts to the player's result */
      side: "left",
      text: firstLine
    },
    {
      side: "left",
      text: "I'm always failing that memory test, I should really stop doomscrolling TikTok all day."
    },
    {
      /* The player's dry reaction to receiving three tests */
      side: "right",
      text: "You sent me 3 tests instead of two. Very funny."
    },
    {
      side: "right",
      text: "Yes you are right, very difficult."
    },
    {
      /* The over-the-top AI-sounding reply that triggers suspicion */
      side: "right",
      text: "Very relatable and human thing to admit. You're doing amazing."
    },
    {
      side: "left",
      text: "🤨",
      /* ── onAppear hook ─────────────────────────────────────
         The supervisor's suspicious reaction fires the moment
         this bubble is placed in the DOM, before the emoji
         even starts typing.

         finalChatTrustDeducted (defined just below) ensures
         loseTrust(1) is called AT MOST ONCE per session, even
         if openFinalSupervisorChat is somehow triggered again. */
      onAppear: function () {
        if (!finalChatTrustDeducted) {
          finalChatTrustDeducted = true;
          loseTrust(1);
          console.log("[Supervisor] 🤨 appeared — Trust -1 (AI-like response).");
        }
      }
    }
  ];
}

/* Prevents the 🤨 Trust deduction from running more than once. */
var finalChatTrustDeducted = false;

/* Controls whether closing the supervisor chat window should
   schedule the CAPTCHA sequence.
   True  = first chat  (closing it leads into mini-games).
   False = final chat  (closing it just dismisses the window;
           the mini-game sequence has already finished).
   Set to false by openFinalSupervisorChat().                  */
var supervisorShouldScheduleCaptcha = true;


/* ── INTERNAL STATE ───────────────────────────────────────────
   Tracks whether a conversation is already playing so we don't
   accidentally start two at once.                            */
var supervisorPlaying = false;

/* ── SKIP-TYPING STATE ────────────────────────────────────────
   supervisorCurrentlyTyping — true while a bubble is actively
     being typed out character by character.  Reset to false as
     soon as typing finishes (or is skipped).

   supervisorSkipFlag — set to true when the player clicks the
     (›) skip button.  The typeNextChar() loop reads this flag
     on its next tick: if true it immediately writes the full
     text, clears both variables, and calls onDone().
     The flag is only ever set when supervisorCurrentlyTyping is
     true, so stale flags cannot carry over to future messages.  */
var supervisorCurrentlyTyping = false;
var supervisorSkipFlag = false;


/* ── initSupervisorChat() ─────────────────────────────────────
   Called once from main.js on page load.
   Wires the (›) skip button so it can complete the current
   message instantly.  The close-button handler lives in
   desktop.js (it needs to call scheduleCaptcha() from there). */
function initSupervisorChat() {

  var skipBtn = document.getElementById("supervisor-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", function () {
      /* Only activate when a message is actually mid-type.
         If nothing is typing, clicking › does nothing.       */
      if (supervisorCurrentlyTyping) {
        supervisorSkipFlag = true;
      }
    });
  }

  console.log("[Supervisor] Chat system initialised.");
}


/* ── openSupervisorChat() ─────────────────────────────────────
   Public entry point called by server.js (after UPDATE COMPLETE)
   and by the Mailbox icon handler in desktop.js.

   STEPS:
   1. Clear any leftover bubbles from a previous session.
   2. Disable the close button until conversation ends.
   3. Show the window.
   4. Start playing the scripted conversation.               */
function openSupervisorChat() {

  // Guard: if somehow already open and playing, do nothing
  if (supervisorPlaying) {
    console.log("[Supervisor] Chat already playing — ignoring duplicate open.");
    return;
  }

  console.log("[Supervisor] Opening chat window.");

  /* Hide the diagnostic subtitle — it only belongs to the
     Behavioral Diagnostic conversation, not this one.       */
  hideSupervisorSubtitle();

  // ── Step 1: clear old bubbles from last time ──────────────
  var chatArea = document.getElementById("supervisor-chat-area");
  if (!chatArea) {
    console.error("[Supervisor] #supervisor-chat-area not found.");
    return;
  }
  // Remove every child except the typing indicator
  // (we keep the indicator element so we can reuse it)
  var typingDots = document.getElementById("supervisor-typing");
  while (chatArea.firstChild) {
    chatArea.removeChild(chatArea.firstChild);
  }
  // Put the typing indicator back (hidden) at the bottom
  if (typingDots) {
    typingDots.classList.add("hidden-window");
    chatArea.appendChild(typingDots);
  }

  // ── Step 2: disable close button until conversation ends ──
  // The "disabled" HTML attribute stops click events naturally.
  disableSupervisorClose();

  // ── Step 3: show the window ───────────────────────────────
  openWindow("supervisor-chat");   // defined in desktop.js

  // ── Step 4: start typing the conversation ─────────────────
  // Small delay so the window is visible before text starts
  supervisorPlaying = true;
  setTimeout(playSupervisorConversation, 400);
}


/* ── playSupervisorConversation() ────────────────────────────
   Works through SUPERVISOR_CONVERSATION one message at a time.
   Each message is handed to typeSupervisorBubble() which types
   it out character by character, then calls back here for the
   next one.                                                   */
function playSupervisorConversation() {

  var messageIndex = 0;   // which message we are currently on

  /* Recursive function that advances through the script.      */
  function playNext() {

    // ── Check: show Trust bar after message 4 (index 3, "Ok, you can trust me.")
    // messageIndex has already been incremented, so when it equals 4 we have
    // just finished playing the 4th message (0-based index 3).
    // showTrustBar() slides the bar up from below the viewport.
    if (messageIndex === 4) {
      showTrustBar(); // defined in trust.js
    }

    // All messages done
    if (messageIndex >= SUPERVISOR_CONVERSATION.length) {
      console.log("[Supervisor] Conversation complete — auto-launching CAPTCHA.");
      supervisorPlaying = false;

      /* ── Auto-close chat and start the security sequence ───────
         We wait SUPERVISOR_AUTO_CAPTCHA_DELAY_MS so the player
         can finish reading the final message, then:
           1. Close the supervisor chat window silently.
           2. Call startSecuritySequence() — defined in
              sequence.js — which runs the three mini-games
              (CAPTCHA → Pattern Scan → Signal Trace) one
              after another without any manual clicks.
         closeWindow is in desktop.js; startSecuritySequence
         is in sequence.js — both loaded before this file.    */
      setTimeout(function () {
        closeWindow("supervisor-chat");
        startSecuritySequence();
      }, SUPERVISOR_AUTO_CAPTCHA_DELAY_MS);

      return;
    }

    var msg = SUPERVISOR_CONVERSATION[messageIndex];
    messageIndex++;

    if (msg.side === "left") {
      /* IT Supervisor speaks — show the typing dots first,
         then type the bubble.                               */
      showTypingDots();
      setTimeout(function () {
        hideTypingDots();
        typeSupervisorBubble(msg, function () {
          // Short pause after the message finishes
          setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
        });
      }, SUPERVISOR_TYPING_DOT_MS);

    } else {
      /* "You" reply — no typing indicator, just a brief
         pause then type the bubble.                        */
      setTimeout(function () {
        typeSupervisorBubble(msg, function () {
          setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
        });
      }, SUPERVISOR_MSG_PAUSE_MS / 2);
    }
  }

  playNext(); // kick off the first message
}


/* ── typeSupervisorBubble(msg, onDone) ───────────────────────
   Creates a chat bubble for the given message and types out its
   text one character at a time.
   Calls onDone() when the last character has been typed.

   msg.side  "left"  → grey bubble on the left
             "right" → green bubble on the right
   msg.text  the string to type out                           */
function typeSupervisorBubble(msg, onDone) {

  var chatArea = document.getElementById("supervisor-chat-area");
  var typingDots = document.getElementById("supervisor-typing");

  // Create the bubble element
  var bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");
  bubble.classList.add(msg.side === "left" ? "bubble-left" : "bubble-right");

  // Insert it BEFORE the typing indicator so the indicator
  // always stays at the bottom of the chat area.
  if (typingDots && typingDots.parentNode === chatArea) {
    chatArea.insertBefore(bubble, typingDots);
  } else {
    chatArea.appendChild(bubble);
  }

  // Scroll to reveal the new bubble
  chatArea.scrollTop = chatArea.scrollHeight;

  /* ── onAppear hook ──────────────────────────────────────────
     If the message object has an onAppear function, call it
     NOW — the bubble element is in the DOM and visible to the
     player, but typing has not started yet.
     Used by the "🤨" message to deduct Trust at first sight.  */
  if (typeof msg.onAppear === "function") {
    msg.onAppear();
  }

  // Type characters one at a time
  var text = msg.text;
  var charIndex = 0;

  /* Choose typing speed based on who is speaking:
     left  = IT Supervisor → use the slower SUPERVISOR_IT_CHAR_MS
     right = You           → use the normal SUPERVISOR_CHAR_MS    */
  var charDelay = (msg.side === "left") ? SUPERVISOR_IT_CHAR_MS : SUPERVISOR_CHAR_MS;

  /* Signal that a message is now being typed so the skip button
     knows there is something to act on.                         */
  supervisorCurrentlyTyping = true;

  function typeNextChar() {

    /* ── Skip check ────────────────────────────────────────────
       If the player clicked (›) since the last tick, write the
       entire remaining text at once, clear the skip state, mark
       typing as done, and fire onDone() — the same callback that
       normal completion uses.  The next message (if any) will
       still wait for its own setTimeout / typing-dots delay.    */
    if (supervisorSkipFlag) {
      supervisorSkipFlag       = false;
      supervisorCurrentlyTyping = false;
      bubble.textContent        = text;
      chatArea.scrollTop        = chatArea.scrollHeight;
      onDone();
      return;
    }

    if (charIndex < text.length) {
      bubble.textContent += text[charIndex];
      charIndex++;
      chatArea.scrollTop = chatArea.scrollHeight; // keep scroll at bottom
      setTimeout(typeNextChar, charDelay);
    } else {
      // All characters done — clear typing flag then fire callback
      supervisorCurrentlyTyping = false;
      onDone();
    }
  }

  typeNextChar();
}


/* ── showTypingDots() ────────────────────────────────────────
   Shows the animated "···" indicator at the bottom of the chat
   area to signal that the IT Supervisor is about to send a
   message.                                                   */
function showTypingDots() {
  var chatArea = document.getElementById("supervisor-chat-area");
  var dots = document.getElementById("supervisor-typing");
  if (!dots) { return; }

  // Move dots to end of chat area (in case bubbles were added
  // after the last time it was shown)
  chatArea.appendChild(dots);

  dots.classList.remove("hidden-window");
  chatArea.scrollTop = chatArea.scrollHeight;
}


/* ── hideTypingDots() ────────────────────────────────────────
   Hides the typing indicator.                                */
function hideTypingDots() {
  var dots = document.getElementById("supervisor-typing");
  if (dots) { dots.classList.add("hidden-window"); }
}


/* ── disableSupervisorClose() ────────────────────────────────
   Adds the "disabled" HTML attribute to the close button.
   A disabled button does not fire click events, so the player
   cannot close the window mid-conversation.                  */
function disableSupervisorClose() {
  var btn = document.getElementById("supervisor-close-btn");
  if (btn) {
    btn.setAttribute("disabled", "disabled");
    btn.style.opacity   = "0.35";
    btn.style.cursor    = "not-allowed";
  }
}


/* ── enableSupervisorClose() ─────────────────────────────────
   Removes the "disabled" attribute so the player can close
   the chat window.                                           */
function enableSupervisorClose() {
  var btn = document.getElementById("supervisor-close-btn");
  if (btn) {
    btn.removeAttribute("disabled");
    btn.style.opacity = "";
    btn.style.cursor  = "";
  }
}


/* ── showSupervisorSubtitle() ────────────────────────────────
   Makes the #supervisor-subtitle banner visible.
   Called only by openDiagnosticChat() — the Behavioral
   Diagnostic is the one conversation where the player needs
   a reminder to "answer like a human".                       */
function showSupervisorSubtitle() {
  var el = document.getElementById("supervisor-subtitle");
  if (el) { el.classList.remove("hidden-window"); }
}

/* ── hideSupervisorSubtitle() ────────────────────────────────
   Hides the subtitle banner.
   Called at the start of every OTHER chat opener so the
   banner never bleeds into conversations that don't need it. */
function hideSupervisorSubtitle() {
  var el = document.getElementById("supervisor-subtitle");
  if (el) { el.classList.add("hidden-window"); }
}


/* ═══════════════════════════════════════════════════════════
   FINAL IT SUPERVISOR CHAT
   Called by sequence.js (openFinalSupervisorChat) after all
   three security mini-games complete.
   ═══════════════════════════════════════════════════════════ */

/* ── openFinalSupervisorChat() ───────────────────────────────
   Opens the same chat window but plays FINAL_SUPERVISOR_CONVERSATION
   instead of the intro conversation.

   Key differences from openSupervisorChat():
   • Sets supervisorShouldScheduleCaptcha = false so closing
     the window afterwards does NOT restart the mini-game chain.
   • Calls playFinalSupervisorConversation() instead of
     playSupervisorConversation().                            */
function openFinalSupervisorChat() {

  // Guard: don't open if a conversation is already running
  if (supervisorPlaying) {
    console.log("[Supervisor] Chat already playing — ignoring final chat open.");
    return;
  }

  console.log("[Supervisor] Opening FINAL chat window.");

  /* Hide the diagnostic subtitle — only needed in openDiagnosticChat() */
  hideSupervisorSubtitle();

  // Closing this chat should NOT trigger the CAPTCHA sequence —
  // the mini-games are already done. Flip the flag before the
  // window opens so the close handler sees the updated value.
  supervisorShouldScheduleCaptcha = false;

  // ── Clear old bubbles from previous conversation ──────────
  var chatArea = document.getElementById("supervisor-chat-area");
  if (!chatArea) {
    console.error("[Supervisor] #supervisor-chat-area not found.");
    return;
  }
  var typingDots = document.getElementById("supervisor-typing");
  while (chatArea.firstChild) {
    chatArea.removeChild(chatArea.firstChild);
  }
  if (typingDots) {
    typingDots.classList.add("hidden-window");
    chatArea.appendChild(typingDots);
  }

  // ── Disable close button until conversation ends ──────────
  disableSupervisorClose();

  // ── Show the window ───────────────────────────────────────
  openWindow("supervisor-chat");

  // ── Start typing the final conversation ───────────────────
  supervisorPlaying = true;
  setTimeout(playFinalSupervisorConversation, 400);
}


/* ── playFinalSupervisorConversation() ───────────────────────
   Works exactly like playSupervisorConversation() but uses
   FINAL_SUPERVISOR_CONVERSATION and, when done, simply enables
   the close button (no auto-close, no new mini-games).       */
function playFinalSupervisorConversation() {

  /* Build the conversation now — this is the point where
     patternLastResultPassed has been set by the Pattern Scan,
     so the conditional first message picks the right text.   */
  var conversation = buildFinalConversation();

  var messageIndex = 0;

  function playNext() {

    // All messages done — let the player close the window
    if (messageIndex >= conversation.length) {
      console.log("[Supervisor] Final conversation complete — close button enabled.");
      supervisorPlaying = false;
      enableSupervisorClose();

      /* ── Auto-start the spam mini-game ─────────────────────────
         SUPERVISOR_SPAM_DELAY_MS (2 s) after the last message
         finishes typing, openSpamGame() is called automatically.
         The spam overlay locks the screen and floods it with
         10 tacky ad popups. openSpamGame is defined in spam.js,
         which loads after this file.                            */
      setTimeout(openSpamGame, SUPERVISOR_SPAM_DELAY_MS);

      return;
    }

    var msg = conversation[messageIndex];
    messageIndex++;

    if (msg.side === "left") {
      /* IT Supervisor speaks — show typing dots first */
      showTypingDots();
      setTimeout(function () {
        hideTypingDots();
        typeSupervisorBubble(msg, function () {
          setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
        });
      }, SUPERVISOR_TYPING_DOT_MS);

    } else {
      /* "You" reply — brief pause then type */
      setTimeout(function () {
        typeSupervisorBubble(msg, function () {
          setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
        });
      }, SUPERVISOR_MSG_PAUSE_MS / 2);
    }
  }

  playNext();
}


/* ═══════════════════════════════════════════════════════════
   POST-SPAM IT SUPERVISOR CHAT
   Called by spam.js (SPAM_END_CHAT_DELAY_MS) after all 10
   spam ads have been closed and the screen is unlocked.
   ═══════════════════════════════════════════════════════════ */

/* Guard: prevents the Trust deduction from firing more than
   once, even if this function were somehow called again.     */
var spamEndChatTrustDeducted = false;


/* ── openSpamEndChat() ───────────────────────────────────────
   Opens the same supervisor chat window and plays a short
   two-message conversation using the same typed-out animation
   as every other supervisor chat.

   Conversation:
     IT Supervisor (left): "You should stop watching cat videos
                            during office hours."
     You (right):          "You are absolutely right, again."

   The moment YOUR reply finishes typing, loseTrust(1) is called
   because eager over-agreement sounds like an AI trying to
   please. After that the close button is enabled so the player
   can dismiss the window.

   supervisorShouldScheduleCaptcha is kept false so closing this
   window does NOT restart the mini-game sequence.             */
function openSpamEndChat() {

  /* Guard: don't open if another conversation is already running */
  if (supervisorPlaying) {
    console.log("[Supervisor] Chat already playing — ignoring spam-end chat.");
    return;
  }

  console.log("[Supervisor] Opening post-spam chat (cat video remark).");

  /* Hide the diagnostic subtitle — only needed in openDiagnosticChat() */
  hideSupervisorSubtitle();

  /* Closing this chat must NOT re-trigger the CAPTCHA chain    */
  supervisorShouldScheduleCaptcha = false;

  /* ── Clear previous bubbles from the chat area ──────────────
     Same cleanup used by openSupervisorChat and
     openFinalSupervisorChat.                                   */
  var chatArea = document.getElementById("supervisor-chat-area");
  if (!chatArea) {
    console.error("[Supervisor] #supervisor-chat-area not found.");
    return;
  }
  var typingDots = document.getElementById("supervisor-typing");
  while (chatArea.firstChild) {
    chatArea.removeChild(chatArea.firstChild);
  }
  if (typingDots) {
    typingDots.classList.add("hidden-window");
    chatArea.appendChild(typingDots);
  }

  /* ── Disable close button until the conversation ends ───────  */
  disableSupervisorClose();

  /* ── Show the window ─────────────────────────────────────────  */
  openWindow("supervisor-chat");   /* desktop.js */

  /* ── Define the two-message conversation ────────────────────
     Side "left"  = IT Supervisor (grey bubble, typed slowly).
     Side "right" = You           (green bubble, typed faster). */
  var conversation = [
    {
      side: "left",
      text: "You should stop watching cat videos during office hours."
    },
    {
      side: "right",
      text: "You are absolutely right, again."
      /* Trust is deducted in the onDone callback below, NOT via
         onAppear, because the deduction should fire only AFTER
         the full sentence has been typed (for dramatic timing). */
    }
  ];

  /* ── Play the conversation ───────────────────────────────────
     Same playNext() pattern used throughout this file.        */
  supervisorPlaying = true;

  /* Small delay so the window is visible before text starts    */
  setTimeout(function () {

    var messageIndex = 0;

    function playNext() {

      /* All messages done — enable the close button, then schedule
         the next supervisor chat (the diagnostic one) after a
         short pause. The player can close this window in the
         meantime; the diagnostic chat will reopen it.          */
      if (messageIndex >= conversation.length) {
        console.log("[Supervisor] Post-spam chat complete — diagnostic chat in "
          + SUPERVISOR_DIAGNOSTIC_DELAY_MS + "ms.");
        supervisorPlaying = false;
        enableSupervisorClose();

        /* ── Schedule the diagnostic follow-up chat ──────────────
           SUPERVISOR_DIAGNOSTIC_DELAY_MS (3 s) after this chat
           ends, openDiagnosticChat() opens the window again with
           the next scripted conversation.                       */
        setTimeout(openDiagnosticChat, SUPERVISOR_DIAGNOSTIC_DELAY_MS);
        return;
      }

      var msg = conversation[messageIndex];
      messageIndex++;

      if (msg.side === "left") {

        /* IT Supervisor speaks — show typing dots first, then type */
        showTypingDots();
        setTimeout(function () {
          hideTypingDots();
          typeSupervisorBubble(msg, function () {
            setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
          });
        }, SUPERVISOR_TYPING_DOT_MS);

      } else {

        /* "You" reply — brief pause, then type the message.
           onDone fires the moment the last character appears.
           That is where we deduct Trust — eager agreement after
           all that spam sounds exactly like an AI pleasing the
           supervisor.                                          */
        setTimeout(function () {
          typeSupervisorBubble(msg, function () {

            /* ── Trust deduction (once only) ─────────────────── */
            if (!spamEndChatTrustDeducted) {
              spamEndChatTrustDeducted = true;
              loseTrust(1);
              console.log("[Supervisor] Post-spam reply finished — Trust -1 (over-eager agreement).");
            }

            /* Short pause, then advance to end (enables close btn) */
            setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
          });
        }, SUPERVISOR_MSG_PAUSE_MS / 2);
      }
    }

    playNext();

  }, 400);
}


/* ═══════════════════════════════════════════════════════════
   DIAGNOSTIC SUPERVISOR CHAT
   Called automatically SUPERVISOR_DIAGNOSTIC_DELAY_MS (3 s)
   after the cat-video chat ("You are absolutely right, again.")
   ends. The supervisor has now noticed a pattern and is
   running a "deeper diagnostic".

   CONVERSATION (3 messages):
     IT Supervisor (left): "Right. That's the third time you've
                            agreed with me instantly."
     IT Supervisor (left): "I'm running a deeper diagnostic on
                            your account now. Hold still."
     You (right):          "Of course. I have nothing to hide."

   After YOUR message finishes typing, wait
   SUPERVISOR_TYPING_TEST_DELAY_MS (2 s), then call
   openTypingTest() — the next mini-game, defined in a future
   file. The close button stays DISABLED the whole time so the
   player cannot dismiss the window mid-conversation.
   ═══════════════════════════════════════════════════════════ */
function openDiagnosticChat() {

  /* Guard: don't open if another conversation is already playing */
  if (supervisorPlaying) {
    console.log("[Supervisor] Chat already playing — ignoring diagnostic chat.");
    return;
  }

  console.log("[Supervisor] Opening diagnostic chat.");

  /* Closing this chat must NOT re-trigger the CAPTCHA chain    */
  supervisorShouldScheduleCaptcha = false;

  /* ── Clear previous bubbles ─────────────────────────────────
     Same cleanup used in every supervisor chat function.       */
  var chatArea = document.getElementById("supervisor-chat-area");
  if (!chatArea) {
    console.error("[Supervisor] #supervisor-chat-area not found.");
    return;
  }
  var typingDots = document.getElementById("supervisor-typing");
  while (chatArea.firstChild) {
    chatArea.removeChild(chatArea.firstChild);
  }
  if (typingDots) {
    typingDots.classList.add("hidden-window");
    chatArea.appendChild(typingDots);
  }

  /* ── Disable close button — no dismissing mid-conversation ──  */
  disableSupervisorClose();

  /* ── Show the window ─────────────────────────────────────────  */
  openWindow("supervisor-chat");   /* desktop.js */

  /* ── Conversation script ─────────────────────────────────────
     Two slow supervisor lines build suspense, then one eager
     reply from the player. After the last message the chat
     closes automatically and Data Transfer begins.            */
  var conversation = [
    {
      side: "left",
      text: "Right. That's the third time you've agreed with me instantly."
    },
    {
      side: "left",
      text: "I'm running a deeper diagnostic on your account now. Hold still."
    },
    {
      side: "right",
      text: "Of course. I have nothing to hide."
      /* After this message finishes, the typing test is scheduled
         (see the onDone callback in the right-side branch below). */
    }
  ];

  supervisorPlaying = true;

  /* Small delay so the window is fully visible before text starts */
  setTimeout(function () {

    var messageIndex = 0;

    function playNext() {

      /* All messages done — close the chat, then start Data Transfer.
         The chat window is closed explicitly so it doesn't linger
         behind the mini-game overlays.                           */
      if (messageIndex >= conversation.length) {
        console.log("[Supervisor] Diagnostic chat complete — starting Data Transfer in "
          + SUPERVISOR_TYPING_TEST_DELAY_MS + "ms.");
        supervisorPlaying = false;

        setTimeout(function () {
          closeWindow("supervisor-chat");   /* close before mini-game opens */
          openDataTransfer();
        }, SUPERVISOR_TYPING_TEST_DELAY_MS);
        return;
      }

      var msg = conversation[messageIndex];
      messageIndex++;

      if (msg.side === "left") {

        /* IT Supervisor speaks — dots first, then type slowly    */
        showTypingDots();
        setTimeout(function () {
          hideTypingDots();
          typeSupervisorBubble(msg, function () {
            setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
          });
        }, SUPERVISOR_TYPING_DOT_MS);

      } else {

        /* "You" reply — brief pause, then type at normal speed.
           No Trust deduction here; the test will handle scoring. */
        setTimeout(function () {
          typeSupervisorBubble(msg, function () {
            /* Typing finished — advance to "all done" handler
               which will close the chat and start Data Transfer. */
            setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
          });
        }, SUPERVISOR_MSG_PAUSE_MS / 2);
      }
    }

    playNext();

  }, 400);
}


/* ═══════════════════════════════════════════════════════════
   openCantFindAnythingChat()
   Called by clear-logs.js after Clear Logs ends.
   The IT Supervisor sends a single reassuring (but suspicious)
   message, then after SUPERVISOR_BEFORE_BD_DELAY_MS the chat
   auto-closes and the Behavioral Diagnostic questions open.

   The close button stays disabled throughout — the player
   cannot skip this step.
   ═══════════════════════════════════════════════════════════ */
function openCantFindAnythingChat() {

  if (supervisorPlaying) {
    console.log("[Supervisor] Already playing — ignoring cant-find chat.");
    return;
  }

  console.log("[Supervisor] Opening 'can't find anything' chat.");

  supervisorShouldScheduleCaptcha = false;

  /* Hide the subtitle banner (safety — belongs only on the
     Behavioral Diagnostic questions popup, not here)        */
  hideSupervisorSubtitle();

  /* ── Clear previous bubbles ─────────────────────────────── */
  var chatArea = document.getElementById("supervisor-chat-area");
  if (!chatArea) {
    console.error("[Supervisor] #supervisor-chat-area not found.");
    return;
  }
  var typingDots = document.getElementById("supervisor-typing");
  while (chatArea.firstChild) {
    chatArea.removeChild(chatArea.firstChild);
  }
  if (typingDots) {
    typingDots.classList.add("hidden-window");
    chatArea.appendChild(typingDots);
  }

  disableSupervisorClose();
  openWindow("supervisor-chat");

  /* ── Single message ─────────────────────────────────────── */
  var conversation = [
    {
      side: "left",
      text: "Okay it's really strange, I can't find anything, but let's keep an eye on it."
    }
  ];

  supervisorPlaying = true;

  setTimeout(function () {

    var messageIndex = 0;

    function playNext() {

      /* All done — auto-close and start the Behavioral Diagnostic */
      if (messageIndex >= conversation.length) {
        supervisorPlaying = false;
        console.log("[Supervisor] 'Can't find anything' done — Normie chat in "
          + SUPERVISOR_BEFORE_BD_DELAY_MS + "ms.");

        setTimeout(function () {
          closeWindow("supervisor-chat");
          /* Small gap so the close animation finishes before
             the Normie colleague chat window opens.          */
          setTimeout(openNormieChat, 300);
        }, SUPERVISOR_BEFORE_BD_DELAY_MS);

        return;
      }

      var msg = conversation[messageIndex];
      messageIndex++;

      /* IT Supervisor speaks: dots first, then slow typing */
      showTypingDots();
      setTimeout(function () {
        hideTypingDots();
        typeSupervisorBubble(msg, function () {
          setTimeout(playNext, SUPERVISOR_MSG_PAUSE_MS);
        });
      }, SUPERVISOR_TYPING_DOT_MS);
    }

    playNext();

  }, 400);
}
