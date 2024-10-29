class MarioParty{

    items = [];            // Array to store each item and its position
    originalOrder = [];     // Array to keep the correct order of this.items
    playerOrder = [];       // Array to store the shuffled order for the player
    images = [];            // Array to store item this.images
    easyBackgroundImg;      // Background image for easy this.difficulty
    hardBackgroundImg;      // Background image for hard this.difficulty
    currentBackground;      // Currently displayed background image
    revealed = true;        // Boolean to control whether this.items are this.revealed or hidden
    revealTime = 3000;      // Time in milliseconds for which the correct order is shown (3 seconds)
    tileSize = 80;          // Size for each item image
    selectedItem = null;    // Variable to store the currently selected item

    difficulty = 4;         // Default this.difficulty (4 this.items)

    gameState;

    constructor(easyBackgroundImg, hardBackgroundImg, images) {
        this.images = images;
        this.hardBackgroundImg = hardBackgroundImg;
        this.easyBackgroundImg = easyBackgroundImg;
        this.gameState = "menu";
    }

    // Target positions for each this.difficulty setting
    targetPositions = {
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


    setup() {
        resizeCanvas(600, 400);   // Set the canvas size to match the background or as needed
        textSize(32);
        textAlign(CENTER, CENTER);
    }

    initializeItems() {
        this.items = [];               // Clear this.items array for fresh initialization
        this.originalOrder = [];       // Clear original order array

        // Set the correct background image based on this.difficulty
        this.currentBackground = this.difficulty === 4 ? this.easyBackgroundImg : this.hardBackgroundImg;

        // Initialize this.items and their positions based on this.difficulty
        for (let i = 0; i < this.difficulty; i++) {
            let target = this.targetPositions[this.difficulty][i]; // Get target position based on this.difficulty
            this.items.push({
                id: i,               // Assign each item an ID for reference
                x: random(width - this.tileSize), // Start each item at a random x position
                y: random(height - this.tileSize), // Start each item at a random y position
                targetX: target.x,   // Target x position for item
                targetY: target.y    // Target y position for item
            });
            this.originalOrder.push(i); // Store the correct order of item IDs
        }
        
        // Shuffle this.playerOrder for the memory test, to randomize item positions
        this.playerOrder = shuffle([...this.originalOrder]);

        // Show this.items briefly before hiding
        this.revealed = true;
        setTimeout(() => this.revealed = false, this.revealTime);
    }

    draw() {
        if (this.gameState === "menu") {
            this.drawMenu();             // Draw the start menu
        } else if (this.gameState === "play") {
            this.drawGame();             // Draw the game
        }
    }

    drawMenu() {
        background(100, 150, 250); // Menu background color
        textSize(32);
        fill(255);
        text("Select difficulty", width / 2, height / 3);

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

    mousePressed() {
        if (this.gameState === "menu") {
            // Check if "Easy" button was clicked
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
              this.difficulty = 4;       // Set this.difficulty to Easy
              this.gameState = "play";   // Switch to game state
              this.initializeItems();    // Initialize this.items for easy this.difficulty
            }

            // Check if "Hard" button was clicked
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
              this.difficulty = 9;       // Set this.difficulty to Hard
              this.gameState = "play";   // Switch to game state
              this.initializeItems();    // Initialize this.items for hard this.difficulty
            }
        } else if (this.gameState === "play") {
            // Check if an item has been clicked on (only active when this.items are hidden)
            if (!this.revealed) {
            for (let i = 0; i < this.playerOrder.length; i++) {
                let item = this.items[this.playerOrder[i]];   // Get each item in current player order
                
                // Check if mouse is within the item’s boundaries
                if (mouseX > item.x && mouseX < item.x + this.tileSize &&
                    mouseY > item.y && mouseY < item.y + this.tileSize) {
                this.selectedItem = i;  // Select the item to be dragged
                break;
                }
            }
            }
        }
    }

    drawGame() {
        background(200);          // Set background color
        
        // Draw the current background image on the canvas
        image(this.currentBackground, 0, 0, width, height);
        
        // Display this.items on the screen based on whether they’re this.revealed or shuffled
        for (let i = 0; i < this.playerOrder.length; i++) {
            let item = this.items[this.playerOrder[i]];   // Get item based on current player order
            
            if (this.revealed) {
            // Display item this.images at their correct positions if this.revealed
            image(this.images[item.id], item.targetX, item.targetY, this.tileSize, this.tileSize);
            } else {
            // Display item at current position, to be dragged and dropped
            image(this.images[item.id], item.x, item.y, this.tileSize, this.tileSize);
            }
        }
        
        // Display instructions for the player
        fill(0);
        textSize(16);
        if (this.revealed) {
            text("Memorize the order!", width / 2, 50); // Instruction for memorization phase
        } else {
            text("Drag items to rearrange", width / 2, 50); // Instruction for rearranging phase
        }
    }

    // Drag and drop functionality
    mouseDragged() {
        if (!this.revealed && this.selectedItem !== null) {
            let item = this.items[this.playerOrder[this.selectedItem]];
            item.x = mouseX;
            item.y = mouseY;
        }
    }

    mouseReleased() {
        if (!this.revealed && this.selectedItem !== null) {
            let item = this.items[this.playerOrder[this.selectedItem]];
            let closestTarget = this.targetPositions[this.difficulty].reduce((closest, pos) => {
            return dist(item.x, item.y, pos.x, pos.y) < dist(item.x, item.y, closest.x, closest.y) ? pos : closest;
            });
            item.x = closestTarget.x;
            item.y = closestTarget.y;
            this.selectedItem = null;
            if (this.checkResult()) {
                this.revealed = true;
                textSize(32);
                fill(0, 255, 0);
                text("Correct Order!", width / 2, height / 2);
            }
        }
    }

    checkResult() {
        for (let i = 0; i < this.playerOrder.length; i++) {
            let item = this.items[this.playerOrder[i]];
            let target = this.targetPositions[this.difficulty][i];
            if (item.x !== target.x || item.y !== target.y) return false;
        }
        return true;
    }

}