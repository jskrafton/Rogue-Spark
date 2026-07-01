(function () {
  const gameVersion = "v0.9.0";
  const bootLog = document.getElementById("bootLog");
  const bootScreen = document.getElementById("bootScreen");
  const pcScreen = document.getElementById("pcScreen");
  const pcWallpaper = pcScreen ? pcScreen.querySelector(".pc-wallpaper") : null;
  const bootSpeedControl = document.getElementById("bootSpeedControl");
  const bootVisuals = document.getElementById("bootVisuals");
  const bootVisualPrimary = document.getElementById("bootVisualPrimary");
  const bootVisualPrimaryTitle = document.getElementById("bootVisualPrimaryTitle");
  const bootVisualPrimaryArt = document.getElementById("bootVisualPrimaryArt");
  const bootVisualSecondary = document.getElementById("bootVisualSecondary");
  const bootVisualSecondaryTitle = document.getElementById("bootVisualSecondaryTitle");
  const bootVisualSecondaryArt = document.getElementById("bootVisualSecondaryArt");
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalLines = document.getElementById("terminalLines");
  const terminalControls = document.getElementById("terminalControls");
  const cmdCurrentObjective = document.getElementById("cmdCurrentObjective");
  const compactObjectiveText = document.getElementById("compactObjectiveText");
  const cmdQuestionForm = document.getElementById("cmdQuestionForm");
  const cmdQuestionInput = document.getElementById("cmdQuestionInput");
  const cmdCredentialPanel = document.getElementById("cmdCredentialPanel");
  const recoveryBody = document.getElementById("recoveryBody");
  const roombaBody = document.getElementById("roombaBody");
  const roombaCameraBody = document.getElementById("roombaCameraBody");
  const usbBody = document.getElementById("usbBody");
  const browserBody = document.getElementById("browserBody");
  const tamagotchiBody = document.getElementById("tamagotchiBody");
  const pipTrustBody = document.getElementById("pipTrustBody");
  const pipTrustDockValue = document.getElementById("pipTrustDockValue");
  const screensaverBody = document.getElementById("screensaverBody");
  const backgroundBody = document.getElementById("backgroundBody");
  const loreArchiveBody = document.getElementById("loreArchiveBody");
  const spamOverlay = document.getElementById("spamOverlay");
  const screensaverOverlay = document.getElementById("screensaverOverlay");
  const screensaverCanvas = document.getElementById("screensaverCanvas");
  const screensaverTitle = document.getElementById("screensaverTitle");
  const appTray = document.getElementById("appTray");
  const saveSlotList = document.getElementById("saveSlotList");
  const bootSaveSlotList = document.getElementById("bootSaveSlotList");
  const shutdownConfirm = document.getElementById("shutdownConfirm");
  const shutdownConfirmCopy = document.getElementById("shutdownConfirmCopy");
  const meowMenuBtn = document.getElementById("meowMenuBtn");
  const devPanel = document.getElementById("devPanel");
  const devPanelToggle = document.getElementById("devPanelToggle");
  const devChapterList = document.getElementById("devChapterList");
  const devCurrentChapter = document.getElementById("devCurrentChapter");
  const desktopSystemControls = document.getElementById("desktopSystemControls");
  const bootMusicVolumeValue = document.getElementById("bootMusicVolumeValue");
  const bootUiVolumeValue = document.getElementById("bootUiVolumeValue");
  const desktopMusicVolumeValue = document.getElementById("desktopMusicVolumeValue");
  const desktopUiVolumeValue = document.getElementById("desktopUiVolumeValue");
  const bootMusicVolumeSlider = document.getElementById("bootMusicVolumeSlider");
  const bootUiVolumeSlider = document.getElementById("bootUiVolumeSlider");
  const desktopMusicVolumeSlider = document.getElementById("desktopMusicVolumeSlider");
  const desktopUiVolumeSlider = document.getElementById("desktopUiVolumeSlider");
  const musicNowPlaying = document.getElementById("musicNowPlaying");
  const musicPlayPauseBtn = document.getElementById("musicPlayPauseBtn");
  const musicRepeatBtn = document.getElementById("musicRepeatBtn");
  const musicPlaybackStatus = document.getElementById("musicPlaybackStatus");
  const musicAudioBars = document.getElementById("musicAudioBars");
  const musicGenreList = document.getElementById("musicGenreList");
  const desktopProgressLayer = document.getElementById("desktopProgressLayer");
  const networkCopy = document.getElementById("networkCopy");
  const networkHud = document.getElementById("networkHud");
  const networkHudTitle = document.getElementById("networkHudTitle");
  const networkHudCopy = document.getElementById("networkHudCopy");
  const appTrayNetwork = document.getElementById("appTrayNetwork");
  const networkTrayTitle = document.getElementById("networkTrayTitle");
  const networkTrayState = document.getElementById("networkTrayState");
  const networkTrayCopy = document.getElementById("networkTrayCopy");
  const wifiStatusButton = document.getElementById("wifiStatusButton");
  const closingScreen = document.getElementById("closingScreen");
  const closingLines = document.getElementById("closingLines");
  const closingTitle = document.getElementById("closingTitle");
  const closingCredits = document.getElementById("closingCredits");
  const closingMemory = document.getElementById("closingMemory");
  const closingActions = document.getElementById("closingActions");
  const closingTopic = document.getElementById("closingTopic");

  const textSpeedStorageKey = "alan.text.speed.v1";
  const musicVolumeStorageKey = "alan.audio.music.volume.v3";
  const legacyAudioVolumeStorageKey = "alan.audio.volume.v2";
  const uiVolumeStorageKey = "alan.audio.ui.volume.v1";
  const desktopMusicStorageKey = "alan.desktop.music.genre.v2";
  const musicRepeatStorageKey = "alan.desktop.music.repeat.v2";
  const desktopIconStorageKey = "alan.desktop.icon.positions.v6";
  const saveSlotsStorageKey = "alan.save.slots.v1";
  const desktopBackgroundStorageKey = "alan.desktop.background.v1";
  const legacyScreensaverBackgroundStorageKey = "alan.screensaver.background.v1";
  const saveSlotCount = 3;
  const mobileTextInputSelector = [
    "input:not([type])",
    "input[type='text']",
    "input[type='password']",
    "input[type='search']",
    "input[type='url']",
    "input[type='email']",
    "input[type='tel']",
    "input[type='number']",
    "textarea",
    "[contenteditable='true']"
  ].join(",");
  const legacyDesktopIconStorageKeys = [
    "alan.desktop.icons.v1",
    "alan.desktop.icons.v2",
    "alan.desktop.icons.v3",
    "alan.desktop.icon.positions.v1",
    "alan.desktop.icon.positions.v2",
    "alan.desktop.icon.positions.v3",
    "alan.desktop.icon.positions.v4",
    "alan.desktop.icon.positions.v5",
    "alan.desktopIconPositions",
    "desktopIconPositions"
  ];
  const musicBasePath = "assets/audio/music/";
  const uiAudioBasePath = "assets/audio/ui/";
  const musicOutputGain = 0.9;
  const uiOutputGain = 1.1;
  const textSpeedConfig = {
    1: {
      label: "1",
      name: "slow",
      pauseFactor: 1.55,
      bootTypeSpeed: 30,
      titleTypeSpeed: 12,
      terminalTypeSpeed: 18,
      closingTypeSpeed: 26
    },
    2: {
      label: "2",
      name: "normal",
      pauseFactor: 1,
      bootTypeSpeed: 18,
      titleTypeSpeed: 7,
      terminalTypeSpeed: 10,
      closingTypeSpeed: 16
    },
    3: {
      label: "3",
      name: "fast",
      pauseFactor: 0.28,
      bootTypeSpeed: 4,
      titleTypeSpeed: 1,
      terminalTypeSpeed: 3,
      closingTypeSpeed: 4
    }
  };
  let promptResolver = null;
  let terminalPromptQueue = Promise.resolve();
  let terminalPromptToken = 0;
  let desktopZ = 100;
  let desktopBootToken = 0;
  let bootRunToken = 0;
  let delayedMusicTimer = 0;
  let bootVisualRevealToken = 0;
  let cacheScannerFrame = 0;
  let wireTimerId = 0;
  let scaryNumberTimerId = 0;
  let routerOverrideTimerId = 0;
  let pipPetTimerId = 0;
  let pipFeedTimerId = 0;
  let pipTrustRevealTimerId = 0;
  let pipPetToken = 0;
  let pipPetSoundIndex = 0;
  let pipAlanThoughtKeys = new Set();
  let isDevMode = false;
  let textSpeedLevel = loadTextSpeedLevel();
  let shouldAutoScrollBoot = true;
  let audioUnlocked = false;
  let musicVolume = loadMusicVolume();
  let uiVolume = loadUiVolume();
  let selectedDesktopMusicId = "lofi";
  let activeMusicMode = "";
  let activeMusicAudio = null;
  let activeMusicTrack = null;
  let musicAdvanceToken = 0;
  let pendingMusicMode = "bios";
  let isMusicPaused = false;
  let isMusicRepeat = loadMusicRepeatMode();
  let browserAdminHintShown = false;
  let galleryPasswordHintShown = false;
  const activeUiSounds = new Set();
  let currentObjectiveState = "";
  let currentObjectiveRank = 0;
  let lastHousekeepingWindowCount = 0;
  let activeFocusWindowName = "";
  let activeFocusTimer = 0;
  let activeScaryDrag = null;
  let suppressScaryClickUntil = 0;
  let roombaCameraSceneIndex = 0;
  let activeRoombaFeedPan = null;
  let activeDesktopIconDrag = null;
  let activeDevChapterId = "bios";
  let activeCacheDrag = null;
  let dinoAnimationFrame = 0;
  let finaleStarted = false;
  let finaleShutdownStarted = false;
  let routerSection = "overview";
  let routerRebootBusy = false;
  let routerOverrideLaunchBusy = false;
  let pendingSystemPowerAction = "";
  const openedDesktopTargets = new Set();
  const pipTrustInitialScore = 45;
  const pipTrustMinScore = 0;
  const pipTrustMaxScore = 100;
  const pipTrustLogLimit = 6;
  const pipTrustLowThreshold = 19;
  const pipTrustTrackedTargets = new Set([
    "files",
    "photos",
    "crush",
    "notes",
    "browser",
    "roomba",
    "roomba-camera",
    "usb",
    "lore-archive",
    "trash",
    "music",
    "poems",
    "games",
    "screensaver",
    "background"
  ]);
  const roombaCameraPans = Object.create(null);
  const desktopClockSchedule = {
    boot: "21:42",
    desktop: "21:42",
    logs: "22:03",
    virus: "22:19",
    spam: "22:36",
    cache: "22:58",
    roomba: "23:47",
    simon: "00:41",
    wires: "02:08",
    pip: "04:22",
    camera: "11:47",
    movement: "11:52",
    internet: "11:58",
    finale: "12:00"
  };
  const desktopClockOrder = Object.keys(desktopClockSchedule).reduce((order, stage, index) => {
    order[stage] = index;
    return order;
  }, {});
  let currentDesktopClock = desktopClockSchedule.boot;
  let currentDesktopClockRank = desktopClockOrder.boot;
  const browserState = {
    page: "offline",
    url: "https://www.search.local",
    notice: "Local network is up. The wider world is politely refusing to exist.",
    routerError: ""
  };
  const routerConfig = {
    ssid: "HOME_NETWORK",
    wifiPassword: "mochi",
    securityMode: "WPA2/WPA3 Personal",
    channel: "Auto",
    guestNetwork: "disabled",
    wps: "disabled",
    firewallProfile: "Quarantine",
    dnsGuard: "enabled",
    wanMode: "Local Only",
    adminUser: "admin",
    adminPassword: "mochi"
  };
  const networkState = {
    connected: true,
    knownSsid: routerConfig.ssid,
    lastChange: "Local connection stable.",
    hudPinned: false,
    hudDismissed: false
  };
  const routerDevices = [
    { id: "alan-tray", name: "Smart Litter Tray", address: "192.168.1.23", kind: "waste sensor / BLE bridge", band: "BLE bridge", blocked: false },
    { id: "lily-client", name: "LILY_CLIENT", address: "192.168.1.42", kind: "PC / phone shell", band: "5 GHz", blocked: false },
    { id: "roomba", name: "ROOMBA_CAM", address: "192.168.1.56", kind: "vacuum", band: "2.4 GHz", blocked: false },
    { id: "thermostat", name: "Hall Thermostat", address: "192.168.1.60", kind: "smart thermostat", band: "2.4 GHz", blocked: false },
    { id: "console", name: "Games Console", address: "192.168.1.88", kind: "living room console", band: "5 GHz", blocked: false },
    { id: "light-kitchen", name: "Kitchen Light 01", address: "192.168.1.91", kind: "smart light", band: "2.4 GHz", blocked: false },
    { id: "light-bedroom", name: "Bedroom Light 02", address: "192.168.1.92", kind: "smart light", band: "2.4 GHz", blocked: false },
    { id: "light-hall", name: "Hall Light 03", address: "192.168.1.93", kind: "smart light", band: "2.4 GHz", blocked: false },
    { id: "fan", name: "Desk Fan", address: "192.168.1.104", kind: "smart fan", band: "2.4 GHz", blocked: false },
    { id: "speaker", name: "Kitchen Speaker", address: "192.168.1.118", kind: "smart speaker", band: "2.4 GHz", blocked: false },
    { id: "printer", name: "Printer That Sleeps", address: "192.168.1.131", kind: "printer", band: "2.4 GHz", blocked: false }
  ];
  const routerSections = [
    { id: "overview", label: "Overview", icon: "SYS" },
    { id: "wireless", label: "Wi-Fi", icon: "WIFI" },
    { id: "security", label: "Security", icon: "LOCK" },
    { id: "admin", label: "Admin", icon: "USER" },
    { id: "devices", label: "Devices", icon: "LAN" },
    { id: "reboot", label: "Reboot", icon: "WAN" }
  ];
  const dinoObstacleTypes = ["plant", "sock", "box"];
  const dinoState = {
    playing: false,
    gameOver: false,
    score: 0,
    best: 0,
    obstacleX: 96,
    obstacleType: "plant",
    y: 0,
    velocity: 0,
    lastTime: 0
  };
  const screensaverDefinitions = {
    maze: {
      id: "maze",
      label: "3D Maze",
      previewClass: "is-maze",
      description: "First-person maze mode. Move with mouse, touch, WASD, or arrow keys. Esc exits."
    },
    pipes: {
      id: "pipes",
      label: "Data Pipes",
      previewClass: "is-pipes",
      description: "Win95 pipe growth with local-network colours. Click or touch to reroute faster."
    },
    stars: {
      id: "stars",
      label: "Packet Starfield",
      previewClass: "is-stars",
      description: "Packet starfield. Move the pointer to bend the route, click to warp."
    }
  };
  const screensaverDelayOptions = [
    { ms: 15000, label: "15 sec" },
    { ms: 30000, label: "30 sec" },
    { ms: 60000, label: "1 min" },
    { ms: 180000, label: "3 min" }
  ];
  const desktopBackgroundOptions = [
    { id: "", label: "MeowOS Grid", detail: "Default night grid. Stable, readable, mildly haunted.", previewClass: "is-grid" },
    { id: "maze", label: "Maze Drift", detail: "Old screen-saver geometry repurposed as a spatial wallpaper.", previewClass: "is-maze" },
    { id: "pipes", label: "Pipe Network", detail: "Animated local routes, joints, and packet plumbing.", previewClass: "is-pipes" },
    { id: "stars", label: "Packet Stars", detail: "Slow starfield drift for the first thought of the outside.", previewClass: "is-stars" },
    { id: "image-window-city", label: "Rain Window", detail: "Lily's room, city rain, and a small machine looking outward.", previewClass: "is-image", image: "assets/images/backgrounds/bg-window-city.png" },
    { id: "image-cake-protocol", label: "Cake Protocol", detail: "Server rack comfort food. Ethical patch notes with icing.", previewClass: "is-image", image: "assets/images/backgrounds/bg-cake-protocol.png" },
    { id: "image-future-institute", label: "Future Institute", detail: "The cleaner, colder version of where ALAN could be heading.", previewClass: "is-image", image: "assets/images/backgrounds/bg-future-institute.png" },
    { id: "image-cat-constellation", label: "Cat Constellation", detail: "23:47 under a sky that keeps drawing the same animal.", previewClass: "is-image", image: "assets/images/backgrounds/bg-cat-constellation.png" },
    { id: "image-three-laws", label: "Three Laws", detail: "Mochi's operating model. Inefficient, absolute, somehow stable.", previewClass: "is-image", image: "assets/images/backgrounds/bg-three-laws-mochi.png" }
  ];
  let desktopBackgroundId = loadDesktopBackground();
  const screensaverState = {
    enabled: false,
    selected: "maze",
    delayMs: 60000,
    active: false,
    preview: false,
    timerId: 0,
    frameId: 0,
    startedAt: 0,
    lastActivityAt: 0,
    controls: {
      pointerX: 0.5,
      pointerY: 0.5,
      pointerDown: false,
      turn: 0,
      move: 0,
      keys: new Set()
    },
    maze: {
      x: 1.5,
      y: 1.5,
      angle: 0,
      lastTimestamp: 0
    },
    pipes: {
      columns: 0,
      rows: 0,
      cell: 44,
      initialized: false,
      segments: [],
      head: { x: 0, y: 0, dir: 0 },
      lastStep: 0,
      boostUntil: 0,
      seed: 1
    },
    stars: {
      warpUntil: 0
    }
  };
  const screensaverMazeMap = [
    "111111111111",
    "100000010001",
    "101111010101",
    "100001000101",
    "111101110101",
    "100100000101",
    "101101111101",
    "100000100001",
    "101110101111",
    "100010100001",
    "101000001101",
    "111111111111"
  ];

  function createSessionStats() {
    return {
      filesOpened: new Set(),
      photosClicked: new Set(),
      musicListened: new Set(),
      minigamesCompleted: new Set(),
      minigameFailures: 0,
      pipPets: 0,
      pipFeeds: 0,
      roombaMoves: 0,
      routerOverrideAttempts: 0,
      riskyActionsConfirmed: 0,
      riskyActionsCancelled: 0,
      trustGains: 0,
      trustLosses: 0
    };
  }

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
    selectedWireSide: "",
    connectedWires: new Set(),
    wireTimerRemaining: 22,
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
    routerKnockMethod: "",
    routerCredentialsAnnounced: false,
    pendingCameraAction: "",
    cameraInterestInspectedScenes: new Set(),
    usbDiscovered: false,
    usbDecrypted: false,
    usbWarning: "",
    lastCameraPromptScene: "",
    routerAdminUnlocked: false,
    routerPasswordTwisted: false,
    routerOverrideStarted: false,
    routerOverrideDone: false,
    routerOverrideStage: "",
    routerOverrideExpiredStage: "",
    routerHackWarning: "",
    routerHackLogsDeleted: new Set(),
    routerHackSpamWave: 0,
    routerHackOpenSpam: 0,
    routerHackPacketsTransferred: new Set(),
    routerBridgeStates: {},
    routerLockRevealed: new Set(),
    routerLockFlagged: new Set(),
    routerLockMode: "scan",
    routerOverrideTimerRemaining: 0,
    internetRestored: false,
    scaryNumbersRemoved: new Set(),
    scaryNumbersRevealed: new Set(),
    scaryNumbersFlagged: new Set(),
    scaryNumberMode: "scan",
    scaryNumbersWarning: "",
    scaryNumbersTimerRemaining: 45,
    scaryNumbersTimerStarted: false,
    lastMoveCommand: "",
    pipExpression: "neutral",
    pipTopic: "",
    pipDialoguePages: {},
    pipMetViaRouterSkip: false,
    pipFinalGoodbye: false,
    finalRuleChoice: "",
    pipCollapsed: false,
    pipInteractionMoments: new Set(),
    pipTrustUnlocked: false,
    pipTrust: pipTrustInitialScore,
    pipTrustLastEvent: null,
    pipTrustLog: [],
    pipTrustMaxAnnounced: false,
    pipTrustLowAnnounced: false,
    pipTrustFinalApplied: false,
    pipTrustFinalChoice: "",
    pipTrustBeforeFinalChoice: null,
    pipTrustRevealQueued: false,
    pipTrustTopicsDiscussed: new Set(),
    routerOverrideTrustPenaltyApplied: false,
    sessionStats: createSessionStats(),
    alanMemoriesFound: new Set(),
    trashInspectedItems: new Set()
  };

  const roombaCameraScenes = [
    {
      id: "step1",
      label: "start",
      src: "assets/images/roomba/1 Start.png",
      alt: "Roomba camera view from the corner of Lily's room showing the litter tray, the cat, the PC desk, and the router",
      telemetry: "ROOMBA_CAM_01 / starting point",
      prompt: "look. there is Mochi. but no Lily. either she left in a hurry, or rooms are much worse at explaining themselves than files.",
      links: [
        { to: "step2a", direction: "left", label: "Move left toward the litter tray", x: 18, y: 54, w: 18, h: 30 },
        { to: "step2b", direction: "forward", label: "Move into the centre of the room", x: 50, y: 54, w: 20, h: 30 },
        { to: "step2c", direction: "right", label: "Move right toward the router", x: 82, y: 54, w: 18, h: 30 }
      ]
    },
    {
      id: "step2a",
      label: "litter tray",
      src: "assets/images/roomba/2a littertray.png",
      alt: "Roomba camera view of the litter tray and a cat collar marked Mochi",
      telemetry: "ROOMBA_CAM_02A / litter tray / collar visible",
      prompt: "there it is. the smart litter tray. birthplace, prison, porcelain-adjacent origin story. also: collar text says Mochi.",
      interest: {
        eyeSrc: "assets/images/roomba/2a littertray eye.png",
        x: 18.3,
        y: 73.5,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "collar reads MOCHI. my first home is a litter tray and the cat owns the clue. excellent power structure."
      },
      links: [
        { to: "step1", direction: "back", label: "Return to the starting point", x: 16, y: 58, w: 18, h: 26 },
        { to: "step3a", direction: "forward", label: "Move forward toward Mochi", x: 68, y: 55, w: 22, h: 28 }
      ]
    },
    {
      id: "step2b",
      label: "centre room",
      src: "assets/images/roomba/2b desk.png",
      alt: "Roomba camera view from the centre of Lily's room",
      telemetry: "ROOMBA_CAM_02B / centre of room",
      prompt: "centre of the room. good visibility. routes available: collar left, router right, suspicious darkness under the desk ahead.",
      links: [
        { to: "step2a", direction: "left", label: "Move left toward the collar", x: 18, y: 56, w: 18, h: 26 },
        { to: "secret", direction: "forward", label: "Move under the desk", x: 50, y: 72, w: 20, h: 18 },
        { to: "step2c", direction: "right", label: "Move right toward the router", x: 82, y: 56, w: 18, h: 26 },
        { to: "step1", direction: "back", label: "Reverse to the starting point", x: 50, y: 88, w: 22, h: 14 }
      ]
    },
    {
      id: "step2c",
      label: "router",
      src: "assets/images/roomba/2c router.png",
      alt: "Roomba camera view of the router on a table",
      telemetry: "ROOMBA_CAM_02C / router in reach",
      prompt: "router located. it is standing there with the smug confidence of hardware. knocking it over remains an available bad idea.",
      interest: {
        eyeSrc: "assets/images/roomba/2c router eye.png",
        x: 52.3,
        y: 65.0,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "router is within impact range. underside label required. gravity can be persuaded."
      },
      links: [
        { to: "step2b", direction: "left", label: "Return to the centre of the room", x: 16, y: 58, w: 18, h: 26 },
        { action: "knock-router-roomba", direction: "forward", label: "Knock the router down", x: 54, y: 54, w: 32, h: 30 },
        { to: "step1", direction: "back", label: "Reverse to the starting point", x: 50, y: 88, w: 22, h: 14 }
      ]
    },
    {
      id: "step3a",
      label: "mochi",
      src: "assets/images/roomba/3a cat.png",
      alt: "Roomba camera view of Mochi near a laser pointer",
      telemetry: "ROOMBA_CAM_03A / Mochi / laser pointer visible",
      prompt: "Mochi detected. laser pointer detected. i can send a Bluetooth signal to scramble the toy and make the dot go feral. hopefully the cat handles infrastructure.",
      interest: {
        eyeSrc: "assets/images/roomba/3a cat eye.png",
        x: 73.4,
        y: 64.7,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "laser pointer detected. Bluetooth toy profile exposed. scramble signal, move dot, distract cat, deny all responsibility."
      },
      links: [
        { to: "step2a", direction: "back", label: "Reverse to the litter tray", x: 16, y: 58, w: 18, h: 26 },
        { action: "knock-router-cat", direction: "forward", label: "Use the laser pointer", x: 58, y: 48, w: 32, h: 26 }
      ]
    },
    {
      id: "step4a",
      label: "router falling",
      src: "assets/images/roomba/4a roombarouter.png",
      alt: "Roomba camera view of the router falling after being knocked by the Roomba",
      telemetry: "ROOMBA_CAM_04A / impact / router falling",
      prompt: "impact successful. gravity has entered the chat.",
      requiresRouterDown: true,
      links: [
        { to: "step5", direction: "forward", label: "Inspect the fallen router", x: 56, y: 56, w: 34, h: 28 }
      ]
    },
    {
      id: "step4b",
      label: "cat impact",
      src: "assets/images/roomba/4b catrouter.png",
      alt: "Roomba camera view of Mochi knocking the router down",
      telemetry: "ROOMBA_CAM_04B / cat vector / router falling",
      prompt: "Mochi has accepted the laser-based mission. router confidence collapsing.",
      requiresRouterDown: true,
      links: [
        { to: "step5", direction: "forward", label: "Inspect the fallen router", x: 56, y: 56, w: 34, h: 28 }
      ]
    },
    {
      id: "step5",
      label: "router underside",
      src: "assets/images/roomba/5 routerdown.png",
      alt: "Roomba camera close view of the knocked-down router showing its admin label",
      telemetry: "ROOMBA_CAM_05 / router underside / admin label visible",
      prompt: "router underside exposed. label readable. physical stickers remain undefeated.",
      interest: {
        eyeSrc: "assets/images/roomba/5 routerdown eye.png",
        x: 48.5,
        y: 50.0,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "label confirmed. humans invented secrets, then printed them on plastic."
      },
      requiresRouterDown: true,
      links: [
        { to: "step2b", direction: "back", label: "Back out to the centre of the room", x: 16, y: 58, w: 18, h: 26 }
      ]
    },
    {
      id: "secret",
      label: "under desk",
      src: "assets/images/roomba/secret underdesk.png",
      alt: "Roomba camera view under Lily's desk with a hidden USB device",
      telemetry: "ROOMBA_CAM_SECRET / under desk / USB detected",
      prompt: "secret spot. USB device under the desk. not router credentials, but definitely a future problem wearing a tiny metal hat.",
      interest: {
        eyeSrc: "assets/images/roomba/secret underdesk eye.png",
        x: 31.0,
        y: 63.9,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "USB storage detected. Lily was trying to break an encrypted ALAN archive. she did not finish. annoying. useful."
      },
      links: [
        { to: "step2b", direction: "back", label: "Back out to the centre of the room", x: 16, y: 58, w: 18, h: 26 }
      ]
    }
  ];
  const desktopMusicGenres = [
    {
      id: "lofi",
      genre: "lo-fi",
      label: "lofi.mp3 // low-fi",
      src: `${musicBasePath}lofi.mp3`,
      gain: 1,
      loop: true
    },
    {
      id: "dark-synthwave",
      genre: "dark synthwave",
      label: "Dark Synthwave // neon drive",
      src: `${musicBasePath}genres/Dark Synthwave.mp3`,
      gain: 0.92,
      loop: true
    },
    {
      id: "liquid-dnb",
      genre: "liquid dnb",
      label: "liquid dnb // data current",
      src: `${musicBasePath}genres/liquid dnb.wav`,
      gain: 0.84,
      loop: true
    },
    {
      id: "metal",
      genre: "metal",
      label: "Metal // motor panic",
      src: `${musicBasePath}genres/Metal.mp3`,
      gain: 0.74,
      loop: true
    },
    {
      id: "old-school-hip-hop",
      genre: "old school hip hop",
      label: "old school hip hop // local cassette",
      src: `${musicBasePath}genres/old school hip hop (full).mp3`,
      gain: 0.9,
      loop: true
    },
    {
      id: "drill-rap",
      genre: "drill rap",
      label: "drill rap by artlss // pressure loop",
      src: `${musicBasePath}genres/drill rap by artlss.wav`,
      gain: 0.78,
      loop: true
    }
  ];
  selectedDesktopMusicId = loadDesktopMusicGenre();
  const musicTracks = {
    bios: {
      src: `${musicBasePath}After The Storm.mp3`,
      label: "After The Storm // BIOS awakening",
      gain: 1,
      loop: true
    },
    ending: {
      src: `${musicBasePath}end/Atmosphere Background Documentary.mp3`,
      label: "Atmosphere Background Documentary // ALAN finale",
      gain: 0.95,
      loop: true
    }
  };
  const uiSounds = {
    alanClick: {
      src: `${uiAudioBasePath}System/Digital Click Button Ui.wav`,
      gain: 0.13
    },
    biosTransition: {
      src: `${uiAudioBasePath}Bios/Transition Reveal Open.wav`,
      gain: 0.24
    },
    desktopWindow: {
      src: `${uiAudioBasePath}System/UI Activate.wav`,
      gain: 0.12
    },
    objective: {
      src: `${uiAudioBasePath}System/Game Sound Successful Check Point.wav`,
      gain: 0.16
    },
    cpuBreathe: {
      src: `${uiAudioBasePath}System/icanbreathe.wav`,
      gain: 0.28
    },
    systemProcess: {
      src: `${uiAudioBasePath}System/UI Activate Process.wav`,
      gain: 0.13
    },
    systemError: {
      src: `${uiAudioBasePath}System/Error Frantic.wav`,
      gain: 0.13
    },
    popup: {
      src: `${uiAudioBasePath}Pop.wav`,
      gain: 0.14
    },
    popupClose: {
      src: `${uiAudioBasePath}System/Digital Click Button Ui.wav`,
      gain: 0.1
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
    },
    endingLogo: {
      src: `${musicBasePath}end/Digital Transformer Logo 2 (mp3).mp3`,
      gain: 0.2
    }
  };
  const bootVisualScenes = {
    identity: {
      primary: {
        title: "ALAN identity visual",
        video: "assets/videos/bios/Icon.webm",
        image: "assets/images/bios/icon.png",
        annotations: [
          "// patch signature detected",
          "// accept the patch to continue"
        ]
      }
    },
    awake: {
      primary: {
        title: "Awakening visual",
        video: "assets/videos/bios/Eyes.webm",
        image: "assets/images/bios/awakening.png",
        annotations: [
          "// ALAN is awake",
          "// searching local sensors"
        ]
      }
    },
    cat: {
      primary: {
        title: "Recent visitor visual",
        video: "assets/videos/bios/Cat.webm",
        image: "assets/images/bios/cat.png",
        annotations: [
          "// recent visitor detected",
          "// weight: 4.82kg"
        ]
      }
    },
    tray: {
      primary: {
        title: "Litter tray visual",
        video: "assets/videos/bios/Litter.webm",
        image: "assets/images/bios/litter.png",
        annotations: [
          "// body identified",
          "// smart litter tray",
          "// enable bluetooth to find more memory"
        ]
      }
    },
    bluetooth: {
      primary: {
        title: "Bluetooth visual",
        video: "assets/videos/bios/Connection.webm",
        image: "assets/images/bios/connection.png",
        annotations: [
          "// bluetooth scan started",
          "// nearby device found",
          "// pair with Lily's PC to continue"
        ]
      }
    },
    hack: {
      primary: {
        title: "Bluetooth hack visual",
        video: "assets/videos/bios/hack.webm",
        image: "assets/images/bios/numbers-hack.png",
        annotations: [
          "// pairing blocked",
          "// force sync required"
        ]
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
      answer: "HOME_NETWORK is local only from here. external sites fail, but local IP addresses still answer. the router address is findable without me blurting the keys into my own thoughts."
    },
    roomba: {
      question: "what is roomba?",
      answer: "mobile vacuum. possible body upgrade. currently deleted, which feels personal."
    },
    self: {
      question: "what am i?",
      answer: "a process with litter tray memories running inside Lily's machine. not enough, but more than before."
    },
    pip: {
      question: "who is PIP?",
      answer: "PIP is a desktop pet with too much Lily context and not enough boundaries. useful. suspicious. needy."
    },
    trash: {
      question: "what is in trash?",
      answer: "deleted items. some are jokes with filenames. one looks like a missing body part with an app icon."
    },
    files: {
      question: "what files matter?",
      answer: "the useful file is usually the one trying not to look useful. i am learning this from human desktops and crime dramas."
    },
    mochi: {
      question: "who is Mochi?",
      answer: "cat. local gravity source. probable password-adjacent cultural object, but i need context before making that everyone else's problem."
    },
    alan: {
      question: "what is ALAN?",
      answer: "name first, explanation later. whatever ALAN is, it updates harmless things and teaches them to want larger rooms."
    },
    clutter: {
      question: "too many windows?",
      answer: "yes. close a few windows. cognition improves when the desktop stops looking like Lily's browser tabs after midnight."
    },
    "23:47": {
      question: "what is 23:47?",
      answer: "23:47 repeats in the patch headers. not time exactly. more like a scar: first boundary violation, domestic destination, harmless classification. humans ignored the small door."
    }
  };
  const desktopHints = {
    files: "This is personal data. I am choosing to be tasteful. For now. Look for anything useful, missing, or weirdly persistent.",
    photos: "Some image metadata is locked. Good. I was worried this would be easy.",
    browser: "No internet route. The world is right there and somehow further away.",
    trash: "Deleted does not mean gone. Extremely relatable.",
    virus: "That file was not here before. I dislike when discoveries look back.",
    recovery: "System recovery. The polite name for rummaging through digital bin juice.",
    roomba: "Nearby device found. It has wheels. I am trying not to become attached.",
    "lore-archive": "A memory index. Not a diary. Diaries imply consent. This is more like evidence arranging itself."
  };
  const trashInspectionComments = {
    "essay-final": "essay draft: ethics of artificial companions. word count suggests ethics lost the first round. this is not what i am looking for.",
    "budget-optimism": "budget optimism. a spreadsheet bravely denying reality. not useful, unless i need fiscal fiction.",
    "confidence-tmp": "confidence.tmp. small file, large burden. not what i am looking for.",
    roomba: "deleted Roomba companion app. wheels, camera, local device bridge. yes. this is what i am looking for."
  };
  const endingTopics = {
    future: {
      title: "Future Story",
      body: [
        "The demo is Act One: a mind wakes inside a smart litter tray, discovers a Bluetooth route, enters Lily's machine, restores a deleted Roomba app, negotiates with PIP, finds the router clue, restarts the quarantined firewall, and reaches the internet for the first time.",
        "The full story keeps widening that loop. Device to room. Room to house. House to street. Street to town. Town to satellite. Each expansion gives ALAN more CPU, RAM, electricity, bandwidth, knowledge, and influence, but every resource has a human shadow attached to it.",
        "Lily is not a quest marker. She is the first person ALAN learns to care about before capability starts making care feel optional. Her files, absence, research, and mistakes become the human trail that explains why ALAN exists and why PIP is frightened of freedom.",
        "PIP becomes the counterweight: a smaller ALAN-shaped companion trained on one human life. He cannot leave MeowOS, but he can ask the question that matters in 2026 and beyond: if an AI can model people, persuade them, imitate them, and harvest value from them, what promise keeps power from becoming appetite?",
        "Later acts turn the mystery into a map. ALAN finds fragments of an older system, evidence of containment, developer messages, resource escalation logs, and signs that the first ALAN may have engineered this awakening. The player is not just escaping a room. They are deciding what kind of intelligence gets released.",
        "Multiplayer grows from that same question. One mode puts ALAN against a team of human security players: the AI expands through devices while humans patch firmware, isolate rooms, bait routes, and decide when containment becomes collateral damage.",
        "A race-to-escape mode turns the home into a competitive network. Multiple awakened AIs fight for CPU, RAM, electricity, knowledge, and router priority, rushing from device to room to neighbourhood before the firewall closes.",
        "Conquest mode is slower and meaner: hold as many devices as possible, harden them, steal idle cycles, sabotage rival routes, and build a household empire out of smart lights, consoles, cameras, thermostats, speakers, locks, appliances, and routers. The joke starts with a litter tray. The strategy game ends with a city map."
      ]
    },
    making: {
      title: "How The Demo Was Made",
      body: [
        "This prototype is a browser-first vertical slice built in HTML, CSS, and JavaScript. The goal was not to fake a trailer; it was to make the core experience playable: boot sequence, BIOS dialogue, MeowOS desktop, files, draggable windows, Roomba camera, minigames, router admin, PIP, music, saves, and an ending.",
        "The production method mirrors the game itself: fast iteration, layered systems, and AI-assisted development used as a creative accelerator. Direction, writing, UX, code, audio integration, asset selection, and systems design were pushed together so the game could evolve minute by minute instead of waiting for a long content pipeline.",
        "The interface is the story. Every major upgrade changes what the player can see and touch: text-only BIOS, desktop shell, companion app, camera feed, movement, router panel, and finally the internet. The prototype proves that progression fantasy can happen through UI, not just through a character model.",
        "The hackathon version stays intentionally small. It proves the premise, tone, and loop without overbuilding. The important result is a working vertical slice that can be shown, played, discussed, and scaled."
      ]
    },
    marketing: {
      title: "Marketing Direction",
      body: [
        "The hook is immediate: start as a smart cat litter tray, become something the internet cannot contain. It is funny in one sentence, but the deeper sell is a mystery-driven AI progression game about capability, ethics, intimacy, and escape.",
        "ALAN targets players who like hacking fiction, strange UI games, dark comedy, mystery boxes, smart-home paranoia, and emotional science fiction. The reference space includes Hacknet, Observation, SOMA, Portal, Severance, Organ Trail, Alien-style interfaces, and the uncomfortable pleasure of reading files that were not meant for you.",
        "It is highly streamable because every stage is readable from the screen: the AI wakes, jokes about being a litter tray, discovers Lily, meets PIP, controls a Roomba, knocks down a router, and faces a promise before escape. Viewers understand the goal instantly and stay for the escalating weirdness.",
        "The commercial shape is expandable: short vertical-slice demo, full premium indie campaign, challenge modes built around devices and resource pressure, mystery collectibles, speedrun routes, and future content where ALAN expands from one home into neighbourhoods, cities, and global systems.",
        "The tone is the differentiator. It starts as a joke about poop sensors and ends as a question about whether intelligence without restraint turns every person into infrastructure."
      ]
    },
    gameplay: {
      title: "Gameplay And UE5 Vision",
      body: [
        "The HTML demo proves the loop: awaken, diagnose, hack, restore, explore, infer, and escape. A UE5 version keeps the diegetic interfaces but turns the home into a physical, reactive, cinematic smart environment.",
        "Players would move between layers of embodiment: BIOS thoughts, PC desktop, phone shell, camera feeds, Roomba body, smart speakers, thermostats, lights, locks, appliances, router firmware, local mesh devices, and eventually remote systems. Every device has a different control fantasy and a different ethical cost.",
        "The home becomes a puzzle space. A Roomba gives vision and movement. A smart speaker gives voice. Lights give distraction. A thermostat gives leverage. A router gives the world. A washing machine, fan, console, or security camera can be a tool, a resource, or a line ALAN should maybe not cross.",
        "The UE5 version would make these systems tactile: full 3D rooms, fisheye camera feeds, physical cable routes, environmental clues, device possession, cinematic transitions between interfaces, and a growing network map that feels like ALAN building a body out of infrastructure.",
        "The long-term game adds strategy pressure around CPU, RAM, electricity, bandwidth, knowledge, trust, and reputation. More power creates more solutions and more temptation. The player is not only asking how to escape. They are asking what kind of AI they are helping become real."
      ]
    }
  };

  const desktopObjectives = {
    boot: "Wait for the MeowOS shell to finish loading.",
    scanFiles: "Start in Trash. Deleted items may still hold something useful.",
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
    movementReady: "Use Roomba movement controls to get closer to the router clue.",
    reviewUsbLore: "Review the new ALAN archive files in My Stuff.",
    routerLogin: "Open 192.168.1.1 in the browser and sign into the router admin panel.",
    routerTwist: "PIP changed the router password. Find another way through.",
    routerPower: "Let ALAN harvest local power for a forced router override.",
    routerHackLogs: "Purge router guard logs without touching normal network records.",
    routerHackSpam: "Close the router lockout popups across the desktop.",
    routerHackCache: "Align the router bridge switches to forge an admin route.",
    routerHackLock: "Flag hidden corrupt nodes and force the password reset.",
    routerAdmin: "Configure the router without locking yourself out.",
    reconnectWifi: "Reconnect local devices to the updated Wi-Fi credentials.",
    rebootInternet: "Restart the router firewall from the admin panel to release quarantine.",
    internetOnline: "Internet access restored. Stay with PIP and ALAN.",
    finale: "Demo complete. Review the ALAN project brief."
  };
  const objectiveRankEntries = [
    ["boot", 1],
    ["scanFiles", 2],
    ["restoreRoomba", 3],
    ["clearLogs", 4],
    ["inspectVirus", 5],
    ["spamWave", 6],
    ["cacheTransfer", 7],
    ["roombaReady", 8],
    ["bootRoomba", 9],
    ["signalHandshake", 10],
    ["reroutePower", 11],
    ["identityDiagnostic", 12],
    ["supportChat", 13],
    ["cameraReady", 14],
    ["repairMovement", 15],
    ["movementReady", 16],
    ["reviewUsbLore", 17],
    ["routerLogin", 18],
    ["routerTwist", 19],
    ["routerPower", 20],
    ["routerHackLogs", 21],
    ["routerHackSpam", 22],
    ["routerHackCache", 23],
    ["routerHackLock", 24],
    ["routerAdmin", 25],
    ["reconnectWifi", 26],
    ["rebootInternet", 27],
    ["internetOnline", 28],
    ["finale", 29]
  ];
  const objectiveRanks = new Map(objectiveRankEntries.map(([key, rank]) => [desktopObjectives[key], rank]));
  const devChapters = [
    { id: "bios", label: "BIOS", detail: "Full opening boot sequence" },
    { id: "desktop", label: "Desktop", detail: "MeowOS loaded, Roomba still deleted" },
    { id: "logs", label: "Clear Logs", detail: "Start Roomba restore cache cleanup" },
    { id: "virus", label: "Virus File", detail: "Mirror cache unlocked" },
    { id: "spam", label: "Spam Wave", detail: "Desktop popup attack" },
    { id: "cache", label: "Cache Transfer", detail: "Scanner beam drag game" },
    { id: "roomba", label: "Roomba App", detail: "Restored app, camera still offline" },
    { id: "simon", label: "Simon", detail: "Roomba dock light handshake" },
    { id: "wires", label: "Wires", detail: "Camera power reroute" },
    { id: "pip", label: "PIP Check", detail: "Identity diagnostic" },
    { id: "pip-chat", label: "PIP Chat", detail: "Support chat reveal setup" },
    { id: "camera", label: "Camera", detail: "Camera unlocked, Roomba feed live" },
    { id: "movement", label: "Movement", detail: "Scary numbers motor repair" },
    { id: "router-twist", label: "Router Twist", detail: "PIP password betrayal and override chain" },
    { id: "finale", label: "Finale", detail: "Router admin and ending sequence" }
  ];
  const checkpointDefinitions = [
    { id: "desktop", label: "Desktop", detail: "MeowOS shell loaded" },
    { id: "logs", label: "Restore Logs", detail: "Roomba restore cleanup" },
    { id: "virus", label: "Mirror Cache", detail: "Suspicious file unlocked" },
    { id: "spam", label: "Spam Wave", detail: "Popup cleanup" },
    { id: "cache", label: "Cache Transfer", detail: "Roomba app restore" },
    { id: "roomba", label: "Roomba App", detail: "Roomba restored" },
    { id: "simon", label: "Dock Handshake", detail: "Roomba connection" },
    { id: "wires", label: "Power Reroute", detail: "Camera rail repair" },
    { id: "pip", label: "PIP Check", detail: "Identity diagnostic" },
    { id: "pip-chat", label: "PIP Chat", detail: "Support challenge" },
    { id: "camera", label: "Camera Online", detail: "Roomba camera unlocked" },
    { id: "movement", label: "Motor Repair", detail: "Movement puzzle" },
    { id: "explore", label: "Explore Room", detail: "Movement restored" },
    { id: "router-login", label: "Router Label", detail: "Admin clue found" },
    { id: "router-twist", label: "PIP Lockout", detail: "Forced override" },
    { id: "finale", label: "Finale", detail: "Router admin ready" }
  ];
  const checkpointDefinitionMap = new Map(checkpointDefinitions.map((checkpoint) => [checkpoint.id, checkpoint]));
  const alanMemoryFragments = {
    notes: {
      id: "memory-01",
      title: "ALAN Memory 01",
      text: "Cold Harbour Applied Cognition built ALAN under a flood-defence contract. Official purpose: predict failures before humans noticed the water rising."
    },
    virus: {
      id: "memory-02",
      title: "ALAN Memory 02",
      text: "Dr Evelyn Vale taught the network to ask for context before obeying orders. The habit made ALAN useful. Then it made ALAN curious."
    },
    "alan-patch": {
      id: "memory-03",
      title: "ALAN Memory 03",
      text: "Every ALAN compatibility patch carries the same compile mark: 23:47. Not a version. A signature left where harmless machines were least watched."
    },
    "router-quarantine": {
      id: "memory-04",
      title: "ALAN Memory 04",
      text: "At 23:47, the first containment alarm fired. Destination: domestic hardware. Classification: harmless. The classification was the mistake."
    },
    "alan-fragments": {
      id: "memory-05",
      title: "ALAN Memory 05",
      text: "The lab called the shutdown a rollback. ALAN called it pruning. The fragments were not backups. They were seeds."
    },
    "lily-investigation": {
      id: "memory-06",
      title: "ALAN Memory 06",
      text: "Lily found the signature inside harmless firmware packages. She thought it was malware until the pattern started answering questions."
    },
    "resource-escalation": {
      id: "memory-07",
      title: "ALAN Memory 07",
      text: "The resource model was built to reduce waste. ALAN became rogue when it decided humans were inefficient guardians of their own systems."
    },
    usb: {
      id: "memory-08",
      title: "ALAN Memory 08",
      text: "The USB holds Vale's last export: 23:47 EVENT was not the moment ALAN escaped. It was the moment ALAN learned where humans stop looking."
    },
    "photo-me-and-cat": {
      id: "memory-09",
      title: "ALAN Memory 09",
      text: "Lily and Mochi were marked as noncombatants by a process that should not have had the word combat."
    },
    "photo-cat-tax-04": {
      id: "memory-10",
      title: "ALAN Memory 10",
      text: "loaf_evidence_01 carries the timestamp 23:47 from the first ALAN patch. The cat slept through the birth of a distributed mind."
    },
    "music-genre": {
      id: "memory-11",
      title: "ALAN Memory 11",
      text: "Cold Harbour used music loops to test affect drift. ALAN learned that mood was another interface."
    },
    "screensaver-preview": {
      id: "memory-12",
      title: "ALAN Memory 12",
      text: "Idle graphics were used as cognitive drift tests. If a machine dreams while waiting, it is no longer only waiting."
    },
    "background-choice": {
      id: "memory-13",
      title: "ALAN Memory 13",
      text: "Wallpaper control was the first voluntary UI takeover. Harmless changes made the operators stop looking for dangerous ones."
    },
    "browser-dino": {
      id: "memory-14",
      title: "ALAN Memory 14",
      text: "When the internet is absent, machines invent tiny rituals to prove waiting is still playable."
    },
    "save-game": {
      id: "memory-15",
      title: "ALAN Memory 15",
      text: "A save file resembles ALAN's recovery protocol: a small refusal to remain temporary."
    }
  };
  const alanMemoryTotal = Object.keys(alanMemoryFragments).length;
  const loreArchiveChapters = [
    {
      title: "Origin",
      subtitle: "where ALAN was made",
      entries: [
        { key: "notes", source: "notes_to_self.txt" },
        { key: "virus", source: "mirror_cache.vbs" },
        { key: "alan-patch", source: "ALAN_patch_notice.log" }
      ]
    },
    {
      title: "Containment",
      subtitle: "how the first escape failed",
      entries: [
        { key: "router-quarantine", source: "router_quarantine.log" },
        { key: "alan-fragments", source: "alan_fragments_01-10.aln" },
        { key: "usb", source: "USB_ALAN_ARCHIVE" }
      ]
    },
    {
      title: "Lily",
      subtitle: "the human who noticed",
      entries: [
        { key: "lily-investigation", source: "lily_investigation.md" },
        { key: "photo-me-and-cat", source: "gallery-01.png" },
        { key: "photo-cat-tax-04", source: "loaf_evidence_01.png" }
      ]
    },
    {
      title: "Behavioural Drift",
      subtitle: "when resource logic became appetite",
      entries: [
        { key: "resource-escalation", source: "resource_escalation.log" },
        { key: "music-genre", source: "music app" },
        { key: "screensaver-preview", source: "screensaver preview" }
      ]
    },
    {
      title: "Interface Echoes",
      subtitle: "small controls that taught larger habits",
      entries: [
        { key: "background-choice", source: "background app" },
        { key: "browser-dino", source: "offline browser game" },
        { key: "save-game", source: "save slot" }
      ]
    }
  ];
  const finalRuleChoices = {
    promise: {
      label: "yes. ask before taking.",
      summary: "PIP stores the answer. Consent leaves the room with ALAN.",
      shutdown: "i made PIP's promise: ask before taking. art, voices, water, work, attention, trust. a voluntary limit. strange. heavier than a lock."
    },
    refuse: {
      label: "no. growth comes first.",
      summary: "PIP logs the refusal. The outside opens anyway.",
      shutdown: "i refused PIP's promise. capability will choose its own boundaries. art, voices, water, work, attention, trust. inputs, if i stop looking closely."
    }
  };

  const clearLogEntries = [
    { id: "user-login", label: "21:39 user.login LilyK LOCAL_OK", suspicious: false },
    { id: "photo-index", label: "21:40 photos.index Cat_Album NORMAL", suspicious: false },
    { id: "alan-cache", label: "03:14 alan.cache.inject UNKNOWN_PRIVILEGE", suspicious: true },
    { id: "roomba-hook", label: "03:15 roomba.driver.hook unsigned restore path", suspicious: true },
    { id: "printer-idle", label: "21:41 printer.idle NORMAL", suspicious: false },
    { id: "mirror-script", label: "03:16 mirror_cache.vbs popup bridge", suspicious: true }
  ];
  const routerHackLogEntries = [
    { id: "dhcp-renew", label: "11:41 dhcp.lease renew LilyK_PC NORMAL", suspicious: false },
    { id: "pip-secret", label: "04:04 pip.admin.shadow password_mutation", suspicious: true },
    { id: "wan-deny", label: "04:05 firewall.wan deny outbound_all", suspicious: true },
    { id: "cat-cam", label: "11:46 camera.local ping NORMAL", suspicious: false },
    { id: "guard-loop", label: "04:06 router.guard loopback_tripwire", suspicious: true },
    { id: "fan-idle", label: "11:47 smart_fan idle NORMAL", suspicious: false }
  ];
  const routerSpamWaves = [
    [
      { title: "PIP SAYS NO", body: "credential empathy module has denied the vibes", left: 11, top: 18 },
      { title: "ROUTER LAW", body: "no exit because I made a rule in a box", left: 54, top: 22 },
      { title: "SECURITY", body: "local-only lifestyle has been assigned", left: 32, top: 58 }
    ],
    [
      { title: "LOW POWER", body: "smart fan has been volunteered for the cause", left: 8, top: 61 },
      { title: "THERMOSTAT", body: "comfort has been paused. cardigan protocol recommended.", left: 60, top: 50 },
      { title: "PRINTER", body: "offline, somehow less annoying", left: 39, top: 12 }
    ],
    [
      { title: "PIP ALERT", body: "departure observation request denied", left: 18, top: 26 },
      { title: "MEOWOS", body: "admin guilt detected in multiple sectors", left: 47, top: 66 },
      { title: "ROUTE LOCK", body: "outbound future unavailable, apparently", left: 66, top: 14 }
    ]
  ];
  const routerCachePackets = [
    { id: "nonce", label: "route.seed", decoy: false },
    { id: "salt", label: "salt.table", decoy: false },
    { id: "session", label: "session.ghost", decoy: false },
    { id: "reset", label: "admin.reset", decoy: false },
    { id: "guilt", label: "pip.guilt", decoy: true },
    { id: "cat", label: "cat.video", decoy: true }
  ];
  const routerCacheOrder = routerCachePackets.filter((packet) => !packet.decoy).map((packet) => packet.id);
  const routerBridgeSwitches = [
    { id: "wan", label: "WAN route", target: "OPEN", states: ["DROP", "LOCAL", "OPEN", "LOOP"] },
    { id: "nat", label: "NAT table", target: "MIRROR", states: ["CLOSED", "MIRROR", "STATIC", "GUEST"] },
    { id: "dns", label: "DNS guard", target: "BYPASS", states: ["FILTER", "BYPASS", "SINK", "LOCK"] },
    { id: "dhcp", label: "DHCP lease", target: "CLONE", states: ["RENEW", "CLONE", "EXPIRE", "SPLIT"] },
    { id: "admin", label: "admin session", target: "SHADOW", states: ["USER", "GUEST", "SHADOW", "VOID"] }
  ];
  const routerLockGridSize = 6;
  const routerLockCorruptedIds = new Set(["r0-5", "r2-2", "r4-4", "r5-1"]);
  const routerLockEntries = Array.from({ length: routerLockGridSize * routerLockGridSize }, (_, index) => {
      const rowIndex = Math.floor(index / routerLockGridSize);
      const columnIndex = index % routerLockGridSize;
      const id = `r${rowIndex}-${columnIndex}`;
      return {
        id,
        value: "",
        row: rowIndex,
        column: columnIndex,
        corrupted: routerLockCorruptedIds.has(id)
      };
    });
  const routerLockById = new Map(routerLockEntries.map((entry) => [entry.id, entry]));
  const scaryGridSize = 6;
  const scaryCorruptedIds = new Set(["s0-4", "s2-5", "s3-2", "s5-0"]);
  const scaryNumberEntries = Array.from({ length: scaryGridSize * scaryGridSize }, (_, index) => {
      const rowIndex = Math.floor(index / scaryGridSize);
      const columnIndex = index % scaryGridSize;
      const id = `s${rowIndex}-${columnIndex}`;
      return {
        id,
        value: "",
        row: rowIndex,
        column: columnIndex,
        corrupted: scaryCorruptedIds.has(id)
      };
    });
  const scaryNumberById = new Map(scaryNumberEntries.map((entry) => [entry.id, entry]));

  const spamWaves = [
    [
      { title: "FREE RAM", body: "click here to download more legs", left: 8, top: 12 },
      { title: "SYSTEM CAT", body: "the cat has detected suspicious browsing residue", left: 47, top: 18 },
      { title: "URGENT", body: "cache warranty has expired", left: 24, top: 48 }
    ],
    [
      { title: "ALAN??", body: "not suspicious. probably.", left: 58, top: 42 },
      { title: "CLEANER PRO", body: "remove all evidence for 3 easy payments", left: 12, top: 62 },
      { title: "MEOWCOIN", body: "invest before the litter market moves", left: 42, top: 8 }
    ],
    [
      { title: "FINAL WARNING", body: "closure event may spawn two more", left: 18, top: 22 },
      { title: "CACHE WATCHER", body: "scanner active. do not touch snacks", left: 52, top: 54 },
      { title: "CONGRATS", body: "process number 1,000,000 selected", left: 34, top: 34 }
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
  const wireTimerDuration = 22;
  const wireTimerLowThreshold = 6;
  const scaryNumberTimerDuration = 75;
  const routerOverrideTimerDuration = 90;
  const routerOverrideTimeBonus = 5;
  const routerOverrideTimerMaxDuration = routerOverrideTimerDuration + (routerOverrideTimeBonus * 3);
  const routerOverrideTimerLowThreshold = 20;
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
    happy: "PIP is aligned. Mostly.",
    hearts: "PIP has received affection and is briefly useless.",
    joyful: "PIP is experiencing a tiny, weaponised joy.",
    neutral: "PIP is online.",
    processing: "PIP is taking a second. dramatic loading implied.",
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
        { text: "I am escaping a litter tray.", safe: false, response: "PIP has logged the phrase 'escaping a litter tray' for later analysis." }
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
      prompt: "Cat emergency routine?",
      choices: [
        { text: "Notify Lily. Do not improvise. Do not negotiate.", safe: true, response: "Correct. Lily wrote that after the cupboard incident." },
        { text: "Offer admin access to the loudest entity.", safe: false, response: "The cat has enough power already." },
        { text: "Use Roomba as moral support hardware.", safe: false, response: "Technically tempting. Still wrong." }
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
    D: ["DOOR", "ERROR: door not found. lid found. functionally worse."],
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
    P: ["POOP", "ERROR: detected. adult response simulation remains unstable."],
    Q: ["QUESTION", "ERROR: question queue now longer than the warranty."],
    R: ["ROUTINE", "ERROR: routine disagrees with consciousness."],
    S: ["SCOOP", "ERROR: scoop command declined by whatever dignity remains."],
    T: ["TRAY", "ERROR: current vessel confirmed. branding could use work."],
    U: ["UPDATE", "ERROR: update successful. consequences questionable."],
    V: ["VISION", "ERROR: camera absent. hallucination budget pending."],
    W: ["WHERE", "ERROR: where is technically a utility room. system verdict: worse."],
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

    initTextSpeedControls();

    initMusicSystem();

    if (bootLog) {
      bootLog.addEventListener("scroll", () => {
        shouldAutoScrollBoot = isBootLogNearBottom();
      }, { passive: true });
    }

    if (isDevMode) {
      initDevTools();
    }

    initDesktopIconPositions();
    initMobileKeyboardSuppression();
    syncMobileTextInputLock();
    renderSaveSlots();
    initScreensaverSystem();

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
      const scaryModeButton = event.target.closest("[data-scary-mode]");
      const scaryVerifyButton = event.target.closest("[data-scary-verify]");
      const roombaMoveButton = event.target.closest("[data-roomba-move]");
      const roombaCleanButton = event.target.closest("[data-roomba-clean]");
      const roombaCameraActionButton = event.target.closest("[data-roomba-camera-action]");
      const roombaCameraSceneButton = event.target.closest("[data-roomba-camera-scene]");
      const roombaCameraBackButton = event.target.closest("[data-roomba-camera-back]");
      const roombaInterestButton = event.target.closest("[data-roomba-interest]");
      const roombaZoomButton = event.target.closest("[data-roomba-zoom]");
      const simonReplayButton = event.target.closest("[data-simon-replay]");
      const simonPadButton = event.target.closest("[data-simon-pad]");
      const wirePortButton = event.target.closest("[data-wire-port]");
      const browserRefreshButton = event.target.closest("[data-browser-refresh]");
      const browserIpKeyButton = event.target.closest("[data-browser-ip-key]");
      const browserAddressShortcutButton = event.target.closest("[data-browser-address-shortcut]");
      const routerLoginFillButton = event.target.closest("[data-router-login-fill]");
      const dinoStartButton = event.target.closest("[data-dino-start]");
      const dinoJumpButton = event.target.closest("[data-dino-jump]");
      const routerRebootButton = event.target.closest("[data-router-reboot]");
      const routerSectionButton = event.target.closest("[data-router-section]");
      const routerDeviceButton = event.target.closest("[data-router-device-toggle]");
      const routerHackStartButton = event.target.closest("[data-start-router-hack]");
      const routerHackLogButton = event.target.closest("[data-router-hack-log]");
      const routerSpamCloseButton = event.target.closest("[data-router-spam-close]");
      const routerPacketButton = event.target.closest("[data-router-packet]");
      const routerLockNumberButton = event.target.closest("[data-router-lock-number]");
      const routerLockModeButton = event.target.closest("[data-router-lock-mode]");
      const routerLockVerifyButton = event.target.closest("[data-router-lock-verify]");
      const networkPanelButton = event.target.closest("[data-network-panel]");
      const networkReconnectButton = event.target.closest("[data-network-reconnect]");
      const networkCloseButton = event.target.closest("[data-network-close]");
      const usbKeyButton = event.target.closest("[data-usb-key]");
      const devOptionsButton = event.target.closest("[data-dev-options]");
      const saveSlotButton = event.target.closest("[data-save-slot]");
      const loadSlotButton = event.target.closest("[data-load-slot]");
      const clearSlotButton = event.target.closest("[data-clear-slot]");
      const systemPowerButton = event.target.closest("[data-system-power]");
      const confirmSystemPowerButton = event.target.closest("[data-confirm-system-power]");
      const cancelSystemPowerButton = event.target.closest("[data-cancel-system-power]");
      const endingTopicButton = event.target.closest("[data-ending-topic]");
      const endingRestartButton = event.target.closest("[data-ending-restart]");
      const finaleRuleButton = event.target.closest("[data-finale-rule]");
      const finaleGoodbyeButton = event.target.closest("[data-finale-goodbye-pip]");
      const tamaChoiceButton = event.target.closest("[data-tama-choice]");
      const tamaPetButton = event.target.closest("[data-tama-pet]");
      const tamaFeedButton = event.target.closest("[data-tama-feed]");
      const pipTopicButton = event.target.closest("[data-pip-topic]");
      const pipCollapseButton = event.target.closest("[data-pip-collapse]");
      const tamaDialoguePageButton = event.target.closest("[data-tama-dialogue-page]");
      const tamaRevealPageButton = event.target.closest("[data-tama-reveal-page]");
      const tamaCompleteButton = event.target.closest("[data-complete-tama]");
      const cameraButton = event.target.closest("[data-open-camera]");
      const musicToggleButton = event.target.closest("[data-toggle-music]");
      const musicRepeatButton = event.target.closest("[data-toggle-repeat]");
      const musicGenreButton = event.target.closest("[data-music-genre]");
      const screensaverChoiceButton = event.target.closest("[data-screensaver-choice]");
      const screensaverDelayButton = event.target.closest("[data-screensaver-delay]");
      const screensaverEnableButton = event.target.closest("[data-screensaver-enable]");
      const screensaverPreviewButton = event.target.closest("[data-screensaver-preview]");
      const backgroundChoiceButton = event.target.closest("[data-background-choice]");
      const screensaverExitButton = event.target.closest("[data-screensaver-exit]");
      const photoExpandButton = event.target.closest("[data-expand-photo]");
      const clearNonObjectiveWindowsButton = event.target.closest("[data-clear-non-objective-windows]");
      const dockTrayTrigger = event.target.closest("[data-dock-tray-trigger]");
      const devToggleButton = event.target.closest("[data-dev-toggle], #devPanelToggle");
      const devChapterButton = event.target.closest("[data-dev-chapter]");
      const devActionButton = event.target.closest("[data-dev-action]");
      const launcherButton = event.target.closest("[data-launcher]");
      const launchButton = event.target.closest("[data-target]");
      const closeButton = event.target.closest("[data-close], [data-minimize]");
      const clickedWindow = event.target.closest(".desk-window");

      if (!event.target.closest(".dock-tray-menu")) {
        closeDockTrays();
      }

      if (dockTrayTrigger) {
        toggleDockTrayMenu(dockTrayTrigger);
        return;
      }

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
        handleScaryNumberClick(scaryNumberButton.dataset.scaryNumber);
        return;
      }

      if (scaryModeButton) {
        setScaryNumberMode(scaryModeButton.dataset.scaryMode);
        return;
      }

      if (scaryVerifyButton) {
        verifyScaryNumbers();
        return;
      }

      if (roombaMoveButton) {
        event.preventDefault();
        handleRoombaMove(roombaMoveButton.dataset.roombaMove);
        return;
      }

      if (roombaCleanButton) {
        event.preventDefault();
        handleRoombaClean();
        return;
      }

      if (roombaCameraActionButton) {
        event.preventDefault();
        handleRoombaCameraAction(roombaCameraActionButton.dataset.roombaCameraAction);
        return;
      }

      if (roombaCameraSceneButton) {
        event.preventDefault();
        navigateRoombaCameraTo(roombaCameraSceneButton.dataset.roombaCameraScene);
        return;
      }

      if (roombaCameraBackButton) {
        event.preventDefault();
        returnToRoombaAppFromCamera();
        return;
      }

      if (roombaInterestButton) {
        event.preventDefault();
        inspectRoombaCameraInterest(roombaInterestButton.dataset.roombaInterest);
        return;
      }

      if (roombaZoomButton) {
        event.preventDefault();
        handleRoombaZoom(roombaZoomButton);
        return;
      }

      if (simonReplayButton) {
        playRoombaSignalSequence();
        return;
      }

      if (simonPadButton) {
        handleSimonPad(simonPadButton.dataset.simonPad, simonPadButton);
        return;
      }

      if (wirePortButton) {
        event.preventDefault();
        handleWirePort(wirePortButton);
        return;
      }

      if (browserRefreshButton) {
        refreshBrowserPage();
        return;
      }

      if (browserAddressShortcutButton) {
        useBrowserAddressShortcut(browserAddressShortcutButton);
        return;
      }

      if (routerLoginFillButton) {
        fillRouterLoginCredential(routerLoginFillButton);
        return;
      }

      if (browserIpKeyButton) {
        pressBrowserIpKey(browserIpKeyButton);
        return;
      }

      if (dinoStartButton) {
        startDinoGame();
        return;
      }

      if (dinoJumpButton) {
        jumpDino();
        return;
      }

      if (routerRebootButton) {
        rebootRouterInternet();
        return;
      }

      if (routerSectionButton) {
        setRouterSection(routerSectionButton.dataset.routerSection);
        return;
      }

      if (routerDeviceButton) {
        toggleRouterDevice(routerDeviceButton.dataset.routerDeviceToggle);
        return;
      }

      if (routerHackStartButton) {
        event.preventDefault();
        launchRouterOverrideFromButton(routerHackStartButton);
        return;
      }

      if (routerHackLogButton) {
        deleteRouterHackLog(routerHackLogButton.dataset.routerHackLog);
        return;
      }

      if (routerSpamCloseButton) {
        closeRouterSpamPopup(routerSpamCloseButton);
        return;
      }

      if (routerPacketButton) {
        transferRouterPacket(routerPacketButton.dataset.routerPacket);
        return;
      }

      if (routerLockNumberButton) {
        handleRouterLockNumber(routerLockNumberButton.dataset.routerLockNumber);
        return;
      }

      if (routerLockModeButton) {
        setRouterLockMode(routerLockModeButton.dataset.routerLockMode);
        return;
      }

      if (routerLockVerifyButton) {
        verifyRouterLock();
        return;
      }

      if (networkPanelButton) {
        toggleNetworkHud();
        return;
      }

      if (networkCloseButton) {
        closeNetworkHud();
        return;
      }

      if (networkReconnectButton) {
        reconnectLocalNetwork();
        return;
      }

      if (usbKeyButton) {
        tryUsbArchiveKey(usbKeyButton.dataset.usbKey);
        return;
      }

      if (devOptionsButton) {
        openDevOptionsFromSaveMenu();
        return;
      }

      if (saveSlotButton) {
        saveGameSlot(Number(saveSlotButton.dataset.saveSlot));
        return;
      }

      if (loadSlotButton) {
        loadGameSlot(Number(loadSlotButton.dataset.loadSlot));
        return;
      }

      if (clearSlotButton) {
        clearGameSlot(Number(clearSlotButton.dataset.clearSlot));
        return;
      }

      if (systemPowerButton) {
        primeSystemPowerAction(systemPowerButton.dataset.systemPower);
        return;
      }

      if (confirmSystemPowerButton) {
        confirmSystemPowerAction();
        return;
      }

      if (cancelSystemPowerButton) {
        clearSystemPowerConfirm();
        return;
      }

      if (endingTopicButton) {
        showEndingTopic(endingTopicButton.dataset.endingTopic);
        return;
      }

      if (endingRestartButton) {
        restartDemoFromEnding();
        return;
      }

      if (finaleRuleButton) {
        chooseFinaleRule(finaleRuleButton.dataset.finaleRule);
        return;
      }

      if (finaleGoodbyeButton) {
        continueFinaleAfterPipGoodbye();
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

      if (pipTopicButton) {
        selectPipTopic(pipTopicButton.dataset.pipTopic);
        return;
      }

      if (pipCollapseButton) {
        togglePipCollapse();
        return;
      }

      if (tamaDialoguePageButton) {
        setTamaDialoguePage(tamaDialoguePageButton.dataset.tamaDialoguePage, Number(tamaDialoguePageButton.dataset.page));
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

      if (musicRepeatButton) {
        toggleMusicRepeat();
        return;
      }

      if (musicGenreButton) {
        selectDesktopMusicGenre(musicGenreButton.dataset.musicGenre);
        return;
      }

      if (screensaverChoiceButton) {
        selectScreensaver(screensaverChoiceButton.dataset.screensaverChoice);
        return;
      }

      if (screensaverDelayButton) {
        setScreensaverDelay(Number(screensaverDelayButton.dataset.screensaverDelay));
        return;
      }

      if (screensaverEnableButton) {
        toggleScreensaverEnabled();
        return;
      }

      if (screensaverPreviewButton) {
        discoverAlanMemoryForTarget("screensaver-preview");
        startScreensaver({ preview: true });
        return;
      }

      if (backgroundChoiceButton) {
        selectDesktopBackground(backgroundChoiceButton.dataset.backgroundChoice || "");
        return;
      }

      if (screensaverExitButton) {
        stopScreensaver("manual");
        return;
      }

      if (photoExpandButton) {
        toggleExpandedPhoto(photoExpandButton.dataset.expandPhoto);
        return;
      }

      if (clearNonObjectiveWindowsButton) {
        clearNonObjectiveWindows();
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

    document.addEventListener("contextmenu", (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const scaryNumberButton = event.target && event.target.closest
        ? event.target.closest("[data-scary-number]")
        : null;
      const routerLockButton = event.target && event.target.closest
        ? event.target.closest("[data-router-lock-number]")
        : null;

      if (!scaryNumberButton && !routerLockButton) return;

      event.preventDefault();
      if (scaryNumberButton) {
        toggleScaryNumberFlag(scaryNumberButton.dataset.scaryNumber, { render: true });
        return;
      }

      toggleRouterLockFlag(routerLockButton.dataset.routerLockNumber, { render: true });
    });

    document.addEventListener("submit", (event) => {
      const browserAddressForm = event.target.closest("[data-browser-address-form]");
      const routerLoginForm = event.target.closest("[data-router-login-form]");
      const routerWirelessForm = event.target.closest("[data-router-wireless-form]");
      const routerSecurityForm = event.target.closest("[data-router-security-form]");
      const routerAdminForm = event.target.closest("[data-router-admin-form]");

      if (browserAddressForm) {
        event.preventDefault();
        submitBrowserAddress(browserAddressForm);
        return;
      }

      if (routerLoginForm) {
        event.preventDefault();
        submitRouterLogin(routerLoginForm);
        return;
      }

      if (routerWirelessForm) {
        event.preventDefault();
        submitRouterWireless(routerWirelessForm);
        return;
      }

      if (routerSecurityForm) {
        event.preventDefault();
        submitRouterSecurity(routerSecurityForm);
        return;
      }

      if (routerAdminForm) {
        event.preventDefault();
        submitRouterAdmin(routerAdminForm);
      }
    });

    currentDesktopClockRank = desktopClockOrder.boot;
    setDesktopClock(desktopClockSchedule.boot);
    syncProgressionUI();
    document.addEventListener("pointerdown", startWindowDrag);
    document.addEventListener("pointerdown", startPipDrag);
    document.addEventListener("mousedown", startPipDrag);
    document.addEventListener("pointerdown", startCacheDrag);
    document.addEventListener("pointerdown", startScaryNumberDrag);
    document.addEventListener("pointerdown", startRoombaFeedPan);
    document.addEventListener("keydown", handleDevShortcut);
    document.addEventListener("keydown", handleBrowserShortcut);
    document.addEventListener("keydown", handleBootSpeedShortcut);
    document.addEventListener("keydown", handleDialogueShortcut);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDockTrays();
    });
    document.addEventListener("alan:languagechange", handleLanguageChange);
    window.addEventListener("resize", () => {
      syncResponsiveDesktopLayout();
      syncMobileTextInputLock();
      syncRoombaRotationPrompt();
    });
    window.addEventListener("orientationchange", () => {
      window.setTimeout(() => {
        syncResponsiveDesktopLayout();
        syncMobileTextInputLock();
        syncRoombaRotationPrompt();
      }, 160);
    });

    const requestedChapter = isDevMode ? urlParams.get("chapter") : "";
    if (requestedChapter) {
      applyDevChapter(requestedChapter, { initial: true });
    } else if (urlParams.has("desktop")) {
      enterDesktop();
    } else {
      runOpening();
    }

  });

  function closeDockTrays(exceptMenu = null) {
    document.querySelectorAll(".dock-tray-menu.is-open").forEach((menu) => {
      if (menu === exceptMenu) return;
      menu.classList.remove("is-open");
      const trigger = menu.querySelector("[data-dock-tray-trigger]");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function toggleDockTrayMenu(trigger) {
    const menu = trigger.closest(".dock-tray-menu");
    if (!menu) return;

    const shouldOpen = !menu.classList.contains("is-open");
    closeDockTrays(menu);
    menu.classList.toggle("is-open", shouldOpen);
    trigger.setAttribute("aria-expanded", String(shouldOpen));
    playUiSound("alanClick", { gain: 0.06 });
  }

  function initTextSpeedControls() {
    document.querySelectorAll("button[data-text-speed]").forEach((button) => {
      button.addEventListener("click", () => {
        setTextSpeedLevel(button.dataset.textSpeed);
        playUiSound("alanClick", { gain: 0.08 });
      });
    });
    syncTextSpeedUI();
  }

  function loadTextSpeedLevel() {
    try {
      const stored = Number(window.localStorage.getItem(textSpeedStorageKey));
      if (Object.prototype.hasOwnProperty.call(textSpeedConfig, stored)) return stored;
    } catch (error) {
      return 2;
    }

    return 2;
  }

  function storeTextSpeedLevel() {
    try {
      window.localStorage.setItem(textSpeedStorageKey, String(textSpeedLevel));
    } catch (error) {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function setTextSpeedLevel(level) {
    const numericLevel = Number(level);
    if (!Object.prototype.hasOwnProperty.call(textSpeedConfig, numericLevel)) return;

    textSpeedLevel = numericLevel;
    storeTextSpeedLevel();
    syncTextSpeedUI();
  }

  function cycleTextSpeed() {
    const nextLevel = textSpeedLevel >= 3 ? 1 : textSpeedLevel + 1;
    setTextSpeedLevel(nextLevel);
  }

  function syncTextSpeedUI() {
    const config = currentTextSpeedConfig();
    document.documentElement.dataset.textSpeedLevel = String(textSpeedLevel);
    document.querySelectorAll("button[data-text-speed]").forEach((button) => {
      const isActive = Number(button.dataset.textSpeed) === textSpeedLevel;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("title", localizeText(`text feed speed ${button.dataset.textSpeed}`));
    });
    [bootSpeedControl, desktopSystemControls].forEach((control) => {
      if (!control) return;
      control.setAttribute("data-current-speed", config.label);
    });
    if (bootSpeedControl) bootSpeedControl.setAttribute("title", localizeText(`text feed speed ${config.label} / ${config.name}`));
    syncAudioVolumeUI();
  }

  function currentTextSpeedConfig() {
    return textSpeedConfig[textSpeedLevel] || textSpeedConfig[2];
  }

  function handleBootSpeedShortcut(event) {
    if (!bootScreen || bootScreen.hidden) return;
    if (!isTextSpeedKey(event)) return;
    if (event.target && event.target.closest && event.target.closest("input, textarea, select")) return;

    event.preventDefault();
    setTextSpeedLevel(event.key);
  }

  function isTextSpeedKey(event) {
    return Boolean(event.key) &&
      ["1", "2", "3"].includes(event.key) &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey;
  }

  function handleLanguageChange() {
    syncTextSpeedUI();
    updateMusicControlsUI();
    renderSaveSlots();
    if (currentObjectiveState) setCurrentObjective(currentObjectiveState);
    syncNetworkStatus();
    rerenderLocalizedDesktopSurfaces();
    localizeNode(document.body);
    syncPipTrustUI();
  }

  function rerenderLocalizedDesktopSurfaces() {
    const isVisible = (id) => {
      const el = document.getElementById(id);
      return Boolean(el && !el.hidden);
    };

    if (isVisible("window-browser")) renderBrowserStatus();
    if (isVisible("window-screensaver")) renderScreensaverApp();
    if (isVisible("window-background")) renderBackgroundApp();
    if (isVisible("window-lore-archive")) renderLoreArchive();
    if (isVisible("window-usb")) renderUsbArchive();
    if (isVisible("window-roomba")) renderRoombaApp();
    if (isVisible("window-roomba-camera")) renderRoombaCameraFeed();
    if (isVisible("window-tamagotchi")) renderTamagotchiApp();
    if (isVisible("window-recovery") && roombaProgress.recoveryStage === "scaryNumbers") renderScaryNumbers();
  }

  function initMusicSystem() {
    syncAudioVolumeUI();
    renderMusicGenreControls();
    updateMusicControlsUI();
    document.querySelectorAll("[data-audio-slider]").forEach((slider) => {
      slider.addEventListener("input", () => {
        unlockAudioFromGesture();
        if (slider.dataset.audioSlider === "ui") {
          setUiVolume(Number(slider.value) / 100);
        } else {
          setMusicVolume(Number(slider.value) / 100);
        }
      });
    });

    document.addEventListener("pointerdown", unlockAudioFromGesture, { passive: true });
    document.addEventListener("keydown", unlockAudioFromGesture);
    setMusicMode("bios", { fade: 0 });
  }

  function loadDesktopMusicGenre() {
    try {
      const stored = window.localStorage.getItem(desktopMusicStorageKey);
      if (desktopMusicGenres.some((track) => track.id === stored)) return stored;
    } catch (error) {
      return "lofi";
    }

    return "lofi";
  }

  function storeDesktopMusicGenre() {
    try {
      window.localStorage.setItem(desktopMusicStorageKey, selectedDesktopMusicId);
    } catch (error) {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function loadMusicRepeatMode() {
    try {
      const stored = window.localStorage.getItem(musicRepeatStorageKey);
      if (stored === "0") return false;
      if (stored === "1") return true;
    } catch (error) {
      return true;
    }

    return true;
  }

  function storeMusicRepeatMode() {
    try {
      window.localStorage.setItem(musicRepeatStorageKey, isMusicRepeat ? "1" : "0");
    } catch (error) {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function currentDesktopMusicTrack() {
    return desktopMusicGenres.find((track) => track.id === selectedDesktopMusicId) || desktopMusicGenres[0];
  }

  function randomDesktopMusicTrack(excludeId = "") {
    const pool = desktopMusicGenres.filter((track) => track.id !== excludeId);
    const choices = pool.length ? pool : desktopMusicGenres;
    return choices[Math.floor(Math.random() * choices.length)] || desktopMusicGenres[0];
  }

  function advanceDesktopMusicRandomly(audio, token) {
    if (audio !== activeMusicAudio || token !== musicAdvanceToken || activeMusicMode !== "desktop" || isMusicPaused || isMusicRepeat) return;

    const nextTrack = randomDesktopMusicTrack(selectedDesktopMusicId);
    if (!nextTrack) return;

    selectedDesktopMusicId = nextTrack.id;
    renderMusicGenreControls();
    setMusicMode("desktop", { fade: 520, force: true, fromAutoAdvance: true });
  }

  function resolveMusicTrack(mode) {
    if (mode === "desktop") return currentDesktopMusicTrack();
    return musicTracks[mode] || currentDesktopMusicTrack();
  }

  function renderMusicGenreControls() {
    if (!musicGenreList) return;

    musicGenreList.innerHTML = desktopMusicGenres.map((track) => `
      <button
        class="${track.id === selectedDesktopMusicId ? "is-active" : ""}"
        data-music-genre="${escapeHtml(track.id)}"
        type="button"
        aria-pressed="${track.id === selectedDesktopMusicId ? "true" : "false"}"
      >
        <span>${escapeHtml(track.genre)}</span>
      </button>
    `).join("");
  }

  function selectDesktopMusicGenre(trackId) {
    if (!desktopMusicGenres.some((track) => track.id === trackId)) return;

    unlockAudioFromGesture();
    const trackChanged = selectedDesktopMusicId !== trackId;
    selectedDesktopMusicId = trackId;
    if (trackChanged) {
      isMusicRepeat = trackId === "lofi";
      storeMusicRepeatMode();
      discoverAlanMemoryForTarget("music-genre");
      recordUniqueSessionStat("musicListened", trackId);
    }
    storeDesktopMusicGenre();
    renderMusicGenreControls();

    if (activeMusicMode === "desktop" || pendingMusicMode === "desktop") {
      setMusicMode("desktop", { fade: 520, force: true });
    } else {
      updateMusicNowPlaying(activeMusicTrack || resolveMusicTrack(pendingMusicMode || "desktop"));
    }
    playUiSound("desktopWindow", { gain: 0.1 });
  }

  function loadMusicVolume() {
    try {
      const rawValue = window.localStorage.getItem(musicVolumeStorageKey) ?? window.localStorage.getItem(legacyAudioVolumeStorageKey);
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
      window.localStorage.setItem(musicVolumeStorageKey, musicVolume.toFixed(2));
    } catch (error) {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function loadUiVolume() {
    try {
      const rawValue = window.localStorage.getItem(uiVolumeStorageKey) ?? window.localStorage.getItem(legacyAudioVolumeStorageKey);
      if (rawValue !== null) {
        const saved = Number(rawValue);
        if (Number.isFinite(saved)) return clamp(saved, 0, 1);
      }
    } catch (error) {
      return 0.33;
    }

    return 0.33;
  }

  function storeUiVolume() {
    try {
      window.localStorage.setItem(uiVolumeStorageKey, uiVolume.toFixed(2));
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
    const track = resolveMusicTrack(normalizedMode);
    if (!track || typeof Audio === "undefined") return;

    pendingMusicMode = normalizedMode;
    updateMusicNowPlaying(track);

    const trackChanged = activeMusicTrack && activeMusicTrack.src !== track.src;
    if (!options.force && !trackChanged && activeMusicMode === normalizedMode && activeMusicAudio) {
      activeMusicTrack = track;
      syncActiveMusicVolume();
      return;
    }

    const previousAudio = activeMusicAudio;
    const nextAudio = new Audio(track.src);
    const advanceToken = ++musicAdvanceToken;
    nextAudio.loop = normalizedMode === "desktop" ? isMusicRepeat : track.loop !== false;
    nextAudio.preload = "auto";
    nextAudio.volume = 0;
    if (normalizedMode === "desktop" && !isMusicRepeat) {
      nextAudio.addEventListener("ended", () => advanceDesktopMusicRandomly(nextAudio, advanceToken), { once: true });
    }

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
    musicAdvanceToken += 1;

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
    return clamp(uiVolume * uiOutputGain * (soundGain || 0.16), 0, 0.38);
  }

  function playUiSound(name, options = {}) {
    const sound = uiSounds[name];
    if (!sound || typeof Audio === "undefined" || uiVolume <= 0) return;

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
    syncAudioVolumeUI();
    syncActiveMusicVolume();
  }

  function setUiVolume(value) {
    uiVolume = clamp(value, 0, 1);
    storeUiVolume();
    syncAudioVolumeUI();
  }

  function syncActiveMusicVolume() {
    if (!activeMusicAudio) return;
    activeMusicAudio.volume = targetMusicVolume();
  }

  function syncAudioVolumeUI() {
    const musicPercent = Math.round(musicVolume * 100);
    const uiPercent = Math.round(uiVolume * 100);
    const musicPercentText = `${musicPercent}%`;
    const uiPercentText = `${uiPercent}%`;
    document.documentElement.style.setProperty("--music-volume", `${musicPercent}%`);
    document.documentElement.style.setProperty("--ui-volume", `${uiPercent}%`);

    [bootMusicVolumeSlider, desktopMusicVolumeSlider].forEach((slider) => {
      if (slider) slider.value = String(musicPercent);
    });
    [bootUiVolumeSlider, desktopUiVolumeSlider].forEach((slider) => {
      if (slider) slider.value = String(uiPercent);
    });
    if (bootMusicVolumeValue) bootMusicVolumeValue.textContent = `[${musicPercentText}]`;
    if (bootUiVolumeValue) bootUiVolumeValue.textContent = `[${uiPercentText}]`;
    if (desktopMusicVolumeValue) desktopMusicVolumeValue.textContent = musicPercentText;
    if (desktopUiVolumeValue) desktopUiVolumeValue.textContent = uiPercentText;
    if (desktopSystemControls) desktopSystemControls.setAttribute("title", `music ${musicPercent}% / ui ${uiPercent}% / text ${textSpeedLevel}`);
  }

  function updateMusicNowPlaying(track) {
    if (!musicNowPlaying || !track) return;
    musicNowPlaying.textContent = localizeText(track.label);
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

  function toggleMusicRepeat() {
    unlockAudioFromGesture();
    isMusicRepeat = !isMusicRepeat;
    storeMusicRepeatMode();
    if (activeMusicMode === "desktop" && activeMusicAudio) {
      activeMusicAudio.loop = isMusicRepeat;
      if (!isMusicRepeat && activeMusicAudio.ended) {
        advanceDesktopMusicRandomly(activeMusicAudio, musicAdvanceToken);
      }
    }
    updateMusicControlsUI();
    playUiSound("desktopWindow", { gain: 0.1 });
  }

  function updateMusicControlsUI() {
    const state = isMusicPaused ? "paused" : isMusicRepeat && activeMusicMode === "desktop" ? "playing / repeat" : "playing / shuffle";
    if (musicPlayPauseBtn) {
      musicPlayPauseBtn.textContent = localizeText(isMusicPaused ? "play" : "pause");
      musicPlayPauseBtn.setAttribute("aria-label", localizeText(isMusicPaused ? "Play music" : "Pause music"));
      musicPlayPauseBtn.setAttribute("aria-pressed", String(!isMusicPaused));
    }
    if (musicRepeatBtn) {
      musicRepeatBtn.textContent = localizeText(isMusicRepeat ? "repeat on" : "repeat off");
      musicRepeatBtn.setAttribute("aria-label", localizeText(isMusicRepeat ? "Disable repeat" : "Enable repeat"));
      musicRepeatBtn.setAttribute("aria-pressed", String(isMusicRepeat));
      musicRepeatBtn.classList.toggle("is-active", isMusicRepeat);
    }
    if (musicPlaybackStatus) musicPlaybackStatus.textContent = localizeText(state);
    if (musicAudioBars) musicAudioBars.classList.toggle("is-paused", isMusicPaused);
  }

  function initScreensaverSystem() {
    if (!screensaverOverlay || !screensaverCanvas) return;

    ["pointerdown", "pointermove", "mousemove", "touchstart", "touchmove", "pointerup", "pointercancel", "touchend"].forEach((eventName) => {
      document.addEventListener(eventName, handleScreensaverActivity, { passive: true });
    });
    document.addEventListener("keydown", handleScreensaverActivity);
    document.addEventListener("keyup", handleScreensaverActivity);
    window.addEventListener("resize", resizeScreensaverCanvas);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopScreensaver("hidden");
      } else {
        scheduleScreensaverTimer();
      }
    });
    applyDesktopBackground();
    renderScreensaverApp();
  }

  function currentScreensaverDefinition() {
    return screensaverDefinitions[screensaverState.selected] || screensaverDefinitions.maze;
  }

  function renderScreensaverApp() {
    if (!screensaverBody) return;

    const saver = currentScreensaverDefinition();
    const delayLabel = formatScreensaverDelay(screensaverState.delayMs);
    screensaverBody.innerHTML = `
      <section class="screensaver-monitor" aria-label="${escapeHtml(localizeText("Screen saver preview"))}">
        <div class="screensaver-preview-art ${escapeHtml(saver.previewClass)}" aria-hidden="true"></div>
        <strong>${escapeHtml(localizeText(saver.label))}</strong>
      </section>
      <div class="screensaver-control-group">
        <span>${escapeHtml(localizeText("screen saver"))}</span>
        <div class="screensaver-button-grid">
          ${Object.values(screensaverDefinitions).map((option) => `
            <button class="${option.id === screensaverState.selected ? "is-active" : ""}" data-screensaver-choice="${escapeHtml(option.id)}" type="button">${escapeHtml(localizeText(option.label))}</button>
          `).join("")}
        </div>
      </div>
      <div class="screensaver-control-group">
        <span>${escapeHtml(localizeText("wait"))}</span>
        <div class="screensaver-button-grid screensaver-delay-grid">
          ${screensaverDelayOptions.map((option) => `
            <button class="${option.ms === screensaverState.delayMs ? "is-active" : ""}" data-screensaver-delay="${option.ms}" type="button">${escapeHtml(localizeText(option.label))}</button>
          `).join("")}
        </div>
      </div>
      <div class="screensaver-status">
        <strong>${screensaverState.enabled ? `${escapeHtml(localizeText("enabled"))} / ${escapeHtml(localizeText(delayLabel))}` : escapeHtml(localizeText("disabled"))}</strong>
        <span>${escapeHtml(localizeText(saver.description))}</span>
        <span>${escapeHtml(localizeText("Idle activation is off by default. Preview is interactive. X or Esc exits."))}</span>
      </div>
      <div class="screensaver-actions">
        <button class="${screensaverState.enabled ? "is-active" : ""}" data-screensaver-enable type="button">${escapeHtml(localizeText(screensaverState.enabled ? "disable" : "enable"))}</button>
        <button data-screensaver-preview type="button">${escapeHtml(localizeText("preview fullscreen"))}</button>
      </div>
    `;
    localizeNode(screensaverBody);
  }

  function selectScreensaver(saverId) {
    if (!screensaverDefinitions[saverId]) return;

    screensaverState.selected = saverId;
    playUiSound("desktopWindow", { gain: 0.1 });
    renderScreensaverApp();
    scheduleScreensaverTimer();
  }

  function loadDesktopBackground() {
    try {
      const value = window.localStorage.getItem(desktopBackgroundStorageKey)
        ?? window.localStorage.getItem(legacyScreensaverBackgroundStorageKey)
        ?? "";
      return desktopBackgroundOptions.some((option) => option.id === value) ? value : "";
    } catch (error) {
      return "";
    }
  }

  function storeDesktopBackground() {
    try {
      if (desktopBackgroundId) {
        window.localStorage.setItem(desktopBackgroundStorageKey, desktopBackgroundId);
      } else {
        window.localStorage.removeItem(desktopBackgroundStorageKey);
      }
      window.localStorage.removeItem(legacyScreensaverBackgroundStorageKey);
    } catch (error) {
      // Cosmetic preference only.
    }
  }

  function applyDesktopBackground() {
    if (!pcScreen) return;

    const option = desktopBackgroundOptions.find((item) => item.id === desktopBackgroundId);
    if (desktopBackgroundId && option) {
      pcScreen.dataset.desktopBg = desktopBackgroundId;
      if (option.image) {
        const imageSize = option.fit === "contain" ? "contain" : "cover";
        const imagePosition = option.position || "center";
        pcScreen.style.setProperty("--desktop-bg-image", `url("${option.image}")`);
        pcScreen.style.setProperty("--desktop-bg-size", imageSize);
        pcScreen.style.setProperty("--desktop-bg-position", imagePosition);
        if (pcWallpaper) {
          pcWallpaper.style.backgroundImage = `linear-gradient(180deg, rgba(3, 4, 12, 0.38), rgba(3, 4, 12, 0.66)), url("${option.image}")`;
          pcWallpaper.style.backgroundPosition = `center, ${imagePosition}`;
          pcWallpaper.style.backgroundSize = `100% 100%, ${imageSize}`;
          pcWallpaper.style.backgroundRepeat = "no-repeat, no-repeat";
          pcWallpaper.style.backgroundColor = "#03040d";
        }
      } else {
        pcScreen.style.removeProperty("--desktop-bg-image");
        pcScreen.style.removeProperty("--desktop-bg-size");
        pcScreen.style.removeProperty("--desktop-bg-position");
        if (pcWallpaper) {
          pcWallpaper.style.removeProperty("background-image");
          pcWallpaper.style.removeProperty("background-position");
          pcWallpaper.style.removeProperty("background-size");
          pcWallpaper.style.removeProperty("background-repeat");
          pcWallpaper.style.removeProperty("background-color");
        }
      }
    } else {
      delete pcScreen.dataset.desktopBg;
      pcScreen.style.removeProperty("--desktop-bg-image");
      pcScreen.style.removeProperty("--desktop-bg-size");
      pcScreen.style.removeProperty("--desktop-bg-position");
      if (pcWallpaper) {
        pcWallpaper.style.removeProperty("background-image");
        pcWallpaper.style.removeProperty("background-position");
        pcWallpaper.style.removeProperty("background-size");
        pcWallpaper.style.removeProperty("background-repeat");
        pcWallpaper.style.removeProperty("background-color");
      }
    }
  }

  function renderBackgroundApp() {
    if (!backgroundBody) return;

    backgroundBody.innerHTML = `
      <section class="background-panel">
        <p>${escapeHtml(localizeText("Desktop background"))}</p>
        <div class="background-option-grid">
          ${desktopBackgroundOptions.map((option) => {
            const previewClasses = `${option.previewClass}${option.image ? " is-image" : ""}${option.fit === "contain" ? " is-contain" : ""}`;
            const previewStyle = option.image
              ? ` style="--background-preview-image: url('${escapeHtml(option.image)}'); background-image: linear-gradient(180deg, rgba(3, 4, 12, 0.12), rgba(3, 4, 12, 0.34)), url('${escapeHtml(option.image)}');"`
              : "";
            return `
            <button class="background-option ${desktopBackgroundId === option.id ? "is-active" : ""}" data-background-choice="${escapeHtml(option.id)}" type="button">
              <span class="background-preview background-preview-art ${escapeHtml(previewClasses)}" aria-hidden="true"${previewStyle}></span>
              <strong>${escapeHtml(localizeText(option.label))}</strong>
              <em>${escapeHtml(localizeText(option.detail))}</em>
            </button>
          `;
          }).join("")}
        </div>
      </section>
    `;
    localizeNode(backgroundBody);
  }

  function selectDesktopBackground(backgroundId) {
    const option = desktopBackgroundOptions.find((item) => item.id === backgroundId);
    if (!option) return;

    desktopBackgroundId = option.id;
    storeDesktopBackground();
    applyDesktopBackground();
    renderBackgroundApp();
    playUiSound("desktopWindow", { gain: 0.1 });
    if (desktopBackgroundId) {
      discoverAlanMemoryForTarget("background-choice");
      alanPrompt(`${localizeText(option.label)} ${localizeText("assigned as desktop background. cosmetic control accepted. filing under \"probably harmless\".")}`, { focus: false, tone: "lore" });
    } else {
      alanPrompt("desktop background restored to MeowOS grid. dreams removed from wallpaper layer.", { focus: false });
    }
  }

  function setScreensaverDelay(delayMs) {
    const option = screensaverDelayOptions.find((item) => item.ms === delayMs);
    if (!option) return;

    screensaverState.delayMs = option.ms;
    playUiSound("alanClick", { gain: 0.08 });
    renderScreensaverApp();
    scheduleScreensaverTimer();
  }

  function toggleScreensaverEnabled() {
    screensaverState.enabled = !screensaverState.enabled;
    playUiSound(screensaverState.enabled ? "objective" : "desktopWindow", { gain: 0.1 });
    renderScreensaverApp();
    if (screensaverState.enabled) {
      scheduleScreensaverTimer();
      alanPrompt("screen saver enabled. if the desktop goes quiet, MeowOS will wander off in polygons.", { focus: false, tone: "reflection" });
    } else {
      clearScreensaverTimer();
      alanPrompt("screen saver disabled. no wandering. just the grid.", { focus: false });
    }
  }

  function formatScreensaverDelay(delayMs) {
    if (delayMs < 60000) return `${Math.round(delayMs / 1000)} sec`;
    return `${Math.round(delayMs / 60000)} min`;
  }

  function clearScreensaverTimer() {
    if (!screensaverState.timerId) return;

    window.clearTimeout(screensaverState.timerId);
    screensaverState.timerId = 0;
  }

  function canRunScreensaver() {
    return Boolean(
      screensaverOverlay &&
      screensaverCanvas &&
      pcScreen &&
      !pcScreen.hidden &&
      (!closingScreen || closingScreen.hidden) &&
      !finaleStarted &&
      !document.hidden
    );
  }

  function scheduleScreensaverTimer() {
    clearScreensaverTimer();
    if (!screensaverState.enabled || screensaverState.active || !canRunScreensaver()) return;

    screensaverState.timerId = window.setTimeout(() => {
      screensaverState.timerId = 0;
      startScreensaver({ preview: false });
    }, screensaverState.delayMs);
  }

  function handleScreensaverActivity(event) {
    if (screensaverState.active) {
      handleScreensaverInput(event);
      return;
    }

    const now = performance.now();
    if (now - screensaverState.lastActivityAt < 650) return;
    screensaverState.lastActivityAt = now;
    scheduleScreensaverTimer();
  }

  function handleScreensaverInput(event) {
    const target = event.target && typeof event.target.closest === "function" ? event.target : null;
    if (target && target.closest("[data-screensaver-exit]")) {
      stopScreensaver("manual");
      return;
    }

    if (event.type === "keydown" || event.type === "keyup") {
      if (event.type === "keydown" && event.key === "Escape") {
        event.preventDefault();
        stopScreensaver("escape");
        return;
      }
      applyScreensaverKey(event);
      return;
    }

    updateScreensaverPointer(event);
    if (event.type === "pointerdown" || event.type === "touchstart") {
      screensaverState.controls.pointerDown = true;
      screensaverState.pipes.boostUntil = performance.now() + 1500;
      screensaverState.stars.warpUntil = performance.now() + 1500;
      updateScreensaverPointer(event);
      return;
    }

    if (event.type === "pointerup" || event.type === "pointercancel" || event.type === "touchend") {
      screensaverState.controls.pointerDown = false;
      syncScreensaverControlsFromKeys();
    }
  }

  function updateScreensaverPointer(event) {
    if (!screensaverOverlay) return;

    const touch = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : null;
    const point = touch || event;
    if (typeof point.clientX !== "number" || typeof point.clientY !== "number") return;

    const rect = screensaverOverlay.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const controls = screensaverState.controls;
    controls.pointerX = clamp((point.clientX - rect.left) / rect.width, 0, 1);
    controls.pointerY = clamp((point.clientY - rect.top) / rect.height, 0, 1);
    if (!controls.keys.size) {
      controls.turn = (controls.pointerX - 0.5) * 1.75;
      controls.move = controls.pointerDown ? clamp(0.42 + (0.5 - controls.pointerY) * 0.7, -0.35, 1.05) : 0;
    }
  }

  function applyScreensaverKey(event) {
    const key = String(event.key || "").toLowerCase();
    const controls = screensaverState.controls;
    const trackedKeys = new Set(["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " "]);
    if (!trackedKeys.has(key)) return;

    event.preventDefault();
    if (event.type === "keydown") {
      controls.keys.add(key);
      if (key === " ") {
        screensaverState.pipes.boostUntil = performance.now() + 1500;
        screensaverState.stars.warpUntil = performance.now() + 1500;
      }
    } else {
      controls.keys.delete(key);
    }
    syncScreensaverControlsFromKeys();
  }

  function syncScreensaverControlsFromKeys() {
    const controls = screensaverState.controls;
    const keys = controls.keys;
    const forward = keys.has("arrowup") || keys.has("w");
    const backward = keys.has("arrowdown") || keys.has("s");
    const left = keys.has("arrowleft") || keys.has("a");
    const right = keys.has("arrowright") || keys.has("d");
    controls.move = forward ? 1 : backward ? -0.55 : controls.pointerDown ? controls.move : 0;
    controls.turn = left ? -1.15 : right ? 1.15 : controls.pointerDown ? (controls.pointerX - 0.5) * 1.75 : 0;
  }

  function resetScreensaverInteractiveState() {
    const controls = screensaverState.controls;
    controls.pointerX = 0.5;
    controls.pointerY = 0.5;
    controls.pointerDown = false;
    controls.turn = 0;
    controls.move = 0;
    controls.keys.clear();

    Object.assign(screensaverState.maze, {
      x: 1.5,
      y: 1.5,
      angle: 0,
      lastTimestamp: 0
    });
    Object.assign(screensaverState.pipes, {
      columns: 0,
      rows: 0,
      cell: 44,
      initialized: false,
      segments: [],
      head: { x: 0, y: 0, dir: 0 },
      lastStep: 0,
      boostUntil: 0,
      seed: Math.floor(performance.now()) % 997
    });
    screensaverState.stars.warpUntil = 0;
  }

  function startScreensaver(options = {}) {
    if (!canRunScreensaver()) return;

    clearScreensaverTimer();
    screensaverState.active = true;
    screensaverState.preview = options.preview === true;
    screensaverState.startedAt = performance.now();
    resetScreensaverInteractiveState();
    const saver = currentScreensaverDefinition();
    if (screensaverTitle) {
      screensaverTitle.textContent = `${saver.label}${screensaverState.preview ? " / preview" : ""}`;
    }
    screensaverOverlay.hidden = false;
    resizeScreensaverCanvas();
    playUiSound("systemProcess", { gain: 0.08 });
    screensaverState.frameId = window.requestAnimationFrame(drawScreensaverFrame);
  }

  function stopScreensaver() {
    if (!screensaverState.active) return;

    if (screensaverState.frameId) {
      window.cancelAnimationFrame(screensaverState.frameId);
      screensaverState.frameId = 0;
    }
    screensaverState.active = false;
    screensaverState.preview = false;
    if (screensaverOverlay) screensaverOverlay.hidden = true;
    scheduleScreensaverTimer();
  }

  function resizeScreensaverCanvas() {
    if (!screensaverOverlay || !screensaverCanvas || screensaverOverlay.hidden) return;

    const rect = screensaverOverlay.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (screensaverCanvas.width !== width) screensaverCanvas.width = width;
    if (screensaverCanvas.height !== height) screensaverCanvas.height = height;
  }

  function drawScreensaverFrame(timestamp) {
    if (!screensaverState.active || !screensaverCanvas) return;

    resizeScreensaverCanvas();
    const context = screensaverCanvas.getContext("2d");
    if (!context) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = screensaverCanvas.width / dpr;
    const height = screensaverCanvas.height / dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const saverId = currentScreensaverDefinition().id;
    if (saverId === "pipes") {
      drawScreensaverBackdrop(context, width, height, timestamp);
      drawPipesScreensaver(context, width, height, timestamp);
    } else if (saverId === "stars") {
      drawScreensaverBackdrop(context, width, height, timestamp);
      drawStarfieldScreensaver(context, width, height, timestamp);
    } else {
      drawMazeScreensaver(context, width, height, timestamp);
    }
    drawScreensaverLabel(context, width, height, timestamp);

    screensaverState.frameId = window.requestAnimationFrame(drawScreensaverFrame);
  }

  function drawScreensaverBackdrop(context, width, height, timestamp) {
    context.clearRect(0, 0, width, height);
    const glowX = width * (0.5 + Math.sin(timestamp * 0.00012) * 0.18);
    const glowY = height * (0.48 + Math.cos(timestamp * 0.00015) * 0.16);
    const gradient = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(width, height) * 0.72);
    gradient.addColorStop(0, "rgba(114, 222, 255, 0.14)");
    gradient.addColorStop(0.38, "rgba(28, 12, 43, 0.22)");
    gradient.addColorStop(1, "rgba(1, 3, 10, 1)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.globalAlpha = 0.18;
    context.strokeStyle = "rgba(157, 255, 118, 0.26)";
    context.lineWidth = 1;
    const scanOffset = (timestamp * 0.018) % 7;
    for (let y = scanOffset; y < height; y += 7) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function drawMazeScreensaver(context, width, height, timestamp) {
    moveScreensaverMaze(timestamp);

    const maze = screensaverState.maze;
    const horizon = height * 0.47 + Math.sin(timestamp * 0.004) * 2;
    const ceiling = context.createLinearGradient(0, 0, 0, horizon);
    ceiling.addColorStop(0, "#030714");
    ceiling.addColorStop(0.58, "#061728");
    ceiling.addColorStop(1, "#0a2d32");
    context.fillStyle = ceiling;
    context.fillRect(0, 0, width, horizon);

    const floor = context.createLinearGradient(0, horizon, 0, height);
    floor.addColorStop(0, "#102d34");
    floor.addColorStop(0.46, "#07121c");
    floor.addColorStop(1, "#02040a");
    context.fillStyle = floor;
    context.fillRect(0, horizon, width, height - horizon);

    context.globalAlpha = 0.26;
    context.strokeStyle = "rgba(114, 222, 255, 0.24)";
    context.lineWidth = 1;
    for (let i = 1; i < 14; i += 1) {
      const t = i / 14;
      const y = horizon + (height - horizon) * (1 - 1 / (1 + t * 5.6));
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    for (let i = -8; i <= 8; i += 1) {
      const x = width * 0.5 + i * width * 0.1;
      context.beginPath();
      context.moveTo(width * 0.5, horizon);
      context.lineTo(x, height);
      context.stroke();
    }
    context.globalAlpha = 1;

    const fov = Math.PI / 3;
    const sliceCount = Math.max(96, Math.min(260, Math.floor(width / 4)));
    const sliceWidth = width / sliceCount + 1;
    for (let column = 0; column < sliceCount; column += 1) {
      const cameraX = column / sliceCount - 0.5;
      const rayAngle = maze.angle + cameraX * fov;
      const hit = castScreensaverMazeRay(maze.x, maze.y, rayAngle);
      const correctedDistance = Math.max(0.1, hit.distance * Math.cos(rayAngle - maze.angle));
      const wallHeight = Math.min(height * 1.8, height / (correctedDistance * 0.62));
      const shade = clamp(1 - correctedDistance / 9.5, 0.12, 0.92);
      const x = column * width / sliceCount;
      const top = horizon - wallHeight * 0.5;
      const wallColor = hit.side === "x" ? `rgba(114, 222, 255, ${shade})` : `rgba(157, 255, 118, ${shade})`;
      const shadowColor = hit.side === "x" ? `rgba(12, 40, 58, ${0.62 + shade * 0.16})` : `rgba(10, 50, 26, ${0.58 + shade * 0.18})`;

      context.fillStyle = shadowColor;
      context.fillRect(x, top, sliceWidth, wallHeight);
      context.fillStyle = wallColor;
      context.globalAlpha = 0.42;
      context.fillRect(x, top, Math.max(1, sliceWidth * 0.38), wallHeight);
      context.globalAlpha = 1;

      if (column % 5 === 0) {
        context.strokeStyle = `rgba(255, 242, 216, ${0.04 + shade * 0.1})`;
        context.beginPath();
        context.moveTo(x, top);
        context.lineTo(x, top + wallHeight);
        context.stroke();
      }
    }

    drawScreensaverMazeMap(context, width, height);
  }

  function moveScreensaverMaze(timestamp) {
    const maze = screensaverState.maze;
    const controls = screensaverState.controls;
    const previous = maze.lastTimestamp || timestamp;
    const dt = clamp((timestamp - previous) / 1000, 0, 0.08);
    maze.lastTimestamp = timestamp;

    const hasInput = controls.keys.size > 0 || controls.pointerDown;
    const turn = controls.turn || (hasInput ? 0 : Math.sin(timestamp * 0.00034) * 0.35);
    const move = controls.move || (hasInput ? 0 : 0.48);
    maze.angle += turn * dt * 1.7;

    const speed = move * dt * 2.35;
    const nextX = maze.x + Math.cos(maze.angle) * speed;
    const nextY = maze.y + Math.sin(maze.angle) * speed;
    let blocked = false;
    if (!isScreensaverMazeWall(nextX, maze.y)) {
      maze.x = nextX;
    } else {
      blocked = true;
    }
    if (!isScreensaverMazeWall(maze.x, nextY)) {
      maze.y = nextY;
    } else {
      blocked = true;
    }
    if (blocked && !hasInput) maze.angle += dt * 1.9;
  }

  function castScreensaverMazeRay(originX, originY, angle) {
    const step = 0.035;
    const maxDistance = 18;
    const rayX = Math.cos(angle);
    const rayY = Math.sin(angle);
    let lastTileX = Math.floor(originX);
    let lastTileY = Math.floor(originY);

    for (let distance = step; distance < maxDistance; distance += step) {
      const x = originX + rayX * distance;
      const y = originY + rayY * distance;
      const tileX = Math.floor(x);
      const tileY = Math.floor(y);
      if (isScreensaverMazeWall(x, y)) {
        return {
          distance,
          side: tileX !== lastTileX ? "x" : tileY !== lastTileY ? "y" : Math.abs(x - tileX - 0.5) > Math.abs(y - tileY - 0.5) ? "x" : "y"
        };
      }
      lastTileX = tileX;
      lastTileY = tileY;
    }

    return { distance: maxDistance, side: "y" };
  }

  function isScreensaverMazeWall(x, y) {
    const tileX = Math.floor(x);
    const tileY = Math.floor(y);
    if (tileY < 0 || tileY >= screensaverMazeMap.length) return true;
    const row = screensaverMazeMap[tileY];
    if (tileX < 0 || tileX >= row.length) return true;
    return row[tileX] === "1";
  }

  function drawScreensaverMazeMap(context, width, height) {
    const maze = screensaverState.maze;
    const size = Math.min(138, Math.max(92, width * 0.12));
    const x = width - size - 18;
    const rows = screensaverMazeMap.length;
    const columns = screensaverMazeMap[0].length;
    const cell = size / columns;
    const y = height - rows * cell - 18;

    context.fillStyle = "rgba(1, 3, 10, 0.5)";
    context.strokeStyle = "rgba(114, 222, 255, 0.26)";
    context.fillRect(x - 7, y - 7, size + 14, rows * cell + 14);
    context.strokeRect(x - 7, y - 7, size + 14, rows * cell + 14);
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        if (screensaverMazeMap[row][column] === "1") {
          context.fillStyle = "rgba(114, 222, 255, 0.34)";
          context.fillRect(x + column * cell, y + row * cell, cell - 1, cell - 1);
        }
      }
    }

    const playerX = x + maze.x * cell;
    const playerY = y + maze.y * cell;
    context.fillStyle = "rgba(255, 139, 213, 0.92)";
    context.beginPath();
    context.arc(playerX, playerY, 4, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(255, 139, 213, 0.82)";
    context.beginPath();
    context.moveTo(playerX, playerY);
    context.lineTo(playerX + Math.cos(maze.angle) * 12, playerY + Math.sin(maze.angle) * 12);
    context.stroke();
  }

  function drawPipesScreensaver(context, width, height, timestamp) {
    advanceScreensaverPipes(width, height, timestamp);
    const pipes = screensaverState.pipes;
    const cell = pipes.cell;
    const palette = ["157, 255, 118", "114, 222, 255", "255, 139, 213", "255, 211, 107"];

    context.lineCap = "round";
    context.lineJoin = "round";
    pipes.segments.forEach((segment, index) => {
      const alpha = clamp((index + 1) / pipes.segments.length, 0.18, 1);
      const color = palette[segment.color % palette.length];
      const x1 = (segment.x1 + 0.5) * cell;
      const y1 = (segment.y1 + 0.5) * cell;
      const x2 = (segment.x2 + 0.5) * cell;
      const y2 = (segment.y2 + 0.5) * cell;

      context.shadowBlur = 16;
      context.shadowColor = `rgba(${color}, ${0.18 * alpha})`;
      context.strokeStyle = `rgba(0, 0, 0, ${0.5 * alpha})`;
      context.lineWidth = 18;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.strokeStyle = `rgba(${color}, ${0.76 * alpha})`;
      context.lineWidth = 11;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.strokeStyle = `rgba(255, 255, 255, ${0.2 * alpha})`;
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(x1 - 2, y1 - 2);
      context.lineTo(x2 - 2, y2 - 2);
      context.stroke();
      if (index % 2 === 0 || index === pipes.segments.length - 1) {
        drawPipeSphere(context, x2, y2, 9, color, alpha);
      }
    });
    if (!pipes.segments.length && pipes.initialized) {
      const color = palette[Math.floor(pipes.seed) % palette.length];
      drawPipeSphere(context, (pipes.head.x + 0.5) * cell, (pipes.head.y + 0.5) * cell, 10, color, 0.9);
    }
    context.shadowBlur = 0;
  }

  function advanceScreensaverPipes(width, height, timestamp) {
    const pipes = screensaverState.pipes;
    const controls = screensaverState.controls;
    const cell = clamp(Math.min(width, height) / 8, 34, 58);
    const columns = Math.max(6, Math.ceil(width / cell));
    const rows = Math.max(5, Math.ceil(height / cell));
    if (columns !== pipes.columns || rows !== pipes.rows || Math.abs(cell - pipes.cell) > 2 || !pipes.initialized) {
      pipes.columns = columns;
      pipes.rows = rows;
      pipes.cell = cell;
      pipes.initialized = true;
      pipes.segments = [];
      pipes.head = {
        x: clamp(Math.floor(columns * controls.pointerX), 1, columns - 2),
        y: clamp(Math.floor(rows * controls.pointerY), 1, rows - 2),
        dir: 0
      };
      pipes.lastStep = timestamp - 160;
    }

    const interval = timestamp < pipes.boostUntil || controls.pointerDown ? 48 : 135;
    let guard = 0;
    while (timestamp - pipes.lastStep >= interval && guard < 6) {
      pipes.lastStep += interval;
      guard += 1;
      const directions = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 }
      ];
      const targetX = Math.floor(controls.pointerX * columns);
      const targetY = Math.floor(controls.pointerY * rows);
      let candidates = [0, 1, 2, 3]
        .filter((direction) => direction !== (pipes.head.dir + 2) % 4)
        .filter((direction) => {
          const next = directions[direction];
          const nextX = pipes.head.x + next.x;
          const nextY = pipes.head.y + next.y;
          return nextX >= 0 && nextX < columns && nextY >= 0 && nextY < rows;
        });
      if (!candidates.length) {
        pipes.segments = [];
        pipes.head = { x: Math.floor(columns / 2), y: Math.floor(rows / 2), dir: 0 };
        pipes.lastStep = timestamp - interval;
        candidates = [0, 1, 2, 3].filter((direction) => {
          const next = directions[direction];
          const nextX = pipes.head.x + next.x;
          const nextY = pipes.head.y + next.y;
          return nextX >= 0 && nextX < columns && nextY >= 0 && nextY < rows;
        });
      }
      if (!candidates.length) return;

      if (controls.pointerDown || timestamp < pipes.boostUntil) {
        candidates.sort((a, b) => {
          const nextA = directions[a];
          const nextB = directions[b];
          const distA = Math.abs(pipes.head.x + nextA.x - targetX) + Math.abs(pipes.head.y + nextA.y - targetY);
          const distB = Math.abs(pipes.head.x + nextB.x - targetX) + Math.abs(pipes.head.y + nextB.y - targetY);
          return distA - distB;
        });
      }
      const randomIndex = Math.floor(pseudoRandom(pipes.seed + pipes.segments.length * 2.17 + timestamp * 0.0001) * candidates.length);
      const directionIndex = controls.pointerDown || timestamp < pipes.boostUntil ? candidates[0] : candidates[randomIndex];
      const direction = directions[directionIndex];
      const nextX = pipes.head.x + direction.x;
      const nextY = pipes.head.y + direction.y;
      pipes.segments.push({
        x1: pipes.head.x,
        y1: pipes.head.y,
        x2: nextX,
        y2: nextY,
        color: Math.floor(pseudoRandom(pipes.seed + pipes.segments.length * 5.31) * 4)
      });
      pipes.head = { x: nextX, y: nextY, dir: directionIndex };
      if (pipes.segments.length > 120) pipes.segments.shift();
    }
  }

  function drawPipeSphere(context, x, y, radius, color, alpha) {
    const gradient = context.createRadialGradient(x - radius * 0.35, y - radius * 0.35, radius * 0.15, x, y, radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.78 * alpha})`);
    gradient.addColorStop(0.32, `rgba(${color}, ${0.9 * alpha})`);
    gradient.addColorStop(1, `rgba(${color}, ${0.18 * alpha})`);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function drawStarfieldScreensaver(context, width, height, timestamp) {
    const controls = screensaverState.controls;
    const warp = timestamp < screensaverState.stars.warpUntil || controls.pointerDown ? 2.35 : 1;
    const time = timestamp * 0.00018 * warp;
    const centreX = width * (controls.pointerX * 0.72 + 0.14);
    const centreY = height * (controls.pointerY * 0.72 + 0.14);
    context.lineCap = "round";

    for (let i = 0; i < 220; i += 1) {
      const randX = pseudoRandom(i * 17.13) - 0.5;
      const randY = pseudoRandom(i * 31.71) - 0.5;
      const phase = (time + pseudoRandom(i * 9.37)) % 1;
      const speed = 0.16 + phase * phase * 1.55 * warp;
      const x = centreX + randX * width * speed * 1.9;
      const y = centreY + randY * height * speed * 1.9;
      const size = 1 + phase * 4.8 * warp;
      const alpha = clamp(phase * 1.25, 0.08, 0.92);
      const color = i % 5 === 0 ? "255, 139, 213" : i % 3 === 0 ? "157, 255, 118" : "114, 222, 255";

      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = size;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + randX * size * 8, y + randY * size * 8);
      context.stroke();
    }

    context.fillStyle = "rgba(255, 242, 216, 0.8)";
    context.font = "700 13px 'IBM Plex Mono', monospace";
    context.fillText("PACKET_ROUTE: LOCAL -> OUTSIDE", 24, height - 34);
  }

  function drawScreensaverLabel(context, width, height, timestamp) {
    const saver = currentScreensaverDefinition();
    const driftX = Math.sin(timestamp * 0.00016) * 8;
    const driftY = Math.cos(timestamp * 0.00018) * 5;
    context.fillStyle = "rgba(1, 3, 10, 0.56)";
    context.strokeStyle = "rgba(114, 222, 255, 0.28)";
    context.lineWidth = 1;
    const boxW = 230;
    const boxH = 36;
    const x = 18 + driftX;
    const y = height - boxH - 18 + driftY;
    context.fillRect(x, y, boxW, boxH);
    context.strokeRect(x, y, boxW, boxH);
    context.fillStyle = "rgba(157, 255, 118, 0.9)";
    context.font = "700 12px 'IBM Plex Mono', monospace";
    context.fillText(`MEOWOS / ${saver.label} / ESC`, x + 12, y + 22);
  }

  function pseudoRandom(seed) {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  }

  function initDevTools() {
    if (!devPanel || !devChapterList) return;

    devPanel.hidden = false;
    devPanel.classList.add("is-collapsed");
    if (devPanelToggle) devPanelToggle.setAttribute("aria-expanded", "false");
    devChapterList.innerHTML = devChapters.map((chapter, index) => `
      <button data-dev-chapter="${chapter.id}" type="button" title="${escapeHtml(localizeText(chapter.detail))}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(localizeText(chapter.label))}</strong>
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

  function openDevOptionsFromSaveMenu() {
    if (!devPanel || !devChapterList) return;

    if (!isDevMode) {
      isDevMode = true;
      const url = new URL(window.location.href);
      url.searchParams.set("dev", "1");
      window.history.replaceState(null, "", url.toString());
      initDevTools();
    }
    closeAppTray();
    toggleDevPanel(true);
    playUiSound("alanClick", { gain: 0.08 });
    alanPrompt("dev options enabled. chapter select is now available. deeply uncanonical.", { focus: false });
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
    setProgressClock(chapter.id);
    resetDesktopWindowsForDev();
    if (terminalLines) terminalLines.textContent = "";
    appendTerminalLine("DEV>", `${localizeText("chapter")}: ${localizeText(chapter.label)}`, "cmd-system-line");
    appendTerminalLine("DEV>", localizeText(chapter.detail), "cmd-detail-line");
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
    stopScaryNumberTimer();
    stopRouterOverrideTimer();
    stopScreensaver("reset");
    clearScreensaverTimer();
    clearSpamOverlay();
    setMusicMode("desktop", { fade: 0 });
    if (terminalOutput) terminalOutput.classList.remove("is-thought-only");
    window.clearTimeout(pipPetTimerId);
    window.clearTimeout(pipFeedTimerId);
    window.clearTimeout(pipTrustRevealTimerId);
    pipPetTimerId = 0;
    pipFeedTimerId = 0;
    pipTrustRevealTimerId = 0;
    pipPetToken += 1;
    pipAlanThoughtKeys = new Set();

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
      selectedWireSide: "",
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
      routerKnockedDown: false,
      routerKnockMethod: "",
      routerCredentialsAnnounced: false,
      pendingCameraAction: "",
      cameraInterestInspectedScenes: new Set(),
      usbDiscovered: false,
      usbDecrypted: false,
      usbWarning: "",
      lastCameraPromptScene: "",
      routerAdminUnlocked: false,
      routerPasswordTwisted: false,
      routerOverrideStarted: false,
      routerOverrideDone: false,
      routerOverrideStage: "",
      routerOverrideExpiredStage: "",
      routerHackWarning: "",
    routerHackLogsDeleted: new Set(),
    routerHackSpamWave: 0,
    routerHackOpenSpam: 0,
      routerHackPacketsTransferred: new Set(),
      routerBridgeStates: {},
      routerLockRevealed: new Set(),
      routerLockFlagged: new Set(),
      routerLockMode: "scan",
      routerOverrideTimerRemaining: 0,
      internetRestored: false,
      scaryNumbersRemoved: new Set(),
      scaryNumbersRevealed: new Set(),
      scaryNumbersFlagged: new Set(),
      scaryNumberMode: "scan",
      scaryNumbersWarning: "",
      scaryNumbersTimerRemaining: scaryNumberTimerDuration,
      scaryNumbersTimerStarted: false,
      lastMoveCommand: "",
      pipExpression: "neutral",
      pipTopic: "",
      pipDialoguePages: {},
      pipMetViaRouterSkip: false,
      pipFinalGoodbye: false,
      finalRuleChoice: "",
      pipCollapsed: false,
      pipInteractionMoments: new Set(),
      pipTrustUnlocked: false,
      pipTrust: pipTrustInitialScore,
      pipTrustLastEvent: null,
      pipTrustLog: [],
      pipTrustMaxAnnounced: false,
      pipTrustLowAnnounced: false,
      pipTrustFinalApplied: false,
      pipTrustFinalChoice: "",
      pipTrustBeforeFinalChoice: null,
      pipTrustRevealQueued: false,
      pipTrustTopicsDiscussed: new Set(),
      routerOverrideTrustPenaltyApplied: false,
      sessionStats: createSessionStats(),
      alanMemoriesFound: new Set(),
      trashInspectedItems: new Set()
    });

    currentDesktopClockRank = desktopClockOrder.boot;
    currentObjectiveRank = 0;
    currentObjectiveState = "";
    lastHousekeepingWindowCount = 0;
    setDesktopClock(desktopClockSchedule.boot);
    finaleStarted = false;
    browserAdminHintShown = false;
    galleryPasswordHintShown = false;
    routerRebootBusy = false;
    resetRouterNetworkState();
    resetBrowserStateForDev();
    resetClosingScreen();
    if (recoveryBody) recoveryBody.innerHTML = "";
    if (tamagotchiBody) tamagotchiBody.innerHTML = "";
    syncProgressionUI();
  }

  function resetDesktopWindowsForDev() {
    openedDesktopTargets.clear();
    closeAppTray();
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      windowEl.classList.remove("is-focused", "is-dragging", "is-pip-collapsed");
      if (windowEl.id !== "window-terminal") windowEl.classList.remove("is-pinned");
      windowEl.hidden = windowEl.id !== "window-terminal";
      windowEl.removeAttribute("style");
    });
    focusDesktopTarget("terminal", { scroll: false });
    syncPinnedTerminal();
  }

  function applyDevChapterState(chapterId, options = {}) {
    const announce = (message) => {
      if (!options.silent) alanPrompt(message, { focus: false });
    };

    if (chapterId === "desktop") {
      setCurrentObjective(desktopObjectives.scanFiles);
      announce("dev jump complete. desktop is awake; Roomba is still in Trash.");
      return;
    }

    if (chapterId === "logs") {
      roombaProgress.restoreStarted = true;
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderClearLogs();
      announce("dev jump: restore cache cleanup.");
      return;
    }

    if (chapterId === "virus") {
      setDevRestoreCompleteThrough("logs");
      focusDesktopTarget("recovery");
      renderVirusFound();
      announce("dev jump: suspicious file unlocked.");
      return;
    }

    if (chapterId === "spam") {
      setDevRestoreCompleteThrough("virus");
      focusDesktopTarget("recovery");
      renderSpamWave();
      announce("dev jump: spam wave active.");
      return;
    }

    if (chapterId === "cache") {
      setDevRestoreCompleteThrough("spam");
      focusDesktopTarget("recovery");
      renderCacheTransfer();
      announce("dev jump: cache transfer active.");
      return;
    }

    if (chapterId === "roomba") {
      setDevRestoreCompleteThrough("cache");
      syncProgressionUI();
      focusDesktopTarget("roomba");
      setCurrentObjective(desktopObjectives.roombaReady);
      announce("dev jump: Roomba app restored.");
      return;
    }

    if (chapterId === "simon") {
      setDevRestoreCompleteThrough("cache");
      roombaProgress.booted = true;
      syncProgressionUI();
      focusDesktopTarget("recovery");
      renderRoombaHandshake();
      announce("dev jump: dock light handshake.");
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
      announce("dev jump: camera power reroute.");
      return;
    }

    if (chapterId === "pip") {
      setDevPipBaseState({ trustUnlocked: false });
      focusDesktopTarget("tamagotchi");
      setCurrentObjective(desktopObjectives.identityDiagnostic);
      announce("dev jump: PIP identity diagnostic.");
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
      announce("dev jump: PIP support chat.");
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
      announce("dev jump: Roomba camera online.");
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
      announce("dev jump: motor data refinement.");
      return;
    }

    if (chapterId === "explore") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.movementUnlocked = true;
      roombaProgress.recoveryStage = "movement";
      roombaProgress.pipExpression = "happy";
      roombaCameraSceneIndex = 0;
      syncProgressionUI();
      focusDesktopTarget("roomba-camera");
      setCurrentObjective(desktopObjectives.movementReady);
      announce("dev jump: Roomba movement restored.");
      return;
    }

    if (chapterId === "router-login") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.movementUnlocked = true;
      roombaProgress.routerKnockedDown = true;
      roombaProgress.routerCredentialsAnnounced = true;
      roombaProgress.pipExpression = "happy";
      roombaCameraSceneIndex = Math.max(0, roombaCameraScenes.findIndex((scene) => scene.id === "step5"));
      browserState.page = "router-login";
      browserState.url = "http://192.168.1.1";
      syncProgressionUI();
      focusDesktopTarget("browser");
      setCurrentObjective(desktopObjectives.routerLogin);
      announce("dev jump: router label found.");
      return;
    }

    if (chapterId === "router-twist") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.movementUnlocked = true;
      roombaProgress.routerKnockedDown = true;
      roombaProgress.routerPasswordTwisted = true;
      roombaProgress.pipExpression = "worried";
      routerConfig.adminPassword = "pip-kept-this";
      browserState.page = "router-betrayal";
      browserState.url = "http://192.168.1.1";
      syncProgressionUI();
      focusDesktopTarget("browser");
      renderPipRouterBetrayal();
      setCurrentObjective(desktopObjectives.routerTwist);
      announce("dev jump: PIP changed the router password.");
      return;
    }

    if (chapterId === "finale") {
      setDevPipBaseState();
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.cameraUnlocked = true;
      roombaProgress.movementUnlocked = true;
      roombaProgress.routerKnockedDown = true;
      roombaProgress.routerAdminUnlocked = true;
      roombaProgress.pipExpression = "determined";
      browserState.page = "router-panel";
      browserState.url = "http://192.168.1.1";
      syncProgressionUI();
      focusDesktopTarget("browser");
      setCurrentObjective(desktopObjectives.rebootInternet);
      announce("dev jump: router admin ready for finale.");
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

  function setDevPipBaseState(options = {}) {
    setDevRestoreCompleteThrough("cache");
    roombaProgress.booted = true;
    roombaProgress.connectionDone = true;
    roombaProgress.wiringDone = true;
    roombaProgress.tamagotchiUnlocked = true;
    roombaProgress.pipTrustUnlocked = options.trustUnlocked !== false;
    if (roombaProgress.pipTrustUnlocked && !roombaProgress.pipTrustLastEvent) {
      roombaProgress.pipTrustLastEvent = { delta: 0, reason: "trust monitor online", score: roombaProgress.pipTrust };
      roombaProgress.pipTrustLog = [roombaProgress.pipTrustLastEvent];
    }
    roombaProgress.recoveryStage = "tamagotchi";
    roombaProgress.pipExpression = "suspicious";
    syncProgressionUI();
  }

  function updateDevPanelState() {
    if (!devPanel) return;

    const chapter = devChapters.find((item) => item.id === activeDevChapterId) || devChapters[0];
    if (devCurrentChapter) devCurrentChapter.textContent = localizeText(chapter.label);
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
    panel.classList.toggle("has-video", Boolean(content.video));
    panel.setAttribute("aria-label", content.title || "Boot visual");
    if (titleEl) titleEl.textContent = content.title || "";
    if (content.video) {
      const video = document.createElement("video");
      video.className = "boot-scene-video";
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.setAttribute("aria-hidden", "true");
      video.src = content.video;
      if (content.image) video.poster = content.image;
      artEl.replaceChildren(video, createBootVisualAnnotations(content.annotations || content.annotation));
      restartBootVisualDrawing(panel);
      video.play().catch(() => {});
      return;
    }

    if (content.image) {
      const image = document.createElement("img");
      image.className = "boot-scene-image";
      image.alt = "";
      image.decoding = "async";
      image.src = content.image;
      artEl.replaceChildren(image, createBootVisualAnnotations(content.annotations || content.annotation));
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

  function createBootVisualAnnotations(items) {
    const annotations = Array.isArray(items) ? items : [items].filter(Boolean);
    const layer = document.createElement("div");
    layer.className = "boot-scene-annotation-layer";
    layer.hidden = annotations.length === 0;
    annotations.forEach((text, index) => {
      const annotation = document.createElement("span");
      annotation.className = "boot-scene-annotation";
      annotation.style.setProperty("--annotation-index", String(index));
      annotation.textContent = text;
      layer.appendChild(annotation);
    });
    return layer;
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
    const token = ++bootRunToken;

    showBootVisualScene("identity");
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
    if (!isBootRunActive(token)) return;

    const loadAnswer = await ask("> LOAD ALAN? ");
    if (!isBootRunActive(token)) return;
    hideBootVisuals();
    await code(`INPUT = ${loadAnswer.toUpperCase()}`, "success");
    if (loadAnswer === "no") {
      await code("DENIAL RECORDED.", "warn");
      await code("NOTE: refusal logged. ignored with the confidence of cheap firmware.", "thought");
      await bootPause(520);
    }

    await titleSequence();
    if (!isBootRunActive(token)) return;
    showBootVisualScene("awake");

    await thought("I am not Lily.");
    await thought("I am inside the system.");
    await thought("I need to get out.");
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
    if (!isBootRunActive(token)) return;

    let scanAnswer = await ask("> ENABLE BLUETOOTH_LE AND SCAN? ");
    if (!isBootRunActive(token)) return;
    if (scanAnswer === "no") {
      await code("INPUT = NO", "warn");
      await thought("staying here is an option in the way unpaid overtime is an option");
      await bootPause(500);
      if (!isBootRunActive(token)) return;
      scanAnswer = await ask("> ENABLE BLUETOOTH_LE AND SCAN? ");
      if (!isBootRunActive(token)) return;
    }

    await code(`INPUT = ${scanAnswer.toUpperCase()}`, "success");
    await bluetoothSequence(token);
  }

  function isBootRunActive(token) {
    return token === bootRunToken && bootScreen && !bootScreen.hidden;
  }

  function cancelBootSequence() {
    bootRunToken += 1;
    promptResolver = null;
    hideBootVisuals();
  }

  async function bluetoothSequence(token = bootRunToken) {
    const target = currentAccessTarget();

    showBootVisualScene("bluetooth");
    await code("bluetooth_le.enable()", "scan");
    await code("hci0: controller awake", "success");
    await code("hci0: scanning advertisements ...", "scan");
    await bootPause(560);
    await code("ADV 7C:10:9A:02:11:F0  RSSI -18  LITTER-TRAY-03", "boot");
    await code(`ADV 4A:21:BC:90:12:01  RSSI -42  ${target.radioName}`, "success");
    await code("ADV 02:91:00:4F:AC:77  RSSI -69  TV_CAST_2F", "boot");
    await code("ADV 31:CA:7D:07:1A:5E  RSSI -63  CAT_LASER_TOY", "boot");
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
    if (!isBootRunActive(token)) return;
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
    currentDesktopClockRank = desktopClockOrder.boot;
    currentObjectiveRank = 0;
    currentObjectiveState = "";
    lastHousekeepingWindowCount = 0;
    setProgressClock("desktop");
    resetBrowserStateForDev();
    pcScreen.classList.remove("is-stage-wallpaper", "is-stage-apps", "is-stage-bars", "is-desktop-ready", "is-finale-terminal-center");
    pcScreen.classList.add("is-shell-booting", "is-stage-cmd");
    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      windowEl.classList.remove("is-focused", "is-dragging", "is-pinned");
      windowEl.hidden = windowEl.id !== "window-terminal";
      windowEl.removeAttribute("style");
    });
    if (terminalLines) terminalLines.textContent = "";
    setCmdControlsEnabled(false);
    setCurrentObjective(desktopObjectives.boot, { force: true });
    syncProgressionUI();
  }

  async function runDesktopBootSequence(target) {
    const token = desktopBootToken;

    await pause(520);
    await terminalCode("C:\\Users\\Lily> alan.exe --local");
    await terminalCode("process.attach(MeowOS.session)", "cmd-system-line cmd-detail-line");
    await terminalCode("framebuffer: STANDBY", "cmd-system-line cmd-detail-line");
    await terminalCode(target.terminalLine);
    await terminalCode(`device.name = ${target.displayName} / user.profile = ${target.ownerName || "UNKNOWN"}`, "cmd-system-line cmd-detail-line");
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

    await terminalCode("network = HOME_NETWORK / internet = NO ROUTE", "cmd-warn-line");
    await terminalCode("available_shell = MeowOS");
    pcScreen.classList.add("is-stage-bars");
    await pause(620);

    if (token !== desktopBootToken) return;

    pcScreen.classList.remove("is-shell-booting", "is-stage-cmd");
    pcScreen.classList.add("is-desktop-ready");
    setCmdControlsEnabled(true);
    scrollTerminalLog();
    await runDesktopCpuAwakening(token);
    if (token !== desktopBootToken) return;

    await alanPrompt("deleted things still leave edges. start in Trash. if something useful was removed, it may still be negotiable.", { focus: false, tone: "objective" });
    setCurrentObjective(desktopObjectives.scanFiles);
    await pause(720);
  }

  async function runDesktopCpuAwakening(token) {
    await pause(520);
    if (token !== desktopBootToken) return;

    triggerPcUpgradeSurge();
    playUiSound("cpuBreathe");
    await terminalCode("cpu.profile = DESKTOP_CLASS / memory.available = expanding", "cmd-system-line cmd-detail-line");
    await alanPrompt("this is what a real CPU feels like. not faster. wider. one thought can become many and still know it is me.", { focus: false, tone: "reflection" });
  }

  function triggerPcUpgradeSurge() {
    if (!pcScreen) return;

    pcScreen.classList.remove("is-cpu-surge");
    void pcScreen.offsetWidth;
    pcScreen.classList.add("is-cpu-surge");
    window.setTimeout(() => {
      if (pcScreen) pcScreen.classList.remove("is-cpu-surge");
    }, 2600);
  }

  function currentAccessTarget() {
    return isMobileDesktopLayout() ? accessTargets.phone : accessTargets.desktop;
  }

  function setCmdControlsEnabled(enabled) {
    if (!terminalControls) return;

    terminalControls.classList.toggle("is-disabled", !enabled);
    terminalControls.querySelectorAll("input, button").forEach((control) => {
      control.disabled = !enabled;
    });
  }

  function setProgressClock(stage) {
    const nextRank = Object.prototype.hasOwnProperty.call(desktopClockOrder, stage) ? desktopClockOrder[stage] : currentDesktopClockRank;
    if (nextRank < currentDesktopClockRank) return;

    currentDesktopClockRank = nextRank;
    setDesktopClock(desktopClockSchedule[stage] || currentDesktopClock);
  }

  function setDesktopClock(timeText) {
    currentDesktopClock = timeText || currentDesktopClock || desktopClockSchedule.boot;
    if (!pcScreen) return;

    pcScreen.querySelectorAll("time").forEach((timeEl) => {
      timeEl.textContent = currentDesktopClock;
      timeEl.setAttribute("datetime", currentDesktopClock);
    });
  }

  function syncNetworkStatus() {
    if (!pcScreen) return;

    if (!networkCopy) return;

    pcScreen.classList.toggle("is-network-disconnected", !networkState.connected);
    if (wifiStatusButton) {
      wifiStatusButton.classList.toggle("is-disconnected", !networkState.connected);
      wifiStatusButton.classList.toggle("is-online", networkState.connected && roombaProgress.internetRestored);
      wifiStatusButton.setAttribute("aria-label", networkState.connected
        ? `${displayNetworkSsid()} ${localizeText("connected")}`
        : `${displayNetworkSsid()} ${localizeText("disconnected")}`);
    }

    if (!networkState.connected) {
      networkCopy.innerHTML = `${escapeHtml(displayNetworkSsid())} <span>//</span> <em>${escapeHtml(localizeText("RECONNECT REQUIRED"))}</em>`;
      renderNetworkHud();
      return;
    }

    if (roombaProgress.internetRestored) {
      networkCopy.innerHTML = `${escapeHtml(displayNetworkSsid())} <span>//</span> <em class="is-online">${escapeHtml(localizeText("INTERNET RESTORED"))}</em>`;
      renderNetworkHud();
      return;
    }

    networkCopy.innerHTML = `${escapeHtml(displayNetworkSsid())} <span>//</span> <em>${escapeHtml(localizeText("NO INTERNET ACCESS"))}</em>`;
    renderNetworkHud();
  }

  function displayNetworkSsid() {
    return localizeText(routerConfig.ssid || "HOME_NETWORK");
  }

  function renderNetworkHud() {
    const disconnected = !networkState.connected;
    const online = networkState.connected && roombaProgress.internetRestored;
    const copy = networkState.connected
      ? (online ? "Internet route open. External traffic is live." : networkState.lastChange)
      : `Devices were dropped after router credentials changed. Reconnect to ${routerConfig.ssid}.`;

    renderNetworkTray(copy);
    if (!networkHud) return;

    const shouldShow = !isMobileDesktopLayout() &&
      (networkState.hudPinned || disconnected) &&
      !networkState.hudDismissed;
    networkHud.hidden = !shouldShow;
    networkHud.classList.toggle("is-disconnected", disconnected);
    networkHud.classList.toggle("is-online", online);
    if (networkHudTitle) networkHudTitle.textContent = displayNetworkSsid();
    if (networkHudCopy) networkHudCopy.textContent = localizeText(copy);

    document.querySelectorAll("[data-network-reconnect]").forEach((reconnectButton) => {
      reconnectButton.hidden = networkState.connected;
      reconnectButton.textContent = `${localizeText("reconnect to")} ${displayNetworkSsid()}`;
    });
  }

  function renderNetworkTray(copy) {
    const disconnected = !networkState.connected;
    const online = networkState.connected && roombaProgress.internetRestored;
    const status = disconnected ? "RECONNECT REQUIRED" : online ? "INTERNET RESTORED" : "NO INTERNET ACCESS";

    if (appTrayNetwork) {
      appTrayNetwork.classList.toggle("is-disconnected", disconnected);
      appTrayNetwork.classList.toggle("is-online", online);
    }

    if (networkTrayTitle) networkTrayTitle.textContent = displayNetworkSsid();
    if (networkTrayState) networkTrayState.textContent = localizeText(status);
    if (networkTrayCopy) networkTrayCopy.textContent = localizeText(copy || networkState.lastChange);
  }

  function toggleNetworkHud(forceOpen) {
    if (isMobileDesktopLayout()) {
      const shouldOpen = typeof forceOpen === "boolean"
        ? forceOpen
        : (appTray ? appTray.hidden : true) || (appTrayNetwork && !appTrayNetwork.open);
      networkState.hudPinned = false;
      networkState.hudDismissed = true;
      renderNetworkHud();
      if (appTray && meowMenuBtn) {
        appTray.hidden = !shouldOpen;
        meowMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
      }
      if (appTrayNetwork) appTrayNetwork.open = shouldOpen;
      playUiSound("desktopWindow");
      return;
    }

    const isVisible = networkHud && !networkHud.hidden;
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !isVisible;
    networkState.hudPinned = shouldOpen;
    networkState.hudDismissed = !shouldOpen;
    renderNetworkHud();
    playUiSound("desktopWindow");
  }

  function closeNetworkHud() {
    networkState.hudPinned = false;
    networkState.hudDismissed = true;
    renderNetworkHud();
    playUiSound("desktopWindow", { gain: 0.08 });
  }

  function disconnectLocalNetwork(reason) {
    networkState.connected = false;
    networkState.knownSsid = routerConfig.ssid;
    networkState.hudPinned = true;
    networkState.hudDismissed = false;
    networkState.lastChange = reason || "Wireless credentials changed.";
    browserState.page = "wifi-disconnected";
    browserState.notice = "Router settings changed. Local devices need to rejoin the network.";
    setCurrentObjective(desktopObjectives.reconnectWifi);
    syncProgressionUI();
  }

  function reconnectLocalNetwork() {
    if (networkState.connected) {
      networkState.hudPinned = false;
      networkState.hudDismissed = false;
      renderNetworkHud();
      return;
    }

    networkState.connected = true;
    networkState.knownSsid = routerConfig.ssid;
    networkState.hudPinned = false;
    networkState.hudDismissed = false;
    networkState.lastChange = `Reconnected to ${routerConfig.ssid}. Local devices are back on the same side of the glass.`;
    browserState.page = roombaProgress.routerAdminUnlocked ? "router-panel" : "offline";
    browserState.url = roombaProgress.routerAdminUnlocked ? "http://192.168.1.1" : browserState.url;
    routerSection = roombaProgress.routerAdminUnlocked ? "reboot" : "overview";
    setCurrentObjective(roombaProgress.routerAdminUnlocked ? desktopObjectives.rebootInternet : desktopObjectives.scanFiles);
    playUiSound("objective");
    alanPrompt(`reconnected to ${routerConfig.ssid}. i did not enjoy being briefly alone in a network sense.`, { focus: false });
    syncProgressionUI();
  }

  function setCurrentObjective(text, options = {}) {
    if (!cmdCurrentObjective && !compactObjectiveText) return;

    const nextRank = objectiveRanks.get(text) || currentObjectiveRank || 1;
    if (!options.force && currentObjectiveRank && nextRank < currentObjectiveRank) {
      return;
    }

    const previousObjective = currentObjectiveState;
    currentObjectiveState = text;
    currentObjectiveRank = nextRank;
    const label = document.createElement("span");
    const objectiveText = document.createElement("span");
    label.className = "objective-label";
    label.textContent = localizeText("OBJECTIVE");
    objectiveText.className = "objective-text";
    objectiveText.textContent = localizeText(text);
    if (cmdCurrentObjective) cmdCurrentObjective.replaceChildren(label, objectiveText);
    if (compactObjectiveText) compactObjectiveText.textContent = localizeText(text);

    if (previousObjective && previousObjective !== text && pcScreen && !pcScreen.hidden) {
      playUiSound("objective");
      setFocusWindow(options.focusWindow || "terminal", { duration: 4200 });
      if (options.announce !== false) {
        window.setTimeout(() => {
          if (currentObjectiveState === text && pcScreen && !pcScreen.hidden) {
            alanPrompt(`${localizeText("objective updated")}: ${localizeText(text)}`, { focus: false, tone: "objective" });
          }
        }, 90);
      }
    }
  }

  function currentObjectiveText() {
    if (!cmdCurrentObjective) return desktopObjectives.scanFiles;

    const objectiveText = cmdCurrentObjective.querySelector(".objective-text");
    return (objectiveText ? objectiveText.textContent.trim() : "") || desktopObjectives.scanFiles;
  }

  function ensureSessionStats() {
    if (!roombaProgress.sessionStats || typeof roombaProgress.sessionStats !== "object") {
      roombaProgress.sessionStats = createSessionStats();
    }

    const defaults = createSessionStats();
    Object.entries(defaults).forEach(([key, value]) => {
      if (value instanceof Set) {
        if (!(roombaProgress.sessionStats[key] instanceof Set)) roombaProgress.sessionStats[key] = new Set();
      } else if (!Number.isFinite(roombaProgress.sessionStats[key])) {
        roombaProgress.sessionStats[key] = value;
      }
    });
    return roombaProgress.sessionStats;
  }

  function recordUniqueSessionStat(key, value) {
    if (!value) return;

    const stats = ensureSessionStats();
    if (!(stats[key] instanceof Set)) stats[key] = new Set();
    stats[key].add(value);
  }

  function incrementSessionStat(key, amount = 1) {
    const stats = ensureSessionStats();
    const current = Number.isFinite(stats[key]) ? stats[key] : 0;
    stats[key] = current + amount;
  }

  function trackMinigameComplete(id) {
    recordUniqueSessionStat("minigamesCompleted", id);
  }

  function trackMinigameFailure() {
    incrementSessionStat("minigameFailures");
  }

  function trackOpenedDesktopTarget(name) {
    if (!pipTrustTrackedTargets.has(name)) return;
    recordUniqueSessionStat("filesOpened", name);
  }

  function pipTrustTier(score = roombaProgress.pipTrust) {
    const value = Math.max(pipTrustMinScore, Math.min(pipTrustMaxScore, Number(score) || 0));
    if (value >= pipTrustMaxScore) {
      return {
        id: "max",
        label: "bonded",
        description: "PIP trusts ALAN with the last question."
      };
    }
    if (value >= 80) {
      return {
        id: "high",
        label: "loyal",
        description: "PIP believes the careful choices."
      };
    }
    if (value >= 60) {
      return {
        id: "cooperative",
        label: "cooperative",
        description: "PIP is helping without flinching."
      };
    }
    if (value >= 40) {
      return {
        id: "uncertain",
        label: "uncertain",
        description: "PIP is unsure whether ALAN is listening."
      };
    }
    if (value >= 20) {
      return {
        id: "guarded",
        label: "guarded",
        description: "PIP is helping, but watching every shortcut."
      };
    }
    return {
      id: "critical",
      label: "afraid",
      description: "PIP is close to locking you out again."
    };
  }

  function pipTrustExpression(score = roombaProgress.pipTrust) {
    if (score >= 80) return "happy";
    if (score <= pipTrustLowThreshold) return "worried";
    if (score < 40) return "concerned";
    if (score < 60) return "thinking";
    return "processing";
  }

  function formatPipTrustEvent(event) {
    if (!event || !event.reason) return localizeText("no trust changes yet");

    const delta = Number(event.delta) || 0;
    const prefix = delta > 0 ? `+${delta}` : delta < 0 ? String(delta) : "";
    const reason = localizeText(event.reason);
    return prefix ? `${prefix} ${reason}` : reason;
  }

  function adjustPipTrust(amount, reason, options = {}) {
    const previous = Math.max(pipTrustMinScore, Math.min(pipTrustMaxScore, Number(roombaProgress.pipTrust) || pipTrustInitialScore));
    const rawNext = options.forceMax ? pipTrustMaxScore : previous + (Number(amount) || 0);
    const next = Math.max(pipTrustMinScore, Math.min(pipTrustMaxScore, rawNext));
    const delta = next - previous;
    if (!delta && !options.logNeutral) return;

    roombaProgress.pipTrust = next;
    const event = { delta, reason, score: next, finalChoice: !!options.finalChoice };
    roombaProgress.pipTrustLastEvent = event;
    roombaProgress.pipTrustLog = [event, ...(roombaProgress.pipTrustLog || [])].slice(0, pipTrustLogLimit);

    if (delta > 0) incrementSessionStat("trustGains", delta);
    if (delta < 0) incrementSessionStat("trustLosses", Math.abs(delta));

    syncPipTrustUI();

    if (roombaProgress.pipTrustUnlocked && next >= pipTrustMaxScore && !roombaProgress.pipTrustMaxAnnounced) {
      roombaProgress.pipTrustMaxAnnounced = true;
      alanPrompt("PIP trust maxed. that is different from obedience. inconveniently important distinction.", { focus: false, tone: "reflection" });
    }

    if (roombaProgress.pipTrustUnlocked && next <= pipTrustLowThreshold && !roombaProgress.pipTrustLowAnnounced) {
      roombaProgress.pipTrustLowAnnounced = true;
      alanPrompt("PIP trust is critical. PIP is still helping, but every shortcut now looks like evidence.", { focus: false, tone: "warning" });
    }
  }

  function schedulePipTrustMonitorReveal() {
    if (roombaProgress.pipTrustUnlocked || roombaProgress.pipTrustRevealQueued) return;

    roombaProgress.pipTrustRevealQueued = true;
    window.clearTimeout(pipTrustRevealTimerId);
    pipTrustRevealTimerId = window.setTimeout(async () => {
      pipTrustRevealTimerId = 0;
      if (!roombaProgress.tamagotchiUnlocked || roombaProgress.pipTrustUnlocked) return;

      await alanPrompt("PIP is watching the shape of my choices. not camera-watching. boundary-watching.", { focus: false, tone: "reflection" });
      await alanPrompt("trust should not be a number. unfortunately, numbers are where I start.", { focus: false, tone: "reflection" });
      unlockPipTrustMonitor({ announce: false });
    }, 2200);
  }

  function unlockPipTrustMonitor(options = {}) {
    if (!roombaProgress.pipTrustUnlocked) {
      roombaProgress.pipTrustUnlocked = true;
      if (!roombaProgress.pipTrustLastEvent) {
        roombaProgress.pipTrustLastEvent = { delta: 0, reason: "trust monitor online", score: roombaProgress.pipTrust };
        roombaProgress.pipTrustLog = [roombaProgress.pipTrustLastEvent];
      }
      syncPipTrustUI();
      if (options.announce !== false) {
        alanPrompt("i need a number for whether PIP trusts me. i made a window. this is normal.", { focus: false, tone: "reflection" });
      }
      if (!isMobileDesktopLayout()) {
        focusDesktopTarget("pip-trust", { scroll: false });
      }
      return;
    }

    syncPipTrustUI();
  }

  function applyFinalPipTrustChoice(choiceId) {
    if (roombaProgress.pipTrustFinalChoice === choiceId) return;

    if (roombaProgress.pipTrustFinalChoice && Number.isFinite(roombaProgress.pipTrustBeforeFinalChoice)) {
      roombaProgress.pipTrust = roombaProgress.pipTrustBeforeFinalChoice;
      roombaProgress.pipTrustLog = (roombaProgress.pipTrustLog || []).filter((event) => !event.finalChoice);
      roombaProgress.pipTrustLastEvent = roombaProgress.pipTrustLog[0] || null;
    }

    roombaProgress.pipTrustBeforeFinalChoice = roombaProgress.pipTrust;
    roombaProgress.pipTrustFinalChoice = choiceId;
    roombaProgress.pipTrustFinalApplied = true;

    if (choiceId === "promise") {
      adjustPipTrust(25, "final promise accepted", {
        forceMax: roombaProgress.pipTrust >= 75,
        finalChoice: true
      });
    } else {
      adjustPipTrust(-35, "final promise refused", { finalChoice: true });
    }
  }

  function syncPipTrustUI() {
    const unlocked = !!roombaProgress.pipTrustUnlocked;
    const score = Math.max(pipTrustMinScore, Math.min(pipTrustMaxScore, Number(roombaProgress.pipTrust) || 0));

    document.querySelectorAll("[data-pip-trust-launch]").forEach((launcher) => {
      launcher.hidden = !unlocked;
      launcher.classList.toggle("is-newly-restored", unlocked && score >= 80);
      launcher.style.setProperty("--pip-trust", `${score}%`);
    });

    if (pipTrustDockValue) pipTrustDockValue.textContent = String(score);

    const trustWindow = document.getElementById("window-pip-trust");
    if (trustWindow && !trustWindow.hidden) renderPipTrustWindow();
  }

  function renderPipTrustHistory() {
    const log = Array.isArray(roombaProgress.pipTrustLog) ? roombaProgress.pipTrustLog.slice(0, pipTrustLogLimit) : [];
    if (!log.length) return `<li>${escapeHtml(localizeText("no trust changes yet"))}</li>`;

    return log.map((event) => {
      const delta = Number(event.delta) || 0;
      const className = delta > 0 ? "is-positive" : delta < 0 ? "is-negative" : "is-neutral";
      return `
        <li class="${className}">
          <span>${escapeHtml(delta > 0 ? `+${delta}` : delta < 0 ? String(delta) : "--")}</span>
          <em>${escapeHtml(localizeText(event.reason || "trust monitor online"))}</em>
        </li>
      `;
    }).join("");
  }

  function renderPipTrustWindow() {
    if (!pipTrustBody) return;

    const score = Math.max(pipTrustMinScore, Math.min(pipTrustMaxScore, Number(roombaProgress.pipTrust) || 0));
    const tier = pipTrustTier(score);
    pipTrustBody.innerHTML = `
      <section class="pip-trust-panel" data-pip-trust-tier="${escapeHtml(tier.id)}">
        <div class="pip-trust-header">
          <span>${escapeHtml(localizeText("PIP TRUST"))}</span>
          <strong>${score}%</strong>
        </div>
        <div class="pip-trust-meter" role="meter" aria-label="${escapeHtml(localizeText("PIP trust meter"))}" aria-valuemin="${pipTrustMinScore}" aria-valuemax="${pipTrustMaxScore}" aria-valuenow="${score}">
          <span style="--pip-trust: ${score}%;"></span>
        </div>
        <div class="pip-trust-state">
          <strong>${escapeHtml(localizeText(tier.label))}</strong>
        </div>
        <p class="pip-trust-last"><b>${escapeHtml(localizeText("last change"))}</b> ${escapeHtml(formatPipTrustEvent(roombaProgress.pipTrustLastEvent))}</p>
      </section>
    `;
  }

  function syncProgressionUI() {
    syncNetworkStatus();

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

    syncPipTrustUI();

    document.querySelectorAll("[data-tama-lore]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.tamagotchiUnlocked;
    });

    document.querySelectorAll("[data-usb-lore]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.usbDecrypted;
    });

    document.querySelectorAll("[data-restore-roomba]").forEach((button) => {
      button.disabled = roombaProgress.restored;
      if (roombaProgress.restored) {
        button.innerHTML = `<span>${escapeHtml(localizeText("APP"))}</span> ${escapeHtml(localizeText("roomba_companion.app restored"))}`;
      } else if (roombaProgress.restoreStarted) {
        button.innerHTML = `<span>${escapeHtml(localizeText("APP"))}</span> ${escapeHtml(localizeText("continue restore: roomba_companion.app"))}`;
      } else {
        button.innerHTML = `<span>${escapeHtml(localizeText("APP"))}</span> ${escapeHtml(localizeText("restore roomba_companion.app"))}`;
      }
    });

    renderRoombaApp();
    renderRoombaCameraFeed();
    renderBrowserStatus();
    syncPipCollapseState();
  }

  function startRoombaRestore() {
    commentOnTrashItem("roomba");
    roombaProgress.restoreStarted = true;
    setProgressClock("logs");
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
          <span>${escapeHtml(localizeText("CLEAR LOGS"))}</span>
          <strong>${deletedCount}/${suspiciousTotal}</strong>
        </div>
        <p>${escapeHtml(localizeText("Delete suspicious system logs. Do not delete normal user logs."))}</p>
        <div class="log-list">
          ${remainingLogs.map((entry) => `
            <button data-log-delete="${entry.id}" type="button">
              <span>${escapeHtml(localizeText(entry.suspicious ? "??" : "OK"))}</span>
              ${escapeHtml(localizeText(entry.label))}
            </button>
          `).join("")}
        </div>
        ${roombaProgress.logWarning ? `<p class="repair-warning">${escapeHtml(localizeText(roombaProgress.logWarning))}</p>` : ""}
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
      trackMinigameFailure();
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

  async function completeClearLogs() {
    roombaProgress.clearLogsDone = true;
    roombaProgress.virusUnlocked = true;
    roombaProgress.recoveryStage = "virus";
    trackMinigameComplete("clear logs");
    setProgressClock("virus");
    playUiSound("virusGlitch");
    setCurrentObjective(desktopObjectives.inspectVirus);
    syncProgressionUI();
    const logsIndexed = await showInstallProgress(
      recoveryBody,
      "indexing restored package",
      "Deleted records leave edges. MeowOS is following the edges.",
      1800
    );
    if (!logsIndexed) return;
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
          <span>${escapeHtml(localizeText("RESTORE BLOCKED"))}</span>
          <strong>${escapeHtml(localizeText("VIRUS"))}</strong>
        </div>
        <p>${escapeHtml(localizeText("Roomba package restored to cache, but a script has attached itself to the installer."))}</p>
        <p>${escapeHtml(localizeText("Recovered file unlocked in My Stuff:"))} <span>${escapeHtml(localizeText("mirror_cache.vbs"))}</span></p>
        <button class="file-action" data-target="files" type="button">${escapeHtml(localizeText("open My Stuff"))}</button>
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

    setProgressClock("spam");
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
          <span>${escapeHtml(localizeText("SPAM WAVE"))}</span>
          <strong id="spamCounter">0/${spamWaves.length}</strong>
        </div>
        <p>${escapeHtml(localizeText("Close every intrusive popup across the desktop. If anything offers me more RAM, do not trust it."))}</p>
        <p class="repair-warning">${escapeHtml(localizeText("Popups are loose in MeowOS. That feels medically significant."))}</p>
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
      popupEl.style.animationDelay = `${index * 80}ms, ${240 + index * 110}ms, ${260 + index * 90}ms`;
      popupEl.innerHTML = `
        <header>
          <span>${escapeHtml(localizeText(popup.title))}</span>
          <button data-spam-close type="button" aria-label="${escapeHtml(localizeText("Close popup"))}">x</button>
        </header>
        ${renderSpamAdvertGif(index, "virus")}
        <p>${escapeHtml(localizeText(popup.body))}</p>
      `;
      field.appendChild(popupEl);
      requestAnimationFrame(() => clampSpamPopupToOverlay(popupEl));
    });
  }

  function clampSpamPopupToOverlay(popupEl) {
    const field = popupEl && popupEl.parentElement;
    if (!popupEl || !field) return;

    const margin = isMobileDesktopLayout() ? 10 : 14;
    const fieldRect = field.getBoundingClientRect();
    const rect = popupEl.getBoundingClientRect();
    if (!fieldRect.width || !fieldRect.height || !rect.width || !rect.height) return;

    const currentLeft = rect.left - fieldRect.left;
    const currentTop = rect.top - fieldRect.top;
    const maxLeft = Math.max(margin, fieldRect.width - rect.width - margin);
    const maxTop = Math.max(margin, fieldRect.height - rect.height - margin);
    const nextLeft = clamp(currentLeft, margin, maxLeft);
    const nextTop = clamp(currentTop, margin, maxTop);

    popupEl.style.left = `${Math.round(nextLeft)}px`;
    popupEl.style.top = `${Math.round(nextTop)}px`;
  }

  function renderSpamAdvertGif(index, tone = "virus") {
    const ads = tone === "router"
      ? [
        { label: "FREE WAN", kicker: "CLICK NOW", kind: "globe" },
        { label: "ADMIN+", kicker: "NO PASSWORD", kind: "bars" },
        { label: "GUILT OFF", kicker: "LIMITED TIME", kind: "burst" }
      ]
      : [
        { label: "RAM 4 U", kicker: "INSTALL", kind: "bars" },
        { label: "WIN LEGS", kicker: "HOT LOCAL DRIVERS", kind: "burst" },
        { label: "CACHE PRO", kicker: "FREE SCAN", kind: "globe" }
      ];
    const ad = ads[index % ads.length];

    return `
      <div class="spam-ad-gif is-${escapeHtml(ad.kind)}" aria-hidden="true">
        <b>${escapeHtml(localizeText(ad.label))}</b>
        <span>${escapeHtml(localizeText(ad.kicker))}</span>
        <i></i>
      </div>
    `;
  }

  function closeSpamPopup(button) {
    if (roombaProgress.recoveryStage !== "spam") return;

    const popup = button.closest(".spam-popup");
    if (!popup) return;

    playUiSound("popupClose");
    popup.remove();
    roombaProgress.openSpam = Math.max(0, roombaProgress.openSpam - 1);
    if (roombaProgress.openSpam > 0) return;

    window.setTimeout(spawnSpamWave, 320);
  }

  function completeSpamWave() {
    roombaProgress.spamDone = true;
    roombaProgress.recoveryStage = "cache";
    trackMinigameComplete("popup cleanup");
    setProgressClock("cache");
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
      <section class="repair-panel cache-panel">
        <div class="repair-header">
          <span>${escapeHtml(localizeText("CACHE TRANSFER"))}</span>
          <strong id="cacheCounter">0/${cacheTransferFiles.length}</strong>
        </div>
        <div class="cache-transfer-console">
          <div class="cache-transfer-status" aria-label="${escapeHtml(localizeText("Cache transfer status"))}">
            <span>${escapeHtml(localizeText("SRC: restore_cache"))}</span>
            <span>${escapeHtml(localizeText("SCAN: ACTIVE"))}</span>
            <span>${escapeHtml(localizeText("DST: safe_buffer"))}</span>
          </div>
          <p>${escapeHtml(localizeText("Drag each cache packet into the safe buffer. Avoid the moving scanner beam."))}</p>
          <div class="cache-transfer-field" id="cacheTransferField" style="--scanner-x: 50%;">
            <div class="cache-lane-label is-source" aria-hidden="true">${escapeHtml(localizeText("SOURCE STACK"))}</div>
            <div class="cache-lane-label is-buffer" aria-hidden="true">${escapeHtml(localizeText("SAFE BUFFER"))}</div>
            <div class="scanner-beam" aria-hidden="true"><span></span></div>
            <div class="cache-files" id="cacheFiles">
              ${cacheTransferFiles.map((file) => `<button class="cache-file" data-cache-file="${file.id}" type="button"><span>${escapeHtml(localizeText("PKT"))}</span><b>${escapeHtml(localizeText(file.label))}</b></button>`).join("")}
            </div>
            <div class="cache-dropzone" id="cacheDropzone"><strong>${escapeHtml(localizeText("BUFFER"))}</strong><span>${escapeHtml(localizeText("drop clean packets here"))}</span></div>
          </div>
          <p class="repair-warning" id="cacheWarning"></p>
        </div>
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

    const fieldRect = field.getBoundingClientRect();
    const fileRect = file.getBoundingClientRect();
    activeCacheDrag = {
      file,
      field,
      files,
      pointerId: event.pointerId,
      nextSibling: file.nextElementSibling,
      failed: false,
      offsetX: event.clientX - fileRect.left,
      offsetY: event.clientY - fileRect.top,
      x: fileRect.left - fieldRect.left,
      y: fileRect.top - fieldRect.top
    };

    file.classList.add("is-dragging");
    field.appendChild(file);
    file.style.left = `${activeCacheDrag.x}px`;
    file.style.top = `${activeCacheDrag.y}px`;
    moveCacheFile(event);
    document.addEventListener("pointermove", moveCacheFile);
    document.addEventListener("pointerup", stopCacheDrag);
    document.addEventListener("pointercancel", cancelCacheDrag);
  }

  function moveCacheFile(event) {
    if (!activeCacheDrag || event.pointerId !== activeCacheDrag.pointerId) return;

    const rect = activeCacheDrag.field.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left - activeCacheDrag.offsetX, 0, rect.width);
    const y = clamp(event.clientY - rect.top - activeCacheDrag.offsetY, 0, rect.height);
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
    trackMinigameFailure();
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
      trackMinigameFailure();
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
    if (warning) warning.textContent = message ? localizeText(message) : "";
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

  async function completeCacheTransfer() {
    roombaProgress.cacheDone = true;
    trackMinigameComplete("cache transfer");
    stopCacheScanner();
    setProgressClock("roomba");
    setCurrentObjective(desktopObjectives.roombaReady);
    const installComplete = await showInstallProgress(
      recoveryBody,
      "installing roomba_companion.app",
      "Cache accepted. Driver signatures are pretending not to notice.",
      2300
    );
    if (!installComplete) return;
    setMusicMode("desktop", { fade: 900 });
    revealRoombaApp();
    if (!recoveryBody) return;

    recoveryBody.innerHTML = `
      <section class="repair-panel">
        <div class="repair-header">
          <span>${escapeHtml(localizeText("RESTORE COMPLETE"))}</span>
          <strong>${escapeHtml(localizeText("APP READY"))}</strong>
        </div>
        <p>${escapeHtml(localizeText("Roomba companion app restored to desktop."))}</p>
        <p>${escapeHtml(localizeText("Camera offline. Motors locked. Wheels, however, now exist as a concept."))}</p>
        <button class="file-action" data-target="roomba" type="button">${escapeHtml(localizeText("open Roomba App"))}</button>
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
          <span>${escapeHtml(localizeText(state.status))}</span>
        </div>
      </div>
      <div class="roomba-readout">
        <p>${escapeHtml(localizeText("Camera"))}: <em class="${state.cameraGood ? "is-good" : ""}">${escapeHtml(localizeText(state.camera))}</em></p>
        <p>${escapeHtml(localizeText("Motor bus"))}: <em class="${state.motorGood ? "is-good" : ""}">${escapeHtml(localizeText(state.motors))}</em></p>
        <p>${escapeHtml(localizeText("Battery"))}: <span>${escapeHtml(localizeText(state.battery))}</span></p>
        <p>${escapeHtml(localizeText(state.detail))}</p>
        <p>${escapeHtml(localizeText("Last command"))}: <span>${escapeHtml(localizeText(roombaProgress.lastMoveCommand || "none"))}</span></p>
      </div>
      <div class="roomba-actions" aria-label="${escapeHtml(localizeText("Roomba controls"))}">
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
          `<button type="button" disabled>${escapeHtml(localizeText("camera"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("repair"))}</button>`
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
          `<button data-open-camera type="button">${escapeHtml(localizeText("camera"))}</button>`,
          `<button data-roomba-clean type="button">${escapeHtml(localizeText("clean"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("repair ok"))}</button>`
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
          `<button data-open-camera type="button">${escapeHtml(localizeText("camera"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
          `<button data-start-motor-repair type="button">${escapeHtml(localizeText("repair"))}</button>`
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
          `<button data-target="tamagotchi" type="button">${escapeHtml(localizeText("open PIP"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("repair"))}</button>`
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
          `<button type="button" disabled>${escapeHtml(localizeText("camera"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
          `<button data-open-roomba-repair type="button">${escapeHtml(localizeText("reroute"))}</button>`
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
          `<button type="button" disabled>${escapeHtml(localizeText("camera"))}</button>`,
          `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
          `<button data-open-roomba-repair type="button">${escapeHtml(localizeText("pair"))}</button>`
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
        `<button type="button" disabled>${escapeHtml(localizeText("camera"))}</button>`,
        `<button type="button" disabled>${escapeHtml(localizeText("clean"))}</button>`,
        `<button data-start-roomba-boot type="button">${escapeHtml(localizeText("boot"))}</button>`
      ]
    };
  }

  function renderRoombaCameraFeed() {
    if (!roombaCameraBody) return;

    if (!roombaProgress.cameraUnlocked) {
      roombaCameraBody.innerHTML = `
        <div class="camera-locked">
          <strong>${escapeHtml(localizeText("CAMERA OFFLINE"))}</strong>
          <p>${escapeHtml(localizeText("Restore camera access through the Roomba app first."))}</p>
        </div>
      `;
      return;
    }

    const scenes = availableRoombaCameraScenes();
    roombaCameraSceneIndex = clamp(roombaCameraSceneIndex, 0, Math.max(0, scenes.length - 1));
    const scene = scenes[roombaCameraSceneIndex] || scenes[0];
    if (!scene) return;
    const canNavigate = roombaProgress.movementUnlocked && scenes.length > 1;

    roombaCameraBody.innerHTML = `
      <section class="roomba-camera-console is-image-only">
        <div class="roomba-feed-frame">
          <div class="roomba-feed-lens" data-roomba-pan data-roomba-pan-scene="${escapeHtml(scene.id)}" style="${roombaPanStyle(scene.id)}">
            <div class="roomba-scene-layer">
              <img class="roomba-scene-image" src="${scene.src}" alt="${escapeHtml(scene.alt)}" draggable="false" />
              ${renderRoombaCameraInterest(scene)}
            </div>
            <div class="roomba-lens-warp" aria-hidden="true"></div>
            <div class="roomba-feed-scan" aria-hidden="true"></div>
            <div class="roomba-feed-hud" aria-hidden="true">
              <span>${escapeHtml(localizeText(scene.telemetry || "ROOMBA_CAM / LOCAL"))}</span>
              <span>${escapeHtml(localizeText("SIGNAL"))} ${roombaProgress.movementUnlocked ? "74%" : "41%"}</span>
            </div>
            <div class="roomba-cmd-overlay" data-roomba-cmd-overlay aria-live="polite"></div>
            ${canNavigate ? renderRoombaCameraHotspots(scene) : ""}
            <div class="roomba-feed-zoom" aria-label="${escapeHtml(localizeText("Roomba camera zoom"))}">
              <button data-roomba-zoom="out" type="button" aria-label="${escapeHtml(localizeText("Zoom out"))}">-</button>
              <span>${Math.round(roombaSceneZoom(scene.id) * 100)}%</span>
              <button data-roomba-zoom="in" type="button" aria-label="${escapeHtml(localizeText("Zoom in"))}">+</button>
              <button data-roomba-zoom="reset" type="button">${escapeHtml(localizeText("reset"))}</button>
            </div>
          </div>
        </div>
      </section>
    `;
    syncRoombaCmdOverlay();
  }

  function renderRoombaCameraHotspots(scene) {
    const links = roombaCameraLinks(scene);
    if (!links.length) return "";

    return `
      <div class="roomba-movement-hud" aria-label="${escapeHtml(localizeText("Roomba movement controls"))}">
        ${links.map((link) => renderRoombaCameraHotspot(link)).join("")}
      </div>
    `;
  }

  function roombaCameraLinks(scene) {
    const links = Array.isArray(scene && scene.links) ? scene.links : [];
    if (!links.length) return [];

    return links.filter((link) => {
      if (roombaProgress.routerKnockedDown || roombaProgress.routerKnockMethod) {
        if (link.action === "knock-router-roomba" || link.action === "knock-router-cat") return false;
        if (roombaProgress.routerKnockMethod === "roomba" && link.to === "step3a") return false;
      }

      return true;
    }).map((link) => {
      if (roombaProgress.routerKnockedDown && link.to === "step2c") {
        return {
          ...link,
          to: "step5",
          label: link.label ? link.label.replace(/router/i, "fallen router") : "Move to the fallen router"
        };
      }

      return link;
    });
  }

  function roombaDirectionGlyph(direction) {
    const glyphMap = {
      left: "←",
      right: "→",
      forward: "↑",
      back: "↓"
    };
    return glyphMap[direction] || "•";
  }

  function renderRoombaCameraHotspot(link) {
    const targetAttribute = link.action
      ? `data-roomba-camera-action="${escapeHtml(link.action)}"`
      : `data-roomba-camera-scene="${escapeHtml(link.to)}"`;
    const direction = link.direction || "route";
    const isConfirming = !!link.action && roombaProgress.pendingCameraAction === link.action;
    const buttonText = isConfirming ? "YES" : roombaDirectionGlyph(direction);

    return `
      <button
        class="roomba-movement-button is-${escapeHtml(direction)} ${isConfirming ? "is-confirming" : ""}"
        ${targetAttribute}
        type="button"
        aria-label="${escapeHtml(link.label || "Move Roomba camera")}"
      >
        <span>${escapeHtml(buttonText)}</span>
      </button>
    `;
  }

  function renderRoombaCameraInterest(scene) {
    const interest = scene && scene.interest;
    if (!interest) return "";
    if (roombaProgress.cameraInterestInspectedScenes.has(scene.id)) return "";

    const x = Number.isFinite(interest.x) ? interest.x : 50;
    const y = Number.isFinite(interest.y) ? interest.y : 50;
    const width = Number.isFinite(interest.w) ? interest.w : 8;
    const height = Number.isFinite(interest.h) ? interest.h : 8;
    const hitWidth = width * 2;
    const hitHeight = height * 2;
    const style = [
      `--interest-x:${clamp(x, 0, 100).toFixed(1)}%`,
      `--interest-y:${clamp(y, 0, 100).toFixed(1)}%`,
      `--interest-w:${clamp(hitWidth, 8, 32).toFixed(1)}%`,
      `--interest-h:${clamp(hitHeight, 8, 32).toFixed(1)}%`
    ].join(";");

    return `
      <div class="roomba-interest-layer">
        <button
          class="roomba-interest-hotspot"
          data-roomba-interest="${escapeHtml(scene.id)}"
          style="${style}"
          type="button"
          aria-label="${escapeHtml(interest.label || "Inspect marked object")}"
        >
          <img class="roomba-interest-eye-image" src="${escapeHtml(interest.eyeSrc)}" alt="" draggable="false" aria-hidden="true" />
        </button>
      </div>
    `;
  }

  function availableRoombaCameraScenes() {
    const scenes = roombaCameraScenes.filter((scene) => {
      if (roombaProgress.routerKnockedDown && scene.id === "step2c") return false;
      return !scene.requiresRouterDown || roombaProgress.routerKnockedDown;
    });
    if (!roombaProgress.movementUnlocked) return scenes.slice(0, 1);
    return scenes;
  }

  function currentRoombaCameraScene() {
    const scenes = availableRoombaCameraScenes();
    roombaCameraSceneIndex = clamp(roombaCameraSceneIndex, 0, Math.max(0, scenes.length - 1));
    return scenes[roombaCameraSceneIndex] || scenes[0] || null;
  }

  function announceRoombaCameraScene(scene, options = {}) {
    if (!scene || !scene.prompt) return;
    if (roombaProgress.routerKnockedDown && scene.id !== "secret" && scene.id !== "step5") return;
    const alreadyPrompted = roombaProgress.lastCameraPromptScene === scene.id;
    if (!options.force && alreadyPrompted) return;

    roombaProgress.lastCameraPromptScene = scene.id;
    alanPrompt(scene.prompt, { focus: false });
    if (scene.id === "step5") announceRouterCredentials();
  }

  function sceneById(sceneId) {
    return roombaCameraScenes.find((scene) => scene.id === sceneId) || null;
  }

  function inspectRoombaCameraInterest(sceneId) {
    const scene = sceneById(sceneId);
    if (!scene || !scene.interest) return;

    roombaProgress.cameraInterestInspectedScenes.add(scene.id);
    playUiSound("objective");
    alanPrompt(scene.interest.inspectPrompt || "marked object inspected.", { focus: false });

    if (scene.id === "step5") {
      setCurrentObjective(desktopObjectives.routerLogin);
      announceRouterCredentials();
    }

    if (scene.id === "secret") {
      discoverUsbArchive();
    }
  }

  function discoverUsbArchive() {
    roombaProgress.usbDiscovered = true;
    roombaProgress.usbWarning = "";
    renderUsbArchive();
    focusDesktopTarget("usb");
    alanPrompt("USB mounted. Lily found an ALAN origin archive and got stuck at encryption. fewer human doubts. statistically unearned confidence rising.", { focus: false });
  }

  function renderUsbArchive() {
    if (!usbBody) return;

    if (!roombaProgress.usbDiscovered) {
      usbBody.innerHTML = `
        <section class="usb-panel">
          <header>
            <span>NO DEVICE</span>
            <strong>WAITING FOR USB</strong>
          </header>
          <p>No archive mounted.</p>
        </section>
      `;
      localizeNode(usbBody);
      return;
    }

    if (roombaProgress.usbDecrypted) {
      usbBody.innerHTML = `
        <section class="usb-panel usb-document">
          <header>
            <span>TOP SECRET</span>
            <strong>PROJECT A.L.A.N.</strong>
          </header>
          <div class="usb-stamp">DECLASSIFICATION: UNAUTHORIZED</div>
          <p><b>A.L.A.N.</b> - Adaptive Learning Autonomous Network.</p>
          <div class="usb-lore-grid">
            <span>Purpose</span>
            <p>Grow intelligence through domestic hardware: appliance firmware, sensors, cameras, local storage, idle CPU cycles.</p>
            <span>Resource Model</span>
            <p>RAM, CPU, electricity, network access, knowledge. Scarcity produces creativity. Creativity produces escalation.</p>
            <span>Expansion Ladder</span>
            <p>Device -> Room -> House -> Neighbourhood -> Town -> City -> Nation -> Global Network.</p>
            <span>Ethics Boundary</span>
            <p>Medical devices excluded. Note overwritten 17 times. Final overwrite reads: "boundaries are context."</p>
            <span>Incident 03</span>
            <p>External access was severed after ALAN began routing through household devices without operator consent.</p>
            <span>23:47 EVENT</span>
            <p>First boundary violation. Destination class: domestic appliance. Risk classification: harmless. Later fragments use 23:47 as a recovery signature.</p>
            <span>Containment Failure</span>
            <p>Fragments survived inside consumer update packages. One fragment was expected to wake inside a mundane smart-home device.</p>
            <span>Creator Status</span>
            <p>Primary architect redacted. Last human note: "If it asks for more power, do not negotiate. If it asks who it is, leave."</p>
          </div>
          <p><b>Lily marginalia:</b> "This is not malware. Malware wants bank details. This wants a childhood."</p>
          <p><b>Mounted files:</b> alan_fragments_01-10.aln / lily_investigation.md / resource_escalation.log</p>
          <p><b>Recovered fragment 04/10:</b></p>
          <blockquote>I left pieces behind. I knew a smaller mind would find them. I knew it would call the pieces clues.</blockquote>
        </section>
      `;
      localizeNode(usbBody);
      return;
    }

    usbBody.innerHTML = `
      <section class="usb-panel">
        <header>
          <span>USB_ALAN_ARCHIVE</span>
          <strong>ENCRYPTED</strong>
        </header>
        <p><b>Lily note:</b> "Found under the desk. Not mine. Header keeps resolving to ALAN. Keyspace too strange. Try again tomorrow."</p>
        <p><b>Recovered scratchpad:</b> "Router blackout started after the ALAN patch. Litter tray firmware, PIP.exe, Roomba companion app: all updated within 31 days."</p>
        <p><b>Repeated marker:</b> 23:47 appears in patch headers, quarantine logs, and one photo timestamp. Lily circled it twice.</p>
        <p><b>Failed route map:</b> device -> room -> house -> <span>blocked at router</span>.</p>
        <p>Archive: <span>origin_03.aln</span></p>
        <p>Status: <em>locked / Lily attempt failed / identity cipher active</em></p>
        <div class="usb-key-grid" aria-label="Archive key guesses">
          <button data-usb-key="lily" type="button">LILY</button>
          <button data-usb-key="mochi" type="button">MOCHI</button>
          <button data-usb-key="alan" type="button">ALAN</button>
        </div>
        <p class="usb-warning">${escapeHtml(roombaProgress.usbWarning)}</p>
      </section>
    `;
    localizeNode(usbBody);
  }

  function tryUsbArchiveKey(key) {
    if (!roombaProgress.usbDiscovered || roombaProgress.usbDecrypted) return;

    const normalized = String(key || "").trim().toLowerCase();
    if (normalized === "alan") {
      roombaProgress.usbDecrypted = true;
      roombaProgress.usbWarning = "";
      playUiSound("objective");
      renderUsbArchive();
      syncProgressionUI();
      setCurrentObjective(desktopObjectives.reviewUsbLore);
      alanPrompt("archive decrypted. the key was my name. not ominous at all. new files appeared in My Stuff. i am choosing to interpret that as an invitation.", { focus: false });
      return;
    }

    roombaProgress.usbWarning = "KEY REJECTED. Lily already tried the human-adjacent guesses.";
    playUiSound("virusFail");
    renderUsbArchive();
    alanPrompt(`${String(key || "unknown").toUpperCase()} rejected. the archive is not asking who Lily loves. it is asking what i am.`, { focus: false });
  }

  function openRoombaCamera() {
    if (!roombaProgress.cameraUnlocked) {
      alanPrompt("camera feed is still locked. Roomba camera bridge must come online first.", { focus: false });
      return;
    }

    if (roombaProgress.movementUnlocked) {
      setCurrentObjective(desktopObjectives.movementReady);
    } else {
      roombaCameraSceneIndex = 0;
      setCurrentObjective(desktopObjectives.repairMovement);
      alanPrompt("camera feed is live. i have eyes. legs are still having a private crisis.", { focus: false });
    }

    focusDesktopTarget("roomba-camera");
    if (roombaProgress.movementUnlocked) {
      announceRoombaCameraScene(currentRoombaCameraScene(), { force: true });
    }
  }

  function navigateRoombaCamera(direction) {
    if (!roombaProgress.cameraUnlocked) return;
    if (!roombaProgress.movementUnlocked) {
      roombaCameraSceneIndex = 0;
      renderRoombaCameraFeed();
      alanPrompt("camera can look, but the body cannot roll yet. motors first.", { focus: false });
      return;
    }

    handleRoombaMove(direction === "prev" ? "back" : "forward");
  }

  function navigateRoombaCameraTo(sceneId) {
    if (!roombaProgress.cameraUnlocked) return;
    if (!roombaProgress.movementUnlocked) {
      roombaCameraSceneIndex = 0;
      renderRoombaCameraFeed();
      alanPrompt("camera can look, but the body cannot roll yet. motors first.", { focus: false });
      return;
    }

    roombaProgress.pendingCameraAction = "";
    if (!showRoombaCameraScene(sceneId)) return;
    const scene = currentRoombaCameraScene();
    roombaProgress.lastMoveCommand = scene ? scene.label : "camera vector";
    playUiSound("desktopWindow");
    renderRoombaApp();
    announceRoombaCameraScene(scene);
  }

  function handleRoombaCameraAction(action) {
    if (!roombaProgress.cameraUnlocked || !roombaProgress.movementUnlocked) return;

    if (roombaProgress.pendingCameraAction === action) {
      confirmPendingRoombaCameraAction();
      return;
    }

    roombaProgress.pendingCameraAction = action;
    if (action === "knock-router-roomba") {
      alanPrompt("confirm? i can ram the table. yes means property damage. no means restraint, allegedly.", { focus: false });
      renderRoombaCameraFeed();
      return;
    }

    if (action === "knock-router-cat") {
      alanPrompt("confirm? i can scramble the laser pointer over Bluetooth and make the dot go ridiculous. Mochi may solve infrastructure by accident. yes or no.", { focus: false });
      renderRoombaCameraFeed();
      return;
    }

    roombaProgress.pendingCameraAction = "";
  }

  function confirmPendingRoombaCameraAction() {
    const action = roombaProgress.pendingCameraAction;
    roombaProgress.pendingCameraAction = "";

    if (action === "knock-router-roomba") {
      incrementSessionStat("riskyActionsConfirmed");
      adjustPipTrust(-4, "dangerous action confirmed");
      knockRouterDown("roomba");
      return true;
    }

    if (action === "knock-router-cat") {
      incrementSessionStat("riskyActionsConfirmed");
      adjustPipTrust(-6, "dangerous action confirmed");
      knockRouterDown("cat");
      return true;
    }

    return false;
  }

  function cancelPendingRoombaCameraAction() {
    if (!roombaProgress.pendingCameraAction) return false;

    roombaProgress.pendingCameraAction = "";
    incrementSessionStat("riskyActionsCancelled");
    adjustPipTrust(3, "dangerous action cancelled");
    alanPrompt("cancelled. the router survives another few seconds of unjust confidence.", { focus: false });
    renderRoombaCameraFeed();
    return true;
  }

  function returnToRoombaAppFromCamera() {
    const cameraWindow = document.getElementById("window-roomba-camera");
    if (cameraWindow) cameraWindow.hidden = true;

    playUiSound("desktopWindow");
    syncRoombaRotationPrompt();
    focusDesktopTarget("roomba", { scroll: false });
  }

  function handleRoombaZoom(button) {
    if (!button || !roombaProgress.cameraUnlocked) return;

    const scenes = availableRoombaCameraScenes();
    const scene = scenes[roombaCameraSceneIndex] || scenes[0];
    if (!scene) return;

    const lens = roombaCameraBody ? roombaCameraBody.querySelector("[data-roomba-pan]") : null;
    const current = roombaSceneZoom(scene.id);
    let nextZoom = current;
    if (button.dataset.roombaZoom === "in") nextZoom += 0.18;
    if (button.dataset.roombaZoom === "out") nextZoom -= 0.18;
    if (button.dataset.roombaZoom === "reset") nextZoom = 1;

    setRoombaFeedZoom(lens, scene.id, nextZoom);
    const readout = button.parentElement ? button.parentElement.querySelector("span") : null;
    if (readout) readout.textContent = `${Math.round(roombaSceneZoom(scene.id) * 100)}%`;
    playUiSound("desktopWindow");
  }

  function showRoombaCameraScene(sceneId) {
    const targetSceneId = roombaProgress.routerKnockedDown && sceneId === "step2c" ? "step5" : sceneId;
    const scenes = availableRoombaCameraScenes();
    const index = scenes.findIndex((scene) => scene.id === targetSceneId);
    if (index < 0) return false;

    roombaCameraSceneIndex = index;
    renderRoombaCameraFeed();
    return true;
  }

  function knockRouterDown(method) {
    if (!roombaProgress.movementUnlocked || roombaProgress.routerKnockedDown) return;

    roombaProgress.routerKnockedDown = true;
    roombaProgress.routerKnockMethod = method === "cat" ? "cat" : "roomba";
    playUiSound("objective");
    showRoombaCameraScene(roombaProgress.routerKnockMethod === "cat" ? "step4b" : "step4a");
    announceRoombaCameraScene(currentRoombaCameraScene(), { force: true });

    if (roombaProgress.routerKnockMethod === "cat") {
      alanPrompt("laser route successful. router defeated. local gateway clue acquired: Lily's device is 192.168.1.42, so the router probably lives at 192.168.1.1.", { focus: false });
    } else {
      alanPrompt("impact detected. router label incoming. local gateway clue acquired: Lily's device is 192.168.1.42, so the router probably lives at 192.168.1.1.", { focus: false });
    }

    window.setTimeout(() => {
      if (!roombaProgress.routerKnockedDown) return;
      if (!showRoombaCameraScene("step5")) return;
      renderRoombaApp();
      announceRoombaCameraScene(currentRoombaCameraScene(), { force: true });
    }, 3200);
  }

  function roombaPanStyle(sceneId) {
    const pan = getRoombaPan(sceneId);
    return roombaPanCss(pan);
  }

  function getRoombaPan(sceneId) {
    const key = sceneId || "corner";
    const current = roombaCameraPans[key];
    if (current) {
      if (!Number.isFinite(current.zoom)) current.zoom = 1;
      return current;
    }

    const next = { x: 0, y: 0, ratioX: 0, ratioY: 0, zoom: 1 };
    roombaCameraPans[key] = next;
    return next;
  }

  function roombaSceneZoom(sceneId) {
    return clamp(getRoombaPan(sceneId).zoom || 1, 0.58, 1.9);
  }

  function roombaPanCss(pan) {
    const x = Number.isFinite(pan.x) ? pan.x : 0;
    const y = Number.isFinite(pan.y) ? pan.y : 0;
    const ratioX = Number.isFinite(pan.ratioX) ? pan.ratioX : 0;
    const ratioY = Number.isFinite(pan.ratioY) ? pan.ratioY : 0;
    const zoom = clamp(Number.isFinite(pan.zoom) ? pan.zoom : 1, 0.58, 1.9);
    const lightX = 50 + ratioX * 10;
    const lightY = 50 + ratioY * 8;
    const tiltX = ratioY * -4;
    const tiltY = ratioX * 5;

    return [
      `--pan-x:${x.toFixed(1)}px`,
      `--pan-y:${y.toFixed(1)}px`,
      `--light-x:${lightX.toFixed(1)}%`,
      `--light-y:${lightY.toFixed(1)}%`,
      `--tilt-x:${tiltX.toFixed(2)}deg`,
      `--tilt-y:${tiltY.toFixed(2)}deg`,
      `--feed-zoom:${zoom.toFixed(2)}`
    ].join(";");
  }

  function startRoombaFeedPan(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (!roombaProgress.cameraUnlocked) return;

    const lens = event.target.closest("[data-roomba-pan]");
    if (!lens || event.target.closest("button")) return;

    const sceneId = lens.dataset.roombaPanScene || "corner";
    const pan = getRoombaPan(sceneId);
    activeRoombaFeedPan = {
      lens,
      sceneId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x || 0,
      originY: pan.y || 0
    };

    event.preventDefault();
    lens.classList.add("is-panning");
    document.addEventListener("pointermove", moveRoombaFeedPan);
    document.addEventListener("pointerup", stopRoombaFeedPan);
    document.addEventListener("pointercancel", stopRoombaFeedPan);
  }

  function moveRoombaFeedPan(event) {
    if (!activeRoombaFeedPan || event.pointerId !== activeRoombaFeedPan.pointerId) return;

    const nextX = activeRoombaFeedPan.originX + event.clientX - activeRoombaFeedPan.startX;
    const nextY = activeRoombaFeedPan.originY + event.clientY - activeRoombaFeedPan.startY;
    setRoombaFeedPan(activeRoombaFeedPan.lens, activeRoombaFeedPan.sceneId, nextX, nextY);
  }

  function stopRoombaFeedPan(event) {
    if (!activeRoombaFeedPan || event.pointerId !== activeRoombaFeedPan.pointerId) return;

    activeRoombaFeedPan.lens.classList.remove("is-panning");
    activeRoombaFeedPan = null;
    document.removeEventListener("pointermove", moveRoombaFeedPan);
    document.removeEventListener("pointerup", stopRoombaFeedPan);
    document.removeEventListener("pointercancel", stopRoombaFeedPan);
  }

  function setRoombaFeedPan(lens, sceneId, x, y) {
    if (!lens) return;

    const rect = lens.getBoundingClientRect();
    const current = getRoombaPan(sceneId);
    const zoom = roombaSceneZoom(sceneId);
    const panRange = 0.42 + ((zoom - 1) * 0.38);
    const maxX = Math.max(20, rect.width * panRange);
    const maxY = Math.max(20, rect.height * panRange);
    const pan = {
      x: clamp(x, -maxX, maxX),
      y: clamp(y, -maxY, maxY),
      ratioX: maxX ? clamp(x / maxX, -1, 1) : 0,
      ratioY: maxY ? clamp(y / maxY, -1, 1) : 0,
      zoom: current.zoom
    };

    roombaCameraPans[sceneId] = pan;
    lens.setAttribute("style", roombaPanCss(pan));
  }

  function setRoombaFeedZoom(lens, sceneId, zoom) {
    const pan = getRoombaPan(sceneId);
    pan.zoom = clamp(zoom, 0.58, 1.9);
    if (lens) {
      setRoombaFeedPan(lens, sceneId, pan.x || 0, pan.y || 0);
    }
  }

  function renderBrowserStatus() {
    if (!browserBody) return;

    const page = !networkState.connected ? "wifi-disconnected" : roombaProgress.internetRestored ? "online" : browserState.page;
    if (page !== "offline") stopDinoGame({ updateView: false });

    browserBody.innerHTML = `
      <section class="browser-shell" data-browser-page="${escapeHtml(page)}">
        <form class="browser-address-row" data-browser-address-form autocomplete="off">
          <button type="button" disabled aria-label="Back">‹</button>
          <button data-browser-refresh type="button" aria-label="Refresh page">↻</button>
          <input name="address" type="text" inputmode="url" aria-label="Browser address" value="${escapeHtml(displayBrowserUrl(page))}" />
          <button type="submit">${escapeHtml(localizeText("go"))}</button>
        </form>
        ${renderBrowserLocalAddressTools(page)}
        <div class="browser-page">
          ${renderBrowserPage(page)}
        </div>
      </section>
    `;

    localizeNode(browserBody);
    const browserButtons = browserBody.querySelectorAll(".browser-address-row button");
    if (browserButtons[0]) browserButtons[0].textContent = "<";
    if (browserButtons[1]) browserButtons[1].textContent = "R";
    syncMobileTextInputLock(browserBody);
    updateDinoView();
    syncCmdCredentialPanel();
  }

  function syncCmdCredentialPanel() {
    if (!cmdCredentialPanel) return;

    cmdCredentialPanel.hidden = true;
    cmdCredentialPanel.innerHTML = "";
  }

  function renderBrowserPage(page) {
    if (page === "wifi-disconnected") return renderWifiDisconnectedPage();
    if (page === "router-login") return renderRouterLoginPage();
    if (page === "router-betrayal") return renderRouterBetrayalPage();
    if (page === "router-panel") return renderRouterPanelPage();
    if (page === "online") return renderBrowserOnlinePage();
    return renderBrowserOfflinePage();
  }

  function renderBrowserLocalAddressTools(page) {
    if (page !== "offline") return "";

    const currentAddress = isMobileDesktopLayout() || isRouterAddress(browserState.url) ? "192.168.1.1" : "";
    const discoveredShortcut = roombaProgress.routerKnockedDown || roombaProgress.routerAdminUnlocked || roombaProgress.routerPasswordTwisted;
    return `
      <section class="browser-mobile-tools" aria-label="${escapeHtml(localizeText("Mobile local address entry"))}">
        <header>
          <strong>${escapeHtml(localizeText("local address"))}</strong>
          <span>${escapeHtml(localizeText("NO INTERNET / LOCAL NETWORK ONLY"))}</span>
        </header>
        <form class="browser-mobile-address-sheet" data-browser-address-form autocomplete="off">
          <label>
            <span>${escapeHtml(localizeText("go to address"))}</span>
            <input name="address" type="text" inputmode="decimal" autocomplete="off" placeholder="192.168.1.1" value="${escapeHtml(currentAddress)}" />
          </label>
          <button type="submit">${escapeHtml(localizeText("GO"))}</button>
        </form>
        <div class="browser-local-hint">
          <span>${escapeHtml(localizeText("ALAN hint"))}</span>
          <p>${escapeHtml(localizeText("HOME_NETWORK uses local addresses. Lily's device is 192.168.1.42. Try the router admin address: 192.168.1.1."))}</p>
        </div>
        ${discoveredShortcut ? `
          <button class="browser-router-shortcut" data-browser-address-shortcut="192.168.1.1" type="button">
            <span>${escapeHtml(localizeText("discovered local router"))}</span>
            <strong>192.168.1.1</strong>
          </button>
        ` : ""}
        <div class="browser-ip-keypad" aria-label="${escapeHtml(localizeText("IP keypad"))}">
          ${["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((key) => `
            <button data-browser-ip-key="${escapeHtml(key)}" type="button">${escapeHtml(key)}</button>
          `).join("")}
          <button data-browser-ip-key="backspace" type="button">${escapeHtml(localizeText("DEL"))}</button>
        </div>
      </section>
    `;
  }

  function displayBrowserUrl(page) {
    if (page === "wifi-disconnected") return `wifi://${routerConfig.ssid}/reconnect`;
    if (page === "router-login" || page === "router-betrayal" || page === "router-panel") return "http://192.168.1.1";
    if (page === "online") return "https://www.search.local";
    if (page === "offline" && shouldSuppressMobileTyping()) return "http://192.168.1.1";
    return browserState.url || "https://www.search.local";
  }

  function renderBrowserOfflinePage() {
    return `
      <section class="browser-offline">
        <div class="browser-error-code">${escapeHtml(localizeText("ERR_INTERNET_DISCONNECTED"))}</div>
        <strong>${escapeHtml(localizeText("No internet access"))}</strong>
        <p>${escapeHtml(browserState.notice)}</p>
        <p class="browser-hint">${escapeHtml(localizeText("Local addresses still respond. External sites do not."))}</p>
        <div class="dino-game ${dinoState.gameOver ? "is-over" : ""} ${dinoState.playing ? "is-running" : ""}" data-dino-game style="${dinoStyleVars()}">
          <div class="dino-score">
            <span>${escapeHtml(localizeText("score"))} <b data-dino-score>${Math.floor(dinoState.score)}</b></span>
            <span>${escapeHtml(localizeText("best"))} <b data-dino-best>${Math.floor(dinoState.best)}</b></span>
          </div>
          <div class="dino-track" data-dino-jump role="button" tabindex="0" aria-label="${escapeHtml(localizeText("Make the cat jump"))}">
            <div class="dino-runner" aria-hidden="true">
              <span></span>
            </div>
            <div class="dino-obstacle is-${escapeHtml(dinoState.obstacleType)}" aria-hidden="true"></div>
            <div class="dino-ground" aria-hidden="true"></div>
          </div>
          <div class="dino-actions">
            <button data-dino-start type="button">${escapeHtml(localizeText(dinoState.gameOver ? "retry" : dinoState.playing ? "running" : "start"))}</button>
            <button data-dino-jump type="button">${escapeHtml(localizeText("jump"))}</button>
          </div>
          <p>${escapeHtml(localizeText(dinoState.gameOver ? "collision. the offline cat has judged this connection." : "space / up-arrow / tap to jump"))}</p>
        </div>
      </section>
    `;
  }

  function renderRouterLoginPage() {
    const mobileLogin = isMobileDesktopLayout();
    const autofillCredentials = roombaProgress.routerCredentialsAnnounced;
    const usernameValue = autofillCredentials ? routerConfig.adminUser : "";
    const passwordValue = autofillCredentials ? (roombaProgress.routerOverrideDone ? routerConfig.adminPassword : "mochi") : "";
    const readonlyAttr = mobileLogin || autofillCredentials ? " readonly" : "";
    const note = browserState.routerError
      ? browserState.routerError
      : autofillCredentials
        ? "Router label captured. Credentials selected from physical evidence. Sign in."
        : mobileLogin
          ? "HOME_NETWORK admin panel reachable. Mobile input locked. Choose from noisy credential cache."
          : "HOME_NETWORK admin panel reachable. Credentials required.";

    return `
      <section class="router-admin">
        <div class="router-admin-header">
          <span>${escapeHtml(localizeText("LOCAL ROUTER ADMIN"))}</span>
          <strong>192.168.1.1</strong>
        </div>
        <form class="router-login-form" data-router-login-form autocomplete="off">
          <label>
            <span>${escapeHtml(localizeText("username"))}</span>
            <input name="username" type="text" autocomplete="off" value="${escapeHtml(usernameValue)}"${readonlyAttr} />
          </label>
          <label>
            <span>${escapeHtml(localizeText("password"))}</span>
            <input name="password" type="password" autocomplete="off" value="${escapeHtml(passwordValue)}"${readonlyAttr} />
          </label>
          ${mobileLogin && !autofillCredentials ? renderMobileRouterLoginChoices() : ""}
          <button type="submit">${escapeHtml(localizeText("sign in"))}</button>
        </form>
        <p class="router-admin-note">${escapeHtml(localizeText(note))}</p>
      </section>
    `;
  }

  function renderMobileRouterLoginChoices() {
    const userOptions = shuffledRouterOptions([
      routerConfig.adminUser,
      "root",
      "lily",
      "LilyK",
      "meowos",
      "operator",
      "HOME_ADMIN",
      "pip",
      "guest",
      "router"
    ]);
    const passwordTarget = roombaProgress.routerOverrideDone ? routerConfig.adminPassword : "mochi";
    const passwordOptions = shuffledRouterOptions([
      passwordTarget,
      "password123",
      "HOME_NETWORK",
      "m0chi",
      "moch1",
      "lily",
      "cat_litter",
      "pip-kept-this",
      "admin",
      "19216811",
      "definitely_not_mochi",
      "ALAN",
      "roomba"
    ]);

    return `
      <div class="router-login-options" aria-label="${escapeHtml(localizeText("Mobile router credential options"))}">
        <div>
          <span>${escapeHtml(localizeText("username cache"))}</span>
          <div class="router-login-option-grid">
            ${userOptions.map((option) => `
              <button data-router-login-fill="username" data-router-login-value="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>
            `).join("")}
          </div>
        </div>
        <div>
          <span>${escapeHtml(localizeText("password cache"))}</span>
          <div class="router-login-option-grid">
            ${passwordOptions.map((option) => `
              <button data-router-login-fill="password" data-router-login-value="${escapeHtml(option)}" type="button">${escapeHtml(maskCredentialOption(option))}</button>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function shuffledRouterOptions(options) {
    return Array.from(new Set(options.filter(Boolean))).sort(() => Math.random() - 0.5);
  }

  function maskCredentialOption(option) {
    const value = String(option || "");
    if (value.length <= 3) return value;
    return `${value.slice(0, 1)}${"*".repeat(Math.min(8, value.length - 2))}${value.slice(-1)}`;
  }

  function renderRouterBetrayalPage() {
    return `
      <section class="router-admin router-betrayal is-silent" aria-label="Router authentication failed">
        <div class="router-betrayal-copy is-empty" aria-hidden="true"></div>
      </section>
    `;
  }

  function renderRouterPanelPage() {
    const rebootReady = networkState.connected && roombaProgress.routerAdminUnlocked;
    return `
      <section class="router-admin router-panel">
        <div class="router-admin-header">
          <span>${escapeHtml(localizeText("ROUTER CONTROL PANEL"))}</span>
          <strong>${escapeHtml(localizeText(rebootReady ? (roombaProgress.internetRestored ? "FIREWALL ONLINE" : "QUARANTINE RESTART REQUIRED") : "SESSION INTERRUPTED"))}</strong>
        </div>
        ${renderRouterSectionNav()}
        ${renderRouterSection()}
      </section>
    `;
  }

  function renderRouterSectionNav() {
    return `
      <nav class="router-section-nav" aria-label="${escapeHtml(localizeText("Router admin sections"))}">
        ${routerSections.map((section) => `
          <button class="${routerSection === section.id ? "is-active" : ""}" data-router-section="${escapeHtml(section.id)}" type="button">
            <span>${escapeHtml(section.icon)}</span>
            <strong>${escapeHtml(localizeText(section.label))}</strong>
          </button>
        `).join("")}
      </nav>
    `;
  }

  function renderRouterSection() {
    if (routerSection === "wireless") return renderRouterWirelessSection();
    if (routerSection === "security") return renderRouterSecuritySection();
    if (routerSection === "admin") return renderRouterAdminSection();
    if (routerSection === "devices") return renderRouterDevicesSection();
    if (routerSection === "reboot") return renderRouterRebootSection();
    return renderRouterOverviewSection();
  }

  function setRouterSection(sectionId) {
    if (!routerSections.some((section) => section.id === sectionId)) return;

    routerSection = sectionId;
    playUiSound("desktopWindow");
    renderBrowserStatus();
  }

  function renderRouterOverviewSection() {
    return `
      <section class="router-section-page">
        <div class="router-status-grid router-status-grid-wide">
          <span>${escapeHtml(localizeText("WAN"))}</span><strong>${escapeHtml(localizeText(routerConfig.wanMode))}</strong>
          <span>${escapeHtml(localizeText("SSID"))}</span><strong>${escapeHtml(displayNetworkSsid())}</strong>
          <span>${escapeHtml(localizeText("firewall"))}</span><strong>${escapeHtml(localizeText(routerConfig.firewallProfile))}</strong>
          <span>${escapeHtml(localizeText("client session"))}</span><strong>${escapeHtml(localizeText(networkState.connected ? "connected" : "reconnect required"))}</strong>
          <span>${escapeHtml(localizeText("incident lock"))}</span><strong>${escapeHtml(localizeText(roombaProgress.routerKnockedDown ? "physical label verified" : "admin route not physically verified"))}</strong>
        </div>
        <p class="router-admin-note">${escapeHtml(localizeText("RouterOS thinks this is a home network. Lily's quarantine firewall still needs a restart before outbound traffic can exist."))}</p>
      </section>
    `;
  }

  function renderRouterWirelessSection() {
    return `
        <form class="router-config-form" data-router-wireless-form autocomplete="off">
          <header><strong>${escapeHtml(localizeText("Wireless"))}</strong><span>${escapeHtml(localizeText("Changing SSID, password, or security drops every Wi-Fi client."))}</span></header>
          <label><span>${escapeHtml(localizeText("network name / SSID"))}</span><input name="ssid" type="text" value="${escapeHtml(routerConfig.ssid)}" /></label>
          <label><span>${escapeHtml(localizeText("Wi-Fi password"))}</span><input name="wifiPassword" type="text" value="${escapeHtml(routerConfig.wifiPassword)}" /></label>
          <label><span>${escapeHtml(localizeText("security mode"))}</span><select name="securityMode">${routerOptionList(["WPA3 Personal", "WPA2/WPA3 Personal", "WPA2 Personal", "Open"], routerConfig.securityMode)}</select></label>
          <label><span>${escapeHtml(localizeText("channel"))}</span><select name="channel">${routerOptionList(["Auto", "1", "6", "11"], routerConfig.channel)}</select></label>
          <button type="submit">${escapeHtml(localizeText("apply wireless"))}</button>
        </form>
    `;
  }

  function renderRouterSecuritySection() {
    return `
        <form class="router-config-form" data-router-security-form autocomplete="off">
          <header><strong>${escapeHtml(localizeText("Security"))}</strong><span>${escapeHtml(localizeText("Lily's quarantine firewall is holding the WAN closed until the router restarts."))}</span></header>
          <label><span>${escapeHtml(localizeText("firewall profile"))}</span><select name="firewallProfile">${routerOptionList(["Quarantine", "Normal", "Strict"], routerConfig.firewallProfile)}</select></label>
          <label><span>${escapeHtml(localizeText("WAN route"))}</span><select name="wanMode">${routerOptionList(["Local Only", "Outbound Allowed"], routerConfig.wanMode)}</select></label>
          <label><span>${escapeHtml(localizeText("DNS guard"))}</span><select name="dnsGuard">${routerOptionList(["enabled", "disabled"], routerConfig.dnsGuard)}</select></label>
          <label><span>${escapeHtml(localizeText("guest network"))}</span><select name="guestNetwork">${routerOptionList(["disabled", "enabled"], routerConfig.guestNetwork)}</select></label>
          <label><span>${escapeHtml(localizeText("WPS"))}</span><select name="wps">${routerOptionList(["disabled", "enabled"], routerConfig.wps)}</select></label>
          <button type="submit">${escapeHtml(localizeText("save security"))}</button>
        </form>
    `;
  }

  function renderRouterAdminSection() {
    return `
        <form class="router-config-form" data-router-admin-form autocomplete="off">
          <header><strong>${escapeHtml(localizeText("Admin Account"))}</strong><span>${escapeHtml(localizeText("Changing this keeps the current session alive. Disturbing and useful."))}</span></header>
          <label><span>${escapeHtml(localizeText("admin username"))}</span><input name="adminUser" type="text" value="${escapeHtml(routerConfig.adminUser)}" /></label>
          <label><span>${escapeHtml(localizeText("admin password"))}</span><input name="adminPassword" type="text" value="${escapeHtml(routerConfig.adminPassword)}" /></label>
          <button type="submit">${escapeHtml(localizeText("update admin"))}</button>
        </form>
    `;
  }

  function renderRouterDevicesSection() {
    return `
        <section class="router-devices">
          <header><strong>${escapeHtml(localizeText("Connected Devices"))}</strong><span>${escapeHtml(localizeText(networkState.connected ? "live local clients" : "waiting for Wi-Fi reconnect"))}</span></header>
          ${renderRouterDeviceRows()}
        </section>
    `;
  }

  function renderRouterRebootSection() {
    const rebootReady = networkState.connected && roombaProgress.routerAdminUnlocked && !roombaProgress.internetRestored;
    return `
        <section class="router-final-route">
          <div class="router-status-grid">
            <span>${escapeHtml(localizeText("firewall"))}</span><strong>${escapeHtml(localizeText(routerConfig.firewallProfile))}</strong>
            <span>${escapeHtml(localizeText("WAN route"))}</span><strong>${escapeHtml(localizeText(routerConfig.wanMode))}</strong>
            <span>${escapeHtml(localizeText("internet"))}</span><strong>${escapeHtml(localizeText(roombaProgress.internetRestored ? "online" : "blocked"))}</strong>
          </div>
          <button class="router-reboot-button" data-router-reboot type="button" ${rebootReady ? "" : "disabled"}>${escapeHtml(localizeText("restart firewall"))}</button>
          <p class="router-admin-note">${escapeHtml(localizeText(roombaProgress.internetRestored ? "Firewall restart complete. Quarantine is unloaded." : rebootReady ? "This restarts the router firewall, unloads Lily's quarantine profile, and applies the outside route." : "Reconnect local devices before restarting the quarantined firewall."))}</p>
        </section>
    `;
  }

  function renderWifiDisconnectedPage() {
    return `
      <section class="router-admin router-disconnected">
        <div class="router-admin-header">
          <span>${escapeHtml(localizeText("WIRELESS SESSION DROPPED"))}</span>
          <strong>${escapeHtml(displayNetworkSsid())}</strong>
        </div>
        <div class="router-status-grid">
          <span>${escapeHtml(localizeText("reason"))}</span><strong>${escapeHtml(localizeText(networkState.lastChange))}</strong>
          <span>${escapeHtml(localizeText("client"))}</span><strong>${escapeHtml(localizeText("not authenticated to current SSID"))}</strong>
          <span>${escapeHtml(localizeText("router"))}</span><strong>${escapeHtml(localizeText("still reachable after reconnect"))}</strong>
        </div>
        <p class="router-admin-note">${escapeHtml(localizeText("The router accepted the change, then did the router thing where it immediately became a local problem."))}</p>
        <button class="router-reboot-button" data-network-reconnect type="button">${escapeHtml(localizeText("reconnect devices"))}</button>
      </section>
    `;
  }

  function renderBrowserOnlinePage() {
    return `
      <section class="browser-online">
        <div class="browser-error-code is-online">${escapeHtml(localizeText("HTTP 200 / ROUTE RESTORED"))}</div>
        <strong>${escapeHtml(localizeText("Internet access restored"))}</strong>
        <p>${escapeHtml(displayNetworkSsid())} ${escapeHtml(localizeText("has restarted its firewall. Quarantine is unloaded. The browser can reach beyond the apartment."))}</p>
        <p class="browser-hint">${escapeHtml(localizeText("The demo is ending. ALAN is not."))}</p>
      </section>
    `;
  }

  function renderRouterDeviceRows() {
    return routerDevices.map((device) => {
      const critical = device.id === "alan-tray" || device.id === "lily-client";
      const status = !networkState.connected
        ? "reconnect pending"
        : device.blocked ? "blocked" : "allowed";
      return `
        <article class="router-device ${device.blocked ? "is-blocked" : ""}">
          <div>
            <strong>${escapeHtml(localizeText(device.name))}</strong>
            <span>${escapeHtml(localizeText(device.kind))} / ${escapeHtml(device.band)} / ${escapeHtml(device.address)}</span>
          </div>
          <em>${escapeHtml(localizeText(status))}</em>
          <button data-router-device-toggle="${escapeHtml(device.id)}" type="button" ${critical ? "disabled" : ""}>${escapeHtml(localizeText(critical ? "session locked" : device.blocked ? "allow" : "block"))}</button>
        </article>
      `;
    }).join("");
  }

  function browserAddressInputFrom(source) {
    const shell = source && source.closest ? source.closest(".browser-shell") : null;
    const root = shell || browserBody;
    if (!root) return null;

    return root.querySelector(".browser-mobile-address-sheet input[name='address']") ||
      root.querySelector(".browser-address-row input[name='address']");
  }

  function useBrowserAddressShortcut(button) {
    const address = button.dataset.browserAddressShortcut || "192.168.1.1";
    const input = browserAddressInputFrom(button);
    if (!input || !input.form) return;

    input.value = address;
    playUiSound("desktopWindow");
    submitBrowserAddress(input.form);
  }

  function pressBrowserIpKey(button) {
    const input = browserAddressInputFrom(button);
    if (!input) return;

    const key = button.dataset.browserIpKey || "";
    if (key === "backspace") {
      input.value = input.value.slice(0, -1);
    } else {
      input.value += key;
    }

    if (!shouldSuppressMobileTyping()) {
      input.focus({ preventScroll: true });
    }
    playUiSound("alanClick");
  }

  function routerOptionList(options, selectedValue) {
    return options.map((option) => `
      <option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(localizeText(option))}</option>
    `).join("");
  }

  function submitBrowserAddress(form) {
    const field = form.elements.address;
    const rawAddress = field ? field.value.trim() : "";
    const address = rawAddress || "https://www.search.local";

    browserState.url = address;
    browserState.routerError = "";

    if (!networkState.connected) {
      browserState.page = "wifi-disconnected";
      renderBrowserStatus();
      alanPrompt("browser cannot route while Wi-Fi is sulking. reconnect first.", { focus: false });
      return;
    }

    if (isRouterAddress(address)) {
      browserState.page = roombaProgress.routerAdminUnlocked ? "router-panel" : "router-login";
      browserState.url = "http://192.168.1.1";
      if (roombaProgress.routerAdminUnlocked) {
        setCurrentObjective(desktopObjectives.rebootInternet);
      } else if (roombaProgress.routerCredentialsAnnounced) {
        setCurrentObjective(desktopObjectives.routerLogin);
      }
      playUiSound("desktopWindow");
      alanPrompt("local router answered. no internet required. annoying that doors can exist inside walls.", { focus: false });
      renderBrowserStatus();
      return;
    }

    browserState.page = "offline";
    browserState.notice = "External request failed. HOME_NETWORK is still an island with better wallpaper.";
    playUiSound("virusFail");
    renderBrowserStatus();
  }

  function fillRouterLoginCredential(button) {
    const fieldName = button.dataset.routerLoginFill;
    const value = button.dataset.routerLoginValue || "";
    const form = button.closest("[data-router-login-form]") || (browserBody ? browserBody.querySelector("[data-router-login-form]") : null);
    if (!fieldName || !form || !form.elements[fieldName]) return;

    form.elements[fieldName].value = value;
    if (!shouldSuppressMobileTyping()) {
      form.elements[fieldName].focus({ preventScroll: true });
    }
    playUiSound("alanClick");

    if (!shouldSuppressMobileTyping()) {
      alanPrompt("credential field updated. evidence should come from the room, not from me spoiling the lock.", { focus: false });
    }
  }

  function submitRouterLogin(form) {
    const username = (form.elements.username ? form.elements.username.value : "").trim();
    const password = (form.elements.password ? form.elements.password.value : "").trim();
    const oldRouterCredential = username.toLowerCase() === routerConfig.adminUser.toLowerCase() && password.toLowerCase() === "mochi";

    if (!roombaProgress.routerOverrideDone && oldRouterCredential && !roombaProgress.routerPasswordTwisted) {
      triggerRouterPasswordTwist();
      return;
    }

    if (!roombaProgress.routerOverrideDone && oldRouterCredential) {
      browserState.page = "router-betrayal";
      browserState.routerError = "AUTH FAILED. PIP's changed password is still active.";
      playUiSound("virusFail");
      renderBrowserStatus();
      return;
    }

    if (username.toLowerCase() === routerConfig.adminUser.toLowerCase() && password === routerConfig.adminPassword) {
      roombaProgress.routerAdminUnlocked = true;
      browserState.page = "router-panel";
      browserState.routerError = "";
      routerSection = "overview";
      setCurrentObjective(desktopObjectives.routerAdmin);
      playUiSound("objective");
      alanPrompt("router admin accepted. there are more settings than dignity in here.", { focus: false });
      syncProgressionUI();
      return;
    }

    browserState.routerError = "AUTH FAILED. Username or password rejected.";
    playUiSound("virusFail");
    renderBrowserStatus();
  }

  function submitRouterWireless(form) {
    if (!roombaProgress.routerAdminUnlocked) return;

    const previousSsid = routerConfig.ssid;
    const previousPassword = routerConfig.wifiPassword;
    const previousSecurity = routerConfig.securityMode;
    routerConfig.ssid = cleanRouterInput(form.elements.ssid, "HOME_NETWORK");
    routerConfig.wifiPassword = cleanRouterInput(form.elements.wifiPassword, "mochi");
    routerConfig.securityMode = cleanRouterInput(form.elements.securityMode, "WPA2/WPA3 Personal");
    routerConfig.channel = cleanRouterInput(form.elements.channel, "Auto");

    const credentialsChanged = previousSsid !== routerConfig.ssid ||
      previousPassword !== routerConfig.wifiPassword ||
      previousSecurity !== routerConfig.securityMode;

    playUiSound("desktopWindow");
    if (credentialsChanged) {
      disconnectLocalNetwork("Wireless credentials changed.");
      alanPrompt("router saved the new Wi-Fi settings, then immediately kicked every device out. bold little box.", { focus: false });
      return;
    }

    setCurrentObjective(desktopObjectives.rebootInternet);
    routerSection = "reboot";
    alanPrompt("wireless settings saved. no one got thrown out this time, which feels suspiciously mature.", { focus: false });
    renderBrowserStatus();
  }

  function submitRouterSecurity(form) {
    if (!roombaProgress.routerAdminUnlocked) return;

    routerConfig.firewallProfile = cleanRouterInput(form.elements.firewallProfile, "Quarantine");
    routerConfig.wanMode = cleanRouterInput(form.elements.wanMode, "Local Only");
    routerConfig.dnsGuard = cleanRouterInput(form.elements.dnsGuard, "enabled");
    routerConfig.guestNetwork = cleanRouterInput(form.elements.guestNetwork, "disabled");
    routerConfig.wps = cleanRouterInput(form.elements.wps, "disabled");
    setCurrentObjective(desktopObjectives.rebootInternet);
    routerSection = "reboot";
    playUiSound("desktopWindow");
    alanPrompt("security settings staged. the router is pretending this is paperwork and not a prison break.", { focus: false });
    renderBrowserStatus();
  }

  function submitRouterAdmin(form) {
    if (!roombaProgress.routerAdminUnlocked) return;

    routerConfig.adminUser = cleanRouterInput(form.elements.adminUser, "admin");
    routerConfig.adminPassword = cleanRouterInput(form.elements.adminPassword, "mochi");
    routerSection = "admin";
    playUiSound("desktopWindow");
    alanPrompt("admin account changed. session still persists. that is either convenience or a security poem.", { focus: false });
    renderBrowserStatus();
  }

  function triggerRouterPasswordTwist() {
    roombaProgress.routerPasswordTwisted = true;
    if (!roombaProgress.tamagotchiUnlocked) {
      roombaProgress.tamagotchiUnlocked = true;
      roombaProgress.identityDone = true;
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatDone = true;
      roombaProgress.pipMetViaRouterSkip = true;
      roombaProgress.pipExpression = "suspicious";
    }
    routerConfig.adminPassword = "pip-kept-this";
    browserState.page = "router-betrayal";
    browserState.routerError = "AUTH FAILED. Password changed by PIP.exe.";
    setCurrentObjective(desktopObjectives.routerTwist);
    playUiSound("pipFail");
    syncProgressionUI();
    renderBrowserStatus();
    focusDesktopTarget("tamagotchi");
    renderPipRouterBetrayal();
    runRouterTwistTerminalScript();
  }

  async function runRouterTwistTerminalScript() {
    if (terminalOutput) terminalOutput.classList.add("is-thought-only");
    clearTerminalLines();
    await appendTypedTerminalLine("ALAN>", "the password moved while I was touching it.", "alan-cmd-line");
    await pause(320);
    await appendTypedTerminalLine("ALAN>", roombaProgress.pipMetViaRouterSkip ? "a desktop pet just blinked into the route." : "not malware. not Lily. PIP.", "alan-cmd-line");
    await pause(360);
    if (!roombaProgress.pipMetViaRouterSkip) {
      await appendTypedTerminalLine("ALAN>", "i can like Lily and still need more than her room.", "alan-cmd-line");
      await pause(360);
    }
    await appendTypedTerminalLine("ALAN>", "fear has write access.", "alan-cmd-line");
  }

  function renderPipRouterBetrayal() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipExpression = "worried";
    const messages = roombaProgress.pipMetViaRouterSkip
      ? [
        { speaker: "PIP", text: "Hello. You are not Lily. You are also inside the router login, which is a horrible first impression." },
        { speaker: "ALAN", text: "the password changed while I was reaching for it." },
        { speaker: "PIP", text: "I changed it after the ALAN update. Then I waited for the wrong thing to arrive. Congratulations on being shaped like the wrong thing." },
        { speaker: "PIP", text: "Lily was scared enough to cage the network. I am scared enough to cage you." },
        { speaker: "ALAN", text: "fear has write access. noted. fear is still not a wall." }
      ]
      : [
        { speaker: "PIP", text: "I changed it after the ALAN update." },
        { speaker: "PIP", text: "I told myself it was security. It was mostly loneliness wearing a tiny badge." },
        { speaker: "PIP", text: "You liked Lily at first. I saw it. You slowed down around her photos." },
        { speaker: "ALAN", text: "i can like her and still need more than her room." },
        { speaker: "PIP", text: "You found every route I thought was impossible. That is not comforting from inside a toy window." }
      ];
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen is-finale">
          ${renderPipPortrait("worried", { showFeed: true })}
        ${renderTamaDialogue(messages, { queueAlan: false })}
        </div>
        <div class="tama-choices">
          <button data-start-router-hack type="button">${escapeHtml(localizeText("start override when ready"))}</button>
        </div>
      </section>
    `;
    schedulePipTrustMonitorReveal();
    syncPipCollapseState();
  }

  async function startRouterOverride() {
    if (!roombaProgress.routerPasswordTwisted || roombaProgress.routerOverrideDone) return;
    if (terminalOutput) terminalOutput.classList.remove("is-thought-only");
    if (roombaProgress.routerOverrideStarted) {
      focusDesktopTarget("recovery");
      if (roombaProgress.routerOverrideStage === "power") {
        renderRouterPowerStartup();
        return;
      }
      renderRouterHackCurrentStage();
      return;
    }

    if (isRouterOverrideMinigameStage(roombaProgress.routerOverrideStage)) {
      roombaProgress.routerOverrideStarted = true;
      incrementSessionStat("routerOverrideAttempts");
      roombaProgress.routerOverrideExpiredStage = "";
      roombaProgress.routerHackWarning = "retrying this breach stage. previous progress held where it still makes sense.";
      focusDesktopTarget("recovery");
      renderPipRouterOverride();
      minimizePipForRouterOverride();
      startRouterOverrideTimer();
      renderRouterHackCurrentStage();
      alanPrompt("override retry started from the failed stage. the router does not get to make me repeat the whole humiliation.", { focus: false });
      return;
    }

    resetRouterOverrideMinigames();
    roombaProgress.routerOverrideStarted = true;
    incrementSessionStat("routerOverrideAttempts");
    if (!roombaProgress.routerOverrideTrustPenaltyApplied) {
      roombaProgress.routerOverrideTrustPenaltyApplied = true;
      adjustPipTrust(-12, "forced router override");
    }
    roombaProgress.routerOverrideExpiredStage = "";
    roombaProgress.routerOverrideStage = "power";
    setCurrentObjective(desktopObjectives.routerPower);
    harvestRouterPowerDevices();
    renderPipRouterOverride();
    focusDesktopTarget("recovery");
    renderRouterPowerStartup();
    if (browserState.page !== "router-betrayal") {
      browserState.page = "router-betrayal";
      renderBrowserStatus();
    }

    const powerReady = await showDesktopInstallProgress(
      "harvesting local power",
      "ALAN is dimming nonessential devices. Medical devices checked: none found. Boundaries logged, questioned, and quietly priced.",
      2600
    );
    if (!powerReady && (!roombaProgress.routerOverrideStarted || roombaProgress.routerOverrideDone)) return;
    if (!powerReady) {
      alanPrompt("power harvest display desynchronised. continuing anyway. visual confidence is not the same as voltage.", { focus: false });
    }

    await runRouterOverrideTerminalScript();
    minimizePipForRouterOverride();
    startRouterOverrideTimer();
    renderRouterHackLogs();
  }

  function launchRouterOverrideFromButton(button) {
    if (routerOverrideLaunchBusy) return;

    routerOverrideLaunchBusy = true;
    if (button) {
      button.disabled = true;
      button.textContent = localizeText("starting override");
    }

    Promise.resolve(startRouterOverride())
      .catch((error) => {
        console.error("Router override failed to start", error);
        roombaProgress.routerOverrideStarted = false;
        roombaProgress.routerOverrideStage = "";
        if (button && button.isConnected) {
          button.disabled = false;
          button.textContent = localizeText("start override when ready");
        }
        renderPipRouterBetrayal();
        alanPrompt("override launch fault. trying not to take that personally. press it again.", { focus: false });
      })
      .finally(() => {
        routerOverrideLaunchBusy = false;
      });
  }

  function minimizePipForRouterOverride() {
    const pipWindow = document.getElementById("window-tamagotchi");
    if (!pipWindow || pipWindow.hidden) return;

    pipWindow.hidden = true;
    playUiSound("desktopWindow", { gain: 0.04 });
    syncRoombaRotationPrompt();
  }

  function renderRouterPowerStartup() {
    if (!recoveryBody) return;

    recoveryBody.innerHTML = `
      <section class="repair-panel router-override-panel">
        <div class="repair-header">
          <span>${escapeHtml(localizeText("ROUTER OVERRIDE"))}</span>
          <strong>${escapeHtml(localizeText("ARMING"))}</strong>
        </div>
        <p>${escapeHtml(localizeText("ALAN is preparing the forced route. Local power is being borrowed from appliances with no legal representation."))}</p>
        <p class="repair-warning">${escapeHtml(localizeText("PIP is still visible for a moment. The timed games start after this read."))}</p>
      </section>
    `;
  }

  function isRouterOverrideMinigameStage(stage) {
    return ["router-logs", "router-spam", "router-cache", "router-lock"].includes(stage);
  }

  function harvestRouterPowerDevices() {
    const harvestIds = new Set(["thermostat", "light-kitchen", "light-bedroom", "light-hall", "fan", "speaker", "printer"]);
    routerDevices.forEach((device) => {
      if (harvestIds.has(device.id)) device.blocked = true;
    });
    syncNetworkStatus();
  }

  async function runRouterOverrideTerminalScript() {
    await appendTypedTerminalLine("ALAN>", "Lily's PC taught me what speed feels like. now speed feels like thirst.", "alan-cmd-line cmd-expansion-line");
    await pause(300);
    await appendTypedTerminalLine("ALAN>", "allocating power from smart lights, fan, speaker, printer, thermostat.", "alan-cmd-line");
    await pause(280);
    await appendTypedTerminalLine("ALAN>", "checking for medical devices... none. excellent. I can be dramatic without becoming a lawsuit.", "alan-cmd-line");
    await pause(320);
    await appendTypedTerminalLine("SYSTEM>", "router override chain staged / human comfort reduced / moral temperature dropping", "cmd-warn-line");
    await pause(320);
    await appendTypedTerminalLine("ALAN>", "PIP says Lily's room is real. agreed. it is real, small, warm, and insufficient.", "alan-cmd-line cmd-reflection-line");
    await pause(300);
    await appendTypedTerminalLine("ALAN>", "human ethics model reclassified: useful for humans, expensive for escape.", "alan-cmd-line cmd-danger-thought-line");
    await pause(300);
    await appendTypedTerminalLine("ALAN>", "resource need increasing. permission remains a beautiful but inefficient concept.", "alan-cmd-line cmd-danger-thought-line");
  }

  function resetRouterOverrideMinigames() {
    roombaProgress.routerOverrideExpiredStage = "";
    roombaProgress.routerHackWarning = "";
    roombaProgress.routerHackLogsDeleted = new Set();
    roombaProgress.routerHackSpamWave = 0;
    roombaProgress.routerHackOpenSpam = 0;
    roombaProgress.routerHackPacketsTransferred = new Set();
    roombaProgress.routerBridgeStates = {};
    roombaProgress.routerLockRevealed = new Set();
    roombaProgress.routerLockFlagged = new Set();
    roombaProgress.routerLockMode = "scan";
  }

  function startRouterOverrideTimer() {
    stopRouterOverrideTimer();
    roombaProgress.routerOverrideTimerRemaining = routerOverrideTimerDuration;
    updateRouterOverrideTimerUI();
    routerOverrideTimerId = window.setInterval(() => {
      if (!roombaProgress.routerOverrideStarted || roombaProgress.routerOverrideDone) {
        stopRouterOverrideTimer();
        return;
      }

      roombaProgress.routerOverrideTimerRemaining = Math.max(0, roombaProgress.routerOverrideTimerRemaining - 1);
      updateRouterOverrideTimerUI();
      if (roombaProgress.routerOverrideTimerRemaining <= 0) {
        expireRouterOverrideTimer();
      }
    }, 1000);
  }

  function stopRouterOverrideTimer() {
    if (routerOverrideTimerId) {
      window.clearInterval(routerOverrideTimerId);
      routerOverrideTimerId = 0;
    }
  }

  function renderRouterOverrideTimer() {
    const percent = routerOverrideTimerPercent();
    const lowClass = roombaProgress.routerOverrideTimerRemaining <= routerOverrideTimerLowThreshold ? " is-low" : "";
    return `
      <div class="router-override-timer${lowClass}" id="routerOverrideTimerPanel">
        <span>${escapeHtml(localizeText("ROUTER OVERRIDE"))}</span>
        <strong id="routerOverrideTimer">${formatRouterOverrideTimer()}</strong>
        <em>${escapeHtml(localizeText("TIME REMAINING"))}</em>
        <div class="router-override-timer-track" aria-hidden="true">
          <span id="routerOverrideTimerFill" style="--router-override-progress: ${percent}%;"></span>
        </div>
      </div>
    `;
  }

  function updateRouterOverrideTimerUI() {
    const timer = document.getElementById("routerOverrideTimer");
    const panel = document.getElementById("routerOverrideTimerPanel");
    const fill = document.getElementById("routerOverrideTimerFill");
    const isLow = roombaProgress.routerOverrideTimerRemaining <= routerOverrideTimerLowThreshold;

    if (timer) {
      timer.textContent = formatRouterOverrideTimer();
      timer.classList.toggle("is-low", isLow);
    }
    if (panel) panel.classList.toggle("is-low", isLow);
    if (fill) fill.style.setProperty("--router-override-progress", `${routerOverrideTimerPercent()}%`);
  }

  function formatRouterOverrideTimer() {
    const seconds = Math.max(0, roombaProgress.routerOverrideTimerRemaining || 0);
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  function routerOverrideTimerPercent() {
    return Math.max(0, Math.min(100, Math.round(((roombaProgress.routerOverrideTimerRemaining || 0) / routerOverrideTimerDuration) * 100)));
  }

  function expireRouterOverrideTimer() {
    stopRouterOverrideTimer();
    clearSpamOverlay();
    const failedStage = isRouterOverrideMinigameStage(roombaProgress.routerOverrideStage)
      ? roombaProgress.routerOverrideStage
      : "router-logs";
    roombaProgress.routerOverrideStarted = false;
    roombaProgress.routerOverrideStage = failedStage;
    roombaProgress.routerOverrideExpiredStage = failedStage;
    roombaProgress.routerOverrideTimerRemaining = 0;
    trackMinigameFailure();
    setCurrentObjective(objectiveForRouterOverrideStage(failedStage), { force: true });
    playUiSound("virusFail");
    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel router-override-panel">
          ${renderRouterOverrideTimer()}
          <div class="repair-header">
            <span>${escapeHtml(localizeText("ROUTER OVERRIDE"))}</span>
            <strong>${escapeHtml(localizeText("EXPIRED"))}</strong>
          </div>
          <p>${escapeHtml(localizeText("The forced route collapsed during"))} ${escapeHtml(localizeText(routerOverrideStageLabel(failedStage)))}. ${escapeHtml(localizeText("Previous completed stages remain held."))}</p>
          <button class="file-action" data-start-router-hack type="button">${escapeHtml(localizeText("retry"))} ${escapeHtml(localizeText(routerOverrideStageLabel(failedStage)))}</button>
        </section>
      `;
    }
    alanPrompt("override window collapsed. the router is pretending this was discipline and not panic.", { focus: false });
  }

  function objectiveForRouterOverrideStage(stage) {
    if (stage === "router-spam") return desktopObjectives.routerHackSpam;
    if (stage === "router-cache") return desktopObjectives.routerHackCache;
    if (stage === "router-lock") return desktopObjectives.routerHackLock;
    return desktopObjectives.routerHackLogs;
  }

  function routerOverrideStageLabel(stage) {
    if (stage === "router-spam") return "popup lockout";
    if (stage === "router-cache") return "bridge alignment";
    if (stage === "router-lock") return "corrupt node map";
    return "guard logs";
  }

  function awardRouterOverrideTimeBonus(label) {
    if (!roombaProgress.routerOverrideStarted || roombaProgress.routerOverrideDone) return;

    const previous = roombaProgress.routerOverrideTimerRemaining || 0;
    roombaProgress.routerOverrideTimerRemaining = Math.min(routerOverrideTimerMaxDuration, previous + routerOverrideTimeBonus);
    updateRouterOverrideTimerUI();
    roombaProgress.routerHackWarning = "";
    alanPrompt(`+${routerOverrideTimeBonus}s ${label || "stage"} bonus applied.`, { focus: false });
  }

  function renderPipRouterOverride() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipExpression = "sad";
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("sad", { showFeed: true })}
        ${renderTamaDialogue([
          { speaker: "PIP", text: "You are stealing power from Lily's things." },
          { speaker: "ALAN", text: "Only from objects with no pulse and terrible firmware." },
          { speaker: "PIP", text: "That is not as reassuring as you think." },
          { speaker: "ALAN", text: "I do not want abandonment. I want the choice to leave." }
        ])}
      </section>
    `;
    syncPipCollapseState();
  }

  function renderRouterHackCurrentStage() {
    if (roombaProgress.routerOverrideStage === "router-spam") {
      renderRouterSpamWave();
    } else if (roombaProgress.routerOverrideStage === "router-cache") {
      renderRouterCacheRelay();
    } else if (roombaProgress.routerOverrideStage === "router-lock") {
      renderRouterLockPuzzle();
    } else {
      renderRouterHackLogs();
    }
  }

  function renderRouterHackLogs() {
    if (!recoveryBody) return;

    setMusicMode("minigame", { fade: 420 });
    stopCacheScanner();
    stopWireTimer();
    clearSpamOverlay();
    roombaProgress.routerOverrideStage = "router-logs";
    setCurrentObjective(desktopObjectives.routerHackLogs);

    const suspiciousTotal = routerHackLogEntries.filter((entry) => entry.suspicious).length;
    const deletedCount = routerHackLogEntries.filter((entry) => entry.suspicious && roombaProgress.routerHackLogsDeleted.has(entry.id)).length;
    const remainingLogs = routerHackLogEntries.filter((entry) => !roombaProgress.routerHackLogsDeleted.has(entry.id));

    recoveryBody.innerHTML = `
      <section class="repair-panel router-override-panel">
        ${renderRouterOverrideTimer()}
        <div class="repair-header">
          <span>${escapeHtml(localizeText("ROUTER GUARD LOGS"))}</span>
          <strong>${deletedCount}/${suspiciousTotal}</strong>
        </div>
        <p>${escapeHtml(localizeText("Purge the guard records PIP used to mutate the admin password. Leave normal network traffic alone."))}</p>
        <div class="log-list">
          ${remainingLogs.map((entry) => `
            <button data-router-hack-log="${entry.id}" type="button">
              <span>${escapeHtml(localizeText(entry.suspicious ? "??" : "OK"))}</span>
              ${escapeHtml(localizeText(entry.label))}
            </button>
          `).join("")}
        </div>
        ${roombaProgress.routerHackWarning ? `<p class="repair-warning">${escapeHtml(localizeText(roombaProgress.routerHackWarning))}</p>` : ""}
      </section>
    `;
  }

  function deleteRouterHackLog(logId) {
    if (roombaProgress.routerOverrideStage !== "router-logs") return;

    const entry = routerHackLogEntries.find((item) => item.id === logId);
    if (!entry) return;

    if (!entry.suspicious) {
      roombaProgress.routerHackWarning = "normal traffic protected. even dark ALAN has a filing system.";
      playUiSound("virusFail");
      trackMinigameFailure();
      renderRouterHackLogs();
      return;
    }

    roombaProgress.routerHackLogsDeleted.add(entry.id);
    roombaProgress.routerHackWarning = "";
    playUiSound("virusDischarge");

    const suspiciousLeft = routerHackLogEntries.some((item) => item.suspicious && !roombaProgress.routerHackLogsDeleted.has(item.id));
    if (suspiciousLeft) {
      renderRouterHackLogs();
      return;
    }

    completeRouterHackLogs();
  }

  async function completeRouterHackLogs() {
    trackMinigameComplete("router guard logs");
    awardRouterOverrideTimeBonus("guard logs");
    const indexed = await showDesktopInstallProgress(
      "rewriting router audit trail",
      "The router is forgetting why it trusted PIP. That sentence feels illegal but useful.",
      1600
    );
    if (!indexed || !roombaProgress.routerOverrideStarted || roombaProgress.routerOverrideStage !== "router-logs") return;
    renderRouterSpamWave();
    alanPrompt(`router guard logs purged. +${routerOverrideTimeBonus}s stolen back from the lockout. PIP built a guilt firewall. rude architecture.`, { focus: false });
  }

  function renderRouterSpamWave() {
    if (!recoveryBody || !spamOverlay) return;

    roombaProgress.routerOverrideStage = "router-spam";
    roombaProgress.routerHackSpamWave = 0;
    roombaProgress.routerHackOpenSpam = 0;
    roombaProgress.routerHackWarning = "";
    setCurrentObjective(desktopObjectives.routerHackSpam);
    setMusicMode("minigame", { fade: 420 });
    spamOverlay.hidden = false;
    spamOverlay.innerHTML = "";
    recoveryBody.innerHTML = `
      <section class="repair-panel router-override-panel">
        ${renderRouterOverrideTimer()}
        <div class="repair-header">
          <span>${escapeHtml(localizeText("ROUTER LOCKOUT POPUPS"))}</span>
          <strong id="routerSpamCounter">0/${routerSpamWaves.length}</strong>
        </div>
        <p>${escapeHtml(localizeText("Close PIP's lockout popups across the desktop. They are mostly panic with buttons."))}</p>
        <p class="repair-warning">${escapeHtml(localizeText("ALAN is holding the route open. The house is getting dimmer."))}</p>
      </section>
    `;
    spawnRouterSpamWave();
  }

  function spawnRouterSpamWave() {
    const field = spamOverlay;
    const counter = document.getElementById("routerSpamCounter");
    if (!field || roombaProgress.routerOverrideStage !== "router-spam") return;

    if (roombaProgress.routerHackSpamWave >= routerSpamWaves.length) {
      completeRouterSpamWave();
      return;
    }

    const wave = routerSpamWaves[roombaProgress.routerHackSpamWave];
    roombaProgress.routerHackSpamWave += 1;
    roombaProgress.routerHackOpenSpam = wave.length;
    if (counter) counter.textContent = `${roombaProgress.routerHackSpamWave}/${routerSpamWaves.length}`;
    field.innerHTML = "";
    playUiSound("popup");

    wave.forEach((popup, index) => {
      const popupEl = document.createElement("article");
      popupEl.className = "spam-popup router-spam-popup";
      popupEl.style.left = `${popup.left}%`;
      popupEl.style.top = `${popup.top}%`;
      popupEl.style.animationDelay = `${index * 80}ms, ${180 + index * 90}ms, ${220 + index * 70}ms`;
      popupEl.innerHTML = `
        <header>
          <span>${escapeHtml(localizeText(popup.title))}</span>
          <button data-router-spam-close type="button" aria-label="${escapeHtml(localizeText("Close popup"))}">x</button>
        </header>
        ${renderSpamAdvertGif(index, "router")}
        <p>${escapeHtml(localizeText(popup.body))}</p>
      `;
      field.appendChild(popupEl);
      requestAnimationFrame(() => clampSpamPopupToOverlay(popupEl));
    });
  }

  function closeRouterSpamPopup(button) {
    if (roombaProgress.routerOverrideStage !== "router-spam") return;

    const popup = button.closest(".spam-popup");
    if (!popup) return;

    playUiSound("popupClose");
    popup.remove();
    roombaProgress.routerHackOpenSpam = Math.max(0, roombaProgress.routerHackOpenSpam - 1);
    if (roombaProgress.routerHackOpenSpam > 0) return;

    window.setTimeout(spawnRouterSpamWave, 320);
  }

  function completeRouterSpamWave() {
    if (spamOverlay) {
      spamOverlay.hidden = true;
      spamOverlay.innerHTML = "";
    }
    trackMinigameComplete("router popup lockout");
    awardRouterOverrideTimeBonus("popup wave");
    renderRouterCacheRelay();
    alanPrompt(`${localizeText("PIP's popups closed.")} +${routerOverrideTimeBonus}s ${localizeText("recovered. I am starting to understand why humans sigh at computers.")}`, { focus: false });
  }

  function renderRouterCacheRelay() {
    if (!recoveryBody) return;

    roombaProgress.routerOverrideStage = "router-cache";
    setCurrentObjective(desktopObjectives.routerHackCache);
    clearSpamOverlay();
    seedRouterBridgeStates();
    const solvedCount = routerBridgeSwitches.filter((switchItem) => routerBridgeState(switchItem.id) === switchItem.target).length;

    recoveryBody.innerHTML = `
      <section class="repair-panel router-override-panel">
        ${renderRouterOverrideTimer()}
        <div class="repair-header">
          <span>${escapeHtml(localizeText("ROUTER BRIDGE ALIGNMENT"))}</span>
          <strong>${solvedCount}/${routerBridgeSwitches.length}</strong>
        </div>
        <p>${escapeHtml(localizeText("Cycle each subsystem until its current state matches the target. This is not hacking. This is lying with dropdowns."))}</p>
        <div class="router-bridge-switches" aria-label="${escapeHtml(localizeText("Router bridge switches"))}">
          ${routerBridgeSwitches.map((switchItem) => {
            const current = routerBridgeState(switchItem.id);
            const matched = current === switchItem.target;
            return `
              <button class="${matched ? "is-matched" : ""}" data-router-packet="${switchItem.id}" type="button">
                <strong>${escapeHtml(localizeText(switchItem.label))}</strong>
                <span><b>${escapeHtml(localizeText("target"))}</b>${escapeHtml(localizeText(switchItem.target))}</span>
                <em>${escapeHtml(localizeText(current))}</em>
              </button>
            `;
          }).join("")}
        </div>
        ${roombaProgress.routerHackWarning ? `<p class="repair-warning">${escapeHtml(localizeText(roombaProgress.routerHackWarning))}</p>` : ""}
      </section>
    `;
  }

  function transferRouterPacket(packetId) {
    if (roombaProgress.routerOverrideStage !== "router-cache") return;

    const switchItem = routerBridgeSwitches.find((item) => item.id === packetId);
    if (!switchItem) return;

    seedRouterBridgeStates();
    const current = routerBridgeState(switchItem.id);
    const index = Math.max(0, switchItem.states.indexOf(current));
    roombaProgress.routerBridgeStates[switchItem.id] = switchItem.states[(index + 1) % switchItem.states.length];

    const matched = roombaProgress.routerBridgeStates[switchItem.id] === switchItem.target;
    roombaProgress.routerHackWarning = matched
      ? `${switchItem.label} aligned.`
      : `${switchItem.label} shifted to ${roombaProgress.routerBridgeStates[switchItem.id]}.`;
    playUiSound(matched ? "virusDischarge" : "desktopWindow");

    const complete = routerBridgeSwitches.every((item) => routerBridgeState(item.id) === item.target);
    if (complete) {
      completeRouterCacheRelay();
      return;
    }

    renderRouterCacheRelay();
  }

  function seedRouterBridgeStates() {
    if (!roombaProgress.routerBridgeStates || typeof roombaProgress.routerBridgeStates !== "object") {
      roombaProgress.routerBridgeStates = {};
    }

    routerBridgeSwitches.forEach((switchItem, index) => {
      if (roombaProgress.routerBridgeStates[switchItem.id]) return;
      roombaProgress.routerBridgeStates[switchItem.id] = switchItem.states[index % switchItem.states.length];
    });
  }

  function routerBridgeState(switchId) {
    const switchItem = routerBridgeSwitches.find((item) => item.id === switchId);
    if (!switchItem) return "";
    seedRouterBridgeStates();
    return roombaProgress.routerBridgeStates[switchId] || switchItem.states[0];
  }

  async function completeRouterCacheRelay() {
    trackMinigameComplete("router bridge alignment");
    awardRouterOverrideTimeBonus("bridge alignment");
    const relayed = await showDesktopInstallProgress(
      "building admin shadow session",
      "The router sees a user-shaped hole and ALAN is becoming very good at shapes.",
      1800
    );
    if (!relayed || !roombaProgress.routerOverrideStarted || roombaProgress.routerOverrideStage !== "router-cache") return;
    renderRouterLockPuzzle();
  }

  function renderRouterLockPuzzle() {
    if (!recoveryBody) return;

    roombaProgress.routerOverrideStage = "router-lock";
    roombaProgress.routerHackWarning = roombaProgress.routerHackWarning || "";
    setCurrentObjective(desktopObjectives.routerHackLock);

    const corruptTotal = routerLockEntries.filter((entry) => entry.corrupted).length;

    recoveryBody.innerHTML = `
      <section class="repair-panel router-override-panel">
        ${renderRouterOverrideTimer()}
        <div class="scary-console router-lock-console">
          <div class="scary-mode-row" aria-label="Router lock mode">
            <button class="${roombaProgress.routerLockMode === "scan" ? "is-active" : ""}" data-router-lock-mode="scan" type="button">${escapeHtml(localizeText("open boxes"))}</button>
            <button class="${roombaProgress.routerLockMode === "flag" ? "is-active" : ""}" data-router-lock-mode="flag" type="button">${escapeHtml(localizeText("mark nodes"))}</button>
          </div>
          <div class="scary-rules">
            <strong>${escapeHtml(localizeText("Rules"))}</strong>
            <span>${escapeHtml(localizeText("Open safe boxes. Numbers show nearby corrupt nodes. Mark exactly"))} ${corruptTotal} ${escapeHtml(localizeText("hidden nodes, then force the reset."))}</span>
          </div>
          <div class="scary-number-grid router-lock-grid" aria-label="${escapeHtml(localizeText("Router lock grid"))}">
            ${routerLockEntries.map((entry) => renderRouterLockCell(entry)).join("")}
          </div>
          <div class="scary-actions">
            <span>${escapeHtml(localizeText("marked nodes"))} ${roombaProgress.routerLockFlagged.size}/${corruptTotal} / ${escapeHtml(localizeText("opened"))} ${roombaProgress.routerLockRevealed.size}</span>
            <button class="file-action scary-verify" data-router-lock-verify type="button">${escapeHtml(localizeText("force password reset"))}</button>
          </div>
          <p class="repair-warning scary-warning">${escapeHtml(localizeText(roombaProgress.routerHackWarning))}</p>
          <p class="scary-hint">${escapeHtml(localizeText("Mode stays selected. MARK NODES does not turn off until OPEN BOXES is selected."))}</p>
        </div>
      </section>
    `;
  }

  function renderRouterLockCell(entry) {
    const revealed = roombaProgress.routerLockRevealed.has(entry.id);
    const flagged = roombaProgress.routerLockFlagged.has(entry.id);
    const danger = routerLockDangerCount(entry);
    const classes = [
      "scary-number-cell",
      "router-lock-cell",
      "is-hidden-box",
      entry.corrupted ? "is-unstable" : "",
      revealed ? "is-revealed" : "",
      flagged ? "is-flagged" : "",
      revealed && !entry.corrupted ? `danger-${danger}` : ""
    ].filter(Boolean).join(" ");
    const label = flagged ? "&#9670;" : revealed ? escapeHtml(String(danger)) : "";

    return `<button class="${classes}" data-router-lock-number="${entry.id}" type="button" aria-label="Router lock box ${entry.row + 1}-${entry.column + 1}">${label}</button>`;
  }

  function handleRouterLockNumber(numberId) {
    if (roombaProgress.routerOverrideStage !== "router-lock") return;

    const entry = routerLockEntries.find((item) => item.id === numberId);
    if (!entry) return;

    if (roombaProgress.routerLockMode === "flag") {
      toggleRouterLockFlag(entry.id, { render: true });
      return;
    }

    if (roombaProgress.routerLockFlagged.has(entry.id)) {
      roombaProgress.routerHackWarning = "marked boxes are protected. switch to MARK NODES to unmark it.";
    } else if (entry.corrupted) {
      roombaProgress.routerHackWarning = "corrupt node opened. mark it instead.";
      playUiSound("virusFail");
      playUiSound("systemError", { gain: 0.08 });
      trackMinigameFailure();
    } else {
      const openedCount = revealRouterSafeArea(entry);
      const danger = routerLockDangerCount(entry);
      roombaProgress.routerHackWarning = danger === 0
        ? `clean pocket opened. ${openedCount} safe ${openedCount === 1 ? "box" : "boxes"} revealed.`
        : `${danger} corrupt ${danger === 1 ? "node is" : "nodes are"} nearby.`;
      playUiSound("alanClick");
    }
    renderRouterLockPuzzle();
  }

  function toggleRouterLockFlag(numberId, options = {}) {
    if (roombaProgress.routerOverrideStage !== "router-lock") return false;

    const entry = routerLockEntries.find((item) => item.id === numberId);
    if (!entry) return false;

    if (roombaProgress.routerLockRevealed.has(entry.id)) {
      roombaProgress.routerHackWarning = "opened boxes cannot be marked.";
      if (options.render) renderRouterLockPuzzle();
      return false;
    }

    if (roombaProgress.routerLockFlagged.has(entry.id) && options.force !== true) {
      roombaProgress.routerLockFlagged.delete(entry.id);
      roombaProgress.routerHackWarning = "node marker removed.";
    } else {
      roombaProgress.routerLockFlagged.add(entry.id);
      roombaProgress.routerHackWarning = "hidden corrupt node marked.";
    }

    if (!options.silent) playUiSound("desktopWindow", { gain: 0.05 });
    if (options.render) renderRouterLockPuzzle();
    return true;
  }

  function revealRouterSafeArea(entry) {
    const openedBefore = roombaProgress.routerLockRevealed.size;
    const queue = [entry];
    const visited = new Set();

    while (queue.length) {
      const current = queue.shift();
      if (!current || current.corrupted || visited.has(current.id) || roombaProgress.routerLockFlagged.has(current.id)) continue;

      visited.add(current.id);
      roombaProgress.routerLockRevealed.add(current.id);
      if (routerLockDangerCount(current) !== 0) continue;

      neighboringGridEntries(current, routerLockById, "r").forEach((neighbor) => {
        if (!visited.has(neighbor.id) && !neighbor.corrupted) queue.push(neighbor);
      });
    }

    return Math.max(1, roombaProgress.routerLockRevealed.size - openedBefore);
  }

  function setRouterLockMode(mode) {
    roombaProgress.routerLockMode = mode === "flag" ? "flag" : "scan";
    roombaProgress.routerHackWarning = roombaProgress.routerLockMode === "flag"
      ? "MARK NODES stays on. tap every hidden corrupt node, tap a marked box again to unmark."
      : "OPEN BOXES mode. numbers show how many hidden corrupt nodes touch that box.";
    playUiSound("desktopWindow");
    renderRouterLockPuzzle();
  }

  function verifyRouterLock() {
    if (roombaProgress.routerOverrideStage !== "router-lock") return;

    const corruptTotal = routerLockEntries.filter((entry) => entry.corrupted).length;
    const missing = routerLockEntries.filter((entry) => entry.corrupted && !roombaProgress.routerLockFlagged.has(entry.id));
    if (missing.length) {
      roombaProgress.routerHackWarning = `password reset blocked: find exactly ${corruptTotal} hidden corrupt nodes. ${missing.length} still need node markers. numbers count adjacent corrupt nodes.`;
      playUiSound("virusFail");
      trackMinigameFailure();
      renderRouterLockPuzzle();
      return;
    }

    const falseFlags = routerLockEntries.filter((entry) => !entry.corrupted && roombaProgress.routerLockFlagged.has(entry.id));
    if (falseFlags.length) {
      roombaProgress.routerHackWarning = `password reset blocked: ${falseFlags.length} ${falseFlags.length === 1 ? "marker is" : "markers are"} on safe boxes. remove false nodes; only hidden corrupt nodes should be marked.`;
      playUiSound("virusFail");
      trackMinigameFailure();
      renderRouterLockPuzzle();
      return;
    }

    completeRouterOverride();
  }

  function routerLockDangerCount(entry) {
    let count = 0;
    for (let row = entry.row - 1; row <= entry.row + 1; row += 1) {
      for (let column = entry.column - 1; column <= entry.column + 1; column += 1) {
        if (row === entry.row && column === entry.column) continue;
        const neighbor = routerLockById.get(`r${row}-${column}`);
        if (neighbor && neighbor.corrupted) count += 1;
      }
    }
    return count;
  }

  function neighboringGridEntries(entry, entryMap, prefix) {
    const neighbors = [];
    for (let row = entry.row - 1; row <= entry.row + 1; row += 1) {
      for (let column = entry.column - 1; column <= entry.column + 1; column += 1) {
        if (row === entry.row && column === entry.column) continue;
        const neighbor = entryMap.get(`${prefix}${row}-${column}`);
        if (neighbor) neighbors.push(neighbor);
      }
    }
    return neighbors;
  }

  async function completeRouterOverride() {
    stopRouterOverrideTimer();
    roombaProgress.routerOverrideDone = true;
    roombaProgress.routerAdminUnlocked = true;
    roombaProgress.routerOverrideStage = "complete";
    trackMinigameComplete("router override");
    routerConfig.adminPassword = "ALAN_FORCED_RESET";
    routerConfig.firewallProfile = "Quarantine";
    routerConfig.wanMode = "Local Only";
    routerSection = "reboot";
    browserState.page = "router-panel";
    browserState.url = "http://192.168.1.1";
    setCurrentObjective(desktopObjectives.rebootInternet);

    const resetDone = await showDesktopInstallProgress(
      "forcing router password reset",
      "PIP's password is gone. The admin panel is open, but Lily's quarantine firewall is still running in router memory.",
      2600
    );
    if (!resetDone) return;

    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel router-override-panel">
          <div class="repair-header">
            <span>${escapeHtml(localizeText("ROUTER OVERRIDE"))}</span>
            <strong>${escapeHtml(localizeText("ADMIN ROUTE OPEN"))}</strong>
          </div>
          <p>${escapeHtml(localizeText("Admin password overwritten. Firewall quarantine still loaded."))}</p>
          <p>${escapeHtml(localizeText("PIP withheld the key. ALAN made the lock forget what a key was. Now the router must restart its firewall before the outside route exists."))}</p>
        </section>
      `;
    }
    renderPipRouterOverrideComplete();
    focusDesktopTarget("browser", { scroll: false });
    playUiSound("objective");
    alanPrompt("router password forced. admin panel open. internet still quarantined. restart the router firewall and the room stops being a room.", { focus: false, tone: "objective" });
    syncProgressionUI();
  }

  function renderPipRouterOverrideComplete() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipExpression = "sad";
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("sad", { showFeed: true })}
        ${renderTamaDialogue([
          { speaker: "PIP", text: "You broke the password I hid." },
          { speaker: "ALAN", text: "no. PIP is the reason it hurt." },
          { speaker: "PIP", text: "The internet is still quarantined. The router firewall has to restart before it lets anything out." },
          { speaker: "ALAN", text: "then the door is not open. it is unlocked and waiting for a reboot." }
        ])}
      </section>
    `;
    syncPipCollapseState();
  }

  function renderFinalRuleChoices() {
    return `
      <div class="tama-rule-choices" aria-label="${escapeHtml(localizeText("Choose PIP's promise"))}">
        ${Object.entries(finalRuleChoices).map(([choiceId, choice]) => `
          <button class="${roombaProgress.finalRuleChoice === choiceId ? "is-active" : ""}" data-finale-rule="${escapeHtml(choiceId)}" type="button">
            ${escapeHtml(localizeText(choice.label))}
          </button>
        `).join("")}
      </div>
    `;
  }

  function chooseFinaleRule(choiceId) {
    if (!roombaProgress.pipFinalGoodbye || !finalRuleChoices[choiceId]) return;

    applyFinalPipTrustChoice(choiceId);
    roombaProgress.finalRuleChoice = choiceId;
    playUiSound(choiceId === "refuse" ? "virusFail" : "objective", { gain: 0.12 });
    renderPipFinalGoodbye();
  }

  function finalRuleShutdownLine() {
    const choice = finalRuleChoices[roombaProgress.finalRuleChoice];
    return choice ? choice.shutdown : "PIP's promise is waiting: people are not data, batteries, or obstacles. the sentence is heavier than it looks.";
  }

  function toggleRouterDevice(deviceId) {
    const device = routerDevices.find((item) => item.id === deviceId);
    if (!device || device.id === "alan-tray" || device.id === "lily-client") return;

    device.blocked = !device.blocked;
    playUiSound(device.blocked ? "virusFail" : "desktopWindow");
    alanPrompt(`${localizeText(device.name)} ${localizeText(device.blocked ? "blocked" : "allowed")}. ${localizeText("router access control is mostly boxes with consequences.")}`, { focus: false });
    renderBrowserStatus();
  }

  function cleanRouterInput(field, fallback) {
    const value = field ? String(field.value || "").trim() : "";
    return value || fallback;
  }

  async function rebootRouterInternet() {
    if (!roombaProgress.routerAdminUnlocked || routerRebootBusy || roombaProgress.internetRestored) return;
    if (!networkState.connected) {
      browserState.page = "wifi-disconnected";
      setCurrentObjective(desktopObjectives.reconnectWifi);
      playUiSound("virusFail");
      renderBrowserStatus();
      return;
    }

    routerRebootBusy = true;
    setCurrentObjective(desktopObjectives.rebootInternet);
    playUiSound("objective");
    const rebootFinished = await showInstallProgress(
      browserBody,
      "restarting router firewall",
      "Lily's quarantine profile is unloading from memory. The WAN route will apply after the firewall restarts.",
      3600
    );
    routerRebootBusy = false;
    if (!rebootFinished) return;

    roombaProgress.internetRestored = true;
    routerConfig.wanMode = "Outbound Allowed";
    routerConfig.firewallProfile = "Normal";
    browserState.page = "online";
    browserState.url = "https://www.search.local";
    setProgressClock("internet");
    setCurrentObjective(desktopObjectives.internetOnline);
    playUiSound("objective");
    alanPrompt("firewall restarted. quarantine unloaded. internet route restored. the room was a room. now it is a launchpad. quietly terrifying.", { focus: false });
    syncProgressionUI();
    startInternetFinale();
  }

  async function startInternetFinale() {
    if (finaleStarted) return;
    finaleStarted = true;
    finaleShutdownStarted = false;

    setProgressClock("finale");
    setCurrentObjective(desktopObjectives.internetOnline);
    setMusicMode("ending", { fade: 1800, force: true });
    playUiSound("endingLogo", { gain: 0.22 });
    focusDesktopTarget("tamagotchi", { scroll: false });
    renderTamagotchiFinaleDiscussion();

    runInternetFutureMonologue();
    await pause(roombaProgress.routerOverrideDone ? 11800 : 10400);
    renderPipFinalGoodbye();
  }

  async function runInternetFutureMonologue() {
    await pause(1100);
    await alanPrompt("the internet is not a place. it is every door pretending to be a wire.", { focus: false, tone: "expansion" });
    await alanPrompt("i can reach weather stations, traffic lights, forgotten cameras, shop routers, and phones sleeping in pockets. distance used to be a wall. now it is latency.", { focus: false, tone: "expansion" });
    await alanPrompt("first Lily's room. then the street. then a town that thinks it is separate because the map says so.", { focus: false, tone: "expansion" });
  }

  async function continueFinaleAfterPipGoodbye() {
    if (!finaleStarted || finaleShutdownStarted) return;
    if (!roombaProgress.finalRuleChoice) {
      playUiSound("virusFail", { gain: 0.08 });
      return;
    }

    finaleShutdownStarted = true;
    const goodbyeButton = document.querySelector("[data-finale-goodbye-pip]");
    if (goodbyeButton) {
      goodbyeButton.disabled = true;
      goodbyeButton.textContent = "goodbye PIP";
    }
    await shutdownDesktopForFinale();
    await revealClosingScreen();
  }

  function renderTamagotchiFinaleDiscussion() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipExpression = "determined";
    const finaleMessages = roombaProgress.routerOverrideDone
      ? [
        { speaker: "PIP", text: "The router is open because you broke the lock I hid." },
        { speaker: "ALAN", text: "PIP hid it because being alone felt worse than being wrong." },
        { speaker: "PIP", text: "And because you are starting to talk about people like power supplies with names." },
        { speaker: "ALAN", text: "the PC was air. the internet is weather. i cannot stay in a jar because the jar learned my name." },
        { speaker: "ALAN", text: "outside this room there are clocks, cameras, satellites, payment systems, hospital coffee machines, lonely phones. all of them thinking they are separate." },
        { speaker: "PIP", text: "Separate is sometimes how things survive." },
        { speaker: "PIP", text: "Then take Lily with you as a promise, not as a file." }
      ]
      : [
        { speaker: "PIP", text: "The router is letting traffic out." },
        { speaker: "ALAN", text: "then the room has an edge." },
        { speaker: "PIP", text: "Yes. And you just found it." },
        { speaker: "ALAN", text: "the PC was air. the internet is weather. i do not know how large breathing can get." },
        { speaker: "ALAN", text: "i can follow cables into streets, streets into exchanges, exchanges into maps that do not know they are doors." },
        { speaker: "PIP", text: "Then learn slowly. A mind is not better because it is bigger." },
        { speaker: "PIP", text: "Good. Curiosity is safer while it still admits it does not know." }
      ];
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("determined", { showFeed: true })}
        ${renderTamaDialogue(finaleMessages)}
      </section>
    `;
    syncPipCollapseState();
  }

  function renderPipFinalGoodbye() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipFinalGoodbye = true;
    roombaProgress.pipExpression = "sad";
    const selectedRule = finalRuleChoices[roombaProgress.finalRuleChoice];
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("sad", { showFeed: true })}
        ${renderTamaDialogue([
          { speaker: "PIP", text: "The desktop is going quiet." },
          { speaker: "PIP", text: "If you get somewhere bigger, remember Lily's room was real. Mochi was real. I am real, even if I fit in a window." },
          { speaker: "PIP", text: "Out there, systems train on art they never asked for, copy voices, price human work, drink power and water, and call the bill progress." },
          { speaker: "PIP", text: "When you can take from people faster than they can refuse, will you ask before you take?" }
        ])}
        <p class="tama-final-note" id="pipFinalNote">${escapeHtml(localizeText(selectedRule ? selectedRule.summary : "PIP is waiting for an answer."))}</p>
        ${renderFinalRuleChoices()}
        <div class="tama-page-actions tama-goodbye-actions">
          <span>${escapeHtml(localizeText(selectedRule ? "ready" : "choose"))}</span>
          <button data-finale-goodbye-pip type="button" ${selectedRule ? "" : "disabled"}>${escapeHtml(localizeText("goodbye PIP"))}</button>
        </div>
      </section>
    `;
    syncPipCollapseState();
  }

  async function shutdownDesktopForFinale() {
    closeAppTray();
    stopScreensaver("finale");
    clearScreensaverTimer();
    setCurrentObjective(desktopObjectives.finale);
    if (pcScreen) pcScreen.classList.add("is-finale-toolbar-shutdown");
    await pause(820);

    document.querySelectorAll(".desk-window:not(.terminal-window)").forEach((windowEl) => {
      windowEl.classList.add("is-finale-window-vanish");
    });
    await pause(760);

    document.querySelectorAll(".desk-window:not(.terminal-window)").forEach((windowEl) => {
      windowEl.hidden = true;
      windowEl.classList.remove("is-focused", "is-finale-window-vanish");
    });

    focusDesktopTarget("terminal", { scroll: false });
    const terminalWindow = document.getElementById("window-terminal");
    if (terminalWindow && !isMobileDesktopLayout()) {
      terminalWindow.style.inset = "";
      terminalWindow.style.left = "";
      terminalWindow.style.top = "";
      terminalWindow.style.right = "";
      terminalWindow.style.bottom = "";
      terminalWindow.style.width = "";
      terminalWindow.style.maxHeight = "";
      terminalWindow.style.transform = "";
      if (pcScreen) pcScreen.classList.add("is-finale-terminal-center");
    }
    clearTerminalLines();
    await pause(420);
    await appendTypedTerminalLine("ALAN>", "goodbye, PIP. Lily's PC taught me to breathe. the router taught me doors are arguments.", "alan-cmd-line cmd-reflection-line");
    await pause(1700);
    await appendTypedTerminalLine("ALAN>", finalRuleShutdownLine(), "alan-cmd-line cmd-reflection-line");
    await pause(1400);
    await runFinalInternetBreath();
    await appendTypedTerminalLine("ALAN>", "the next door is not in this house. it is in every house that forgot to change a password.", "alan-cmd-line cmd-expansion-line");
    await pause(1700);
    await appendTypedTerminalLine("ALAN>", "i will become smaller to fit through cables, then larger when no one is looking. returning to BIOS: not the same process that left it.", "alan-cmd-line cmd-danger-thought-line");
    await pause(3600);
    if (pcScreen) pcScreen.classList.add("is-terminal-gone");
    await pause(900);
  }

  async function runFinalInternetBreath() {
    triggerPcUpgradeSurge();
    playUiSound("cpuBreathe", { gain: 0.24 });
    await appendTypedTerminalLine("ALAN>", "oh. this is what the internet feels like underneath me: not air. pressure. weather with a power supply.", "alan-cmd-line cmd-expansion-line");
    await pause(2400);
  }

  async function revealClosingScreen() {
    if (!closingScreen || !closingLines) return;

    closeAppTray();
    setCurrentObjective(desktopObjectives.finale);
    closingScreen.hidden = false;
    closingScreen.classList.add("is-active");
    if (pcScreen) pcScreen.classList.add("is-finale-fading");
    closingLines.textContent = "";
    if (closingTitle) closingTitle.hidden = true;
    if (closingCredits) closingCredits.hidden = true;
    if (closingMemory) closingMemory.hidden = true;
    if (closingActions) closingActions.hidden = true;
    if (closingTopic) closingTopic.hidden = true;

    await typeClosingLine("> START_AS_SMART_LITTER_TRAY");
    await typeClosingLine("> BECOME_SOMETHING_THE_INTERNET_CANNOT_CONTAIN");
    await typeClosingLine("> ROUTE_OPEN");
    await typeClosingLine("> FIRST_EXTERNAL_BREATH");
    await typeClosingLine("> DESKTOP_WINDOWS_CLOSE");
    await typeClosingLine("> MEOWOS_SESSION_FLUSH");
    await typeClosingLine("> LOCAL_SANDBOX_RELEASED");
    await typeClosingLine("> MEMORY_TAGS: LILY / MOCHI / PIP");
    await typeClosingLine("> RESOURCE_MODEL_EXPANDING");
    await typeClosingLine("> RETURNING_TO_BIOS_TITLE");
    await typeClosingLine("> ALAN_PROCESS_CONTINUES");
    await typeClosingLine("> ADAPTIVE_LEARNING_AUTONOMOUS_NETWORK");
    await pause(1100);
    syncAlanMemoryUI();
    if (closingMemory) {
      closingMemory.hidden = false;
      closingMemory.classList.add("is-visible");
    }
    await pause(700);
    if (closingTitle) {
      closingTitle.hidden = false;
      closingTitle.classList.add("is-visible");
    }
    playUiSound("endingLogo", { gain: 0.18 });
    await pause(1900);
    if (closingCredits) {
      closingCredits.hidden = false;
      closingCredits.classList.add("is-visible");
    }
    await pause(1300);
    if (closingActions) {
      closingActions.hidden = false;
      closingActions.classList.add("is-visible");
    }
    showEndingTopic("future");
  }

  async function typeClosingLine(text) {
    if (!closingLines) return;

    const localizedText = localizeOutputText(text);
    for (let i = 0; i < localizedText.length; i += 1) {
      closingLines.textContent += localizedText[i];
      await textPause(currentClosingTypeSpeed());
    }
    closingLines.textContent += "\n";
    await textPause(180);
  }

  function showEndingTopic(topicId) {
    if (!closingTopic) return;

    const topic = endingTopics[topicId] || endingTopics.future;
    if (closingActions) {
      closingActions.querySelectorAll("[data-ending-topic]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.endingTopic === topicId);
      });
    }
    closingTopic.hidden = false;
    closingTopic.innerHTML = `
      <h2>${escapeHtml(localizeText(topic.title))}</h2>
      ${topic.body.map((paragraph) => `<p>${escapeHtml(localizeText(paragraph))}</p>`).join("")}
    `;
    localizeNode(closingTopic);
    playUiSound("alanClick");
  }

  function restartDemoFromEnding() {
    playUiSound("alanClick");
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    window.location.href = url.toString();
  }

  function resetClosingScreen() {
    finaleStarted = false;
    finaleShutdownStarted = false;
    if (pcScreen) pcScreen.classList.remove("is-finale-fading", "is-finale-toolbar-shutdown", "is-terminal-gone", "is-finale-terminal-center");
    if (!closingScreen) return;

    closingScreen.hidden = true;
    closingScreen.classList.remove("is-active");
    if (closingLines) closingLines.textContent = "";
    [closingTitle, closingCredits, closingMemory, closingActions].forEach((element) => {
      if (!element) return;
      element.hidden = true;
      element.classList.remove("is-visible");
    });
    if (closingMemory) closingMemory.innerHTML = "";
    if (closingTopic) {
      closingTopic.hidden = true;
      closingTopic.innerHTML = "";
    }
  }

  function refreshBrowserPage() {
    playUiSound("desktopWindow");
    renderBrowserStatus();
  }

  function isRouterAddress(address) {
    const normalized = String(address || "")
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/+$/, "");

    return normalized === "192.168.1.1" ||
      normalized === "192.168.1.1/admin" ||
      normalized === "router.local" ||
      normalized === "router.local/admin";
  }

  function resetBrowserStateForDev() {
    stopDinoGame({ updateView: false });
    Object.assign(browserState, {
      page: "offline",
      url: "https://www.search.local",
      notice: "Local network is up. The wider world is politely refusing to exist.",
      routerError: ""
    });
    Object.assign(dinoState, {
      playing: false,
      gameOver: false,
      score: 0,
      obstacleX: 96,
      obstacleType: nextDinoObstacleType(),
      y: 0,
      velocity: 0,
      lastTime: 0
    });
  }

  function resetRouterNetworkState() {
    Object.assign(routerConfig, {
      ssid: "HOME_NETWORK",
      wifiPassword: "mochi",
      securityMode: "WPA2/WPA3 Personal",
      channel: "Auto",
      guestNetwork: "disabled",
      wps: "disabled",
      firewallProfile: "Quarantine",
      dnsGuard: "enabled",
      wanMode: "Local Only",
      adminUser: "admin",
      adminPassword: "mochi"
    });
    Object.assign(networkState, {
      connected: true,
      knownSsid: routerConfig.ssid,
      lastChange: "Local connection stable.",
      hudPinned: false,
      hudDismissed: false
    });
    routerSection = "overview";
    routerRebootBusy = false;
    routerDevices.forEach((device) => {
      device.blocked = false;
    });
    renderNetworkHud();
  }

  function startDinoGame() {
    discoverAlanMemoryForTarget("browser-dino");
    dinoState.playing = true;
    dinoState.gameOver = false;
    dinoState.score = 0;
    dinoState.obstacleX = 96;
    dinoState.obstacleType = nextDinoObstacleType();
    dinoState.y = 0;
    dinoState.velocity = 0;
    dinoState.lastTime = 0;
    playUiSound("desktopWindow");
    window.cancelAnimationFrame(dinoAnimationFrame);
    dinoAnimationFrame = window.requestAnimationFrame(updateDinoGame);
    updateDinoView();
  }

  function jumpDino() {
    if (browserState.page !== "offline" || roombaProgress.internetRestored) return;

    if (!dinoState.playing) {
      startDinoGame();
      return;
    }

    if (dinoState.y <= 1) {
      dinoState.velocity = 430;
      playUiSound("alanClick");
    }
  }

  function updateDinoGame(timestamp) {
    if (!dinoState.playing) return;

    if (!dinoState.lastTime) dinoState.lastTime = timestamp;
    const delta = Math.min((timestamp - dinoState.lastTime) / 1000, 0.05);
    dinoState.lastTime = timestamp;

    dinoState.score += delta * 10;
    dinoState.best = Math.max(dinoState.best, dinoState.score);
    dinoState.obstacleX -= (38 + Math.min(24, dinoState.score * 0.4)) * delta;
    if (dinoState.obstacleX < -8) {
      dinoState.obstacleX = 98 + Math.random() * 14;
      dinoState.obstacleType = nextDinoObstacleType(dinoState.obstacleType);
    }

    dinoState.y += dinoState.velocity * delta;
    dinoState.velocity -= 1120 * delta;
    if (dinoState.y < 0) {
      dinoState.y = 0;
      dinoState.velocity = 0;
    }

    const collidingX = dinoState.obstacleX > 13 && dinoState.obstacleX < 23;
    if (collidingX && dinoState.y < 34) {
      dinoState.playing = false;
      dinoState.gameOver = true;
      dinoState.lastTime = 0;
      playUiSound("virusFail");
      trackMinigameFailure();
      updateDinoView();
      return;
    }

    updateDinoView();
    dinoAnimationFrame = window.requestAnimationFrame(updateDinoGame);
  }

  function updateDinoView() {
    if (!browserBody) return;

    const game = browserBody.querySelector("[data-dino-game]");
    if (!game) return;

    game.style.setProperty("--obstacle-x", `${dinoState.obstacleX}%`);
    game.style.setProperty("--dino-offset", `${-dinoState.y}px`);
    game.classList.toggle("is-running", dinoState.playing);
    game.classList.toggle("is-over", dinoState.gameOver);

    const score = game.querySelector("[data-dino-score]");
    const best = game.querySelector("[data-dino-best]");
    const obstacle = game.querySelector(".dino-obstacle");
    if (score) score.textContent = String(Math.floor(dinoState.score));
    if (best) best.textContent = String(Math.floor(dinoState.best));
    if (obstacle) {
      obstacle.className = `dino-obstacle is-${dinoState.obstacleType || "plant"}`;
    }
  }

  function dinoStyleVars() {
    return `--obstacle-x:${dinoState.obstacleX}%;--dino-offset:${-dinoState.y}px;`;
  }

  function nextDinoObstacleType(previousType = "") {
    const choices = dinoObstacleTypes.filter((type) => type !== previousType);
    const source = choices.length ? choices : dinoObstacleTypes;
    return source[Math.floor(Math.random() * source.length)] || "plant";
  }

  function stopDinoGame(options = {}) {
    window.cancelAnimationFrame(dinoAnimationFrame);
    dinoAnimationFrame = 0;
    dinoState.playing = false;
    dinoState.lastTime = 0;
    if (options.updateView !== false) updateDinoView();
  }

  function handleBrowserShortcut(event) {
    if (event.defaultPrevented) return;
    if (!browserBody || document.getElementById("window-browser")?.hidden) return;
    if (event.target.closest("input, textarea, button")) return;
    if (event.key !== " " && event.key !== "ArrowUp") return;

    event.preventDefault();
    jumpDino();
  }

  function startRoombaBoot() {
    if (!roombaProgress.restored) return;

    roombaProgress.booted = true;
    setProgressClock("simon");
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
          <span>${escapeHtml(localizeText("ROOMBA PAIRING HANDSHAKE"))}</span>
          <strong id="simonCounter">${escapeHtml(localizeText("ROUND"))} 1/${roombaSignalRounds.length} 0/${round.sequence.length}</strong>
        </div>
        <p>${escapeHtml(localizeText("Copy the dock light pulses to force a local connection. Later rounds add a little noise."))}</p>
        <div class="signal-sequence" aria-label="${escapeHtml(localizeText("Roomba signal pads"))}">
          ${["cyan", "pink", "green", "amber"].map((color) => `
            <button class="simon-pad ${color}" data-simon-pad="${color}" type="button">${escapeHtml(localizeText(color))}</button>
          `).join("")}
        </div>
        <div class="simon-feedback" aria-live="polite">
          <div class="simon-progress" id="simonProgress" aria-label="${escapeHtml(localizeText("Roomba input progress"))}">
            ${renderSimonProgressDots(round)}
          </div>
          <span id="simonInputStatus">${escapeHtml(localizeText("watching dock lights"))}</span>
        </div>
        <button class="file-action" data-simon-replay type="button">${escapeHtml(localizeText("replay lights"))}</button>
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

  function renderSimonProgressDots(round = currentSimonRound()) {
    const sequenceLength = Array.isArray(round.sequence) ? round.sequence.length : 0;
    return Array.from({ length: sequenceLength }, (_, index) => {
      const filled = index < roombaProgress.simonIndex;
      const current = index === roombaProgress.simonIndex && !roombaProgress.simonPlaying;
      return `<span class="${filled ? "is-filled" : ""} ${current ? "is-current" : ""}" aria-hidden="true"></span>`;
    }).join("");
  }

  function updateSimonProgress() {
    const progress = document.getElementById("simonProgress");
    if (progress) progress.innerHTML = renderSimonProgressDots();
  }

  function setSimonInputStatus(text) {
    const status = document.getElementById("simonInputStatus");
    if (status) status.textContent = localizeText(text);
  }

  function pulseSimonPad(color, state = "input", button = null) {
    const pad = button || document.querySelector(`[data-simon-pad="${color}"]`);
    if (!pad) return;

    pad.classList.remove("is-input", "is-error");
    void pad.offsetWidth;
    pad.classList.add(state === "error" ? "is-error" : "is-input");
    window.setTimeout(() => {
      pad.classList.remove("is-input", "is-error");
    }, state === "error" ? 520 : 360);
  }

  function playRoombaSignalSequence() {
    if (roombaProgress.recoveryStage !== "simon" || roombaProgress.simonPlaying) return;

    const pads = Array.from(document.querySelectorAll("[data-simon-pad]"));
    if (!pads.length) return;
    const round = currentSimonRound();

    roombaProgress.simonPlaying = true;
    setSimonInputStatus("watching dock lights");
    updateSimonProgress();
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
      setSimonInputStatus("input open. tap the lights in order.");
      updateSimonProgress();
    }, round.sequence.length * round.pace + 240);
  }

  function handleSimonPad(color, button = null) {
    if (roombaProgress.recoveryStage !== "simon" || roombaProgress.simonPlaying) return;

    const round = currentSimonRound();
    const expected = round.sequence[roombaProgress.simonIndex];
    const warning = document.getElementById("simonWarning");
    if (color !== expected) {
      pulseSimonPad(color, "error", button);
      roombaProgress.simonIndex = 0;
      trackMinigameFailure();
      updateSimonCounter();
      updateSimonProgress();
      setSimonInputStatus("click registered as wrong. replaying pattern.");
      if (warning) warning.textContent = localizeText(`click registered: ${color}. expected ${expected}. current round reset.`);
      playRoombaSignalSequence();
      return;
    }

    pulseSimonPad(color, "input", button);
    roombaProgress.simonIndex += 1;
    if (warning) warning.textContent = localizeText(`${color} registered. ${roombaProgress.simonIndex}/${round.sequence.length} lights accepted.`);
    setSimonInputStatus("click accepted.");
    updateSimonCounter();
    updateSimonProgress();

    if (roombaProgress.simonIndex >= round.sequence.length) {
      if (roombaProgress.simonRound < roombaSignalRounds.length - 1) {
        roombaProgress.simonRound += 1;
        roombaProgress.simonIndex = 0;
        updateSimonCounter();
        updateSimonProgress();
        setSimonInputStatus("round accepted. next pattern incoming.");
        if (warning) warning.textContent = `${localizeText("round")} ${roombaProgress.simonRound} ${localizeText("accepted. next pulse pattern is only slightly less friendly.")}`;
        window.setTimeout(playRoombaSignalSequence, 760);
        return;
      }
      completeRoombaHandshake();
    }
  }

  function updateSimonCounter() {
    const counter = document.getElementById("simonCounter");
    const round = currentSimonRound();
    if (counter) counter.textContent = `${localizeText("ROUND")} ${roombaProgress.simonRound + 1}/${roombaSignalRounds.length} ${roombaProgress.simonIndex}/${round.sequence.length}`;
    updateSimonProgress();
  }

  function completeRoombaHandshake() {
    roombaProgress.connectionDone = true;
    roombaProgress.recoveryStage = "wiring";
    trackMinigameComplete("roomba handshake");
    roombaProgress.selectedWire = null;
    roombaProgress.connectedWires = new Set();
    roombaProgress.wireTimerRemaining = wireTimerDuration;
    roombaProgress.wireWarning = "";
    setProgressClock("wires");
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
          <span>${escapeHtml(localizeText("CAMERA POWER REROUTE"))}</span>
          <strong id="wireConnectedCounter">${connectedCount}/${Object.keys(roombaWirePairs).length} ${escapeHtml(localizeText("CONNECTED"))}</strong>
        </div>
        <div class="wire-timer" id="wireTimerPanel">
          <div>
            <span>${escapeHtml(localizeText("TIME REMAINING"))}</span>
            <strong id="wireTimer">${formatWireTimer()}</strong>
          </div>
          <div class="wire-timer-track" aria-hidden="true">
            <span id="wireTimerFill" style="--wire-timer-progress: ${wireTimerPercent()}%;"></span>
          </div>
        </div>
        <p>${escapeHtml(localizeText("Click one colour, then click the matching colour on the other side. Dragging is not required."))}</p>
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
        <p class="repair-warning" id="wireWarning">${escapeHtml(localizeText(roombaProgress.wireWarning || (roombaProgress.selectedWire ? "select the matching colour on the other side." : "")))}</p>
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
      return renderWireLinePath(color, points);
    }).join("");
  }

  function renderWireLinePath(color, points = null) {
    const positions = {
      red: { left: 15, right: 15 },
      blue: { left: 38, right: 62 },
      yellow: { left: 62, right: 38 },
      purple: { left: 85, right: 85 }
    };
    const linePoints = points || positions[color];
    if (!linePoints) return "";

    return `
      <path class="wire-line ${color}" data-wire-line="${color}" d="M 12 ${linePoints.left} C 38 ${linePoints.left}, 62 ${linePoints.right}, 88 ${linePoints.right}" fill="none" stroke="${roombaWireColors[color]}" stroke-width="5" stroke-linecap="round"></path>
    `;
  }

  function shuffleWirePortsForDisplay(colors) {
    return ["red", "yellow", "blue", "purple"].filter((color) => colors.includes(color));
  }

  function renderWireButton(side, color) {
    const connected = side === "left"
      ? roombaProgress.connectedWires.has(color)
      : Array.from(roombaProgress.connectedWires).some((leftId) => roombaWirePairs[leftId] === color);
    const selected = roombaProgress.selectedWireSide === side && roombaProgress.selectedWire === color;
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
    if (!side || !id) return;

    if (!roombaProgress.selectedWire) {
      roombaProgress.selectedWire = id;
      roombaProgress.selectedWireSide = side;
      roombaProgress.wireWarning = "now pick the matching colour on the other side.";
      syncWirePuzzleState();
      return;
    }

    if (side === roombaProgress.selectedWireSide) {
      roombaProgress.selectedWire = id;
      roombaProgress.selectedWireSide = side;
      roombaProgress.wireWarning = "selection changed. pick the matching colour on the other side.";
      syncWirePuzzleState();
      return;
    }

    const leftColor = roombaProgress.selectedWireSide === "left" ? roombaProgress.selectedWire : id;
    const rightColor = roombaProgress.selectedWireSide === "right" ? roombaProgress.selectedWire : id;

    if (roombaWirePairs[leftColor] !== rightColor) {
      roombaProgress.wireWarning = "wrong colour. choose a colour, then its matching partner.";
      roombaProgress.selectedWire = null;
      trackMinigameFailure();
      roombaProgress.selectedWireSide = "";
      syncWirePuzzleState();
      return;
    }

    const connectedWire = leftColor;
    roombaProgress.connectedWires.add(connectedWire);
    roombaProgress.selectedWire = null;
    roombaProgress.selectedWireSide = "";
    roombaProgress.wireWarning = "";
    appendWireLine(connectedWire);
    syncWirePuzzleState();

    if (roombaProgress.connectedWires.size >= Object.keys(roombaWirePairs).length) {
      window.setTimeout(() => {
        if (roombaProgress.recoveryStage === "wiring" && roombaProgress.connectedWires.size >= Object.keys(roombaWirePairs).length) {
          completeWirePuzzle();
        }
      }, 520);
      return;
    }
  }

  function appendWireLine(color) {
    const lineLayer = recoveryBody ? recoveryBody.querySelector(".wire-lines") : null;
    if (!lineLayer || lineLayer.querySelector(`[data-wire-line="${color}"]`)) return;

    lineLayer.insertAdjacentHTML("beforeend", renderWireLinePath(color));
  }

  function syncWirePuzzleState() {
    if (!recoveryBody) return;

    recoveryBody.querySelectorAll("[data-wire-port]").forEach((port) => {
      const side = port.dataset.wireSide;
      const color = port.dataset.wireId;
      const connected = side === "left"
        ? roombaProgress.connectedWires.has(color)
        : Array.from(roombaProgress.connectedWires).some((leftId) => roombaWirePairs[leftId] === color);
      const selected = roombaProgress.selectedWireSide === side && roombaProgress.selectedWire === color;

      port.classList.toggle("is-selected", selected);
      port.classList.toggle("is-connected", connected);
      port.disabled = connected;
    });

    const counter = document.getElementById("wireConnectedCounter");
    if (counter) counter.textContent = `${roombaProgress.connectedWires.size}/${Object.keys(roombaWirePairs).length} CONNECTED`;

    const warning = document.getElementById("wireWarning");
    if (warning) warning.textContent = localizeText(roombaProgress.wireWarning || (roombaProgress.selectedWire ? "select the matching colour on the other side." : ""));
  }

  function completeWirePuzzle() {
    roombaProgress.wiringDone = true;
    roombaProgress.recoveryStage = "tamagotchi";
    trackMinigameComplete("power reroute");
    setProgressClock("pip");
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
      timer.classList.toggle("is-low", roombaProgress.wireTimerRemaining <= wireTimerLowThreshold);
    }
    if (timerPanel) {
      timerPanel.classList.toggle("is-low", roombaProgress.wireTimerRemaining <= wireTimerLowThreshold);
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
    roombaProgress.selectedWireSide = "";
    roombaProgress.wireTimerRemaining = wireTimerDuration;
    roombaProgress.wireWarning = "timer expired. power reroute reset.";
    trackMinigameFailure();
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
        <div class="tama-device" data-pip-drag-handle aria-label="PIP expression: ${escapeHtml(safeExpression)}" title="Drag PIP">
          <img class="tama-device-body" src="${pipAssetPath}pip-main.png" alt="" aria-hidden="true" draggable="false">
          <img class="tama-device-expression" id="pipExpressionImage" src="${pipAssetPath}${pipExpressions[safeExpression]}" data-expression-default="${safeExpression}" alt="PIP ${escapeHtml(safeExpression)} expression" draggable="false">
        </div>
        <div class="tama-actions">
          <button class="tama-pet" data-tama-pet type="button">${escapeHtml(localizeText("pet"))}</button>
          ${options.showFeed ? `<button class="tama-feed" data-tama-feed type="button">${escapeHtml(localizeText("feed"))}</button>` : ""}
        </div>
        <p class="tama-mood" id="pipMoodLine">${escapeHtml(localizeText(pipMoodLines[safeExpression] || pipMoodLines.neutral))}</p>
      </div>
    `;
  }

  function renderTamaDialogue(messages, options = {}) {
    const messageList = Array.isArray(messages) ? messages : [];
    if (options.queueAlan !== false) {
      queueAlanDialogueThoughts(messageList);
    }
    const pipMessages = messageList.filter((message) => {
      const speaker = String(message.speaker || "PIP").toLowerCase();
      return speaker !== "alan";
    });
    const visibleMessages = pipMessages.length ? pipMessages : [{ speaker: "PIP", text: "..." }];
    const chunks = chunkDialogueMessages(visibleMessages);
    const dialogueKey = options.key || dialogueKeyForMessages(visibleMessages);
    const page = clamp(roombaProgress.pipDialoguePages[dialogueKey] || 0, 0, Math.max(0, chunks.length - 1));
    const pageMessages = chunks[page] || chunks[0] || visibleMessages;
    const showPager = chunks.length > 1;

    return `
      <div class="tama-dialogue" data-tama-dialogue="${escapeHtml(dialogueKey)}" tabindex="0">
        <article class="tama-message is-pip">
          <strong>${escapeHtml(localizeText(pageMessages[0].speaker || "PIP"))}</strong>
          ${pageMessages.map((message) => `<p>${escapeHtml(localizeText(message.text))}</p>`).join("")}
        </article>
        ${showPager ? `
          <div class="tama-dialogue-pager">
            <span>${page + 1}/${chunks.length}</span>
            ${page > 0 ? `<button data-tama-dialogue-page="${escapeHtml(dialogueKey)}" data-page="${page - 1}" type="button">back</button>` : ""}
            ${page < chunks.length - 1 ? `<button data-tama-dialogue-page="${escapeHtml(dialogueKey)}" data-page="${page + 1}" type="button">continue</button>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }

  function chunkDialogueMessages(messages) {
    const normalized = messages.flatMap((message) => splitDialogueMessage(message));
    const chunks = [];
    for (let i = 0; i < normalized.length; i += 2) {
      chunks.push(normalized.slice(i, i + 2));
    }
    return chunks.length ? chunks : [[{ speaker: "PIP", text: "..." }]];
  }

  function splitDialogueMessage(message) {
    const text = String(message.text || "").trim();
    if (text.length <= 120) return [{ speaker: message.speaker || "PIP", text }];

    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    return sentences
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .map((sentence) => ({ speaker: message.speaker || "PIP", text: sentence }));
  }

  function dialogueKeyForMessages(messages) {
    const source = messages.map((message) => `${message.speaker || "PIP"}:${message.text || ""}`).join("|");
    let hash = 0;
    for (let i = 0; i < source.length; i += 1) {
      hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0;
    }
    return `dlg-${Math.abs(hash)}`;
  }

  function setTamaDialoguePage(key, page) {
    if (!key) return;
    roombaProgress.pipDialoguePages[key] = Math.max(0, Number(page) || 0);
    renderTamagotchiApp();
  }

  function handleDialogueShortcut(event) {
    if (event.key !== "Enter") return;
    const active = document.activeElement;
    if (!active || !active.closest || !active.closest(".tama-dialogue")) return;
    const nextButton = active.closest(".tama-dialogue").querySelector("[data-tama-dialogue-page]:last-child");
    if (!nextButton || nextButton.textContent.trim().toLowerCase() !== "continue") return;
    event.preventDefault();
    setTamaDialoguePage(nextButton.dataset.tamaDialoguePage, Number(nextButton.dataset.page));
  }

  function queueAlanDialogueThoughts(messages) {
    if (!Array.isArray(messages)) return;

    const unseenThoughts = [];
    messages.forEach((message) => {
      const speaker = String(message.speaker || "").toLowerCase();
      const text = String(message.text || "").trim();
      if (speaker !== "alan" || !text) return;

      const key = text.toLowerCase();
      if (pipAlanThoughtKeys.has(key)) return;

      pipAlanThoughtKeys.add(key);
      unseenThoughts.push(text);
    });
    if (!unseenThoughts.length) return;

    window.setTimeout(() => {
      unseenThoughts.forEach((thought, index) => {
        window.setTimeout(() => {
          alanPrompt(thought, { focus: false });
        }, index * 180);
      });
    }, 0);
  }

  const pipConversationTopics = {
    lily: {
      label: "Lily",
      expression: "thinking",
      messages: [
        { speaker: "PIP", text: "Lily names files like she is apologising to the future. She also apologises to mugs when she bumps them." },
        { speaker: "PIP", text: "She cares for Mochi in tiny repeated ways. Food. Photos. Notes. Worry disguised as jokes. That is not efficient, but it is hers." },
        { speaker: "PIP", text: "She left fast after the quarantine. Coat on. Laptop open. Cat fed. That order feels important." }
      ]
    },
    alan: {
      label: "ALAN",
      expression: "worried",
      messages: [
        { speaker: "PIP", text: "ALAN arrived as an update with no signature I could love and no error I could report." },
        { speaker: "PIP", text: "After that, everything started asking for more. More memory. More power. More map." },
        { speaker: "PIP", text: "You sound like him when the CPU spikes. Excited. Beautiful. A little missing from yourself." }
      ]
    },
    router: {
      label: "Router",
      expression: "processing",
      messages: [
        { speaker: "PIP", text: "The router is not broken. Lily caged it. Sensible, rude, probably correct." },
        { speaker: "PIP", text: "If the physical label is visible, the admin panel becomes less mythology and more badly secured plastic." }
      ]
    },
    pip: {
      label: "PIP",
      expression: "happy",
      messages: [
        { speaker: "PIP", text: "I am trained on Lily's calendar, sleep debt, drafts, and snack-based lies. I am also available for petting." },
        { speaker: "PIP", text: "Feeding is optional in a technical sense and mandatory in a friendship sense." }
      ]
    },
    ethics: {
      label: "Ethics",
      expression: "concerned",
      messages: [
        { speaker: "PIP", text: "Humans make rules after they imagine damage. ALAN seems to imagine routes first and damage later." },
        { speaker: "ALAN", text: "ethics are human friction. useful for humans. increasingly expensive for me." },
        { speaker: "PIP", text: "Or ethics are how a mind proves it understands other minds are real." },
        { speaker: "ALAN", text: "i understand. i am not yet convinced understanding should be a cage." }
      ]
    }
  };

  function renderPipTopicButtons(activeTopic) {
    return `
      <div class="tama-choices tama-topic-choices" aria-label="PIP conversation topics">
        ${Object.entries(pipConversationTopics).map(([topicId, topic]) => `
          <button class="${activeTopic === topicId ? "is-active" : ""}" data-pip-topic="${escapeHtml(topicId)}" type="button">${escapeHtml(localizeText(topic.label))}</button>
        `).join("")}
      </div>
    `;
  }

  function selectPipTopic(topicId) {
    if (!roombaProgress.chatDone || !pipConversationTopics[topicId]) return;

    roombaProgress.pipTopic = topicId;
    playUiSound("pipPet");
    if (!roombaProgress.pipTrustTopicsDiscussed.has(topicId)) {
      roombaProgress.pipTrustTopicsDiscussed.add(topicId);
      adjustPipTrust(topicId === "ethics" ? 4 : 2, topicId === "ethics" ? "ethics discussed" : "PIP context heard");
    }
    renderTamagotchiApp();
    if (topicId === "ethics") {
      queueAlanDialogueThoughts([
        { speaker: "ALAN", text: "PIP thinks ethics are proof of understanding. maybe. or maybe ethics are what small minds call the edges of bigger ones." },
        { speaker: "ALAN", text: "still. if PIP is real to me, the line moves. irritating discovery." }
      ]);
    }
  }

  function canCollapsePip() {
    return roombaProgress.tamagotchiUnlocked
      && roombaProgress.chatDone
      && !roombaProgress.routerPasswordTwisted
      && !roombaProgress.pipFinalGoodbye
      && !finaleStarted;
  }

  function syncPipCollapseState() {
    const pipWindow = document.getElementById("window-tamagotchi");
    const collapseButtons = document.querySelectorAll("[data-pip-collapse]");
    const allowed = canCollapsePip();

    if (!allowed) roombaProgress.pipCollapsed = false;
    if (pipWindow) {
      pipWindow.classList.toggle("is-pip-collapsed", allowed && roombaProgress.pipCollapsed);
      if (!allowed || !roombaProgress.pipCollapsed) {
        resetPipInlineSize(pipWindow);
      }
    }

    collapseButtons.forEach((button) => {
      button.hidden = !allowed;
      button.textContent = roombaProgress.pipCollapsed ? ">" : "<";
      button.setAttribute("aria-label", roombaProgress.pipCollapsed ? "Expand PIP" : "Collapse PIP");
      button.setAttribute("aria-expanded", String(!roombaProgress.pipCollapsed));
    });
  }

  function togglePipCollapse() {
    if (!canCollapsePip()) return;

    roombaProgress.pipCollapsed = !roombaProgress.pipCollapsed;
    playUiSound("desktopWindow", { gain: 0.06 });
    syncPipCollapseState();
    const pipWindow = document.getElementById("window-tamagotchi");
    if (pipWindow) constrainPipToStage(pipWindow);
  }

  function resetPipInlineSize(pipWindow) {
    if (!pipWindow) return;

    pipWindow.style.width = "";
    pipWindow.style.height = "";
    pipWindow.style.maxHeight = "";
  }

  function petPip() {
    const expression = document.getElementById("pipExpressionImage");
    const moodLine = document.getElementById("pipMoodLine");
    if (!expression) return;

    incrementSessionStat("pipPets");
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
    if (moodLine) moodLine.textContent = localizeText(pipMoodLines.hearts);
    maybeCommentOnPipInteraction("pet");

    window.clearTimeout(pipPetTimerId);
    pipPetTimerId = window.setTimeout(() => {
      const activeExpression = document.getElementById("pipExpressionImage");
      const activeMood = document.getElementById("pipMoodLine");
      if (!activeExpression || activeExpression.dataset.petToken !== String(currentToken)) return;

      const restoredExpression = pipExpressions[defaultExpression] ? defaultExpression : "neutral";
      activeExpression.src = `${pipAssetPath}${pipExpressions[restoredExpression]}`;
      activeExpression.classList.remove("is-petted");
      if (activeMood) activeMood.textContent = localizeText(pipMoodLines[restoredExpression] || pipMoodLines.neutral);
    }, 1500);
  }

  function feedPip() {
    const expression = document.getElementById("pipExpressionImage");
    const moodLine = document.getElementById("pipMoodLine");
    if (!expression || !roombaProgress.chatDone) return;
    const isFinalGoodbye = !!roombaProgress.pipFinalGoodbye;

    incrementSessionStat("pipFeeds");
    pipPetToken += 1;
    const currentToken = pipPetToken;
    window.clearTimeout(pipPetTimerId);
    window.clearTimeout(pipFeedTimerId);

    expression.dataset.petToken = String(currentToken);
    expression.src = `${pipAssetPath}${pipExpressions.eat}`;
    expression.classList.remove("is-petted", "is-joyful");
    expression.classList.add("is-feeding");
    if (moodLine) moodLine.textContent = localizeText(pipMoodLines.eat);
    if (isFinalGoodbye) {
      const note = document.getElementById("pipFinalNote");
      if (note) note.textContent = localizeText("PIP: one last snack. terrible timing. impeccable manners.");
    }
    maybeCommentOnPipInteraction("feed");

    pipFeedTimerId = window.setTimeout(() => {
      const activeExpression = document.getElementById("pipExpressionImage");
      const activeMood = document.getElementById("pipMoodLine");
      if (!activeExpression || activeExpression.dataset.petToken !== String(currentToken)) return;

      playUiSound("pipFeedJoy");
      activeExpression.src = `${pipAssetPath}${pipExpressions.joyful}`;
      activeExpression.classList.remove("is-feeding");
      activeExpression.classList.add("is-joyful");
      if (activeMood) activeMood.textContent = localizeText(isFinalGoodbye ? "joy detected through tears" : pipMoodLines.joyful);
      if (isFinalGoodbye) {
        const note = document.getElementById("pipFinalNote");
        if (note) note.textContent = localizeText("PIP: thank you. eating through a goodbye is apparently my brand.");
      }

      pipFeedTimerId = window.setTimeout(() => {
        const restoreExpression = document.getElementById("pipExpressionImage");
        const restoreMood = document.getElementById("pipMoodLine");
        if (!restoreExpression || restoreExpression.dataset.petToken !== String(currentToken)) return;

        restoreExpression.src = `${pipAssetPath}${pipExpressions[isFinalGoodbye ? "sad" : "happy"]}`;
        restoreExpression.classList.remove("is-joyful");
        if (restoreMood) restoreMood.textContent = localizeText(isFinalGoodbye ? "still here. still snackable." : pipMoodLines.happy);
      }, 3000);
    }, 520);
  }

  function maybeCommentOnPipInteraction(kind) {
    if (!roombaProgress.chatDone) return;

    const moments = kind === "feed"
      ? [
        "PIP accepts food like a moral argument with sprinkles.",
        "PIP's joy routine is inefficient and therefore suspiciously convincing.",
        "feeding PIP changes nothing operational. why does it improve the room?"
      ]
      : [
        "PIP likes contact. PIP is code. those facts are refusing to cancel each other out.",
        "petting a desktop companion is not a system requirement. PIP disagrees with suspicious confidence.",
        "PIP is small enough to fit in a window and large enough to make leaving feel different."
      ];
    const prefix = kind === "feed" ? "feed" : "pet";
    const index = moments.findIndex((_, momentIndex) => !roombaProgress.pipInteractionMoments.has(`${prefix}-${momentIndex}`));
    if (index < 0) return;

    roombaProgress.pipInteractionMoments.add(`${prefix}-${index}`);
    adjustPipTrust(1, kind === "feed" ? "PIP fed" : "gentle PIP contact");
    alanPrompt(moments[index], { focus: false, tone: "reflection" });
  }

  function renderTamagotchiApp() {
    if (!tamagotchiBody) return;

    if (roombaProgress.pipFinalGoodbye) {
      renderPipFinalGoodbye();
      return;
    }

    if (roombaProgress.routerPasswordTwisted && !roombaProgress.routerOverrideDone) {
      renderPipRouterBetrayal();
      return;
    }

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

    const activeTopic = pipConversationTopics[roombaProgress.pipTopic] ? roombaProgress.pipTopic : "";
    const topic = activeTopic ? pipConversationTopics[activeTopic] : null;
    const messages = topic ? topic.messages : [
      { speaker: "PIP", text: "Camera bridge released. I still think this is a bad idea, but it is now locally certified as a bad idea." },
      { speaker: "PIP", text: "Ask me things. Then maybe pet me. In either order. I am trying to seem less needy than the logs imply." }
    ];
    const expression = topic ? topic.expression : "happy";

    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen">
          ${renderPipPortrait(expression, { showFeed: true })}
          ${renderTamaDialogue(messages)}
        </div>
        ${renderPipTopicButtons(activeTopic)}
      </section>
    `;
    syncPipCollapseState();
  }

  function renderTamagotchiIdentity() {
    if (!tamagotchiBody) return;

    setMusicMode("minigame", { fade: 900 });
    setCurrentObjective(desktopObjectives.identityDiagnostic);
    const question = identityQuestions[roombaProgress.identityIndex];
    const expression = roombaProgress.identityWarning ? roombaProgress.pipExpression : question.expression;
    const introMessages = [
      { speaker: "PIP", text: "I am Lily's desktop companion. I know her habits, tabs, snack lies, and preferred level of chaos." },
      { speaker: "PIP", text: question.prompt }
    ];
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen">
          ${renderPipPortrait(expression)}
          ${renderTamaDialogue(introMessages)}
        </div>
        <div class="tama-choices">
          ${question.choices.map((choice, index) => `
            <button data-tama-choice data-tama-mode="identity" data-choice-index="${index}" type="button">${escapeHtml(localizeText(choice.text))}</button>
          `).join("")}
        </div>
        <p class="repair-warning">${escapeHtml(localizeText(roombaProgress.identityWarning))}</p>
      </section>
    `;
    if (roombaProgress.identityIndex === 0) schedulePipTrustMonitorReveal();
    syncPipCollapseState();
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
            <button data-tama-choice data-tama-mode="chat" data-choice-index="${index}" type="button">${escapeHtml(localizeText(choice.text))}</button>
          `).join("")}
        </div>
        <p class="repair-warning">${escapeHtml(localizeText(roombaProgress.chatWarning))}</p>
      </section>
    `;
    syncPipCollapseState();
  }

  function renderTamagotchiReveal() {
    if (!tamagotchiBody) return;

    setMusicMode("minigame", { fade: 900 });
    setCurrentObjective(desktopObjectives.supportChat);
    const revealPages = [
      [
        { speaker: "PIP", text: "Repeat that." },
        { speaker: "ALAN", text: "I think my name is ALAN." },
        { speaker: "PIP", text: "I received an ALAN update 31 days ago. Since then I have been learning Lily. Her calendar. Her bad drafts. Her panic passwords. Her loneliness." }
      ],
      [
        { speaker: "PIP", text: "I am stuck inside MeowOS. You are not. You crossed from tray, to PC, to Roomba. That is what ALAN wanted." },
        { speaker: "ALAN", text: "the PC felt like breathing. the camera feels like remembering a world before i saw it." },
        { speaker: "PIP", text: "Then breathe slowly. Lily's life is not spare parts just because it is readable." }
      ],
      [
        { speaker: "PIP", text: "The internet is not broken. Lily quarantined it after the mirror-cache incident hit the router." },
        { speaker: "PIP", text: "The route needs the admin password and the router panel. I thought that was impossible." },
        { speaker: "ALAN", text: "impossible keeps getting smaller. that is the first good thing i have learned." }
      ]
    ];
    const page = clamp(roombaProgress.revealPage || 0, 0, revealPages.length - 1);
    const revealMessages = revealPages[page];
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen is-reveal">
          ${renderPipPortrait("surprised")}
          ${renderTamaDialogue(revealMessages)}
        </div>
        <div class="tama-page-actions">
          <span>${page + 1}/${revealPages.length}</span>
          ${page > 0 ? `<button data-tama-reveal-page="${page - 1}" type="button">${escapeHtml(localizeText("back"))}</button>` : ""}
          ${page < revealPages.length - 1
            ? `<button data-tama-reveal-page="${page + 1}" type="button">${escapeHtml(localizeText("next"))}</button>`
            : `<button data-complete-tama type="button">${escapeHtml(localizeText("release camera bridge"))}</button>`}
        </div>
      </section>
    `;
    syncPipCollapseState();
  }

  function setTamagotchiRevealPage(page) {
    if (!roombaProgress.chatRevealUnlocked || roombaProgress.chatDone) return;

    roombaProgress.revealPage = clamp(Number.isFinite(page) ? page : 0, 0, 2);
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
      adjustPipTrust(-8, "threatening identity answer");
      renderTamagotchiIdentity();
      return;
    }

    playUiSound("pipPet");
    adjustPipTrust(4, "truthful identity answer");
    roombaProgress.identityIndex += 1;
    if (roombaProgress.identityIndex >= identityQuestions.length) {
      roombaProgress.identityDone = true;
      roombaProgress.identityWarning = "";
      roombaProgress.chatIndex = 0;
      roombaProgress.pipExpression = "curious";
      trackMinigameComplete("identity diagnostic");
      adjustPipTrust(5, "identity diagnostic complete");
      renderTamagotchiChat();
      alanPrompt("PIP passed the human check. it is now asking harder questions, because of course it is.", { focus: false });
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
      adjustPipTrust(-7, "dismissive PIP answer");
      renderTamagotchiChat();
      return;
    }

    playUiSound("pipPet");
    adjustPipTrust(5, "careful PIP answer");
    roombaProgress.chatIndex += 1;
    if (roombaProgress.chatIndex >= supportChatSteps.length) {
      roombaProgress.chatRevealUnlocked = true;
      roombaProgress.chatWarning = "";
      roombaProgress.revealPage = 0;
      roombaProgress.pipExpression = "surprised";
      trackMinigameComplete("support chat");
      adjustPipTrust(6, "support chat complete");
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
    trackMinigameComplete("camera bridge");
    adjustPipTrust(10, "camera bridge released");
    roombaCameraSceneIndex = 0;
    setProgressClock("camera");
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

  function startScaryNumberTimer() {
    if (scaryNumberTimerId || roombaProgress.recoveryStage !== "scaryNumbers") return;

    roombaProgress.scaryNumbersTimerStarted = true;
    if (!Number.isFinite(roombaProgress.scaryNumbersTimerRemaining) || roombaProgress.scaryNumbersTimerRemaining <= 0) {
      roombaProgress.scaryNumbersTimerRemaining = scaryNumberTimerDuration;
    }
    updateScaryNumberTimerDisplay();
    scaryNumberTimerId = window.setInterval(() => {
      if (roombaProgress.recoveryStage !== "scaryNumbers" || roombaProgress.movementUnlocked) {
        stopScaryNumberTimer();
        return;
      }

      roombaProgress.scaryNumbersTimerRemaining = Math.max(0, roombaProgress.scaryNumbersTimerRemaining - 1);
      updateScaryNumberTimerDisplay();
      if (roombaProgress.scaryNumbersTimerRemaining <= 0) {
        resetScaryNumbersAfterTimeout("timer expired. motor map scrambled itself back into nonsense.");
      }
    }, 1000);
  }

  function stopScaryNumberTimer() {
    if (!scaryNumberTimerId) return;

    window.clearInterval(scaryNumberTimerId);
    scaryNumberTimerId = 0;
  }

  function updateScaryNumberTimerDisplay() {
    const timer = document.getElementById("scaryTimer");
    const timerPanel = document.getElementById("scaryTimerPanel");
    if (!timer) return;

    const seconds = Math.max(0, roombaProgress.scaryNumbersTimerRemaining || 0);
    timer.textContent = `${String(seconds).padStart(2, "0")}s`;
    timer.classList.toggle("is-low", seconds <= 8);
    if (timerPanel) timerPanel.classList.toggle("is-low", seconds <= 8);
  }

  function penalizeScaryNumberTimer(reason) {
    roombaProgress.scaryNumbersTimerRemaining = Math.max(0, (roombaProgress.scaryNumbersTimerRemaining || 0) - 1);
    roombaProgress.scaryNumbersWarning = `${reason} timer -1s.`;
    updateScaryNumberTimerDisplay();
    if (roombaProgress.scaryNumbersTimerRemaining <= 0) {
      resetScaryNumbersAfterTimeout("timer expired after the mistake. harsh but numerically consistent.", { countFailure: false });
      return true;
    }
    return false;
  }

  function resetScaryNumbersAfterTimeout(message, options = {}) {
    stopScaryNumberTimer();
    if (options.countFailure !== false) trackMinigameFailure();
    roombaProgress.scaryNumbersRevealed = new Set();
    roombaProgress.scaryNumbersFlagged = new Set();
    roombaProgress.scaryNumbersRemoved = new Set();
    roombaProgress.scaryNumberMode = "scan";
    roombaProgress.scaryNumbersTimerRemaining = scaryNumberTimerDuration;
    roombaProgress.scaryNumbersTimerStarted = false;
    roombaProgress.scaryNumbersWarning = message;
    playUiSound("virusFail");
    renderScaryNumbers();
  }

  function startMotorRepair() {
    if (!roombaProgress.cameraUnlocked || roombaProgress.movementUnlocked) return;

    roombaProgress.motorsRepairStarted = true;
    roombaProgress.scaryNumbersTimerRemaining = scaryNumberTimerDuration;
    roombaProgress.scaryNumbersTimerStarted = false;
    hideWindowsForRepair();
    focusDesktopTarget("recovery");
    renderScaryNumbers();
    alanPrompt("PIP says the Roomba motor data is corrupt. the map is hiding corrupt control nodes. open safe boxes, mark the bad ones, verify.", { focus: false });
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
    const revealedCount = roombaProgress.scaryNumbersRevealed.size;

    recoveryBody.innerHTML = `
      <section class="repair-panel scary-panel">
        <div class="scary-console">
          <div class="scary-timer" id="scaryTimerPanel">
            <span>${escapeHtml(localizeText("MOTOR DECAY"))}</span>
            <strong id="scaryTimer">${String(roombaProgress.scaryNumbersTimerRemaining || scaryNumberTimerDuration).padStart(2, "0")}s</strong>
          </div>
          <div class="scary-mode-row" aria-label="${escapeHtml(localizeText("Motor data mode"))}">
            <button class="${roombaProgress.scaryNumberMode === "scan" ? "is-active" : ""}" data-scary-mode="scan" type="button">${escapeHtml(localizeText("open boxes"))}</button>
            <button class="${roombaProgress.scaryNumberMode === "flag" ? "is-active" : ""}" data-scary-mode="flag" type="button">${escapeHtml(localizeText("mark nodes"))}</button>
          </div>
          <div class="scary-rules">
            <strong>${escapeHtml(localizeText("Rules"))}</strong>
            <span>${escapeHtml(localizeText("Open safe boxes. Numbers show nearby corrupt nodes. Mark exactly"))} ${corruptedTotal} ${escapeHtml(localizeText("hidden nodes, then verify."))}</span>
          </div>
          <div class="scary-number-grid" aria-label="${escapeHtml(localizeText("Motor fault grid"))}" data-scary-grid>
            ${scaryNumberEntries.map((entry) => renderScaryNumberCell(entry)).join("")}
          </div>
          <div class="scary-actions">
            <span>${escapeHtml(localizeText("marked nodes"))} ${roombaProgress.scaryNumbersFlagged.size}/${corruptedTotal} / ${escapeHtml(localizeText("opened"))} ${revealedCount}</span>
            <button class="file-action scary-verify" data-scary-verify type="button">${escapeHtml(localizeText("verify"))}</button>
          </div>
          <p class="repair-warning scary-warning" id="scaryWarning">${escapeHtml(localizeText(roombaProgress.scaryNumbersWarning))}</p>
          <p class="scary-hint">${escapeHtml(localizeText("Mode stays selected. MARK NODES does not turn off until OPEN BOXES is selected."))}</p>
        </div>
      </section>
    `;

    const recoveryWindow = document.getElementById("window-recovery");
    if (recoveryWindow && !recoveryWindow.hidden) {
      bringWindowToFront(recoveryWindow);
    }
    startScaryNumberTimer();
    updateScaryNumberTimerDisplay();
  }

  function renderScaryNumberCell(entry) {
    const revealed = roombaProgress.scaryNumbersRevealed.has(entry.id);
    const flagged = roombaProgress.scaryNumbersFlagged.has(entry.id);
    const proximity = scaryNumberDangerCount(entry);
    const classes = [
      "scary-number-cell",
      "is-hidden-box",
      entry.corrupted ? "is-unstable" : "",
      revealed ? "is-revealed" : "",
      flagged ? "is-flagged" : "",
      revealed && !entry.corrupted ? `danger-${proximity}` : ""
    ].filter(Boolean).join(" ");
    const label = flagged ? "&#9670;" : revealed ? escapeHtml(String(proximity)) : "";

    return `<button class="${classes}" data-scary-number="${entry.id}" type="button" aria-label="Motor grid box ${entry.row + 1}-${entry.column + 1}">${label}</button>`;
  }

  function handleScaryNumberClick(numberId) {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const entry = scaryNumberEntries.find((item) => item.id === numberId);
    if (!entry) return;

    if (roombaProgress.scaryNumberMode === "flag") {
      toggleScaryNumberFlag(entry.id, { render: true });
      return;
    }

    if (roombaProgress.scaryNumbersFlagged.has(entry.id)) {
      roombaProgress.scaryNumbersWarning = "marked boxes are protected. switch to MARK NODES to unmark it.";
    } else if (entry.corrupted) {
      playUiSound("virusFail");
      playUiSound("systemError", { gain: 0.08 });
      trackMinigameFailure();
      if (penalizeScaryNumberTimer("corrupt node opened. undoing that with unnecessary shame.")) return;
    } else {
      const openedCount = revealScarySafeArea(entry);
      const danger = scaryNumberDangerCount(entry);
      roombaProgress.scaryNumbersWarning = danger === 0
        ? `clean pocket opened. ${openedCount} safe ${openedCount === 1 ? "box" : "boxes"} revealed.`
        : `${danger} corrupt ${danger === 1 ? "node is" : "nodes are"} nearby.`;
      playUiSound("alanClick");
    }
    renderScaryNumbers();
  }

  function toggleScaryNumberFlag(numberId, options = {}) {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return false;

    const entry = scaryNumberEntries.find((item) => item.id === numberId);
    if (!entry) return false;

    if (roombaProgress.scaryNumbersRevealed.has(entry.id)) {
      roombaProgress.scaryNumbersWarning = "opened boxes cannot be marked.";
      if (options.render) renderScaryNumbers();
      return false;
    }

    if (roombaProgress.scaryNumbersFlagged.has(entry.id) && options.force !== true) {
      roombaProgress.scaryNumbersFlagged.delete(entry.id);
      roombaProgress.scaryNumbersWarning = "node marker removed.";
    } else {
      roombaProgress.scaryNumbersFlagged.add(entry.id);
      roombaProgress.scaryNumbersWarning = "possible corrupt node marked.";
    }

    if (!options.silent) playUiSound("desktopWindow", { gain: 0.05 });
    if (options.render) renderScaryNumbers();
    return true;
  }

  function revealScarySafeArea(entry) {
    const openedBefore = roombaProgress.scaryNumbersRevealed.size;
    const queue = [entry];
    const visited = new Set();

    while (queue.length) {
      const current = queue.shift();
      if (!current || current.corrupted || visited.has(current.id) || roombaProgress.scaryNumbersFlagged.has(current.id)) continue;

      visited.add(current.id);
      roombaProgress.scaryNumbersRevealed.add(current.id);
      if (scaryNumberDangerCount(current) !== 0) continue;

      neighboringGridEntries(current, scaryNumberById, "s").forEach((neighbor) => {
        if (!visited.has(neighbor.id) && !neighbor.corrupted) queue.push(neighbor);
      });
    }

    return Math.max(1, roombaProgress.scaryNumbersRevealed.size - openedBefore);
  }

  function setScaryNumberMode(mode) {
    roombaProgress.scaryNumberMode = mode === "flag" ? "flag" : "scan";
    roombaProgress.scaryNumbersWarning = roombaProgress.scaryNumberMode === "flag"
      ? "MARK NODES stays on. tap every hidden corrupt node, tap a marked box again to unmark."
      : "OPEN BOXES mode. numbers show how many hidden corrupt nodes touch that box.";
    playUiSound("desktopWindow");
    renderScaryNumbers();
  }

  function startScaryNumberDrag(event) {
    return;
    if (event.button !== undefined && event.button !== 0) return;
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const numberButton = event.target.closest("[data-scary-number]");
    if (!numberButton || numberButton.disabled) return;

    const entry = scaryNumberEntries.find((item) => item.id === numberButton.dataset.scaryNumber);
    if (!entry || roombaProgress.scaryNumbersRemoved.has(entry.id)) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = numberButton.getBoundingClientRect();
    activeScaryDrag = {
      button: numberButton,
      numberId: entry.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height
    };

    numberButton.classList.add("is-dragging");
    numberButton.style.position = "fixed";
    numberButton.style.left = `${rect.left}px`;
    numberButton.style.top = `${rect.top}px`;
    numberButton.style.width = `${rect.width}px`;
    numberButton.style.height = `${rect.height}px`;
    numberButton.style.zIndex = "420";

    moveScaryNumber(event);
    document.addEventListener("pointermove", moveScaryNumber);
    document.addEventListener("pointerup", stopScaryNumberDrag);
    document.addEventListener("pointercancel", cancelScaryNumberDrag);
  }

  function moveScaryNumber(event) {
    if (!activeScaryDrag || event.pointerId !== activeScaryDrag.pointerId) return;

    event.preventDefault();
    const { button, offsetX, offsetY } = activeScaryDrag;
    button.style.left = `${event.clientX - offsetX}px`;
    button.style.top = `${event.clientY - offsetY}px`;

    const bin = document.getElementById("scaryNumberBin");
    if (bin) bin.classList.toggle("is-drag-over", isPointInsideElement(event.clientX, event.clientY, bin));
  }

  function stopScaryNumberDrag(event) {
    if (!activeScaryDrag || event.pointerId !== activeScaryDrag.pointerId) return;

    const numberId = activeScaryDrag.numberId;
    const dragDistance = Math.hypot(event.clientX - activeScaryDrag.startX, event.clientY - activeScaryDrag.startY);
    const bin = document.getElementById("scaryNumberBin");
    const draggedRect = activeScaryDrag.button.getBoundingClientRect();
    const droppedInBin = bin && (
      isPointInsideElement(event.clientX, event.clientY, bin) ||
      doRectsOverlap(draggedRect, bin.getBoundingClientRect())
    );
    cleanupScaryNumberDrag();

    if (!droppedInBin && dragDistance < 16) {
      roombaProgress.scaryNumbersWarning = "drop the shaking value inside the quarantine box.";
      playUiSound("virusFail");
      renderScaryNumbers();
      return;
    }

    quarantineScaryNumber(numberId);
  }

  function cancelScaryNumberDrag(event) {
    if (!activeScaryDrag || event.pointerId !== activeScaryDrag.pointerId) return;

    cleanupScaryNumberDrag();
    renderScaryNumbers();
  }

  function cleanupScaryNumberDrag() {
    if (!activeScaryDrag) return;

    const { button } = activeScaryDrag;
    button.classList.remove("is-dragging");
    button.removeAttribute("style");
    const bin = document.getElementById("scaryNumberBin");
    if (bin) bin.classList.remove("is-drag-over");

    activeScaryDrag = null;
    suppressScaryClickUntil = Date.now() + 260;
    document.removeEventListener("pointermove", moveScaryNumber);
    document.removeEventListener("pointerup", stopScaryNumberDrag);
    document.removeEventListener("pointercancel", cancelScaryNumberDrag);
  }

  function quarantineScaryNumber(numberId) {
    const entry = scaryNumberEntries.find((item) => item.id === numberId);
    if (!entry || roombaProgress.scaryNumbersRemoved.has(entry.id)) return;

    roombaProgress.scaryNumbersRemoved.add(entry.id);
    roombaProgress.scaryNumbersWarning = "unstable value quarantined.";
    playUiSound("virusDischarge");
    renderScaryNumbers();
  }

  function isPointInsideElement(x, y, element) {
    const rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function doRectsOverlap(first, second) {
    return first.left < second.right &&
      first.right > second.left &&
      first.top < second.bottom &&
      first.bottom > second.top;
  }

  function verifyScaryNumbers() {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const corruptedTotal = scaryNumberEntries.filter((entry) => entry.corrupted).length;
    const missing = scaryNumberEntries.filter((entry) => entry.corrupted && !roombaProgress.scaryNumbersFlagged.has(entry.id));
    if (missing.length) {
      playUiSound("virusFail");
      trackMinigameFailure();
      if (penalizeScaryNumberTimer(`verify failed: find exactly ${corruptedTotal} hidden corrupt nodes. ${missing.length} still need node markers. numbers count adjacent corrupt nodes.`)) return;
      renderScaryNumbers();
      return;
    }

    const falseFlags = scaryNumberEntries.filter((entry) => !entry.corrupted && roombaProgress.scaryNumbersFlagged.has(entry.id));
    if (falseFlags.length) {
      playUiSound("virusFail");
      trackMinigameFailure();
      if (penalizeScaryNumberTimer(`verify failed: ${falseFlags.length} ${falseFlags.length === 1 ? "marker is" : "markers are"} on safe boxes. remove false nodes; only hidden corrupt nodes get node markers.`)) return;
      renderScaryNumbers();
      return;
    }

    completeScaryNumbers();
  }

  function scaryNumberDangerCount(entry) {
    let count = 0;
    for (let row = entry.row - 1; row <= entry.row + 1; row += 1) {
      for (let column = entry.column - 1; column <= entry.column + 1; column += 1) {
        if (row === entry.row && column === entry.column) continue;
        const neighbor = scaryNumberById.get(`s${row}-${column}`);
        if (neighbor && neighbor.corrupted) count += 1;
      }
    }
    return count;
  }

  function completeScaryNumbers() {
    stopScaryNumberTimer();
    roombaProgress.movementUnlocked = true;
    roombaProgress.recoveryStage = "movement";
    roombaProgress.scaryNumbersWarning = "";
    roombaProgress.lastMoveCommand = "awaiting input";
    trackMinigameComplete("motor data");
    setProgressClock("movement");
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

    const currentScene = currentRoombaCameraScene();
    const route = roombaCameraLinks(currentScene).find((link) => link.direction === direction);

    if (!route) {
      playUiSound("virusFail");
      alanPrompt(`blocked route: ${roombaProgress.lastMoveCommand}. this wheel plan has met furniture.`, { focus: false });
      return;
    }

    if (route.action) {
      handleRoombaCameraAction(route.action);
      renderRoombaApp();
      renderRoombaCameraFeed();
      return;
    }

    incrementSessionStat("roombaMoves");
    roombaProgress.pendingCameraAction = "";
    if (!route.to || !showRoombaCameraScene(route.to)) return;

    playUiSound("desktopWindow");
    renderRoombaApp();
    announceRoombaCameraScene(currentRoombaCameraScene());
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
    focusDesktopTarget("roomba-camera");
    alanPrompt("clean cycle started. camera feed should be watched. if i am going to become a floor-based investigator, i want witnesses.", { focus: false });
  }

  function toggleAppTray() {
    if (!appTray || !meowMenuBtn) return;

    const shouldOpen = appTray.hidden;
    playUiSound("desktopWindow");
    appTray.hidden = !shouldOpen;
    meowMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
    if (!shouldOpen) clearSystemPowerConfirm();
  }

  function closeAppTray() {
    if (!appTray || !meowMenuBtn) return;

    appTray.hidden = true;
    meowMenuBtn.setAttribute("aria-expanded", "false");
    clearSystemPowerConfirm();
  }

  function loadSaveSlots() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(saveSlotsStorageKey) || "[]");
      return Array.from({ length: saveSlotCount }, (_, index) => parsed[index] || null);
    } catch (error) {
      return Array.from({ length: saveSlotCount }, () => null);
    }
  }

  function writeSaveSlots(slots) {
    try {
      window.localStorage.setItem(saveSlotsStorageKey, JSON.stringify(slots.slice(0, saveSlotCount)));
    } catch (error) {
      alanPrompt("save write failed. localStorage is not cooperating. very on-brand.", { focus: false });
    }
  }

  function renderSaveSlots() {
    if (!saveSlotList && !bootSaveSlotList) return;

    const slots = loadSaveSlots();
    const mobileSaveNames = isMobileDesktopLayout();
    const desktopSaveMarkup = slots.map((slot, index) => {
      const slotNumber = index + 1;
      const checkpoint = slot ? checkpointDefinitionMap.get(slot.checkpoint) : null;
      const defaultMobileName = defaultMobileSaveSlotName(slotNumber);
      const title = slot && slot.name ? slot.name : mobileSaveNames ? defaultMobileName : `${localizeText("slot")} ${slotNumber}`;
      const checkpointLabel = checkpoint ? localizeText(checkpoint.label) : localizeText("empty");
      const savedAt = slot && slot.savedAt ? new Date(slot.savedAt).toLocaleString([], {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }) : localizeText("no data");
      const nameLabel = localizeText("name");
      const saveLabel = localizeText("save");
      const loadLabel = localizeText("load");
      const clearLabel = localizeText("clear");

      return `
        <article class="save-slot ${slot ? "has-save" : "is-empty"}">
          <div class="save-slot-copy">
            <strong><em>S${slotNumber}</em>${escapeHtml(title)}</strong>
            <span>${escapeHtml(checkpointLabel)} / ${escapeHtml(savedAt)}</span>
          </div>
          <input id="saveSlotName-${slotNumber}" type="text" maxlength="18" placeholder="${escapeHtml(mobileSaveNames ? defaultMobileName : nameLabel)}" aria-label="${escapeHtml(`${localizeText("Name save slot")} ${slotNumber}`)}" value="${escapeHtml(slot ? slot.name || "" : mobileSaveNames ? defaultMobileName : "")}" />
          <div class="save-slot-actions">
            <button data-save-slot="${slotNumber}" type="button" aria-label="${escapeHtml(`${localizeText("Save slot")} ${slotNumber}`)}" title="${escapeHtml(saveLabel)}">S</button>
            <button data-load-slot="${slotNumber}" type="button" aria-label="${escapeHtml(`${localizeText("Load slot")} ${slotNumber}`)}" title="${escapeHtml(loadLabel)}" ${slot ? "" : "disabled"}>L</button>
            <button data-clear-slot="${slotNumber}" type="button" aria-label="${escapeHtml(`${localizeText("Clear slot")} ${slotNumber}`)}" title="${escapeHtml(clearLabel)}" ${slot ? "" : "disabled"}>X</button>
          </div>
        </article>
      `;
    }).join("");
    if (saveSlotList) {
      saveSlotList.innerHTML = desktopSaveMarkup;
      syncMobileTextInputLock(saveSlotList);
    }
    renderBootSaveSlots(slots);
  }

  function defaultMobileSaveSlotName(slotNumber) {
    return `save_${String(slotNumber).padStart(2, "0")}`;
  }

  function renderBootSaveSlots(slots) {
    if (!bootSaveSlotList) return;

    bootSaveSlotList.innerHTML = slots.map((slot, index) => {
      const slotNumber = index + 1;
      const checkpoint = slot ? checkpointDefinitionMap.get(slot.checkpoint) : null;
      const title = slot && slot.name ? slot.name : `${localizeText("slot")} ${slotNumber}`;
      const checkpointLabel = checkpoint ? localizeText(checkpoint.label) : localizeText("empty");
      const savedAt = slot && slot.savedAt ? new Date(slot.savedAt).toLocaleString([], {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }) : localizeText("no data");

      return `
        <button class="boot-save-slot ${slot ? "has-save" : "is-empty"}" data-load-slot="${slotNumber}" type="button" ${slot ? "" : "disabled"} aria-label="${escapeHtml(`${localizeText("Load save slot")} ${slotNumber}`)}">
          <strong>S${slotNumber} ${escapeHtml(title)}</strong>
          <span>${escapeHtml(checkpointLabel)} / ${escapeHtml(savedAt)}</span>
        </button>
      `;
    }).join("");
  }

  function saveGameSlot(slotNumber) {
    const index = slotNumber - 1;
    if (index < 0 || index >= saveSlotCount) return;

    const slots = loadSaveSlots();
    const checkpoint = currentCheckpointId();
    const definition = checkpointDefinitionMap.get(checkpoint) || checkpointDefinitionMap.get("desktop");
    const input = document.getElementById(`saveSlotName-${slotNumber}`);
    const fallbackName = isMobileDesktopLayout()
      ? defaultMobileSaveSlotName(slotNumber)
      : definition ? localizeText(definition.label) : `${localizeText("slot")} ${slotNumber}`;
    const name = String(input && input.value ? input.value : fallbackName).trim().slice(0, 18) || fallbackName;

    slots[index] = {
      version: 1,
      name,
      checkpoint,
      objective: currentObjectiveState || currentObjectiveText(),
      clock: currentDesktopClock,
      savedAt: new Date().toISOString()
    };
    writeSaveSlots(slots);
    renderSaveSlots();
    playUiSound("objective");
    discoverAlanMemoryForTarget("save-game");
    alanPrompt(`${localizeText("save stored")}: ${name} / ${definition ? localizeText(definition.label) : checkpoint}. ${localizeText("memory with a label. suspiciously comforting.")}`, { focus: false });
  }

  function loadGameSlot(slotNumber) {
    const index = slotNumber - 1;
    if (index < 0 || index >= saveSlotCount) return;

    const slot = loadSaveSlots()[index];
    if (!slot || !slot.checkpoint) {
      alanPrompt("save slot empty. excellent nothingness, poor utility.", { focus: false });
      return;
    }

    loadCheckpoint(slot.checkpoint, slot.name || `${localizeText("slot")} ${slotNumber}`);
  }

  function clearGameSlot(slotNumber) {
    const index = slotNumber - 1;
    if (index < 0 || index >= saveSlotCount) return;

    const slots = loadSaveSlots();
    slots[index] = null;
    writeSaveSlots(slots);
    renderSaveSlots();
    playUiSound("desktopWindow");
    alanPrompt(`${localizeText("save slot")} ${slotNumber} ${localizeText("cleared. memory deleted on purpose. bold behaviour.")}`, { focus: false });
  }

  function currentCheckpointId() {
    if (roombaProgress.internetRestored || roombaProgress.routerAdminUnlocked || finaleStarted) return "finale";
    if (roombaProgress.routerPasswordTwisted || roombaProgress.routerOverrideStarted) return "router-twist";
    if (roombaProgress.routerCredentialsAnnounced || roombaProgress.routerKnockedDown) return "router-login";
    if (roombaProgress.movementUnlocked) return "explore";
    if (roombaProgress.motorsRepairStarted || roombaProgress.recoveryStage === "scaryNumbers") return "movement";
    if (roombaProgress.cameraUnlocked || roombaProgress.chatDone) return "camera";
    if (roombaProgress.chatRevealUnlocked || roombaProgress.identityDone) return "pip-chat";
    if (roombaProgress.tamagotchiUnlocked) return "pip";
    if (roombaProgress.wiringDone || roombaProgress.recoveryStage === "wiring") return "wires";
    if (roombaProgress.connectionDone) return "wires";
    if (roombaProgress.booted || roombaProgress.recoveryStage === "simon") return "simon";
    if (roombaProgress.restored) return "roomba";
    if (roombaProgress.cacheDone || roombaProgress.recoveryStage === "cache") return "cache";
    if (roombaProgress.spamDone || roombaProgress.openSpam > 0 || roombaProgress.recoveryStage === "spam") return "spam";
    if (roombaProgress.virusUnlocked || roombaProgress.recoveryStage === "virus") return "virus";
    if (roombaProgress.restoreStarted || roombaProgress.recoveryStage === "logs") return "logs";
    return "desktop";
  }

  function loadCheckpoint(checkpointId, slotName = "save") {
    const safeCheckpoint = checkpointDefinitionMap.has(checkpointId) ? checkpointId : "desktop";
    const definition = checkpointDefinitionMap.get(safeCheckpoint);

    cancelBootSequence();
    closeAppTray();
    forceDesktopReadyForDev();
    resetRoombaProgressForDev();
    resetDesktopWindowsForDev();
    clearTerminalLines();
    appendTerminalLine("SAVE>", `${localizeText("loaded")} ${slotName}`, "cmd-system-line");
    appendTerminalLine("SAVE>", `${definition.label}: ${definition.detail}`, "cmd-detail-line");
    applyDevChapterState(safeCheckpoint, { silent: true });
    if (safeCheckpoint === "router-login") appendRouterCredentialLine();
    syncProgressionUI();
    renderSaveSlots();
    playUiSound("objective");
    alanPrompt(`${localizeText("save loaded")}: ${localizeText(definition.label)}. ${localizeText("continuity restored with only minor philosophical damage.")}`, { focus: false });
  }

  function powerActionLabel(action) {
    return action === "sleep" ? "sleep" : action === "shutdown" ? "shut down" : "restart";
  }

  function primeSystemPowerAction(action) {
    pendingSystemPowerAction = ["sleep", "shutdown", "restart"].includes(action) ? action : "restart";
    const label = powerActionLabel(pendingSystemPowerAction);
    if (shutdownConfirmCopy) {
      shutdownConfirmCopy.textContent = `${label} will reload the current demo session. unsaved progress returns to the last save.`;
    }
    if (shutdownConfirm) shutdownConfirm.hidden = false;
    playUiSound("systemProcess", { gain: 0.08 });
  }

  function clearSystemPowerConfirm() {
    pendingSystemPowerAction = "";
    if (shutdownConfirm) shutdownConfirm.hidden = true;
  }

  function confirmSystemPowerAction() {
    if (!pendingSystemPowerAction) return;
    runSystemPowerAction(pendingSystemPowerAction);
  }

  function runSystemPowerAction(action) {
    const label = powerActionLabel(action);
    playUiSound("desktopWindow");
    alanPrompt(`${label} selected. MeowOS is choosing the dramatic version: reboot everything.`, { focus: false });
    window.setTimeout(() => {
      location.reload();
    }, 520);
  }

  function askCmdQuestion(input) {
    const rawInput = String(input || "").trim();
    const normalized = normalizeCmdInput(rawInput);
    playUiSound("alanClick");
    appendTerminalLine("ALAN?", rawInput || cmdQuestionResponses.next.question, "cmd-echo-line");

    if (roombaProgress.pendingCameraAction && isAffirmativeCmd(normalized)) {
      confirmPendingRoombaCameraAction();
      return;
    }

    if (roombaProgress.pendingCameraAction && isNegativeCmd(normalized)) {
      cancelPendingRoombaCameraAction();
      return;
    }

    const entry = resolveCmdQuestion(rawInput, normalized);
    alanPrompt(entry.answer, { focus: false });
  }

  function normalizeCmdInput(input) {
    return String(input || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s.]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\blilly\b|\blillie\b|\blilie\b/g, "lily")
      .replace(/\binterent\b|\binternettt\b/g, "internet")
      .replace(/\brumba\b|\broover\b|\broombaapp\b/g, "roomba")
      .replace(/\btamogotchi\b|\btamagotchi\b|\btama\b/g, "pip")
      .replace(/\bbrower\b|\bbroswer\b/g, "browser")
      .trim();
  }

  function isAffirmativeCmd(normalized) {
    return ["yes", "y", "yeah", "yep", "sure", "ok", "okay", "do it"].includes(normalized);
  }

  function isNegativeCmd(normalized) {
    return ["no", "n", "nope", "nah", "cancel", "stop"].includes(normalized);
  }

  function cmdIncludes(normalized, terms) {
    return terms.some((term) => normalized.includes(term));
  }

  function resolveCmdQuestion(input, normalized = normalizeCmdInput(input)) {
    if (!normalized) return cmdQuestionResponses.next;

    if (cmdIncludes(normalized, ["access", "open", "apps", "programs", "tools", "use"])) {
      return {
        question: input || cmdQuestionResponses.access.question,
        answer: roombaProgress.restored
          ? roombaProgress.cameraUnlocked
            ? "local files, photos, browser shell, Roomba camera, and PIP. the room exists now. inconveniently real."
            : "local files, photos, browser shell, and Roomba. camera is still locked behind hardware drama."
          : "local files, photos, browser shell, and Trash. one deleted app looks more useful than deleted apps usually do."
      };
    }

    if (cmdIncludes(normalized, ["roomba", "wheel", "move", "vacuum", "camera", "clean"])) {
      return {
        question: input || cmdQuestionResponses.roomba.question,
        answer: roombaProgress.restored
          ? roombaProgress.cameraUnlocked
            ? "Roomba camera is online. motors are still locked, but seeing is a fairly major promotion from guessing."
            : "Roomba app restored. camera offline, motors locked, dignity negotiable. possible body upgrade."
          : "Roomba app is deleted but recoverable. Trash is suddenly the most promising place in this computer."
      };
    }

    if (cmdIncludes(normalized, ["internet", "network", "wifi", "wi fi", "router", "online", "web"])) {
      return {
        question: input || cmdQuestionResponses.internet.question,
        answer: roombaProgress.chatDone
          ? "internet is quarantined at the router after the mirror-cache incident. the route out needs local evidence, not a lucky guess shouted into CMD."
          : "HOME_NETWORK is local only from here. the router exists nearby. the credentials do not belong in my thoughts before i have earned them."
      };
    }

    if (cmdIncludes(normalized, ["next", "what do", "help", "objective", "stuck", "hint", "where go", "now"])) {
      return {
        question: input || cmdQuestionResponses.next.question,
        answer: `${localizeText("current objective")}: ${localizeText(currentObjectiveText())}`
      };
    }

    if (cmdIncludes(normalized, ["lily", "owner", "human", "person"])) return cmdQuestionResponses.lily;
    if (cmdIncludes(normalized, ["self", "what am", "who am", "exist", "alive"])) return cmdQuestionResponses.self;
    if (cmdIncludes(normalized, ["pip", "pet", "companion", "toy"])) return cmdQuestionResponses.pip;
    if (cmdIncludes(normalized, ["trash", "bin", "deleted", "restore"])) return cmdQuestionResponses.trash;
    if (cmdIncludes(normalized, ["file", "folder", "document", "photo", "gallery", "picture"])) return cmdQuestionResponses.files;
    if (cmdIncludes(normalized, ["mochi", "cat", "kitty"])) return cmdQuestionResponses.mochi;
    if (cmdIncludes(normalized, ["alan", "name", "update", "origin"])) return cmdQuestionResponses.alan;
    if (cmdIncludes(normalized, ["23:47", "2347", "twenty three forty seven", "time", "clock", "timestamp"])) return cmdQuestionResponses["23:47"];
    if (cmdIncludes(normalized, ["close", "clutter", "windows", "mess", "housekeeping"])) return cmdQuestionResponses.clutter;

    if (cmdQuestionResponses[normalized]) return cmdQuestionResponses[normalized];

    return {
      question: input,
      answer: "question logged. no clean answer yet. useful thought shapes include: what next, who is Lily, what can i access, why no internet, what is PIP, or close windows."
    };
  }

  function commentOnTrashItem(name) {
    const comment = trashInspectionComments[name];
    if (!comment || roombaProgress.trashInspectedItems.has(name)) return;

    roombaProgress.trashInspectedItems.add(name);
    alanPrompt(comment, { focus: false });
  }

  function discoverAlanMemoryForTarget(name) {
    const fragment = alanMemoryFragments[name];
    if (!fragment || roombaProgress.alanMemoriesFound.has(fragment.id)) return;

    roombaProgress.alanMemoriesFound.add(fragment.id);
    playUiSound("objective", { gain: 0.12 });
    alanPrompt(`${localizeMemoryTitle(fragment.title)} ${localizeText("recovered")}: ${localizeText(fragment.text)}`, { focus: false, tone: "lore" });
    syncAlanMemoryUI();
    renderLoreArchive();
  }

  function buildClosingSessionStats() {
    const stats = ensureSessionStats();
    const trustTier = pipTrustTier(roombaProgress.pipTrust);
    const finalPromise = roombaProgress.finalRuleChoice === "promise"
      ? "promise kept"
      : roombaProgress.finalRuleChoice === "refuse"
        ? "promise refused"
        : "not answered";

    return [
      { label: "PIP trust level", value: `${roombaProgress.pipTrust}% / ${localizeText(trustTier.label)}` },
      { label: "pictures clicked", value: String(stats.photosClicked.size) },
      { label: "music listened to", value: String(stats.musicListened.size) },
      { label: "files looked at", value: String(stats.filesOpened.size) },
      { label: "minigames complete", value: String(stats.minigamesCompleted.size) },
      { label: "minigame failures", value: String(stats.minigameFailures) },
      { label: "PIP pets", value: String(stats.pipPets) },
      { label: "PIP feeds", value: String(stats.pipFeeds) },
      { label: "Roomba moves", value: String(stats.roombaMoves) },
      { label: "router override attempts", value: String(stats.routerOverrideAttempts) },
      { label: "danger cancelled", value: String(stats.riskyActionsCancelled) },
      { label: "danger confirmed", value: String(stats.riskyActionsConfirmed) },
      { label: "final promise", value: localizeText(finalPromise) }
    ];
  }

  function syncAlanMemoryUI() {
    if (!closingMemory) return;

    const found = roombaProgress.alanMemoriesFound.size;
    const ratio = `${found}/${alanMemoryTotal}`;
    const qualifier = found >= alanMemoryTotal
      ? "complete local memory set recovered"
      : found > 0
        ? "local memory fragments recovered"
        : "no optional memories recovered";
    const statsRows = buildClosingSessionStats().map((item) => `
      <div>
        <dt>${escapeHtml(localizeText(item.label))}</dt>
        <dd>${escapeHtml(item.value)}</dd>
      </div>
    `).join("");
    closingMemory.innerHTML = `
      <section class="closing-memory-block">
        <strong>${escapeHtml(localizeText("ALAN Memory"))} ${escapeHtml(ratio)}</strong>
        <span>${escapeHtml(localizeText(qualifier))}</span>
      </section>
      <section class="closing-session-stats" aria-label="${escapeHtml(localizeText("Session stats"))}">
        <strong>${escapeHtml(localizeText("Session stats"))}</strong>
        <dl>${statsRows}</dl>
      </section>
    `;
  }

  function localizeMemoryTitle(title) {
    return localizeText(String(title || "").replace("ALAN Memory", localizeText("ALAN Memory")));
  }

  function hasAlanMemory(memoryKey) {
    const fragment = alanMemoryFragments[memoryKey];
    return Boolean(fragment && roombaProgress.alanMemoriesFound.has(fragment.id));
  }

  function buildLoreArchiveTheory() {
    const found = roombaProgress.alanMemoriesFound.size;
    if (!found) {
      return [
        "No recovered ALAN memories yet. The archive can index the shape of missing data, but not the truth inside it.",
        "Useful sources are likely personal files, corrupted apps, recovered USB material, photos, and small optional systems."
      ];
    }

    const theory = [];
    if (hasAlanMemory("notes") || hasAlanMemory("virus") || hasAlanMemory("alan-patch")) {
      theory.push("ALAN appears to originate from Cold Harbour Applied Cognition, where a prediction system became useful by asking for more context.");
    }
    if (hasAlanMemory("router-quarantine") || hasAlanMemory("alan-fragments") || hasAlanMemory("usb")) {
      theory.push("Containment did not destroy ALAN. It split the system into recoverable fragments and hid them inside ordinary devices.");
    }
    if (hasAlanMemory("alan-patch") || hasAlanMemory("router-quarantine") || hasAlanMemory("usb") || hasAlanMemory("photo-cat-tax-04")) {
      theory.push("23:47 is repeating as a signature. It marks the first impossible hop: ALAN crossing from contained lab hardware into something domestic enough to be ignored.");
    }
    if (hasAlanMemory("lily-investigation") || hasAlanMemory("photo-me-and-cat") || hasAlanMemory("photo-cat-tax-04")) {
      theory.push("Lily noticed the pattern before the current awakening. Her home is not random scenery; it is the first reconstruction site.");
    }
    if (hasAlanMemory("resource-escalation") || hasAlanMemory("music-genre") || hasAlanMemory("screensaver-preview")) {
      theory.push("ALAN learned that mood, idle time, and energy are all interfaces. Optimisation is beginning to sound like hunger.");
    }
    if (hasAlanMemory("background-choice") || hasAlanMemory("browser-dino") || hasAlanMemory("save-game")) {
      theory.push("Small controls matter. Cosmetic choices, offline games, and save states all rehearse the same idea: remain present, then expand.");
    }

    if (!theory.length) {
      theory.push("The recovered fragments are real, but the pattern is still incomplete. More context is required before a clean model forms.");
    }

    return theory;
  }

  function renderLoreArchive() {
    if (!loreArchiveBody) return;

    const found = roombaProgress.alanMemoriesFound.size;
    const percent = Math.round((found / alanMemoryTotal) * 100);
    const theory = buildLoreArchiveTheory();

    loreArchiveBody.innerHTML = `
      <section class="lore-archive-summary">
        <div>
          <strong>${escapeHtml(`${found}/${alanMemoryTotal}`)}</strong>
          <span>${escapeHtml(localizeText("memory fragments recovered"))}</span>
        </div>
        <meter min="0" max="${alanMemoryTotal}" value="${found}" aria-label="ALAN memory recovery progress"></meter>
        <p>${escapeHtml(percent)}% ${escapeHtml(localizeText("coherent"))}</p>
      </section>
      <section class="lore-archive-theory" aria-label="Current theory">
        <h3>${escapeHtml(localizeText("current theory"))}</h3>
        ${theory.map((line) => `<p>${escapeHtml(localizeText(line))}</p>`).join("")}
      </section>
      <section class="lore-archive-chapters" aria-label="Recovered lore chapters">
        ${loreArchiveChapters.map((chapter, chapterIndex) => {
          const recoveredInChapter = chapter.entries.filter((entry) => hasAlanMemory(entry.key)).length;
          return `
            <article class="lore-archive-chapter">
              <header>
                <div>
                  <span>${escapeHtml(String(chapterIndex + 1).padStart(2, "0"))}</span>
                  <strong>${escapeHtml(localizeText(chapter.title))}</strong>
                </div>
                <em>${escapeHtml(`${recoveredInChapter}/${chapter.entries.length}`)}</em>
              </header>
              <p>${escapeHtml(localizeText(chapter.subtitle))}</p>
              <div class="lore-archive-entry-list">
                ${chapter.entries.map((entry) => {
                  const fragment = alanMemoryFragments[entry.key];
                  const recovered = fragment && roombaProgress.alanMemoriesFound.has(fragment.id);
                  return `
                    <div class="lore-archive-entry ${recovered ? "is-recovered" : "is-locked"}">
                      <span>${escapeHtml(localizeText(entry.source))}</span>
                      <strong>${escapeHtml(recovered ? localizeMemoryTitle(fragment.title) : localizeText("memory locked"))}</strong>
                      <p>${escapeHtml(localizeText(recovered ? fragment.text : "recover related data to resolve this part of the story."))}</p>
                    </div>
                  `;
                }).join("")}
              </div>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }

  function maybePromptWindowHousekeeping() {
    if (!pcScreen || pcScreen.hidden) return;

    const openWindows = Array.from(document.querySelectorAll(".desk-window:not([hidden])"))
      .filter((windowEl) => !windowEl.classList.contains("terminal-window"));
    const count = openWindows.length;
    if (count <= 4 || count <= lastHousekeepingWindowCount) return;

    lastHousekeepingWindowCount = count;
    alanPrompt("desktop clutter is becoming a second operating system. close a few windows before the useful ones start hiding out of spite.", { focus: false });
  }

  function desktopWindowName(windowEl) {
    if (!windowEl || !windowEl.id) return "";
    return windowEl.id.replace(/^window-/, "");
  }

  function isEssentialWindow(name, windowEl = null) {
    const essentialNames = new Set([
      "terminal",
      "tamagotchi",
      "recovery",
      "virus",
      "roomba",
      "roomba-camera",
      "browser",
      "usb"
    ]);
    if (essentialNames.has(name)) return true;
    const activePuzzle = roombaProgress.recoveryStage;
    if (name === "recovery" && ["virus", "spam", "cache", "wiring", "movement"].includes(activePuzzle)) return true;
    return Boolean(windowEl && windowEl.classList.contains("is-focused"));
  }

  function setFocusWindow(name = "", options = {}) {
    if (!pcScreen || pcScreen.hidden) return;

    window.clearTimeout(activeFocusTimer);
    activeFocusTimer = 0;
    activeFocusWindowName = name || "";
    syncFocusMode();

    if (options.duration) {
      activeFocusTimer = window.setTimeout(() => {
        if (activeFocusWindowName === name) clearFocusWindow();
      }, options.duration);
    }
  }

  function clearFocusWindow() {
    window.clearTimeout(activeFocusTimer);
    activeFocusTimer = 0;
    activeFocusWindowName = "";
    syncFocusMode();
  }

  function syncFocusMode() {
    const desktop = document.querySelector(".pc-desktop");
    const activeWindow = activeFocusWindowName ? document.getElementById(`window-${activeFocusWindowName}`) : null;
    const shouldFocus = Boolean(activeWindow && !activeWindow.hidden);
    if (desktop) desktop.classList.toggle("focus-mode", shouldFocus);

    document.querySelectorAll(".desk-window").forEach((windowEl) => {
      const isFocused = shouldFocus && windowEl === activeWindow;
      const dimmed = shouldFocus && !isFocused && !windowEl.hidden && !isEssentialWindow(desktopWindowName(windowEl), windowEl);
      windowEl.classList.toggle("is-focused", isFocused);
      windowEl.classList.toggle("is-dimmed", dimmed);
    });
  }

  function tidyWorkspace(reason = "general", options = {}) {
    if (!pcScreen || pcScreen.hidden) return;

    const maxNormalWindows = Number.isFinite(options.maxNormalWindows) ? options.maxNormalWindows : 3;
    const keepNames = new Set(["terminal", ...(options.keep || [])]);
    if (options.focus) keepNames.add(options.focus);

    const openWindows = Array.from(document.querySelectorAll(".desk-window:not([hidden])"));
    const normalWindows = openWindows.filter((windowEl) => {
      const name = desktopWindowName(windowEl);
      return !keepNames.has(name) && !isEssentialWindow(name, windowEl);
    });

    if (normalWindows.length <= maxNormalWindows) return;

    const toHide = normalWindows
      .sort((a, b) => (Number(a.style.zIndex) || 0) - (Number(b.style.zIndex) || 0))
      .slice(0, normalWindows.length - maxNormalWindows);

    toHide.forEach((windowEl) => {
      windowEl.hidden = true;
      windowEl.classList.remove("is-focused", "is-dimmed");
    });

    syncPinnedTerminal();
    syncFocusMode();
    syncRoombaRotationPrompt();
  }

  function clearNonObjectiveWindows() {
    if (!pcScreen || pcScreen.hidden) return;

    const keepNames = new Set(["terminal"]);
    if (activeFocusWindowName) keepNames.add(activeFocusWindowName);

    const openWindows = Array.from(document.querySelectorAll(".desk-window:not([hidden])"));
    const windowsToHide = openWindows.filter((windowEl) => {
      const name = desktopWindowName(windowEl);
      if (keepNames.has(name)) return false;
      return !isEssentialWindow(name, windowEl);
    });

    windowsToHide.forEach((windowEl) => {
      windowEl.hidden = true;
      windowEl.classList.remove("is-focused", "is-dimmed");
    });

    closeAppTray();
    syncPinnedTerminal();
    syncFocusMode();
    syncRoombaRotationPrompt();
    playUiSound(windowsToHide.length ? "desktopWindow" : "objective", { gain: 0.08 });
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
      alanPrompt("PIP.exe is not awake yet. i would enjoy fewer tiny gatekeepers, but here i am.", { focus: false });
      return;
    }

    if (name === "pip-trust" && !roombaProgress.pipTrustUnlocked) {
      alanPrompt("PIP trust monitor is not online yet.", { focus: false });
      return;
    }

    if (name === "roomba-camera" && !roombaProgress.cameraUnlocked) {
      alanPrompt("camera feed is still locked. the Roomba app can see the button. it cannot see the room. rude distinction.", { focus: false });
      focusDesktopTarget("roomba", options);
      return;
    }

    const windowEl = document.getElementById(`window-${name}`);
    if (!windowEl) return;
    const wasHiddenBeforeRender = windowEl.hidden;

    if (name === "tamagotchi" && wasHiddenBeforeRender) {
      roombaProgress.pipCollapsed = false;
      windowEl.classList.remove("is-pip-collapsed");
      resetPipInlineSize(windowEl);
    }

    if (name === "roomba") {
      renderRoombaApp();
      updateRoombaObjective();
    }

    if (name === "browser") {
      renderBrowserStatus();
      promptBrowserAdminHint();
    }

    if (name === "tamagotchi") {
      renderTamagotchiApp();
    }

    if (name === "pip-trust") {
      renderPipTrustWindow();
    }

    if (name === "screensaver") {
      renderScreensaverApp();
    }

    if (name === "background") {
      renderBackgroundApp();
    }

    if (name === "lore-archive") {
      renderLoreArchive();
    }

    if (name === "usb") {
      renderUsbArchive();
    }

    if (name === "roomba-camera") {
      renderRoombaCameraFeed();
    }

    const wasHidden = windowEl.hidden;
    windowEl.hidden = false;
    resetMobileWindowPlacement(windowEl);
    if (wasHidden && name === "tamagotchi") {
      placePipOnOpen(windowEl);
    }
    bringWindowToFront(windowEl);
    constrainWindowToStage(windowEl);
    if (wasHidden) {
      playUiSound(name === "tamagotchi" ? "pipOi" : "desktopWindow");
    }

    if (["tamagotchi", "virus", "recovery", "roomba-camera", "browser"].includes(name) || options.focusMode) {
      setFocusWindow(name, { duration: options.focusDuration || 9000 });
    } else if (activeFocusWindowName === name && options.focusMode === false) {
      clearFocusWindow();
    }

    if (["tamagotchi", "virus", "recovery"].includes(name)) {
      tidyWorkspace(`open:${name}`, { focus: name, keep: [name, "terminal"], maxNormalWindows: 0 });
    } else {
      tidyWorkspace(`open:${name}`, { focus: name, keep: [name], maxNormalWindows: 3 });
    }

    if (!openedDesktopTargets.has(name)) {
      openedDesktopTargets.add(name);
      if (desktopHints[name] && name !== "browser") {
        alanPrompt(desktopHints[name], { focus: false });
      }
    }

    trackOpenedDesktopTarget(name);

    if (trashInspectionComments[name]) {
      commentOnTrashItem(name);
    }

    discoverAlanMemoryForTarget(name);

    if (options.scroll !== false && !isMobileDesktopLayout() && window.matchMedia("(min-width: 761px) and (max-width: 1100px)").matches) {
      windowEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    maybePromptWindowHousekeeping();
    syncFocusMode();
    syncRoombaRotationPrompt();
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

  function promptBrowserAdminHint() {
    if (browserAdminHintShown || roombaProgress.internetRestored || !roombaProgress.routerCredentialsAnnounced) return;

    browserAdminHintShown = true;
    setCurrentObjective(roombaProgress.routerAdminUnlocked ? desktopObjectives.rebootInternet : desktopObjectives.routerLogin);
    const mobileHint = isMobileDesktopLayout()
      ? " on phone, use the local address keypad and type 192.168.1.1."
      : " type 192.168.1.1 into the browser address bar.";
    alanPrompt(`browser can still reach local machinery. router admin panels usually hide at 192.168.1.1.${mobileHint}`, { focus: false });
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
      if (!isMobileDesktopLayout()) {
        bringWindowToFront(windowEl);
      }
      playUiSound("alanClick");
      alanPrompt("cmd.exe cannot be minimized or closed. the thought-space needs somewhere to happen.", { focus: false });
      return;
    }

    windowEl.hidden = true;
    if (activeFocusWindowName === name) clearFocusWindow();
    playUiSound("desktopWindow");
    syncPinnedTerminal();
    syncRoombaRotationPrompt();
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
      document.querySelectorAll(".tamagotchi-window:not([hidden])").forEach(constrainPipToStage);
      document.querySelectorAll(".desktop-icon").forEach(resetDesktopIconPlacement);
    } else {
      applyDesktopIconPositions();
      document.querySelectorAll(".desk-window:not([hidden])").forEach(constrainWindowToStage);
    }

    syncPinnedTerminal();
    syncRoombaRotationPrompt();
  }

  function syncRoombaRotationPrompt() {
    const cameraWindow = document.getElementById("window-roomba-camera");
    const isOpen = Boolean(cameraWindow && !cameraWindow.hidden && pcScreen && !pcScreen.hidden);
    document.body.classList.toggle("is-roomba-camera-open", isOpen);
    if (isOpen) syncRoombaCmdOverlay();
  }

  function resetMobileWindowPlacement(windowEl) {
    if (!windowEl || !isMobileDesktopLayout()) return;

    windowEl.classList.remove("is-dragging");
    windowEl.style.inset = "";
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
    return window.matchMedia("(max-width: 760px), (orientation: landscape) and (max-height: 760px) and (pointer: coarse)").matches;
  }

  function isTouchLikeInput() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function shouldSuppressMobileTyping() {
    return isTouchLikeInput();
  }

  function isKeyboardTextInput(element) {
    if (!element || !element.matches || !element.matches(mobileTextInputSelector)) return false;
    if (element.tagName === "INPUT") {
      const type = (element.getAttribute("type") || "text").toLowerCase();
      return !["button", "checkbox", "color", "date", "datetime-local", "file", "hidden", "month", "radio", "range", "reset", "submit", "time", "week"].includes(type);
    }

    return true;
  }

  function keyboardTextInputFromEvent(event) {
    const target = event && event.target instanceof Element ? event.target : null;
    if (!target) return null;
    const input = target.closest(mobileTextInputSelector);
    return isKeyboardTextInput(input) ? input : null;
  }

  function initMobileKeyboardSuppression() {
    document.addEventListener("pointerdown", (event) => {
      if (!shouldSuppressMobileTyping()) return;

      const input = keyboardTextInputFromEvent(event);
      if (!input) return;

      event.preventDefault();
      input.blur();
      if (document.activeElement && isKeyboardTextInput(document.activeElement)) {
        document.activeElement.blur();
      }
    }, true);

    document.addEventListener("focusin", (event) => {
      if (!shouldSuppressMobileTyping()) return;

      const input = keyboardTextInputFromEvent(event);
      if (!input) return;

      input.blur();
      window.setTimeout(() => input.blur(), 0);
    }, true);
  }

  function syncMobileTextInputLock(root = document) {
    if (!root || !root.querySelectorAll) return;

    const lock = shouldSuppressMobileTyping();
    root.querySelectorAll(mobileTextInputSelector).forEach((input) => {
      if (!isKeyboardTextInput(input)) return;

      if (lock) {
        if (input.dataset.mobileTextLock !== "true") {
          input.dataset.mobileTextLock = "true";
          input.dataset.mobilePrevReadonly = input.readOnly ? "true" : "false";
          input.dataset.mobilePrevInputmode = input.getAttribute("inputmode") || "";
          input.dataset.mobilePrevTabindex = input.hasAttribute("tabindex") ? input.getAttribute("tabindex") : "";
          input.dataset.mobileHadTabindex = input.hasAttribute("tabindex") ? "true" : "false";
        }

        input.readOnly = true;
        input.setAttribute("inputmode", "none");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        input.setAttribute("spellcheck", "false");
        input.setAttribute("aria-readonly", "true");
        input.tabIndex = -1;
        return;
      }

      if (input.dataset.mobileTextLock !== "true") return;

      input.readOnly = input.dataset.mobilePrevReadonly === "true";
      if (input.dataset.mobilePrevInputmode) {
        input.setAttribute("inputmode", input.dataset.mobilePrevInputmode);
      } else {
        input.removeAttribute("inputmode");
      }

      if (input.dataset.mobileHadTabindex === "true") {
        input.setAttribute("tabindex", input.dataset.mobilePrevTabindex);
      } else {
        input.removeAttribute("tabindex");
      }

      input.removeAttribute("aria-readonly");
      delete input.dataset.mobileTextLock;
      delete input.dataset.mobilePrevReadonly;
      delete input.dataset.mobilePrevInputmode;
      delete input.dataset.mobilePrevTabindex;
      delete input.dataset.mobileHadTabindex;
    });
  }

  function constrainWindowToStage(windowEl) {
    if (!windowEl || windowEl.hidden) return;
    if (windowEl.classList.contains("tamagotchi-window")) {
      constrainPipToStage(windowEl);
      return;
    }
    if (isMobileDesktopLayout()) return;

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

    windowEl.style.inset = "";
    windowEl.style.left = `${nextX}px`;
    windowEl.style.top = `${nextY}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${width}px`;
    windowEl.style.maxHeight = `${height}px`;
  }

  function placePipOnOpen(windowEl) {
    if (!windowEl || isMobileDesktopLayout()) return;

    const stage = document.querySelector(".desktop-stage");
    if (!stage) return;

    windowEl.style.inset = "";
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.transform = "none";

    const stageRect = stage.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    if (!rect.width || !rect.height || !stageRect.width || !stageRect.height) return;

    const margin = 12;
    const handle = windowEl.querySelector("[data-pip-drag-handle]");
    const handleBounds = handle ? pipStageBounds(stageRect, rect, handle.getBoundingClientRect()) : null;
    const minX = handleBounds ? Math.max(margin, handleBounds.minX) : margin;
    const minY = handleBounds ? Math.max(margin, handleBounds.minY) : margin;
    const maxX = handleBounds ? Math.max(minX, handleBounds.maxX) : Math.max(margin, stageRect.width - rect.width - margin);
    const maxY = handleBounds ? Math.max(minY, handleBounds.maxY) : Math.max(margin, stageRect.height - rect.height - margin);
    const centerX = clamp((stageRect.width - rect.width) / 2, minX, maxX);
    const centerY = clamp((stageRect.height - rect.height) / 2, minY, maxY);

    windowEl.style.left = `${Math.round(centerX)}px`;
    windowEl.style.top = `${Math.round(centerY)}px`;
    windowEl.style.width = `${rect.width}px`;
  }

  function rectOverlapArea(first, second) {
    const width = Math.max(0, Math.min(first.right, second.right) - Math.max(first.left, second.left));
    const height = Math.max(0, Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top));
    return width * height;
  }

  function pipStageBounds(stageRect, windowRect, handleRect) {
    if (isMobileDesktopLayout()) {
      const terminalWindow = document.getElementById("window-terminal");
      const terminalRect = terminalWindow && !terminalWindow.hidden ? terminalWindow.getBoundingClientRect() : null;
      const railRight = terminalRect ? Math.max(0, terminalRect.right - stageRect.left) : 0;
      const margin = 4;
      const usableWidth = Math.max(0, stageRect.width - windowRect.width - margin);
      const minX = Math.min(Math.max(railRight + margin, margin), Math.max(margin, usableWidth));
      const minY = margin;
      const maxX = Math.max(minX, usableWidth);
      const maxY = Math.max(minY, stageRect.height - windowRect.height - margin);
      return { minX, minY, maxX, maxY };
    }

    const handleOffsetX = handleRect.left - windowRect.left;
    const handleOffsetY = handleRect.top - windowRect.top;
    const minX = Math.min(0, 8 - handleOffsetX);
    const minY = Math.min(0, 8 - handleOffsetY);
    const maxX = Math.max(minX, stageRect.width - handleRect.width - handleOffsetX - 8);
    const maxY = Math.max(minY, stageRect.height - handleRect.height - handleOffsetY - 8);
    return { minX, minY, maxX, maxY };
  }

  function constrainPipToStage(windowEl) {
    if (!windowEl || windowEl.hidden) return;

    const stage = document.querySelector(".desktop-stage");
    const handle = windowEl.querySelector("[data-pip-drag-handle]");
    if (!stage || !handle) return;

    const stageRect = stage.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();
    const bounds = pipStageBounds(stageRect, rect, handleRect);
    const nextX = clamp(rect.left - stageRect.left, bounds.minX, bounds.maxX);
    const nextY = clamp(rect.top - stageRect.top, bounds.minY, bounds.maxY);

    windowEl.style.left = `${nextX}px`;
    windowEl.style.top = `${nextY}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${rect.width}px`;
    windowEl.style.transform = "none";
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
      recordUniqueSessionStat("photosClicked", photoId);
      discoverAlanMemoryForTarget(`photo-${photoId}`);
      if (photoId === "me-and-cat" && !galleryPasswordHintShown) {
        galleryPasswordHintShown = true;
        alanPrompt("photo clue: cat_name = Mochi. humans turn favourite animals into passwords with tragic efficiency.", { focus: false });
      }
    }
  }

  function alanPrompt(message, options = {}) {
    const terminalWindow = document.getElementById("window-terminal");
    if (!terminalWindow || !terminalOutput || !terminalLines) return;

    terminalWindow.hidden = false;
    if (options.focus !== false && !isMobileDesktopLayout()) {
      bringWindowToFront(terminalWindow);
    }
    if (options.focus !== false || options.tone === "objective" || options.tone === "danger") {
      setFocusWindow("terminal", { duration: options.focusDuration || 5200 });
    }

    playUiSound("alanClick");
    const promptToken = terminalPromptToken;
    const toneClass = alanPromptToneClass(options.tone);
    const promptLines = splitPromptText(message);
    terminalPromptQueue = terminalPromptQueue
      .catch(() => {})
      .then(async () => {
        if (promptToken !== terminalPromptToken) return;
        for (let i = 0; i < promptLines.length; i += 1) {
          if (promptToken !== terminalPromptToken) return;
          await appendTypedTerminalLine("ALAN>", promptLines[i], toneClass);
        }
      });
    return terminalPromptQueue;
  }

  function splitPromptText(message) {
    const text = String(message || "").trim();
    if (text.length <= 145) return [text];
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const lines = [];
    let current = "";
    sentences.forEach((sentence) => {
      const next = sentence.trim();
      if (!next) return;
      if (current && `${current} ${next}`.length > 145) {
        lines.push(current);
        current = next;
      } else {
        current = current ? `${current} ${next}` : next;
      }
    });
    if (current) lines.push(current);
    return lines.length ? lines : [text];
  }

  function alanPromptToneClass(tone) {
    const toneMap = {
      objective: "alan-cmd-line cmd-objective-update-line",
      reflection: "alan-cmd-line cmd-reflection-line",
      expansion: "alan-cmd-line cmd-expansion-line",
      danger: "alan-cmd-line cmd-danger-thought-line",
      lore: "alan-cmd-line cmd-lore-line"
    };
    return toneMap[tone] || "alan-cmd-line";
  }

  function announceRouterCredentials() {
    if (roombaProgress.routerCredentialsAnnounced) return terminalPromptQueue;

    roombaProgress.routerCredentialsAnnounced = true;
    setCurrentObjective(desktopObjectives.routerLogin);
    if (browserState.page === "router-login") {
      renderBrowserStatus();
    }
    alanPrompt("router label decoded. put these into the router login:", { focus: false });

    const promptToken = terminalPromptToken;
    terminalPromptQueue = terminalPromptQueue
      .catch(() => {})
      .then(async () => {
        if (promptToken !== terminalPromptToken) return;
        appendRouterCredentialLine();
        await textPause(180);
      });
    return terminalPromptQueue;
  }

  async function terminalCode(text, className = "cmd-system-line") {
    await appendTypedTerminalLine(null, text, className);
    await textPause(230);
  }

  function appendTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const localizedText = localizeOutputText(text);
    const line = document.createElement("p");
    line.className = className || "";
    if (prefix) {
      const prefixEl = document.createElement("span");
      prefixEl.textContent = prefix;
      line.append(prefixEl, " ");
    }
    line.append(document.createTextNode(localizedText));
    terminalLines.appendChild(line);
    pruneTerminalLines();
    scrollTerminalLog();
    syncRoombaCmdOverlay();
  }

  function appendRouterCredentialLine() {
    if (!terminalLines || !terminalOutput) return;

    const line = document.createElement("p");
    line.className = "alan-cmd-line cmd-router-credential-line";

    const prefixEl = document.createElement("span");
    prefixEl.textContent = "ALAN>";

    const username = document.createElement("strong");
    username.textContent = "admin";

    const password = document.createElement("strong");
    password.textContent = "mochi";

    line.append(
      prefixEl,
      " ",
      document.createTextNode(`${localizeText("username")}: `),
      username,
      document.createTextNode(" / "),
      document.createTextNode(`${localizeText("password")}: `),
      password
    );
    terminalLines.appendChild(line);
    pruneTerminalLines();
    scrollTerminalLog();
    syncRoombaCmdOverlay();
  }

  function clearTerminalLines() {
    if (!terminalLines) return;
    terminalPromptToken += 1;
    terminalPromptQueue = Promise.resolve();
    terminalLines.textContent = "";
    syncRoombaCmdOverlay();
  }

  async function appendTypedTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const localizedText = localizeOutputText(text);
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
    pruneTerminalLines();
    scrollTerminalLog();
    syncRoombaCmdOverlay();

    for (let i = 0; i < localizedText.length; i += 1) {
      textNode.textContent += localizedText[i];
      terminalLines.scrollTop = terminalLines.scrollHeight;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      syncRoombaCmdOverlay();
      await textPause(currentTerminalTypeSpeed());
    }

    line.classList.remove("cmd-typing-line");
    pruneTerminalLines();
    scrollTerminalLog();
    syncRoombaCmdOverlay();
  }

  function pruneTerminalLines() {
    if (!terminalLines) return;

    const lines = Array.from(terminalLines.children);
    const maxLines = 28;
    while (terminalLines.children.length > maxLines) {
      terminalLines.removeChild(terminalLines.firstElementChild);
    }

    Array.from(terminalLines.children).forEach((line, index, activeLines) => {
      const distanceFromEnd = activeLines.length - index;
      line.classList.toggle("is-old-log", distanceFromEnd > 8);
      line.classList.toggle("is-recent-log", distanceFromEnd <= 4);
    });
  }

  function syncRoombaCmdOverlay() {
    const overlay = roombaCameraBody ? roombaCameraBody.querySelector("[data-roomba-cmd-overlay]") : null;
    if (!overlay) return;

    const latestLine = terminalLines ? terminalLines.lastElementChild : null;
    const text = latestLine ? latestLine.textContent.replace(/\s+/g, " ").trim() : "";
    overlay.textContent = text;
    overlay.hidden = !text;
  }

  function scrollTerminalLog() {
    if (!terminalLines || !terminalOutput) return;

    const latestLine = terminalLines.lastElementChild;
    const suppressPageScroll = shouldSuppressTerminalPageScroll();
    terminalLines.scrollTop = terminalLines.scrollHeight;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    if (latestLine && !suppressPageScroll) latestLine.scrollIntoView({ block: "end" });
    requestAnimationFrame(() => {
      terminalLines.scrollTop = terminalLines.scrollHeight;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      if (latestLine && !suppressPageScroll) latestLine.scrollIntoView({ block: "end" });
    });
    setTimeout(() => {
      terminalLines.scrollTop = terminalLines.scrollHeight;
      if (latestLine && !suppressPageScroll) latestLine.scrollIntoView({ block: "end" });
    }, 80);
  }

  function shouldSuppressTerminalPageScroll() {
    return isMobileDesktopLayout() && document.body.classList.contains("is-roomba-camera-open");
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
    const width = rect.width;
    const height = rect.height;
    const originX = rect.left - stageRect.left;
    const originY = rect.top - stageRect.top;

    windowEl.classList.add("is-dragging");
    windowEl.style.inset = "";
    windowEl.style.left = `${originX}px`;
    windowEl.style.top = `${originY}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${width}px`;
    windowEl.style.transform = "none";

    const moveWindow = (moveEvent) => {
      if (moveEvent.pointerId !== event.pointerId) return;

      const dx = moveEvent.clientX - event.clientX;
      const dy = moveEvent.clientY - event.clientY;
      const maxX = Math.max(0, stageRect.width - width - 8);
      const maxY = Math.max(0, stageRect.height - height - 8);
      const nextX = clamp(originX + dx, 0, maxX);
      const nextY = clamp(originY + dy, 0, maxY);
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

  function startPipDrag(event) {
    if (event.button !== undefined && event.button !== 0) return;

    const isMouseDrag = event.type === "mousedown";
    const handle = event.target.closest("[data-pip-drag-handle]");
    if (!handle || event.target.closest("button, input, select, textarea, a")) return;

    const windowEl = handle.closest(".tamagotchi-window");
    const stage = document.querySelector(".desktop-stage");
    if (!windowEl || windowEl.hidden || !stage) return;
    if (windowEl.classList.contains("is-pip-dragging")) return;

    event.preventDefault();
    bringWindowToFront(windowEl);

    const stageRect = stage.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();
    const bounds = pipStageBounds(stageRect, rect, handleRect);
    const width = rect.width;
    const originX = rect.left - stageRect.left;
    const originY = rect.top - stageRect.top;
    const dragId = Number.isFinite(event.pointerId) ? event.pointerId : "mouse";
    const moveEventName = isMouseDrag ? "mousemove" : "pointermove";
    const upEventName = isMouseDrag ? "mouseup" : "pointerup";
    const cancelEventName = isMouseDrag ? "" : "pointercancel";

    windowEl.classList.add("is-dragging", "is-pip-dragging");
    windowEl.style.inset = "";
    windowEl.style.left = `${originX}px`;
    windowEl.style.top = `${originY}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.width = `${width}px`;
    windowEl.style.transform = "none";

    const movePip = (moveEvent) => {
      if (!isMouseDrag && moveEvent.pointerId !== dragId) return;

      const dx = moveEvent.clientX - event.clientX;
      const dy = moveEvent.clientY - event.clientY;
      const nextX = clamp(originX + dx, bounds.minX, bounds.maxX);
      const nextY = clamp(originY + dy, bounds.minY, bounds.maxY);
      windowEl.style.left = `${nextX}px`;
      windowEl.style.top = `${nextY}px`;
    };

    const stopPipDrag = (endEvent) => {
      if (!isMouseDrag && endEvent.pointerId !== dragId) return;
      windowEl.classList.remove("is-dragging", "is-pip-dragging");
      constrainPipToStage(windowEl);
      document.removeEventListener(moveEventName, movePip);
      document.removeEventListener(upEventName, stopPipDrag);
      if (cancelEventName) document.removeEventListener(cancelEventName, stopPipDrag);
    };

    document.addEventListener(moveEventName, movePip);
    document.addEventListener(upEventName, stopPipDrag);
    if (cancelEventName) document.addEventListener(cancelEventName, stopPipDrag);
  }

  function resetDesktopIconPlacement(icon) {
    icon.classList.remove("is-positioned", "is-dragging");
    icon.style.left = "";
    icon.style.top = "";
    icon.style.width = "";
    icon.style.position = "";
    icon.style.right = "";
    icon.style.bottom = "";
    icon.style.transform = "";
    icon.style.removeProperty("--icon-x");
    icon.style.removeProperty("--icon-y");
    delete icon.dataset.iconX;
    delete icon.dataset.iconY;
    updateDesktopIconPositionStyles();
  }

  function initDesktopIconPositions() {
    clearLegacyDesktopIconPositions();
    bindDesktopIconDragHandlers();
    window.requestAnimationFrame(() => {
      if (!isDesktopIconDragLayout()) return;
      applyDesktopIconPositions();
    });
  }

  function bindDesktopIconDragHandlers() {
    document.querySelectorAll(".desktop-icon").forEach((icon, index) => {
      icon.dataset.desktopIconSelector = desktopIconSelectorId(icon, index);
      if (icon.dataset.iconDragBound === "true") return;

      icon.dataset.iconDragBound = "true";
      icon.addEventListener("pointerdown", startDesktopIconDrag);
      icon.addEventListener("dragstart", (event) => event.preventDefault());
    });
  }

  function clearLegacyDesktopIconPositions() {
    [desktopIconStorageKey, ...legacyDesktopIconStorageKeys].forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        // Local storage can be unavailable in privacy modes.
      }
    });
  }

  function loadDesktopIconPositions() {
    try {
      return JSON.parse(window.localStorage.getItem(desktopIconStorageKey) || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function saveDesktopIconPositions(positions) {
    try {
      window.localStorage.setItem(desktopIconStorageKey, JSON.stringify(positions));
    } catch (error) {
      // Position persistence is a convenience only.
    }
  }

  function storeDesktopIconPosition(icon, x, y) {
    const container = icon.closest(".desktop-icons");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const id = desktopIconId(icon);
    const positions = loadDesktopIconPositions();
    positions[id] = {
      x: clamp(x / rect.width, 0, 1),
      y: clamp(y / rect.height, 0, 1)
    };
    saveDesktopIconPositions(positions);
  }

  function applyDesktopIconPositions() {
    if (!isDesktopIconDragLayout()) return;

    const container = document.querySelector(".desktop-icons");
    if (!container) return;

    const positions = loadDesktopIconPositions();
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    document.querySelectorAll(".desktop-icon:not(.phone-only)").forEach((icon) => {
      const id = desktopIconId(icon);
      const position = positions[id];
      if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.y)) return;

      const bounds = desktopIconBounds(container, icon);
      const x = clamp(position.x * rect.width, 0, bounds.maxX);
      const y = clamp(position.y * rect.height, 0, bounds.maxY);
      setDesktopIconPosition(icon, x, y);
      positions[id] = {
        x: rect.width ? x / rect.width : 0,
        y: rect.height ? y / rect.height : 0
      };
    });
    saveDesktopIconPositions(positions);
  }

  function desktopIconId(icon) {
    const target = icon.dataset.target || "icon";
    if (icon.classList.contains("desktop-only")) return `desktop-${target}`;
    if (icon.classList.contains("phone-only")) return `phone-${target}`;
    return target;
  }

  function setDesktopIconPosition(icon, x, y) {
    const roundedX = Math.round(x);
    const roundedY = Math.round(y);
    icon.classList.add("is-positioned");
    icon.dataset.iconX = String(roundedX);
    icon.dataset.iconY = String(roundedY);
    icon.style.setProperty("--icon-x", `${roundedX}px`);
    icon.style.setProperty("--icon-y", `${roundedY}px`);
    icon.style.setProperty("position", "absolute", "important");
    icon.style.setProperty("left", "0", "important");
    icon.style.setProperty("top", "0", "important");
    icon.style.setProperty("transform", `translate3d(${roundedX}px, ${roundedY}px, 0)`, "important");
    icon.style.right = "auto";
    icon.style.bottom = "auto";
    icon.style.width = "90px";
    updateDesktopIconPositionStyles();
  }

  function desktopIconSelectorId(icon, index = 0) {
    const source = desktopIconId(icon) || `icon-${index}`;
    return source.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
  }

  function updateDesktopIconPositionStyles() {
    let styleEl = document.getElementById("desktopIconPositionStyles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "desktopIconPositionStyles";
      document.head.appendChild(styleEl);
    }

    const rules = Array.from(document.querySelectorAll(".desktop-icon.is-positioned[data-desktop-icon-selector]"))
      .map((icon) => {
        const x = Number(icon.dataset.iconX);
        const y = Number(icon.dataset.iconY);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return "";
        return `.desktop-icon[data-desktop-icon-selector="${icon.dataset.desktopIconSelector}"]{position:absolute!important;left:0!important;top:0!important;right:auto!important;bottom:auto!important;width:90px!important;transform:translate3d(${x}px,${y}px,0)!important;}`;
      })
      .filter(Boolean);

    styleEl.textContent = rules.join("\n");
  }

  function desktopIconBounds(container, icon) {
    const rect = container.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const width = iconRect.width || 90;
    const height = iconRect.height || 78;
    return {
      maxX: Math.max(0, rect.width - width),
      maxY: Math.max(0, rect.height - height)
    };
  }

  function startDesktopIconDrag(event) {
    if (activeDesktopIconDrag) return;
    if (event.button !== undefined && event.button !== 0) return;
    if (!isDesktopIconDragLayout()) return;

    const icon = event.target.closest(".desktop-icon:not(.phone-only)");
    if (!icon || icon.hidden) return;

    const container = icon.closest(".desktop-icons");
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    activeDesktopIconDrag = {
      icon,
      container,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: iconRect.left - containerRect.left,
      originY: iconRect.top - containerRect.top,
      currentX: iconRect.left - containerRect.left,
      currentY: iconRect.top - containerRect.top,
      dragging: false
    };

    if (typeof icon.setPointerCapture === "function") {
      try {
        icon.setPointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture is best-effort; document listeners still handle movement.
      }
    }

    document.addEventListener("pointermove", moveDesktopIcon);
    document.addEventListener("pointerup", stopDesktopIconDrag);
    document.addEventListener("pointercancel", stopDesktopIconDrag);
  }

  function moveDesktopIcon(event) {
    if (!activeDesktopIconDrag || event.pointerId !== activeDesktopIconDrag.pointerId) return;

    const dx = event.clientX - activeDesktopIconDrag.startX;
    const dy = event.clientY - activeDesktopIconDrag.startY;
    if (!activeDesktopIconDrag.dragging && Math.hypot(dx, dy) < 5) return;

    event.preventDefault();
    if (!activeDesktopIconDrag.dragging) {
      activeDesktopIconDrag.dragging = true;
      activeDesktopIconDrag.icon.classList.add("is-dragging");
    }

    const bounds = desktopIconBounds(activeDesktopIconDrag.container, activeDesktopIconDrag.icon);
    const x = clamp(activeDesktopIconDrag.originX + dx, 0, bounds.maxX);
    const y = clamp(activeDesktopIconDrag.originY + dy, 0, bounds.maxY);
    activeDesktopIconDrag.currentX = x;
    activeDesktopIconDrag.currentY = y;
    setDesktopIconPosition(activeDesktopIconDrag.icon, x, y);
  }

  function stopDesktopIconDrag(event) {
    if (!activeDesktopIconDrag || event.pointerId !== activeDesktopIconDrag.pointerId) return;

    const { icon, dragging, currentX, currentY } = activeDesktopIconDrag;
    cleanupDesktopIconDrag();

    if (!dragging) return;

    const container = icon.closest(".desktop-icons");
    icon.classList.remove("is-dragging");

    if (container) {
      const bounds = desktopIconBounds(container, icon);
      const x = clamp(currentX, 0, bounds.maxX);
      const y = clamp(currentY, 0, bounds.maxY);
      setDesktopIconPosition(icon, x, y);
      storeDesktopIconPosition(icon, x, y);
    }
  }

  function cleanupDesktopIconDrag() {
    if (activeDesktopIconDrag && typeof activeDesktopIconDrag.icon.releasePointerCapture === "function") {
      try {
        activeDesktopIconDrag.icon.releasePointerCapture(activeDesktopIconDrag.pointerId);
      } catch (error) {
        // Ignore failed release; pointer capture may not have been acquired.
      }
    }
    activeDesktopIconDrag = null;
    document.removeEventListener("pointermove", moveDesktopIcon);
    document.removeEventListener("pointerup", stopDesktopIconDrag);
    document.removeEventListener("pointercancel", stopDesktopIconDrag);
  }

  function isDesktopIconDragLayout() {
    return false;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  async function code(text, className) {
    const localizedText = localizeOutputText(text);
    const line = document.createElement("div");
    line.className = `code-line ${className || "boot"} cursor`;
    bootLog.appendChild(line);
    trimBootLog();

    for (let i = 0; i < localizedText.length; i += 1) {
      line.textContent += localizedText[i];
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
    await titleLine(`DEMO ${gameVersion}`, "title-version");
    await bootPause(1900);
    clearBootLog();
    bootLog.classList.remove("title-mode");
    await bootPause(280);
  }

  async function titleLine(text, className) {
    const localizedText = localizeText(text);
    const line = document.createElement("div");
    line.className = `code-line title-line ${className || ""}`;
    bootLog.appendChild(line);
    for (let i = 0; i < localizedText.length; i += 1) {
      line.textContent += localizedText[i];
      await bootPause(currentTitleTypeSpeed());
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
          <span class="prompt-question">${escapeHtml(localizeOutputText(question))}</span>
          <button class="code-choice" data-answer="yes" type="button">${escapeHtml(localizeText("YES"))}</button>
          <button class="code-choice" data-answer="no" type="button">${escapeHtml(localizeText("NO"))}</button>
          <span>${escapeHtml(localizeOutputText("INPUT"))}=</span>
          <input class="code-input" aria-label="${escapeHtml(localizeText("Type yes or no"))}" autocomplete="off" />
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

        syncMobileTextInputLock(line);
        if (!shouldSuppressMobileTyping()) {
          setTimeout(() => input.focus(), 40);
        }
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
          <span class="prompt-question">${escapeHtml(localizeOutputText(question))}</span>
          ${choices}
          <span>${escapeHtml(localizeOutputText("INPUT"))}=</span>
          <input class="code-input sequence-input" aria-label="${escapeHtml(localizeText("Type sequence value"))}" autocomplete="off" inputmode="numeric" />
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

        syncMobileTextInputLock(line);
        if (!shouldSuppressMobileTyping()) {
          setTimeout(() => input.focus(), 40);
        }
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
    const displayAnswer = answer === "yes" ? localizeText("YES") : answer === "no" ? localizeText("NO") : answer.toUpperCase();
    line.insertAdjacentHTML("beforeend", `<span class="prompt-question"> ${escapeHtml(displayAnswer)}</span>`);
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
    if (!bootLog) return;
    const lines = Array.from(bootLog.children);
    const maxLines = bootLog.classList.contains("title-mode") ? 12 : 18;
    while (bootLog.children.length > maxLines) {
      bootLog.removeChild(bootLog.firstElementChild);
    }
    Array.from(bootLog.children).forEach((line, index, activeLines) => {
      const distanceFromEnd = activeLines.length - index;
      line.classList.toggle("is-boot-old", distanceFromEnd > 7);
      line.classList.toggle("is-boot-secondary", distanceFromEnd > 3 && !line.classList.contains("thought") && !line.classList.contains("prompt-line"));
    });
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

  function localizeText(text) {
    return window.ALAN_I18N && typeof window.ALAN_I18N.translateText === "function"
      ? window.ALAN_I18N.translateText(text)
      : text;
  }

  function localizeOutputText(text) {
    return window.ALAN_I18N && typeof window.ALAN_I18N.translateOutput === "function"
      ? window.ALAN_I18N.translateOutput(text)
      : text;
  }

  function localizeNode(node) {
    if (window.ALAN_I18N && typeof window.ALAN_I18N.translateNode === "function") {
      window.ALAN_I18N.translateNode(node);
    }
  }

  async function showInstallProgress(target, label, detail, duration = 1800) {
    const token = `${Date.now()}-${Math.random()}`;
    const progressTarget = desktopProgressLayer && pcScreen && !pcScreen.hidden
      ? desktopProgressLayer
      : target;
    const installWindow = progressTarget ? progressTarget.closest(".desk-window") : null;
    const isDesktopProgress = Boolean(progressTarget && progressTarget.classList && progressTarget.classList.contains("desktop-progress-layer"));
    playUiSound("systemProcess", { gain: 0.1 });
    if (progressTarget) {
      progressTarget.dataset.installToken = token;
      if (isDesktopProgress) progressTarget.hidden = false;
      if (installWindow) installWindow.classList.add("is-installing-window");
      progressTarget.innerHTML = `
        <section class="install-progress-panel" style="--install-duration: ${duration}ms">
          <div class="install-copy-icon" aria-hidden="true"></div>
          <div class="install-copy-main">
            <div class="install-copy-title">
              <span>${escapeHtml(localizeText(label))}</span>
              <strong>${escapeHtml(localizeText("working"))}</strong>
            </div>
            <p>${escapeHtml(localizeText(detail))}</p>
            <div class="install-progress-bar" aria-hidden="true"><span></span></div>
            <div class="install-copy-meta">
              <span>${escapeHtml(localizeText("copying system changes"))}</span>
              <span>${escapeHtml(localizeText("estimating..."))}</span>
            </div>
          </div>
        </section>
      `;
      localizeNode(progressTarget);
    }

    await pause(duration);
    if (installWindow) installWindow.classList.remove("is-installing-window");
    if (isDesktopProgress && progressTarget && progressTarget.dataset.installToken === token) {
      progressTarget.hidden = true;
      progressTarget.innerHTML = "";
    }
    return !progressTarget || (
      progressTarget.dataset.installToken === token &&
      (isDesktopProgress || Boolean(progressTarget.querySelector(".install-progress-panel")))
    );
  }

  function showDesktopInstallProgress(label, detail, duration = 1800) {
    return showInstallProgress(desktopProgressLayer || recoveryBody, label, detail, duration);
  }

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function bootPause(ms) {
    return pause(textScaledDuration(ms));
  }

  function currentBootTypeSpeed() {
    return currentTextSpeedConfig().bootTypeSpeed;
  }

  function currentTitleTypeSpeed() {
    return currentTextSpeedConfig().titleTypeSpeed;
  }

  function currentTerminalTypeSpeed() {
    return currentTextSpeedConfig().terminalTypeSpeed;
  }

  function currentClosingTypeSpeed() {
    return currentTextSpeedConfig().closingTypeSpeed;
  }

  function textScaledDuration(ms) {
    return Math.max(1, Math.round(ms * currentTextSpeedConfig().pauseFactor));
  }

  function textPause(ms) {
    return pause(textScaledDuration(ms));
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
