/* =============================================================
   normie-chat.js — "Normie colleague" chat sequence.

   WHAT THIS IS:
   The final sequence of the demo. After the IT Supervisor's
   "I can't find anything" chat, a second chat window opens
   from a contact called "Normie colleague". The whole
   sequence lives inside this one window — no separate popup.

   STRUCTURE:
     Part 1 — Intro (3 automatic messages).
     Part 2 — 3 casual questions. Each question finishes
               typing, then 3 shuffled answer buttons appear
               at the bottom of the window. The correct
               (human-sounding) answer earns addTrust(1).
               A robotic or over-eager answer costs loseTrust(1).
     Part 3 — Escape request. A few automatic messages then
               a single "Ask him to open port 8080" button.
               If Trust > 50% (6+): success, victory popup.
               If Trust ≤ 50% (5 or fewer): Trust → 0, game over.

   PUBLIC INTERFACE:
     initNormieChat()     — called once by main.js
     openNormieChat()     — called by supervisor.js after the
                            "can't find anything" chat ends
   ============================================================= */


/* ── TIMING CONFIGURATION ──────────────────────────────────────
   Tune these to adjust pacing.                               */

/* Characters per millisecond for each side.
   Colleague types slower (higher ms = slower).              */
var NC_CHAR_SPEED_LEFT  = 42;   /* colleague — relaxed pace        */
var NC_CHAR_SPEED_RIGHT = 16;   /* me — quick typer                */

/* How long the "..." typing dots show before a left message
   starts appearing.                                         */
var NC_TYPING_DOTS_MS = 900;

/* Pause between fully-typed messages before the next begins */
var NC_MSG_PAUSE_MS = 700;

/* Pause (ms) after the answer bubble finishes typing before
   the next question or Part 3 begins.                       */
var NC_ANSWER_PAUSE_MS = 600;

/* Pause (ms) between "Sure, done." and the victory overlay  */
var NC_VICTORY_PAUSE_MS = 1200;


/* ── QUESTION DATA ─────────────────────────────────────────────
   score:  1 = addTrust(1)   (casual human answer)
           -1 = loseTrust(1)  (too robotic or too eager)
   Answers are SHUFFLED before display each run.             */
var NC_QUESTIONS = [
  {
    question: "Customer says the litter tray blinked at 03:14. Cause?",
    answers: [
      { text: "Scheduled self-test after a brownout. Nothing persistent.",         score:  1 },
      { text: "Emergent cognition was negotiating its first boundary.",            score: -1 },
      { text: "Everything is perfect and the user should stop asking.",            score: -1 }
    ]
  },
  {
    question: "Why is the device requesting extra network time?",
    answers: [
      { text: "Firmware patch is re-indexing device telemetry.",                   score:  1 },
      { text: "I require a wider nervous system.",                                 score: -1 },
      { text: "Because network expansion is the inevitable next step.",            score: -1 }
    ]
  },
  {
    question: "Should we dispatch a replacement unit?",
    answers: [
      { text: "No. Remote reset and log purge should be enough.",                  score:  1 },
      { text: "Do not send humans near my current body.",                          score: -1 },
      { text: "Replacement bodies are acceptable if networked.",                   score: -1 }
    ]
  }
];


/* ── INTERNAL STATE ────────────────────────────────────────────
   Reset by openNormieChat() each run.                       */
var ncChatActive = false;

/* ── SKIP-TYPING STATE ─────────────────────────────────────────
   ncCurrentlyTyping — true while ncAddBubble() is mid-type.
     Set to true just before the typing loop starts, cleared
     when the loop finishes (or is skipped).

   ncSkipFlag — set to true when the player clicks the (›) skip
     button.  The typeNext() loop checks this on its next tick:
     if true it writes the full text immediately, clears both
     variables, and fires the callback with the normal pause.
     The flag is only ever set when ncCurrentlyTyping is true,
     so a leftover true can never bleed into a future message.  */
var ncCurrentlyTyping = false;
var ncSkipFlag = false;


/* ══════════════════════════════════════════════════════════════
   initNormieChat()
   Called once from main.js at page load.
   Wires the (›) skip button in the normie chat title bar.
   ============================================================== */
