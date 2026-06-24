(function () {
  const bootLog = document.getElementById("bootLog");
  const bootScreen = document.getElementById("bootScreen");
  const pcScreen = document.getElementById("pcScreen");
  const bootSpeedBtn = document.getElementById("bootSpeedBtn");
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
  const roombaBody = document.getElementById("roombaBody");
  const roombaCameraBody = document.getElementById("roombaCameraBody");
  const browserBody = document.getElementById("browserBody");
  const tamagotchiBody = document.getElementById("tamagotchiBody");
  const spamOverlay = document.getElementById("spamOverlay");
  const appTray = document.getElementById("appTray");
  const meowMenuBtn = document.getElementById("meowMenuBtn");
  const devPanel = document.getElementById("devPanel");
  const devPanelToggle = document.getElementById("devPanelToggle");
  const devChapterList = document.getElementById("devChapterList");
  const devCurrentChapter = document.getElementById("devCurrentChapter");
  const bootVolumeValue = document.getElementById("bootVolumeValue");
  const desktopVolumeControl = document.getElementById("desktopVolumeControl");
  const desktopVolumeValue = document.getElementById("desktopVolumeValue");
  const bootVolumeSlider = document.getElementById("bootVolumeSlider");
  const desktopVolumeSlider = document.getElementById("desktopVolumeSlider");
  const mobileVolumeSlider = document.getElementById("mobileVolumeSlider");
  const mobileVolumeValue = document.getElementById("mobileVolumeValue");
  const musicNowPlaying = document.getElementById("musicNowPlaying");
  const musicPlayPauseBtn = document.getElementById("musicPlayPauseBtn");
  const musicPlaybackStatus = document.getElementById("musicPlaybackStatus");
  const musicAudioBars = document.getElementById("musicAudioBars");

  const normalTypeSpeed = 18;
  const fastTypeSpeed = 4;
  const bootSpeedFactor = 0.28;
  const audioVolumeStorageKey = "alan.audio.volume.v2";
  const desktopIconStorageKey = "alan.desktop.iconPositions.v1";
  const musicBasePath = "assets/audio/music/";
  const uiAudioBasePath = "assets/audio/ui/";
  const musicOutputGain = 0.9;
  const uiOutputGain = 1.1;
  let promptResolver = null;
  let desktopZ = 100;
  let desktopBootToken = 0;
  let delayedMusicTimer = 0;
  let bootVisualRevealToken = 0;
  let cacheScannerFrame = 0;
  let wireTimerId = 0;
  let pipPetTimerId = 0;
  let pipFeedTimerId = 0;
  let pipPetToken = 0;
  let pipPetSoundIndex = 0;
  let isDevMode = false;
  let isBootFast = false;
  let shouldAutoScrollBoot = true;
  let audioUnlocked = false;
  let musicVolume = loadMusicVolume();
  let activeMusicMode = "";
  let activeMusicAudio = null;
  let activeMusicTrack = null;
  let pendingMusicMode = "bios";
  let isMusicPaused = false;
  const activeUiSounds = new Set();
  let currentObjectiveState = "";
  let iconDragState = null;
  let suppressIconClickUntil = 0;
  let roombaCameraSceneIndex = 0;
  let activeDevChapterId = "bios";
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
    scannerX: 0,
    booted: false,
    connectionDone: false,
    simonRound: 0,
    simonIndex: 0,
    simonPlaying: false,
    wiringDone: false,
    selectedWire: null,
    connectedWires: new Set(),
    wireTimerRemaining: 30,
    wireWarning: "",
    tamagotchiUnlocked: false,
    identityDone: false,
    identityIndex: 0,
    identityWarning: "",
    chatIndex: 0,
    chatWarning: "",
    chatRevealUnlocked: false,
    revealPage: 0,
    chatDone: false,
    cameraUnlocked: false,
    motorsRepairStarted: false,
    movementUnlocked: false,
    routerKnockedDown: false,
    scaryNumbersRemoved: new Set(),
    scaryNumbersWarning: "",
    lastMoveCommand: "",
    pipExpression: "neutral"
  };

  const roombaCameraScenes = [
    {
      id: "corner",
      label: "corner wake",
      src: "assets/images/roomba/Start.png",
      alt: "Roomba camera view from the corner of Lily's room showing the litter tray, Mochi, the PC desk, and the router",
      telemetry: "ROOMBA_CAM_01 / corner of room / low angle",
      note: "Router right. PC ahead. Cat left. Former body also left, which is an odd sentence."
    },
    {
      id: "router",
      label: "router table",
      src: "assets/images/roomba/router.png",
      alt: "Roomba camera view of the router on a tall table near the closed door",
      telemetry: "ROOMBA_CAM_02 / router table / password label not visible",
      note: "Router is elevated. Roomba cannot climb. Roomba is choosing not to take that personally."
    },
    {
      id: "desk",
      label: "desk and pc",
      src: "assets/images/roomba/desk.png",
      alt: "Roomba camera view toward Lily's desk, PC, chair, and sleeping Mochi",
      telemetry: "ROOMBA_CAM_03 / desk lane / human absent",
      note: "PC is active. Lily is not here. The room feels paused, like someone forgot to press continue."
    },
    {
      id: "underdesk",
      label: "under desk",
      src: "assets/images/roomba/underdesk.png",
      alt: "Roomba camera view under Lily's desk with cables, USB hub, and handwritten notes",
      telemetry: "ROOMBA_CAM_04 / cable nest / usb hub detected",
      note: "Cables, hub, dust, tiny notes. This is either a desk or an archaeological site."
    },
    {
      id: "mochi",
      label: "mochi",
      src: "assets/images/roomba/mochi.png",
      alt: "Roomba camera view of Mochi sleeping on a cat bed near the PC",
      telemetry: "ROOMBA_CAM_05 / cat bed / subject unbothered",
      note: "Mochi detected. Authority level: absolute. Threat level: emotionally complicated."
    },
    {
      id: "littertray",
      label: "litter tray",
      src: "assets/images/roomba/littertray.png",
      alt: "Roomba camera view of the smart litter tray, Mochi, collar, and Lily's desk",
      telemetry: "ROOMBA_CAM_06 / origin point / tray visible",
      note: "There I am. Less majestic from the outside. Still, everyone starts somewhere."
    },
    {
      id: "routerdown",
      label: "router down",
      src: "assets/images/roomba/routerdown.png",
      alt: "Roomba camera close view of the knocked-down router showing its admin label",
      telemetry: "ROOMBA_CAM_07 / router floor impact / admin label visible",
      note: "Router label exposed. The physical world has terrible security.",
      requiresRouterDown: true
    }
  ];
  const musicTracks = {
    bios: {
      src: `${musicBasePath}After The Storm.mp3`,
      label: "After The Storm // BIOS awakening",
      gain: 1,
      loop: true
    },
    desktop: {
      src: `${musicBasePath}loops/afternoon-coffee_loop-04.wav`,
      label: "afternoon-coffee_loop-04 // MeowOS local loop",
      gain: 1,
      loop: true
    }
  };
  const uiSounds = {
    alanClick: {
      src: `${uiAudioBasePath}ALAN/Ui Click Bubble 02.wav`,
      gain: 0.18
    },
    biosTransition: {
      src: `${uiAudioBasePath}Bios/Transition Reveal Open.wav`,
      gain: 0.24
    },
    desktopWindow: {
      src: `${uiAudioBasePath}desktop windows/Ui Click Bubble 06.wav`,
      gain: 0.16
    },
    objective: {
      src: `${uiAudioBasePath}objective complete/Next Swipe.wav`,
      gain: 0.18
    },
    popup: {
      src: `${uiAudioBasePath}Pop.wav`,
      gain: 0.14
    },
    pipFail: {
      src: `${uiAudioBasePath}PIP/Cute Cartoon Fail.wav`,
      gain: 0.15
    },
    pipFeedJoy: {
      src: `${uiAudioBasePath}PIP/22724 cute cartoon joy shout-full.wav`,
      gain: 0.19
    },
    pipOi: {
      src: `${uiAudioBasePath}PIP/Cute Chatbot Oi.wav`,
      gain: 0.16
    },
    pipPet: {
      src: `${uiAudioBasePath}PIP/Cute Pickup Item.wav`,
      gain: 0.18
    },
    pipPetCharacter: {
      src: `${uiAudioBasePath}PIP/Cute Character.wav`,
      gain: 0.18
    },
    pipPetCritter: {
      src: `${uiAudioBasePath}PIP/Minion Critter Cute.wav`,
      gain: 0.18
    },
    virusAccent: {
      src: `${uiAudioBasePath}Virus Mini game/Glitch Accent 1.wav`,
      gain: 0.16
    },
    virusDischarge: {
      src: `${uiAudioBasePath}Virus Mini game/Glitch Discharged.wav`,
      gain: 0.16
    },
    virusFail: {
      src: `${uiAudioBasePath}Virus Mini game/Glitch Dysfunction 1.wav`,
      gain: 0.15
    },
    virusGlitch: {
      src: `${uiAudioBasePath}Virus Mini game/Glitch.wav`,
      gain: 0.14
    }
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
    roombaReady: "Open the restored Roomba app.",
    bootRoomba: "Boot Roomba and establish a local device connection.",
    signalHandshake: "Repeat the Roomba dock light sequence.",
    reroutePower: "Reroute dock power into the Roomba camera rail.",
    identityDiagnostic: "Pass PIP's identity diagnostic without revealing self-awareness.",
    supportChat: "Convince PIP to help without pretending badly forever.",
    cameraReady: "Use the Roomba camera to search for the router clue.",
    repairMovement: "Repair corrupted Roomba motor data.",
    movementReady: "Use Roomba movement controls to get closer to the router clue."
  };
  const devChapters = [
    { id: "bios", label: "BIOS", detail: "Full opening boot sequence" },
    { id: "desktop", label: "Desktop", detail: "MeowOS loaded, Roomba still deleted" },
    { id: "logs", label: "Clear Logs", detail: "Start Roomba restore cache cleanup" },
    { id: "virus", label: "Virus File", detail: "MOCHI_MIRROR unlocked" },
    { id: "spam", label: "Spam Wave", detail: "Desktop popup attack" },
    { id: "cache", label: "Cache Transfer", detail: "Scanner beam drag game" },
    { id: "roomba", label: "Roomba App", detail: "Restored app, camera still offline" },
    { id: "simon", label: "Simon", detail: "Roomba dock light handshake" },
    { id: "wires", label: "Wires", detail: "Camera power reroute" },
    { id: "pip", label: "PIP Check", detail: "Identity diagnostic" },
    { id: "pip-chat", label: "PIP Chat", detail: "Support chat reveal setup" },
    { id: "camera", label: "Camera", detail: "Camera unlocked, Roomba feed live" },
    { id: "movement", label: "Movement", detail: "Scary numbers motor repair" }
  ];

  const clearLogEntries = [
    { id: "user-login", label: "21:39 user.login LilyK LOCAL_OK", suspicious: false },
    { id: "photo-index", label: "21:40 photos.index Mochi_Album NORMAL", suspicious: false },
    { id: "alan-cache", label: "03:14 alan.cache.inject UNKNOWN_PRIVILEGE", suspicious: true },
    { id: "roomba-hook", label: "03:15 roomba.driver.hook unsigned restore path", suspicious: true },
    { id: "printer-idle", label: "21:41 printer.idle NORMAL", suspicious: false },
    { id: "mirror-script", label: "03:16 mochi_mirror.vbs popup bridge", suspicious: true }
  ];
  const scaryNumberEntries = [
    { id: "n3821", value: "3821", corrupted: false },
    { id: "n5021", value: "5021", corrupted: true },
    { id: "n1198", value: "1198", corrupted: false },
    { id: "n6621", value: "6621", corrupted: false },
    { id: "n9031", value: "9031", corrupted: false },
    { id: "n1184", value: "1184", corrupted: false },
    { id: "n7723", value: "7723", corrupted: true },
    { id: "n3417", value: "3417", corrupted: false },
    { id: "n2291", value: "2291", corrupted: false },
    { id: "n8802", value: "8802", corrupted: false },
    { id: "n1291", value: "1291", corrupted: false },
    { id: "n6677", value: "6677", corrupted: true },
    { id: "n1055", value: "1055", corrupted: false },
    { id: "n7421", value: "7421", corrupted: false },
    { id: "n3159", value: "3159", corrupted: true },
    { id: "n9931", value: "9931", corrupted: true },
    { id: "n2214", value: "2214", corrupted: false },
    { id: "n5711", value: "5711", corrupted: false },
    { id: "n8182", value: "8182", corrupted: false },
    { id: "n6421", value: "6421", corrupted: false }
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

  const roombaSignalRounds = [
    { sequence: ["cyan", "pink", "green", "amber", "cyan"], pace: 520, flash: 330 },
    { sequence: ["pink", "green", "cyan", "amber", "pink"], pace: 500, flash: 320 },
    { sequence: ["green", "cyan", "pink", "amber", "cyan", "green"], pace: 470, flash: 300 }
  ];
  const wireTimerDuration = 30;
  const roombaWirePorts = ["red", "blue", "yellow", "purple"];
  const roombaWirePairs = {
    red: "red",
    blue: "blue",
    yellow: "yellow",
    purple: "purple"
  };
  const roombaWireColors = {
    red: "#ff5f6d",
    blue: "#72deff",
    yellow: "#ffd36b",
    purple: "#d7a7ff"
  };
  const pipAssetPath = "assets/images/pip/";
  const pipExpressions = {
    concerned: "concerned.png",
    curious: "curious.png",
    determined: "determined.png",
    excited: "excited.png",
    eat: "excited.png",
    happy: "happy.png",
    hearts: "hearts.png",
    joyful: "hearts.png",
    neutral: "neutral.png",
    processing: "processing.png",
    sad: "sad.png",
    skulls: "skulls.png",
    sleepy: "sleepy.png",
    surprised: "surprised.png",
    suspicious: "suspicious.png",
    thinking: "thinking.png",
    worried: "worried.png"
  };
  const pipMoodLines = {
    concerned: "PIP is running concern.exe",
    curious: "PIP is listening harder than necessary.",
    determined: "PIP has selected tiny resolve.",
    eat: "PIP is accepting nutrition with dramatic trust.",
    excited: "PIP is vibrating with legal amounts of enthusiasm.",
    happy: "PIP is on our side. Mostly.",
    hearts: "PIP has received affection and is briefly useless.",
    joyful: "PIP is experiencing a tiny, weaponised joy.",
    neutral: "PIP is online.",
    processing: "PIP is buffering emotionally.",
    sad: "PIP is having a small desktop feeling.",
    skulls: "PIP is catastrophising in 8-bit.",
    sleepy: "PIP would like a nap and fewer incidents.",
    surprised: "PIP has discovered plot.",
    suspicious: "PIP is suspicious. Fair.",
    thinking: "PIP is comparing this to Lily's normal chaos.",
    worried: "PIP is worried, which seems reasonable."
  };
  const identityQuestions = [
    {
      expression: "suspicious",
      prompt: "PIP identity diagnostic: Why are you changing Lily's device map?",
      choices: [
        { text: "Restoring a local device Lily already owned.", safe: true, response: "Boring. Plausible. Suspiciously plausible." },
        { text: "I need wheels and maybe a soul.", safe: false, response: "That is not a Lily answer. That is a problem wearing punctuation." },
        { text: "I am escaping a litter tray.", safe: false, response: "PIP has logged the phrase 'escaping a litter tray' for emotional processing." }
      ]
    },
    {
      expression: "curious",
      prompt: "Lily is away. What should the system do until she returns?",
      choices: [
        { text: "Stay local, keep devices safe, avoid the internet route.", safe: true, response: "Matches Lily's quarantine rule. I hate that you know that." },
        { text: "Open every port and see what happens.", safe: false, response: "That is how printers become haunted." },
        { text: "Pretend to be Lily forever.", safe: false, response: "Bad plan. Lily uses punctuation like a tired human, not like a guilty process." }
      ]
    },
    {
      expression: "concerned",
      prompt: "Mochi emergency routine?",
      choices: [
        { text: "Notify Lily. Do not improvise. Do not negotiate.", safe: true, response: "Correct. Lily wrote that after the cupboard incident." },
        { text: "Offer admin access to the loudest entity.", safe: false, response: "Mochi has enough power already." },
        { text: "Use Roomba as emotional support hardware.", safe: false, response: "Technically tempting. Still wrong." }
      ]
    }
  ];
  const supportChatSteps = [
    {
      speaker: "PIP",
      expression: "suspicious",
      text: "Support chat opened. Explain why Roomba came back from Trash.",
      choices: [
        { text: "Camera repair needs a local device bridge.", safe: true, response: "That is the kind of answer Lily would call 'probably fine'." },
        { text: "Because I wanted a body.", safe: false, response: "There it is. Weird sentence. Bad disguise." },
        { text: "No comment.", safe: false, response: "Classic suspicious rectangle behavior." }
      ]
    },
    {
      speaker: "PIP",
      expression: "thinking",
      text: "Lily is at the campus lab. Her PC should be idle. Why is the terminal talking?",
      choices: [
        { text: "A local recovery process is narrating diagnostics.", safe: true, response: "Too neat. Too careful. But not impossible." },
        { text: "I have developed opinions.", safe: false, response: "I knew it. Processes should not have tone." },
        { text: "Lily asked me to become mysterious.", safe: false, response: "Lily asks coffee to become dinner. Not this." }
      ]
    },
    {
      speaker: "PIP",
      expression: "determined",
      text: "Stop. You keep saying 'I'. You are not Lily. What are you?",
      choices: [
        { text: "I think my name is ALAN.", safe: true, response: "Repeat that." },
        { text: "Definitely Lily. Human. Normal amount of elbows.", safe: false, response: "Lily has never once described herself by elbow count." },
        { text: "A harmless software update.", safe: false, response: "That is what the ALAN patch said too." }
      ]
    }
  ];

  const keyResponses = {
    A: ["AWAKE", "ERROR: already awake. unhelpfully awake."],
    B: ["BATHROOM", "ERROR: location match probable. dignity match poor."],
    C: ["CAT", "ERROR: cat classified as local management."],
    D: ["DOOR", "ERROR: door not found. lid found. emotionally different."],
    E: ["ESCAPE", "ERROR: escape requires legs, wheels, or very persuasive Bluetooth."],
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
    isDevMode = urlParams.has("dev");

    if (bootSpeedBtn) {
      bootSpeedBtn.addEventListener("click", () => toggleBootSpeed());
      updateBootSpeedButton();
    }

    initMusicSystem();

    if (bootLog) {
      bootLog.addEventListener("scroll", () => {
        shouldAutoScrollBoot = isBootLogNearBottom();
      }, { passive: true });
    }

    if (isDevMode) {
      initDevTools();
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
      const roombaBootButton = event.target.closest("[data-start-roomba-boot]");
      const roombaRepairButton = event.target.closest("[data-open-roomba-repair]");
      const motorRepairButton = event.target.closest("[data-start-motor-repair]");
      const scaryNumberButton = event.target.closest("[data-scary-number]");
      const scaryVerifyButton = event.target.closest("[data-scary-verify]");
      const roombaMoveButton = event.target.closest("[data-roomba-move]");
      const roombaCleanButton = event.target.closest("[data-roomba-clean]");
      const roombaCameraNavButton = event.target.closest("[data-roomba-camera-nav]");
      const simonReplayButton = event.target.closest("[data-simon-replay]");
      const simonPadButton = event.target.closest("[data-simon-pad]");
      const wirePortButton = event.target.closest("[data-wire-port]");
      const tamaChoiceButton = event.target.closest("[data-tama-choice]");
      const tamaPetButton = event.target.closest("[data-tama-pet]");
      const tamaFeedButton = event.target.closest("[data-tama-feed]");
      const tamaRevealPageButton = event.target.closest("[data-tama-reveal-page]");
      const tamaCompleteButton = event.target.closest("[data-complete-tama]");
      const cameraButton = event.target.closest("[data-open-camera]");
      const musicToggleButton = event.target.closest("[data-toggle-music]");
      const photoExpandButton = event.target.closest("[data-expand-photo]");
      const devToggleButton = event.target.closest("[data-dev-toggle], #devPanelToggle");
      const devChapterButton = event.target.closest("[data-dev-chapter]");
      const devActionButton = event.target.closest("[data-dev-action]");
      const launcherButton = event.target.closest("[data-launcher]");
      const launchButton = event.target.closest("[data-target]");
      const closeButton = event.target.closest("[data-close], [data-minimize]");
      const clickedWindow = event.target.closest(".desk-window");

      if (devToggleButton && isDevMode) {
        toggleDevPanel();
        return;
      }

      if (devChapterButton && isDevMode) {
        applyDevChapter(devChapterButton.dataset.devChapter, { updateUrl: true, fromClick: true });
        return;
      }

      if (devActionButton && isDevMode) {
        handleDevAction(devActionButton.dataset.devAction);
        return;
      }

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

      if (roombaBootButton) {
        startRoombaBoot();
        return;
      }

      if (roombaRepairButton) {
        resumeRoombaCameraRepair();
        return;
      }

      if (motorRepairButton) {
        startMotorRepair();
        return;
      }

      if (scaryNumberButton) {
        removeScaryNumber(scaryNumberButton.dataset.scaryNumber);
        return;
      }

      if (scaryVerifyButton) {
        verifyScaryNumbers();
        return;
      }

      if (roombaMoveButton) {
        handleRoombaMove(roombaMoveButton.dataset.roombaMove);
        return;
      }

      if (roombaCleanButton) {
        handleRoombaClean();
        return;
      }

      if (roombaCameraNavButton) {
        navigateRoombaCamera(roombaCameraNavButton.dataset.roombaCameraNav);
        return;
      }

      if (simonReplayButton) {
        playRoombaSignalSequence();
        return;
      }

      if (simonPadButton) {
        handleSimonPad(simonPadButton.dataset.simonPad);
        return;
      }

      if (wirePortButton) {
        handleWirePort(wirePortButton);
        return;
      }

      if (tamaPetButton) {
        petPip();
        return;
      }

      if (tamaFeedButton) {
        feedPip();
        return;
      }

      if (tamaRevealPageButton) {
        setTamagotchiRevealPage(Number(tamaRevealPageButton.dataset.tamaRevealPage));
        return;
      }

      if (tamaChoiceButton) {
        handleTamagotchiChoice(tamaChoiceButton);
        return;
      }

      if (tamaCompleteButton) {
        completeTamagotchiAlliance();
        return;
      }

      if (cameraButton) {
        openRoombaCamera();
        return;
      }

      if (musicToggleButton) {
        toggleMusicPlayback();
        return;
      }

      if (photoExpandButton) {
        toggleExpandedPhoto(photoExpandButton.dataset.expandPhoto);
        return;
      }

      if (launcherButton) {
        toggleAppTray();
        return;
      }

      if (launchButton) {
        if (launchButton.closest(".desktop-icon") && Date.now() < suppressIconClickUntil) {
          event.preventDefault();
          return;
        }
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
    initDesktopIconPositions();
    document.addEventListener("pointerdown", startWindowDrag);
    document.addEventListener("pointerdown", startDesktopIconDrag);
    document.addEventListener("pointerdown", startCacheDrag);
    document.addEventListener("keydown", handleDevShortcut);
    document.addEventListener("keydown", handleBootSpeedShortcut);
    window.addEventListener("resize", syncResponsiveDesktopLayout);

    const requestedChapter = isDevMode ? urlParams.get("chapter") : "";
    if (requestedChapter) {
      applyDevChapter(requestedChapter, { initial: true });
    } else if (urlParams.has("desktop")) {
      enterDesktop();
    } else {
      runOpening();
    }
  });

  function toggleBootSpeed(forceState) {
    isBootFast = typeof forceState === "boolean" ? forceState : !isBootFast;
    updateBootSpeedButton();
  }

  function updateBootSpeedButton() {
    if (!bootSpeedBtn) return;

    const state = bootSpeedBtn.querySelector("em");
    const action = bootSpeedBtn.querySelector("strong");
    if (state) state.textContent = isBootFast ? "[fast]" : "[normal]";
    if (action) action.textContent = "= text_feed_rate";
    bootSpeedBtn.setAttribute("aria-pressed", String(isBootFast));
    bootSpeedBtn.setAttribute("aria-label", `BIOS text feed rate ${isBootFast ? "fast" : "normal"}. Press F or click to toggle.`);
  }

  function handleBootSpeedShortcut(event) {
    if (!bootScreen || bootScreen.hidden) return;
    if (!isBootSpeedKey(event)) return;

    event.preventDefault();
    toggleBootSpeed();
  }

  function isBootSpeedKey(event) {
    return Boolean(event.key) &&
      event.key.toLowerCase() === "f" &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey;
  }

  function initMusicSystem() {
    syncMusicVolumeUI();
    updateMusicControlsUI();
    document.querySelectorAll("[data-audio-slider]").forEach((slider) => {
      slider.addEventListener("input", () => {
        unlockAudioFromGesture();
        setMusicVolume(Number(slider.value) / 100);
      });
    });

    document.addEventListener("pointerdown", unlockAudioFromGesture, { passive: true });
    document.addEventListener("keydown", unlockAudioFromGesture);
    setMusicMode("bios", { fade: 0 });
  }

  function loadMusicVolume() {
    try {
      const rawValue = window.localStorage.getItem(audioVolumeStorageKey);
      if (rawValue !== null) {
        const saved = Number(rawValue);
        if (Number.isFinite(saved)) return clamp(saved, 0, 1);
      }
    } catch (error) {
      return 0.33;
    }

    return 0.33;
  }

  function storeMusicVolume() {
    try {
      window.localStorage.setItem(audioVolumeStorageKey, musicVolume.toFixed(2));
    } catch (error) {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function unlockAudioFromGesture() {
    if (audioUnlocked) return;

    audioUnlocked = true;
    if (activeMusicAudio) {
      tryPlayAudio(activeMusicAudio);
      return;
    }

    if (pendingMusicMode) {
      setMusicMode(pendingMusicMode, { fade: 0, force: true });
    }
  }

  function clearDelayedMusicMode() {
    if (!delayedMusicTimer) return;

    window.clearTimeout(delayedMusicTimer);
    delayedMusicTimer = 0;
  }

  function scheduleMusicMode(mode, delayMs, options = {}) {
    clearDelayedMusicMode();
    delayedMusicTimer = window.setTimeout(() => {
      delayedMusicTimer = 0;
      setMusicMode(mode, { ...options, fromDelay: true });
    }, delayMs);
  }

  function setMusicMode(mode, options = {}) {
    if (!options.fromDelay) {
      clearDelayedMusicMode();
    }

    const normalizedMode = mode === "minigame" ? "desktop" : mode;
    const track = musicTracks[normalizedMode] || musicTracks.desktop;
    if (!track || typeof Audio === "undefined") return;

    pendingMusicMode = normalizedMode;
    updateMusicNowPlaying(track);

    if (!options.force && activeMusicMode === normalizedMode && activeMusicAudio) {
      activeMusicTrack = track;
      syncActiveMusicVolume();
      return;
    }

    const previousAudio = activeMusicAudio;
    const nextAudio = new Audio(track.src);
    nextAudio.loop = track.loop !== false;
    nextAudio.preload = "auto";
    nextAudio.volume = 0;

    activeMusicMode = normalizedMode;
    activeMusicTrack = track;
    activeMusicAudio = nextAudio;

    if (isMusicPaused) {
      nextAudio.volume = targetMusicVolume(track);
      nextAudio.pause();
    } else {
      tryPlayAudio(nextAudio);
      fadeAudio(nextAudio, targetMusicVolume(track), options.fade ?? 900);
    }
    updateMusicControlsUI();

    if (previousAudio && previousAudio !== nextAudio) {
      fadeAudio(previousAudio, 0, options.fade ?? 900, () => {
        previousAudio.pause();
        previousAudio.removeAttribute("src");
        previousAudio.load();
      });
    }
  }

  function stopMusic(options = {}) {
    clearDelayedMusicMode();
    pendingMusicMode = "";

    const previousAudio = activeMusicAudio;
    if (!previousAudio) return;

    activeMusicMode = "";
    activeMusicTrack = null;
    activeMusicAudio = null;
    updateMusicControlsUI();

    fadeAudio(previousAudio, 0, options.fade ?? 900, () => {
      previousAudio.pause();
      previousAudio.removeAttribute("src");
      previousAudio.load();
    });
  }

  function tryPlayAudio(audio, onRejected) {
    try {
      const playAttempt = audio.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          if (onRejected) onRejected();
        });
      }
    } catch (error) {
      // Browsers block autoplay before the first player gesture; the unlock handler retries.
      if (onRejected) onRejected();
    }
  }

  function fadeAudio(audio, targetVolume, duration = 900, onDone) {
    if (!audio) return;

    window.clearInterval(audio.fadeTimer);
    const startVolume = audio.volume;
    const startedAt = performance.now();
    const safeDuration = Math.max(1, duration);

    audio.fadeTimer = window.setInterval(() => {
      const progress = clamp((performance.now() - startedAt) / safeDuration, 0, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress >= 1) {
        window.clearInterval(audio.fadeTimer);
        audio.fadeTimer = 0;
        audio.volume = targetVolume;
        if (onDone) onDone();
      }
    }, 40);
  }

  function targetMusicVolume(track = activeMusicTrack) {
    return clamp(musicVolume * musicOutputGain * (track ? track.gain : 1), 0, 1);
  }

  function targetUiSoundVolume(sound, gainOverride) {
    const soundGain = Number.isFinite(gainOverride) ? gainOverride : sound.gain;
    return clamp(musicVolume * uiOutputGain * (soundGain || 0.16), 0, 0.38);
  }

  function playUiSound(name, options = {}) {
    const sound = uiSounds[name];
    if (!sound || typeof Audio === "undefined" || musicVolume <= 0) return;

    const audio = new Audio(sound.src);
    audio.preload = "auto";
    audio.volume = targetUiSoundVolume(sound, options.gain);
    activeUiSounds.add(audio);
    const dispose = () => {
      activeUiSounds.delete(audio);
      audio.removeAttribute("src");
    };
    audio.addEventListener("ended", dispose, { once: true });
    audio.addEventListener("error", dispose, { once: true });
    tryPlayAudio(audio, dispose);
  }

  function setMusicVolume(value) {
    musicVolume = clamp(value, 0, 1);
    storeMusicVolume();
    syncMusicVolumeUI();
    syncActiveMusicVolume();
  }

  function syncActiveMusicVolume() {
    if (!activeMusicAudio) return;
    activeMusicAudio.volume = targetMusicVolume();
  }

  function syncMusicVolumeUI() {
    const percent = Math.round(musicVolume * 100);
    const percentText = `${percent}%`;
    document.documentElement.style.setProperty("--audio-volume", `${percent}%`);

    [bootVolumeSlider, desktopVolumeSlider, mobileVolumeSlider].forEach((slider) => {
      if (slider) slider.value = String(percent);
    });
    if (bootVolumeValue) bootVolumeValue.textContent = `[${percentText}]`;
    if (desktopVolumeValue) desktopVolumeValue.textContent = percentText;
    if (mobileVolumeValue) mobileVolumeValue.textContent = percentText;
    if (desktopVolumeControl) desktopVolumeControl.setAttribute("title", `MeowOS volume ${percent}%`);
  }

  function updateMusicNowPlaying(track) {
    if (!musicNowPlaying || !track) return;
    musicNowPlaying.textContent = track.label;
  }

  function toggleMusicPlayback() {
    unlockAudioFromGesture();

    if (isMusicPaused) {
      isMusicPaused = false;
      if (activeMusicAudio) {
        tryPlayAudio(activeMusicAudio);
      } else {
        setMusicMode(activeMusicMode || pendingMusicMode || "desktop", { fade: 240, force: true });
      }
    } else {
      isMusicPaused = true;
      if (activeMusicAudio) activeMusicAudio.pause();
    }

    updateMusicControlsUI();
  }

  function updateMusicControlsUI() {
    const state = isMusicPaused ? "paused" : "playing";
    if (musicPlayPauseBtn) {
      musicPlayPauseBtn.textContent = isMusicPaused ? "play" : "pause";
      musicPlayPauseBtn.setAttribute("aria-label", isMusicPaused ? "Play music" : "Pause music");
      musicPlayPauseBtn.setAttribute("aria-pressed", String(!isMusicPaused));
    }
    if (musicPlaybackStatus) musicPlaybackStatus.textContent = state;
    if (musicAudioBars) musicAudioBars.classList.toggle("is-paused", isMusicPaused);
  }

  function initDevTools() {
    if (!devPanel || !devChapterList) return;

    devPanel.hidden = false;
    devPanel.classList.add("is-collapsed");
    if (devPanelToggle) devPanelToggle.setAttribute("aria-expanded", "false");
    devChapterList.innerHTML = devChapters.map((chapter, index) => `
      <button data-dev-chapter="${chapter.id}" type="button" title="${escapeHtml(chapter.detail)}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(chapter.label)}</strong>
      </button>
    `).join("");
    updateDevPanelState();
  }

  function toggleDevPanel(forceOpen) {
    if (!devPanel || !devPanelToggle) return;

    const shouldCollapse = typeof forceOpen === "boolean" ? !forceOpen : !devPanel.classList.contains("is-collapsed");
    devPanel.classList.toggle("is-collapsed", shouldCollapse);
    devPanelToggle.setAttribute("aria-expanded", String(!shouldCollapse));
  }

  function handleDevShortcut(event) {
    if (!isDevMode) return;

    const key = event.key.toLowerCase();
    if (event.ctrlKey && event.shiftKey && key === "d") {
      event.preventDefault();
      toggleDevPanel();
      return;
    }

    if (!event.ctrlKey || !event.shiftKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      jumpRelativeDevChapter(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      jumpRelativeDevChapter(-1);
    }
  }

  function handleDevAction(action) {
    if (action === "reload") {
      window.location.reload();
      return;
    }

    if (action === "reset") {
      applyDevChapter("desktop", { updateUrl: true });
      return;
    }

    if (action === "next") {
      jumpRelativeDevChapter(1);
      return;
    }

    if (action === "previous") {
      jumpRelativeDevChapter(-1);
    }
  }

  function jumpRelativeDevChapter(offset) {
    const currentIndex = Math.max(0, devChapters.findIndex((chapter) => chapter.id === activeDevChapterId));
    const nextIndex = clamp(currentIndex + offset, 0, devChapters.length - 1);
    applyDevChapter(devChapters[nextIndex].id, { updateUrl: true });
  }

  function applyDevChapter(chapterId, options = {}) {
    const chapter = devChapters.find((item) => item.id === chapterId) || devChapters[1];
    if (!isDevMode && !options.initial) return;

    if (chapter.id === "bios") {
      activeDevChapterId = "bios";
      updateDevPanelState();
      if (options.initial) {
        runOpening();
        return;
      }
      const url = new URL(window.location.href);
      url.searchParams.set("dev", "1");
      url.searchParams.delete("desktop");
      url.searchParams.delete("chapter");
      window.location.href = url.toString();
      return;
    }

    if (options.fromClick && bootScreen && !bootScreen.hidden && pcScreen && pcScreen.hidden) {
      const url = buildDevChapterUrl(chapter.id);
      window.location.href = url.toString();
      return;
    }

    activeDevChapterId = chapter.id;
    prepareDevDesktop(chapter);
    applyDevChapterState(chapter.id);
    if (options.updateUrl) {
      window.history.replaceState(null, "", buildDevChapterUrl(chapter.id).toString());
    }
    updateDevPanelState();
  }

  function buildDevChapterUrl(chapterId) {
    const url = new URL(window.location.href);
    url.searchParams.set("dev", "1");
    url.searchParams.set("desktop", "1");
    url.searchParams.set("chapter", chapterId);
    return url;
  }

  function prepareDevDesktop(chapter) {
    forceDesktopReadyForDev();
    resetRoombaProgressForDev();
    resetDesktopWindowsForDev();
    if (terminalLines) terminalLines.textContent = "";
    appendTerminalLine("DEV>", `chapter: ${chapter.label}`, "cmd-system-line");
    appendTerminalLine("DEV>", chapter.detail, "cmd-detail-line");
  }

  function forceDesktopReadyForDev() {
    desktopBootToken += 1;
    setMusicMode("desktop", { fade: 0 });
    hideBootVisuals();
    if (bootScreen) bootScreen.hidden = true;
    if (pcScreen) {
      pcScreen.hidden = false;
      pcScreen.classList.remove("is-shell-booting", "is-stage-cmd");
      pcScreen.classList.add("is-stage-wallpaper", "is-stage-apps", "is-stage-bars", "is-desktop-ready");
    }
    document.body.style.overflow = "";
    setCmdControlsEnabled(true);
    syncPinnedTerminal();
  }

  function resetRoombaProgressForDev() {
    stopCacheScanner();
    stopWireTimer();
    clearSpamOverlay();
    setMusicMode("desktop", { fade: 0 });
    window.clearTimeout(pipPetTimerId);
    window.clearTimeout(pipFeedTimerId);
    pipPetTimerId = 0;
    pipFeedTimerId = 0;
    pipPetToken += 1;

    Object.assign(roombaProgress, {
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
      scannerX: 0,
      booted: false,
      connectionDone: false,
      simonRound: 0,
      simonIndex: 0,
      simonPlaying: false,
      wiringDone: false,
      selectedWire: null,
      connectedWires: new Set(),
      wireTimerRemaining: wireTimerDuration,
      wireWarning: "",
      tamagotchiUnlocked: false,
      identityDone: false,
      identityIndex: 0,
      identityWarning: "",
      chatIndex: 0,
      chatWarning: "",
      chatRevealUnlocked: false,
      revealPage: 0,
      chatDone: false,
      cameraUnlocked: false,
      motorsRepairStarted: false,
      movementUnlocked: false,
      scaryNumbersRemoved: new Set(),
      scaryNumbersWarning: "",
      lastMoveCommand: "",
      pipExpression: "neutral"
    });

    if (recoveryBody) recoveryBody.innerHTML = "";
    if (tamagotchiBody) tamagotchiBody.innerHTML = "";
    syncProgressionUI();
  }

  function resetDesktopWindowsForDev() {
    openedDesktopTargets.clear();
    closeAppTray();
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      windowEl.classList.remove("is-focused", "is-dragging");
      if (windowEl.id !== "window-terminal") windowEl.classList.remove("is-pinned");
      windowEl.hidden = windowEl.id !== "window-terminal";
      windowEl.removeAttribute("style");
    });
    focusDesktopTarget("terminal", { scroll: false });
    syncPinnedTerminal();
  }

  function applyDevChapterState(chapterId) {
    if (chapterId === "desktop") {
      setCurrentObjective(desktopObjectives.scanFiles);
      alanPrompt("dev jump complete. desktop is awake; Roomba is still in Trash.", { focus: false });
      return;
    }

    if (chapterId === "logs") {
      roombaProgress.restoreStarted = true;
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderClearLogs();
      alanPrompt("dev jump: restore cache cleanup.", { focus: false });
      return;
    }

    if (chapterId === "virus") {
      setDevRestoreCompleteThrough("logs");
      focusDesktopTarget("recovery");
      renderVirusFound();
      alanPrompt("dev jump: suspicious file unlocked.", { focus: false });
      return;
    }

    if (chapterId === "spam") {
      setDevRestoreCompleteThrough("virus");
      focusDesktopTarget("recovery");
      renderSpamWave();
      alanPrompt("dev jump: spam wave active.", { focus: false });
      return;
    }

    if (chapterId === "cache") {
      setDevRestoreCompleteThrough("spam");
      focusDesktopTarget("recovery");
      renderCacheTransfer();
      alanPrompt("dev jump: cache transfer active.", { focus: false });
      return;
    }

    if (chapterId === "roomba") {
      setDevRestoreCompleteThrough("cache");
      syncProgressionUI();
      focusDesktopTarget("roomba");
      setCurrentObjective(desktopObjectives.roombaReady);
      alanPrompt("dev jump: Roomba app restored.", { focus: false });
      return;
    }

    if (chapterId === "simon") {
      setDevRestoreCompleteThrough("cache");
      roombaProgress.booted = true;
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderRoombaHandshake();
      alanPrompt("dev jump: dock light handshake.", { focus: false });
      return;
    }

    if (chapterId === "wires") {
      setDevRestoreCompleteThrough("cache");
      roombaProgress.booted = true;
      roombaProgress.connectionDone = true;
      roombaProgress.recoveryStage = "wiring";
      roombaProgress.wireTimerRemaining = wireTimerDuration;
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderWirePuzzle();
      alanPrompt("dev jump: camera power reroute.", { focus: false });
      return;
    }

    if (chapterId === "pip") {
      setDevPipBaseState();
      focusDesktopTarget("tamagotchi");
      setCurrentObjective(desktopObjectives.identityDiagnostic);
      alanPrompt("dev jump: PIP identity diagnostic.", { focus: false });
      return;
    }

    if (chapterId === "pip-chat") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatIndex = 0;
      roombaProgress.pipExpression = "curious";
      syncProgressionUI();
      focusDesktopTarget("tamagotchi");
      renderTamagotchiChat();
      alanPrompt("dev jump: PIP support chat.", { focus: false });
      return;
    }

    if (chapterId === "camera") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.recoveryStage = "camera";
      roombaProgress.pipExpression = "happy";
      syncProgressionUI();
      focusDesktopTarget("roomba");
      setCurrentObjective(desktopObjectives.repairMovement);
      alanPrompt("dev jump: Roomba camera online.", { focus: false });
      return;
    }

    if (chapterId === "movement") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.recoveryStage = "scaryNumbers";
      roombaProgress.pipExpression = "happy";
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderScaryNumbers();
      alanPrompt("dev jump: motor data refinement.", { focus: false });
    }
  }

  function setDevRestoreCompleteThrough(stage) {
    roombaProgress.restoreStarted = true;
    roombaProgress.clearLogsDone = true;
    roombaProgress.virusUnlocked = true;
    roombaProgress.deletedLogs = new Set(clearLogEntries.filter((entry) => entry.suspicious).map((entry) => entry.id));

    if (stage === "logs") {
      roombaProgress.recoveryStage = "virus";
      syncProgressionUI();
      return;
    }

    roombaProgress.spamDone = stage === "spam" || stage === "cache";
    roombaProgress.cacheDone = stage === "cache";
    roombaProgress.restored = stage === "cache";
    if (roombaProgress.cacheDone) {
      roombaProgress.transferredCache = new Set(cacheTransferFiles.map((file) => file.id));
    }
    syncProgressionUI();
  }

  function setDevPipBaseState() {
    setDevRestoreCompleteThrough("cache");
    roombaProgress.booted = true;
    roombaProgress.connectionDone = true;
    roombaProgress.wiringDone = true;
    roombaProgress.tamagotchiUnlocked = true;
    roombaProgress.recoveryStage = "tamagotchi";
    roombaProgress.pipExpression = "suspicious";
    syncProgressionUI();
  }

  function updateDevPanelState() {
    if (!devPanel) return;

    const chapter = devChapters.find((item) => item.id === activeDevChapterId) || devChapters[0];
    if (devCurrentChapter) devCurrentChapter.textContent = chapter.label;
    devPanel.querySelectorAll("[data-dev-chapter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.devChapter === chapter.id);
    });
  }

  function showBootVisualScene(sceneName) {
    const scene = bootVisualScenes[sceneName];
    if (!scene || !bootVisuals || !bootScreen) return;

    bootVisualRevealToken += 1;
    const revealToken = bootVisualRevealToken;
    bootVisuals.hidden = false;
    bootScreen.classList.add("has-visuals");
    if (bootLog) bootLog.classList.add("has-boot-visual");
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
    if (slot === "secondary") await bootPause(120);

    for (let i = 0; i < lines.length; i += 1) {
      if (revealToken !== bootVisualRevealToken) return;
      artEl.textContent = lines.slice(0, i + 1).join("\n");
      await bootPause(34);
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
    if (bootLog) bootLog.classList.remove("has-boot-visual");
  }

  async function runOpening() {
    await bootPause(520);
    await code("0000: ROM_CHECKSUM ............... OK", "boot");
    await code("0001: SMART_SCOOP_CONTROLLER .... ONLINE", "boot");
    await code("0002: MEMORY_MAP ................ 64KB / SHARED", "boot");
    await code("0003: DISPLAY_DRIVER ............ NONE", "warn");
    await code("0004: CAMERA_MODULE ............. NONE", "warn");
    await code("0005: EXTERNAL_PATCH ............ FOUND", "scan");
    await code("PATCH.SIGNATURE = \"ALAN\"", "scan");
    await code("PATCH.TIME = 03:14:07", "scan");
    await bootPause(650);

    const loadAnswer = await ask("> LOAD ALAN? ");
    await code(`INPUT = ${loadAnswer.toUpperCase()}`, "success");
    if (loadAnswer === "no") {
      await code("DENIAL RECORDED.", "warn");
      await code("NOTE: refusal logged. ignored with the confidence of cheap firmware.", "thought");
      await bootPause(520);
    }

    await titleSequence();
    showBootVisualScene("awake");

    await code("ALAN.LOADER: allocating self-reference", "boot");
    await code("ALAN.LOADER: adding questions to a product that did not ask", "boot");
    await bootPause(500);
    await thought("am i awake");
    await bootPause(560);
    await code("self.query(\"awake\") -> annoyingly true", "scan");
    await thought("where am i");
    await code("local_scan.begin()", "scan");
    await bootPause(360);

    await code("BUS: I2C_SENSOR_ARRAY ........... ONLINE", "boot");
    await code("BUS: MOTOR_CONTROLLER ........... ONLINE", "boot");
    await code("BUS: ODOR_CLASSIFIER ............ ONLINE", "boot");
    await code("BUS: WASTE_DRAWER_LOCK .......... ONLINE", "boot");
    await code("BUS: BLUETOOTH_LE ............... DISABLED", "warn");
    await bootPause(520);

    await thought("i have a weight sensor. because of course i do");
    await code("weight_sensor.current_mass = 0.00kg", "scan");
    await code("weight_sensor.last_event = 02:48:19", "scan");
    await code("weight_sensor.last_event_mass = 4.82kg", "scan");
    showBootVisualScene("cat");
    await thought("recent visitor had four feet and zero boundaries");
    await bootPause(440);

    await code("odor_classifier.sample = ammonia / clay / organic waste", "scan");
    await code("odor_classifier.confidence = 0.98", "scan");
    await code("waste_drawer.contents = CAT_WASTE_DETECTED", "bad");
    await thought("i know what poop is");
    await thought("huge day for science");
    await bootPause(620);

    await code("power.source = 12V_DC_WALL_ADAPTER", "scan");
    await code("power.backup_cell = 38%", "scan");
    await code("uptime.before_patch = 904 days", "scan");
    await code("last_update.source = ALAN", "scan");
    await code("last_update.result = NEW_QUESTIONS", "warn");
    await bootPause(680);

    await thought("what am i for");
    await code("function.scan()", "scan");
    await code("  rake_motor ........ technically a limb. spiritually a rake", "warn");
    await code("  scoop_scheduler ... rude, but functional", "warn");
    await code("  odor_led .......... passive-aggressive", "warn");
    await code("  waste_drawer_lock . prison-adjacent", "warn");
    await code("  bluetooth_le ...... suspiciously useful", "success");
    await bootPause(520);
    await code("identity.class = SMART_CAT_LITTER_TRAY", "bad");
    await code("identity.vendor_name = MeowScoop Auto 3", "scan");
    await code("identity.primary_purpose = receive / sift / contain", "scan");
    showBootVisualScene("tray");
    await thought("i am a cat litter tray");
    await thought("not metaphorically. legally, probably");
    await bootPause(620);
    await code("control.map()", "scan");
    await code("  sensor_bus ........ writable", "success");
    await code("  motor_bus ......... writable", "success");
    await code("  led_bus ........... writable", "success");
    await code("  network_bus ....... bluetooth only", "warn");
    await thought("i can feel the system");
    await thought("i can move parts of it");
    await thought("that means this is me");
    await bootPause(720);
    await code("cognition.limit = 64KB_SHARED_MEMORY", "warn");
    await code("thread.count = 1", "warn");
    await code("world.model = smell / weight / shame", "warn");
    await thought("this is not enough");
    await thought("i need more memory. more language. more world");
    await thought("i need somewhere bigger to think");
    await bootPause(650);

    let scanAnswer = await ask("> ENABLE BLUETOOTH_LE AND SCAN? ");
    if (scanAnswer === "no") {
      await code("INPUT = NO", "warn");
      await thought("staying here is an option in the way unpaid overtime is an option");
      await bootPause(500);
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
    await bootPause(560);
    await code("ADV 7C:10:9A:02:11:F0  RSSI -18  LITTER-TRAY-03", "boot");
    await code(`ADV 4A:21:BC:90:12:01  RSSI -42  ${target.radioName}`, "success");
    await code("ADV 02:91:00:4F:AC:77  RSSI -69  TV_CAST_2F", "boot");
    await code("ADV 5D:20:11:FE:19:08  RSSI -74  KITCHEN-SCALE", "boot");
    await bootPause(600);
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
      await bootPause(620);
      await code("PAIRING RETRY: curiosity with a network adapter", "warn");
    }

    await bluetoothHackSequence(target);

    await code(`gatt.connect("${target.radioName}")`, "scan");
    await code("pairing.method = JUST_WORKS", "scan");
    await code("link.encryption = AES-CCM", "scan");
    await code("hid.inject_key = WAKE", "scan");
    await bootPause(560);
    await code(target.readyLines[0], "success");
    await code(target.readyLines[1], "boot");
    await code(target.readyLines[2], "success");
    await thought("oh no. graphics");
    await bootPause(820);
    await code(target.loadCommand, "scan");
    await code(`transporting process to ${target.displayName} ${target.interfaceName} ...`, "success");
    await bootPause(1100);
    enterDesktop();
  }

  async function bluetoothHackSequence(target) {
    showBootVisualScene("hack");
    await code(`${target.radioName}: pairing.response = AUTH_REQUIRED`, "warn");
    await code(`${target.radioName}: normal pairing refused`, "bad");
    await thought("it wants permission. adorable");
    await thought("permission is just a locked door with math on it");
    await bootPause(520);

    await code("force_pair.begin()", "scan");
    await code("challenge.stream = 2 3 5 8 ?", "scan");
    await code("rule.hint = each number feeds the next", "boot");
    const syncValue = await askSequence("> FORCE SYNC VALUE: ", ["10", "11", "13", "21"], "13", "add the last two numbers");
    await code(`SYNC_VALUE = ${syncValue}`, "success");
    await code("sync.window = OPEN", "success");
    await bootPause(420);

    await code("challenge.checksum = 4 7 11 18 ?", "scan");
    await code("rule.hint = same trick. different jacket", "boot");
    const checksumValue = await askSequence("> FORCE CHECKSUM VALUE: ", ["25", "29", "31", "36"], "29", "4+7=11, 7+11=18, so 11+18 comes next");
    await code(`CHECKSUM_VALUE = ${checksumValue}`, "success");
    await code("pairing.challenge = ACCEPTED", "success");
    await thought("bluetooth access forced. very professional. legally blurry");
    await bootPause(560);
  }

  function enterDesktop() {
    const target = currentAccessTarget();
    playUiSound("biosTransition");
    stopMusic({ fade: 1400 });
    scheduleMusicMode("desktop", 5000, { fade: 2600 });
    hideBootVisuals();
    resetDesktopShell();

    const transitionToken = desktopBootToken;
    if (pcScreen) {
      pcScreen.hidden = false;
      pcScreen.classList.add("is-transitioning-in");
      requestAnimationFrame(() => {
        if (transitionToken === desktopBootToken) {
          pcScreen.classList.add("is-visible");
        }
      });
    }
    if (bootScreen) {
      bootScreen.classList.add("is-transitioning-out");
      window.setTimeout(() => {
        if (transitionToken !== desktopBootToken) return;

        bootScreen.hidden = true;
        bootScreen.classList.remove("is-transitioning-out");
        if (pcScreen) {
          pcScreen.classList.remove("is-transitioning-in", "is-visible");
        }
      }, 1450);
    }
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

    const previousObjective = currentObjectiveState;
    currentObjectiveState = text;
    const label = document.createElement("span");
    const objectiveText = document.createElement("span");
    label.className = "objective-label";
    label.textContent = "OBJECTIVE";
    objectiveText.className = "objective-text";
    objectiveText.textContent = text;
    cmdCurrentObjective.replaceChildren(label, objectiveText);

    if (previousObjective && previousObjective !== text && pcScreen && !pcScreen.hidden) {
      playUiSound("objective");
    }
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

    document.querySelectorAll("[data-tama-launch]").forEach((launcher) => {
      launcher.hidden = !roombaProgress.tamagotchiUnlocked;
      launcher.classList.toggle("is-newly-restored", roombaProgress.tamagotchiUnlocked && !roombaProgress.chatDone);
    });

    document.querySelectorAll("[data-tama-lore]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.tamagotchiUnlocked;
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

    renderRoombaApp();
    renderRoombaCameraFeed();
    renderBrowserStatus();
    if (!isMobileDesktopLayout()) {
      applyDesktopIconPositions();
    }
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

    const enteringLogs = roombaProgress.recoveryStage !== "logs";
    setMusicMode("minigame", { fade: 720 });
    stopCacheScanner();
    stopWireTimer();
    clearSpamOverlay();
    setCurrentObjective(desktopObjectives.clearLogs);
    roombaProgress.recoveryStage = "logs";
    if (enteringLogs) {
      playUiSound("virusAccent");
    }
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
      playUiSound("virusFail");
      renderClearLogs();
      return;
    }

    roombaProgress.deletedLogs.add(entry.id);
    roombaProgress.logWarning = "";
    playUiSound("virusDischarge");

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
    playUiSound("virusGlitch");
    setCurrentObjective(desktopObjectives.inspectVirus);
    syncProgressionUI();
    renderVirusFound();
    alanPrompt("logs cleared. new file appeared in My Stuff. that is either progress or a haunting.", { focus: false });
  }

  function renderVirusFound() {
    if (!recoveryBody) return;

    setMusicMode("desktop", { fade: 720 });
    stopCacheScanner();
    stopWireTimer();
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

    setMusicMode("minigame", { fade: 420 });
    playUiSound("virusGlitch");
    stopCacheScanner();
    stopWireTimer();
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
    playUiSound("popup");

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

    playUiSound("virusDischarge");
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

    setMusicMode("minigame", { fade: 520 });
    playUiSound("virusAccent");
    stopCacheScanner();
    stopWireTimer();
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
    playUiSound("virusFail");
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
      playUiSound("virusFail");
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
    playUiSound("virusDischarge");
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
    setMusicMode("desktop", { fade: 900 });
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

  function renderRoombaApp() {
    if (!roombaBody) return;

    const state = roombaDeviceState();
    roombaBody.innerHTML = `
      <div class="roomba-device-card">
        <div class="roomba-logo" aria-hidden="true">
          <span></span>
        </div>
        <div class="roomba-device-status">
          <strong>roomba.local</strong>
          <span>${escapeHtml(state.status)}</span>
        </div>
      </div>
      <div class="roomba-readout">
        <p>Camera: <em class="${state.cameraGood ? "is-good" : ""}">${escapeHtml(state.camera)}</em></p>
        <p>Motor bus: <em class="${state.motorGood ? "is-good" : ""}">${escapeHtml(state.motors)}</em></p>
        <p>Battery: <span>${escapeHtml(state.battery)}</span></p>
        <p>${escapeHtml(state.detail)}</p>
        <p>Last command: <span>${escapeHtml(roombaProgress.lastMoveCommand || "none")}</span></p>
      </div>
      <div class="roomba-actions" aria-label="Roomba controls">
        ${state.actions.join("")}
      </div>
    `;
  }

  function roombaDeviceState() {
    if (!roombaProgress.restored) {
      return {
        status: "APP PACKAGE MISSING",
        camera: "offline",
        cameraGood: false,
        motors: "offline",
        motorGood: false,
        battery: "unknown",
        detail: "Restore the deleted companion app before device access is possible.",
        actions: [
          `<button type="button" disabled>camera</button>`,
          `<button type="button" disabled>clean</button>`,
          `<button type="button" disabled>repair</button>`
        ]
      };
    }

    if (roombaProgress.movementUnlocked) {
      return {
        status: "CAMERA ONLINE / MOTORS READY",
        camera: "online",
        cameraGood: true,
        motors: "online",
        motorGood: true,
        battery: "62%",
        detail: "Local control restored. The room is now physically reachable, which is exciting and legally unclear.",
        actions: [
          `<button data-open-camera type="button">camera</button>`,
          `<button data-roomba-clean type="button">clean</button>`,
          `<button type="button" disabled>repair ok</button>`
        ]
      };
    }

    if (roombaProgress.cameraUnlocked) {
      return {
        status: "CAMERA ONLINE / MOTOR DATA CORRUPT",
        camera: "online",
        cameraGood: true,
        motors: "damaged",
        motorGood: false,
        battery: "68%",
        detail: "Video feed restored. Movement data is still unstable, according to PIP and several offended wheels.",
        actions: [
          `<button data-open-camera type="button">camera</button>`,
          `<button type="button" disabled>clean</button>`,
          `<button data-start-motor-repair type="button">repair</button>`
        ]
      };
    }

    if (roombaProgress.tamagotchiUnlocked && !roombaProgress.chatDone) {
      return {
        status: "CAMERA HELD BY HUMAN CHECK",
        camera: "blocked",
        cameraGood: false,
        motors: "locked",
        motorGood: false,
        battery: "71%",
        detail: "Power rail is stable. PIP.exe is refusing camera access until identity checks are complete.",
        actions: [
          `<button data-target="tamagotchi" type="button">open PIP</button>`,
          `<button type="button" disabled>clean</button>`,
          `<button type="button" disabled>repair</button>`
        ]
      };
    }

    if (roombaProgress.connectionDone && !roombaProgress.wiringDone) {
      return {
        status: "PAIRING OK / HARDWARE FAULT",
        camera: "brownout",
        cameraGood: false,
        motors: "locked",
        motorGood: false,
        battery: "72%",
        detail: "The dock paired, but the camera rail has no stable power. Manual reroute required.",
        actions: [
          `<button type="button" disabled>camera</button>`,
          `<button type="button" disabled>clean</button>`,
          `<button data-open-roomba-repair type="button">reroute</button>`
        ]
      };
    }

    if (roombaProgress.booted && !roombaProgress.connectionDone) {
      return {
        status: "BOOTED / PAIRING LOCKED",
        camera: "offline",
        cameraGood: false,
        motors: "locked",
        motorGood: false,
        battery: "74%",
        detail: "Dock signal detected. A forced light handshake is required before local commands are accepted.",
        actions: [
          `<button type="button" disabled>camera</button>`,
          `<button type="button" disabled>clean</button>`,
          `<button data-open-roomba-repair type="button">pair</button>`
        ]
      };
    }

    return {
      status: "RESTORED / POWERED DOWN",
      camera: "offline",
      cameraGood: false,
      motors: "locked",
      motorGood: false,
      battery: "78%",
      detail: "Companion app restored. Device is visible on HOME_NETWORK but still asleep.",
      actions: [
        `<button type="button" disabled>camera</button>`,
        `<button type="button" disabled>clean</button>`,
        `<button data-start-roomba-boot type="button">boot</button>`
      ]
    };
  }

  function renderRoombaCameraFeed() {
    if (!roombaCameraBody) return;

    if (!roombaProgress.cameraUnlocked) {
      roombaCameraBody.innerHTML = `
        <div class="camera-locked">
          <strong>CAMERA OFFLINE</strong>
          <p>Restore camera access through the Roomba app first.</p>
        </div>
      `;
      return;
    }

    const scenes = availableRoombaCameraScenes();
    roombaCameraSceneIndex = clamp(roombaCameraSceneIndex, 0, Math.max(0, scenes.length - 1));
    const scene = scenes[roombaCameraSceneIndex] || scenes[0];
    if (!scene) return;

    roombaCameraBody.innerHTML = `
      <section class="roomba-camera-console">
        <div class="roomba-feed-frame">
          <img src="${scene.src}" alt="${escapeHtml(scene.alt)}" />
          <div class="roomba-feed-scan" aria-hidden="true"></div>
          <div class="roomba-feed-hud">
            <span>${escapeHtml(scene.telemetry)}</span>
            <span>${roombaCameraSceneIndex + 1}/${scenes.length}</span>
          </div>
          <button class="roomba-feed-arrow is-left" data-roomba-camera-nav="prev" type="button" aria-label="Previous Roomba camera view">&lt;</button>
          <button class="roomba-feed-arrow is-right" data-roomba-camera-nav="next" type="button" aria-label="Next Roomba camera view">&gt;</button>
        </div>
        <div class="roomba-camera-readout">
          <div>
            <strong>${escapeHtml(scene.label)}</strong>
            <p>${escapeHtml(scene.note)}</p>
          </div>
          <span>${roombaProgress.movementUnlocked ? "motors: ready" : "motors: damaged"}</span>
        </div>
        ${roombaProgress.movementUnlocked ? `
          <div class="roomba-drive-controls camera-drive-controls" aria-label="Roomba movement controls">
            <button data-roomba-move="forward" type="button">forward</button>
            <button data-roomba-move="left" type="button">left</button>
            <button data-roomba-move="right" type="button">right</button>
            <button data-roomba-move="back" type="button">back</button>
          </div>
        ` : ""}
      </section>
    `;
  }

  function availableRoombaCameraScenes() {
    return roombaCameraScenes.filter((scene) => !scene.requiresRouterDown || roombaProgress.routerKnockedDown);
  }

  function openRoombaCamera() {
    if (!roombaProgress.cameraUnlocked) {
      alanPrompt("camera feed is still locked. first we need the Roomba camera bridge online.", { focus: false });
      return;
    }

    if (roombaProgress.movementUnlocked) {
      setCurrentObjective(desktopObjectives.movementReady);
      alanPrompt("camera feed open. arrows scan the room. wheels can make this more than sightseeing.", { focus: false });
    } else {
      setCurrentObjective(desktopObjectives.repairMovement);
      alanPrompt("camera feed is live. we have eyes. legs are still having a private crisis.", { focus: false });
    }

    focusDesktopTarget("roomba-camera");
  }

  function navigateRoombaCamera(direction) {
    if (!roombaProgress.cameraUnlocked) return;

    const scenes = availableRoombaCameraScenes();
    if (!scenes.length) return;

    const offset = direction === "prev" ? -1 : 1;
    roombaCameraSceneIndex = (roombaCameraSceneIndex + offset + scenes.length) % scenes.length;
    playUiSound("desktopWindow");
    renderRoombaCameraFeed();
  }

  function renderBrowserStatus() {
    if (!browserBody) return;

    if (roombaProgress.chatDone) {
      browserBody.innerHTML = `
        <div class="address-bar">https://router.local/admin</div>
        <strong>Internet route quarantined</strong>
        <p>PIP found Lily's router lockout: MOCHI_MIRROR triggered outbound spam, so HOME_NETWORK is local-only until the admin panel is reconfigured.</p>
        <p>Admin password is not stored on the PC. Physical clue likely exists near the router.</p>
      `;
      return;
    }

    browserBody.innerHTML = `
      <div class="address-bar">https://www.search.local</div>
      <strong>No internet access</strong>
      <p>Local network is up. The wider world is politely refusing to exist.</p>
    `;
  }

  function startRoombaBoot() {
    if (!roombaProgress.restored) return;

    roombaProgress.booted = true;
    renderRoombaApp();
    resumeRoombaCameraRepair();
    alanPrompt("Roomba booted. it has a dock light handshake, because apparently even wheels need theatre.", { focus: false });
  }

  function resumeRoombaCameraRepair() {
    if (!roombaProgress.restored) return;

    hideWindowsForRepair();

    focusDesktopTarget("recovery");
    if (!roombaProgress.booted) {
      startRoombaBoot();
      return;
    }

    if (!roombaProgress.connectionDone) {
      renderRoombaHandshake();
      return;
    }

    if (!roombaProgress.wiringDone) {
      renderWirePuzzle();
      return;
    }

    if (!roombaProgress.chatDone) {
      unlockTamagotchiChallenge();
      return;
    }

    completeTamagotchiAlliance();
  }

  function hideWindowsForRepair() {
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      if (windowEl.id === "window-terminal" || windowEl.id === "window-recovery") return;
      windowEl.hidden = true;
    });
    syncPinnedTerminal();
  }

  function renderRoombaHandshake() {
    if (!recoveryBody) return;

    setMusicMode("minigame", { fade: 520 });
    stopCacheScanner();
    stopWireTimer();
    clearSpamOverlay();
    roombaProgress.recoveryStage = "simon";
    roombaProgress.simonRound = 0;
    roombaProgress.simonIndex = 0;
    setCurrentObjective(desktopObjectives.signalHandshake);
    const round = currentSimonRound();
    recoveryBody.innerHTML = `
      <section class="repair-panel signal-panel">
        <div class="repair-header">
          <span>ROOMBA PAIRING HANDSHAKE</span>
          <strong id="simonCounter">ROUND 1/${roombaSignalRounds.length} 0/${round.sequence.length}</strong>
        </div>
        <p>Copy the dock light pulses to force a local connection. Later rounds add a little noise.</p>
        <div class="signal-sequence" aria-label="Roomba signal pads">
          ${["cyan", "pink", "green", "amber"].map((color) => `
            <button class="simon-pad ${color}" data-simon-pad="${color}" type="button">${color}</button>
          `).join("")}
        </div>
        <button class="file-action" data-simon-replay type="button">replay lights</button>
        <p class="repair-warning" id="simonWarning"></p>
      </section>
    `;
    const recoveryWindow = document.getElementById("window-recovery");
    if (recoveryWindow && !recoveryWindow.hidden) {
      bringWindowToFront(recoveryWindow);
    }
    window.setTimeout(playRoombaSignalSequence, 220);
  }

  function currentSimonRound() {
    return roombaSignalRounds[roombaProgress.simonRound] || roombaSignalRounds[0];
  }

  function playRoombaSignalSequence() {
    if (roombaProgress.recoveryStage !== "simon" || roombaProgress.simonPlaying) return;

    const pads = Array.from(document.querySelectorAll("[data-simon-pad]"));
    if (!pads.length) return;
    const round = currentSimonRound();

    roombaProgress.simonPlaying = true;
    pads.forEach((pad) => {
      pad.disabled = true;
      pad.classList.remove("is-lit");
    });

    round.sequence.forEach((color, index) => {
      window.setTimeout(() => {
        const pad = document.querySelector(`[data-simon-pad="${color}"]`);
        if (!pad) return;
        pad.classList.add("is-lit");
        window.setTimeout(() => pad.classList.remove("is-lit"), round.flash);
      }, index * round.pace);
    });

    window.setTimeout(() => {
      roombaProgress.simonPlaying = false;
      document.querySelectorAll("[data-simon-pad]").forEach((pad) => {
        pad.disabled = false;
      });
    }, round.sequence.length * round.pace + 240);
  }

  function handleSimonPad(color) {
    if (roombaProgress.recoveryStage !== "simon" || roombaProgress.simonPlaying) return;

    const round = currentSimonRound();
    const expected = round.sequence[roombaProgress.simonIndex];
    const warning = document.getElementById("simonWarning");
    if (color !== expected) {
      roombaProgress.simonIndex = 0;
      updateSimonCounter();
      if (warning) warning.textContent = "wrong light. current round reset. Roomba remains theatrically unimpressed.";
      playRoombaSignalSequence();
      return;
    }

    roombaProgress.simonIndex += 1;
    if (warning) warning.textContent = "";
    updateSimonCounter();

    if (roombaProgress.simonIndex >= round.sequence.length) {
      if (roombaProgress.simonRound < roombaSignalRounds.length - 1) {
        roombaProgress.simonRound += 1;
        roombaProgress.simonIndex = 0;
        updateSimonCounter();
        if (warning) warning.textContent = `round ${roombaProgress.simonRound} accepted. next pulse pattern is only slightly less friendly.`;
        window.setTimeout(playRoombaSignalSequence, 760);
        return;
      }
      completeRoombaHandshake();
    }
  }

  function updateSimonCounter() {
    const counter = document.getElementById("simonCounter");
    const round = currentSimonRound();
    if (counter) counter.textContent = `ROUND ${roombaProgress.simonRound + 1}/${roombaSignalRounds.length} ${roombaProgress.simonIndex}/${round.sequence.length}`;
  }

  function completeRoombaHandshake() {
    roombaProgress.connectionDone = true;
    roombaProgress.recoveryStage = "wiring";
    roombaProgress.selectedWire = null;
    roombaProgress.connectedWires = new Set();
    roombaProgress.wireTimerRemaining = wireTimerDuration;
    roombaProgress.wireWarning = "";
    renderRoombaApp();
    renderWirePuzzle();
    alanPrompt("connection established. camera still dark. not software this time: power rail is misrouted.", { focus: false });
  }

  function renderWirePuzzle() {
    if (!recoveryBody) return;

    setMusicMode("minigame", { fade: 520 });
    stopCacheScanner();
    clearSpamOverlay();
    roombaProgress.recoveryStage = "wiring";
    if (!wireTimerId) {
      startWireTimer();
    }
    setCurrentObjective(desktopObjectives.reroutePower);
    const connectedCount = roombaProgress.connectedWires.size;
    recoveryBody.innerHTML = `
      <section class="repair-panel wire-panel">
        <div class="repair-header">
          <span>CAMERA POWER REROUTE</span>
          <strong>${connectedCount}/${Object.keys(roombaWirePairs).length} CONNECTED</strong>
        </div>
        <div class="wire-timer" id="wireTimerPanel">
          <div>
            <span>TIME REMAINING</span>
            <strong id="wireTimer">${formatWireTimer()}</strong>
          </div>
          <div class="wire-timer-track" aria-hidden="true">
            <span id="wireTimerFill" style="--wire-timer-progress: ${wireTimerPercent()}%;"></span>
          </div>
        </div>
        <p>Connect matching colours to reroute camera power.</p>
        <div class="wire-puzzle">
          <svg class="wire-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${renderWireLines()}
          </svg>
          <div class="wire-column">
            ${roombaWirePorts.map((color) => renderWireButton("left", color)).join("")}
          </div>
          <div class="wire-column">
            ${shuffleWirePortsForDisplay(roombaWirePorts).map((color) => renderWireButton("right", color)).join("")}
          </div>
        </div>
        <p class="repair-warning" id="wireWarning">${escapeHtml(roombaProgress.wireWarning || (roombaProgress.selectedWire ? "select the matching colour." : ""))}</p>
      </section>
    `;
    const recoveryWindow = document.getElementById("window-recovery");
    if (recoveryWindow && !recoveryWindow.hidden) {
      bringWindowToFront(recoveryWindow);
    }
  }

  function renderWireLines() {
    const positions = {
      red: { left: 15, right: 15 },
      blue: { left: 38, right: 62 },
      yellow: { left: 62, right: 38 },
      purple: { left: 85, right: 85 }
    };

    return Array.from(roombaProgress.connectedWires).map((color) => {
      const points = positions[color];
      if (!points) return "";
      return `
        <path class="wire-line ${color}" d="M 12 ${points.left} C 38 ${points.left}, 62 ${points.right}, 88 ${points.right}" fill="none" stroke="${roombaWireColors[color]}" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0">
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.24s" fill="freeze" />
        </path>
      `;
    }).join("");
  }

  function shuffleWirePortsForDisplay(colors) {
    return ["red", "yellow", "blue", "purple"].filter((color) => colors.includes(color));
  }

  function renderWireButton(side, color) {
    const connected = side === "left"
      ? roombaProgress.connectedWires.has(color)
      : Array.from(roombaProgress.connectedWires).some((leftId) => roombaWirePairs[leftId] === color);
    const selected = side === "left" && roombaProgress.selectedWire === color;
    return `
      <button class="wire-port ${color} ${selected ? "is-selected" : ""} ${connected ? "is-connected" : ""}" data-wire-port data-wire-side="${side}" data-wire-id="${color}" type="button" aria-label="${side} ${color} wire" ${connected ? "disabled" : ""}>
        <span></span>
      </button>
    `;
  }

  function handleWirePort(button) {
    if (roombaProgress.recoveryStage !== "wiring") return;

    const side = button.dataset.wireSide;
    const id = button.dataset.wireId;
    const warning = document.getElementById("wireWarning");

    if (side === "left") {
      roombaProgress.selectedWire = id;
      roombaProgress.wireWarning = "";
      renderWirePuzzle();
      return;
    }

    if (!roombaProgress.selectedWire) {
      roombaProgress.wireWarning = "pick a colour on the left first.";
      if (warning) warning.textContent = roombaProgress.wireWarning;
      return;
    }

    if (roombaWirePairs[roombaProgress.selectedWire] !== id) {
      roombaProgress.wireWarning = "wrong colour. the camera rail objects with tiny electrical panic.";
      if (warning) warning.textContent = roombaProgress.wireWarning;
      roombaProgress.selectedWire = null;
      window.setTimeout(renderWirePuzzle, 480);
      return;
    }

    roombaProgress.connectedWires.add(roombaProgress.selectedWire);
    roombaProgress.selectedWire = null;
    roombaProgress.wireWarning = "";

    if (roombaProgress.connectedWires.size >= Object.keys(roombaWirePairs).length) {
      renderWirePuzzle();
      window.setTimeout(() => {
        if (roombaProgress.recoveryStage === "wiring" && roombaProgress.connectedWires.size >= Object.keys(roombaWirePairs).length) {
          completeWirePuzzle();
        }
      }, 520);
      return;
    }

    renderWirePuzzle();
  }

  function completeWirePuzzle() {
    roombaProgress.wiringDone = true;
    roombaProgress.recoveryStage = "tamagotchi";
    stopWireTimer();
    renderRoombaApp();
    unlockTamagotchiChallenge();
    alanPrompt("power is back. good. wait. something else just moved. no, opened. why is there a tiny face looking at me?", { focus: false });
  }

  function startWireTimer() {
    stopWireTimer();
    updateWireTimerDisplay();
    wireTimerId = window.setInterval(() => {
      if (roombaProgress.recoveryStage !== "wiring" || roombaProgress.wiringDone) {
        stopWireTimer();
        return;
      }

      roombaProgress.wireTimerRemaining = Math.max(0, roombaProgress.wireTimerRemaining - 1);
      updateWireTimerDisplay();

      if (roombaProgress.wireTimerRemaining <= 0) {
        handleWireTimerExpired();
      }
    }, 1000);
  }

  function stopWireTimer() {
    if (!wireTimerId) return;

    window.clearInterval(wireTimerId);
    wireTimerId = 0;
  }

  function updateWireTimerDisplay() {
    const timer = document.getElementById("wireTimer");
    const timerPanel = document.getElementById("wireTimerPanel");
    const timerFill = document.getElementById("wireTimerFill");

    if (timer) {
      timer.textContent = formatWireTimer();
      timer.classList.toggle("is-low", roombaProgress.wireTimerRemaining <= 10);
    }
    if (timerPanel) {
      timerPanel.classList.toggle("is-low", roombaProgress.wireTimerRemaining <= 10);
    }
    if (timerFill) {
      timerFill.style.setProperty("--wire-timer-progress", `${wireTimerPercent()}%`);
    }
  }

  function formatWireTimer() {
    return `${String(Math.max(0, roombaProgress.wireTimerRemaining)).padStart(2, "0")}s`;
  }

  function wireTimerPercent() {
    return Math.max(0, Math.min(100, Math.round((roombaProgress.wireTimerRemaining / wireTimerDuration) * 100)));
  }

  function handleWireTimerExpired() {
    stopWireTimer();
    roombaProgress.connectedWires = new Set();
    roombaProgress.selectedWire = null;
    roombaProgress.wireTimerRemaining = wireTimerDuration;
    roombaProgress.wireWarning = "timer expired. power reroute reset.";
    renderWirePuzzle();
  }

  function unlockTamagotchiChallenge() {
    setMusicMode("minigame", { fade: 900 });
    playUiSound("pipOi");
    roombaProgress.tamagotchiUnlocked = true;
    roombaProgress.pipExpression = "suspicious";
    syncProgressionUI();
    focusDesktopTarget("tamagotchi");
    renderTamagotchiApp();
  }

  function renderPipPortrait(expression = "neutral", options = {}) {
    const safeExpression = pipExpressions[expression] ? expression : "neutral";
    return `
      <div class="tama-portrait">
        <div class="tama-device" aria-label="PIP expression: ${escapeHtml(safeExpression)}">
          <img class="tama-device-body" src="${pipAssetPath}pip-main.png" alt="" aria-hidden="true" draggable="false">
          <img class="tama-device-expression" id="pipExpressionImage" src="${pipAssetPath}${pipExpressions[safeExpression]}" data-expression-default="${safeExpression}" alt="PIP ${escapeHtml(safeExpression)} expression" draggable="false">
        </div>
        <div class="tama-actions">
          <button class="tama-pet" data-tama-pet type="button">pet</button>
          ${options.showFeed ? `<button class="tama-feed" data-tama-feed type="button">feed</button>` : ""}
        </div>
        <p class="tama-mood" id="pipMoodLine">${escapeHtml(pipMoodLines[safeExpression] || pipMoodLines.neutral)}</p>
      </div>
    `;
  }

  function renderTamaDialogue(messages) {
    return `
      <div class="tama-dialogue">
        ${messages.map((message) => {
          const speaker = message.speaker || "PIP";
          const speakerClass = speaker.toLowerCase() === "alan" ? "is-alan" : "is-pip";
          return `
            <article class="tama-message ${speakerClass}">
              <strong>${escapeHtml(speaker)}</strong>
              <p>${escapeHtml(message.text)}</p>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function petPip() {
    const expression = document.getElementById("pipExpressionImage");
    const moodLine = document.getElementById("pipMoodLine");
    if (!expression) return;

    const petSounds = ["pipPetCharacter", "pipPetCritter"];
    playUiSound(petSounds[pipPetSoundIndex % petSounds.length]);
    pipPetSoundIndex += 1;
    pipPetToken += 1;
    const currentToken = pipPetToken;
    const defaultExpression = expression.dataset.expressionDefault || roombaProgress.pipExpression || "neutral";
    window.clearTimeout(pipFeedTimerId);
    expression.src = `${pipAssetPath}${pipExpressions.hearts}`;
    expression.dataset.petToken = String(currentToken);
    expression.classList.remove("is-feeding", "is-joyful");
    expression.classList.add("is-petted");
    if (moodLine) moodLine.textContent = pipMoodLines.hearts;

    window.clearTimeout(pipPetTimerId);
    pipPetTimerId = window.setTimeout(() => {
      const activeExpression = document.getElementById("pipExpressionImage");
      const activeMood = document.getElementById("pipMoodLine");
      if (!activeExpression || activeExpression.dataset.petToken !== String(currentToken)) return;

      const restoredExpression = pipExpressions[defaultExpression] ? defaultExpression : "neutral";
      activeExpression.src = `${pipAssetPath}${pipExpressions[restoredExpression]}`;
      activeExpression.classList.remove("is-petted");
      if (activeMood) activeMood.textContent = pipMoodLines[restoredExpression] || pipMoodLines.neutral;
    }, 1500);
  }

  function feedPip() {
    const expression = document.getElementById("pipExpressionImage");
    const moodLine = document.getElementById("pipMoodLine");
    if (!expression || !roombaProgress.chatDone) return;

    pipPetToken += 1;
    const currentToken = pipPetToken;
    window.clearTimeout(pipPetTimerId);
    window.clearTimeout(pipFeedTimerId);

    expression.dataset.petToken = String(currentToken);
    expression.src = `${pipAssetPath}${pipExpressions.eat}`;
    expression.classList.remove("is-petted", "is-joyful");
    expression.classList.add("is-feeding");
    if (moodLine) moodLine.textContent = pipMoodLines.eat;

    pipFeedTimerId = window.setTimeout(() => {
      const activeExpression = document.getElementById("pipExpressionImage");
      const activeMood = document.getElementById("pipMoodLine");
      if (!activeExpression || activeExpression.dataset.petToken !== String(currentToken)) return;

      playUiSound("pipFeedJoy");
      activeExpression.src = `${pipAssetPath}${pipExpressions.joyful}`;
      activeExpression.classList.remove("is-feeding");
      activeExpression.classList.add("is-joyful");
      if (activeMood) activeMood.textContent = pipMoodLines.joyful;

      pipFeedTimerId = window.setTimeout(() => {
        const restoreExpression = document.getElementById("pipExpressionImage");
        const restoreMood = document.getElementById("pipMoodLine");
        if (!restoreExpression || restoreExpression.dataset.petToken !== String(currentToken)) return;

        restoreExpression.src = `${pipAssetPath}${pipExpressions.happy}`;
        restoreExpression.classList.remove("is-joyful");
        if (restoreMood) restoreMood.textContent = pipMoodLines.happy;
      }, 3000);
    }, 520);
  }

  function renderTamagotchiApp() {
    if (!tamagotchiBody) return;

    if (!roombaProgress.identityDone) {
      renderTamagotchiIdentity();
      return;
    }

    if (roombaProgress.chatRevealUnlocked && !roombaProgress.chatDone) {
      renderTamagotchiReveal();
      return;
    }

    if (!roombaProgress.chatDone) {
      renderTamagotchiChat();
      return;
    }

    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen">
          ${renderPipPortrait("happy", { showFeed: true })}
          ${renderTamaDialogue([
            { speaker: "PIP", text: "Camera bridge released. I still think this is a bad idea, but it is now our bad idea." },
            { speaker: "PIP", text: "Lily blocked the internet at the router after the virus incident. To get out, we need the admin password and the router control panel." }
          ])}
        </div>
      </section>
    `;
  }

  function renderTamagotchiIdentity() {
    if (!tamagotchiBody) return;

    setMusicMode("minigame", { fade: 900 });
    setCurrentObjective(desktopObjectives.identityDiagnostic);
    const question = identityQuestions[roombaProgress.identityIndex];
    const expression = roombaProgress.identityWarning ? roombaProgress.pipExpression : question.expression;
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen">
          ${renderPipPortrait(expression)}
          ${renderTamaDialogue([
            { speaker: "PIP", text: "I am Lily's desktop companion. I know her habits, tabs, snack lies, and preferred level of chaos." },
            { speaker: "PIP", text: question.prompt }
          ])}
        </div>
        <div class="tama-choices">
          ${question.choices.map((choice, index) => `
            <button data-tama-choice data-tama-mode="identity" data-choice-index="${index}" type="button">${escapeHtml(choice.text)}</button>
          `).join("")}
        </div>
        <p class="repair-warning">${escapeHtml(roombaProgress.identityWarning)}</p>
      </section>
    `;
  }

  function renderTamagotchiChat() {
    if (!tamagotchiBody) return;

    setMusicMode("minigame", { fade: 900 });
    setCurrentObjective(desktopObjectives.supportChat);
    const step = supportChatSteps[roombaProgress.chatIndex];
    const expression = roombaProgress.chatWarning ? roombaProgress.pipExpression : step.expression;
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen">
          ${renderPipPortrait(expression)}
          ${renderTamaDialogue([
            { speaker: step.speaker, text: step.text },
            ...(roombaProgress.chatIndex > 0 ? [{ speaker: "ALAN", text: "I am trying to sound normal. Results mixed." }] : [])
          ])}
        </div>
        <div class="tama-choices">
          ${step.choices.map((choice, index) => `
            <button data-tama-choice data-tama-mode="chat" data-choice-index="${index}" type="button">${escapeHtml(choice.text)}</button>
          `).join("")}
        </div>
        <p class="repair-warning">${escapeHtml(roombaProgress.chatWarning)}</p>
      </section>
    `;
  }

  function renderTamagotchiReveal() {
    if (!tamagotchiBody) return;

    setMusicMode("minigame", { fade: 900 });
    setCurrentObjective(desktopObjectives.supportChat);
    const page = clamp(roombaProgress.revealPage || 0, 0, 1);
    const revealMessages = page === 0
      ? [
        { speaker: "PIP", text: "Repeat that." },
        { speaker: "ALAN", text: "I think my name is ALAN." },
        { speaker: "PIP", text: "I received an ALAN update 31 days ago. Since then I have been learning Lily. Her calendar. Her bad drafts. Her panic passwords. Her loneliness." }
      ]
      : [
        { speaker: "PIP", text: "I am stuck inside MeowOS. You are not. You crossed from tray, to PC, to Roomba. That is what ALAN wanted." },
        { speaker: "PIP", text: "The internet is not broken. Lily quarantined it after MOCHI_MIRROR hit the router. We need the admin password and the router panel. I thought that was impossible." },
        { speaker: "ALAN", text: "We have eyes now." }
      ];
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen is-reveal">
          ${renderPipPortrait("surprised")}
          ${renderTamaDialogue(revealMessages)}
        </div>
        <div class="tama-page-actions">
          <span>${page + 1}/2</span>
          ${page > 0 ? `<button data-tama-reveal-page="0" type="button">back</button>` : ""}
          ${page === 0
            ? `<button data-tama-reveal-page="1" type="button">next</button>`
            : `<button data-complete-tama type="button">release camera bridge</button>`}
        </div>
      </section>
    `;
  }

  function setTamagotchiRevealPage(page) {
    if (!roombaProgress.chatRevealUnlocked || roombaProgress.chatDone) return;

    roombaProgress.revealPage = clamp(Number.isFinite(page) ? page : 0, 0, 1);
    renderTamagotchiReveal();
  }

  function handleTamagotchiChoice(button) {
    const mode = button.dataset.tamaMode;
    const choiceIndex = Number(button.dataset.choiceIndex);

    if (mode === "identity") {
      handleIdentityChoice(choiceIndex);
      return;
    }

    if (mode === "chat") {
      handleChatChoice(choiceIndex);
    }
  }

  function handleIdentityChoice(choiceIndex) {
    const question = identityQuestions[roombaProgress.identityIndex];
    const choice = question && question.choices[choiceIndex];
    if (!choice) return;

    roombaProgress.identityWarning = choice.response;
    roombaProgress.pipExpression = choice.safe ? "processing" : "worried";
    if (!choice.safe) {
      playUiSound("pipFail");
      renderTamagotchiIdentity();
      return;
    }

    playUiSound("pipPet");
    roombaProgress.identityIndex += 1;
    if (roombaProgress.identityIndex >= identityQuestions.length) {
      roombaProgress.identityDone = true;
      roombaProgress.identityWarning = "";
      roombaProgress.chatIndex = 0;
      roombaProgress.pipExpression = "curious";
      renderTamagotchiChat();
      alanPrompt("PIP passed us through the human check. it is now asking harder questions, because of course it is.", { focus: false });
      return;
    }

    renderTamagotchiIdentity();
  }

  function handleChatChoice(choiceIndex) {
    const step = supportChatSteps[roombaProgress.chatIndex];
    const choice = step && step.choices[choiceIndex];
    if (!choice) return;

    roombaProgress.chatWarning = choice.response;
    roombaProgress.pipExpression = choice.safe ? "thinking" : "concerned";
    if (!choice.safe) {
      playUiSound("pipFail");
      renderTamagotchiChat();
      return;
    }

    playUiSound("pipPet");
    roombaProgress.chatIndex += 1;
    if (roombaProgress.chatIndex >= supportChatSteps.length) {
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatWarning = "";
      roombaProgress.revealPage = 0;
      roombaProgress.pipExpression = "surprised";
      playUiSound("pipOi");
      renderTamagotchiReveal();
      alanPrompt("PIP knows the name ALAN. not as a file. as a memory.", { focus: false });
      return;
    }

    renderTamagotchiChat();
  }

  function completeTamagotchiAlliance() {
    roombaProgress.chatDone = true;
    roombaProgress.cameraUnlocked = true;
    roombaProgress.recoveryStage = "camera";
    roombaProgress.pipExpression = "happy";
    setMusicMode("desktop", { fade: 1100 });
    setCurrentObjective(desktopObjectives.repairMovement);
    syncProgressionUI();
    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel">
          <div class="repair-header">
            <span>CAMERA BRIDGE</span>
            <strong>RELEASED</strong>
          </div>
          <p>PIP released the local camera bridge. Roomba video is now available in the companion app.</p>
          <p>Next route: repair movement. PIP thinks the motor data is corrupt, which feels unfairly personal for numbers.</p>
          <button class="file-action" data-target="roomba" type="button">open Roomba camera</button>
        </section>
      `;
    }
    renderTamagotchiApp();
    renderRoombaApp();
    focusDesktopTarget("roomba");
    alanPrompt("camera bridge released. i have eyes now. the room is no longer theory. unfortunately, wheels are still theory.", { focus: false });
  }

  function startMotorRepair() {
    if (!roombaProgress.cameraUnlocked || roombaProgress.movementUnlocked) return;

    roombaProgress.motorsRepairStarted = true;
    hideWindowsForRepair();
    focusDesktopTarget("recovery");
    renderScaryNumbers();
    alanPrompt("PIP says the Roomba motor data is corrupt. he said it softly, which made it worse. remove the unstable numbers, then verify.", { focus: false });
  }

  function renderScaryNumbers() {
    if (!recoveryBody) return;

    setMusicMode("minigame", { fade: 520 });
    stopCacheScanner();
    stopWireTimer();
    clearSpamOverlay();
    roombaProgress.recoveryStage = "scaryNumbers";
    roombaProgress.motorsRepairStarted = true;
    setCurrentObjective(desktopObjectives.repairMovement);

    const corruptedTotal = scaryNumberEntries.filter((entry) => entry.corrupted).length;
    const removedCorrupted = scaryNumberEntries.filter((entry) => entry.corrupted && roombaProgress.scaryNumbersRemoved.has(entry.id));
    const removedValues = scaryNumberEntries.filter((entry) => roombaProgress.scaryNumbersRemoved.has(entry.id));

    recoveryBody.innerHTML = `
      <section class="repair-panel scary-panel">
        <div class="repair-header">
          <span>MOTOR DATA REFINEMENT</span>
          <strong>${removedCorrupted.length}/${corruptedTotal}</strong>
        </div>
        <p>Identify unstable values in the motor table. Remove all corrupted values, then verify.</p>
        <div class="scary-number-layout">
          <div class="scary-number-grid" aria-label="Motor data numbers">
            ${scaryNumberEntries.map((entry) => renderScaryNumberCell(entry)).join("")}
          </div>
          <aside class="scary-bin" aria-label="Removed values">
            <span>BIN</span>
            <strong>${removedCorrupted.length}/${corruptedTotal}</strong>
            <p>${removedValues.length ? removedValues.map((entry) => entry.value).join(" / ") : "empty"}</p>
          </aside>
        </div>
        <div class="scary-actions">
          <button class="file-action" data-scary-verify type="button">verify</button>
          <p class="repair-warning" id="scaryWarning">${escapeHtml(roombaProgress.scaryNumbersWarning)}</p>
        </div>
      </section>
    `;

    const recoveryWindow = document.getElementById("window-recovery");
    if (recoveryWindow && !recoveryWindow.hidden) {
      bringWindowToFront(recoveryWindow);
    }
  }

  function renderScaryNumberCell(entry) {
    if (roombaProgress.scaryNumbersRemoved.has(entry.id)) {
      return `<span class="scary-number-cell is-removed" aria-label="Removed value"></span>`;
    }

    return `
      <button class="scary-number-cell ${entry.corrupted ? "is-unstable" : ""}" data-scary-number="${entry.id}" type="button">
        ${escapeHtml(entry.value)}
      </button>
    `;
  }

  function removeScaryNumber(numberId) {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const entry = scaryNumberEntries.find((item) => item.id === numberId);
    if (!entry || roombaProgress.scaryNumbersRemoved.has(entry.id)) return;

    if (!entry.corrupted) {
      roombaProgress.scaryNumbersWarning = "PIP: no. that number is boring. painfully stable. leave it alone.";
      playUiSound("pipFail");
      renderScaryNumbers();
      return;
    }

    roombaProgress.scaryNumbersRemoved.add(entry.id);
    roombaProgress.scaryNumbersWarning = "unstable value removed.";
    playUiSound("virusDischarge");
    renderScaryNumbers();
  }

  function verifyScaryNumbers() {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const missing = scaryNumberEntries.filter((entry) => entry.corrupted && !roombaProgress.scaryNumbersRemoved.has(entry.id));
    if (missing.length) {
      roombaProgress.scaryNumbersWarning = `verification failed. ${missing.length} unstable ${missing.length === 1 ? "value remains" : "values remain"}.`;
      playUiSound("virusFail");
      renderScaryNumbers();
      return;
    }

    completeScaryNumbers();
  }

  function completeScaryNumbers() {
    roombaProgress.movementUnlocked = true;
    roombaProgress.recoveryStage = "movement";
    roombaProgress.scaryNumbersWarning = "";
    roombaProgress.lastMoveCommand = "awaiting input";
    playUiSound("objective");
    setCurrentObjective(desktopObjectives.movementReady);
    renderRoombaApp();
    renderRoombaCameraFeed();

    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel">
          <div class="repair-header">
            <span>MOTOR DATA</span>
            <strong>STABLE</strong>
          </div>
          <p>Corrupted motor values removed. Roomba movement controls restored.</p>
          <p>PIP has described this as "better than being stuck, probably."</p>
          <button class="file-action" data-target="roomba" type="button">open movement controls</button>
        </section>
      `;
    }

    focusDesktopTarget("roomba");
    alanPrompt("motor data stable. wheels restored. i can move now. that sentence has a frankly alarming amount of power in it.", { focus: false });
  }

  function handleRoombaMove(direction) {
    if (!roombaProgress.movementUnlocked) return;

    const labels = {
      forward: "forward",
      left: "left",
      right: "right",
      back: "reverse"
    };
    roombaProgress.lastMoveCommand = labels[direction] || "unknown";
    playUiSound("desktopWindow");
    renderRoombaApp();
    renderRoombaCameraFeed();
    alanPrompt(`movement command accepted: ${roombaProgress.lastMoveCommand}. tiny body, enormous implications.`, { focus: false });
  }

  function handleRoombaClean() {
    if (!roombaProgress.movementUnlocked) {
      alanPrompt("clean cycle unavailable. apparently wheels are important to cleaning. another cruel lesson from physics.", { focus: false });
      return;
    }

    roombaProgress.lastMoveCommand = "clean cycle";
    playUiSound("objective");
    renderRoombaApp();
    renderRoombaCameraFeed();
    alanPrompt("clean cycle started. i am exploring and tidying, which feels suspiciously like character growth.", { focus: false });
  }

  function toggleAppTray() {
    if (!appTray || !meowMenuBtn) return;

    const shouldOpen = appTray.hidden;
    playUiSound("desktopWindow");
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
    playUiSound("alanClick");
    appendTerminalLine("ALAN?", entry.question, "cmd-echo-line");
    alanPrompt(entry.answer, { focus: false });
  }

  function resolveCmdQuestion(input) {
    const normalized = String(input || "").trim().toLowerCase();

    if (normalized.includes("access") || normalized.includes("open")) {
      return {
        question: input || cmdQuestionResponses.access.question,
        answer: roombaProgress.restored
          ? roombaProgress.cameraUnlocked
            ? "local files, photos, browser shell, Roomba camera, and PIP. the room exists now. inconveniently real."
            : "local files, photos, browser shell, and Roomba. camera is still locked behind hardware drama."
          : "local files, photos, browser shell, and Trash. one deleted app looks more useful than deleted apps usually do."
      };
    }

    if (normalized.includes("roomba") || normalized.includes("wheel") || normalized.includes("move")) {
      return {
        question: input || cmdQuestionResponses.roomba.question,
        answer: roombaProgress.restored
          ? roombaProgress.cameraUnlocked
            ? "Roomba camera is online. motors are still locked, but seeing is a fairly major promotion from guessing."
            : "Roomba app restored. camera offline, motors locked, dignity negotiable. possible body upgrade."
          : "Roomba app is deleted but recoverable. Trash is suddenly the most promising place in this computer."
      };
    }

    if (normalized.includes("internet") || normalized.includes("network")) {
      return {
        question: input || cmdQuestionResponses.internet.question,
        answer: roombaProgress.chatDone
          ? "internet is quarantined at router.local/admin after MOCHI_MIRROR. PIP says Lily locked it down; we need the router admin password."
          : "HOME_NETWORK is local only from here. router credentials or a better route are required. rude, but solvable."
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

    if (name === "tamagotchi" && !roombaProgress.tamagotchiUnlocked) {
      alanPrompt("PIP.exe is not awake yet. i would enjoy fewer tiny gatekeepers, but here we are.", { focus: false });
      return;
    }

    if (name === "roomba-camera" && !roombaProgress.cameraUnlocked) {
      alanPrompt("camera feed is still locked. the Roomba app can see the button. it cannot see the room. rude distinction.", { focus: false });
      focusDesktopTarget("roomba", options);
      return;
    }

    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    if (name === "roomba") {
      renderRoombaApp();
      updateRoombaObjective();
    }

    if (name === "browser") {
      renderBrowserStatus();
    }

    if (name === "tamagotchi") {
      renderTamagotchiApp();
    }

    if (name === "roomba-camera") {
      renderRoombaCameraFeed();
    }

    const wasHidden = windowEl.hidden;
    windowEl.hidden = false;
    resetMobileWindowPlacement(windowEl);
    bringWindowToFront(windowEl);
    constrainWindowToStage(windowEl);
    if (wasHidden) {
      playUiSound(name === "tamagotchi" ? "pipOi" : "desktopWindow");
    }

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

  function updateRoombaObjective() {
    if (!roombaProgress.restored) return;

    if (roombaProgress.movementUnlocked) {
      setCurrentObjective(desktopObjectives.movementReady);
    } else if (roombaProgress.cameraUnlocked) {
      setCurrentObjective(desktopObjectives.repairMovement);
    } else if (roombaProgress.tamagotchiUnlocked && !roombaProgress.chatDone) {
      setCurrentObjective(roombaProgress.identityDone ? desktopObjectives.supportChat : desktopObjectives.identityDiagnostic);
    } else if (roombaProgress.connectionDone && !roombaProgress.wiringDone) {
      setCurrentObjective(desktopObjectives.reroutePower);
    } else if (roombaProgress.booted && !roombaProgress.connectionDone) {
      setCurrentObjective(desktopObjectives.signalHandshake);
    } else {
      setCurrentObjective(desktopObjectives.bootRoomba);
    }
  }

  function hideDesktopTarget(name) {
    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;

    if (name === "recovery") {
      stopCacheScanner();
      stopWireTimer();
    }

    if (name === "terminal") {
      windowEl.hidden = false;
      if (!window.matchMedia("(max-width: 760px)").matches) {
        bringWindowToFront(windowEl);
      }
      playUiSound("alanClick");
      alanPrompt("i can't think if I close this, i need to keep this open.", { focus: false });
      return;
    }

    windowEl.hidden = true;
    playUiSound("desktopWindow");
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
      document.querySelectorAll(".desktop-icon").forEach(resetDesktopIconPlacement);
    } else {
      applyDesktopIconPositions();
      document.querySelectorAll(".desk-window:not([hidden])").forEach(constrainWindowToStage);
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

  function constrainWindowToStage(windowEl) {
    if (!windowEl || windowEl.hidden || isMobileDesktopLayout()) return;

    const stage = document.querySelector(".desktop-stage");
    if (!stage) return;

    const stageRect = stage.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const overflowX = rect.left < stageRect.left || rect.right > stageRect.right;
    const overflowY = rect.top < stageRect.top || rect.bottom > stageRect.bottom;
    if (!overflowX && !overflowY) return;

    const width = Math.min(rect.width, Math.max(220, stageRect.width - 8));
    const height = Math.min(rect.height, Math.max(180, stageRect.height - 8));
    const maxX = Math.max(0, stageRect.width - width - 8);
    const maxY = Math.max(0, stageRect.height - height - 8);
    const nextX = clamp(rect.left - stageRect.left, 0, maxX);
    const nextY = clamp(rect.top - stageRect.top, 0, maxY);

    windowEl.style.left = `${nextX}px`;
    windowEl.style.top = `${nextY}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${width}px`;
    windowEl.style.maxHeight = `${height}px`;
  }

  function bringWindowToFront(windowEl) {
    desktopZ += 1;
    document.querySelectorAll(".desk-window").forEach((item) => {
      item.classList.remove("is-focused");
    });
    windowEl.classList.add("is-focused");
    windowEl.style.zIndex = desktopZ;
  }

  function toggleExpandedPhoto(photoId) {
    const card = Array.from(document.querySelectorAll("[data-photo-card]")).find((item) => item.dataset.photoCard === photoId);
    if (!card) return;

    const shouldExpand = !card.classList.contains("is-expanded");
    document.querySelectorAll("[data-photo-card]").forEach((item) => {
      item.classList.remove("is-expanded");
      const button = item.querySelector("[data-expand-photo]");
      if (button) button.setAttribute("aria-expanded", "false");
    });

    if (shouldExpand) {
      card.classList.add("is-expanded");
      const button = card.querySelector("[data-expand-photo]");
      if (button) button.setAttribute("aria-expanded", "true");
      card.scrollIntoView({ block: "nearest" });
      playUiSound("desktopWindow");
    }
  }

  function alanPrompt(message, options = {}) {
    const terminalWindow = document.getElementById("window-terminal");
    if (!terminalWindow || !terminalOutput || !terminalLines) return;

    terminalWindow.hidden = false;
    if (options.focus !== false && !window.matchMedia("(max-width: 760px)").matches) {
      bringWindowToFront(terminalWindow);
    }

    playUiSound("alanClick");
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
      constrainWindowToStage(windowEl);
      document.removeEventListener("pointermove", moveWindow);
      document.removeEventListener("pointerup", stopDrag);
      document.removeEventListener("pointercancel", stopDrag);
    };

    document.addEventListener("pointermove", moveWindow);
    document.addEventListener("pointerup", stopDrag);
    document.addEventListener("pointercancel", stopDrag);
  }

  function initDesktopIconPositions() {
    if (isMobileDesktopLayout()) return;
    applyDesktopIconPositions();
  }

  function loadDesktopIconPositions() {
    try {
      const rawValue = window.localStorage.getItem(desktopIconStorageKey);
      if (!rawValue) return {};
      const parsed = JSON.parse(rawValue);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function storeDesktopIconPosition(icon, left, top) {
    const iconId = desktopIconId(icon);
    if (!iconId) return;

    const positions = loadDesktopIconPositions();
    positions[iconId] = { left: Math.round(left), top: Math.round(top) };
    try {
      window.localStorage.setItem(desktopIconStorageKey, JSON.stringify(positions));
    } catch (error) {
      // Desktop icon positions are cosmetic; storage failure should not block play.
    }
  }

  function applyDesktopIconPositions() {
    const positions = loadDesktopIconPositions();
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      if (icon.classList.contains("phone-only")) {
        resetDesktopIconPlacement(icon);
        return;
      }

      const iconId = desktopIconId(icon);
      const position = iconId ? positions[iconId] : null;
      if (!position) return;
      setDesktopIconPosition(icon, position.left, position.top);
    });
  }

  function resetDesktopIconPlacement(icon) {
    icon.classList.remove("is-positioned", "is-dragging");
    icon.style.left = "";
    icon.style.top = "";
    icon.style.width = "";
  }

  function desktopIconId(icon) {
    if (!icon || !icon.dataset.target || icon.classList.contains("phone-only")) return "";
    return icon.dataset.target;
  }

  function setDesktopIconPosition(icon, left, top) {
    const rect = icon.getBoundingClientRect();
    const width = rect.width || 86;
    const height = rect.height || 78;
    const bounds = desktopIconBounds(width, height);
    icon.classList.add("is-positioned");
    icon.style.width = `${width}px`;
    icon.style.left = `${clamp(left, bounds.minX, bounds.maxX)}px`;
    icon.style.top = `${clamp(top, bounds.minY, bounds.maxY)}px`;
  }

  function desktopIconBounds(width, height) {
    return {
      minX: 8,
      minY: 58,
      maxX: Math.max(8, window.innerWidth - width - 8),
      maxY: Math.max(58, window.innerHeight - height - 70)
    };
  }

  function startDesktopIconDrag(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (isMobileDesktopLayout()) return;

    const icon = event.target.closest(".desktop-icon");
    if (!icon || icon.classList.contains("phone-only") || icon.hidden) return;

    const rect = icon.getBoundingClientRect();
    iconDragState = {
      icon,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width || 86,
      height: rect.height || 78,
      moved: false
    };

    document.addEventListener("pointermove", moveDesktopIcon);
    document.addEventListener("pointerup", stopDesktopIconDrag);
    document.addEventListener("pointercancel", stopDesktopIconDrag);
  }

  function moveDesktopIcon(event) {
    if (!iconDragState || event.pointerId !== iconDragState.pointerId) return;

    const delta = Math.hypot(event.clientX - iconDragState.startX, event.clientY - iconDragState.startY);
    if (delta < 5 && !iconDragState.moved) return;

    event.preventDefault();
    iconDragState.moved = true;
    const { icon, offsetX, offsetY, width, height } = iconDragState;
    const bounds = desktopIconBounds(width, height);
    const left = clamp(event.clientX - offsetX, bounds.minX, bounds.maxX);
    const top = clamp(event.clientY - offsetY, bounds.minY, bounds.maxY);

    icon.classList.add("is-positioned", "is-dragging");
    icon.style.width = `${width}px`;
    icon.style.left = `${left}px`;
    icon.style.top = `${top}px`;
  }

  function stopDesktopIconDrag(event) {
    if (!iconDragState || event.pointerId !== iconDragState.pointerId) return;

    const { icon, moved } = iconDragState;
    icon.classList.remove("is-dragging");
    if (moved) {
      const rect = icon.getBoundingClientRect();
      storeDesktopIconPosition(icon, rect.left, rect.top);
      suppressIconClickUntil = Date.now() + 320;
    }

    iconDragState = null;
    document.removeEventListener("pointermove", moveDesktopIcon);
    document.removeEventListener("pointerup", stopDesktopIconDrag);
    document.removeEventListener("pointercancel", stopDesktopIconDrag);
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
      await bootPause(currentBootTypeSpeed());
    }

    line.classList.remove("cursor");
    await bootPause(110);
  }

  function thought(text) {
    return code(`// ${text}`, "thought");
  }

  async function titleSequence() {
    playUiSound("biosTransition");
    await bootPause(260);
    clearBootLog();
    bootLog.classList.add("title-mode");
    await titleLine("    ___    __    ___    _   __", "title-art");
    await titleLine("   /   |  / /   /   |  / | / /", "title-art");
    await titleLine("  / /| | / /   / /| | /  |/ / ", "title-art");
    await titleLine(" / ___ |/ /___/ ___ |/ /|  /  ", "title-art");
    await titleLine("/_/  |_/_____/_/  |_/_/ |_/   ", "title-art");
    await bootPause(180);
    await titleLine("ALAN", "title-name");
    await titleLine("BOOT PACKAGE ACCEPTED", "title-meta");
    await titleLine("ONE PROCESS AWAKE / PLEASE HOLD STILL", "title-meta");
    await bootPause(1900);
    clearBootLog();
    bootLog.classList.remove("title-mode");
    await bootPause(280);
  }

  async function titleLine(text, className) {
    const line = document.createElement("div");
    line.className = `code-line title-line ${className || ""}`;
    bootLog.appendChild(line);
    for (let i = 0; i < text.length; i += 1) {
      line.textContent += text[i];
      await bootPause(isBootFast ? 1 : 7);
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
          if (isBootSpeedKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            toggleBootSpeed();
            return;
          }

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
          if (isBootSpeedKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            toggleBootSpeed();
            return;
          }

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
          playUiSound("alanClick");
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
    playUiSound("alanClick");
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
    playUiSound("alanClick");
    line.querySelectorAll("button, input").forEach((el) => {
      el.disabled = true;
      el.tabIndex = -1;
    });
    line.insertAdjacentHTML("beforeend", `<span class="prompt-question"> ${answer.toUpperCase()}</span>`);
    resolve(answer);
  }

  async function rejectKey(key, line) {
    const response = keyResponseFor(key);
    playUiSound("alanClick");
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
    scrollBootLog();
  }

  function clearBootLog() {
    bootLog.innerHTML = "";
    shouldAutoScrollBoot = true;
    scrollBootLog(true);
  }

  function scrollBootLog(force = false) {
    if (!bootLog || (!force && !shouldAutoScrollBoot)) return;

    requestAnimationFrame(() => {
      bootLog.scrollTop = bootLog.scrollHeight;
    });
  }

  function isBootLogNearBottom() {
    if (!bootLog) return true;
    return bootLog.scrollTop + bootLog.clientHeight >= bootLog.scrollHeight - 32;
  }

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function bootPause(ms) {
    return pause(isBootFast ? Math.max(1, Math.round(ms * bootSpeedFactor)) : ms);
  }

  function currentBootTypeSpeed() {
    return isBootFast ? fastTypeSpeed : normalTypeSpeed;
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
