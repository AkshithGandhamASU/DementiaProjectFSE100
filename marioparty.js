class MarioParty{

    items = [];            // Array to store each item and its position
    originalOrder = [];     // Array to keep the correct order of this.items
    playerOrder = [];       // Array to store the shuffled order for the player
    images = [];            // Array to store item this.images
    backgroundImg;      // Background image for easy this.difficulty
    currentBackground;      // Currently displayed background image
    revealed = true;        // Boolean to control whether this.items are this.revealed or hidden
    revealTime = 5000;      // Time in milliseconds for which the correct order is shown (3 seconds)
    tileSize = 80;          // Size for each item image
    selectedItem = null;    // Variable to store the currently selected item

    difficulty = 4;         // Default this.difficulty (4 this.items)

    gameState;

    started;
    finished;

    constructor(backgroundImg, images) {
        this.images = images;
        this.backgroundImg = backgroundImg;
        this.gameState = "menu";
        this.finished = false;
    }

    // Target positions for each this.difficulty setting
    targetPositions = [
        { x: 150, y: 150 },
        { x: 300, y: 150 },
        { x: 150, y: 300 },
        { x: 300, y: 300 }
    ];


    setup() {
        resizeCanvas(600, 600);   // Set the canvas size to match the background or as needed
        textSize(32);
        textAlign(CENTER, CENTER);
        this.gameState = "menu";
        console.log("setup" + this.gameState);
        this.started = true;
    }

    initializeItems() {
        this.items = [];               // Clear this.items array for fresh initialization
        this.originalOrder = [];       // Clear original order array

        // Set the correct background image based on this.difficulty
        this.currentBackground = this.backgroundImg;

        let modifiers = [
            {x: -1, y: -1},
            {x: +1, y: -1},
            {x: -1, y: +1},
            {x: +1, y: +1},
        ];

        // Initialize this.items and their positions based on this.difficulty
        for (let i = 0; i < 4; i++) {
            let target = this.targetPositions[i]; // Get target position based on this.difficulty
            this.items.push({
                id: i + (this.difficulty * 9),               // Assign each item an ID for reference
                x: random(width - this.tileSize), // Start each item at a random x position
                y: random(height - this.tileSize), // Start each item at a random y position
                targetX: target.x + ((this.tileSize/2) * modifiers[i].x),   // Target x position for item
                targetY: target.y + ((this.tileSize/2) * modifiers[i].y)   // Target y position for item
            });
            this.originalOrder.push(i); // Store the correct order of item IDs
        }
        
        // Shuffle this.playerOrder for the memory test, to randomize item positions
        this.playerOrder = ([...this.originalOrder]);
        for (let i = this.playerOrder.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));
            
            // Swap elements at index i and j
            [this.playerOrder[i], this.playerOrder[j]] = [this.playerOrder[j], this.playerOrder[i]];
            [this.targetPositions[i], this.targetPositions[j]] = [this.targetPositions[j], this.targetPositions[i]];

        }

        // Show this.items briefly before hiding
        this.revealed = true;
        setTimeout(() => this.revealed = false, this.revealTime - (2000*this.difficulty));
    }

    draw() {
        if(this.started) {
            this.gameState = "menu";
            this.started = false;
        }
        
        console.log(this.gameState);
        
        if (this.gameState == "menu") {
            this.drawMenu();             // Draw the start menu
        }
        else if (this.gameState == "play") {
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
        if (this.gameState == "menu") {
            // Check if "Easy" button was clicked
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
              this.difficulty = 0;       // Set this.difficulty to Easy
              this.gameState = "play";   // Switch to game state
              this.initializeItems();    // Initialize this.items for easy this.difficulty
            }

            // Check if "Hard" button was clicked
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
              this.difficulty = 1;       // Set this.difficulty to Hard
              this.gameState = "play";   // Switch to game state
              this.initializeItems();    // Initialize this.items for hard this.difficulty
            }
        } else if (this.gameState == "play") {
            // Check if an item has been clicked on (only active when this.items are hidden)
            if (!this.revealed) {
            for (let i = 0; i < this.playerOrder.length; i++) {
                let item = this.items[this.playerOrder[i]];   // Get each item in current player order
                
                // Check if mouse is within the item’s boundaries
                if (mouseX > item.x && mouseX < item.x + this.tileSize &&
                    mouseY > item.y && mouseY < item.y + this.tileSize) {
                    this.selectedItem = i;  // Select the item to be dragged
                    console.log(this.selectedItem);
                    break;
                }
            }
            }
        }
    }

    drawGame() {
        background(200);          // Set background color
        
        // Draw the current background image on the canvas
        image(this.backgroundImg, 0, 0, width, height);
        
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

    getFinished() {
        return this.finished;
    }

    mouseReleased() {
        if (!this.revealed && this.selectedItem !== null) {
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
        console.log("Checking result");
        for (let i = 0; i < this.playerOrder.length; i++) {
            let item = this.items[this.playerOrder[i]];
            let target = this.targetPositions[i];
            console.log("Item ", item.x, item.y);
            console.log(target);
            let within_x = (item.x <= (target.x + width/(4))) && (item.x >= (target.x - width/(4)));
            let within_y = (item.y <= (target.y + height/(4))) && (item.y >= (target.y - height/(4)));
            console.log((target.x + width/(4)), (target.x - width/(4)), within_x);
            console.log((target.y + height/(4)), (target.y - height/(4)), within_y);
            if (!within_x||!within_y) return false;
        }
        return true;
    }

}