const dndLogo = document.getElementById("dnd-logo");
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");

const body = document.body;
const navbar = document.getElementById("navbar");
const headings = document.querySelectorAll(".heading");
const h3 = document.getElementsByTagName("h3");

const addMemberBtn = document.getElementById("add-member");
const removeMemberBtn = document.getElementById("remove-member");
const clearEncounterBtn = document.getElementById("clear-encounter");

const encounterParty = document.getElementById("encounter-party");
const encounterSettings = document.getElementById("encounter-settings");
const encounterOutput = document.getElementById("encounter-output");

const partyControl = document.querySelector(".party-control");
const playerLevels = document.querySelectorAll(".player-level");
const partyMembers = document.getElementById("party-members");
const settingsForm = document.getElementById("settings-form");

const select = document.getElementById("monster-list");
const monsterAmount = document.getElementById("monster-amount");

const addMonsterBtn = document.getElementById("monster-amount-btn");
const generateEncounterBtn = document.getElementById("generate-encounter-btn");

const slider = document.getElementById("encounter-variance");
const sliderText = document.getElementById("slider-text");
const checkbox = document.getElementById("bigger-monsters");
const checkmark = document.getElementById("checkmark");

const encounterControl = document.querySelector(".encounter-control");

const encounterMonsters = document.getElementById("encounter-monsters");
const encounterContainer = document.getElementById("encounter-container");

const deleteMonsterBtns = document.querySelectorAll(".delete-monster-entry");

const footer = document.querySelector(".footer");

const playerList = ["Player 1"];
let encounterExperience = 0;
let encounter = [];

addPartyMemberToSite();
parseSlider();

lightMode.addEventListener("click", () => {
  const partyMember = document.querySelectorAll(".party-member");
  darkMode.classList.remove("hide");
  lightMode.classList.add("hide");
  body.classList.add("dark");
  navbar.classList.add("dark");
  dndLogo.classList.add("dark");
  encounterParty.classList.add("dark");
  encounterSettings.classList.add("dark");
  encounterOutput.classList.add("dark");
  headings.forEach((heading) => heading.classList.add("dark"));
  for (let i = 0; i < h3.length; i++) {
    h3[i].classList.add("dark");
  }
  partyControl.classList.add("dark");
  settingsForm.classList.add("dark");
  partyMember.forEach((member) => member.classList.add("dark"));
  slider.classList.add("dark");
  checkmark.classList.add("dark");
  encounterControl.classList.add("dark");
  encounterMonsters.classList.add("dark");
  footer.classList.add("dark");
});

darkMode.addEventListener("click", () => {
  const partyMember = document.querySelectorAll(".party-member");
  lightMode.classList.remove("hide");
  darkMode.classList.add("hide");
  body.classList.remove("dark");
  navbar.classList.remove("dark");
  dndLogo.classList.remove("dark");
  encounterParty.classList.remove("dark");
  encounterSettings.classList.remove("dark");
  encounterOutput.classList.remove("dark");
  headings.forEach((heading) => heading.classList.remove("dark"));
  for (let i = 0; i < h3.length; i++) {
    h3[i].classList.remove("dark");
  }
  partyControl.classList.remove("dark");
  settingsForm.classList.remove("dark");
  partyMember.forEach((member) => member.classList.remove("dark"));
  slider.classList.remove("dark");
  checkmark.classList.remove("dark");
  encounterControl.classList.remove("dark");
  encounterMonsters.classList.remove("dark");
  footer.classList.remove("dark");
});

addMemberBtn.addEventListener("click", () => {
  if (playerList.length < 10) {
    playerList.push(`Player ${playerList.length + 1}`);
    if (partyMembers.children.length < 10) {
      addPartyMemberToSite();
    }
  }
});

removeMemberBtn.addEventListener("click", () => {
  if (playerList.length > 1) {
    const removeEl = document.querySelector(
      `.party-member-${playerList.length}`
    );
    removeEl.remove();
    playerList.pop();
  }
});

function addPartyMemberToSite() {
  const playerLevels = document.querySelectorAll(".player-level");
  const last = playerLevels[playerLevels.length - 1];
  let dark = false;
  let level = 3;
  if (playerList.length > 1) {
    level = last.value;
  }
  if (body.classList.contains("dark")) {
    dark = true;
  }
  const partyMemberEl = document.createElement("div");
  partyMemberEl.classList.add(
    `party-member`,
    `party-member-${playerList.length}`
  );
  if (dark) {
    partyMemberEl.classList.add(`dark`);
  }
  playerList.forEach((player) => {
    const playerStr = player.split(" ").join("-").toLowerCase();
    partyMemberEl.innerHTML = `
      <label class="player-label" for="${playerStr}-level">${player}</label>
      <input
        type="number"
        class="player-level"
        name="${playerStr}-level"
        min="1"
        max="20"
        value="${level}"
      />
    `;
    partyMembers.appendChild(partyMemberEl);
  });
}

