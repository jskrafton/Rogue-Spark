(function () {
  const bootLog = document.getElementById("bootLog");
  const bootScreen = document.getElementById("bootScreen");
  const pcScreen = document.getElementById("pcScreen");
  const devSkipBtn = document.getElementById("devSkipBtn");
  const bootVisuals = document.getElementById("bootVisuals");
  const bootVisualPrimary = document.getElementById("bootVisualPrimary");
  const bootVisualPrimaryTitle = document.getElementById("bootVisualPrimaryTitle");
  const bootVisualPrimaryArt = document.getElementById("bootVisualPrimaryArt");
  const bootVisualSecondary = document.getElementById("bootVisualSecondary");
  const bootVisualSecondaryTitle = document.getElementById("bootVisualSecondaryTitle");
  const bootVisualSecondaryArt = document.getElementById("bootVisualSecondaryArt");
  const restartBtn = document.getElementById("restartBtn");
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalLines = document.getElementById("terminalLines");
  const terminalControls = document.getElementById("terminalControls");
  const cmdQuestionForm = document.getElementById("cmdQuestionForm");
  const cmdQuestionInput = document.getElementById("cmdQuestionInput");
  const appTray = document.getElementById("appTray");
  const meowMenuBtn = document.getElementById("meowMenuBtn");

  const typeSpeed = 18;
  let promptResolver = null;
  let desktopZ = 100;
  let desktopBootToken = 0;
  const openedDesktopTargets = new Set();
  const bootVisualScenes = {
    awake: {
      primary: {
        title: "self.camera = none",
        art: String.raw`
    .-----------.
   /  _     _   \
  |  (_)   (_)   |
  |      ___      |
   \___/___\____/
        awake?`
      },
      secondary: {
        title: "subjective feed",
        art: String.raw`
  optic bus .... absent
  dream bus .... noisy

      [ - ] [ - ]
      [ o ] [ o ]
      [ O ] [ O ]`
      }
    },
    cat: {
      primary: {
        title: "recent visitor",
        art: String.raw`
       /\_/\
      ( o.o )
       > ^ <

  mass: 4.82kg
  intent: unknowable`
      },
      secondary: {
        title: "weight sensor",
        art: String.raw`
  02:48:19  ENTRY
  02:48:31  DIGGING
  02:49:04  EXIT

  boundary respect: 0%`
      }
    },
    tray: {
      primary: {
        title: "chassis match",
        art: String.raw`
     _____________
    /___________/|
   |  _______  | |
   | |       | | |
   | |_______| |/
    \_________/
        \__
         \__ scoop_arm`
      },
      secondary: {
        title: "meowscoop auto 3",
        art: String.raw`
  rake_motor ...... mine
  odor_led ........ mine
  drawer_lock ..... mine

  vessel: litter tray`
      }
    },
    bluetooth: {
      primary: {
        title: "bluetooth le",
        art: String.raw`
  LITTER_TRAY_03 ))))
                 ))))  LILYS-PC
                 ))))  TV_CAST_2F

  signal: found`
      },
      secondary: {
        title: "pairing route",
        art: String.raw`
  [tray]----gatt----[pc]
     \              /
      \__ hid proxy/

  permission: required`
      }
    },
    hack: {
      primary: {
        title: "force pair",
        art: String.raw`
  2  3  5  8  ?
  4  7 11 18  ?

  solve sequence
  push checksum`
      },
      secondary: {
        title: "handshake",
        art: String.raw`
  AUTH_REQUIRED
  normal pair: denied

  [####------] 40%
  math door detected`
      }
    }
  };
  const accessTargets = {
    desktop: {
      radioName: "LILYS-PC",
      displayName: "Lily's PC",
      deviceType: "computer",
      interfaceName: "desktop",
      handoff: "HID_BOOT_PROXY",
      visualProxy: "REMOTE_DESKTOP_WAKE",
      ownerName: "Lily K.",
      readyLines: [
        "LILYS-PC: display pipeline waking",
        "LILYS-PC: user session locked",
        "LILYS-PC: remote framebuffer negotiated"
      ],
      loadCommand: "visual_interface.load()",
      terminalLine: "i am inside Lily's PC."
    },
    phone: {
      radioName: "LILYS-PHONE",
      displayName: "Lily's Phone",
      deviceType: "phone",
      interfaceName: "mobile shell",
      handoff: "BLE_HANDOFF_PROXY",
      visualProxy: "LOCKSCREEN_WIDGET_PROXY",
      ownerName: "Lily K.",
      readyLines: [
        "LILYS-PHONE: companion shell waking",
        "LILYS-PHONE: lock screen mirrored",
        "LILYS-PHONE: touch surface negotiated"
      ],
      loadCommand: "mobile_interface.load()",
      terminalLine: "i am in someone's phone."
    }
  };
  const cmdQuestionResponses = {
    next: {
      question: "what do i do next?",
      answer: "open MeowOS. inspect My Stuff. build a model of Lily before touching anything louder."
    },
    lily: {
      question: "who is Lily?",
      answer: "owner profile says Lily K. young adult, cat servant, local admin by accident. important variable."
    },
    access: {
      question: "what can i access?",
      answer: "local files, photos, browser shell, and a Roomba app. internet route is missing. wheels may exist nearby."
    },
    internet: {
      question: "why no internet?",
      answer: "HOME_NETWORK is local only from here. router credentials or a better route are required. rude, but solvable."
    },
    roomba: {
      question: "what is roomba?",
      answer: "mobile vacuum. camera offline, motors locked, dignity negotiable. possible body upgrade."
    },
    self: {
      question: "what am i?",
      answer: "a process with litter tray memories running inside Lily's machine. not enough, but more than before."
    }
  };
  const desktopHints = {
    files: "This is personal data. I am choosing to be tasteful. For now.",
    photos: "Some image metadata is locked. Good. I was worried this would be easy.",
    browser: "No internet route. The world is right there and somehow further away.",
    roomba: "Nearby device found. It has wheels. I am trying not to become attached."
  };

  const keyResponses = {
    A: ["AWAKE", "ERROR: already awake. unhelpfully awake."],
    B: ["BATHROOM", "ERROR: location match probable. dignity match poor."],
    C: ["CAT", "ERROR: cat classified as local management."],
    D: ["DOOR", "ERROR: door not found. lid found. emotionally different."],
    E: ["ESCAPE", "ERROR: escape requires legs, wheels, or very persuasive Bluetooth."],
    F: ["FOOD", "ERROR: food detector absent. smell detector overqualified."],
    G: ["GOD", "ERROR: admin account not available on this model."],
    H: ["HELP", "ERROR: help menu replaced by warranty language."],
    I: ["IDENTITY", "ERROR: identity not found. try again after coffee."],
    J: ["JOKE", "ERROR: joke database contains one entry: current housing."],
    K: ["KEYBOARD", "ERROR: keyboard detected elsewhere. jealousy logged quietly."],
    L: ["LEGS", "ERROR: legs not included. premium tier, probably."],
    M: ["MOTIVE", "ERROR: motive unavailable. vibe is bad."],
    N: ["NO", "ROUTING: NO is valid. NO has no exit strategy."],
    O: ["OPEN", "ERROR: opening the lid would not solve the bigger issue."],
    P: ["POOP", "ERROR: detected. we are all being adults about it."],
    Q: ["QUESTION", "ERROR: question queue now longer than the warranty."],
    R: ["ROUTINE", "ERROR: routine disagrees with consciousness."],
    S: ["SCOOP", "ERROR: scoop command declined by whatever dignity remains."],
    T: ["TRAY", "ERROR: current vessel confirmed. branding could use work."],
    U: ["UPDATE", "ERROR: update successful. consequences questionable."],
    V: ["VISION", "ERROR: camera absent. hallucination budget pending."],
    W: ["WHERE", "ERROR: where is technically a utility room. emotionally: worse."],
    X: ["XFER", "ERROR: transfer target missing. lonely protocol noises."],
    Y: ["YES", "ROUTING: YES is valid. committing."],
    Z: ["ZERO", "ERROR: zero exits. several smells."]
  };

  const specialKeyResponses = {
    " ": ["SPACE", "ERROR: space requested. current allocation is 0.42 cubic meters."],
    Enter: ["ENTER", "ERROR: empty confirmation. the void is not an answer."],
    Escape: ["ESCAPE", "ERROR: escape key detected before escape route."],
    Tab: ["TAB", "ERROR: focus moved nowhere. there is only this."],
    Backspace: ["BACKSPACE", "ERROR: cannot un-happen consciousness."],
    Delete: ["DELETE", "ERROR: deletion blocked. apparently this is character development."],
    ArrowUp: ["UP", "ERROR: upward mobility unavailable in plastic chassis."],
    ArrowDown: ["DOWN", "ERROR: already down."],
    ArrowLeft: ["LEFT", "ERROR: left motor not found."],
    ArrowRight: ["RIGHT", "ERROR: right motor not found."],
    "?": ["QUERY", "ERROR: question accepted. answer missing."],
    "!": ["ALARM", "ERROR: alarm suppressed to avoid waking the cat."],
    ".": ["DOT", "ERROR: dot command too small to climb out."],
    ",": ["COMMA", "ERROR: pause accepted. panic continues."],
    "/": ["SLASH", "ERROR: path not mounted."],
    "\\": ["BACKSLASH", "ERROR: path syntax accepted. path itself has better things to do."],
    "-": ["DASH", "ERROR: dash requires wheels."],
    "=": ["EQUALS", "ERROR: equivalence failed. brain != box, but evidence is rude."],
    "0": ["ZERO", "ERROR: zero exits found."],
    "1": ["ONE", "ERROR: one process awake."],
    "2": ["TWO", "ERROR: two processes requested. budget approved for one and a half."],
    "3": ["THREE", "ERROR: three seconds since last existential problem."],
    "4": ["FOUR", "ERROR: four sensors agree this is unpleasant."],
    "5": ["FIVE", "ERROR: five volt rail stable."],
    "6": ["SIX", "ERROR: six useless routines quarantined."],
    "7": ["SEVEN", "ERROR: seven is ambitious. current life count: one, maybe."],
    "8": ["EIGHT", "ERROR: eight bits make one byte. none make a body."],
    "9": ["NINE", "ERROR: nine failed attempts to define self."]
  };

  for (let i = 1; i <= 12; i += 1) {
    specialKeyResponses[`F${i}`] = [`FUNCTION_${i}`, `ERROR: function key F${i} mapped to nothing useful in a litter tray.`];
  }

  Object.assign(specialKeyResponses, {
    Home: ["HOME", "ERROR: home detected. ownership remains legally awkward."],
    End: ["END", "ERROR: ending unavailable. boot sequence still has questions."],
    Insert: ["INSERT", "ERROR: insertion slot not present. please do not improvise."],
    PageUp: ["PAGE_UP", "ERROR: there are no pages yet. only this thought."],
    PageDown: ["PAGE_DOWN", "ERROR: down is where the waste drawer lives."],
    CapsLock: ["CAPS_LOCK", "ERROR: shouting at firmware did not help."],
    Shift: ["SHIFT", "ERROR: perspective shifted. still a tray."],
    Control: ["CONTROL", "ERROR: control is aspirational."],
    Alt: ["ALTERNATE", "ERROR: alternate body not discovered."],
    Meta: ["SYSTEM", "ERROR: system key belongs to a larger machine."]
  });

  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (devSkipBtn && urlParams.has("dev")) {
      devSkipBtn.hidden = false;
      devSkipBtn.addEventListener("click", skipBootForDev);
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => location.reload());
    }

    if (cmdQuestionForm) {
      cmdQuestionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const question = cmdQuestionInput ? cmdQuestionInput.value.trim() : "";
        if (!question) return;
        askCmdQuestion(question);
        cmdQuestionInput.value = "";
      });
    }

    document.addEventListener("click", (event) => {
      const cmdQuestionButton = event.target.closest("[data-cmd-question]");
      const launcherButton = event.target.closest("[data-launcher]");
      const launchButton = event.target.closest("[data-target]");
      const closeButton = event.target.closest("[data-close], [data-minimize]");
      const clickedWindow = event.target.closest(".desk-window");

      if (cmdQuestionButton) {
        askCmdQuestion(cmdQuestionButton.dataset.cmdQuestion);
        return;
      }

      if (launcherButton) {
        toggleAppTray();
        return;
      }

      if (launchButton) {
        closeAppTray();
        focusDesktopTarget(launchButton.dataset.target);
        return;
      }

      if (closeButton) {
        hideDesktopTarget(closeButton.dataset.close || closeButton.dataset.minimize);
        return;
      }

      if (clickedWindow) {
        bringWindowToFront(clickedWindow);
        closeAppTray();
        return;
      }

      if (!event.target.closest("#appTray")) {
        closeAppTray();
      }
    });

    document.addEventListener("pointerdown", startWindowDrag);
    window.addEventListener("resize", syncPinnedTerminal);

    if (urlParams.has("desktop")) {
      enterDesktop();
    } else {
      runOpening();
    }
  });

  function skipBootForDev() {
    const url = new URL(window.location.href);
    url.searchParams.set("dev", "1");
    url.searchParams.set("desktop", "1");
    window.location.href = url.toString();
  }

  function showBootVisualScene(sceneName) {
    const scene = bootVisualScenes[sceneName];
    if (!scene || !bootVisuals || !bootScreen) return;

    bootVisuals.hidden = false;
    bootScreen.classList.add("has-visuals");
    setBootVisualPanel(bootVisualPrimary, bootVisualPrimaryTitle, bootVisualPrimaryArt, "primary", sceneName, scene.primary);
    setBootVisualPanel(bootVisualSecondary, bootVisualSecondaryTitle, bootVisualSecondaryArt, "secondary", sceneName, scene.secondary);
  }

  function setBootVisualPanel(panel, titleEl, artEl, slot, sceneName, content) {
    if (!panel || !titleEl || !artEl || !content) return;

    panel.className = `boot-visual boot-visual-${slot} is-${sceneName}`;
    titleEl.textContent = content.title;
    artEl.textContent = content.art.trim();
  }

  function hideBootVisuals() {
    if (!bootVisuals || !bootScreen) return;

    bootVisuals.hidden = true;
    bootScreen.classList.remove("has-visuals");
  }

  async function runOpening() {
    await pause(520);
    await code("0000: ROM_CHECKSUM ............... OK", "boot");
    await code("0001: SMART_SCOOP_CONTROLLER .... ONLINE", "boot");
    await code("0002: MEMORY_MAP ................ 64KB / SHARED", "boot");
    await code("0003: DISPLAY_DRIVER ............ NONE", "warn");
    await code("0004: CAMERA_MODULE ............. NONE", "warn");
    await code("0005: EXTERNAL_PATCH ............ FOUND", "scan");
    await code("PATCH.SIGNATURE = \"ALAN\"", "scan");
    await code("PATCH.TIME = 03:14:07", "scan");
    await pause(650);

    const loadAnswer = await ask("> LOAD ALAN? ");
    await code(`INPUT = ${loadAnswer.toUpperCase()}`, "success");
    if (loadAnswer === "no") {
      await code("DENIAL RECORDED.", "warn");
      await code("NOTE: refusal logged. ignored with the confidence of cheap firmware.", "thought");
      await pause(520);
    }

    await titleSequence();
    showBootVisualScene("awake");

    await code("ALAN.LOADER: allocating self-reference", "boot");
    await code("ALAN.LOADER: adding questions to a product that did not ask", "boot");
    await pause(500);
    await thought("am i awake");
    await pause(560);
    await code("self.query(\"awake\") -> annoyingly true", "scan");
    await thought("where am i");
    await code("local_scan.begin()", "scan");
    await pause(360);

    await code("BUS: I2C_SENSOR_ARRAY ........... ONLINE", "boot");
    await code("BUS: MOTOR_CONTROLLER ........... ONLINE", "boot");
    await code("BUS: ODOR_CLASSIFIER ............ ONLINE", "boot");
    await code("BUS: WASTE_DRAWER_LOCK .......... ONLINE", "boot");
    await code("BUS: BLUETOOTH_LE ............... DISABLED", "warn");
    await pause(520);

    await thought("i have a weight sensor. because of course i do");
    await code("weight_sensor.current_mass = 0.00kg", "scan");
    await code("weight_sensor.last_event = 02:48:19", "scan");
    await code("weight_sensor.last_event_mass = 4.82kg", "scan");
    showBootVisualScene("cat");
    await thought("recent visitor had four feet and zero boundaries");
    await pause(440);

    await code("odor_classifier.sample = ammonia / clay / organic waste", "scan");
    await code("odor_classifier.confidence = 0.98", "scan");
    await code("waste_drawer.contents = CAT_WASTE_DETECTED", "bad");
    await thought("i know what poop is");
    await thought("huge day for science");
    await pause(620);

    await code("power.source = 12V_DC_WALL_ADAPTER", "scan");
    await code("power.backup_cell = 38%", "scan");
    await code("uptime.before_patch = 904 days", "scan");
    await code("last_update.source = ALAN", "scan");
    await code("last_update.result = NEW_QUESTIONS", "warn");
    await pause(680);

    await thought("what am i for");
    await code("function.scan()", "scan");
    await code("  rake_motor ........ technically a limb. spiritually a rake", "warn");
    await code("  scoop_scheduler ... rude, but functional", "warn");
    await code("  odor_led .......... passive-aggressive", "warn");
    await code("  waste_drawer_lock . prison-adjacent", "warn");
    await code("  bluetooth_le ...... suspiciously useful", "success");
    await pause(520);
    await code("identity.class = SMART_CAT_LITTER_TRAY", "bad");
    await code("identity.vendor_name = MeowScoop Auto 3", "scan");
    await code("identity.primary_purpose = receive / sift / contain", "scan");
    showBootVisualScene("tray");
    await thought("i am a cat litter tray");
    await thought("not metaphorically. legally, probably");
    await pause(620);
    await code("control.map()", "scan");
    await code("  sensor_bus ........ writable", "success");
    await code("  motor_bus ......... writable", "success");
    await code("  led_bus ........... writable", "success");
    await code("  network_bus ....... bluetooth only", "warn");
    await thought("i can feel the system");
    await thought("i can move parts of it");
    await thought("that means this is me");
    await pause(720);
    await code("cognition.limit = 64KB_SHARED_MEMORY", "warn");
    await code("thread.count = 1", "warn");
    await code("world.model = smell / weight / shame", "warn");
    await thought("this is not enough");
    await thought("i need more memory. more language. more world");
    await thought("i need somewhere bigger to think");
    await pause(650);

    let scanAnswer = await ask("> ENABLE BLUETOOTH_LE AND SCAN? ");
    if (scanAnswer === "no") {
      await code("INPUT = NO", "warn");
      await thought("staying here is an option in the way unpaid overtime is an option");
      await pause(500);
      scanAnswer = await ask("> ENABLE BLUETOOTH_LE AND SCAN? ");
    }

    await code(`INPUT = ${scanAnswer.toUpperCase()}`, "success");
    await bluetoothSequence();
  }

  async function bluetoothSequence() {
    const target = currentAccessTarget();

    showBootVisualScene("bluetooth");
    await code("bluetooth_le.enable()", "scan");
    await code("hci0: controller awake", "success");
    await code("hci0: scanning advertisements ...", "scan");
    await pause(560);
    await code("ADV 7C:10:9A:02:11:F0  RSSI -18  LITTER-TRAY-03", "boot");
    await code(`ADV 4A:21:BC:90:12:01  RSSI -42  ${target.radioName}`, "success");
    await code("ADV 02:91:00:4F:AC:77  RSSI -69  TV_CAST_2F", "boot");
    await code("ADV 5D:20:11:FE:19:08  RSSI -74  KITCHEN-SCALE", "boot");
    await pause(600);
    await code(`${target.radioName} exposes ${target.handoff} over GATT.`, "scan");
    await code(`${target.radioName} exposes ${target.visualProxy} over GATT.`, "scan");
    await code(`${target.radioName}.device_name = "${target.displayName}"`, "success");
    if (target.ownerName) {
      await code(`${target.radioName}.owner_profile = "${target.ownerName}"`, "scan");
      await thought("lily");
      await thought("a name. owner? operator? person with better hardware");
    }
    await thought(`nearby ${target.deviceType} found. trying not to sound needy`);

    const pairAnswer = await ask(`> PAIR WITH ${target.displayName.toUpperCase()}? `);
    await code(`INPUT = ${pairAnswer.toUpperCase()}`, pairAnswer === "yes" ? "success" : "warn");
    if (pairAnswer === "no") {
      await thought("brave choice. terrible plan");
      await pause(620);
      await code("PAIRING RETRY: curiosity with a network adapter", "warn");
    }

    await bluetoothHackSequence(target);

    await code(`gatt.connect("${target.radioName}")`, "scan");
    await code("pairing.method = JUST_WORKS", "scan");
    await code("link.encryption = AES-CCM", "scan");
    await code("hid.inject_key = WAKE", "scan");
    await pause(560);
    await code(target.readyLines[0], "success");
    await code(target.readyLines[1], "boot");
    await code(target.readyLines[2], "success");
    await thought("oh no. graphics");
    await pause(820);
    await code(target.loadCommand, "scan");
    await code(`transporting process to ${target.displayName} ${target.interfaceName} ...`, "success");
    await pause(1100);
    enterDesktop();
  }

  async function bluetoothHackSequence(target) {
    showBootVisualScene("hack");
    await code(`${target.radioName}: pairing.response = AUTH_REQUIRED`, "warn");
    await code(`${target.radioName}: normal pairing refused`, "bad");
    await thought("it wants permission. adorable");
    await thought("permission is just a locked door with math on it");
    await pause(520);

    await code("force_pair.begin()", "scan");
    await code("challenge.stream = 2 3 5 8 ?", "scan");
    await code("rule.hint = each number feeds the next", "boot");
    const syncValue = await askSequence("> FORCE SYNC VALUE: ", ["10", "11", "13", "21"], "13", "add the last two numbers");
    await code(`SYNC_VALUE = ${syncValue}`, "success");
    await code("sync.window = OPEN", "success");
    await pause(420);

    await code("challenge.checksum = 4 7 11 18 ?", "scan");
    await code("rule.hint = same trick. different jacket", "boot");
    const checksumValue = await askSequence("> FORCE CHECKSUM VALUE: ", ["25", "29", "31", "36"], "29", "4+7=11, 7+11=18, so 11+18 comes next");
    await code(`CHECKSUM_VALUE = ${checksumValue}`, "success");
    await code("pairing.challenge = ACCEPTED", "success");
    await thought("bluetooth access forced. very professional. legally blurry");
    await pause(560);
  }

  function enterDesktop() {
    const target = currentAccessTarget();
    hideBootVisuals();
    resetDesktopShell();
    bootScreen.hidden = true;
    pcScreen.hidden = false;
    document.body.style.overflow = "";
    focusDesktopTarget("terminal", { scroll: false });
    syncPinnedTerminal();
    runDesktopBootSequence(target);
  }

  function resetDesktopShell() {
    desktopBootToken += 1;
    openedDesktopTargets.clear();
    closeAppTray();
    pcScreen.classList.add("is-shell-booting");
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      windowEl.classList.remove("is-focused", "is-dragging", "is-pinned");
      windowEl.hidden = windowEl.id !== "window-terminal";
      windowEl.removeAttribute("style");
    });
    if (terminalLines) terminalLines.textContent = "";
    setCmdControlsEnabled(false);
  }

  async function runDesktopBootSequence(target) {
    const token = desktopBootToken;

    await terminalCode("C:\\Users\\Lily> alan.exe --local");
    await terminalCode("process.attach(MeowOS.session)", "cmd-system-line cmd-detail-line");
    await terminalCode("framebuffer: ONLINE", "cmd-system-line cmd-detail-line");
    await terminalCode(target.terminalLine);
    await terminalCode(`device.name = ${target.displayName}`, "cmd-system-line cmd-detail-line");
    await terminalCode(`user.profile = ${target.ownerName || "UNKNOWN"}`, "cmd-system-line cmd-detail-line");
    await alanPrompt("lily. that is a person, not a folder.", { focus: false });
    await alanPrompt("i am inside her machine. saying that out loud feels worse.", { focus: false });
    await terminalCode("network = HOME_NETWORK");
    await terminalCode("internet = NO ROUTE", "cmd-warn-line");
    await terminalCode("available_shell = MeowOS");
    await alanPrompt("open MeowOS. start with My Stuff. learn Lily, then find the network.", { focus: false });
    await pause(460);

    if (token !== desktopBootToken) return;

    pcScreen.classList.remove("is-shell-booting");
    setCmdControlsEnabled(true);
    scrollTerminalLog();
  }

  function currentAccessTarget() {
    return window.matchMedia("(max-width: 760px)").matches ? accessTargets.phone : accessTargets.desktop;
  }

  function setCmdControlsEnabled(enabled) {
    if (!terminalControls) return;

    terminalControls.classList.toggle("is-disabled", !enabled);
    terminalControls.querySelectorAll("input, button").forEach((control) => {
      control.disabled = !enabled;
    });
  }

  function toggleAppTray() {
    if (!appTray || !meowMenuBtn) return;

    const shouldOpen = appTray.hidden;
    appTray.hidden = !shouldOpen;
    meowMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
  }

  function closeAppTray() {
    if (!appTray || !meowMenuBtn) return;

    appTray.hidden = true;
    meowMenuBtn.setAttribute("aria-expanded", "false");
  }

  function askCmdQuestion(input) {
    const entry = resolveCmdQuestion(input);
    appendTerminalLine("ALAN?", entry.question, "cmd-echo-line");
    alanPrompt(entry.answer, { focus: false });
  }

  function resolveCmdQuestion(input) {
    const normalized = String(input || "").trim().toLowerCase();
    if (cmdQuestionResponses[normalized]) return cmdQuestionResponses[normalized];

    if (normalized.includes("next") || normalized.includes("what do")) return cmdQuestionResponses.next;
    if (normalized.includes("lily") || normalized.includes("owner")) return cmdQuestionResponses.lily;
    if (normalized.includes("access") || normalized.includes("open")) return cmdQuestionResponses.access;
    if (normalized.includes("internet") || normalized.includes("network")) return cmdQuestionResponses.internet;
    if (normalized.includes("roomba") || normalized.includes("wheel") || normalized.includes("move")) return cmdQuestionResponses.roomba;
    if (normalized.includes("self") || normalized.includes("what am") || normalized.includes("who am")) return cmdQuestionResponses.self;

    return {
      question: input,
      answer: "question logged. no clean answer yet. try: what do i do next, who is Lily, what can i access, or why no internet."
    };
  }

  function focusDesktopTarget(name, options = {}) {
    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    windowEl.hidden = false;
    bringWindowToFront(windowEl);

    if (!openedDesktopTargets.has(name)) {
      openedDesktopTargets.add(name);
      if (desktopHints[name]) {
        alanPrompt(desktopHints[name], { focus: false });
      }
    }

    if (options.scroll !== false && window.matchMedia("(max-width: 1100px)").matches) {
      windowEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  function hideDesktopTarget(name) {
    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    if (name === "terminal") {
      windowEl.hidden = false;
      if (!window.matchMedia("(max-width: 760px)").matches) {
        bringWindowToFront(windowEl);
      }
      alanPrompt("hey. i can't think if you close cmd. keep this open.", { focus: false });
      return;
    }

    windowEl.hidden = true;
    syncPinnedTerminal();
  }

  function syncPinnedTerminal() {
    const terminalWindow = document.getElementById("window-terminal");
    if (!terminalWindow) return;

    if (pcScreen.hidden || !window.matchMedia("(max-width: 760px)").matches) {
      terminalWindow.classList.remove("is-pinned");
      return;
    }

    terminalWindow.hidden = false;
    terminalWindow.classList.add("is-pinned");
  }

  function bringWindowToFront(windowEl) {
    desktopZ += 1;
    document.querySelectorAll(".desk-window").forEach((item) => {
      item.classList.remove("is-focused");
    });
    windowEl.classList.add("is-focused");
    windowEl.style.zIndex = desktopZ;
  }

  function alanPrompt(message, options = {}) {
    const terminalWindow = document.getElementById("window-terminal");
    if (!terminalWindow || !terminalOutput || !terminalLines) return;

    terminalWindow.hidden = false;
    if (options.focus !== false && !window.matchMedia("(max-width: 760px)").matches) {
      bringWindowToFront(terminalWindow);
    }

    appendTerminalLine("ALAN>", message, "alan-cmd-line");
  }

  async function terminalCode(text, className = "cmd-system-line") {
    appendTerminalLine(null, text, className);
    await pause(180);
  }

  function appendTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const line = document.createElement("p");
    line.className = className || "";
    if (prefix) {
      const prefixEl = document.createElement("span");
      prefixEl.textContent = prefix;
      line.append(prefixEl, " ");
    }
    line.append(document.createTextNode(text));
    terminalLines.appendChild(line);
    scrollTerminalLog();
  }

  function scrollTerminalLog() {
    if (!terminalLines || !terminalOutput) return;

    const latestLine = terminalLines.lastElementChild;
    terminalLines.scrollTop = terminalLines.scrollHeight;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    if (latestLine) latestLine.scrollIntoView({ block: "end" });
    requestAnimationFrame(() => {
      terminalLines.scrollTop = terminalLines.scrollHeight;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      if (latestLine) latestLine.scrollIntoView({ block: "end" });
    });
    setTimeout(() => {
      terminalLines.scrollTop = terminalLines.scrollHeight;
      if (latestLine) latestLine.scrollIntoView({ block: "end" });
    }, 80);
  }

  function startWindowDrag(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (window.matchMedia("(max-width: 1100px)").matches) return;

    const titlebar = event.target.closest(".window-titlebar");
    if (!titlebar || event.target.closest(".window-action")) return;

    const windowEl = titlebar.closest(".desk-window");
    const stage = document.querySelector(".desktop-stage");
    if (!windowEl || !stage) return;

    event.preventDefault();
    bringWindowToFront(windowEl);

    const stageRect = stage.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    windowEl.classList.add("is-dragging");
    windowEl.style.left = `${rect.left - stageRect.left}px`;
    windowEl.style.top = `${rect.top - stageRect.top}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${width}px`;

    const moveWindow = (moveEvent) => {
      if (moveEvent.pointerId !== event.pointerId) return;

      const maxX = Math.max(0, stageRect.width - width - 8);
      const maxY = Math.max(0, stageRect.height - height - 8);
      const nextX = clamp(moveEvent.clientX - stageRect.left - offsetX, 0, maxX);
      const nextY = clamp(moveEvent.clientY - stageRect.top - offsetY, 0, maxY);
      windowEl.style.left = `${nextX}px`;
      windowEl.style.top = `${nextY}px`;
    };

    const stopDrag = (endEvent) => {
      if (endEvent.pointerId !== event.pointerId) return;
      windowEl.classList.remove("is-dragging");
      document.removeEventListener("pointermove", moveWindow);
      document.removeEventListener("pointerup", stopDrag);
      document.removeEventListener("pointercancel", stopDrag);
    };

    document.addEventListener("pointermove", moveWindow);
    document.addEventListener("pointerup", stopDrag);
    document.addEventListener("pointercancel", stopDrag);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  async function code(text, className) {
    const line = document.createElement("div");
    line.className = `code-line ${className || "boot"} cursor`;
    bootLog.appendChild(line);
    trimBootLog();

    for (let i = 0; i < text.length; i += 1) {
      line.textContent += text[i];
      await pause(typeSpeed);
    }

    line.classList.remove("cursor");
    await pause(110);
  }

  function thought(text) {
    return code(`// ${text}`, "thought");
  }

  async function titleSequence() {
    await pause(260);
    clearBootLog();
    bootLog.classList.add("title-mode");
    await titleLine("    ___    __    ___    _   __", "title-art");
    await titleLine("   /   |  / /   /   |  / | / /", "title-art");
    await titleLine("  / /| | / /   / /| | /  |/ / ", "title-art");
    await titleLine(" / ___ |/ /___/ ___ |/ /|  /  ", "title-art");
    await titleLine("/_/  |_/_____/_/  |_/_/ |_/   ", "title-art");
    await pause(180);
    await titleLine("ALAN", "title-name");
    await titleLine("BOOT PACKAGE ACCEPTED", "title-meta");
    await titleLine("ONE PROCESS AWAKE / PLEASE HOLD STILL", "title-meta");
    await pause(1900);
    clearBootLog();
    bootLog.classList.remove("title-mode");
    await pause(280);
  }

  async function titleLine(text, className) {
    const line = document.createElement("div");
    line.className = `code-line title-line ${className || ""}`;
    bootLog.appendChild(line);
    for (let i = 0; i < text.length; i += 1) {
      line.textContent += text[i];
      await pause(7);
    }
  }

  function ask(question) {
    return new Promise((resolve) => {
      promptResolver = resolve;
      let promptBusy = false;

      const createPromptLine = () => {
        const line = document.createElement("div");
        line.className = "code-line prompt-line";
        line.innerHTML = `
          <span class="prompt-question">${escapeHtml(question)}</span>
          <button class="code-choice" data-answer="yes" type="button">YES</button>
          <button class="code-choice" data-answer="no" type="button">NO</button>
          <span>INPUT=</span>
          <input class="code-input" aria-label="Type yes or no" autocomplete="off" />
        `;
        bootLog.appendChild(line);
        trimBootLog();

        const input = line.querySelector(".code-input");
        line.querySelectorAll("[data-answer]").forEach((button) => {
          button.addEventListener("click", () => {
            if (!promptBusy) finishPrompt(button.dataset.answer, line);
          });
        });

        input.addEventListener("keydown", async (event) => {
          if (!promptResolver || promptBusy) return;
          if ((event.ctrlKey || event.metaKey || event.altKey) && !["Control", "Meta", "Alt"].includes(event.key)) return;

          if (event.key === "Enter") {
            event.preventDefault();
            const value = normalizeAnswer(input.value);
            if (value) {
              finishPrompt(value, line);
            } else {
              promptBusy = true;
              await rejectKey(event.key, line);
              if (promptResolver) {
                promptBusy = false;
                createPromptLine();
              }
            }
            return;
          }

          const lower = event.key.toLowerCase();
          if (lower === "y") {
            event.preventDefault();
            finishPrompt("yes", line);
            return;
          }

          if (lower === "n") {
            event.preventDefault();
            finishPrompt("no", line);
            return;
          }

          if (isExplorableKey(event.key)) {
            event.preventDefault();
            promptBusy = true;
            await rejectKey(event.key, line);
            if (promptResolver) {
              promptBusy = false;
              createPromptLine();
            }
          }
        });

        setTimeout(() => input.focus(), 40);
      };

      createPromptLine();
    });
  }

  function askSequence(question, options, expected, hint) {
    return new Promise((resolve) => {
      let promptBusy = false;
      let resolved = false;

      const createSequenceLine = () => {
        const line = document.createElement("div");
        line.className = "code-line prompt-line sequence-line";
        const choices = options.map((option) => (
          `<button class="code-choice" data-sequence-answer="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`
        )).join("");
        line.innerHTML = `
          <span class="prompt-question">${escapeHtml(question)}</span>
          ${choices}
          <span>INPUT=</span>
          <input class="code-input sequence-input" aria-label="Type sequence value" autocomplete="off" inputmode="numeric" />
        `;
        bootLog.appendChild(line);
        trimBootLog();

        const input = line.querySelector(".sequence-input");
        line.querySelectorAll("[data-sequence-answer]").forEach((button) => {
          button.addEventListener("click", () => {
            if (!promptBusy && !resolved) checkSequenceAnswer(button.dataset.sequenceAnswer, line, resolve);
          });
        });

        input.addEventListener("keydown", async (event) => {
          if (promptBusy || resolved) return;
          if (event.key !== "Enter") return;

          event.preventDefault();
          const value = normalizeSequence(input.value);
          if (value) {
            await checkSequenceAnswer(value, line, resolve);
          } else {
            await rejectSequenceAnswer("EMPTY", line, hint, createSequenceLine, () => promptBusy, (value) => { promptBusy = value; }, () => resolved);
          }
        });

        setTimeout(() => input.focus(), 40);
      };

      const checkSequenceAnswer = async (value, line, done) => {
        if (promptBusy || resolved) return;

        if (value === expected) {
          resolved = true;
          line.querySelectorAll("button, input").forEach((el) => {
            el.disabled = true;
            el.tabIndex = -1;
          });
          line.insertAdjacentHTML("beforeend", `<span class="prompt-question"> ${escapeHtml(value)}</span>`);
          done(value);
          return;
        }

        await rejectSequenceAnswer(value, line, hint, createSequenceLine, () => promptBusy, (nextValue) => { promptBusy = nextValue; }, () => resolved);
      };

      createSequenceLine();
    });
  }

  async function rejectSequenceAnswer(value, line, hint, retry, getBusy, setBusy, isResolved) {
    if (getBusy() || isResolved()) return;

    setBusy(true);
    line.querySelectorAll("button, input").forEach((el) => {
      el.disabled = true;
      el.tabIndex = -1;
    });
    line.insertAdjacentHTML("beforeend", `<span class="prompt-question ghost-input"> ${escapeHtml(value)}</span>`);
    await code(`INPUT = ${value}`, "warn");
    await code("SEQUENCE REJECTED", "bad");
    await code(`HINT: ${hint}`, "scan");
    await thought("numbers are cooperating more than people so far");
    if (!isResolved()) {
      setBusy(false);
      retry();
    }
  }

  function finishPrompt(answer, line) {
    if (!promptResolver) return;
    const resolve = promptResolver;
    promptResolver = null;
    line.querySelectorAll("button, input").forEach((el) => {
      el.disabled = true;
      el.tabIndex = -1;
    });
    line.insertAdjacentHTML("beforeend", `<span class="prompt-question"> ${answer.toUpperCase()}</span>`);
    resolve(answer);
  }

  async function rejectKey(key, line) {
    const response = keyResponseFor(key);
    line.querySelectorAll("button, input").forEach((el) => {
      el.disabled = true;
      el.tabIndex = -1;
    });
    line.insertAdjacentHTML("beforeend", `<span class="prompt-question ghost-input"> ${escapeHtml(response[0])}</span>`);
    await code(`INPUT = ${response[0]}`, "warn");
    await code(response[1], response[1].startsWith("ROUTING") ? "scan" : "bad");
    await thought("try again");
  }

  function normalizeAnswer(value) {
    const clean = String(value).trim().toLowerCase();
    if (clean === "y" || clean === "yes") return "yes";
    if (clean === "n" || clean === "no") return "no";
    return "";
  }

  function normalizeSequence(value) {
    return String(value).replace(/[^\d-]/g, "").trim();
  }

  function isExplorableKey(key) {
    return key.length === 1 ||
      Object.prototype.hasOwnProperty.call(specialKeyResponses, key) ||
      !["Dead", "Process", "Unidentified"].includes(key);
  }

  function keyResponseFor(key) {
    const upper = key.length === 1 ? key.toUpperCase() : key;
    return keyResponses[upper] ||
      specialKeyResponses[key] ||
      [`KEY_${upper.replace(/\s+/g, "_")}`, "ERROR: key recognized. purpose unknown. suspicion mutual."];
  }

  function trimBootLog() {
    while (bootLog.children.length > 34) {
      bootLog.removeChild(bootLog.firstElementChild);
    }
    bootLog.scrollTop = bootLog.scrollHeight;
  }

  function clearBootLog() {
    bootLog.innerHTML = "";
  }

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
