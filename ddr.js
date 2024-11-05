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

    
    constructor(arrowImg) {  
        this.score = 0;
        this.missed = 0;
        this.arrowImg = arrowImg;
        this.state = -1;
        this.arrows = [];
    }
    
    // diagonal length of every pickaxe png is 226.27417 (except the clearPick; that one is 130x130, 180.8477631 diagonal)
    start() {
        resizeCanvas(800, 800)
        
        for(i of this.level) {
            this.arrows.push(random(500, 1500));
        }

        this.state = 0;
    }

    
    draw() {
        if(!this.state < 0) {
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