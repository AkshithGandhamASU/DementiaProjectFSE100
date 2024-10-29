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
let easyBackgroundImg, hardBackgroundImg;
let marioParty;
let gameState;



function preload() {
    game_title_img = loadImage("assets/Dementia.png");
    background_img = [loadImage("assets/Panorama_0_JE2.jpg"), loadImage("assets/Panorama_1_JE1.jpg"), loadImage("assets/Panorama_2_JE1.jpg"), loadImage("assets/Panorama_3_JE1.jpg"), loadImage("assets/Panorama_4_JE1.jpg"), loadImage("assets/Panorama_5_JE1.jpg")];
    font = loadFont("assets/MinecraftRegular-Bmg3.otf");
    test_sound = loadSound("assets/creeper-explosion-sound-106759.mp3");
    // messymemory_backgrnd_img_easy = loadImage("craftingTable_easy.jpg");
    // messymemory_backgrnd_img_hard = loadImage("craftingTable_hard.jpg");

    // let sng = new Song(null, 0, [1,0,0,1,0,1,0,0,1], 60);

    // console.log(sng.distance_from_beat(180));

    randomSeed(7519);

    //   // Load item images
    // for (let i = 0; i < 9; i++) { // Load up to 9 images for the harder difficulty
    //     images.push(loadImage('assets/MessyMemory/mariopartyItem' + (i + 1) + '.jpg')); // Assumes images are named item1.jpg, item2.jpg, etc.
    // }
    // Load background images for easy and hard difficulties
    images.push(loadImage('assets/MessyMemory/mariopartyItem1.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem2.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem3.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem4.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem5.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem6.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem6.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem7.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem8.jpg'));
    images.push(loadImage('assets/MessyMemory/mariopartyItem9.jpg'));
    easyBackgroundImg = loadImage('assets/MessyMemory/e.jpg'); // Replace with your easy difficulty background path
    hardBackgroundImg = loadImage('assets/MessyMemory/h.jpg'); // Replace with your hard difficulty background path

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  quiting = false;

  marioParty = new MarioParty(easyBackgroundImg, hardBackgroundImg, images);

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
  buttons[6].mousePressed(messymemory)
}

function messymemory() {
  marioParty.setup();
  
  gameState = 2;
  
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
  
    buttons[5].show();
    buttons[6].show();
    buttons[7].show();
    buttons[4].show();
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
    if(gameState == 0) {
        noStroke();
        
        background(background_img[round(millis() / 2000) % 6]);
        
        image(game_title_img, 150, 50);
        
        if(quiting)
            noLoop();
    }
    if(gameState == 2) {
        marioParty.draw();
    }
}

function mousePressed() {
    if(gameState == 2) {
        marioParty.mousePressed();
    }
}

function mouseDragged() {
    if(gameState == 2) {
      marioParty.mouseDragged();
    }
}

function mouseReleased() {
    if(gameState == 2) {
      marioParty.mouseReleased();
    }
}