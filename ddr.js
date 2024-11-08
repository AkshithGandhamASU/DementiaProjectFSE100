//Akshith Gandham
//Alex Myers
//Eric Chen
//Leo Bryant
//Gavin Roth

// 129X172
// 127X166

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
    next_time;
    prev_time;

    
    constructor(arrowImgs) {  
        this.score = 0;
        this.missed = 0;
        this.arrowImgs = arrowImgs;
        this.state = -10;
        this.arrows = [];
        this.arrowSpeed = 4;
        this.spawnInterval = 60;
        this.frameCounter = 0;
    }
    

    

    

    setup() {
        resizeCanvas(700, 700);
        this.state = -1;
        this.gameState = "menu";
         
    }
    
    // diagonal length of every pickaxe png is 226.27417 (except the clearPick; that one is 130x130, 180.8477631 diagonal)
    start() {        
        this.spawnArrow();
        imageMode(CENTER);

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

        if(this.score == 30){
            this.gameState = "Finished";
            background('rgb(0,185,0)');
            text("Missed: " + this.missed, width/2, height/2);
            text("Score: " + this.score, width/2, height/2 - 100);
            text("Press q to exit to main menu", width/2, height/2 - 200);
            if((!completion_sound.isPlaying()) && (!completion_sound.hasPlayed)){
                completion_sound.play();
            }
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
        for(let i = 0; i < this.level; i++){
            // console.log(i);
            image(this.arrowImgs[i + 4], (width/(this.level+1)) * (i + 1), 100, 50, 66);
        }

        fill(0, 0, 255);
        for(let arrow of this.arrows) {
            // image(this.arrowImgs[arrow.x, arrow.y, 50]);        //loading diamond pickaxe images to scroll up
            circle(arrow.x, arrow.y, 50);
            // console.log(arrow);
        }
        this.update();
        fill(255);
        textSize(20);
        text("Score: " + this.score, width / 4, 30);
        text("Missed: " + this.missed, (3 * width) / 4, 30);
    }

    update() {
        // console.log(this.arrows);
        for(let i = 0; i < this.arrows.length; i++) {
            this.arrows[i].time -= 16.66;
            this.arrows[i].y = height - ((-(height/1500)*this.arrows[i].time) + (height));
            if(this.arrows[i].y <= 0 || this.arrows[i].time <= 0) {
                this.arrows.splice(i, 1);
                this.missed++;
            }
        }
            
        // console.log(millis() - this.prev_time, this.prev_time, this.next_time);

        if(Math.round(millis() - this.prev_time) >= Math.round(this.next_time)) {
            this.spawnArrow();
        }
    }

    spawnArrow() {
        this.arrows.push({time: 1500, x:(width/(this.level+1)) * Math.round(random(1, this.level + 0.1)), y: height+226.27417});
        this.prev_time = millis();
        this.next_time = random(500, 1500);
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

    distance() {
        return Math.sqrt(Math.pow(this.arrows[0].y - 100, 2));
    }

    keyPressed(key) {
        console.log(key, LEFT_ARROW);
        if(this.level == 1) {
            // console.log("ressed");
            if(this.distance() < 25){
                this.score += 1;
                console.log(this.score);
                this.arrows.splice(0, 1);
            }
            else {
                this.missed += 1;
                this.arrows.splice(0, 1);
            }
            return;
        }
        // switch(key) {
            if(key == "ArrowLeft") {
                // console.log(this.arrows[0].x, (width/5));
                if(this.distance() < 25 && this.arrows[0].x == ((width/5) * (1))){
                    this.score += 1;
                    this.arrows.splice(0, 1);
                }
                else {
                    this.missed += 1;
                    this.arrows.splice(0, 1);
                }
            }
            else if(key == "ArrowRight") {
                // console.log(this.arrows[0].x, (width/5) * 4)
                if(this.distance() < 25 && this.arrows[0].x == ((width/5) * (4))){
                    this.score += 1;
                    this.arrows.splice(0, 1);
                }
                else {
                    this.missed += 1;
                    this.arrows.splice(0, 1);
                }
            }
            else if(key == "ArrowUp") {
                // console.log(this.arrows[0].x, (width/5) * 3)
                if(this.distance() < 25 && this.arrows[0].x == ((width/5) * (3))){
                    this.score += 1;
                    this.arrows.splice(0, 1);
                }
                else {
                    this.missed += 1;
                    this.arrows.splice(0, 1);
                }
            }
            else if(key == "ArrowDown") {
                // console.log(this.arrows[0].x, (width/5) * 2)
                if(this.distance() < 25 && this.arrows[0].x == ((width/5) * (2))){
                    this.score += 1;
                    this.arrows.splice(0, 1);
                }
                else {
                    this.missed += 1;
                    this.arrows.splice(0, 1);
                }
            }
        // }
    }
    
    /* 
        key is pressed -> bounds between moving pickaxe image and static pickage image is checked
        score is incremented if the key press is within the bound
        missed variable is incremented if the key press is after the bound
        nothing should be incremented if a key is pressed before the bound
    */

    
}