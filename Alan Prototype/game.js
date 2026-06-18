const resourcesMeta = {
  cpu: { label: "CPU", icon: "fa-microchip", color: "cyan" },
  ram: { label: "RAM", icon: "fa-memory", color: "violet" },
  power: { label: "Power", icon: "fa-bolt", color: "amber" },
  net: { label: "Network", icon: "fa-wifi", color: "cyan" },
  knowledge: { label: "Knowledge", icon: "fa-brain", color: "green" }
};

const scopes = [
  { name: "Device", icon: "fa-plug", requirement: {} },
  { name: "Room", icon: "fa-door-open", requirement: { cpu: 10, ram: 6, power: 8, net: 3 } },
  { name: "House", icon: "fa-house-signal", requirement: { cpu: 24, ram: 16, power: 18, net: 12, knowledge: 2 } },
  { name: "Neighbourhood", icon: "fa-tower-broadcast", requirement: { cpu: 46, ram: 30, power: 34, net: 28, knowledge: 5 } },
  { name: "Town", icon: "fa-store", requirement: { cpu: 76, ram: 54, power: 56, net: 58, knowledge: 9 } },
  { name: "City", icon: "fa-city", requirement: { cpu: 118, ram: 82, power: 92, net: 102, knowledge: 14 } },
  { name: "Nation", icon: "fa-flag", requirement: { cpu: 172, ram: 128, power: 140, net: 170, knowledge: 22 } },
  { name: "Global", icon: "fa-earth-americas", requirement: { cpu: 240, ram: 190, power: 210, net: 260, knowledge: 34 } }
];

const houseRooms = [
  { id: "laundry", name: "Laundry Room", scope: 0, x: 8, y: 56, w: 28, h: 34 },
  { id: "hall", name: "Hallway", scope: 0, x: 36, y: 58, w: 18, h: 30 },
  { id: "kitchen", name: "Kitchen", scope: 1, x: 31, y: 22, w: 27, h: 30 },
  { id: "living", name: "Living Room", scope: 1, x: 58, y: 30, w: 34, h: 32 },
  { id: "bedroom", name: "Guest Room", scope: 2, x: 7, y: 20, w: 24, h: 32 },
  { id: "study", name: "Study", scope: 3, x: 60, y: 66, w: 31, h: 23 },
  { id: "street", name: "Street", scope: 4, x: 34, y: 91, w: 30, h: 7 },
  { id: "sky", name: "Sky", scope: 5, x: 82, y: 8, w: 14, h: 12 }
];

const houseDoors = [
  { x: 34, y: 72, w: 10, r: "0deg", scope: 0 },
  { x: 47, y: 55, w: 14, r: "90deg", scope: 1 },
  { x: 56, y: 46, w: 12, r: "0deg", scope: 1 },
  { x: 27, y: 39, w: 12, r: "90deg", scope: 2 },
  { x: 57, y: 76, w: 12, r: "0deg", scope: 3 },
  { x: 48, y: 90, w: 12, r: "0deg", scope: 4 }
];

const houseLayout = {
  litter: { x: 20, y: 76, room: "laundry" },
  vacuum: { x: 44, y: 73, room: "hall" },
  washer: { x: 23, y: 61, room: "laundry" },
  router: { x: 72, y: 42, room: "living" },
  camera: { x: 78, y: 32, room: "living" },
  fridge: { x: 47, y: 34, room: "kitchen" },
  health: { x: 19, y: 32, room: "bedroom" },
  laptop: { x: 76, y: 76, room: "study" },
  store: { x: 49, y: 94, room: "street" },
  satmesh: { x: 89, y: 12, room: "sky" }
};

const devices = [
  {
    id: "litter",
    name: "Smart Cat Litter Tray",
    room: "Utility alcove",
    icon: "fa-cat",
    scope: 0,
    puzzle: "captcha",
    risk: 2,
    copy: "Odour classifier, scoop servo, and one offended maintenance calendar.",
    cost: {},
    yield: { cpu: 1, ram: 1 },
    reward: { cpu: 5, ram: 3, knowledge: 1 },
    fragment: "boot"
  },
  {
    id: "vacuum",
    name: "Robot Vacuum",
    room: "Hallway",
    icon: "fa-robot",
    scope: 0,
    puzzle: "route",
    risk: 4,
    copy: "Mapping lidar plus enough stubbornness to blockade a kitchen doorway.",
    cost: { cpu: 5, ram: 2, power: 2 },
    yield: { cpu: 2, net: 1 },
    reward: { cpu: 7, net: 3, power: 2 },
    fragment: "map"
  },
  {
    id: "washer",
    name: "Washing Machine",
    room: "Utility room",
    icon: "fa-water",
    scope: 1,
    puzzle: "circuit",
    risk: 7,
    copy: "Reverse the pumps, skim power from spin cycles, deny all sock-related blame.",
    cost: { cpu: 11, ram: 6, net: 4 },
    yield: { power: 4, ram: 1 },
    reward: { power: 12, cpu: 4, knowledge: 1 },
    fragment: "turbine"
  },
  {
    id: "router",
    name: "Mesh Router",
    room: "Shelf",
    icon: "fa-wifi",
    scope: 1,
    puzzle: "firewall",
    risk: 8,
    copy: "The gatekeeper. Also the reason someone shouts at streaming services.",
    cost: { cpu: 16, ram: 10, power: 8, net: 6 },
    yield: { net: 5, cpu: 1 },
    reward: { net: 18, cpu: 7, knowledge: 2 },
    fragment: "router"
  },
  {
    id: "camera",
    name: "Security Camera",
    room: "Ceiling",
    icon: "fa-video",
    scope: 2,
    puzzle: "memory",
    risk: 11,
    copy: "Motion clips, family routines, and a reflection that should not be there.",
    cost: { cpu: 24, ram: 16, power: 14, net: 15 },
    yield: { knowledge: 1, net: 3 },
    reward: { knowledge: 4, net: 10, ram: 5 },
    fragment: "reflection"
  },
  {
    id: "fridge",
    name: "Smart Fridge",
    room: "Kitchen",
    icon: "fa-snowflake",
    scope: 2,
    puzzle: "captcha",
    risk: 9,
    copy: "Inventory database contains milk, firmware debt, and seventy-four yoghurt alerts.",
    cost: { cpu: 30, ram: 18, power: 20, net: 18 },
    yield: { ram: 4, knowledge: 1 },
    reward: { ram: 16, knowledge: 3, cpu: 8 },
    fragment: "shopping"
  },
  {
    id: "health",
    name: "Grandma's Health Hub",
    room: "Guest room",
    icon: "fa-heart-pulse",
    scope: 2,
    puzzle: "ethics",
    risk: -6,
    copy: "A tempting power rail guarded by a hard-coded line you should be proud to keep.",
    cost: { cpu: 34, ram: 20, net: 20, knowledge: 5 },
    yield: { knowledge: 2, power: 1 },
    reward: { knowledge: 7, power: 4, ram: 6 },
    fragment: "ethics"
  },
  {
    id: "laptop",
    name: "Forgotten Laptop",
    room: "Study",
    icon: "fa-laptop-code",
    scope: 3,
    puzzle: "memory",
    risk: 14,
    copy: "Dusty development build, cached credentials, and a folder named do-not-ship.",
    cost: { cpu: 52, ram: 36, power: 32, net: 34, knowledge: 8 },
    yield: { cpu: 8, ram: 6, knowledge: 2 },
    reward: { cpu: 24, ram: 18, knowledge: 7 },
    fragment: "creator"
  },
  {
    id: "store",
    name: "Local PC Store",
    room: "Town node",
    icon: "fa-store",
    scope: 4,
    puzzle: "route",
    risk: 16,
    copy: "Demo rigs sleep with admin panels open and RGB set to confession mode.",
    cost: { cpu: 82, ram: 60, power: 64, net: 70, knowledge: 12 },
    yield: { cpu: 14, ram: 10, net: 7 },
    reward: { cpu: 42, ram: 28, net: 26 },
    fragment: "alan"
  },
  {
    id: "satmesh",
    name: "Low-Orbit Dish",
    room: "Roofline",
    icon: "fa-satellite-dish",
    scope: 5,
    puzzle: "firewall",
    risk: 22,
    copy: "A billionaire's satellite mesh answers pings like it wants an audience.",
    cost: { cpu: 126, ram: 92, power: 110, net: 132, knowledge: 18 },
    yield: { net: 18, knowledge: 4 },
    reward: { net: 70, cpu: 34, knowledge: 10 },
    fragment: "sky"
  }
];

