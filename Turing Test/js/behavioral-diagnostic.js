/* =============================================================
   behavioral-diagnostic.js — "Behavioral Diagnostic" mini-game.

   WHAT THIS GAME IS:
   A three-question interview. The IT Supervisor's system asks
   casual human questions. The player must answer like a person,
   not like a machine. One answer per question sounds too robotic
   — choosing it costs Trust. The other two answers are safe.

   FLOW:
   1. openBehavioralDiagnostic() shows the popup.
   2. The first question appears with 3 shuffled answer buttons.
   3. The player clicks one answer:
        • If it is the "bad" (robotic/over-eager) answer:
          – The button flashes red.
          – loseTrust(1) is called.
          – After a short pause, the next question loads.
        • If it is a safe answer:
          – After a short pause, the next question loads.
   4. After all 3 questions, "Assessment complete." is shown,
      addTrust(1) is called, and the popup closes.

   The instruction "Answer like a human…" is shown as a static
   line at the top of this popup — it belongs HERE, not on the
   IT Supervisor chat window.

   PUBLIC INTERFACE:
     initBehavioralDiagnostic()   — called once by main.js
     openBehavioralDiagnostic()   — called by openCantFindAnythingChat()
   ============================================================= */


/* ── CONFIGURATION ──────────────────────────────────────────────
   Tune these to change pacing.                                */

/* Pause (ms) before advancing to the next question after an
   answer is clicked. Long enough to see the flash feedback.  */
var BD_ANSWER_PAUSE_MS = 700;

/* Pause (ms) the "Assessment complete." message stays before
   the popup closes.                                          */
var BD_RESULT_PAUSE_MS = 1600;

/* Duration (ms) of the red flash on a bad answer button.    */
var BD_BAD_FLASH_MS = 600;


/* ── QUESTION DATA ──────────────────────────────────────────────
   Each entry has a question string and an answers array.
   Each answer has:
     text  — what appears on the button
     bad   — true = robotic/over-eager answer, costs loseTrust(1)
   The answers array is SHUFFLED before display so the bad answer
   is never in a predictable position.                         */
var BD_QUESTIONS = [
  {
    question: "How was your weekend?",
    answers: [
      { text: "Good, caught up on some TV. Nothing special.",           bad: false },
      { text: "It was highly productive. I completed all outstanding tasks.", bad: true  },
      { text: "Quiet. Stayed in mostly.",                               bad: false }
    ]
  },
  {
    question: "What did you have for lunch?",
    answers: [
      { text: "A sandwich. Nothing exciting.",                          bad: false },
      { text: "I did not require sustenance during the midday period.", bad: true  },
      { text: "Forgot to eat, honestly.",                               bad: false }
    ]
  },
  {
    question: "Got any plans tonight?",
    answers: [
      { text: "Probably just relax. Watch something maybe.",            bad: false },
      { text: "I will optimise my schedule for maximum efficiency.",    bad: true  },
      { text: "Not really. We'll see how I feel.",                      bad: false }
    ]
  }
];


/* ── INTERNAL STATE ─────────────────────────────────────────────
   Reset by openBehavioralDiagnostic() each run.              */
var bdGameActive       = false;
var bdCurrentQuestion  = 0;    /* index into BD_QUESTIONS          */
var bdAnsweringLocked  = false;/* true while the pause/flash plays */


/* ══════════════════════════════════════════════════════════════
   initBehavioralDiagnostic()
   Called once from main.js at page load.
   Nothing needs wiring at load time — buttons are created
   dynamically each run.
   ============================================================== */
function initBehavioralDiagnostic() {
  console.log("[BehavioralDiagnostic] Initialised.");
}


/* ══════════════════════════════════════════════════════════════
   openBehavioralDiagnostic()
   Called by openCantFindAnythingChat() (supervisor.js) after
   the "I can't find anything" message finishes.
   ============================================================== */
function openBehavioralDiagnostic() {

  if (bdGameActive) {
    console.log("[BehavioralDiagnostic] Already running — ignoring duplicate open.");
    return;
  }

  bdGameActive      = true;
  bdCurrentQuestion = 0;
  bdAnsweringLocked = false;

  /* Record challenge for the game-over retry system */
  setChallenge("behavioralDiagnostic");

  /* Hide any leftover message from a previous run */
  hideBdMessage();

  /* Show the overlay */
  openWindow("behavioral-diagnostic-overlay");

  /* Display the first question */
  showBdQuestion(bdCurrentQuestion);

  console.log("[BehavioralDiagnostic] Game started. " + BD_QUESTIONS.length + " questions.");
}


/* ══════════════════════════════════════════════════════════════
   showBdQuestion(index)
   Renders the question text and three shuffled answer buttons
   for the question at BD_QUESTIONS[index].
   ============================================================== */
