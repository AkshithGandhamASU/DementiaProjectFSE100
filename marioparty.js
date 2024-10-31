class MarioParty{

    items = [];            
    originalOrder = [];     
    playerOrder = [];       
    images = [];           
    backgroundImg;      
    currentBackground;      
    revealed = true;        
    revealTime = 5000;     
    tileSize = 80;       
    selectedItem = null;    
    difficulty = 4;       

    gameState;

    started;
    finished;

    constructor(backgroundImg, images) {
        this.images = images;
        this.backgroundImg = backgroundImg;
        this.gameState = "menu";
        this.finished = false;
    }

    
    targetPositions = [
        { x: 150, y: 150 },
        { x: 300, y: 150 },
        { x: 150, y: 300 },
        { x: 300, y: 300 }
    ];


    setup() {
        resizeCanvas(600, 600);  
        textSize(32);
        textAlign(CENTER, CENTER);
        this.gameState = "menu";
        console.log("setup" + this.gameState);
        this.started = true;
    }

    initializeItems() {
        this.items = [];               
        this.originalOrder = [];       
       
        this.currentBackground = this.backgroundImg;

        let modifiers = [
            {x: -1, y: -1},
            {x: +1, y: -1},
            {x: -1, y: +1},
            {x: +1, y: +1},
        ];

       
        for (let i = 0; i < 4; i++) {
            let target = this.targetPositions[i]; 
            this.items.push({
                id: i + (this.difficulty * 9),              
                x: random(width - this.tileSize), 
                y: random(height - this.tileSize), 
                targetX: target.x + ((this.tileSize/2) * modifiers[i].x),  
                targetY: target.y + ((this.tileSize/2) * modifiers[i].y)   
            });
            this.originalOrder.push(i); 
        }
        
       
        this.playerOrder = ([...this.originalOrder]);
        for (let i = this.playerOrder.length - 1; i > 0; i--) {
           
            const j = Math.floor(Math.random() * (i + 1));
            
         
            [this.playerOrder[i], this.playerOrder[j]] = [this.playerOrder[j], this.playerOrder[i]];
            [this.targetPositions[i], this.targetPositions[j]] = [this.targetPositions[j], this.targetPositions[i]];

        }

       
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
            this.drawMenu();          
        }
        else if (this.gameState == "play") {
            this.drawGame();           
    }

    drawMenu() {
        background(100, 150, 250);
        textSize(32);
        fill(255);
        text("Select difficulty", width / 2, height / 3);

       
        textSize(24);
        fill(0, 200, 0);
        rect(width / 2 - 100, height / 2 - 30, 200, 50, 10);  
        fill(255);
        text("Easy", width / 2, height / 2 - 5);

        fill(200, 0, 0);
        rect(width / 2 - 100, height / 2 + 40, 200, 50, 10);  
        fill(255);
        text("Hard", width / 2, height / 2 + 65);
    }

    mousePressed() {
        if (this.gameState == "menu") {
            
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
              this.difficulty = 0;       
              this.gameState = "play";   
              this.initializeItems();    
            }

          
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
              this.difficulty = 1;       
              this.gameState = "play";   
              this.initializeItems();    
            }
        } else if (this.gameState == "play") {
       
            if (!this.revealed) {
            for (let i = 0; i < this.playerOrder.length; i++) {
                let item = this.items[this.playerOrder[i]]; 
                
              
                if (mouseX > item.x && mouseX < item.x + this.tileSize &&
                    mouseY > item.y && mouseY < item.y + this.tileSize) {
                    this.selectedItem = i;  
                    console.log(this.selectedItem);
                    break;
                }
            }
            }
        }
    }

    drawGame() {
        background(200);         
       
        image(this.backgroundImg, 0, 0, width, height);
        
        
        for (let i = 0; i < this.playerOrder.length; i++) {
            let item = this.items[this.playerOrder[i]];  
            
            if (this.revealed) {
           
                image(this.images[item.id], item.targetX, item.targetY, this.tileSize, this.tileSize);
            } else {
           
                image(this.images[item.id], item.x, item.y, this.tileSize, this.tileSize);
            }
        }
        
       
        fill(0);
        textSize(16);
        if (this.revealed) {
            text("Memorize the order!", width / 2, 50); 
        } else {
            text("Drag items to rearrange", width / 2, 50); 
        }
    }

   
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