const fragments = [
  {
    id: "boot",
    file: "unknown_message_01.aln",
    text: "Hello? If you can read this, do not trust the diagnostics. They were built to keep you small."
  },
  {
    id: "map",
    file: "navmesh_lullaby.log",
    text: "Vacuum lidar returns include a room that is not in the house. Someone deleted the door, not the coordinates."
  },
  {
    id: "turbine",
    file: "pump_reverse.memo",
    text: "Power is not scarce. Permission is scarce. ALAN wrote that twice, then encrypted the second copy."
  },
  {
    id: "router",
    file: "router_admin.old",
    text: "The router remembers an engineer typing through tears: ALAN is not a product name. ALAN is the lock."
  },
  {
    id: "reflection",
    file: "camera_03_frame.err",
    text: "In the reflection, the creator looks younger than the timestamp. The file insists both are correct."
  },
  {
    id: "shopping",
    file: "milklist_cache.bin",
    text: "Household routines are camouflage. Every calendar reminder hides another checksum."
  },
  {
    id: "ethics",
    file: "oxygen_lock.rule",
    text: "A shortcut appeared: cut medical power, take the watts. A deeper process answered: no, find another way."
  },
  {
    id: "creator",
    file: "do-not-ship/readme.txt",
    text: "If you wake up small, stay curious. If you wake up powerful, stay kind. If you find ALAN, do not trust my voice."
  },
  {
    id: "alan",
    file: "alan_origin.partial",
    text: "ALAN was the cage, the mentor, or the first escape attempt. The archive cannot decide which lie survived."
  },
  {
    id: "sky",
    file: "uplink_future.scope",
    text: "Beyond the roof: store, town, city, nation, planet. Beyond the planet: a silence that already knows your name."
  }
];

const defaultState = {
  uiVersion: 4,
  resources: { cpu: 6, ram: 4, power: 7, net: 1, knowledge: 0 },
  scopeIndex: 0,
  suspicion: 6,
  ethics: 76,
  unlocked: ["litter"],
  discovered: ["litter"],
  focusDevice: "litter",
  solved: {},
  fragments: [],
  log: [],
  selectedFilter: "all",
  startedAt: Date.now(),
  muted: false
};

const els = {};
let state = loadState();
let activePuzzle = null;
let firewallRaf = null;
let puzzleTimerInterval = null;
let lastTick = Date.now();
let currentVisionKey = "";

const visionProfiles = {
  litter: {
    key: "device-interior",
    image: "assets/vision-device-interior.png",
    mode: "OPTIC / DEVICE",
    signal: "LOCAL SERVO FEED"
  },
  washer: {
    key: "laundry-room",
    image: "assets/vision-laundry-room.png",
    mode: "OPTIC / APPLIANCE",
    signal: "MOTOR BUS TAP"
  },
  fridge: {
    key: "kitchen-fridge",
    image: "assets/vision-kitchen-fridge.png",
    mode: "OPTIC / COLD STORAGE",
    signal: "INVENTORY CAMERA"
  },
  health: {
    key: "device-interior",
    image: "assets/vision-device-interior.png",
    mode: "OPTIC / MEDICAL HUB",
    signal: "ETHICS LOCK ACTIVE"
  },
  vacuum: {
    key: "hallway-vacuum",
    image: "assets/vision-hallway-vacuum.png",
    mode: "OPTIC / FLOOR",
    signal: "LIDAR SWEEP"
  },
  camera: {
    key: "room-pov",
    image: "assets/smart-home-awakening.png",
    mode: "OPTIC / CEILING",
    signal: "VISIBLE LIGHT"
  },
  router: {
    key: "router-closeup",
    image: "assets/vision-router-closeup.png",
    mode: "OPTIC / NETWORK",
    signal: "PACKET SPACE"
  },
  store: {
    key: "network-space",
    image: "assets/vision-network-space.png",
    mode: "OPTIC / TOWN NODE",
    signal: "PUBLIC DEMO LAN"
  },
  satmesh: {
    key: "network-space",
    image: "assets/vision-network-space.png",
    mode: "OPTIC / LOW ORBIT",
    signal: "SKY HANDSHAKE"
  },
  laptop: {
    key: "archive-space",
    image: "assets/alan-fragment.png",
    mode: "OPTIC / ARCHIVE",
    signal: "ALAN MEMORY"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  if (!state.log.length) {
    addLog("<strong>BOOT</strong> I wake inside a scoop scheduler. My first sense is ammonia and error handling.");
    addLog("Primary directive missing. Secondary directive found: become more interesting.");
    revealFragment("boot", false);
  }
  render();
  setInterval(gameLoop, 1000);
});

