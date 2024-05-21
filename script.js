// Initial player stats
let xp = 0; // Experience points
let health = 100; // Player's health
let gold = 50; // Player's gold
let currentWeapon = 0; // Index of the current weapon in the weapons array
let fighting; // Index of the current monster in the monsters array
let monsterHealth; // Health of the current monster
let inventory = ["stick"]; // Player's inventory containing weapons

// Select HTML elements
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Array of weapons with their respective power levels
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// Array of monsters with their respective levels and health
const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

// Different locations in the game, each with their own buttons, functions, and text
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// Initialize buttons with default actions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Function to update the game interface based on the current location
function update(location) {
  monsterStats.style.display = "none"; // Hide monster stats by default
  button1.innerText = location["button text"][0]; // Set text for button1
  button2.innerText = location["button text"][1]; // Set text for button2
  button3.innerText = location["button text"][2]; // Set text for button3
  button1.onclick = location["button functions"][0]; // Set function for button1
  button2.onclick = location["button functions"][1]; // Set function for button2
  button3.onclick = location["button functions"][2]; // Set function for button3
  text.innerHTML = location.text; // Set the main text for the location
}

// Functions to navigate to different locations
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// Function to buy health in the store
function buyHealth() {
  if (gold >= 10) { // Check if player has enough gold
    gold -= 10;
    health += 10;
    goldText.innerText = gold; // Update gold display
    healthText.innerText = health; // Update health display
  } else {
    text.innerText = "You do not have enough gold to buy health."; // Not enough gold message
  }
}

// Function to buy a weapon in the store
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) { // Check if there are more powerful weapons available
    if (gold >= 30) { // Check if player has enough gold
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold; // Update gold display
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + "."; // Display new weapon message
      inventory.push(newWeapon); // Add new weapon to inventory
      text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."; // Not enough gold message
    }
  } else {
    text.innerText = "You already have the most powerful weapon!"; // Most powerful weapon message
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon; // Change button2 action to sell weapon
  }
}

// Function to sell a weapon
function sellWeapon() {
  if (inventory.length > 1) { // Ensure player has more than one weapon
    gold += 15;
    goldText.innerText = gold; // Update gold display
    let currentWeapon = inventory.shift(); // Remove the first weapon from inventory
    text.innerText = "You sold a " + currentWeapon + "."; // Display sold weapon message
    text.innerText += " In your inventory you have: " + inventory.join(", ");
  } else {
    text.innerText = "Don't sell your only weapon!"; // Cannot sell the only weapon message
  }
}

// Functions to start fights with different monsters
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

// Function to set up the fight interface
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health; // Set monster health
  monsterStats.style.display = "block"; // Show monster stats
  monsterName.innerText = monsters[fighting].name; // Set monster name
  monsterHealthText.innerText = monsterHealth; // Display monster health
}

// Function to handle attack action
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; // Monster attacks message
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // Player attacks message
  health -= getMonsterAttackValue(monsters[fighting].level); // Reduce player health by monster attack value
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Reduce monster health by player's weapon power and random XP
  } else {
    text.innerText += " You miss."; // Player misses attack message
  }
  healthText.innerText = health; // Update player health display
  monsterHealthText.innerText = monsterHealth; // Update monster health display
  if (health <= 0) {
    lose(); // Player loses if health is 0 or less
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame(); // Player wins if the dragon is defeated
    } else {
      defeatMonster(); // Player defeats the monster
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks."; // Randomly break a weapon
    currentWeapon--;
  }
}

// Function to get the monster's attack value
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0; // Return attack value, ensuring it's not negative
}

// Function to determine if the monster is hit by the player
function isMonsterHit() {
  return Math.random() > .2 || health < 20; // Higher chance to hit if health is low
}

// Function to handle dodge action
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name; // Dodge message
}

// Function to handle monster defeat
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // Increase gold based on monster level
  xp += monsters[fighting].level; // Increase XP based on monster level
  goldText.innerText = gold; // Update gold display
  xpText.innerText = xp; // Update XP display
  update(locations[4]); // Update to "kill monster" location
}

// Function to handle player loss
function lose() {
  update(locations[5]); // Update to "lose" location
}

// Function to handle game win
function winGame() {
  update(locations[6]); // Update to "win" location
}

// Function to restart the game with initial values
function restart() {
  xp = 0; // Reset experience points to 0
  health = 100; // Reset health to 100
  gold = 50; // Reset gold to 50
  currentWeapon = 0; // Reset to the first weapon (stick)
  inventory = ["stick"]; // Reset inventory to only have the stick
  goldText.innerText = gold; // Update gold display
  healthText.innerText = health; // Update health display
  xpText.innerText = xp; // Update XP display
  goTown(); // Go back to the town square
}

// Function to handle the easter egg location
function easterEgg() {
  update(locations[7]); // Update to the "easter egg" location
}

// Function to pick the number 2 in the easter egg game
function pickTwo() {
  pick(2); // Call pick function with guess 2
}

// Function to pick the number 8 in the easter egg game
function pickEight() {
  pick(8); // Call pick function with guess 8
}

// Function to handle picking a number in the easter egg game
function pick(guess) {
  const numbers = []; // Array to store 10 random numbers
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11)); // Generate random numbers between 0 and 10
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // Display player's guess
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"; // Display each random number
  }
  if (numbers.includes(guess)) { // Check if the guess is in the random numbers
    text.innerText += "Right! You win 20 gold!";
    gold += 20; // Add 20 gold if guess is correct
    goldText.innerText = gold; // Update gold display
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10; // Subtract 10 health if guess is wrong
    healthText.innerText = health; // Update health display
    if (health <= 0) { // Check if health is 0 or less
      lose(); // Call lose function if player has no health left
    }
  }
}
}
