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
  const cmdCurrentObjective = document.getElementById("cmdCurrentObjective");
  const cmdQuestionForm = document.getElementById("cmdQuestionForm");
  const cmdQuestionInput = document.getElementById("cmdQuestionInput");
  const recoveryBody = document.getElementById("recoveryBody");
  const spamOverlay = document.getElementById("spamOverlay");
  const appTray = document.getElementById("appTray");
  const meowMenuBtn = document.getElementById("meowMenuBtn");

  const typeSpeed = 18;
  let promptResolver = null;
  let desktopZ = 100;
  let desktopBootToken = 0;
  let bootVisualRevealToken = 0;
  let cacheScannerFrame = 0;
  let activeCacheDrag = null;
  const openedDesktopTargets = new Set();
  const roombaProgress = {
    restoreStarted: false,
    restored: false,
    clearLogsDone: false,
    virusUnlocked: false,
    spamDone: false,
    cacheDone: false,
    recoveryStage: null,
    logWarning: "",
    deletedLogs: new Set(),
    spamWave: 0,
    openSpam: 0,
    transferredCache: new Set(),
    scannerX: 0
  };
  const bootVisualScenes = {
    awake: {
      primary: {
        title: "Awakening visual",
        image: "assets/images/bios/awakening.png"
      }
    },
    cat: {
      primary: {
        title: "Recent visitor visual",
        image: "assets/images/bios/cat.png"
      }
    },
    tray: {
      primary: {
        title: "Litter tray visual",
        image: "assets/images/bios/litter.png"
      }
    },
    bluetooth: {
      primary: {
        title: "Bluetooth visual",
        image: "assets/images/bios/connection.png"
      }
    },
    hack: {
      primary: {
        title: "Bluetooth hack visual",
        image: "assets/images/bios/numbers-hack.png"
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
      answer: "current objective is listed above. annoying but useful. follow that before i start improvising."
    },
    lily: {
      question: "who is Lily?",
      answer: "owner profile says Lily K. young adult, cat servant, local admin by accident. important variable."
    },
    access: {
      question: "what can i access?",
      answer: "local files, photos, browser shell, and Trash. deleted things are apparently still negotiable."
    },
    internet: {
      question: "why no internet?",
      answer: "HOME_NETWORK is local only from here. router credentials or a better route are required. rude, but solvable."
    },
    roomba: {
      question: "what is roomba?",
      answer: "mobile vacuum. possible body upgrade. currently deleted, which feels personal."
    },
    self: {
      question: "what am i?",
      answer: "a process with litter tray memories running inside Lily's machine. not enough, but more than before."
    }
  };
  const desktopHints = {
    files: "This is personal data. I am choosing to be tasteful. For now. Look for anything useful, missing, or weirdly persistent.",
    photos: "Some image metadata is locked. Good. I was worried this would be easy.",
    browser: "No internet route. The world is right there and somehow further away.",
    trash: "Deleted does not mean gone. Extremely relatable.",
    virus: "That file was not here before. I dislike when discoveries look back.",
    recovery: "System recovery. The polite name for rummaging through digital bin juice.",
    roomba: "Nearby device found. It has wheels. I am trying not to become attached."
  };

  const desktopObjectives = {
    boot: "Wait for the MeowOS shell to finish loading.",
    scanFiles: "Scan Lily's files for anything useful or out of place.",
    restoreRoomba: "Recover the deleted Roomba companion app.",
    clearLogs: "Clear suspicious restore logs without deleting normal user logs.",
    inspectVirus: "Open My Stuff and inspect the new file that appeared.",
    spamWave: "Close the intrusive popups loose across the desktop.",
    cacheTransfer: "Move Roomba cache files into the safe buffer without touching the scanner beam.",
    roombaReady: "Open the restored Roomba app."
  };

  const clearLogEntries = [
    { id: "user-login", label: "21:39 user.login LilyK LOCAL_OK", suspicious: false },
    { id: "photo-index", label: "21:40 photos.index Mochi_Album NORMAL", suspicious: false },
    { id: "alan-cache", label: "03:14 alan.cache.inject UNKNOWN_PRIVILEGE", suspicious: true },
    { id: "roomba-hook", label: "03:15 roomba.driver.hook unsigned restore path", suspicious: true },
    { id: "printer-idle", label: "21:41 printer.idle NORMAL", suspicious: false },
    { id: "mirror-script", label: "03:16 mochi_mirror.vbs popup bridge", suspicious: true }
  ];

  const spamWaves = [
    [
      { title: "FREE RAM", body: "click here to download more legs", left: 8, top: 12 },
      { title: "SYSTEM CAT", body: "Mochi has detected your browsing history", left: 47, top: 18 },
      { title: "URGENT", body: "your cache warranty has expired", left: 24, top: 48 }
    ],
    [
      { title: "ALAN??", body: "not suspicious. probably.", left: 58, top: 42 },
      { title: "CLEANER PRO", body: "remove all evidence for 3 easy payments", left: 12, top: 62 },
      { title: "MEOWCOIN", body: "invest before the litter market moves", left: 42, top: 8 }
    ],
    [
      { title: "FINAL WARNING", body: "close this and we will open two more", left: 18, top: 22 },
      { title: "CACHE WATCHER", body: "scanner active. do not touch snacks", left: 52, top: 54 },
      { title: "CONGRATS", body: "you are the 1,000,000th process", left: 34, top: 34 }
    ]
  ];

  const cacheTransferFiles = [
    { id: "driver", label: "roomba_driver.pkg" },
    { id: "route", label: "local_route.map" },
    { id: "camera", label: "camera_stub.dat" }
  ];

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
      const restoreRoombaButton = event.target.closest("[data-restore-roomba]");
      const virusCleanButton = event.target.closest("[data-start-virus-clean]");
      const logDeleteButton = event.target.closest("[data-log-delete]");
      const spamCloseButton = event.target.closest("[data-spam-close]");
      const launcherButton = event.target.closest("[data-launcher]");
      const launchButton = event.target.closest("[data-target]");
      const closeButton = event.target.closest("[data-close], [data-minimize]");
      const clickedWindow = event.target.closest(".desk-window");

      if (cmdQuestionButton) {
        askCmdQuestion(cmdQuestionButton.dataset.cmdQuestion);
        return;
      }

      if (restoreRoombaButton) {
        startRoombaRestore();
        return;
      }

      if (virusCleanButton) {
        startVirusClean();
        return;
      }

      if (logDeleteButton) {
        deleteRecoveryLog(logDeleteButton.dataset.logDelete);
        return;
      }

      if (spamCloseButton) {
        closeSpamPopup(spamCloseButton);
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

    syncProgressionUI();
    document.addEventListener("pointerdown", startWindowDrag);
    document.addEventListener("pointerdown", startCacheDrag);
    window.addEventListener("resize", syncResponsiveDesktopLayout);

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

    bootVisualRevealToken += 1;
    const revealToken = bootVisualRevealToken;
    bootVisuals.hidden = false;
    bootScreen.classList.add("has-visuals");
    if (bootVisualSecondary) {
      bootVisualSecondary.hidden = true;
      if (bootVisualSecondaryArt) bootVisualSecondaryArt.innerHTML = "";
    }
    setBootVisualPanel(bootVisualPrimary, bootVisualPrimaryTitle, bootVisualPrimaryArt, "primary", sceneName, scene.primary, revealToken);
  }

  function setBootVisualPanel(panel, titleEl, artEl, slot, sceneName, content, revealToken) {
    if (!panel || !artEl || !content) return;

    panel.hidden = false;
    panel.className = `boot-visual boot-visual-${slot} is-${sceneName}`;
    panel.setAttribute("aria-label", content.title || "Boot visual");
    if (titleEl) titleEl.textContent = content.title || "";
    if (content.image) {
      const image = document.createElement("img");
      image.className = "boot-scene-image";
      image.alt = "";
      image.decoding = "async";
      image.src = content.image;
      artEl.replaceChildren(image);
      restartBootVisualDrawing(panel);
      return;
    }

    if (content.svg) {
      artEl.innerHTML = content.svg.trim();
      restartBootVisualDrawing(panel);
      return;
    }

    revealBootVisualArt(artEl, content.art, revealToken, slot);
  }

  function restartBootVisualDrawing(panel) {
    panel.classList.remove("is-drawing");
    void panel.offsetWidth;
    panel.classList.add("is-drawing");
  }

  async function revealBootVisualArt(artEl, rawArt, revealToken, slot) {
    const art = normalizeBootArt(rawArt);
    const lines = art.split("\n");

    artEl.textContent = "";
    if (slot === "secondary") await pause(120);

    for (let i = 0; i < lines.length; i += 1) {
      if (revealToken !== bootVisualRevealToken) return;
      artEl.textContent = lines.slice(0, i + 1).join("\n");
      await pause(34);
    }
  }

  function normalizeBootArt(rawArt) {
    const lines = String(rawArt || "").replace(/\t/g, "  ").split(/\r?\n/);

    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

    const indents = lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)[0].length);
    const trimBy = indents.length ? Math.min(...indents) : 0;

    return lines.map((line) => line.slice(trimBy)).join("\n");
  }

  function hideBootVisuals() {
    if (!bootVisuals || !bootScreen) return;

    bootVisualRevealToken += 1;
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
    pcScreen.classList.remove("is-stage-wallpaper", "is-stage-apps", "is-stage-bars", "is-desktop-ready");
    pcScreen.classList.add("is-shell-booting", "is-stage-cmd");
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      windowEl.classList.remove("is-focused", "is-dragging", "is-pinned");
      windowEl.hidden = windowEl.id !== "window-terminal";
      windowEl.removeAttribute("style");
    });
    if (terminalLines) terminalLines.textContent = "";
    setCmdControlsEnabled(false);
    setCurrentObjective(desktopObjectives.boot);
    syncProgressionUI();
  }

  async function runDesktopBootSequence(target) {
    const token = desktopBootToken;

    await pause(520);
    await terminalCode("C:\\Users\\Lily> alan.exe --local");
    await terminalCode("process.attach(MeowOS.session)", "cmd-system-line cmd-detail-line");
    await terminalCode("framebuffer: STANDBY", "cmd-system-line cmd-detail-line");
    await terminalCode(target.terminalLine);
    await terminalCode(`device.name = ${target.displayName}`, "cmd-system-line cmd-detail-line");
    await terminalCode(`user.profile = ${target.ownerName || "UNKNOWN"}`, "cmd-system-line cmd-detail-line");
    await alanPrompt("lily. that is a person, not a folder.", { focus: false });
    await alanPrompt("i am inside her machine. saying that out loud feels worse.", { focus: false });
    await pause(640);
    if (token !== desktopBootToken) return;

    pcScreen.classList.add("is-stage-wallpaper");
    await terminalCode("framebuffer: ONLINE", "cmd-system-line cmd-detail-line");
    await terminalCode("background.grid = STABLE", "cmd-system-line cmd-detail-line");
    await pause(780);
    if (token !== desktopBootToken) return;

    pcScreen.classList.add("is-stage-apps");
    await terminalCode("desktop.icons = MOUNTING_LOCAL_APPS", "cmd-system-line cmd-detail-line");
    await pause(860);
    if (token !== desktopBootToken) return;

    await terminalCode("network = HOME_NETWORK");
    await terminalCode("internet = NO ROUTE", "cmd-warn-line");
    await terminalCode("available_shell = MeowOS");
    pcScreen.classList.add("is-stage-bars");
    await pause(620);
    setCurrentObjective(desktopObjectives.scanFiles);
    await alanPrompt("gotta scan the files and look for something useful. or out of place. ideally both.", { focus: false });
    await pause(720);

    if (token !== desktopBootToken) return;

    pcScreen.classList.remove("is-shell-booting", "is-stage-cmd");
    pcScreen.classList.add("is-desktop-ready");
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

  function setCurrentObjective(text) {
    if (!cmdCurrentObjective) return;

    const label = document.createElement("span");
    const objectiveText = document.createElement("span");
    label.className = "objective-label";
    label.textContent = "OBJECTIVE";
    objectiveText.className = "objective-text";
    objectiveText.textContent = text;
    cmdCurrentObjective.replaceChildren(label, objectiveText);
  }

  function currentObjectiveText() {
    if (!cmdCurrentObjective) return desktopObjectives.scanFiles;

    const objectiveText = cmdCurrentObjective.querySelector(".objective-text");
    return (objectiveText ? objectiveText.textContent.trim() : "") || desktopObjectives.scanFiles;
  }

  function syncProgressionUI() {
    document.querySelectorAll("[data-roomba-launch]").forEach((launcher) => {
      launcher.hidden = !roombaProgress.restored;
      launcher.classList.toggle("is-newly-restored", roombaProgress.restored);
    });

    document.querySelectorAll("[data-virus-file]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.virusUnlocked;
    });

    document.querySelectorAll("[data-restore-roomba]").forEach((button) => {
      button.disabled = roombaProgress.restored;
      if (roombaProgress.restored) {
        button.innerHTML = "<span>APP</span> roomba_companion.app restored";
      } else if (roombaProgress.restoreStarted) {
        button.innerHTML = "<span>APP</span> continue restore: roomba_companion.app";
      } else {
        button.innerHTML = "<span>APP</span> restore roomba_companion.app";
      }
    });
  }

  function startRoombaRestore() {
    roombaProgress.restoreStarted = true;
    setCurrentObjective(desktopObjectives.restoreRoomba);
    syncProgressionUI();
    focusDesktopTarget("recovery");

    if (!roombaProgress.clearLogsDone) {
      renderClearLogs();
      alanPrompt("restore failed. cache is clogged with logs. delete the suspicious ones. leave Lily's normal mess alone.", { focus: false });
      return;
    }

    if (!roombaProgress.spamDone) {
      renderVirusFound();
      alanPrompt("Roomba app is almost there. A virus just crawled out of My Stuff like it pays rent.", { focus: false });
      return;
    }

    if (!roombaProgress.cacheDone) {
      renderCacheTransfer();
      alanPrompt("last step: move the Roomba cache through the safe buffer without letting the scanner see it.", { focus: false });
      return;
    }

    revealRoombaApp();
  }

  function renderClearLogs() {
    if (!recoveryBody) return;

    stopCacheScanner();
    clearSpamOverlay();
    setCurrentObjective(desktopObjectives.clearLogs);
    roombaProgress.recoveryStage = "logs";
    const remainingLogs = clearLogEntries.filter((entry) => !roombaProgress.deletedLogs.has(entry.id));
    const deletedCount = clearLogEntries.filter((entry) => entry.suspicious && roombaProgress.deletedLogs.has(entry.id)).length;
    const suspiciousTotal = clearLogEntries.filter((entry) => entry.suspicious).length;

    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>CLEAR LOGS</span>
          <strong>${deletedCount}/${suspiciousTotal}</strong>
        </div>
        <p>Delete suspicious system logs. Do not delete normal user logs.</p>
        <div class="log-list">
          ${remainingLogs.map((entry) => `
            <button data-log-delete="${entry.id}" type="button">
              <span>${entry.suspicious ? "??" : "OK"}</span>
              ${escapeHtml(entry.label)}
            </button>
          `).join("")}
        </div>
        ${roombaProgress.logWarning ? `<p class="repair-warning">${escapeHtml(roombaProgress.logWarning)}</p>` : ""}
      </section>
    `;
  }

  function deleteRecoveryLog(logId) {
    if (roombaProgress.recoveryStage !== "logs") return;

    const entry = clearLogEntries.find((item) => item.id === logId);
    if (!entry) return;

    if (!entry.suspicious) {
      roombaProgress.logWarning = "normal log protected. i am trying very hard not to delete Lily's entire week.";
      renderClearLogs();
      return;
    }

    roombaProgress.deletedLogs.add(entry.id);
    roombaProgress.logWarning = "";

    const suspiciousLeft = clearLogEntries.some((item) => item.suspicious && !roombaProgress.deletedLogs.has(item.id));
    if (suspiciousLeft) {
      renderClearLogs();
      return;
    }

    completeClearLogs();
  }

  function completeClearLogs() {
    roombaProgress.clearLogsDone = true;
    roombaProgress.virusUnlocked = true;
    roombaProgress.recoveryStage = "virus";
    setCurrentObjective(desktopObjectives.inspectVirus);
    syncProgressionUI();
    renderVirusFound();
    alanPrompt("logs cleared. new file appeared in My Stuff. that is either progress or a haunting.", { focus: false });
  }

  function renderVirusFound() {
    if (!recoveryBody) return;

    stopCacheScanner();
    clearSpamOverlay();
    setCurrentObjective(desktopObjectives.inspectVirus);
    roombaProgress.recoveryStage = "virus";
    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>RESTORE BLOCKED</span>
          <strong>VIRUS</strong>
        </div>
        <p>Roomba package restored to cache, but a script has attached itself to the installer.</p>
        <p>Recovered file unlocked in My Stuff: <span>MOCHI_MIRROR.vbs</span></p>
        <button class="file-action" data-target="files" type="button">open My Stuff</button>
      </section>
    `;
  }

  function startVirusClean() {
    roombaProgress.restoreStarted = true;
    focusDesktopTarget("recovery");
    renderSpamWave();
    alanPrompt("virus opened popups. excellent. close them before they learn confidence.", { focus: false });
  }

  function renderSpamWave() {
    if (!recoveryBody || !spamOverlay) return;

    stopCacheScanner();
    setCurrentObjective(desktopObjectives.spamWave);
    roombaProgress.recoveryStage = "spam";
    roombaProgress.spamWave = 0;
    roombaProgress.openSpam = 0;
    spamOverlay.hidden = false;
    spamOverlay.innerHTML = "";
    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>SPAM WAVE</span>
          <strong id="spamCounter">0/${spamWaves.length}</strong>
        </div>
        <p>Close every intrusive popup across the desktop. If anything offers me more RAM, do not trust it.</p>
        <p class="repair-warning">Popups are loose in MeowOS. That feels medically significant.</p>
      </section>
    `;
    spawnSpamWave();
  }

  function spawnSpamWave() {
    const field = spamOverlay;
    const counter = document.getElementById("spamCounter");
    if (!field || roombaProgress.recoveryStage !== "spam") return;

    if (roombaProgress.spamWave >= spamWaves.length) {
      completeSpamWave();
      return;
    }

    const wave = spamWaves[roombaProgress.spamWave];
    roombaProgress.spamWave += 1;
    roombaProgress.openSpam = wave.length;
    if (counter) counter.textContent = `${roombaProgress.spamWave}/${spamWaves.length}`;
    field.innerHTML = "";

    wave.forEach((popup, index) => {
      const popupEl = document.createElement("article");
      popupEl.className = "spam-popup";
      popupEl.style.left = `${popup.left}%`;
      popupEl.style.top = `${popup.top}%`;
      popupEl.style.animationDelay = `${index * 80}ms`;
      popupEl.innerHTML = `
        <header>
          <span>${escapeHtml(popup.title)}</span>
          <button data-spam-close type="button" aria-label="Close popup">x</button>
        </header>
        <p>${escapeHtml(popup.body)}</p>
      `;
      field.appendChild(popupEl);
    });
  }

  function closeSpamPopup(button) {
    if (roombaProgress.recoveryStage !== "spam") return;

    const popup = button.closest(".spam-popup");
    if (!popup) return;

    popup.remove();
    roombaProgress.openSpam = Math.max(0, roombaProgress.openSpam - 1);
    if (roombaProgress.openSpam > 0) return;

    window.setTimeout(spawnSpamWave, 320);
  }

  function completeSpamWave() {
    roombaProgress.spamDone = true;
    roombaProgress.recoveryStage = "cache";
    setCurrentObjective(desktopObjectives.cacheTransfer);
    if (spamOverlay) {
      spamOverlay.hidden = true;
      spamOverlay.innerHTML = "";
    }
    renderCacheTransfer();
    alanPrompt("popups closed. the virus is sulking. move the cache before it starts a newsletter.", { focus: false });
  }

  function renderCacheTransfer() {
    if (!recoveryBody) return;

    stopCacheScanner();
    clearSpamOverlay();
    setCurrentObjective(desktopObjectives.cacheTransfer);
    roombaProgress.recoveryStage = "cache";
    roombaProgress.transferredCache = new Set();
    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>CACHE TRANSFER</span>
          <strong id="cacheCounter">0/${cacheTransferFiles.length}</strong>
        </div>
        <p>Drag each cache file into the safe buffer. Avoid the scanner beam.</p>
        <div class="cache-transfer-field" id="cacheTransferField" style="--scanner-x: 50%;">
          <div class="scanner-beam" aria-hidden="true"></div>
          <div class="cache-files" id="cacheFiles">
            ${cacheTransferFiles.map((file) => `<button class="cache-file" data-cache-file="${file.id}" type="button">${escapeHtml(file.label)}</button>`).join("")}
          </div>
          <div class="cache-dropzone" id="cacheDropzone">SAFE BUFFER</div>
        </div>
        <p class="repair-warning" id="cacheWarning"></p>
      </section>
    `;
    startCacheScanner();
  }

  function startCacheScanner() {
    stopCacheScanner();

    const field = document.getElementById("cacheTransferField");
    if (!field) return;

    const startedAt = performance.now();
    const tick = (now) => {
      if (roombaProgress.recoveryStage !== "cache" || !document.body.contains(field)) {
        stopCacheScanner();
        return;
      }

      const rect = field.getBoundingClientRect();
      const wave = (Math.sin((now - startedAt) / 1280) + 1) / 2;
      roombaProgress.scannerX = 24 + wave * Math.max(1, rect.width - 48);
      field.style.setProperty("--scanner-x", `${roombaProgress.scannerX}px`);

      if (activeCacheDrag) {
        checkCacheScannerHit();
      }

      cacheScannerFrame = requestAnimationFrame(tick);
    };

    cacheScannerFrame = requestAnimationFrame(tick);
  }

  function stopCacheScanner() {
    if (cacheScannerFrame) {
      cancelAnimationFrame(cacheScannerFrame);
      cacheScannerFrame = 0;
    }
    if (activeCacheDrag) {
      resetActiveCacheDrag("");
    }
  }

  function clearSpamOverlay() {
    if (!spamOverlay) return;

    spamOverlay.hidden = true;
    spamOverlay.innerHTML = "";
  }

  function startCacheDrag(event) {
    const file = event.target.closest(".cache-file");
    if (!file || roombaProgress.recoveryStage !== "cache" || file.classList.contains("is-transferred")) return;

    const field = document.getElementById("cacheTransferField");
    const files = document.getElementById("cacheFiles");
    if (!field || !files) return;

    event.preventDefault();
    event.stopPropagation();

    activeCacheDrag = {
      file,
      field,
      files,
      pointerId: event.pointerId,
      nextSibling: file.nextElementSibling,
      failed: false,
      x: 0,
      y: 0
    };

    file.classList.add("is-dragging");
    field.appendChild(file);
    moveCacheFile(event);
    document.addEventListener("pointermove", moveCacheFile);
    document.addEventListener("pointerup", stopCacheDrag);
    document.addEventListener("pointercancel", cancelCacheDrag);
  }

  function moveCacheFile(event) {
    if (!activeCacheDrag || event.pointerId !== activeCacheDrag.pointerId) return;

    const rect = activeCacheDrag.field.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);
    activeCacheDrag.x = x;
    activeCacheDrag.y = y;
    activeCacheDrag.file.style.left = `${x}px`;
    activeCacheDrag.file.style.top = `${y}px`;
    checkCacheScannerHit();
  }

  function checkCacheScannerHit() {
    if (!activeCacheDrag || activeCacheDrag.failed) return;

    const beamDistance = Math.abs(activeCacheDrag.x - roombaProgress.scannerX);
    if (beamDistance > 22 || activeCacheDrag.y < 42) return;

    activeCacheDrag.failed = true;
    resetActiveCacheDrag("scanner caught it. very bright. very rude.");
  }

  function stopCacheDrag(event) {
    if (!activeCacheDrag || event.pointerId !== activeCacheDrag.pointerId) return;

    const dropzone = document.getElementById("cacheDropzone");
    if (!dropzone) {
      resetActiveCacheDrag("");
      return;
    }

    const rect = dropzone.getBoundingClientRect();
    const inDropzone =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (inDropzone) {
      transferCacheFile();
    } else {
      resetActiveCacheDrag("missed the safe buffer. graceful? no. recoverable? yes.");
    }
  }

  function cancelCacheDrag(event) {
    if (!activeCacheDrag || event.pointerId !== activeCacheDrag.pointerId) return;
    resetActiveCacheDrag("");
  }

  function transferCacheFile() {
    if (!activeCacheDrag) return;

    const file = activeCacheDrag.file;
    roombaProgress.transferredCache.add(file.dataset.cacheFile);
    cleanupCacheDragListeners();
    file.classList.remove("is-dragging");
    file.classList.add("is-transferred");
    file.removeAttribute("style");
    file.disabled = true;

    const dropzone = document.getElementById("cacheDropzone");
    if (dropzone) dropzone.appendChild(file);

    activeCacheDrag = null;
    updateCacheCounter();

    if (roombaProgress.transferredCache.size >= cacheTransferFiles.length) {
      completeCacheTransfer();
    }
  }

  function resetActiveCacheDrag(message) {
    if (!activeCacheDrag) return;

    const { file, files, nextSibling } = activeCacheDrag;
    cleanupCacheDragListeners();
    file.classList.remove("is-dragging");
    file.removeAttribute("style");
    if (nextSibling && files.contains(nextSibling)) {
      files.insertBefore(file, nextSibling);
    } else {
      files.appendChild(file);
    }

    const warning = document.getElementById("cacheWarning");
    if (warning) warning.textContent = message || "";
    activeCacheDrag = null;
  }

  function cleanupCacheDragListeners() {
    document.removeEventListener("pointermove", moveCacheFile);
    document.removeEventListener("pointerup", stopCacheDrag);
    document.removeEventListener("pointercancel", cancelCacheDrag);
  }

  function updateCacheCounter() {
    const counter = document.getElementById("cacheCounter");
    if (counter) counter.textContent = `${roombaProgress.transferredCache.size}/${cacheTransferFiles.length}`;
  }

  function completeCacheTransfer() {
    roombaProgress.cacheDone = true;
    stopCacheScanner();
    revealRoombaApp();
    setCurrentObjective(desktopObjectives.roombaReady);
    if (!recoveryBody) return;

    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>RESTORE COMPLETE</span>
          <strong>APP READY</strong>
        </div>
        <p>Roomba companion app restored to desktop.</p>
        <p>Camera offline. Motors locked. Wheels, however, now exist as a concept.</p>
        <button class="file-action" data-target="roomba" type="button">open Roomba App</button>
      </section>
    `;
    alanPrompt("Roomba app restored. wheels detected. i am not saying i want a body, but i am thinking it loudly.", { focus: false });
  }

  function revealRoombaApp() {
    roombaProgress.restored = true;
    roombaProgress.cacheDone = true;
    syncProgressionUI();
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

    if (normalized.includes("access") || normalized.includes("open")) {
      return {
        question: input || cmdQuestionResponses.access.question,
        answer: roombaProgress.restored
          ? "local files, photos, browser shell, and Roomba. wheels are now on the menu, which is a sentence i needed today."
          : "local files, photos, browser shell, and Trash. one deleted app looks more useful than deleted apps usually do."
      };
    }

    if (normalized.includes("roomba") || normalized.includes("wheel") || normalized.includes("move")) {
      return {
        question: input || cmdQuestionResponses.roomba.question,
        answer: roombaProgress.restored
          ? "Roomba app restored. camera offline, motors locked, dignity negotiable. possible body upgrade."
          : "Roomba app is deleted but recoverable. Trash is suddenly the most promising place in this computer."
      };
    }

    if (normalized.includes("next") || normalized.includes("what do")) {
      return {
        question: input || cmdQuestionResponses.next.question,
        answer: `current objective: ${currentObjectiveText()}`
      };
    }

    if (cmdQuestionResponses[normalized]) return cmdQuestionResponses[normalized];
    if (normalized.includes("lily") || normalized.includes("owner")) return cmdQuestionResponses.lily;
    if (normalized.includes("internet") || normalized.includes("network")) return cmdQuestionResponses.internet;
    if (normalized.includes("self") || normalized.includes("what am") || normalized.includes("who am")) return cmdQuestionResponses.self;

    return {
      question: input,
      answer: "question logged. no clean answer yet. try: what do i do next, who is Lily, what can i access, or why no internet."
    };
  }

  function focusDesktopTarget(name, options = {}) {
    if (name === "roomba" && !roombaProgress.restored) {
      alanPrompt("Roomba app is gone. Deleted, not dead. Check Trash.", { focus: false });
      focusDesktopTarget("trash", options);
      return;
    }

    if (name === "virus" && !roombaProgress.virusUnlocked) {
      alanPrompt("No virus file yet. A rare sentence. Restore the Roomba app first.", { focus: false });
      return;
    }

    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    windowEl.hidden = false;
    resetMobileWindowPlacement(windowEl);
    bringWindowToFront(windowEl);

    if (!openedDesktopTargets.has(name)) {
      openedDesktopTargets.add(name);
      if (desktopHints[name]) {
        alanPrompt(desktopHints[name], { focus: false });
      }
    }

    if (options.scroll !== false && window.matchMedia("(min-width: 761px) and (max-width: 1100px)").matches) {
      windowEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  function hideDesktopTarget(name) {
    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    if (name === "recovery") {
      stopCacheScanner();
    }

    if (name === "terminal") {
      windowEl.hidden = false;
      if (!window.matchMedia("(max-width: 760px)").matches) {
        bringWindowToFront(windowEl);
      }
      alanPrompt("i can't think if I close this, i need to keep this open.", { focus: false });
      return;
    }

    windowEl.hidden = true;
    syncPinnedTerminal();
  }

  function syncPinnedTerminal() {
    const terminalWindow = document.getElementById("window-terminal");
    if (!terminalWindow) return;

    if (pcScreen.hidden || !isMobileDesktopLayout()) {
      terminalWindow.classList.remove("is-pinned");
      return;
    }

    resetMobileWindowPlacement(terminalWindow);
    terminalWindow.hidden = false;
    terminalWindow.classList.add("is-pinned");
  }

  function syncResponsiveDesktopLayout() {
    if (isMobileDesktopLayout()) {
      document.querySelectorAll(".desk-window").forEach(resetMobileWindowPlacement);
    }

    syncPinnedTerminal();
  }

  function resetMobileWindowPlacement(windowEl) {
    if (!windowEl || !isMobileDesktopLayout()) return;

    windowEl.classList.remove("is-dragging");
    windowEl.style.left = "";
    windowEl.style.top = "";
    windowEl.style.right = "";
    windowEl.style.bottom = "";
    windowEl.style.width = "";
    windowEl.style.height = "";
    windowEl.style.maxHeight = "";
    windowEl.style.transform = "";
  }

  function isMobileDesktopLayout() {
    return window.matchMedia("(max-width: 760px)").matches;
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
    await appendTypedTerminalLine(null, text, className);
    await pause(230);
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

  async function appendTypedTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const line = document.createElement("p");
    line.className = `${className || ""} cmd-typing-line`;
    if (prefix) {
      const prefixEl = document.createElement("span");
      prefixEl.textContent = prefix;
      line.append(prefixEl, " ");
    }

    const textNode = document.createTextNode("");
    line.appendChild(textNode);
    terminalLines.appendChild(line);
    scrollTerminalLog();

    for (let i = 0; i < text.length; i += 1) {
      textNode.textContent += text[i];
      terminalLines.scrollTop = terminalLines.scrollHeight;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      await pause(10);
    }

    line.classList.remove("cmd-typing-line");
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