slider.addEventListener("input", parseSlider);

function parseSlider() {
  switch (slider.value) {
    case "0":
      checkbox.disabled = false;
      sliderText.innerText = "easy";
      break;
    case "1":
      checkbox.disabled = false;
      sliderText.innerText = "medium";
      break;
    case "2":
      checkbox.disabled = false;
      sliderText.innerText = "hard";
      break;
    case "3":
      checkbox.disabled = false;
      sliderText.innerText = "deadly";
      break;
    case "4":
      sliderText.innerText = "random";
      checkbox.checked = false;
      checkbox.disabled = true;
      break;
    default:
      slider.value = "1";
      checkbox.disabled = false;
      sliderText.innerText = "medium";
  }
}

addMonsterBtn.addEventListener("click", () => {
  const amount = monsterAmount.value;
  const monsterId = +select.options[select.selectedIndex].dataset.arrayIndex;

  for (let i = 0; i < amount; i++) {
    encounter.push(monsterId);
  }
  monsterAmount.value = 1;
  addMonstersToEncounter();
});

function addMonstersToEncounter() {
  encounterMonsters.replaceChildren();

  const hl_1 = `<hr class="hl-1" />`;
  const hl_2 = `<hr class="hl-2" />`;

  if (encounterMonsters.childElementCount === 0) {
    const topLineEl = document.createElement("div");
    topLineEl.innerHTML = hl_2;
    encounterMonsters.appendChild(topLineEl);
  }
  let monsterArray = encounter.sort((a, b) => a - b);

  function countMonsters(arr) {
    return arr.reduce(function (ac, b) {
      ac[b] = ac[b] + 1 || 1;
      return ac;
    }, {});
  }

  const countedMonsters = countMonsters(monsterArray);
  for (const [key, value] of Object.entries(countedMonsters)) {
    const div = document.createElement("div");
    const monsterName = document.createElement("div");
    const monsterSize = document.createElement("div");
    const monsterCR = document.createElement("div");
    const monsterXP = document.createElement("div");
    const deleteMonster = document.createElement("div");

    monsterName.classList.add("monster-name");
    monsterName.innerHTML = `${value} x ${select.options[+key].dataset.name}`;

    monsterSize.classList.add("monster-size");
    monsterSize.innerHTML = `${select.options[+key].dataset.size}`;

    monsterCR.classList.add("monster-challenge-rating");

    let crValue = +select.options[+key].dataset.challengeRating;
    let crOutput = "";
    if (crValue < 1 && crValue !== 0) {
      crOutput = `1/${1 / crValue}`;
    } else {
      crOutput = crValue;
    }
    monsterCR.innerHTML = `CR: ${crOutput}`;

    monsterXP.classList.add("monster-xp");
    let xpValue = formatXp(
      select.options[+key].dataset.xp * value * getMultiplier(encounter.length)
    );
    monsterXP.innerHTML = `XP: ${xpValue}`;

    deleteMonster.classList.add("delete-monster");
    deleteMonster.setAttribute("data-monster-id", key);
    deleteMonster.innerHTML = `<i id="delete-monster-entry" class="fa-solid fa-xmark delete-monster-entry"></i>`;

    div.classList.add("monster-entry");

    div.appendChild(monsterName);
    div.appendChild(monsterSize);
    div.appendChild(monsterCR);
    div.appendChild(monsterXP);
    div.appendChild(deleteMonster);

    encounterMonsters.appendChild(div);

    const horizontalLine = document.createElement("div");
    horizontalLine.innerHTML = `
      ${hl_1}
    `;
    encounterMonsters.appendChild(horizontalLine);
  }
  addEncounterInfo();
}

encounterMonsters.addEventListener("click", (e) => {
  console.log("hello");
  console.log(encounter);
  const monsterId = +e.target.parentElement.dataset.monsterId;
  encounter = encounter.filter((entry) => {
    if (entry !== monsterId) {
      return entry;
    }
  });
  addMonstersToEncounter();
  console.log(encounter);
  if (encounter.length === 0) {
    encounterMonsters.replaceChildren();
  }
  console.log(encounter);
});

function formatXp(num) {
  let xpFormatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumSignificantDigits: 3,
  });
  return xpFormatter.format(num);
}