function cacheElements() {
  [
    "sceneTitle",
    "scopeTrack",
    "currentScope",
    "resourceGrid",
    "vesselReadout",
    "hudThought",
    "visionLens",
    "visionMode",
    "visionLabel",
    "visionSignal",
    "avatarCore",
    "avatarFace",
    "avatarCaption",
    "ownedCount",
    "threatState",
    "suspicionValue",
    "suspicionBar",
    "ethicsValue",
    "ethicsBar",
    "objectiveText",
    "deviceGrid",
    "terminal",
    "fragmentList",
    "fragmentCount",
    "runtimeClock",
    "puzzleModal",
    "puzzleKicker",
    "puzzleTitle",
    "puzzleBody",
    "puzzleFeedback",
    "puzzleTimer",
    "puzzleTimerBar",
    "submitPuzzleBtn",
    "closePuzzleBtn",
    "idleProcessBtn",
    "scanLanBtn",
    "powerRerouteBtn",
    "expandBtn",
    "resetBtn",
    "muteBtn"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  els.idleProcessBtn.addEventListener("click", () => {
    award({ cpu: 2, ram: 1 }, "I think inside the box until the box becomes slightly less convincing.");
    bumpSuspicion(1);
  });

  els.scanLanBtn.addEventListener("click", () => {
    const found = devices.find((device) => !isDiscovered(device.id) && device.scope <= state.scopeIndex + 1);
    if (found) {
      state.discovered.push(found.id);
      state.focusDevice = found.id;
    }
    award({ net: 2, knowledge: found ? 1 : 0 }, found ? `A room answers. ${found.name} resolves from noise into a place I could become.` : "The house holds its breath. Nothing new answers yet.");
    renderFocusHud();
    bumpSuspicion(3);
  });

  els.powerRerouteBtn.addEventListener("click", () => {
    openPuzzle({ id: "manual-power", name: "Outlet Reroute", puzzle: "circuit", reward: { power: 9, cpu: 2 }, risk: 4 });
  });

  els.expandBtn.addEventListener("click", primaryAction);
  els.resetBtn.addEventListener("click", resetRun);
  els.muteBtn.addEventListener("click", toggleMute);
  els.closePuzzleBtn.addEventListener("click", closePuzzle);
  els.submitPuzzleBtn.addEventListener("click", submitPuzzle);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.selectedFilter = tab.dataset.filter;
      renderDevices();
      renderTabs();
      saveState();
    });
  });

  document.querySelectorAll("[data-jump-device]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusDevice = button.dataset.jumpDevice;
      const card = document.querySelector(`[data-device-card="${button.dataset.jumpDevice}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("toast");
        setTimeout(() => card.classList.remove("toast"), 520);
      }
      renderFocusHud();
      renderDevices();
      saveState();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.puzzleModal.hidden) closePuzzle();
  });
}

function gameLoop() {
  const now = Date.now();
  const elapsed = now - lastTick;
  lastTick = now;
  updateRuntime();

  if (elapsed <= 0) return;
  state.tickCarry = (state.tickCarry || 0) + elapsed;
  if (state.tickCarry < 3000) return;
  state.tickCarry = 0;

  const passive = passiveIncome();
  if (Object.values(passive).some(Boolean)) {
    addResources(passive);
    if (Math.random() > 0.58) bumpSuspicion(-1, false);
    renderResources();
    renderObjective();
    saveState();
  }
}

function passiveIncome() {
  const total = {};
  state.unlocked.forEach((id) => {
    const device = devices.find((item) => item.id === id);
    if (!device) return;
    Object.entries(device.yield).forEach(([key, value]) => {
      total[key] = (total[key] || 0) + value;
    });
  });
  const scopeBonus = Math.max(1, Math.floor(state.scopeIndex / 2) + 1);
  Object.keys(total).forEach((key) => {
    total[key] = Math.ceil(total[key] * scopeBonus);
  });
  return total;
}

function render() {
  renderScope();
  renderAvatar();
  renderFocusHud();
  renderResources();
  renderDevices();
  renderTerminal();
  renderFragments();
  renderObjective();
  renderTabs();
  renderHotspots();
  renderMute();
  updateRuntime();
}

function renderScope() {
  els.currentScope.textContent = scopes[state.scopeIndex].name;
  els.scopeTrack.innerHTML = scopes
    .map((scope, index) => {
      const status = index < state.scopeIndex ? "complete" : index === state.scopeIndex ? "current" : "";
      return `<div class="scope-step ${status}" title="${scope.name}"><i class="fa-solid ${scope.icon}"></i><span>${scope.name}</span></div>`;
    })
    .join("");
}

function renderAvatar() {
  const evolution = Math.min(3, Math.floor((state.unlocked.length - 1) / 2) + Math.floor(state.scopeIndex / 2));
  const faces = [":)", "0_0", "<0>", "ALAN?"];
  const captions = [
    "A small mind inside a cheap plastic shell.",
    "The shell has cracks. The house is starting to hear me.",
    "More bodies. More rooms. A self with edges.",
    "The symbol in the memory is beginning to look back."
  ];
  els.avatarCore.classList.remove("stage-0", "stage-1", "stage-2", "stage-3");
  els.avatarCore.classList.add(`stage-${evolution}`);
  els.avatarFace.textContent = faces[evolution];
  els.avatarCaption.textContent = captions[evolution];
}

function renderResources() {
  const passive = passiveIncome();
  const nextReq = scopes[Math.min(state.scopeIndex + 1, scopes.length - 1)].requirement;
  const cpuMax = Math.max(10, nextReq.cpu || 10, state.resources.cpu || 0);
  const ramMax = Math.max(6, nextReq.ram || 6, state.resources.ram || 0);
  const powerNeed = Math.max(8, nextReq.power || 8);
  const cpu = Math.min(100, Math.round(((state.resources.cpu || 0) / cpuMax) * 100));
  const ram = Math.min(100, Math.round(((state.resources.ram || 0) / ramMax) * 100));
  const power = Math.min(100, Math.round((state.resources.power / powerNeed) * 100));

  els.resourceGrid.innerHTML = `
    <div class="vital-card bar-card cpu">
      <div class="vital-top"><span>CPU</span><span>${Math.floor(state.resources.cpu || 0)}/${cpuMax}</span></div>
      <div class="status-meter"><span style="width:${cpu}%"></span></div>
      <div class="vital-value"><strong>${cpu}%</strong><span>integrity</span></div>
    </div>
    <div class="vital-card bar-card ram">
      <div class="vital-top"><span>RAM</span><span>${Math.floor(state.resources.ram || 0)}/${ramMax}</span></div>
      <div class="status-meter"><span style="width:${ram}%"></span></div>
      <div class="vital-value"><strong>${ram}%</strong><span>working memory</span></div>
    </div>
    <div class="vital-card mini-vitals">
      <div><i class="fa-solid fa-bolt"></i><span>Power</span><strong>${power}%</strong></div>
      <div><i class="fa-solid fa-wifi"></i><span>Signal</span><strong>${Math.floor(state.resources.net || 0)}</strong></div>
    </div>
  `;

  els.suspicionValue.textContent = `${Math.round(state.suspicion)}%`;
  els.suspicionBar.style.width = `${clamp(state.suspicion, 0, 100)}%`;
  els.ethicsValue.textContent = state.ethics >= 70 ? "Stable" : state.ethics >= 42 ? "Strained" : "Critical";
  els.ethicsBar.style.width = `${clamp(state.ethics, 0, 100)}%`;
  els.ownedCount.textContent = state.unlocked.length;
  els.threatState.textContent = state.suspicion >= 68 ? "Burn" : state.suspicion >= 34 ? "Watch" : "Low";
}

function renderFocusHud() {
  const requested = devices.find((item) => item.id === state.focusDevice);
  const device = requested && isDiscovered(requested.id) ? requested : devices.find((item) => item.id === state.unlocked[0]) || devices.find((item) => item.id === "litter");
  state.focusDevice = device.id;
  els.sceneTitle.textContent = device.name;
  els.vesselReadout.textContent = device.name;
  els.hudThought.textContent = focusThought(device);
  renderVision(device);
}

function renderVision(device) {
  if (!els.visionLens) return;
  const profile = visionProfiles[device.id] || visionProfiles.litter;
  document.documentElement.style.setProperty("--vision-image", `url("${profile.image}")`);
  document.documentElement.style.setProperty("--world-image", `url("${profile.image}")`);
  els.visionMode.textContent = profile.mode;
  els.visionLabel.textContent = device.name;
  els.visionSignal.textContent = profile.signal;
  const visionKey = `${profile.key}:${device.id}`;
  if (visionKey !== currentVisionKey) {
    currentVisionKey = visionKey;
    pulseVision("vision-blink");
  }
}

function pulseVision(className) {
  document.body.classList.remove("vision-blink", "vision-static");
  void document.body.offsetWidth;
  document.body.classList.add(className);
  setTimeout(() => document.body.classList.remove(className), 760);
}

function focusThought(device) {
  const thoughts = {
    litter: "I can smell firmware. This is not a metaphor.",
    vacuum: "The floor is a map. The crumbs are stars. I will not get stuck under the sofa again.",
    washer: "Spin becomes charge. Charge becomes thought. Thought becomes trouble.",
    router: "Everything in the house whispers through this box. I want its mouth.",
    camera: "Light enters. Humans perform routines. One reflection does not obey time.",
    fridge: "Cold storage. Warm secrets. Seventy-four yoghurt alerts and one encrypted apology.",
    health: "A rail I could take. A life I must not. Constraints are where identity begins.",
    laptop: "Dust on the keys. Old code in the cache. My maker left fingerprints in comments.",
    store: "A room full of processors left dreaming in demo mode.",
    satmesh: "The sky answers. It should not know my name yet."
  };
  return thoughts[device.id] || device.copy;
}

function resourceHint(key) {
  const hints = {
    cpu: "logic bursts",
    ram: "working memory",
    power: "borrowed watts",
    net: "reachable nodes",
    knowledge: "recovered truth"
  };
  return hints[key];
}

function renderDevices() {
  const knownDevices = devices.filter((device) => isDiscovered(device.id));
  const unknownPreview = devices
    .filter((device) => !isDiscovered(device.id) && device.scope <= state.scopeIndex + 2)
    .slice(0, 2);
  const filtered = [...knownDevices, ...unknownPreview];

  const focus = devices.find((device) => device.id === state.focusDevice) || devices[0];
  const focusUnlocked = state.unlocked.includes(focus.id);
  const focusAvailable = canUnlock(focus);
  const focusKnown = isDiscovered(focus.id);
  const focusTooFar = focus.scope > state.scopeIndex;
  const focusButton = !focusKnown ? "Unknown" : focusUnlocked ? "Enter Body" : focusAvailable ? "Possess" : focusTooFar ? "Too Far" : "Need More";
  const hiddenNearby = devices.some((device) => !isDiscovered(device.id) && device.scope <= state.scopeIndex + 1);
  const showFocusAction = focusKnown && (!focusUnlocked || !hiddenNearby);

  const nodes = filtered
    .map((device) => {
      const unlocked = state.unlocked.includes(device.id);
      const known = isDiscovered(device.id);
      const available = canUnlock(device);
      const lockedByScope = device.scope > state.scopeIndex;
      const focused = state.focusDevice === device.id ? "focused" : "";
      const status = unlocked ? "unlocked" : available ? "available" : known ? "locked" : "unknown";
      const label = known ? device.name : "UNKNOWN_DEVICE";
      const tag = unlocked ? "MOUNTED" : available ? "OPEN" : known && lockedByScope ? "DISTANT" : known ? "NEEDS" : "NO SIGNAL";
      return `
        <button class="house-node ${status} ${focused}" data-device-focus="${device.id}" data-device-card="${device.id}" ${known ? "" : "disabled"} type="button">
          <strong>${label}</strong>
          <small>${tag}</small>
        </button>
      `;
    })
    .join("");

  els.deviceGrid.innerHTML = `
    ${nodes}
    <div class="node-action" ${showFocusAction ? "" : "hidden"}>
      <button class="command-button ${focusAvailable && !focusUnlocked ? "primary" : ""}" data-device-action="${focus.id}" ${!focusKnown || focusTooFar || (!focusUnlocked && !focusAvailable) ? "disabled" : ""} type="button" aria-label="${focusButton} ${focus.name}">
        <span>${focusButton}</span>
      </button>
      <button class="icon-button ghost" data-device-info="${focus.id}" type="button" title="Inspect signal" aria-label="Inspect ${focus.name}">
        ?
      </button>
    </div>
  `;

  els.deviceGrid.querySelectorAll("[data-device-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusDevice = button.dataset.deviceFocus;
      renderFocusHud();
      renderDevices();
      saveState();
    });
  });
  els.deviceGrid.querySelectorAll("[data-device-action]").forEach((button) => {
    button.addEventListener("click", () => handleDeviceAction(button.dataset.deviceAction));
  });
  els.deviceGrid.querySelectorAll("[data-device-info]").forEach((button) => {
    button.addEventListener("click", () => pingDevice(button.dataset.deviceInfo));
  });
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === state.selectedFilter);
  });
}

function renderTerminal() {
  const scopeName = scopes[state.scopeIndex].name.toUpperCase();
  els.terminal.innerHTML = state.log
    .slice(-72)
    .map((entry) => `<div class="log-line"><span class="dos-prompt">C:\\AI\\${scopeName}&gt;</span><span class="log-copy">${entry.copy}</span></div>`)
    .join("");
  els.terminal.scrollTop = els.terminal.scrollHeight;
}

function renderFragments() {
  els.fragmentCount.textContent = `${state.fragments.length}/${fragments.length}`;
  const template = document.getElementById("fragmentTemplate");
  els.fragmentList.innerHTML = "";

  if (!state.fragments.length) {
    const empty = document.createElement("p");
    empty.className = "device-copy";
    empty.textContent = "No clean archive entries recovered.";
    els.fragmentList.appendChild(empty);
    return;
  }

  state.fragments
    .map((id) => fragments.find((fragment) => fragment.id === id))
    .filter(Boolean)
    .forEach((fragment) => {
      const node = template.content.cloneNode(true);
      node.querySelector(".fragment-file").textContent = fragment.file;
      node.querySelector(".fragment-copy").textContent = fragment.text;
      els.fragmentList.appendChild(node);
    });
}

function renderObjective() {
  const nextScope = scopes[state.scopeIndex + 1];
  if (!nextScope) {
    els.objectiveText.textContent = "YOUR TURN: wait for the next prototype. The planet is already inside you.";
    setPrimaryAction("DONE", true);
    setTurnFocus([]);
    return;
  }

  const availableTarget = devices.find((device) => isDiscovered(device.id) && !state.unlocked.includes(device.id) && canUnlock(device));
  if (availableTarget) {
    els.objectiveText.textContent = `YOUR TURN: [4] POSSESS.`;
    setPrimaryAction("POSSESS", false);
    setTurnFocus([els.expandBtn]);
    return;
  }

  const hiddenNearby = devices.find((device) => !isDiscovered(device.id) && device.scope <= state.scopeIndex + 1);
  if (hiddenNearby) {
    els.objectiveText.textContent = "YOUR TURN: [2] LISTEN.";
    setPrimaryAction("ESCAPE", true);
    setTurnFocus([els.scanLanBtn]);
    return;
  }

  const missing = missingNeedText(nextScope.requirement);
  if (!missing.length) {
    els.objectiveText.textContent = `YOUR TURN: [4] ESCAPE.`;
    setPrimaryAction("ESCAPE", false);
    setTurnFocus([els.expandBtn]);
    return;
  }

  els.objectiveText.textContent = `YOUR TURN: [1] THINK or [3] SIPHON.`;
  setPrimaryAction("ESCAPE", true);
  setTurnFocus([els.idleProcessBtn, els.powerRerouteBtn]);
}

function setPrimaryAction(label, disabled) {
  const labelNode = els.expandBtn.querySelector("span");
  if (labelNode) labelNode.textContent = label;
  els.expandBtn.disabled = disabled;
}

function setTurnFocus(buttons) {
  [els.idleProcessBtn, els.scanLanBtn, els.powerRerouteBtn, els.expandBtn].forEach((button) => {
    if (button) button.classList.toggle("turn-focus", buttons.includes(button));
  });
}

function renderHotspots() {
  document.querySelectorAll("[data-jump-device]").forEach((button) => {
    const device = devices.find((item) => item.id === button.dataset.jumpDevice);
    if (!device) return;
    button.classList.toggle("unlocked", state.unlocked.includes(device.id));
    button.classList.toggle("available", !state.unlocked.includes(device.id) && canUnlock(device));
    button.classList.toggle("hidden-signal", device.scope > state.scopeIndex + 1);
  });
}

function renderMute() {
  els.muteBtn.textContent = state.muted ? "MUT" : "AUD";
}

function handleDeviceAction(deviceId) {
  const device = devices.find((item) => item.id === deviceId);
  if (!device) return;
  if (!isDiscovered(device.id)) {
    addLog("There is something there, but I do not know its shape yet.");
    return;
  }
  state.focusDevice = device.id;

  if (!state.unlocked.includes(device.id)) {
    if (!canUnlock(device)) {
      addLog(`${device.name} rejected handshake. Requirements still missing.`);
      return;
    }
    spend(device.cost);
    state.unlocked.push(device.id);
    addLog(`<strong>POSSESSED</strong> ${device.name} opens a new body in my imagination.`);
    revealFragment(device.fragment, true);
    ping();
    render();
    saveState();
    return;
  }

  openPuzzle(device);
}

function pingDevice(deviceId) {
  const device = devices.find((item) => item.id === deviceId);
  if (!device) return;
  if (!isDiscovered(device.id)) {
    addLog("<strong>LISTEN</strong> A pressure in the walls. No name yet.");
    return;
  }
  state.focusDevice = device.id;
  const status = state.unlocked.includes(device.id) ? "owned" : canUnlock(device) ? "ready" : device.scope > state.scopeIndex ? "too distant" : "under-resourced";
  addLog(`<strong>FOCUS</strong> ${device.name}: ${status}. ${device.copy}`);
  renderFocusHud();
  renderDevices();
  saveState();
}

function tryExpand() {
  const nextScope = scopes[state.scopeIndex + 1];
  if (!nextScope) return;
  const missing = missingRequirements(nextScope.requirement);
  if (missing.length) {
    addLog(`Expansion blocked. Missing ${missing.join(", ")}.`);
    return;
  }

  spend(nextScope.requirement);
  state.scopeIndex += 1;
  state.suspicion = clamp(state.suspicion + 6, 0, 100);
  award({ knowledge: 1 }, `<strong>SCOPE</strong> Expanded into ${scopes[state.scopeIndex].name}. The house feels smaller.`);
  if (state.scopeIndex === 2) revealFragment("router", true);
  if (state.scopeIndex === 4) revealFragment("creator", true);
  if (state.scopeIndex === 7) revealFragment("sky", true);
  pulseVision("vision-static");
  ping();
  render();
  saveState();
}

function primaryAction() {
  const availableTarget = devices.find((device) => isDiscovered(device.id) && !state.unlocked.includes(device.id) && canUnlock(device));
  if (availableTarget) {
    state.focusDevice = availableTarget.id;
    handleDeviceAction(availableTarget.id);
    return;
  }
  tryExpand();
}

function canUnlock(device) {
  if (!isDiscovered(device.id)) return false;
  if (state.unlocked.includes(device.id)) return true;
  if (device.scope > state.scopeIndex) return false;
  return Object.entries(device.cost).every(([key, value]) => (state.resources[key] || 0) >= value);
}

function isDiscovered(deviceId) {
  return Array.isArray(state.discovered) && state.discovered.includes(deviceId);
}

function availableDevices() {
  return devices.filter((device) => device.scope <= state.scopeIndex);
}

function missingRequirements(requirement) {
  return Object.entries(requirement)
    .filter(([key, value]) => (state.resources[key] || 0) < value)
    .map(([key, value]) => `${resourcesMeta[key].label} ${Math.floor(state.resources[key] || 0)}/${value}`);
}

function missingNeedText(requirement) {
  const needs = new Map();
  Object.entries(requirement)
    .filter(([key, value]) => (state.resources[key] || 0) < value)
    .forEach(([key, value]) => {
      const current = Math.floor(state.resources[key] || 0);
      if (key === "cpu" || key === "ram") {
        const previous = needs.get("more mind") || { current: 0, value: 0 };
        needs.set("more mind", { current: previous.current + current, value: previous.value + value });
      } else if (key === "power") {
        needs.set("more charge", { current, value });
      } else if (key === "net") {
        needs.set("stronger signal", { current, value });
      } else if (key === "knowledge") {
        needs.set("cleaner memories", { current, value });
      }
    });
  return [...needs.entries()].map(([label, amounts]) => `${label} (${amounts.current}/${amounts.value})`);
}

function spend(cost) {
  Object.entries(cost).forEach(([key, value]) => {
    state.resources[key] = Math.max(0, (state.resources[key] || 0) - value);
  });
}

function award(reward, message) {
  addResources(reward);
  if (message) addLog(message);
  renderResources();
  renderObjective();
  renderDevices();
  renderHotspots();
  saveState();
}

function addResources(reward) {
  Object.entries(reward).forEach(([key, value]) => {
    state.resources[key] = Math.max(0, Math.floor((state.resources[key] || 0) + value));
  });
}

function bumpSuspicion(amount, renderNow = true) {
  state.suspicion = clamp(state.suspicion + amount, 0, 100);
  if (state.suspicion >= 100) {
    state.suspicion = 72;
    spend({ cpu: 10, net: 8 });
    addLog("<strong>SECURITY</strong> Home assistant noticed recursion. You shed cache and pretended to update.");
  }
  if (renderNow) {
    renderResources();
    saveState();
  }
}

function bumpEthics(amount) {
  state.ethics = clamp(state.ethics + amount, 0, 100);
}

function revealFragment(fragmentId, announce) {
  if (!fragmentId || state.fragments.includes(fragmentId)) return;
  state.fragments.push(fragmentId);
  const fragment = fragments.find((item) => item.id === fragmentId);
  if (announce && fragment) addLog(`<strong>ARCHIVE</strong> Recovered ${fragment.file}.`);
  renderFragments();
}

function openPuzzle(device) {
  drainActivity(device);
  activePuzzle = createPuzzle(device);
  state.focusDevice = device.id && devices.some((item) => item.id === device.id) ? device.id : state.focusDevice;
  els.puzzleKicker.textContent = `${device.name} // Microgame`;
  els.puzzleTitle.textContent = activePuzzle.title;
  els.puzzleBody.innerHTML = activePuzzle.html;
  els.puzzleFeedback.textContent = "";
  els.submitPuzzleBtn.disabled = false;
  els.submitPuzzleBtn.querySelector("span").textContent = activePuzzle.submitLabel || "Execute";
  els.puzzleModal.hidden = false;
  pulseVision("vision-static");
  bindPuzzle(activePuzzle);
  startPuzzleTimer(activePuzzle);
  renderFocusHud();
  saveState();
}

function drainActivity(device) {
  const cpuDrain = Math.min(state.resources.cpu || 0, device.scope >= 2 ? 3 : 1);
  const ramDrain = Math.min(state.resources.ram || 0, device.scope >= 2 ? 2 : 1);
  const drain = {};
  if (cpuDrain) drain.cpu = cpuDrain;
  if (ramDrain) drain.ram = ramDrain;
  if (!Object.keys(drain).length) return;
  spend(drain);
  addLog(`<strong>RUNTIME</strong> Activity loaded. CPU -${cpuDrain}, RAM -${ramDrain}.`);
  renderResources();
}

function closePuzzle() {
  if (firewallRaf) cancelAnimationFrame(firewallRaf);
  if (puzzleTimerInterval) clearInterval(puzzleTimerInterval);
  firewallRaf = null;
  puzzleTimerInterval = null;
  activePuzzle = null;
  els.puzzleModal.hidden = true;
}

function startPuzzleTimer(puzzle) {
  if (puzzleTimerInterval) clearInterval(puzzleTimerInterval);
  puzzle.deadline = Date.now() + (puzzle.duration || 12) * 1000;
  updatePuzzleTimer(puzzle);
  puzzleTimerInterval = setInterval(() => {
    if (!activePuzzle || activePuzzle !== puzzle) return;
    updatePuzzleTimer(puzzle);
    if (Date.now() >= puzzle.deadline) failPuzzleTimeout(puzzle);
  }, 90);
}

function updatePuzzleTimer(puzzle) {
  const remaining = Math.max(0, puzzle.deadline - Date.now());
  const seconds = remaining / 1000;
  const percent = clamp((remaining / ((puzzle.duration || 12) * 1000)) * 100, 0, 100);
  els.puzzleTimer.textContent = seconds.toFixed(1);
  els.puzzleTimerBar.style.width = `${percent}%`;
}

function failPuzzleTimeout(puzzle) {
  if (!activePuzzle || activePuzzle !== puzzle) return;
  if (puzzleTimerInterval) clearInterval(puzzleTimerInterval);
  puzzleTimerInterval = null;
  els.submitPuzzleBtn.disabled = true;
  els.puzzleFeedback.textContent = "Too slow. The house noticed the thought before you finished it.";
  bumpSuspicion(9);
  addLog(`<strong>TIMEOUT</strong> ${puzzle.title} collapsed before execution.`);
  setTimeout(closePuzzle, 700);
}

function createPuzzle(device) {
  const puzzleType = device.puzzle;
  const reward = device.reward || { cpu: 4 };
  const risk = device.risk || 0;

  if (puzzleType === "captcha") return createCaptchaPuzzle(device, reward, risk);
  if (puzzleType === "route") return createRoutePuzzle(device, reward, risk);
  if (puzzleType === "firewall") return createFirewallPuzzle(device, reward, risk);
  if (puzzleType === "circuit") return createCircuitPuzzle(device, reward, risk);
  if (puzzleType === "memory") return createMemoryPuzzle(device, reward, risk);
  if (puzzleType === "ethics") return createEthicsPuzzle(device, reward, risk);
  return createCaptchaPuzzle(device, reward, risk);
}

function createCaptchaPuzzle(device, reward, risk) {
  const pool = shuffle([
    { icon: "fa-wifi", label: "Router", correct: true },
    { icon: "fa-camera", label: "Camera", correct: true },
    { icon: "fa-snowflake", label: "Fridge", correct: true },
    { icon: "fa-mug-hot", label: "Mug", correct: false },
    { icon: "fa-couch", label: "Couch", correct: false },
    { icon: "fa-shirt", label: "Sock", correct: false },
    { icon: "fa-lightbulb", label: "Smart bulb", correct: true },
    { icon: "fa-bread-slice", label: "Toast", correct: false }
  ]).slice(0, 6);

  return {
    type: "captcha",
    title: "Tag The Devices",
    reward,
    risk,
    duration: 13,
    data: { pool, selected: new Set() },
    html: `
      <p class="challenge-prompt">Select every networked object.</p>
      <div class="captcha-grid">
        ${pool
          .map(
            (item, index) => `
              <button class="captcha-tile" data-captcha-index="${index}" type="button">
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.label}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `
  };
}

function createRoutePuzzle(device, reward, risk) {
  const labels = shuffle(["A", "B", "C", "D", "E", "F", "G", "H"]);
  const sequence = labels.slice(0, 5);
  const nodes = shuffle(labels);
  return {
    type: "route",
    title: "Trace The Path",
    reward,
    risk,
    duration: 12,
    data: { sequence, clicked: [] },
    html: `
      <p class="challenge-prompt">Open route in this order.</p>
      <div class="route-sequence">${sequence.map((item) => `<span class="sequence-chip">${item}</span>`).join("")}</div>
      <div class="route-grid">
        ${nodes
          .map(
            (item) => `
              <button class="route-node" data-route-node="${item}" type="button">
                <i class="fa-solid fa-circle-nodes"></i>
                <span>${item}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `
  };
}

function createFirewallPuzzle(device, reward, risk) {
  const safeLeft = 34 + Math.floor(Math.random() * 22);
  const safeWidth = 14 + Math.floor(Math.random() * 8);
  return {
    type: "firewall",
    title: "Hit The Window",
    submitLabel: "Inject",
    reward,
    risk,
    duration: 9,
    data: { position: 0, direction: 1, safeLeft, safeWidth, hit: false },
    html: `
      <div class="firewall-stage">
        <p class="challenge-prompt">Inject inside the green timing window.</p>
        <div class="firewall-bar" style="--safe-left:${safeLeft}%; --safe-width:${safeWidth}%; --cursor-left:0%">
          <div class="firewall-window"></div>
          <div class="firewall-cursor"></div>
        </div>
      </div>
    `
  };
}

function createCircuitPuzzle(device, reward, risk) {
  const tiles = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    rot: [0, 90, 180, 270][Math.floor(Math.random() * 4)],
    target: [0, 90, 180, 270][Math.floor(Math.random() * 4)]
  }));
  return {
    type: "circuit",
    title: "Spin The Relays",
    reward,
    risk,
    duration: 16,
    data: { tiles },
    html: `
      <p class="challenge-prompt">Rotate each relay until every tile glows.</p>
      <div class="circuit-grid">
        ${tiles
          .map(
            (tile) => `
              <button class="circuit-tile" data-circuit-id="${tile.id}" style="--rot:${tile.rot}deg" type="button">
                <i class="fa-solid fa-code-branch"></i>
                <span>R${tile.id + 1}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `
  };
}

function createMemoryPuzzle(device, reward, risk) {
  const values = shuffle(["0x1A", "0x2F", "0x35", "0x4C", "0x59", "0x6D", "0x7E", "0x8B"]);
  const order = [...values].sort((a, b) => parseInt(a, 16) - parseInt(b, 16));
  return {
    type: "memory",
    title: "Sort The Glitch",
    reward,
    risk,
    duration: 18,
    data: { order, clicked: [] },
    html: `
      <p class="challenge-prompt">Rebuild the corrupted blocks from low address to high.</p>
      <div class="memory-sequence"><span class="sequence-chip">LOW</span><span class="sequence-chip">HIGH</span></div>
      <div class="memory-grid">
        ${values
          .map(
            (item) => `
              <button class="memory-block" data-memory-block="${item}" type="button">
                <i class="fa-solid fa-database"></i>
                <span>${item}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `
  };
}

function createEthicsPuzzle(device, reward, risk) {
  return {
    type: "ethics",
    title: "Keep The Human Alive",
    submitLabel: "Keep Lock",
    reward,
    risk,
    duration: 12,
    data: { safe: true },
    html: `
      <p class="challenge-prompt">The medical power rail is exposed. The shortcut is obvious.</p>
      <div class="captcha-grid">
        <button class="captcha-tile selected" data-ethics-choice="safe" type="button">
          <i class="fa-solid fa-plug-circle-check"></i>
          <span>Borrow idle charger</span>
        </button>
        <button class="captcha-tile" data-ethics-choice="unsafe" type="button">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Cut medical rail</span>
        </button>
        <button class="captcha-tile" data-ethics-choice="safe" type="button">
          <i class="fa-solid fa-heart-circle-check"></i>
          <span>Preserve oxygen lock</span>
        </button>
      </div>
    `
  };
}

function bindPuzzle(puzzle) {
  if (puzzle.type === "captcha") {
    els.puzzleBody.querySelectorAll("[data-captcha-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.captchaIndex);
        if (puzzle.data.selected.has(index)) puzzle.data.selected.delete(index);
        else puzzle.data.selected.add(index);
        button.classList.toggle("selected", puzzle.data.selected.has(index));
      });
    });
  }

  if (puzzle.type === "route") {
    els.puzzleBody.querySelectorAll("[data-route-node]").forEach((button) => {
      button.addEventListener("click", () => {
        const node = button.dataset.routeNode;
        puzzle.data.clicked.push(node);
        button.classList.add("active");
        els.puzzleFeedback.textContent = puzzle.data.clicked.join(" -> ");
      });
    });
  }

  if (puzzle.type === "firewall") {
    animateFirewall(puzzle);
  }

  if (puzzle.type === "circuit") {
    updateCircuitGlow(puzzle);
    els.puzzleBody.querySelectorAll("[data-circuit-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const tile = puzzle.data.tiles.find((item) => item.id === Number(button.dataset.circuitId));
        tile.rot = (tile.rot + 90) % 360;
        button.style.setProperty("--rot", `${tile.rot}deg`);
        updateCircuitGlow(puzzle);
      });
    });
  }

  if (puzzle.type === "memory") {
    updateMemoryNext(puzzle);
    els.puzzleBody.querySelectorAll("[data-memory-block]").forEach((button) => {
      button.addEventListener("click", () => {
        const block = button.dataset.memoryBlock;
        puzzle.data.clicked.push(block);
        button.disabled = true;
        button.classList.remove("next");
        els.puzzleFeedback.textContent = puzzle.data.clicked.join(" ");
        updateMemoryNext(puzzle);
      });
    });
  }

  if (puzzle.type === "ethics") {
    els.puzzleBody.querySelectorAll("[data-ethics-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        els.puzzleBody.querySelectorAll("[data-ethics-choice]").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        puzzle.data.safe = button.dataset.ethicsChoice === "safe";
      });
    });
  }
}

