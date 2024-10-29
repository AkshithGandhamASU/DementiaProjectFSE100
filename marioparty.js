class marioParty{
button1;
x1;x2;
sound;
score = 0;
highscore;
constructor(button1){

}
// class marioParty{
// let craftingtable_background_image;
// let button1;
// let x1,x2;
// let sound;
// let score = 0;
// let highscore;
// }

// function preload() {
// craftingtable_background_image = loadImage()
// }

// }




let items = [];            // Array to store each item and its position
let originalOrder = [];     // Array to keep the correct order of items
let playerOrder = [];       // Array to store the shuffled order for the player
let images = [];            // Array to store item images
let easyBackgroundImg;      // Background image for easy difficulty
let hardBackgroundImg;      // Background image for hard difficulty
let currentBackground;      // Currently displayed background image
let revealed = true;        // Boolean to control whether items are revealed or hidden
let revealTime = 3000;      // Time in milliseconds for which the correct order is shown (3 seconds)
let tileSize = 80;          // Size for each item image
let selectedItem = null;    // Variable to store the currently selected item

let difficulty = 4;         // Default difficulty (4 items)
let gameState = "menu";     // Game state: "menu" or "play"

// Target positions for each difficulty setting
let targetPositions = {
  4: [
    { x: 150, y: 150 },
    { x: 300, y: 150 },
    { x: 150, y: 300 },
    { x: 300, y: 300 }
  ],
  9: [
    { x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 },
    { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 },
    { x: 100, y: 300 }, { x: 200, y: 300 }, { x: 300, y: 300 }
  ]
};

function preload() {
  // Load item images
  for (let i = 0; i < 9; i++) { // Load up to 9 images for the harder difficulty
    images[i] = loadImage(`assets/MessyMemory/mariopartyItem${i + 1}.jpg`); // Assumes images are named item1.jpg, item2.jpg, etc.
  }
  // Load background images for easy and hard difficulties
  easyBackgroundImg = loadImage('assets/MessyMemory/craftingTable_easy.jpg'); // Replace with your easy difficulty background path
  hardBackgroundImg = loadImage('assets/MessyMemory/craftingTable_hard.jpg'); // Replace with your hard difficulty background path
}

function setup() {
  createCanvas(600, 400);   // Set the canvas size to match the background or as needed
  textSize(32);
  textAlign(CENTER, CENTER);
}

function initializeItems() {
  items = [];               // Clear items array for fresh initialization
  originalOrder = [];       // Clear original order array

  // Set the correct background image based on difficulty
  currentBackground = difficulty === 4 ? easyBackgroundImg : hardBackgroundImg;

  // Initialize items and their positions based on difficulty
  for (let i = 0; i < difficulty; i++) {
    let target = targetPositions[difficulty][i]; // Get target position based on difficulty
    items.push({
      id: i,               // Assign each item an ID for reference
      x: random(width - tileSize), // Start each item at a random x position
      y: random(height - tileSize), // Start each item at a random y position
      targetX: target.x,   // Target x position for item
      targetY: target.y    // Target y position for item
    });
    originalOrder.push(i); // Store the correct order of item IDs
  }
  
  // Shuffle playerOrder for the memory test, to randomize item positions
  playerOrder = shuffle([...originalOrder]);

  // Show items briefly before hiding
  revealed = true;
  setTimeout(() => revealed = false, revealTime);
}

function draw() {
  if (gameState === "menu") {
    drawMenu();             // Draw the start menu
  } else if (gameState === "play") {
    drawGame();             // Draw the game
  }
}

function drawMenu() {
  background(100, 150, 250); // Menu background color
  textSize(32);
  fill(255);
  text("Select Difficulty", width / 2, height / 3);

  // Draw buttons
  textSize(24);
  fill(0, 200, 0);
  rect(width / 2 - 100, height / 2 - 30, 200, 50, 10);  // Easy button
  fill(255);
  text("Easy", width / 2, height / 2 - 5);

  fill(200, 0, 0);
  rect(width / 2 - 100, height / 2 + 40, 200, 50, 10);  // Hard button
  fill(255);
  text("Hard", width / 2, height / 2 + 65);
}

function mousePressed() {
  if (gameState === "menu") {
    // Check if "Easy" button was clicked
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
      difficulty = 4;       // Set difficulty to Easy
      gameState = "play";   // Switch to game state
      initializeItems();    // Initialize items for easy difficulty
    }

    // Check if "Hard" button was clicked
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
      difficulty = 9;       // Set difficulty to Hard
      gameState = "play";   // Switch to game state
      initializeItems();    // Initialize items for hard difficulty
    }
  } else if (gameState === "play") {
    // Check if an item has been clicked on (only active when items are hidden)
    if (!revealed) {
      for (let i = 0; i < playerOrder.length; i++) {
        let item = items[playerOrder[i]];   // Get each item in current player order
        
        // Check if mouse is within the item’s boundaries
        if (mouseX > item.x && mouseX < item.x + tileSize &&
            mouseY > item.y && mouseY < item.y + tileSize) {
          selectedItem = i;  // Select the item to be dragged
          break;
        }
      }
    }
  }
}

function drawGame() {
  background(200);          // Set background color
  
  // Draw the current background image on the canvas
  image(currentBackground, 0, 0, width, height);
  
  // Display items on the screen based on whether they’re revealed or shuffled
  for (let i = 0; i < playerOrder.length; i++) {
    let item = items[playerOrder[i]];   // Get item based on current player order
    
    if (revealed) {
      // Display item images at their correct positions if revealed
      image(images[item.id], item.targetX, item.targetY, tileSize, tileSize);
    } else {
      // Display item at current position, to be dragged and dropped
      image(images[item.id], item.x, item.y, tileSize, tileSize);
    }
  }
  
  // Display instructions for the player
  fill(0);
  textSize(16);
  if (revealed) {
    text("Memorize the order!", width / 2, 50); // Instruction for memorization phase
  } else {
    text("Drag items to rearrange", width / 2, 50); // Instruction for rearranging phase
  }
}

// Drag and drop functionality
function mouseDragged() {
  if (!revealed && selectedItem !== null) {
    let item = items[playerOrder[selectedItem]];
    item.x = mouseX - tileSize / 2;
    item.y = mouseY - tileSize / 2;
  }
}

function mouseReleased() {
  if (!revealed && selectedItem !== null) {
    let item = items[playerOrder[selectedItem]];
    let closestTarget = targetPositions[difficulty].reduce((closest, pos) => {
      return dist(item.x, item.y, pos.x, pos.y) < dist(item.x, item.y, closest.x, closest.y) ? pos : closest;
    });
    item.x = closestTarget.x;
    item.y = closestTarget.y;
    selectedItem = null;
    if (checkResult()) {
      revealed = true;
      textSize(32);
      fill(0, 255, 0);
      text("Correct Order!", width / 2, height / 2);
    }
  }
}

function checkResult() {
  for (let i = 0; i < playerOrder.length; i++) {
    let item = items[playerOrder[i]];
    let target = targetPositions[difficulty][i];
    if (item.x !== target.x || item.y !== target.y) return false;
  }
  return true;
}