function addEncounterInfo() {
  const encounterInfoContainerEl = document.createElement("div");
  encounterInfoContainerEl.classList.add("encounter-info");
  const encounterExperienceEl = document.createElement("div");
  encounterExperienceEl.classList.add("encounter-experience");
  const encounterDifficultyEl = document.createElement("div");
  encounterDifficultyEl.classList.add("encounter-difficulty");

  encounterExperienceEl.innerText = `Encounter XP: ` + formatXp(generateXp());

  encounterInfoContainerEl.appendChild(encounterExperienceEl);
  encounterInfoContainerEl.appendChild(encounterDifficultyEl);
  encounterMonsters.appendChild(encounterInfoContainerEl);
}

clearEncounterBtn.addEventListener("click", () => {
  encounterExperience = 0;
  encounter = [];
  encounterMonsters.replaceChildren();
});

generateEncounterBtn.addEventListener("click", () => {
  encounterExperience = 0;
  encounter = [];
  generateEncounter();
});

function generateEncounter() {
  const playerLevels = document.querySelectorAll(".player-level");

  let playerEasy = 0;
  let playerMedium = 0;
  let playerHard = 0;
  let playerDeadly = 0;
  let playerLevelAvg = 0;
  let monsterQuantity = 0;
  let variance = 0;
  let randomEncounter = false;

  if (+slider.value < 4) {
    variance = +slider.value;
  } else if (+slider.value === 4) {
    randomEncounter = true;
  }
  const biggerMonsters = checkbox.checked;

  if (biggerMonsters) {
    monsterQuantity = 2;
  } else {
    monsterQuantity = 5;
  }

  const easyEncounter = [
    25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400,
    1600, 2000, 2100, 2400, 2800,
  ];

  const mediumEncounter = [
    50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500,
    2800, 3200, 3900, 4200, 4900, 5700,
  ];

  const hardEncounter = [
    75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800,
    4300, 4800, 5900, 6300, 7300, 8500,
  ];

  const deadlyEncounter = [
    100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100,
    5700, 6400, 7200, 8800, 9500, 10900, 12700,
  ];

  playerLevels.forEach((playerLevel) => {
    playerLevelAvg += +playerLevel.value;
    playerEasy += easyEncounter[+playerLevel.value - 1];
    playerMedium += mediumEncounter[+playerLevel.value - 1];
    playerHard += hardEncounter[+playerLevel.value - 1];
    playerDeadly += deadlyEncounter[+playerLevel.value - 1];
  });

  playerLevelAvg = Math.ceil(playerLevelAvg / playerLevels.length);

  const playerPower = [
    easyEncounter[playerLevelAvg - 1],
    mediumEncounter[playerLevelAvg - 1],
    hardEncounter[playerLevelAvg - 1],
    deadlyEncounter[playerLevelAvg - 1],
  ];

  const partyPower = [playerEasy, playerMedium, playerHard, playerDeadly];

  const partyLowerXpBound = partyPower[variance] - playerPower[variance];
  const partyHigherXpBound = partyPower[variance] + playerPower[variance];

  const monsterArray = [...select.options];

  let filteredMonsters = [];
  let amount = Math.ceil(Math.random() * monsterQuantity);

  do {
    let multiplier = getMultiplier(amount);
    let mappedMonsters = monsterArray.map((option) => {
      if (
        option.dataset.xp >
          Math.ceil(partyLowerXpBound / (amount * multiplier)) &&
        option.dataset.xp <
          Math.ceil(partyHigherXpBound / (amount * multiplier))
      ) {
        return option;
      }
    });
    filteredMonsters = mappedMonsters.filter((option) => option !== undefined);
    if (filteredMonsters.length === 0) amount++;
  } while (filteredMonsters.length === 0);

  if (!randomEncounter) {
    generateMonster(filteredMonsters, amount);
  } else {
    amount = Math.ceil(Math.random() * 20);
    generateMonster(select.options, amount);
  }
}

function generateMonster(monsters, amount) {
  for (let i = 0; i < amount; i++) {
    let monsterIndex = 0;

    monsterIndex = Math.ceil(Math.random() * monsters.length) - 1;
    encounter.push(+monsters[monsterIndex].dataset.arrayIndex);
  }
  addMonstersToEncounter();
}

function getMultiplier(amount) {
  if (amount === 1) {
    return 1;
  } else if (amount === 2) {
    return 1.5;
  } else if (amount >= 3 && amount <= 6) {
    return 2;
  } else if (amount >= 7 && amount <= 10) {
    return 2.5;
  } else if (amount >= 11 && amount <= 14) {
    return 3;
  } else if (amount >= 15) {
    return 4;
  }
}

function generateXp() {
  const multiplier = getMultiplier(encounter.length);
  let xpSum = 0;
  for (let i = 0; i < encounter.length; i++) {
    xpSum += +select.options[encounter[i]].dataset.xp;
  }
  return xpSum * multiplier;
}