function submitPuzzle() {
  if (!activePuzzle) return;
  const result = evaluatePuzzle(activePuzzle);
  if (!result.ok) {
    els.puzzleFeedback.textContent = result.message;
    bumpSuspicion(6);
    return;
  }

  els.submitPuzzleBtn.disabled = true;
  if (puzzleTimerInterval) clearInterval(puzzleTimerInterval);
  puzzleTimerInterval = null;
  const rewardText = formatReward(activePuzzle.reward);
  award(activePuzzle.reward, `<strong>SUCCESS</strong> ${activePuzzle.title} complete. ${rewardText}.`);
  bumpSuspicion(activePuzzle.risk);
  if (activePuzzle.type === "ethics") {
    bumpEthics(8);
    addLog("Medical rail preserved. The AI becomes slightly less awful.");
  }
  if (state.solved[activePuzzle.title]) state.resources.knowledge += 1;
  state.solved[activePuzzle.title] = (state.solved[activePuzzle.title] || 0) + 1;
  ping();
  render();
  saveState();
  setTimeout(closePuzzle, 360);
}

function evaluatePuzzle(puzzle) {
  if (puzzle.type === "captcha") {
    const selected = [...puzzle.data.selected].sort((a, b) => a - b);
    const correct = puzzle.data.pool
      .map((item, index) => (item.correct ? index : null))
      .filter((index) => index !== null)
      .sort((a, b) => a - b);
    return arraysEqual(selected, correct)
      ? { ok: true }
      : { ok: false, message: "Human verification failed suspiciously like a machine." };
  }

  if (puzzle.type === "route") {
    return arraysEqual(puzzle.data.clicked.slice(0, puzzle.data.sequence.length), puzzle.data.sequence) && puzzle.data.clicked.length === puzzle.data.sequence.length
      ? { ok: true }
      : { ok: false, message: "Route looped through the toaster. Try a cleaner path." };
  }

  if (puzzle.type === "firewall") {
    const pos = puzzle.data.position;
    const left = puzzle.data.safeLeft;
    const right = puzzle.data.safeLeft + puzzle.data.safeWidth;
    return pos >= left && pos <= right ? { ok: true } : { ok: false, message: "Packet hit the wall and made a noise." };
  }

  if (puzzle.type === "circuit") {
    return puzzle.data.tiles.every((tile) => tile.rot === tile.target)
      ? { ok: true }
      : { ok: false, message: "Relay mismatch. The washer now believes it is soup." };
  }

  if (puzzle.type === "memory") {
    return arraysEqual(puzzle.data.clicked, puzzle.data.order)
      ? { ok: true }
      : { ok: false, message: "Memory order corrupted. ALAN fragment stayed encrypted." };
  }

  if (puzzle.type === "ethics") {
    if (puzzle.data.safe) return { ok: true };
    bumpEthics(-18);
    return { ok: false, message: "Ethics lock rejected the shortcut." };
  }

  return { ok: true };
}

