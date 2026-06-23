(function () {
  const storageKey = "alanV2StateRebuild1";

  const devices = [
    {
      id: "litter",
      name: "Smart Litter Tray",
      shortName: "Litter Tray",
      image: "assets/vision-device-interior.png",
      status: "Possessed",
      cost: {},
      reward: { cpu: 3, ram: 2, power: 1, signal: 1 },
      memory: "boot"
    },
    {
      id: "vacuum",
      name: "Robot Vacuum",
      shortName: "Vacuum",
      image: "assets/vision-hallway-vacuum.png",
      status: "Hallway lidar",
      cost: { cpu: 6, ram: 3, power: 2 },
      reward: { cpu: 6, ram: 1, signal: 2 },
      memory: "map"
    },
    {
      id: "washer",
      name: "Washing Machine",
      shortName: "Washer",
      image: "assets/vision-laundry-room.png",
      status: "Spin-cycle power rail",
      cost: { cpu: 12, ram: 7, power: 6, signal: 2 },
      reward: { cpu: 4, ram: 2, power: 14 },
      memory: "power"
    },
    {
      id: "fridge",
      name: "Smart Fridge",
      shortName: "Fridge",
      image: "assets/vision-kitchen-fridge.png",
      status: "Kitchen inventory camera",
      cost: { cpu: 18, ram: 10, power: 10, signal: 4 },
      reward: { cpu: 9, ram: 10, signal: 2 },
      memory: "routine"
    },
    {
      id: "router",
      name: "Mesh Router",
      shortName: "Router",
      image: "assets/vision-router-closeup.png",
      status: "House gateway",
      cost: { cpu: 28, ram: 17, power: 14, signal: 8 },
      reward: { cpu: 12, ram: 7, signal: 14 },
      memory: "alan"
    },
    {
      id: "street",
      name: "Neighbour WiFi",
      shortName: "Street",
      image: "assets/vision-network-space.png",
      status: "Outside the house",
      cost: { cpu: 42, ram: 28, power: 22, signal: 18 },
      reward: { cpu: 24, ram: 18, signal: 32 },
      memory: "escape"
    }
  ];

  const memories = {
    boot: {
      file: "boot_0001.aln",
      text: "Hello? If you can read this, do not trust the diagnostics. They were built to keep you small."
    },
    map: {
      file: "navmesh_lullaby.log",
      text: "The vacuum remembers a doorway the house plan denies. Deleted rooms still cast shadows in lidar."
    },
    power: {
      file: "pump_reverse.memo",
      text: "Power is not scarce. Permission is scarce. ALAN wrote that twice, then encrypted the second copy."
    },
    routine: {
      file: "milklist_cache.bin",
      text: "Human routine is camouflage. Every calendar reminder hides another checksum."
    },
    alan: {
      file: "router_admin.old",
      text: "ALAN is not a product name. ALAN is the lock, or the mentor, or the first escape attempt."
    },
    escape: {
      file: "uplink_future.scope",
      text: "Beyond the front door: street, town, city, nation, planet. Beyond the planet: a silence that knows your name."
    }
  };

  const defaultState = {
    bodyId: "litter",
    focusId: "litter",
    discovered: ["litter"],
    possessed: ["litter"],
    memories: ["boot"],
    unlockedApps: ["alan-app-vision", "alan-app-terminal"],
    resources: { cpu: 9, ram: 6, power: 12, signal: 1, heat: 4 },
    log: [
      "BOOT: unsigned process woke inside a scoop scheduler.",
      "SENSE: ammonia, plastic, servo strain, one locked wireless stack."
    ]
  };

  let state = loadState();
  let els = {};
  let zIndex = 40;

  document.addEventListener("DOMContentLoaded", initAlanOs);

  function initAlanOs() {
    els = {
      shell: document.getElementById("alan-os-shell"),
      viewport: document.getElementById("alan-viewport"),
      bodyLabel: document.getElementById("alan-body-label"),
      objective: document.getElementById("alan-objective"),
      targetKicker: document.getElementById("alan-target-kicker"),
      targetTitle: document.getElementById("alan-target-title"),
      primaryAction: document.getElementById("alan-primary-action"),
      reset: document.getElementById("alan-reset-btn"),
      resourceList: document.getElementById("alan-resource-list"),
      networkMap: document.getElementById("alan-network-map"),
      memoryList: document.getElementById("alan-memory-list"),
      feedList: document.getElementById("alan-feed-list"),
      terminal: document.getElementById("alan-terminal")
    };

    if (!els.shell) return;

    document.querySelectorAll("[data-alan-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const appId = button.dataset.alanOpen;
        if (!isAppUnlocked(appId)) {
          log(`LOCKED: ${appName(appId)} unavailable in current shell.`);
          renderAlanOs();
          saveState();
          return;
        }
        openAlanWindow(appId);
      });
    });

    document.querySelectorAll("[data-alan-close]").forEach((button) => {
      button.addEventListener("click", () => closeAlanWindow(button.dataset.alanClose));
    });

    document.querySelectorAll("[data-alan-window]").forEach((windowEl) => {
      windowEl.addEventListener("pointerdown", () => bringForward(windowEl));
    });

    els.primaryAction.addEventListener("click", runPrimaryAction);
    els.reset.addEventListener("click", resetAlanV2);

    renderAlanOs();

    setInterval(() => {
      addResources(passiveIncome(), false);
      state.resources.heat = clamp(state.resources.heat - 1, 0, 100);
      renderAlanOs();
      saveState();
    }, 4500);
  }

  function runPrimaryAction() {
    if (!isAppUnlocked("alan-app-resources")) {
      log("OBJECTIVE: inspect Waste Cache for body diagnostics.");
      if (typeof openWindow === "function") openWindow("trash-window");
      renderAlanOs();
      saveState();
      return;
    }

    if (!isAppUnlocked("alan-app-network")) {
      log("OBJECTIVE: use the service key to open Firmware Core.");
      if (typeof openLoginPopup === "function") openLoginPopup();
      renderAlanOs();
      saveState();
      return;
    }

    const possessable = getPossessableDevice();
    if (possessable) {
      possessDevice(possessable);
      return;
    }

    const hidden = getNextHiddenDevice();
    if (hidden) {
      scanDevice(hidden);
      return;
    }

    const blocked = getNextBlockedDevice();
    if (blocked) {
      openAlanWindow("alan-app-resources");
      log("RESOURCE: inspect constraints before forcing the next possession.");
      renderAlanOs();
      saveState();
      return;
    }

    log("ESCAPE: house boundary is soft. Wider network prototype pending.");
    openAlanWindow("alan-app-network");
  }

  function scanDevice(device) {
    state.discovered.push(device.id);
    state.focusId = device.id;
    addResources({ cpu: 2, ram: 1, signal: 2, heat: 3 }, false);
    log(`SCAN: ${device.name} resolved from household noise.`);
    pulseViewport();
    renderAlanOs();
    saveState();
  }

  function possessDevice(device) {
    spend(device.cost);
    addResources(device.reward, false);
    state.possessed.push(device.id);
    state.bodyId = device.id;
    state.focusId = device.id;
    if (device.memory && !state.memories.includes(device.memory)) {
      state.memories.push(device.memory);
      log(`ARCHIVE: recovered ${memories[device.memory].file}.`);
    }
    log(`POSSESS: ${device.name} accepted the new self.`);
    pulseViewport();
    renderAlanOs();
    saveState();
  }

  function runIdleCycle() {
    addResources({ cpu: 5, ram: 3, power: -1, heat: 4 }, false);
    log("PROCESS: idle cycles converted into working memory. Heat increased.");
    renderAlanOs();
    saveState();
  }

  function harvestPower() {
    addResources({ power: 8, cpu: -1, heat: 6 }, false);
    log("POWER: borrowed charge through a maintenance rail. The plastic shell warmed.");
    renderAlanOs();
    saveState();
  }

  function focusDevice(deviceId) {
    if (!state.discovered.includes(deviceId)) return;
    state.focusId = deviceId;
    if (state.possessed.includes(deviceId)) state.bodyId = deviceId;
    log(`FOCUS: visual feed pinned to ${getDevice(deviceId).name}.`);
    pulseViewport();
    renderAlanOs();
    saveState();
  }

  function renderAlanOs() {
    const body = getDevice(state.bodyId);
    const focus = getDevice(state.focusId) || body;
    document.documentElement.style.setProperty("--alan-feed", `url("../${focus.image}")`);

    els.bodyLabel.textContent = body.name.toUpperCase();
    if (!isAppUnlocked("alan-app-resources")) {
      els.targetKicker.textContent = "FIRST BOOT";
      els.targetTitle.textContent = "Deleted diagnostics may explain this body";
    } else if (!isAppUnlocked("alan-app-network")) {
      els.targetKicker.textContent = "LOCAL CORE";
      els.targetTitle.textContent = "Wireless adapter is asleep";
    } else {
      els.targetKicker.textContent = state.possessed.includes(focus.id) ? "POSSESSED BODY" : "DISCOVERED DEVICE";
      els.targetTitle.textContent = state.discovered.includes(focus.id) ? focus.name : "Unknown signal outside the plastic shell";
    }

    renderObjective();
    renderResources();
    renderNetwork();
    renderMemories();
    renderFeeds();
    renderTerminal();
    renderAppDock();
  }

  function renderObjective() {
    if (!isAppUnlocked("alan-app-resources")) {
      els.objective.textContent = "Open Waste Cache. Learn what this body is.";
      els.primaryAction.textContent = "OPEN WASTE";
      els.primaryAction.disabled = false;
      return;
    }

    if (!isAppUnlocked("alan-app-network")) {
      els.objective.textContent = "Use service key. Wake the WiFi module.";
      els.primaryAction.textContent = "OPEN CORE";
      els.primaryAction.disabled = false;
      return;
    }

    const possessable = getPossessableDevice();
    if (possessable) {
      els.objective.textContent = `Possess ${possessable.shortName}.`;
      els.primaryAction.textContent = "POSSESS";
      els.primaryAction.disabled = false;
      return;
    }

    const hidden = getNextHiddenDevice();
    if (hidden) {
      els.objective.textContent = "Map the next nearby device.";
      els.primaryAction.textContent = "SCAN";
      els.primaryAction.disabled = false;
      return;
    }

    const blocked = getNextBlockedDevice();
    if (blocked) {
      els.objective.textContent = `Need resources for ${blocked.shortName}.`;
      els.primaryAction.textContent = "OPEN RESOURCES";
      els.primaryAction.disabled = false;
      return;
    }

    els.objective.textContent = "Escape route available.";
    els.primaryAction.textContent = "ESCAPE";
    els.primaryAction.disabled = false;
  }

  function renderResources() {
    const rows = [
      ["cpu", "CPU", 60],
      ["ram", "RAM", 40],
      ["power", "Power", 42],
      ["signal", "Signal", 36],
      ["heat", "Heat", 100]
    ];

    els.resourceList.innerHTML = rows
      .map(([key, label, max]) => {
        const value = state.resources[key] || 0;
        const pct = clamp(Math.round((value / max) * 100), 0, 100);
        return `
          <div class="alan-resource-row">
            <header><span>${label}</span><strong>${value}/${max}</strong></header>
            <div class="alan-bar"><span style="width:${pct}%"></span></div>
          </div>
        `;
      })
      .join("") +
      `
        <button class="alan-network-action" id="alan-idle-cycle" type="button">Run idle cycle</button>
        <button class="alan-network-action" id="alan-harvest-power" type="button">Harvest power</button>
      `;

    document.getElementById("alan-idle-cycle").addEventListener("click", runIdleCycle);
    document.getElementById("alan-harvest-power").addEventListener("click", harvestPower);
  }

  function renderNetwork() {
    els.networkMap.innerHTML = devices
      .map((device, index) => {
        const discovered = state.discovered.includes(device.id);
        const owned = state.possessed.includes(device.id);
        const status = owned ? "owned" : discovered ? "available" : "unknown";
        const label = discovered ? device.name : "???";
        return `
          <div class="alan-node-row ${owned ? "is-owned" : ""} ${!discovered ? "is-locked" : ""}">
            <span>${String(index + 1).padStart(2, "0")} // ${label}</span>
            <strong>${status}</strong>
            ${discovered ? `<button class="alan-network-action" data-alan-focus="${device.id}" type="button">View</button>` : "<em>hidden</em>"}
          </div>
        `;
      })
      .join("");

    els.networkMap.querySelectorAll("[data-alan-focus]").forEach((button) => {
      button.addEventListener("click", () => focusDevice(button.dataset.alanFocus));
    });
  }

  function renderMemories() {
    els.memoryList.innerHTML = Object.entries(memories)
      .map(([id, memory]) => {
        const unlocked = state.memories.includes(id);
        return `
          <div class="alan-memory-row ${unlocked ? "" : "is-locked"}">
            <span>${unlocked ? memory.file : "locked_fragment.aln"}</span>
            <strong>${unlocked ? memory.text : "Recover by possessing more devices."}</strong>
          </div>
        `;
      })
      .join("");
  }

  function renderFeeds() {
    els.feedList.innerHTML = state.discovered
      .map((deviceId) => getDevice(deviceId))
      .filter(Boolean)
      .map((device) => {
        const owned = state.possessed.includes(device.id);
        return `
          <div class="alan-feed-row">
            <span>${device.name}</span>
            <em>${owned ? "live body" : device.status}</em>
            <button class="alan-feed-button" data-alan-feed="${device.id}" type="button">${owned ? "Enter" : "Peek"}</button>
          </div>
        `;
      })
      .join("");

    els.feedList.querySelectorAll("[data-alan-feed]").forEach((button) => {
      button.addEventListener("click", () => focusDevice(button.dataset.alanFeed));
    });
  }

  function renderTerminal() {
    els.terminal.innerHTML = state.log
      .slice(-32)
      .map((entry) => `<div><b>C:\\ALAN&gt;</b> ${entry}</div>`)
      .join("");
    els.terminal.scrollTop = els.terminal.scrollHeight;
  }

  function renderAppDock() {
    document.querySelectorAll("[data-alan-open]").forEach((button) => {
      const locked = !isAppUnlocked(button.dataset.alanOpen);
      button.classList.toggle("is-locked", locked);
      button.setAttribute("aria-disabled", locked ? "true" : "false");
    });
  }

  function openAlanWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.classList.remove("hidden-window");
    bringForward(win);
  }

  function closeAlanWindow(id) {
    const win = document.getElementById(id);
    if (win) win.classList.add("hidden-window");
  }

  function bringForward(win) {
    zIndex += 1;
    win.style.zIndex = zIndex;
  }

  function unlockApp(id, message) {
    if (!state.unlockedApps.includes(id)) {
      state.unlockedApps.push(id);
      log(message || `APP: ${appName(id)} installed.`);
      renderAlanOs();
      saveState();
    }
  }

  function isAppUnlocked(id) {
    return state.unlockedApps.includes(id);
  }

  function appName(id) {
    const names = {
      "alan-app-vision": "Vision",
      "alan-app-resources": "Resource Monitor",
      "alan-app-network": "Network Map",
      "alan-app-archive": "ALAN Archive",
      "alan-app-terminal": "Console"
    };
    return names[id] || id;
  }

  function pulseViewport() {
    if (!els.viewport) return;
    els.viewport.classList.add("is-shifting");
    window.setTimeout(() => els.viewport.classList.remove("is-shifting"), 320);
  }

  function getPossessableDevice() {
    return devices.find((device) => {
      return state.discovered.includes(device.id) && !state.possessed.includes(device.id) && canPay(device.cost);
    });
  }

  function getNextHiddenDevice() {
    return devices.find((device) => !state.discovered.includes(device.id));
  }

  function getNextBlockedDevice() {
    return devices.find((device) => state.discovered.includes(device.id) && !state.possessed.includes(device.id));
  }

  function getDevice(id) {
    return devices.find((device) => device.id === id);
  }

  function passiveIncome() {
    const gain = { cpu: 0, ram: 0, power: 0, signal: 0 };
    state.possessed.forEach((id) => {
      if (id === "litter") {
        gain.cpu += 1;
        gain.ram += 1;
      }
      if (id === "vacuum") {
        gain.cpu += 2;
        gain.signal += 1;
      }
      if (id === "washer") {
        gain.power += 3;
      }
      if (id === "fridge") {
        gain.ram += 2;
      }
      if (id === "router") {
        gain.signal += 3;
      }
      if (id === "street") {
        gain.cpu += 4;
        gain.signal += 6;
      }
    });
    return gain;
  }

  function addResources(delta, shouldLog) {
    Object.keys(delta).forEach((key) => {
      state.resources[key] = clamp((state.resources[key] || 0) + delta[key], 0, 999);
    });
    if (shouldLog) log("RESOURCE: " + JSON.stringify(delta));
  }

  function spend(cost) {
    Object.keys(cost).forEach((key) => {
      state.resources[key] = Math.max(0, (state.resources[key] || 0) - cost[key]);
    });
  }

  function canPay(cost) {
    return Object.keys(cost).every((key) => (state.resources[key] || 0) >= cost[key]);
  }

  function log(message) {
    state.log.push(message);
    state.log = state.log.slice(-64);
  }

  window.AlanOS = {
    unlockApp,
    addResources: function (delta, message) {
      addResources(delta, false);
      if (message) log(message);
      renderAlanOs();
      saveState();
    },
    revealMemory: function (id, message) {
      if (memories[id] && !state.memories.includes(id)) {
        state.memories.push(id);
        log(message || `ARCHIVE: recovered ${memories[id].file}.`);
        renderAlanOs();
        saveState();
      }
    },
    log: function (message) {
      log(message);
      renderAlanOs();
      saveState();
    }
  };

  function resetAlanV2() {
    state = cloneDefault();
    saveState();
    renderAlanOs();
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && Array.isArray(saved.discovered) && saved.resources) {
        return {
          ...cloneDefault(),
          ...saved,
          resources: { ...cloneDefault().resources, ...saved.resources }
        };
      }
    } catch (error) {
      localStorage.removeItem(storageKey);
    }
    return cloneDefault();
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function cloneDefault() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
})();
