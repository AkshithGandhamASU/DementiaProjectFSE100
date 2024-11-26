//Akshith Gandham
//Alex Myers
//Eric Chen
//Leo Bryant
//Gavin Roth

class AimTrainer {
    score;
    missed;
    targets;
    level;
    started;
    gameState;
    last;
    target_image;
    target_image2;
    finished;

    constructor(target_image, target_image2) {
       this.score = 0;
       this.missed = 0;
       this.target_image = target_image;
       this.target_image2 = target_image2;
       this.finished = false;
    }

    start() {
        this.targets = [
            {x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img:2},
            {x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img:2},
            {x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img:1},
            {x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img:1},
            {x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img:1},
        ];
        this.started = false;
        this.last = second();
        textSize(20);
        // textAlign(C, TOP);
    }

    draw() {
        if(!this.started) {
            this.gameState = "menu";
        }
        
        // console.log(this.gameState);
        
        if (this.gameState == "menu") {
            this.drawMenu();          
        }
        
        else if (this.gameState == "play") {
            this.drawGame();
            for(let i = 0; i < this.targets.length; i++) {
                this.targets[i].time -= 16;
                this.targets[i].r -= 0.0001;
                if(this.targets[i].time <= 400) {
                    this.targets.splice(i, 1);
                    if(this.targets[i].img == 1) {
                        this.missed++;
                        test_sound.play();
                    }
                }
            }

            if(((second() % (3/this.level)) == 0) && second() != this.last){
                console.log("Spawn");
                this.targets.push({x:random(20, width-20), y:random(20, height-20), r:40, time:10000/this.level, img: Math.round(random(1, 2))});
                this.last = second();
            }
        }
        
        if(this.score == 20){
            this.gameState = "Finished";
            background('rgb(0,185,0)');
            text("Missed: " + this.missed, width/2, height/2);
            text("Score: " + this.score, width/2, height/2 - 100);
            text("Press q to exit to main menu", width/2, height/2 - 200)
            if((!completion_sound.isPlaying()) && (!completion_sound.hasPlayed)){
                completion_sound.play();
            }
        }
    }

    getFinished() {
        return this.finished;
    }

    drawGame() {
        background(0);
        for(let i = 0; i < this.targets.length; i++) {
            if(this.targets[i].img == 2)
                image(this.target_image2, this.targets[i].x, this.targets[i].y, this.targets[i].r, this.targets[i].r);
            else if(this.targets[i].img == 1)
                image(this.target_image, this.targets[i].x, this.targets[i].y, this.targets[i].r, this.targets[i].r);
        }
        fill(255, 255, 255);
        text("Score: " + this.score, 20, 20);
        text("Missed: " + this.missed, 20, 100);
    }

    drawMenu() {
        imageMode(CENTER);
        background(100, 150, 250);
        textSize(32);
        fill(255);
        text("Select difficulty", 250, height / 3);

       
        textSize(24);
        fill(0, 200, 0);
        rect(width / 2 - 100, height / 2 - 30, 200, 50, 10);  
        fill(255);
        text("Easy", 350, height / 2 - 5);

        fill(200, 0, 0);
        rect(width / 2 - 100, height / 2 + 40, 200, 50, 10);  
        fill(255);
        text("Hard", 350, height / 2 + 65);

        fill(0);
        text("Click on the target squares, but avoid clicking on the tnt!", 25, height / 2 + 120);

        imageMode(CORNER);

    }
    

    checkBounds(target, x, y) {
        let within_x, within_y;
        within_x = (x <= target.x + target.r) && (x >= target.x - target.r);
        within_y = (y <= target.y + target.r) && (y >= target.y - target.r);

        return within_x && within_y;
    }

    mousePressed() {
        if (this.gameState == "menu") {
            
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 - 30 && mouseY < height / 2 + 20) {
              this.level = 1;       
              this.gameState = "play";   
              this.started = true;   
            }

          
            if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
                mouseY > height / 2 + 40 && mouseY < height / 2 + 90) {
              this.level = 3;       
              this.gameState = "play";   
              this.started = true;    
            }
        } else if (this.gameState == "play") {
            for(let i = 0; i < this.targets.length; i++) {
                let target = this.targets[i];
                if(this.checkBounds(target, mouseX, mouseY)) {
                    if(target.img == 1) {
                        this.targets.splice(i, 1);
                        this.score++;
                        hit_sound.play();
                    }
                    else if(target.img == 2) {
                        this.targets.splice(i, 1);
                        this.missed++;
                        test_sound.play();
                    }
                }
            }
        }
    }

}