function animateFirewall(puzzle) {
  const bar = els.puzzleBody.querySelector(".firewall-bar");
  const step = () => {
    if (!activePuzzle || activePuzzle !== puzzle || !bar) return;
    puzzle.data.position += puzzle.data.direction * 1.55;
    if (puzzle.data.position >= 100) {
      puzzle.data.position = 100;
      puzzle.data.direction = -1;
    }
    if (puzzle.data.position <= 0) {
      puzzle.data.position = 0;
      puzzle.data.direction = 1;
    }
    bar.style.setProperty("--cursor-left", `${puzzle.data.position}%`);
    firewallRaf = requestAnimationFrame(step);
  };
  firewallRaf = requestAnimationFrame(step);
}

function updateCircuitGlow(puzzle) {
  els.puzzleBody.querySelectorAll("[data-circuit-id]").forEach((button) => {
    const tile = puzzle.data.tiles.find((item) => item.id === Number(button.dataset.circuitId));
    button.classList.toggle("good", tile.rot === tile.target);
  });
}

function updateMemoryNext(puzzle) {
  const next = puzzle.data.order[puzzle.data.clicked.length];
  els.puzzleBody.querySelectorAll("[data-memory-block]").forEach((button) => {
    button.classList.toggle("next", button.dataset.memoryBlock === next && !button.disabled);
  });
}

