var canvas;
var backgroundImage;
var MyForm, MyPlayer, MyGame;
var myplayercount,mygamestate
var car1Image,car2Image,car1,car2,trackImage
var cars=[]
var allPlayers

var fuelImage,CoinsImage
var fuelGroup,CoinsGroup

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Image=loadImage("./assets/car1.png")
  car2Image=loadImage("./assets/car2.png")
  trackImage=loadImage("./assets/track.jpg")
  fuelImage=loadImage("./assets/fuel.png")
CoinsImage=loadImage("./assets/goldCoin.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
   database = firebase.database();
  MyGame = new Game();
  MyGame.start();

  MyGame.getstate()
}


function draw() {
  background(backgroundImage);

  if(myplayercount===2){
    MyGame.UpdateState(1)
  }

  if(mygamestate===1){
    MyGame.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