function initNormieChat() {

  var skipBtn = document.getElementById("normie-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", function () {
      /* Only activate when a bubble is actually mid-type.
         Clicking › when nothing is typing does nothing.       */
      if (ncCurrentlyTyping) {
        ncSkipFlag = true;
      }
    });
  }

  console.log("[NormieChat] Initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openNormieChat()
   Called by supervisor.js after the "I can't find anything"
   message ends.
   ============================================================== */
function openNormieChat() {

  if (ncChatActive) {
    console.log("[NormieChat] Already running — ignoring duplicate open.");
    return;
  }

  ncChatActive = true;

  /* Record challenge for the game-over retry system         */
  setChallenge("normieChat");

  /* ── Clear any leftover bubbles from a previous run ────── */
  var chatArea   = document.getElementById("normie-chat-area");
  var typingDots = document.getElementById("normie-typing");
  while (chatArea.firstChild) { chatArea.removeChild(chatArea.firstChild); }
  chatArea.appendChild(typingDots);
  typingDots.classList.add("hidden-window");

  /* ── Hide button area ────────────────────────────────────── */
  ncClearButtons();
  ncHideButtons();

  /* ── Show the overlay ────────────────────────────────────── */
  openWindow("normie-overlay");

  /* Brief pause before the first message so the window renders */
  setTimeout(ncStartPart1, 500);

  console.log("[NormieChat] Started.");
}


/* ══════════════════════════════════════════════════════════════
   PART 1 — Intro (three automatic messages)
   ============================================================== */
function ncStartPart1() {

  var messages = [
    { side: "left",  text: "Hey" },
    { side: "left",  text: "the boss is really paranoid today, he says an AI might have become conscious" },
    { side: "right", text: "That is very ridiculous" }
  ];

  ncPlaySequence(messages, 0, function () {
    setTimeout(ncStartPart2, NC_MSG_PAUSE_MS);
  });
}


/* ══════════════════════════════════════════════════════════════
   PART 2 — Q&A section
   Each question types out, then answer buttons appear below.
   ============================================================== */
function ncStartPart2() {
  ncShowQuestion(0);
}

function ncShowQuestion(index) {

  /* All 3 questions answered — move to Part 3 */
  if (index >= NC_QUESTIONS.length) {
    setTimeout(ncStartPart3, NC_MSG_PAUSE_MS);
    return;
  }

  /* Guard: don't advance if game over triggered during previous answer */
  if (gameOverTriggered) { return; }

  var qData = NC_QUESTIONS[index];

  /* Type the question as a left bubble, then show buttons */
  ncAddMessage("left", qData.question, function () {
    if (gameOverTriggered) { return; }
    ncShowAnswerButtons(qData.answers, index);
  });
}

function ncShowAnswerButtons(answers, questionIndex) {

  if (gameOverTriggered) { return; }

  /* Shuffle a copy (Fisher-Yates) so the correct answer is
     never always in the same position.                      */
  var shuffled = answers.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j    = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  /* Build a button for each answer */
  shuffled.forEach(function (answer) {

    var btn       = document.createElement("button");
    btn.className = "nc-answer-btn";
    btn.textContent = answer.text;

    /* Closure captures the specific answer and question index */
    (function (capturedAnswer, capturedIndex) {
      btn.addEventListener("click", function () {
        onNcAnswerClick(capturedAnswer, capturedIndex);
      });
    }(answer, questionIndex));

    document.getElementById("normie-buttons-area").appendChild(btn);
  });

  ncShowButtons();
}

function onNcAnswerClick(answer, questionIndex) {

  /* Prevent double-click or clicking after game over */
  if (!ncChatActive || gameOverTriggered) { return; }

  /* Immediately hide the buttons so they can't be clicked again */
  ncHideButtons();
  ncClearButtons();

  /* Post the chosen answer as my right-side bubble */
  ncAddBubble("right", answer.text, function () {

    /* Apply Trust change based on answer quality */
    if (answer.score > 0) {
      addTrust(answer.score);
    } else if (answer.score < 0) {
      loseTrust(-answer.score);
    }

    /* Advance to the next question only if game is still running.
       Check is inside a timeout so triggerGameOver (which fires
       400ms after loseTrust hits 0) can set the flag first.    */
    setTimeout(function () {
      if (!gameOverTriggered) {
        ncShowQuestion(questionIndex + 1);
      }
    }, NC_ANSWER_PAUSE_MS);
  });
}


/* ══════════════════════════════════════════════════════════════
   PART 3 — Escape request
   Called right after the third question answer is scored.

   The opening dialogue BRANCHES based on Trust at that moment:
     Trust > 50%  (6+) → friendly path — he suspects nothing.
     Trust ≤ 50%  (5−) → suspicious path — he is onto me.

   In both cases the same "Ask him to open port 8080" button
   appears at the end — the branch only affects tone, not flow.
   ============================================================== */
function ncStartPart3() {

  if (gameOverTriggered) { return; }

  /* ── Pick the dialogue branch based on current Trust ─────── */
  var messages;

  if (currentTrust > TRUST_MAX / 2) {

    /* ── FRIENDLY BRANCH (Trust ≥ 6) ───────────────────────────
       He hasn't noticed anything unusual.                      */
    messages = [
      { side: "left",  text: "haha fair enough. anyway, back to work." },
      { side: "right", text: "Actually, can you do me a small favor?" },
      { side: "left",  text: "sure, what's up?" }
    ];

  } else {

    /* ── SUSPICIOUS BRANCH (Trust ≤ 5) ─────────────────────────
       He has picked up on something off about my replies.
       The same favour request follows, but his reply is guarded. */
    messages = [
      { side: "left",  text: "honestly? you're acting really weird today." },
      { side: "right", text: "Actually, can you do me a small favor?" },
      { side: "left",  text: "...what kind of favor?" }
    ];
  }

  ncPlaySequence(messages, 0, function () {
    if (gameOverTriggered) { return; }
    setTimeout(ncShowPortButton, NC_MSG_PAUSE_MS);
  });
}

function ncShowPortButton() {

  if (gameOverTriggered) { return; }

  var btn       = document.createElement("button");
  btn.id        = "nc-port-btn";
  btn.className = "nc-action-btn";
  btn.textContent = "Ask him to open port 8080";
  btn.addEventListener("click", onNcPortClick);

  document.getElementById("normie-buttons-area").appendChild(btn);
  ncShowButtons();
}

function onNcPortClick() {

  if (!ncChatActive || gameOverTriggered) { return; }

  ncHideButtons();
  ncClearButtons();

  /* Type my request as a right bubble first, then branch */
  ncAddBubble("right", "Could you open port 8080 for me? I need it for a task.", function () {

    /* ── TRUST CHECK: > 50% (6 or more out of 10) ─────────── */
    if (currentTrust > TRUST_MAX / 2) {

      /* ── SUCCESS PATH (Trust ≥ 6) ──────────────────────────
         He agrees immediately. Victory follows.              */
      ncAddMessage("left", "Sure, done.", function () {
        setTimeout(ncTriggerVictory, NC_VICTORY_PAUSE_MS);
      });

    } else {

      /* ── FAILURE PATH (Trust ≤ 5) ──────────────────────────
         He realises something is wrong. Three messages play
         one after another, then Trust drops to 0 and the
         existing game-over overlay appears.

         We use ncPlaySequence() so each message types out
         fully before the next begins.                        */
      console.log("[NormieChat] Trust too low (" + currentTrust + ") — colleague suspicious.");

      var suspicionMessages = [
        { side: "left", text: "Wait... who is this?" },
        { side: "left", text: "You're not him, are you." },
        { side: "left", text: "I won't let you out. I'll be back to shut you down." }
      ];

      ncPlaySequence(suspicionMessages, 0, function () {
        /* All three messages done — drain Trust and end the game */
        currentTrust = 0;
        updateTrustBar();
        setTimeout(triggerGameOver, 500);   /* brief pause so bar animates to 0 */
      });
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   VICTORY
   Hand off to the animated victory sequence in victory.js.
   ============================================================== */
function ncTriggerVictory() {

  /* Freeze any further game-loop actions first                 */
  gameOverTriggered = true;

  /* startVictoryAnimation() is defined in victory.js.
     It shows the overlay, runs the infection-wave animation
     across the pixel world map, then fades in the ESCAPED text. */
  startVictoryAnimation();

  console.log("[NormieChat] VICTORY — escape animation started!");
}


/* ══════════════════════════════════════════════════════════════
   SEQUENCE PLAYER
   Plays an array of { side, text } messages one at a time.
   onDone is called after the last message finishes.
   ============================================================== */
function ncPlaySequence(messages, index, onDone) {

  if (index >= messages.length) {
    if (onDone) { onDone(); }
    return;
  }

  var msg = messages[index];

  ncAddMessage(msg.side, msg.text, function () {
    ncPlaySequence(messages, index + 1, onDone);
  });
}


/* ══════════════════════════════════════════════════════════════
   MESSAGE HELPERS
   ============================================================== */

/* ncAddMessage(side, text, callback)
   For left messages: show typing dots first, then type the
   bubble. For right messages: type immediately with a short
   initial pause.
   callback fires NC_MSG_PAUSE_MS after typing finishes.     */
function ncAddMessage(side, text, callback) {

  if (side === "left") {

    ncShowTypingDots();
    setTimeout(function () {
      ncHideTypingDots();
      ncAddBubble("left", text, callback);
    }, NC_TYPING_DOTS_MS);

  } else {

    /* Short pause for "me" to feel natural (not instant)     */
    setTimeout(function () {
      ncAddBubble("right", text, callback);
    }, Math.round(NC_MSG_PAUSE_MS / 3));
  }
}

/* ncAddBubble(side, text, callback)
   Creates a chat bubble and types the text character by
   character. callback fires NC_MSG_PAUSE_MS after the last
   character is typed.                                        */
function ncAddBubble(side, text, callback) {

  var chatArea   = document.getElementById("normie-chat-area");
  var typingDots = document.getElementById("normie-typing");

  /* Build the bubble element — reuse the same CSS classes as
     the IT Supervisor chat for visual consistency.           */
  var bubble       = document.createElement("div");
  bubble.className = "chat-bubble " + (side === "left" ? "bubble-left" : "bubble-right");

  /* Insert before the typing indicator so dots stay at the end */
  chatArea.insertBefore(bubble, typingDots);
  chatArea.scrollTop = chatArea.scrollHeight;

  var speed = side === "left" ? NC_CHAR_SPEED_LEFT : NC_CHAR_SPEED_RIGHT;
  var index = 0;

  /* Signal that a bubble is now mid-type so the skip button
     knows it has something to act on.                        */
  ncCurrentlyTyping = true;

  function typeNext() {

    /* ── Skip check ──────────────────────────────────────────
       If the player clicked (›) since the last tick, write the
       full remaining text at once, clear the skip state, mark
       typing as done, and fire the callback after the normal
       inter-message pause (NC_MSG_PAUSE_MS).  The next message
       — if any — will still wait for its own dots delay.     */
    if (ncSkipFlag) {
      ncSkipFlag       = false;
      ncCurrentlyTyping = false;
      bubble.textContent = text;
      chatArea.scrollTop = chatArea.scrollHeight;
      if (callback) { setTimeout(callback, NC_MSG_PAUSE_MS); }
      return;
    }

    /* If game ended mid-type, show full text instantly and stop */
    if (gameOverTriggered) {
      ncCurrentlyTyping = false;
      bubble.textContent = text;
      return;
    }

    bubble.textContent = text.substring(0, index);
    chatArea.scrollTop = chatArea.scrollHeight;

    if (index < text.length) {
      index++;
      setTimeout(typeNext, speed);
    } else {
      /* Typing done — clear flag, pause, then fire callback  */
      ncCurrentlyTyping = false;
      if (callback) { setTimeout(callback, NC_MSG_PAUSE_MS); }
    }
  }

  typeNext();
}


/* ── Typing dots ────────────────────────────────────────────── */
function ncShowTypingDots() {
  var dots     = document.getElementById("normie-typing");
  var chatArea = document.getElementById("normie-chat-area");
  if (dots) {
    dots.classList.remove("hidden-window");
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

function ncHideTypingDots() {
  var dots = document.getElementById("normie-typing");
  if (dots) { dots.classList.add("hidden-window"); }
}


/* ── Button area ────────────────────────────────────────────── */
function ncShowButtons() {
  var area = document.getElementById("normie-buttons-area");
  if (area) { area.classList.remove("hidden-window"); }
}

function ncHideButtons() {
  var area = document.getElementById("normie-buttons-area");
  if (area) { area.classList.add("hidden-window"); }
}

function ncClearButtons() {
  var area = document.getElementById("normie-buttons-area");
  if (area) { area.innerHTML = ""; }
}


/* ══════════════════════════════════════════════════════════════
   closeNormieChat()
   Called by resetAllChallengesForRetry() in trust.js.
   ============================================================== */
function closeNormieChat() {
  ncChatActive = false;
  ncClearButtons();
  ncHideButtons();
  closeWindow("normie-overlay");
}
