//Akshith Gandham
//Alex Myers
//Eric Chen
//Leo Bryant
//Gavin Roth

class DDR {
    level;
    state;
    backgrndImg;
    arrowImg;
    score;
    missed;
    arrows;
    gameState;
    arrowSpeed;
    spawnInterval;
    frameCounter;

    
    constructor(arrowImg) {  
        this.score = 0;
        this.missed = 0;
        this.arrowImg = arrowImg;
        this.state = -10;
        this.arrows = [];
        this.arrowSpeed = 4;
        this.spawnInterval = 60;
        this.frameCounter = 0;
    }

    setup() {
        this.state = -1;
        this.gameState = "menu";
    }
    
    // diagonal length of every pickaxe png is 226.27417 (except the clearPick; that one is 130x130, 180.8477631 diagonal)
    start() {
        resizeCanvas(800, 800)
        
        this.arrows.push({time: 1500, y: height});

        this.state = 0;
    }

    
    draw() {
        if(this.state < 0 && this.state > -7) {
            this.gameState = "menu";
        }
        if (this.gameState == "menu") {
            this.drawMenu();          
        }
        else if (this.gameState == "play") {
            this.drawGame();
        }
        else if (this.gameState == "finished") {
            //
        }
        
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

    drawGame() {
        background(0);
        fill(0, 255, 255);
        for(let arrow of this.arrows) {
            circle(width/2, arrow.y, 50);
            console.log(arrow);
        }
        this.update();
    }

    update() {
        // console.log(this.arrows);
        for(let i = 0; i < this.arrows.length; i++) {
            this.arrows[i].time -= 16.66;
            this.arrows[i].y = height - ((-(height/1500)*this.arrows[i].time) + (height));
            if(this.arrows[i].y <= 0 || this.arrows[i].time <= 0) {
                this.arrows.splice(i, 1);
            }
        }

        if(random(10000) % 90 == 0) {
            this.spawnArrow();
        }
    }

    spawnArrow() {
        this.arrows.push({time: 1500, y: height+226.27417});
        
    }

    getFinished() {
        
    }

    // taken from aimtrainer.js  --  bounds should be checked in the keypress functions when pickaxes are within a certain range
    checkBounds(target, x, y) {
        let within_x, within_y;
        //within_x = (x <= target.x + target.r/2) && (x >= target.x - target.r/2);
       // within_y = (y <= target.y + target.r/2) && (y >= target.y - target.r/2);

        return within_x && within_y;
    }

    mousePressed() {
        if (this.gameState == "menu") {     
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
              this.level = 1;       
              this.start();
              this.gameState = "play";
              this.state = 0;
            //   this.started = true;   
            }

          
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
              this.level = 4;       
              this.start();
              this.state = 0;
              this.gameState = "play";
              //   this.started = true;
            }
        }
    }

    keyPressed() {
        if(this.level == 1) {
            distance();
            return;
        }
        switch(key) {
            case(LEFT_ARROW): {
                
                break;
            }
            case(RIGHT_ARROW): {
                break;
            }
            case(UP_ARROW): {
                break;
            }
            case(DOWN_ARROW): {
                break;
            }
        }
    }
    
    /* 
        key is pressed -> bounds between moving pickaxe image and static pickage image is checked
        score is incremented if the key press is within the bound
        missed variable is incremented if the key press is after the bound
        nothing should be incremented if a key is pressed before the bound
    */

    
}