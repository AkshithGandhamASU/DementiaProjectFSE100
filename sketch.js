let colorlist = ['gold', 'yellow', 'turquoise', 'red']

let buttons;
let background_img;
let game_title_img;
let font;
const windowWidth = 500, windowHeight = 500;

function preload() {
    game_title_img = loadImage("")
    font = loadFont("MinecraftRegular-Bmg3.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttons = [];
  background(0);
}

function draw() {
  noStroke()
  fill(random(colorlist));
  ellipse(mouseX, mouseY, 25, 25);
  buttons.display();
}