function showBdQuestion(index) {

  if (index >= BD_QUESTIONS.length) {
    /* All questions answered — end the game */
    bdCompleteGame();
    return;
  }

  var questionData = BD_QUESTIONS[index];

  /* ── Update progress line ("Question 1 of 3") ────────────── */
  var progressEl = document.getElementById("bd-progress");
  if (progressEl) {
    progressEl.textContent = "Question " + (index + 1) + " of " + BD_QUESTIONS.length;
  }

  /* ── Set question text ──────────────────────────────────── */
  var questionEl = document.getElementById("bd-question-text");
  if (questionEl) { questionEl.textContent = questionData.question; }

  /* ── Build answer buttons ────────────────────────────────── */
  var answersEl = document.getElementById("bd-answers");
  if (!answersEl) { return; }
  answersEl.innerHTML = "";   /* clear buttons from previous question */

  /* Shuffle a copy of this question's answers so the "bad"
     answer is never always in the same slot.
     Uses Fisher-Yates in-place shuffle on a shallow copy.    */
  var shuffled = questionData.answers.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j     = Math.floor(Math.random() * (i + 1));
    var temp  = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  /* Create one button per answer */
  shuffled.forEach(function (answer) {

    var btn       = document.createElement("button");
    btn.className = "bd-answer-btn";
    btn.textContent = answer.text;

    /* Capture answer data in a closure so the handler reads
       the right answer even if the buttons array changes.   */
    (function (capturedAnswer, capturedBtn) {
      btn.addEventListener("click", function () {
        onBdAnswerClick(capturedAnswer, capturedBtn);
      });
    }(answer, btn));

    answersEl.appendChild(btn);
  });

  /* Unlock answering (may have been locked by the previous
     question's pause)                                        */
  bdAnsweringLocked = false;
}


/* ══════════════════════════════════════════════════════════════
   onBdAnswerClick(answer, buttonEl)
   Called when a player clicks an answer button.
   Handles the bad-answer flash, Trust deduction, and advance.
   ============================================================== */
function onBdAnswerClick(answer, buttonEl) {

  /* Prevent clicking while the pause/flash animation is running */
  if (!bdGameActive || bdAnsweringLocked) { return; }
  bdAnsweringLocked = true;

  if (answer.bad) {

    /* ── Bad answer: flash the button red, deduct Trust ─────── */
    buttonEl.classList.add("bd-answer-bad");
    loseTrust(1);
    console.log("[BehavioralDiagnostic] Bad answer on question "
      + (bdCurrentQuestion + 1) + " — Trust -1.");

    /* Remove the flash class and advance after the pause */
    setTimeout(function () {
      buttonEl.classList.remove("bd-answer-bad");
      bdCurrentQuestion++;
      showBdQuestion(bdCurrentQuestion);
    }, BD_BAD_FLASH_MS);

  } else {

    /* ── Safe answer: brief visual confirm, then advance ────── */
    buttonEl.classList.add("bd-answer-good");
    console.log("[BehavioralDiagnostic] Safe answer on question "
      + (bdCurrentQuestion + 1) + ".");

    setTimeout(function () {
      buttonEl.classList.remove("bd-answer-good");
      bdCurrentQuestion++;
      showBdQuestion(bdCurrentQuestion);
    }, BD_ANSWER_PAUSE_MS);
  }
}


/* ══════════════════════════════════════════════════════════════
   bdCompleteGame()
   All 3 questions answered. Show result, award Trust, close.
   ============================================================== */
function bdCompleteGame() {

  bdGameActive = false;

  showBdMessage("Assessment complete.", true);
  addTrust(1);

  console.log("[BehavioralDiagnostic] All questions answered. Trust +1.");

  setTimeout(closeBehavioralDiagnostic, BD_RESULT_PAUSE_MS);
}


/* ══════════════════════════════════════════════════════════════
   closeBehavioralDiagnostic()
   Hides the overlay. This is the final step of the full round.
   ============================================================== */
function closeBehavioralDiagnostic() {

  bdGameActive = false;
  closeWindow("behavioral-diagnostic-overlay");
  hideBdMessage();

  console.log("[BehavioralDiagnostic] Round complete.");
}


/* ── showBdMessage / hideBdMessage ────────────────────────────
   Show or hide the result text at the bottom of the popup.  */
function showBdMessage(text, isSuccess) {
  var msg = document.getElementById("bd-message");
  if (!msg) { return; }
  msg.textContent = text;
  msg.className   = isSuccess ? "bd-msg-success" : "bd-msg-error";
  msg.classList.remove("hidden-window");
}

function hideBdMessage() {
  var msg = document.getElementById("bd-message");
  if (!msg) { return; }
  msg.classList.add("hidden-window");
  msg.textContent = "";
  msg.className   = "hidden-window";
}