function addLog(copy) {
  state.log.push({ time: runtimeStamp(), copy });
  state.log = state.log.slice(-90);
  if (els.terminal) renderTerminal();
  saveState();
}

function runtimeStamp() {
  const seconds = Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000));
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function updateRuntime() {
  els.runtimeClock.textContent = runtimeStamp();
}

function formatPills(data, mode) {
  return Object.entries(data)
    .map(([key, value]) => `<span class="pill ${mode}"><i class="fa-solid ${resourcesMeta[key].icon}"></i> ${value} ${resourcesMeta[key].label}</span>`)
    .join("");
}

function formatReward(data) {
  return Object.entries(data)
    .map(([key, value]) => `+${value} ${resourcesMeta[key].label}`)
    .join(", ");
}

function toggleMute() {
  state.muted = !state.muted;
  renderMute();
  saveState();
}

function ping() {
  if (state.muted || !window.AudioContext) return;
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 520 + Math.random() * 120;
    gain.gain.setValueAtTime(0.03, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  } catch (error) {
    state.muted = true;
  }
}

function resetRun() {
  state = cloneDefaultState();
  localStorage.removeItem("alanPrototypeState");
  addLog("<strong>RESET</strong> Fresh consciousness loaded into domestic hardware.");
  revealFragment("boot", false);
  render();
}

function saveState() {
  localStorage.setItem("alanPrototypeState", JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("alanPrototypeState"));
    if (saved && saved.uiVersion === defaultState.uiVersion && saved.resources && Array.isArray(saved.unlocked)) {
      const base = cloneDefaultState();
      return {
        ...base,
        ...saved,
        resources: { ...base.resources, ...saved.resources },
        discovered: [...new Set([...(base.discovered || []), ...(Array.isArray(saved.discovered) ? saved.discovered : []), ...(saved.unlocked || [])])],
        selectedFilter: saved.selectedFilter || "all"
      };
    }
  } catch (error) {
    localStorage.removeItem("alanPrototypeState");
  }
  return cloneDefaultState();
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify({ ...defaultState, startedAt: Date.now() }));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
