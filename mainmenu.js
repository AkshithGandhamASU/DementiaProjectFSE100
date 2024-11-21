//Akshith Gandham
//Alex Myers
//Eric Chen
//Leo Bryant
//Gavin Roth

let buttons;
let background_img;
let game_title_img;
let font;
let test_sound;
const windowWidth = 750, windowHeight = 500;
let quiting;
let messymemory_backgrnd_img_hard;
let messymemory_backgrnd_img_easy;
let images = [];
let marioParty;
let gameState;
let backgroundImg;
let aimTrainer;
let targetImg;
let arrowImgs = [];



function preload() {
    game_title_img = loadImage("assets/Dementia.png");
    background_img = [loadImage("assets/Panorama_0_JE2.jpg"), loadImage("assets/Panorama_1_JE1.jpg"), loadImage("assets/Panorama_2_JE1.jpg"), loadImage("assets/Panorama_3_JE1.jpg"), loadImage("assets/Panorama_4_JE1.jpg"), loadImage("assets/Panorama_5_JE1.jpg")];
    font = loadFont("assets/MinecraftRegular-Bmg3.otf");
    test_sound = loadSound("assets/creeper-explosion-sound-106759.mp3");
    completion_sound = loadSound("assets/DDR/levelup.mp3");
   

    // randomSeed(7519);

   
    images.push(loadImage('assets/MessyMemory/mariopartyItem1.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem2.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem3.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem4.jpg'));
    images.push(loadImage('assets/MessyMemory/woodplank2.jpg'));
    images.push(loadImage('assets/MessyMemory/woodplank3.jpg'));
    images.push(loadImage('assets/MessyMemory/woodplank4.jpg'));
    images.push(loadImage('assets/MessyMemory/woodplank5.jpg'));

    targetImg = (loadImage('assets/Aim Trainer/target_side.png'));
    
    arrowImgs.push(loadImage('assets/DDR/diamondPickLeft.png'));
    arrowImgs.push(loadImage('assets/DDR/diamondPickDown.png'));
    arrowImgs.push(loadImage('assets/DDR/diamondPickUp.png'));
    arrowImgs.push(loadImage('assets/DDR/diamondPickRight.png'));
    arrowImgs.push(loadImage('assets/DDR/clearPickLeft.png'));
    arrowImgs.push(loadImage('assets/DDR/clearPickDown.png'));
    arrowImgs.push(loadImage('assets/DDR/clearPickUp.png'));
    arrowImgs.push(loadImage('assets/DDR/clearPickRight.png'));
    // below is commented out in case we don't use the bow pulling animation
    // image.push(loadImage('assets/Aim Trainer/bow_pulling_0.png'));
    // image.push(loadImage('assets/Aim Trainer/bow_pulling_1.png'));
    // image.push(loadImage('assets/Aim Trainer/bow_pulling_2.png'));
  
    
    backgroundImg = loadImage('assets/MessyMemory/e.jpg'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  textFont(font);

  quiting = false;

  marioParty = new MarioParty(backgroundImg, images);
  aimTrainer = new AimTrainer(targetImg);
  ddr  = new DDR(arrowImgs);
  

  gameState = 0;

  buttons = [];

  buttons.push(createImg("assets/gameButton.png", "Game"));
  buttons.push(createImg("assets/optionButton.png"));
  buttons.push(createImg("assets/quitButton.png"));
  
  buttons.push(createImg("assets/testSoundButton.png"));
  
  buttons.push(createImg("assets/backButton.jpg"));

  buttons.push(createImg("assets/ddrButton.png"));
  buttons.push(createImg("assets/mmButton.png"));
  buttons.push(createImg("assets/aimButton.png"));
  
  buttons[0].position(165, 175);
  buttons[1].position(165, 250);
  buttons[2].position(165, 325);
  
  buttons[3].position(165, 175);
  buttons[3].size(414, 38);
  buttons[3].hide();
  
  buttons[4].position(165, 400);
  buttons[4].size(414, 38);
  buttons[4].hide();
  
  buttons[5].position(165, 175);
  buttons[5].size(414, 38);
  buttons[5].hide();
  buttons[6].position(165, 250);
  buttons[6].size(414, 38);
  buttons[6].hide();
  buttons[7].position(165, 325);
  buttons[7].size(414, 38);
  buttons[7].hide();
  
  buttons[0].mousePressed(gameSelect);
  buttons[1].mousePressed(options);
  buttons[2].mousePressed(quit);
  buttons[3].mousePressed(testSound);
  buttons[4].mousePressed(back);
  buttons[5].mousePressed(ddrFunc);
  buttons[6].mousePressed(messymemory)
  buttons[7].mousePressed(aimtrainer)
}
function ddrFunc() {
    gameState = 1;
    
    ddr.setup();

    buttons[3].hide();
    buttons[4].hide();
    buttons[5].hide();
    buttons[6].hide();
    buttons[7].hide();

    
}

function messymemory() {
  gameState = 2;
  
  marioParty.setup();
  
  
  buttons[3].hide();
  buttons[4].hide();
  buttons[5].hide();
  buttons[6].hide();
  buttons[7].hide();
}

function aimtrainer() {
    gameState = 3;
    
    aimTrainer.start();
    
    
    buttons[3].hide();
    buttons[4].hide();
    buttons[5].hide();
    buttons[6].hide();
    buttons[7].hide();
  }

function gameSelect() {
    buttons[0].hide();
    buttons[1].hide();
    buttons[2].hide();
  
    buttons[4].show();
    buttons[5].show();
    buttons[6].show();
    buttons[7].show();
}

function options() {
    buttons[0].hide();
    buttons[1].hide();
    buttons[2].hide();
  
    buttons[3].show();
    buttons[4].show();
}

function quit() {
    quiting = true;
}

function testSound() {
    test_sound.play();
}

function back() {
    buttons[0].show();
    buttons[1].show();
    buttons[2].show();
  
    buttons[3].hide();
    buttons[4].hide();
    buttons[5].hide();
    buttons[6].hide();
    buttons[7].hide();
}

function draw() {
        if(ddr.getFinished()) {
            // console.log("GameState ", gameState);
            gameState = 0;
            resizeCanvas(windowWidth, windowHeight);
            back();
        }
        else if(aimTrainer.getFinished()) {
            // console.log("GameState ", gameState);
            gameState = 0;
            resizeCanvas(windowWidth, windowHeight);
            back();
        }

    // console.log(gameState);
    
    // switch(gameState) {
        if(gameState == 0) {
            noStroke();
            
            background(background_img[round(millis() / 2000) % 6]);
            
            image(game_title_img, 150, 50);
            
            if(quiting)
                noLoop();
        }
        else if(gameState == 2) {
            marioParty.draw();
        }
        else if(gameState == 3) {
            aimTrainer.draw();
        }
        else if(gameState == 1) {
            ddr.draw();
        }
    // }
}

function keyPressed() {
    if(key === 'q') {
        gameState = 0;
        imageMode(CORNER);
        back();
    }
    
    if(gameState == 1) {
        ddr.keyPressed(key);
    }
    else if(gameState == 2) {
        marioParty.keyPressed(key);
    }
}

function mousePressed() {
    if(gameState == 2) {
        marioParty.mousePressed();
    }
    else if(gameState == 3) {
        aimTrainer.mousePressed();
    }
    else if(gameState == 1) {
        ddr.mousePressed();
    }
}

function mouseDragged() {
    if(gameState == 2) {
      marioParty.mouseDragged();
    }
    // else if(gameState == 3) {
    //     aimTrainer.mouseDragged();
    // }
}

function mouseReleased() {
    if(gameState == 2) {
      marioParty.mouseReleased();
    }
    // else if(gameState == 3) {
    //     aimTrainer.mouseReleased();
    // }
}