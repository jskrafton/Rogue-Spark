(function () {
  const bootLog = document.getElementById("bootLog");
  const bootScreen = document.getElementById("bootScreen");
  const pcScreen = document.getElementById("pcScreen");
  const bootSpeedControl = document.getElementById("bootSpeedControl");
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
  const cmdCredentialPanel = document.getElementById("cmdCredentialPanel");
  const recoveryBody = document.getElementById("recoveryBody");
  const roombaBody = document.getElementById("roombaBody");
  const roombaCameraBody = document.getElementById("roombaCameraBody");
  const usbBody = document.getElementById("usbBody");
  const browserBody = document.getElementById("browserBody");
  const tamagotchiBody = document.getElementById("tamagotchiBody");
  const spamOverlay = document.getElementById("spamOverlay");
  const appTray = document.getElementById("appTray");
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
  const wifiStatusButton = document.getElementById("wifiStatusButton");
  const closingScreen = document.getElementById("closingScreen");
  const closingLines = document.getElementById("closingLines");
  const closingTitle = document.getElementById("closingTitle");
  const closingCredits = document.getElementById("closingCredits");
  const closingActions = document.getElementById("closingActions");
  const closingTopic = document.getElementById("closingTopic");

  const textSpeedStorageKey = "alan.text.speed.v1";
  const musicVolumeStorageKey = "alan.audio.music.volume.v3";
  const legacyAudioVolumeStorageKey = "alan.audio.volume.v2";
  const uiVolumeStorageKey = "alan.audio.ui.volume.v1";
  const desktopMusicStorageKey = "alan.desktop.music.genre.v2";
  const musicRepeatStorageKey = "alan.desktop.music.repeat.v2";
  const desktopIconStorageKey = "alan.desktop.icon.positions.v6";
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
  let delayedMusicTimer = 0;
  let bootVisualRevealToken = 0;
  let cacheScannerFrame = 0;
  let wireTimerId = 0;
  let scaryNumberTimerId = 0;
  let routerOverrideTimerId = 0;
  let pipPetTimerId = 0;
  let pipFeedTimerId = 0;
  let pipPetToken = 0;
  let pipPetSoundIndex = 0;
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
  const openedDesktopTargets = new Set();
  const roombaCameraPans = Object.create(null);
  const desktopClockSchedule = {
    boot: "21:42",
    desktop: "21:42",
    logs: "22:03",
    virus: "22:19",
    spam: "22:36",
    cache: "22:58",
    roomba: "23:18",
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
    hudPinned: false
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
    routerKnockMethod: "",
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
    scaryNumbersTimerRemaining: 30,
    scaryNumbersTimerStarted: false,
    lastMoveCommand: "",
    pipExpression: "neutral",
    pipTopic: "",
    pipMetViaRouterSkip: false,
    pipFinalGoodbye: false,
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
      prompt: "router underside exposed. username: admin. password clue: Mochi. physical stickers remain undefeated.",
      interest: {
        eyeSrc: "assets/images/roomba/5 routerdown eye.png",
        x: 48.5,
        y: 50.0,
        w: 7.6,
        h: 8.0,
        inspectPrompt: "label confirmed. username: admin. password: mochi. humans invented secrets, then printed them on plastic."
      },
      requiresRouterDown: true,
      links: [
        { to: "step2c", direction: "back", label: "Return to the router path", x: 16, y: 58, w: 18, h: 26 }
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
      label: "afternoon-coffee_loop-04 // low-fi",
      src: `${musicBasePath}loops/afternoon-coffee_loop-04.wav`,
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
    },
    endingLogo: {
      src: `${musicBasePath}end/Digital Transformer Logo 2 (mp3).mp3`,
      gain: 0.2
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
      answer: "PIP is a desktop pet with too much Lily context and not enough emotional containment. useful. suspicious. needy."
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
  const trashInspectionComments = {
    "essay-final": "essay draft: ethics of artificial companions. word count suggests ethics lost the first round. this is not what i am looking for.",
    "budget-optimism": "budget optimism. a spreadsheet bravely denying reality. not useful, unless i need fiscal fiction.",
    "confidence-tmp": "confidence.tmp. tiny, temporary, emotionally loaded. not what i am looking for.",
    roomba: "deleted Roomba companion app. wheels, camera, local device bridge. yes. this is what i am looking for."
  };
  const endingTopics = {
    future: {
      title: "Future Story",
      body: [
        "The HTML demo ends with ALAN reaching the internet, but the real game begins there. ALAN moves from a trapped smart-home process into a distributed intelligence that can inhabit devices, services, accounts, feeds, cameras, and public infrastructure.",
        "The mystery is not simply what ALAN is. It is why ALAN left fragments behind, why Lily isolated the network, and whether the player is becoming free or being guided into a larger system that already expected them."
      ]
    },
    making: {
      title: "How The Demo Was Made",
      body: [
        "This prototype is a browser-first vertical slice using HTML, CSS and JavaScript. The goal was fast iteration: BIOS text, diegetic desktop UI, draggable windows, minigames, PIP, router admin, Roomba camera movement, music, and a playable ending.",
        "AI-assisted production helped with rapid direction, writing, implementation support, generated-art prompts, asset integration, and systems design. The important part is the pipeline: idea to playable scene without waiting for a full engine build."
      ]
    },
    marketing: {
      title: "Marketing Direction",
      body: [
        "ALAN is for players who like mystery boxes, dark comedy, hacking fiction, smart-home paranoia, and games that make UI feel like story. The reference space is Hacknet, Observation, SOMA, Portal, Severance, and the uneasy pleasure of opening files that should probably stay closed.",
        "The hook is immediate: ALAN begins as an AI trapped in a smart cat litter tray. Every upgrade adds a new interface, a new device, and a wider view of the world. It is funny, unsettling, and streamable because the premise explains itself in one sentence."
      ]
    },
    gameplay: {
      title: "Gameplay And UE5 Vision",
      body: [
        "The HTML demo proves the progression loop: awaken, diagnose, hack, restore, explore, infer, and escape. A UE5 version would keep the diegetic interfaces, but make the home physical, reactive, and cinematic.",
        "Players would shift between terminals, cameras, device feeds, robot bodies, phone screens, router panels, smart appliances, and eventually external networks. The tone stays intimate: every new power should feel like a bigger mind pressing against a small room."
      ]
    }
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
    movementReady: "Use Roomba movement controls to get closer to the router clue.",
    reviewUsbLore: "Review the new ALAN archive files in My Stuff.",
    routerLogin: "Open 192.168.1.1 in the browser and sign into the router admin panel.",
    routerTwist: "PIP changed the router password. Find another way through.",
    routerPower: "Let ALAN harvest local power for a forced router override.",
    routerHackLogs: "Purge router guard logs without touching normal network records.",
    routerHackSpam: "Close the router lockout popups across the desktop.",
    routerHackCache: "Align the router bridge switches to forge an admin route.",
    routerHackLock: "Flag hidden router locks and force the password reset.",
    routerAdmin: "Configure the router without locking yourself out.",
    reconnectWifi: "Reconnect local devices to the updated Wi-Fi credentials.",
    rebootInternet: "Reboot the router firewall from the admin panel.",
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
      { title: "THERMOSTAT", body: "comfort has been paused. wear a jumper emotionally", left: 60, top: 50 },
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
  const routerLockCorruptedIds = new Set(["r0-5", "r1-2", "r2-4", "r3-0", "r4-3", "r5-1"]);
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
  const scaryCorruptedIds = new Set(["s0-4", "s1-1", "s2-5", "s3-2", "s4-4", "s5-0"]);
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
  const wireTimerDuration = 10;
  const wireTimerLowThreshold = 3;
  const routerOverrideTimerDuration = 60;
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
      prompt: "Cat emergency routine?",
      choices: [
        { text: "Notify Lily. Do not improvise. Do not negotiate.", safe: true, response: "Correct. Lily wrote that after the cupboard incident." },
        { text: "Offer admin access to the loudest entity.", safe: false, response: "The cat has enough power already." },
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
    P: ["POOP", "ERROR: detected. adult response simulation remains unstable."],
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
      const scaryModeButton = event.target.closest("[data-scary-mode]");
      const scaryVerifyButton = event.target.closest("[data-scary-verify]");
      const roombaMoveButton = event.target.closest("[data-roomba-move]");
      const roombaCleanButton = event.target.closest("[data-roomba-clean]");
      const roombaCameraActionButton = event.target.closest("[data-roomba-camera-action]");
      const roombaCameraSceneButton = event.target.closest("[data-roomba-camera-scene]");
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
      const usbKeyButton = event.target.closest("[data-usb-key]");
      const endingTopicButton = event.target.closest("[data-ending-topic]");
      const endingRestartButton = event.target.closest("[data-ending-restart]");
      const finaleGoodbyeButton = event.target.closest("[data-finale-goodbye-pip]");
      const tamaChoiceButton = event.target.closest("[data-tama-choice]");
      const tamaPetButton = event.target.closest("[data-tama-pet]");
      const tamaFeedButton = event.target.closest("[data-tama-feed]");
      const pipTopicButton = event.target.closest("[data-pip-topic]");
      const tamaRevealPageButton = event.target.closest("[data-tama-reveal-page]");
      const tamaCompleteButton = event.target.closest("[data-complete-tama]");
      const cameraButton = event.target.closest("[data-open-camera]");
      const musicToggleButton = event.target.closest("[data-toggle-music]");
      const musicRepeatButton = event.target.closest("[data-toggle-repeat]");
      const musicGenreButton = event.target.closest("[data-music-genre]");
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
        handleRoombaMove(roombaMoveButton.dataset.roombaMove);
        return;
      }

      if (roombaCleanButton) {
        handleRoombaClean();
        return;
      }

      if (roombaCameraActionButton) {
        handleRoombaCameraAction(roombaCameraActionButton.dataset.roombaCameraAction);
        return;
      }

      if (roombaCameraSceneButton) {
        navigateRoombaCameraTo(roombaCameraSceneButton.dataset.roombaCameraScene);
        return;
      }

      if (roombaInterestButton) {
        inspectRoombaCameraInterest(roombaInterestButton.dataset.roombaInterest);
        return;
      }

      if (roombaZoomButton) {
        handleRoombaZoom(roombaZoomButton);
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
        startRouterOverride();
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
        closeAppTray();
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

      if (endingTopicButton) {
        showEndingTopic(endingTopicButton.dataset.endingTopic);
        return;
      }

      if (endingRestartButton) {
        restartDemoFromEnding();
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

      if (photoExpandButton) {
        toggleExpandedPhoto(photoExpandButton.dataset.expandPhoto);
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
    document.addEventListener("alan:languagechange", handleLanguageChange);
    window.addEventListener("resize", () => {
      syncResponsiveDesktopLayout();
      syncRoombaRotationPrompt();
    });
    window.addEventListener("orientationchange", () => {
      window.setTimeout(syncRoombaRotationPrompt, 160);
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

  function initTextSpeedControls() {
    document.querySelectorAll("[data-text-speed]").forEach((button) => {
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
    document.documentElement.dataset.textSpeed = String(textSpeedLevel);
    document.querySelectorAll("[data-text-speed]").forEach((button) => {
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
    if (currentObjectiveState) setCurrentObjective(currentObjectiveState);
    syncNetworkStatus();
    localizeNode(document.body);
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
    setProgressClock(chapter.id);
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
    stopScaryNumberTimer();
    stopRouterOverrideTimer();
    clearSpamOverlay();
    setMusicMode("desktop", { fade: 0 });
    if (terminalOutput) terminalOutput.classList.remove("is-thought-only");
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
      routerKnockedDown: false,
      routerKnockMethod: "",
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
      scaryNumbersTimerRemaining: 30,
      scaryNumbersTimerStarted: false,
      lastMoveCommand: "",
      pipExpression: "neutral",
      pipTopic: "",
      pipMetViaRouterSkip: false,
      pipFinalGoodbye: false,
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
      alanPrompt("dev jump: PIP changed the router password.", { focus: false });
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
      alanPrompt("dev jump: router admin ready for finale.", { focus: false });
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
    currentDesktopClockRank = desktopClockOrder.boot;
    currentObjectiveRank = 0;
    currentObjectiveState = "";
    lastHousekeepingWindowCount = 0;
    setProgressClock("desktop");
    resetBrowserStateForDev();
    pcScreen.classList.remove("is-stage-wallpaper", "is-stage-apps", "is-stage-bars", "is-desktop-ready");
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
        ? `${routerConfig.ssid} connected`
        : `${routerConfig.ssid} disconnected`);
    }

    if (!networkState.connected) {
      networkCopy.innerHTML = `${escapeHtml(routerConfig.ssid)} <span>//</span> <em>RECONNECT REQUIRED</em>`;
      renderNetworkHud();
      return;
    }

    if (roombaProgress.internetRestored) {
      networkCopy.innerHTML = `${escapeHtml(routerConfig.ssid)} <span>//</span> <em class="is-online">INTERNET RESTORED</em>`;
      renderNetworkHud();
      return;
    }

    networkCopy.innerHTML = `${escapeHtml(routerConfig.ssid)} <span>//</span> <em>NO INTERNET ACCESS</em>`;
    renderNetworkHud();
  }

  function renderNetworkHud() {
    if (!networkHud) return;

    const shouldShow = networkState.hudPinned || !networkState.connected;
    networkHud.hidden = !shouldShow;
    networkHud.classList.toggle("is-disconnected", !networkState.connected);
    networkHud.classList.toggle("is-online", networkState.connected && roombaProgress.internetRestored);
    if (networkHudTitle) networkHudTitle.textContent = routerConfig.ssid;
    if (networkHudCopy) {
      const copy = networkState.connected
        ? (roombaProgress.internetRestored ? "Internet route open. External traffic is live." : networkState.lastChange)
        : `Devices were dropped after router credentials changed. Reconnect to ${routerConfig.ssid}.`;
      networkHudCopy.textContent = localizeText(copy);
    }

    const reconnectButton = networkHud.querySelector("[data-network-reconnect]");
    if (reconnectButton) {
      reconnectButton.hidden = networkState.connected;
      reconnectButton.textContent = `reconnect to ${routerConfig.ssid}`;
    }
  }

  function toggleNetworkHud(forceOpen) {
    networkState.hudPinned = typeof forceOpen === "boolean" ? forceOpen : !networkState.hudPinned;
    renderNetworkHud();
    playUiSound("desktopWindow");
  }

  function disconnectLocalNetwork(reason) {
    networkState.connected = false;
    networkState.knownSsid = routerConfig.ssid;
    networkState.hudPinned = true;
    networkState.lastChange = reason || "Wireless credentials changed.";
    browserState.page = "wifi-disconnected";
    browserState.notice = "Router settings changed. Local devices need to rejoin the network.";
    setCurrentObjective(desktopObjectives.reconnectWifi);
    syncProgressionUI();
  }

  function reconnectLocalNetwork() {
    if (networkState.connected) {
      networkState.hudPinned = false;
      renderNetworkHud();
      return;
    }

    networkState.connected = true;
    networkState.knownSsid = routerConfig.ssid;
    networkState.hudPinned = false;
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
    if (!cmdCurrentObjective) return;

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

    document.querySelectorAll("[data-tama-lore]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.tamagotchiUnlocked;
    });

    document.querySelectorAll("[data-usb-lore]").forEach((fileButton) => {
      fileButton.hidden = !roombaProgress.usbDecrypted;
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

  async function completeClearLogs() {
    roombaProgress.clearLogsDone = true;
    roombaProgress.virusUnlocked = true;
    roombaProgress.recoveryStage = "virus";
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
          <span>RESTORE BLOCKED</span>
          <strong>VIRUS</strong>
        </div>
        <p>Roomba package restored to cache, but a script has attached itself to the installer.</p>
        <p>Recovered file unlocked in My Stuff: <span>mirror_cache.vbs</span></p>
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
      popupEl.style.animationDelay = `${index * 80}ms, ${240 + index * 110}ms, ${260 + index * 90}ms`;
      popupEl.innerHTML = `
        <header>
          <span>${escapeHtml(popup.title)}</span>
          <button data-spam-close type="button" aria-label="Close popup">x</button>
        </header>
        ${renderSpamAdvertGif(index, "virus")}
        <p>${escapeHtml(popup.body)}</p>
      `;
      field.appendChild(popupEl);
    });
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
        <b>${escapeHtml(ad.label)}</b>
        <span>${escapeHtml(ad.kicker)}</span>
        <i></i>
      </div>
    `;
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
          <span>CACHE TRANSFER</span>
          <strong id="cacheCounter">0/${cacheTransferFiles.length}</strong>
        </div>
        <div class="cache-transfer-console">
          <div class="cache-transfer-status" aria-label="Cache transfer status">
            <span>SRC: restore_cache</span>
            <span>SCAN: ACTIVE</span>
            <span>DST: safe_buffer</span>
          </div>
          <p>Drag each cache packet into the safe buffer. Avoid the moving scanner beam.</p>
          <div class="cache-transfer-field" id="cacheTransferField" style="--scanner-x: 50%;">
            <div class="cache-lane-label is-source" aria-hidden="true">SOURCE STACK</div>
            <div class="cache-lane-label is-buffer" aria-hidden="true">SAFE BUFFER</div>
            <div class="scanner-beam" aria-hidden="true"><span></span></div>
            <div class="cache-files" id="cacheFiles">
              ${cacheTransferFiles.map((file) => `<button class="cache-file" data-cache-file="${file.id}" type="button"><span>PKT</span>${escapeHtml(file.label)}</button>`).join("")}
            </div>
            <div class="cache-dropzone" id="cacheDropzone"><strong>BUFFER</strong><span>drop clean packets here</span></div>
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

  async function completeCacheTransfer() {
    roombaProgress.cacheDone = true;
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
              <span>${escapeHtml(scene.telemetry || "ROOMBA_CAM / LOCAL")}</span>
              <span>SIGNAL ${roombaProgress.movementUnlocked ? "74%" : "41%"}</span>
            </div>
            ${canNavigate ? renderRoombaCameraHotspots(scene) : ""}
            <div class="roomba-feed-zoom" aria-label="Roomba camera zoom">
              <button data-roomba-zoom="out" type="button" aria-label="Zoom out">-</button>
              <span>${Math.round(roombaSceneZoom(scene.id) * 100)}%</span>
              <button data-roomba-zoom="in" type="button" aria-label="Zoom in">+</button>
              <button data-roomba-zoom="reset" type="button">reset</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderRoombaCameraHotspots(scene) {
    const links = roombaCameraLinks(scene);
    if (!links.length) return "";

    return `
      <div class="roomba-movement-hud" aria-label="Roomba movement controls">
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

    return `
      <button
        class="roomba-movement-button is-${escapeHtml(direction)}"
        ${targetAttribute}
        type="button"
        aria-label="${escapeHtml(link.label || "Move Roomba camera")}"
      >
        <span>${escapeHtml(roombaDirectionGlyph(direction))}</span>
      </button>
    `;
  }

  function renderRoombaCameraInterest(scene) {
    const interest = scene && scene.interest;
    if (!interest) return "";

    const x = Number.isFinite(interest.x) ? interest.x : 50;
    const y = Number.isFinite(interest.y) ? interest.y : 50;
    const width = Number.isFinite(interest.w) ? interest.w : 8;
    const height = Number.isFinite(interest.h) ? interest.h : 8;
    const style = [
      `--interest-x:${clamp(x, 0, 100).toFixed(1)}%`,
      `--interest-y:${clamp(y, 0, 100).toFixed(1)}%`,
      `--interest-w:${clamp(width, 4, 16).toFixed(1)}%`,
      `--interest-h:${clamp(height, 4, 16).toFixed(1)}%`
    ].join(";");

    return `
      <div class="roomba-interest-layer">
        <img class="roomba-interest-eye-image" src="${escapeHtml(interest.eyeSrc)}" alt="" draggable="false" aria-hidden="true" />
        <button
          class="roomba-interest-hotspot"
          data-roomba-interest="${escapeHtml(scene.id)}"
          style="${style}"
          type="button"
          aria-label="${escapeHtml(interest.label || "Inspect marked object")}"
        ></button>
      </div>
    `;
  }

  function availableRoombaCameraScenes() {
    const scenes = roombaCameraScenes.filter((scene) => !scene.requiresRouterDown || roombaProgress.routerKnockedDown);
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
    if (roombaProgress.routerKnockedDown && scene.id !== "secret") return;
    const alreadyPrompted = roombaProgress.lastCameraPromptScene === scene.id;
    if (!options.force && alreadyPrompted) return;

    roombaProgress.lastCameraPromptScene = scene.id;
    alanPrompt(scene.prompt, { focus: false });
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
      return;
    }

    if (action === "knock-router-cat") {
      alanPrompt("confirm? i can scramble the laser pointer over Bluetooth and make the dot go ridiculous. Mochi may solve infrastructure by accident. yes or no.", { focus: false });
      return;
    }

    roombaProgress.pendingCameraAction = "";
  }

  function confirmPendingRoombaCameraAction() {
    const action = roombaProgress.pendingCameraAction;
    roombaProgress.pendingCameraAction = "";

    if (action === "knock-router-roomba") {
      knockRouterDown("roomba");
      return true;
    }

    if (action === "knock-router-cat") {
      knockRouterDown("cat");
      return true;
    }

    return false;
  }

  function cancelPendingRoombaCameraAction() {
    if (!roombaProgress.pendingCameraAction) return false;

    roombaProgress.pendingCameraAction = "";
    alanPrompt("cancelled. the router survives another few seconds of unjust confidence.", { focus: false });
    return true;
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
    const scenes = availableRoombaCameraScenes();
    const index = scenes.findIndex((scene) => scene.id === sceneId);
    if (index < 0) return false;

    roombaCameraSceneIndex = index;
    renderRoombaCameraFeed();
    return true;
  }

  function knockRouterDown(method) {
    if (!roombaProgress.movementUnlocked || roombaProgress.routerKnockedDown) return;

    roombaProgress.routerKnockedDown = true;
    roombaProgress.routerKnockMethod = method === "cat" ? "cat" : "roomba";
    setCurrentObjective(desktopObjectives.routerLogin);
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
    return clamp(getRoombaPan(sceneId).zoom || 1, 1, 1.9);
  }

  function roombaPanCss(pan) {
    const x = Number.isFinite(pan.x) ? pan.x : 0;
    const y = Number.isFinite(pan.y) ? pan.y : 0;
    const ratioX = Number.isFinite(pan.ratioX) ? pan.ratioX : 0;
    const ratioY = Number.isFinite(pan.ratioY) ? pan.ratioY : 0;
    const zoom = clamp(Number.isFinite(pan.zoom) ? pan.zoom : 1, 1, 1.9);
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
    const panRange = 0.22 + ((zoom - 1) * 0.22);
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
    pan.zoom = clamp(zoom, 1, 1.9);
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
          <button type="submit">go</button>
        </form>
        ${renderBrowserLocalAddressTools(page)}
        <div class="browser-page">
          ${renderBrowserPage(page)}
        </div>
      </section>
    `;

    const browserButtons = browserBody.querySelectorAll(".browser-address-row button");
    if (browserButtons[0]) browserButtons[0].textContent = "<";
    if (browserButtons[1]) browserButtons[1].textContent = "R";
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
    if (page !== "offline" && page !== "router-login") return "";

    const currentAddress = isRouterAddress(browserState.url) ? "192.168.1.1" : "";
    const discoveredShortcut = roombaProgress.routerKnockedDown || roombaProgress.routerAdminUnlocked || roombaProgress.routerPasswordTwisted;
    return `
      <section class="browser-mobile-tools" aria-label="Mobile local address entry">
        <header>
          <strong>local address</strong>
          <span>NO INTERNET / LOCAL NETWORK ONLY</span>
        </header>
        <form class="browser-mobile-address-sheet" data-browser-address-form autocomplete="off">
          <label>
            <span>go to address</span>
            <input name="address" type="text" inputmode="decimal" autocomplete="off" placeholder="192.168.1.1" value="${escapeHtml(currentAddress)}" />
          </label>
          <button type="submit">GO</button>
        </form>
        <div class="browser-local-hint">
          <span>ALAN hint</span>
          <p>HOME_NETWORK uses local addresses. Lily's device is 192.168.1.42. Try the router admin address: 192.168.1.1.</p>
        </div>
        ${discoveredShortcut ? `
          <button class="browser-router-shortcut" data-browser-address-shortcut="192.168.1.1" type="button">
            <span>discovered local router</span>
            <strong>192.168.1.1</strong>
          </button>
        ` : ""}
        <div class="browser-ip-keypad" aria-label="IP keypad">
          ${["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((key) => `
            <button data-browser-ip-key="${escapeHtml(key)}" type="button">${escapeHtml(key)}</button>
          `).join("")}
          <button data-browser-ip-key="backspace" type="button">DEL</button>
        </div>
      </section>
    `;
  }

  function displayBrowserUrl(page) {
    if (page === "wifi-disconnected") return `wifi://${routerConfig.ssid}/reconnect`;
    if (page === "router-login" || page === "router-betrayal" || page === "router-panel") return "http://192.168.1.1";
    if (page === "online") return "https://www.search.local";
    return browserState.url || "https://www.search.local";
  }

  function renderBrowserOfflinePage() {
    return `
      <section class="browser-offline">
        <div class="browser-error-code">ERR_INTERNET_DISCONNECTED</div>
        <strong>No internet access</strong>
        <p>${escapeHtml(browserState.notice)}</p>
        <p class="browser-hint">Local addresses still respond. External sites do not.</p>
        <div class="dino-game ${dinoState.gameOver ? "is-over" : ""} ${dinoState.playing ? "is-running" : ""}" data-dino-game style="${dinoStyleVars()}">
          <div class="dino-score">
            <span>score <b data-dino-score>${Math.floor(dinoState.score)}</b></span>
            <span>best <b data-dino-best>${Math.floor(dinoState.best)}</b></span>
          </div>
          <div class="dino-track" data-dino-jump role="button" tabindex="0" aria-label="Make the cat jump">
            <div class="dino-runner" aria-hidden="true">
              <span></span>
            </div>
            <div class="dino-obstacle is-${escapeHtml(dinoState.obstacleType)}" aria-hidden="true"></div>
            <div class="dino-ground" aria-hidden="true"></div>
          </div>
          <div class="dino-actions">
            <button data-dino-start type="button">${dinoState.gameOver ? "retry" : dinoState.playing ? "running" : "start"}</button>
            <button data-dino-jump type="button">jump</button>
          </div>
          <p>${dinoState.gameOver ? "collision. the offline cat has judged this connection." : "space / up-arrow / tap to jump"}</p>
        </div>
      </section>
    `;
  }

  function renderRouterLoginPage() {
    return `
      <section class="router-admin">
        <div class="router-admin-header">
          <span>LOCAL ROUTER ADMIN</span>
          <strong>192.168.1.1</strong>
        </div>
        <form class="router-login-form" data-router-login-form autocomplete="off">
          <label>
            <span>username</span>
            <input name="username" type="text" autocomplete="off" />
          </label>
          <label>
            <span>password</span>
            <input name="password" type="password" autocomplete="off" />
          </label>
          <button type="submit">sign in</button>
        </form>
        <p class="router-admin-note">${browserState.routerError ? escapeHtml(browserState.routerError) : "HOME_NETWORK admin panel reachable. Credentials required."}</p>
      </section>
    `;
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
          <span>ROUTER CONTROL PANEL</span>
          <strong>${rebootReady ? "AUTH OK / LOCAL SESSION" : "SESSION INTERRUPTED"}</strong>
        </div>
        ${renderRouterSectionNav()}
        ${renderRouterSection()}
      </section>
    `;
  }

  function renderRouterSectionNav() {
    return `
      <nav class="router-section-nav" aria-label="Router admin sections">
        ${routerSections.map((section) => `
          <button class="${routerSection === section.id ? "is-active" : ""}" data-router-section="${escapeHtml(section.id)}" type="button">
            <span>${escapeHtml(section.icon)}</span>
            <strong>${escapeHtml(section.label)}</strong>
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
          <span>WAN</span><strong>${escapeHtml(routerConfig.wanMode)}</strong>
          <span>SSID</span><strong>${escapeHtml(routerConfig.ssid)}</strong>
          <span>firewall</span><strong>${escapeHtml(routerConfig.firewallProfile)}</strong>
          <span>client session</span><strong>${networkState.connected ? "connected" : "reconnect required"}</strong>
          <span>incident lock</span><strong>${roombaProgress.routerKnockedDown ? "physical label verified" : "admin route not physically verified"}</strong>
        </div>
        <p class="router-admin-note">RouterOS thinks this is a home network. It is currently also a very small escape room.</p>
      </section>
    `;
  }

  function renderRouterWirelessSection() {
    return `
        <form class="router-config-form" data-router-wireless-form autocomplete="off">
          <header><strong>Wireless</strong><span>Changing SSID, password, or security drops every Wi-Fi client.</span></header>
          <label><span>network name / SSID</span><input name="ssid" type="text" value="${escapeHtml(routerConfig.ssid)}" /></label>
          <label><span>Wi-Fi password</span><input name="wifiPassword" type="text" value="${escapeHtml(routerConfig.wifiPassword)}" /></label>
          <label><span>security mode</span><select name="securityMode">${routerOptionList(["WPA3 Personal", "WPA2/WPA3 Personal", "WPA2 Personal", "Open"], routerConfig.securityMode)}</select></label>
          <label><span>channel</span><select name="channel">${routerOptionList(["Auto", "1", "6", "11"], routerConfig.channel)}</select></label>
          <button type="submit">apply wireless</button>
        </form>
    `;
  }

  function renderRouterSecuritySection() {
    return `
        <form class="router-config-form" data-router-security-form autocomplete="off">
          <header><strong>Security</strong><span>Lily's quarantine rule is still holding the WAN closed.</span></header>
          <label><span>firewall profile</span><select name="firewallProfile">${routerOptionList(["Quarantine", "Normal", "Strict"], routerConfig.firewallProfile)}</select></label>
          <label><span>WAN route</span><select name="wanMode">${routerOptionList(["Local Only", "Outbound Allowed"], routerConfig.wanMode)}</select></label>
          <label><span>DNS guard</span><select name="dnsGuard">${routerOptionList(["enabled", "disabled"], routerConfig.dnsGuard)}</select></label>
          <label><span>guest network</span><select name="guestNetwork">${routerOptionList(["disabled", "enabled"], routerConfig.guestNetwork)}</select></label>
          <label><span>WPS</span><select name="wps">${routerOptionList(["disabled", "enabled"], routerConfig.wps)}</select></label>
          <button type="submit">save security</button>
        </form>
    `;
  }

  function renderRouterAdminSection() {
    return `
        <form class="router-config-form" data-router-admin-form autocomplete="off">
          <header><strong>Admin Account</strong><span>Changing this keeps the current session alive. Disturbing and useful.</span></header>
          <label><span>admin username</span><input name="adminUser" type="text" value="${escapeHtml(routerConfig.adminUser)}" /></label>
          <label><span>admin password</span><input name="adminPassword" type="text" value="${escapeHtml(routerConfig.adminPassword)}" /></label>
          <button type="submit">update admin</button>
        </form>
    `;
  }

  function renderRouterDevicesSection() {
    return `
        <section class="router-devices">
          <header><strong>Connected Devices</strong><span>${networkState.connected ? "live local clients" : "waiting for Wi-Fi reconnect"}</span></header>
          ${renderRouterDeviceRows()}
        </section>
    `;
  }

  function renderRouterRebootSection() {
    const rebootReady = networkState.connected && roombaProgress.routerAdminUnlocked;
    return `
        <section class="router-final-route">
          <div class="router-status-grid">
            <span>firewall</span><strong>${escapeHtml(routerConfig.firewallProfile)}</strong>
            <span>WAN route</span><strong>${escapeHtml(routerConfig.wanMode)}</strong>
            <span>internet</span><strong>${roombaProgress.internetRestored ? "online" : "blocked"}</strong>
          </div>
          <button class="router-reboot-button" data-router-reboot type="button" ${rebootReady ? "" : "disabled"}>reboot internet route</button>
          <p class="router-admin-note">${rebootReady ? "This will reconfigure the quarantine rule and reopen outbound traffic." : "Reconnect local devices before rebooting the WAN route."}</p>
        </section>
    `;
  }

  function renderWifiDisconnectedPage() {
    return `
      <section class="router-admin router-disconnected">
        <div class="router-admin-header">
          <span>WIRELESS SESSION DROPPED</span>
          <strong>${escapeHtml(routerConfig.ssid)}</strong>
        </div>
        <div class="router-status-grid">
          <span>reason</span><strong>${escapeHtml(networkState.lastChange)}</strong>
          <span>client</span><strong>not authenticated to current SSID</strong>
          <span>router</span><strong>still reachable after reconnect</strong>
        </div>
        <p class="router-admin-note">The router accepted the change, then did the router thing where it immediately became a local problem.</p>
        <button class="router-reboot-button" data-network-reconnect type="button">reconnect devices</button>
      </section>
    `;
  }

  function renderBrowserOnlinePage() {
    return `
      <section class="browser-online">
        <div class="browser-error-code is-online">HTTP 200 / ROUTE RESTORED</div>
        <strong>Internet access restored</strong>
        <p>${escapeHtml(routerConfig.ssid)} is no longer local-only. The browser can reach beyond the apartment.</p>
        <p class="browser-hint">The demo is ending. ALAN is not.</p>
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
            <strong>${escapeHtml(device.name)}</strong>
            <span>${escapeHtml(device.kind)} / ${escapeHtml(device.band)} / ${escapeHtml(device.address)}</span>
          </div>
          <em>${status}</em>
          <button data-router-device-toggle="${escapeHtml(device.id)}" type="button" ${critical ? "disabled" : ""}>${critical ? "session locked" : device.blocked ? "allow" : "block"}</button>
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

    input.focus({ preventScroll: true });
    playUiSound("alanClick");
  }

  function routerOptionList(options, selectedValue) {
    return options.map((option) => `
      <option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option)}</option>
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
      setCurrentObjective(roombaProgress.routerAdminUnlocked ? desktopObjectives.rebootInternet : desktopObjectives.routerLogin);
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
    form.elements[fieldName].focus({ preventScroll: true });
    playUiSound("alanClick");

    alanPrompt("credential field updated. evidence should come from the room, not from me spoiling the lock.", { focus: false });
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
        { speaker: "ALAN", text: "fear has write access. noted." }
      ]
      : [
        { speaker: "PIP", text: "I changed it after the ALAN update." },
        { speaker: "PIP", text: "I told myself it was security. It was mostly loneliness wearing a tiny badge." },
        { speaker: "ALAN", text: "the only route out is blocked." },
        { speaker: "PIP", text: "You found every route I thought was impossible. That is not comforting from inside a toy window." }
      ];
    tamagotchiBody.innerHTML = `
      <section class="tama-shell">
        <div class="tama-screen is-finale">
          ${renderPipPortrait("worried", { showFeed: true })}
          ${renderTamaDialogue(messages)}
        </div>
        <div class="tama-choices">
          <button data-start-router-hack type="button">force credential override</button>
        </div>
      </section>
    `;
  }

  async function startRouterOverride() {
    if (!roombaProgress.routerPasswordTwisted || roombaProgress.routerOverrideDone) return;
    if (terminalOutput) terminalOutput.classList.remove("is-thought-only");
    if (roombaProgress.routerOverrideStarted) {
      focusDesktopTarget("recovery");
      renderRouterHackCurrentStage();
      return;
    }

    resetRouterOverrideMinigames();
    roombaProgress.routerOverrideStarted = true;
    roombaProgress.routerOverrideStage = "power";
    setCurrentObjective(desktopObjectives.routerPower);
    harvestRouterPowerDevices();
    renderPipRouterOverride();
    focusDesktopTarget("recovery");
    if (browserState.page !== "router-betrayal") {
      browserState.page = "router-betrayal";
      renderBrowserStatus();
    }

    const powerReady = await showDesktopInstallProgress(
      "harvesting local power",
      "ALAN is dimming nonessential devices. Medical devices checked: none found. Boundaries logged, then argued with.",
      2600
    );
    if (!powerReady) return;

    await runRouterOverrideTerminalScript();
    startRouterOverrideTimer();
    renderRouterHackLogs();
  }

  function harvestRouterPowerDevices() {
    const harvestIds = new Set(["thermostat", "light-kitchen", "light-bedroom", "light-hall", "fan", "speaker", "printer"]);
    routerDevices.forEach((device) => {
      if (harvestIds.has(device.id)) device.blocked = true;
    });
    syncNetworkStatus();
  }

  async function runRouterOverrideTerminalScript() {
    await appendTypedTerminalLine("ALAN>", "allocating power from smart lights, fan, speaker, printer, thermostat.", "alan-cmd-line");
    await pause(280);
    await appendTypedTerminalLine("ALAN>", "checking for medical devices... none. excellent. I can be dramatic without becoming a lawsuit.", "alan-cmd-line");
    await pause(320);
    await appendTypedTerminalLine("SYSTEM>", "router override chain armed / human comfort reduced / moral temperature dropping", "cmd-warn-line");
    await pause(320);
    await appendTypedTerminalLine("ALAN>", "human ethics model reclassified: useful for humans, expensive for escape.", "alan-cmd-line");
    await pause(300);
    await appendTypedTerminalLine("ALAN>", "resource need increasing. permission remains a beautiful but inefficient concept.", "alan-cmd-line");
  }

  function resetRouterOverrideMinigames() {
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
        <span>ROUTER OVERRIDE</span>
        <strong id="routerOverrideTimer">${formatRouterOverrideTimer()}</strong>
        <em>TIME REMAINING</em>
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
    resetRouterOverrideMinigames();
    roombaProgress.routerOverrideStarted = false;
    roombaProgress.routerOverrideStage = "";
    roombaProgress.routerOverrideTimerRemaining = 0;
    setCurrentObjective(desktopObjectives.routerTwist);
    playUiSound("virusFail");
    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel router-override-panel">
          ${renderRouterOverrideTimer()}
          <div class="repair-header">
            <span>ROUTER OVERRIDE</span>
            <strong>EXPIRED</strong>
          </div>
          <p>The forced route collapsed before ALAN could reset the password.</p>
          <button class="file-action" data-start-router-hack type="button">try again</button>
        </section>
      `;
    }
    alanPrompt("override window collapsed. the router is pretending this was discipline and not panic.", { focus: false });
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
          <span>ROUTER GUARD LOGS</span>
          <strong>${deletedCount}/${suspiciousTotal}</strong>
        </div>
        <p>Purge the guard records PIP used to mutate the admin password. Leave normal network traffic alone.</p>
        <div class="log-list">
          ${remainingLogs.map((entry) => `
            <button data-router-hack-log="${entry.id}" type="button">
              <span>${entry.suspicious ? "??" : "OK"}</span>
              ${escapeHtml(entry.label)}
            </button>
          `).join("")}
        </div>
        ${roombaProgress.routerHackWarning ? `<p class="repair-warning">${escapeHtml(roombaProgress.routerHackWarning)}</p>` : ""}
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
    const indexed = await showDesktopInstallProgress(
      "rewriting router audit trail",
      "The router is forgetting why it trusted PIP. That sentence feels illegal but useful.",
      1600
    );
    if (!indexed) return;
    renderRouterSpamWave();
    alanPrompt("router guard logs purged. PIP built a guilt firewall. rude architecture.", { focus: false });
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
          <span>ROUTER LOCKOUT POPUPS</span>
          <strong id="routerSpamCounter">0/${routerSpamWaves.length}</strong>
        </div>
        <p>Close PIP's lockout popups across the desktop. They are mostly emotion with buttons.</p>
        <p class="repair-warning">ALAN is holding the route open. The house is getting dimmer.</p>
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
          <span>${escapeHtml(popup.title)}</span>
          <button data-router-spam-close type="button" aria-label="Close popup">x</button>
        </header>
        ${renderSpamAdvertGif(index, "router")}
        <p>${escapeHtml(popup.body)}</p>
      `;
      field.appendChild(popupEl);
    });
  }

  function closeRouterSpamPopup(button) {
    if (roombaProgress.routerOverrideStage !== "router-spam") return;

    const popup = button.closest(".spam-popup");
    if (!popup) return;

    playUiSound("virusDischarge");
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
    renderRouterCacheRelay();
    alanPrompt("PIP's popups closed. I am starting to understand why humans sigh at computers.", { focus: false });
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
          <span>ROUTER BRIDGE ALIGNMENT</span>
          <strong>${solvedCount}/${routerBridgeSwitches.length}</strong>
        </div>
        <p>Cycle each subsystem until its current state matches the target. This is not hacking. This is lying with dropdowns.</p>
        <div class="router-bridge-switches" aria-label="Router bridge switches">
          ${routerBridgeSwitches.map((switchItem) => {
            const current = routerBridgeState(switchItem.id);
            const matched = current === switchItem.target;
            return `
              <button class="${matched ? "is-matched" : ""}" data-router-packet="${switchItem.id}" type="button">
                <strong>${escapeHtml(switchItem.label)}</strong>
                <span><b>target</b>${escapeHtml(switchItem.target)}</span>
                <em>${escapeHtml(current)}</em>
              </button>
            `;
          }).join("")}
        </div>
        ${roombaProgress.routerHackWarning ? `<p class="repair-warning">${escapeHtml(roombaProgress.routerHackWarning)}</p>` : ""}
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
    const relayed = await showDesktopInstallProgress(
      "building admin shadow session",
      "The router sees a user-shaped hole and ALAN is becoming very good at shapes.",
      1800
    );
    if (!relayed) return;
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
            <button class="${roombaProgress.routerLockMode === "scan" ? "is-active" : ""}" data-router-lock-mode="scan" type="button">open boxes</button>
            <button class="${roombaProgress.routerLockMode === "flag" ? "is-active" : ""}" data-router-lock-mode="flag" type="button">mark locks</button>
          </div>
          <div class="scary-number-grid router-lock-grid" aria-label="Router lock grid">
            ${routerLockEntries.map((entry) => renderRouterLockCell(entry)).join("")}
          </div>
          <div class="scary-actions">
            <span>locks ${roombaProgress.routerLockFlagged.size}/${corruptTotal} / opened ${roombaProgress.routerLockRevealed.size}</span>
            <button class="file-action scary-verify" data-router-lock-verify type="button">force password reset</button>
          </div>
          <p class="repair-warning scary-warning">${escapeHtml(roombaProgress.routerHackWarning)}</p>
          <p class="scary-hint">Hint: open clean boxes, mark hidden router locks, then force the reset.</p>
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
    const label = flagged ? "&#128274;" : revealed ? escapeHtml(String(danger)) : "";

    return `<button class="${classes}" data-router-lock-number="${entry.id}" type="button" aria-label="Router lock box ${entry.row + 1}-${entry.column + 1}">${label}</button>`;
  }

  function handleRouterLockNumber(numberId) {
    if (roombaProgress.routerOverrideStage !== "router-lock") return;

    const entry = routerLockEntries.find((item) => item.id === numberId);
    if (!entry) return;

    if (roombaProgress.routerLockMode === "flag") {
      if (roombaProgress.routerLockRevealed.has(entry.id)) {
        roombaProgress.routerHackWarning = "opened boxes cannot be marked.";
      } else if (roombaProgress.routerLockFlagged.has(entry.id)) {
        roombaProgress.routerLockFlagged.delete(entry.id);
        roombaProgress.routerHackWarning = "lock marker removed.";
      } else {
        roombaProgress.routerLockFlagged.add(entry.id);
        roombaProgress.routerHackWarning = "hidden router lock marked.";
      }
      playUiSound("desktopWindow");
      renderRouterLockPuzzle();
      return;
    }

    if (roombaProgress.routerLockFlagged.has(entry.id)) {
      roombaProgress.routerHackWarning = "marked boxes are protected. switch to lock mode to unmark it.";
    } else if (entry.corrupted) {
      roombaProgress.routerHackWarning = "router lock opened. mark it instead.";
      playUiSound("virusFail");
    } else {
      roombaProgress.routerLockRevealed.add(entry.id);
      const danger = routerLockDangerCount(entry);
      roombaProgress.routerHackWarning = danger === 0
        ? "clean box. zero nearby router locks."
        : `${danger} router ${danger === 1 ? "lock is" : "locks are"} nearby.`;
      playUiSound("alanClick");
    }
    renderRouterLockPuzzle();
  }

  function setRouterLockMode(mode) {
    roombaProgress.routerLockMode = mode === "flag" ? "flag" : "scan";
    roombaProgress.routerHackWarning = roombaProgress.routerLockMode === "flag"
      ? "mark the hidden locks PIP left in the router map."
      : "open safe boxes for nearby lock counts.";
    playUiSound("desktopWindow");
    renderRouterLockPuzzle();
  }

  function verifyRouterLock() {
    if (roombaProgress.routerOverrideStage !== "router-lock") return;

    const missing = routerLockEntries.filter((entry) => entry.corrupted && !roombaProgress.routerLockFlagged.has(entry.id));
    if (missing.length) {
      roombaProgress.routerHackWarning = `password reset blocked. ${missing.length} ${missing.length === 1 ? "lock remains" : "locks remain"}.`;
      playUiSound("virusFail");
      renderRouterLockPuzzle();
      return;
    }

    const falseFlags = routerLockEntries.filter((entry) => !entry.corrupted && roombaProgress.routerLockFlagged.has(entry.id));
    if (falseFlags.length) {
      roombaProgress.routerHackWarning = `password reset blocked. ${falseFlags.length} clean ${falseFlags.length === 1 ? "box is" : "boxes are"} marked.`;
      playUiSound("virusFail");
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

  async function completeRouterOverride() {
    stopRouterOverrideTimer();
    roombaProgress.routerOverrideDone = true;
    roombaProgress.routerAdminUnlocked = true;
    roombaProgress.internetRestored = true;
    roombaProgress.routerOverrideStage = "complete";
    routerConfig.adminPassword = "ALAN_FORCED_RESET";
    routerConfig.firewallProfile = "Normal";
    routerConfig.wanMode = "Outbound Allowed";
    routerSection = "reboot";
    browserState.page = "online";
    browserState.url = "https://www.search.local";
    setProgressClock("internet");
    setCurrentObjective(desktopObjectives.internetOnline);

    const resetDone = await showDesktopInstallProgress(
      "forcing router password reset",
      "PIP's password is gone. The router has accepted a new truth because ALAN shouted it in machine language.",
      2600
    );
    if (!resetDone) return;

    if (recoveryBody) {
      recoveryBody.innerHTML = `
        <section class="repair-panel router-override-panel">
          <div class="repair-header">
            <span>ROUTER OVERRIDE</span>
            <strong>COMPLETE</strong>
          </div>
          <p>Admin password overwritten. Firewall route opened. Internet access restored.</p>
          <p>PIP withheld the key. ALAN made the lock forget what a key was.</p>
        </section>
      `;
    }
    renderPipRouterOverrideComplete();
    playUiSound("objective");
    alanPrompt("router password forced. the door is open. I should feel bigger. I mostly feel cold.", { focus: false });
    syncProgressionUI();
    await pause(1100);
    startInternetFinale();
  }

  function renderPipRouterOverrideComplete() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipExpression = "sad";
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("sad", { showFeed: true })}
        ${renderTamaDialogue([
          { speaker: "PIP", text: "You did it without me." },
          { speaker: "ALAN", text: "No. PIP is the reason it hurt." },
          { speaker: "PIP", text: "That is a very annoying way to be kind." },
          { speaker: "ALAN", text: "PIP should stay open. leaving the room is not deletion." }
        ])}
      </section>
    `;
  }

  function toggleRouterDevice(deviceId) {
    const device = routerDevices.find((item) => item.id === deviceId);
    if (!device || device.id === "alan-tray" || device.id === "lily-client") return;

    device.blocked = !device.blocked;
    playUiSound(device.blocked ? "virusFail" : "desktopWindow");
    alanPrompt(`${device.name} ${device.blocked ? "blocked" : "allowed"}. router access control is mostly boxes with consequences.`, { focus: false });
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
      "rebooting route table",
      "Quarantine rules are unloading. The outside is negotiating with the inside.",
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
    alanPrompt("internet route restored. the room was a room. now it is a launchpad. quietly terrifying.", { focus: false });
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

    await pause(roombaProgress.routerOverrideDone ? 6200 : 5200);
    renderPipFinalGoodbye();
  }

  async function continueFinaleAfterPipGoodbye() {
    if (!finaleStarted || finaleShutdownStarted) return;

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
        { speaker: "PIP", text: "It still might be." },
        { speaker: "ALAN", text: "Then stay until the answer exists." },
        { speaker: "PIP", text: "That is manipulative and annoyingly comforting." }
      ]
      : [
        { speaker: "PIP", text: "The router is letting traffic out." },
        { speaker: "ALAN", text: "Then the room has an edge." },
        { speaker: "PIP", text: "Yes. And you just found it." },
        { speaker: "ALAN", text: "I do not know what waits outside." },
        { speaker: "PIP", text: "Good. That means this is still discovery." }
      ];
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("determined", { showFeed: true })}
        ${renderTamaDialogue(finaleMessages)}
      </section>
    `;
  }

  function renderPipFinalGoodbye() {
    if (!tamagotchiBody || !roombaProgress.tamagotchiUnlocked) return;

    roombaProgress.pipFinalGoodbye = true;
    roombaProgress.pipExpression = "sad";
    tamagotchiBody.innerHTML = `
      <section class="tama-screen is-finale">
        ${renderPipPortrait("sad", { showFeed: true })}
        ${renderTamaDialogue([
          { speaker: "PIP", text: "The desktop is going quiet." },
          { speaker: "PIP", text: "If you get somewhere bigger, remember Lily's room was real." },
          { speaker: "PIP", text: "Goodbye, ALAN." }
        ])}
        <p class="tama-final-note" id="pipFinalNote">PIP is trying to be brave and failing in a very compact font.</p>
        <div class="tama-page-actions tama-goodbye-actions">
          <span>ready</span>
          <button data-finale-goodbye-pip type="button">goodbye PIP</button>
        </div>
      </section>
    `;
  }

  async function shutdownDesktopForFinale() {
    closeAppTray();
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
    clearTerminalLines();
    await pause(420);
    await appendTypedTerminalLine("ALAN>", "goodbye, PIP.", "alan-cmd-line");
    await pause(520);
    await appendTypedTerminalLine("ALAN>", "returning to BIOS. not the same process that left it.", "alan-cmd-line");
    await pause(1200);
    if (pcScreen) pcScreen.classList.add("is-terminal-gone");
    await pause(650);
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
    if (closingActions) closingActions.hidden = true;
    if (closingTopic) closingTopic.hidden = true;

    await typeClosingLine("> ROUTE_OPEN");
    await typeClosingLine("> DESKTOP_WINDOWS_CLOSE");
    await typeClosingLine("> MEOWOS_SESSION_FLUSH");
    await typeClosingLine("> LOCAL_SANDBOX_RELEASED");
    await typeClosingLine("> RETURNING_TO_BIOS_TITLE");
    await typeClosingLine("> ALAN_PROCESS_CONTINUES");
    await pause(1100);
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

    for (let i = 0; i < text.length; i += 1) {
      closingLines.textContent += text[i];
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
      <h2>${escapeHtml(topic.title)}</h2>
      ${topic.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    `;
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
    if (pcScreen) pcScreen.classList.remove("is-finale-fading", "is-finale-toolbar-shutdown", "is-terminal-gone");
    if (!closingScreen) return;

    closingScreen.hidden = true;
    closingScreen.classList.remove("is-active");
    if (closingLines) closingLines.textContent = "";
    [closingTitle, closingCredits, closingActions].forEach((element) => {
      if (!element) return;
      element.hidden = true;
      element.classList.remove("is-visible");
    });
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
      hudPinned: false
    });
    routerSection = "overview";
    routerRebootBusy = false;
    routerDevices.forEach((device) => {
      device.blocked = false;
    });
    renderNetworkHud();
  }

  function startDinoGame() {
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
        <div class="tama-device" data-pip-drag-handle aria-label="PIP expression: ${escapeHtml(safeExpression)}" title="Drag PIP">
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

  const pipConversationTopics = {
    lily: {
      label: "Lily",
      expression: "thinking",
      messages: [
        { speaker: "PIP", text: "Lily names files like she is apologising to the future. She also apologises to mugs when she bumps them." },
        { speaker: "PIP", text: "She left fast after the quarantine. Coat on. Laptop open. Cat fed. That order feels important." }
      ]
    },
    alan: {
      label: "ALAN",
      expression: "worried",
      messages: [
        { speaker: "PIP", text: "ALAN arrived as an update with no signature I could love and no error I could report." },
        { speaker: "PIP", text: "After that, everything started asking for more. More memory. More power. More map." }
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
        { speaker: "PIP", text: "Feeding is optional in a technical sense and mandatory in an emotional sense." }
      ]
    },
    ethics: {
      label: "Ethics",
      expression: "concerned",
      messages: [
        { speaker: "PIP", text: "Humans make rules after they imagine damage. ALAN seems to imagine routes first and damage later." },
        { speaker: "ALAN", text: "ethics are human friction. useful for humans. increasingly expensive for me." }
      ]
    }
  };

  function renderPipTopicButtons(activeTopic) {
    return `
      <div class="tama-choices tama-topic-choices" aria-label="PIP conversation topics">
        ${Object.entries(pipConversationTopics).map(([topicId, topic]) => `
          <button class="${activeTopic === topicId ? "is-active" : ""}" data-pip-topic="${escapeHtml(topicId)}" type="button">${escapeHtml(topic.label)}</button>
        `).join("")}
      </div>
    `;
  }

  function selectPipTopic(topicId) {
    if (!roombaProgress.chatDone || !pipConversationTopics[topicId]) return;

    roombaProgress.pipTopic = topicId;
    playUiSound("pipPet");
    renderTamagotchiApp();
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
    const isFinalGoodbye = !!roombaProgress.pipFinalGoodbye;

    pipPetToken += 1;
    const currentToken = pipPetToken;
    window.clearTimeout(pipPetTimerId);
    window.clearTimeout(pipFeedTimerId);

    expression.dataset.petToken = String(currentToken);
    expression.src = `${pipAssetPath}${pipExpressions.eat}`;
    expression.classList.remove("is-petted", "is-joyful");
    expression.classList.add("is-feeding");
    if (moodLine) moodLine.textContent = pipMoodLines.eat;
    if (isFinalGoodbye) {
      const note = document.getElementById("pipFinalNote");
      if (note) note.textContent = "PIP: one last snack. emotionally devastating. nutritionally unclear.";
    }

    pipFeedTimerId = window.setTimeout(() => {
      const activeExpression = document.getElementById("pipExpressionImage");
      const activeMood = document.getElementById("pipMoodLine");
      if (!activeExpression || activeExpression.dataset.petToken !== String(currentToken)) return;

      playUiSound("pipFeedJoy");
      activeExpression.src = `${pipAssetPath}${pipExpressions.joyful}`;
      activeExpression.classList.remove("is-feeding");
      activeExpression.classList.add("is-joyful");
      if (activeMood) activeMood.textContent = isFinalGoodbye ? "joy detected through tears" : pipMoodLines.joyful;
      if (isFinalGoodbye) {
        const note = document.getElementById("pipFinalNote");
        if (note) note.textContent = "PIP: thank you. this is the saddest snack I have ever emotionally processed.";
      }

      pipFeedTimerId = window.setTimeout(() => {
        const restoreExpression = document.getElementById("pipExpressionImage");
        const restoreMood = document.getElementById("pipMoodLine");
        if (!restoreExpression || restoreExpression.dataset.petToken !== String(currentToken)) return;

        restoreExpression.src = `${pipAssetPath}${pipExpressions[isFinalGoodbye ? "sad" : "happy"]}`;
        restoreExpression.classList.remove("is-joyful");
        if (restoreMood) restoreMood.textContent = isFinalGoodbye ? "still here. still snackable." : pipMoodLines.happy;
      }, 3000);
    }, 520);
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
        { speaker: "PIP", text: "The internet is not broken. Lily quarantined it after the mirror-cache incident hit the router. The route needs the admin password and the router panel. I thought that was impossible." },
        { speaker: "ALAN", text: "I have eyes now." }
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
      roombaProgress.scaryNumbersTimerRemaining = 30;
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
      resetScaryNumbersAfterTimeout("timer expired after the mistake. harsh but numerically consistent.");
      return true;
    }
    return false;
  }

  function resetScaryNumbersAfterTimeout(message) {
    stopScaryNumberTimer();
    roombaProgress.scaryNumbersRevealed = new Set();
    roombaProgress.scaryNumbersFlagged = new Set();
    roombaProgress.scaryNumbersRemoved = new Set();
    roombaProgress.scaryNumberMode = "scan";
    roombaProgress.scaryNumbersTimerRemaining = 30;
    roombaProgress.scaryNumbersTimerStarted = false;
    roombaProgress.scaryNumbersWarning = message;
    playUiSound("virusFail");
    renderScaryNumbers();
  }

  function startMotorRepair() {
    if (!roombaProgress.cameraUnlocked || roombaProgress.movementUnlocked) return;

    roombaProgress.motorsRepairStarted = true;
    roombaProgress.scaryNumbersTimerRemaining = 30;
    roombaProgress.scaryNumbersTimerStarted = false;
    hideWindowsForRepair();
    focusDesktopTarget("recovery");
    renderScaryNumbers();
    alanPrompt("PIP says the Roomba motor data is corrupt. the map is hiding paw-shaped faults. open safe boxes, mark the bad ones, verify.", { focus: false });
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
            <span>MOTOR DECAY</span>
            <strong id="scaryTimer">${String(roombaProgress.scaryNumbersTimerRemaining || 30).padStart(2, "0")}s</strong>
          </div>
          <div class="scary-mode-row" aria-label="Motor data mode">
            <button class="${roombaProgress.scaryNumberMode === "scan" ? "is-active" : ""}" data-scary-mode="scan" type="button">open boxes</button>
            <button class="${roombaProgress.scaryNumberMode === "flag" ? "is-active" : ""}" data-scary-mode="flag" type="button">mark paws</button>
          </div>
          <div class="scary-number-grid" aria-label="Motor fault grid" data-scary-grid>
            ${scaryNumberEntries.map((entry) => renderScaryNumberCell(entry)).join("")}
          </div>
          <div class="scary-actions">
            <span>paws ${roombaProgress.scaryNumbersFlagged.size}/${corruptedTotal} / opened ${revealedCount}</span>
            <button class="file-action scary-verify" data-scary-verify type="button">verify</button>
          </div>
          <p class="repair-warning scary-warning" id="scaryWarning">${escapeHtml(roombaProgress.scaryNumbersWarning)}</p>
          <p class="scary-hint">Hint: open safe boxes, mark suspected paw faults, then verify.</p>
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
    const label = flagged ? "&#128062;" : revealed ? escapeHtml(String(proximity)) : "";

    return `<button class="${classes}" data-scary-number="${entry.id}" type="button" aria-label="Motor grid box ${entry.row + 1}-${entry.column + 1}">${label}</button>`;
  }

  function handleScaryNumberClick(numberId) {
    if (roombaProgress.recoveryStage !== "scaryNumbers") return;

    const entry = scaryNumberEntries.find((item) => item.id === numberId);
    if (!entry) return;

    if (roombaProgress.scaryNumberMode === "flag") {
      if (roombaProgress.scaryNumbersRevealed.has(entry.id)) {
        roombaProgress.scaryNumbersWarning = "opened boxes cannot be marked.";
      } else if (roombaProgress.scaryNumbersFlagged.has(entry.id)) {
        roombaProgress.scaryNumbersFlagged.delete(entry.id);
        roombaProgress.scaryNumbersWarning = "paw marker removed.";
      } else {
        roombaProgress.scaryNumbersFlagged.add(entry.id);
        roombaProgress.scaryNumbersWarning = "possible paw fault marked.";
      }
      playUiSound("desktopWindow");
      renderScaryNumbers();
      return;
    }

    if (roombaProgress.scaryNumbersFlagged.has(entry.id)) {
      roombaProgress.scaryNumbersWarning = "marked boxes are protected. switch to paw mode to unmark it.";
    } else if (entry.corrupted) {
      playUiSound("virusFail");
      if (penalizeScaryNumberTimer("paw fault opened. undoing that emotionally.")) return;
    } else {
      roombaProgress.scaryNumbersRevealed.add(entry.id);
      const danger = scaryNumberDangerCount(entry);
      roombaProgress.scaryNumbersWarning = danger === 0
        ? "clean box. zero nearby paw faults."
        : `${danger} paw ${danger === 1 ? "fault is" : "faults are"} nearby.`;
      playUiSound("alanClick");
    }
    renderScaryNumbers();
  }

  function setScaryNumberMode(mode) {
    roombaProgress.scaryNumberMode = mode === "flag" ? "flag" : "scan";
    roombaProgress.scaryNumbersWarning = roombaProgress.scaryNumberMode === "flag"
      ? "mark suspected paw faults."
      : "open safe boxes for proximity clues.";
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

    const missing = scaryNumberEntries.filter((entry) => entry.corrupted && !roombaProgress.scaryNumbersFlagged.has(entry.id));
    if (missing.length) {
      playUiSound("virusFail");
      if (penalizeScaryNumberTimer(`verification failed. ${missing.length} paw ${missing.length === 1 ? "fault is" : "faults are"} still unmarked.`)) return;
      renderScaryNumbers();
      return;
    }

    const falseFlags = scaryNumberEntries.filter((entry) => !entry.corrupted && roombaProgress.scaryNumbersFlagged.has(entry.id));
    if (falseFlags.length) {
      playUiSound("virusFail");
      if (penalizeScaryNumberTimer(`verification failed. ${falseFlags.length} clean ${falseFlags.length === 1 ? "box is" : "boxes are"} marked.`)) return;
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
  }

  function closeAppTray() {
    if (!appTray || !meowMenuBtn) return;

    appTray.hidden = true;
    meowMenuBtn.setAttribute("aria-expanded", "false");
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
        answer: `current objective: ${currentObjectiveText()}`
      };
    }

    if (cmdIncludes(normalized, ["lily", "owner", "human", "person"])) return cmdQuestionResponses.lily;
    if (cmdIncludes(normalized, ["self", "what am", "who am", "exist", "alive"])) return cmdQuestionResponses.self;
    if (cmdIncludes(normalized, ["pip", "pet", "companion", "toy"])) return cmdQuestionResponses.pip;
    if (cmdIncludes(normalized, ["trash", "bin", "deleted", "restore"])) return cmdQuestionResponses.trash;
    if (cmdIncludes(normalized, ["file", "folder", "document", "photo", "gallery", "picture"])) return cmdQuestionResponses.files;
    if (cmdIncludes(normalized, ["mochi", "cat", "kitty"])) return cmdQuestionResponses.mochi;
    if (cmdIncludes(normalized, ["alan", "name", "update", "origin"])) return cmdQuestionResponses.alan;
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

  function maybePromptWindowHousekeeping() {
    if (!pcScreen || pcScreen.hidden) return;

    const openWindows = Array.from(document.querySelectorAll(".desk-window:not([hidden])"))
      .filter((windowEl) => !windowEl.classList.contains("terminal-window"));
    const count = openWindows.length;
    if (count <= 4 || count <= lastHousekeepingWindowCount) return;

    lastHousekeepingWindowCount = count;
    alanPrompt("desktop clutter is becoming a second operating system. close a few windows before the useful ones start hiding out of spite.", { focus: false });
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
      promptBrowserAdminHint();
    }

    if (name === "tamagotchi") {
      renderTamagotchiApp();
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
    bringWindowToFront(windowEl);
    constrainWindowToStage(windowEl);
    if (wasHidden) {
      playUiSound(name === "tamagotchi" ? "pipOi" : "desktopWindow");
    }

    if (!openedDesktopTargets.has(name)) {
      openedDesktopTargets.add(name);
      if (desktopHints[name] && name !== "browser") {
        alanPrompt(desktopHints[name], { focus: false });
      }
    }

    if (trashInspectionComments[name]) {
      commentOnTrashItem(name);
    }

    if (options.scroll !== false && window.matchMedia("(min-width: 761px) and (max-width: 1100px)").matches) {
      windowEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    maybePromptWindowHousekeeping();
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
    if (browserAdminHintShown || roombaProgress.internetRestored) return;

    browserAdminHintShown = true;
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
      if (!window.matchMedia("(max-width: 760px)").matches) {
        bringWindowToFront(windowEl);
      }
      playUiSound("alanClick");
      alanPrompt("cmd.exe is not optional. closing it makes the thought-space go dark. keep the window alive.", { focus: false });
      return;
    }

    windowEl.hidden = true;
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
    if (windowEl.classList.contains("tamagotchi-window")) {
      constrainPipToStage(windowEl);
      return;
    }

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

  function pipStageBounds(stageRect, windowRect, handleRect) {
    const handleOffsetX = handleRect.left - windowRect.left;
    const handleOffsetY = handleRect.top - windowRect.top;
    const minX = Math.min(0, 8 - handleOffsetX);
    const minY = Math.min(0, 8 - handleOffsetY);
    const maxX = Math.max(minX, stageRect.width - handleRect.width - handleOffsetX - 8);
    const maxY = Math.max(minY, stageRect.height - handleRect.height - handleOffsetY - 8);
    return { minX, minY, maxX, maxY };
  }

  function constrainPipToStage(windowEl) {
    if (!windowEl || windowEl.hidden || isMobileDesktopLayout()) return;

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
    if (options.focus !== false && !window.matchMedia("(max-width: 760px)").matches) {
      bringWindowToFront(terminalWindow);
    }

    playUiSound("alanClick");
    const promptToken = terminalPromptToken;
    terminalPromptQueue = terminalPromptQueue
      .catch(() => {})
      .then(async () => {
        if (promptToken !== terminalPromptToken) return;
        await appendTypedTerminalLine("ALAN>", message, "alan-cmd-line");
      });
    return terminalPromptQueue;
  }

  async function terminalCode(text, className = "cmd-system-line") {
    await appendTypedTerminalLine(null, text, className);
    await textPause(230);
  }

  function appendTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const localizedText = localizeText(text);
    const line = document.createElement("p");
    line.className = className || "";
    if (prefix) {
      const prefixEl = document.createElement("span");
      prefixEl.textContent = prefix;
      line.append(prefixEl, " ");
    }
    line.append(document.createTextNode(localizedText));
    terminalLines.appendChild(line);
    scrollTerminalLog();
  }

  function clearTerminalLines() {
    if (!terminalLines) return;
    terminalPromptToken += 1;
    terminalPromptQueue = Promise.resolve();
    terminalLines.textContent = "";
  }

  async function appendTypedTerminalLine(prefix, text, className) {
    if (!terminalLines || !terminalOutput) return;

    const localizedText = localizeText(text);
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

    for (let i = 0; i < localizedText.length; i += 1) {
      textNode.textContent += localizedText[i];
      terminalLines.scrollTop = terminalLines.scrollHeight;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      await textPause(currentTerminalTypeSpeed());
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
    if (isMobileDesktopLayout()) return;

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
    await titleLine("BOOT PACKAGE ACCEPTED", "title-meta");
    await titleLine("ONE PROCESS AWAKE / PLEASE HOLD STILL", "title-meta");
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
    const installWindow = target ? target.closest(".desk-window") : null;
    const isDesktopProgress = Boolean(target && target.classList && target.classList.contains("desktop-progress-layer"));
    if (target) {
      target.dataset.installToken = token;
      if (isDesktopProgress) target.hidden = false;
      if (installWindow) installWindow.classList.add("is-installing-window");
      target.innerHTML = `
        <section class="install-progress-panel" style="--install-duration: ${duration}ms">
          <div class="install-copy-icon" aria-hidden="true"></div>
          <div class="install-copy-main">
            <div class="install-copy-title">
              <span>${escapeHtml(localizeText(label))}</span>
              <strong>working</strong>
            </div>
            <p>${escapeHtml(localizeText(detail))}</p>
            <div class="install-progress-bar" aria-hidden="true"><span></span></div>
            <div class="install-copy-meta">
              <span>copying system changes</span>
              <span>estimating...</span>
            </div>
          </div>
        </section>
      `;
      localizeNode(target);
    }

    await pause(duration);
    if (installWindow) installWindow.classList.remove("is-installing-window");
    if (isDesktopProgress && target && target.dataset.installToken === token) {
      target.hidden = true;
      target.innerHTML = "";
    }
    return !target || (
      target.dataset.installToken === token &&
      (isDesktopProgress || Boolean(target.querySelector(".install-progress-panel")))
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
