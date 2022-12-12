//https://www.youtube.com/watch?v=SatRryVpAKE(move with key)
//https://www.youtube.com/watch?v=JxC1zqf1S0s( lives count)
//https://www.youtube.com/watch?v=eQzHHa1-I_A&t=444s( rolling background )

//Screen Interfaces
var stage=0;
var game;

//Assets
var bg_img = null;
var lotus_img = null;
var lotusL_img = null;
var lotusR_img = null;
var lotusHurt_img = null;
var tulpa_img = null;
var tulpa2_img = null;
var tulpa3_img = null;
var tulpa4_img = null;
var tulpa5_img = null;
var laser_img = null;
var expolde_img = null;
var opening_img = null;
var lotusWin_img = null;
var lotusLose_img = null;

var BGM = null;
var explode = null;
var laserShoot = null;
var winBgm = null;
var loseBgm = null;

var GameTimer;
var GmaeTimeLimit =  25; 


//BackGrounds
// const numStars = 800;
// let stars = [];

//Move BackGround
var BackGround_img = null;
var BackGroundSpeed = 3;
var BackGroundY = 0; // y position of background 

//Charatcter Settings
let lotus_speed = 8; //Lotus flying speed
let lotus_position = { x: 0, y: 0 }; //lotus position
var lotus_lives = 6;
var score = 0;

let lasers = []; //Lotus laser array
let laser_speed = 18;
let laser_timer = 1; //laser generate time
let laser_frequency = 0;

let LaserFlyFrequency = 0; //laser flying

let tulpa_position = { x: 0, y: 0 };
let TulpaFlyFrequency = 0; //Tulpa flying
let tulpa_speed = 6;

let tulpa2_position = { x: 0, y: 0 };
let Tulpa2FlyFrequency = 0; //Tulpa flying
let tulpa2_speed = 8;

let tulpa3_position = { x: 0, y: 0 };
let Tulpa3FlyFrequency = 0; //Tulpa flying
let tulpa3_speed = 9;

let tulpa4_position = { x: 0, y: 0 };
let Tulpa4FlyFrequency = 0; //Tulpa flying
let tulpa4_speed = 9;

let tulpa5_position = { x: 0, y: 0 };
let Tulpa5FlyFrequency = 0; //Tulpa flying
let tulpa5_speed = 12;

let explode_positoin = {x: 0, y: 0 };

//font
let fontStart;


function preload() {
  //preload image assets
  //bg_img = loadImage('assets/Images/   ');
  lotus_img = loadImage("assets/Images/lotus_img.png");
  lotusL_img = loadImage("assets/Images/lotusL_img.png");
  lotusR_img = loadImage("assets/Images/lotusR_img.png");
  lotusHurt_img = loadImage("assets/Images/lotusHurt_img.png");
  
  lotusWin_img = loadImage("assets/Images/lotusWin_img.png")
  lotusLose_img = loadImage("assets/Images/lotusLose_img.png")

  BackGround_img = loadImage("assets/Images/BackGround_img.png")


  tulpa_img = loadImage("assets/Images/tulpa_img.png");
  tulpa2_img = loadImage("assets/Images/tulpa_img.png");
  tulpa3_img = loadImage("assets/Images/tulpa3_img.png");
  tulpa4_img = loadImage("assets/Images/tulpa3_img.png");
  tulpa5_img = loadImage("assets/Images/tulpa_img.png");
  laser_img = loadImage("assets/Images/laser_img.png");
  explode_img = loadImage("assets/Images/expolde_img.png");
  opening_img = loadImage("assets/Images/opening_img.png");
  


  //preload sound assets
  soundFormats("mp3");
  BGM = loadSound("assets/Sounds/BGM.mp3");
  explode = loadSound("assets/Sounds/explode.mp3");
  laserShoot = loadSound("assets/Sounds/laserShoot.mp3");
  winBgm = loadSound("assets/Sounds/winBgm.mp3");
  loseBgm = loadSound("assets/Sounds/loseBgm.mp3")
  
  //preload fonts
  fontStart = loadFont('assets/Font/AERO_03.ttf');
}

//--------------------------------------------------------------------------------------------------
function setup() {
  createCanvas(1000, 1000);
  stroke(255);
 


//   for (let i = 0; i < numStars; i++) {
//     stars.push(new Star(random(width), random(height)));
//   }

  //Lotus original position
  lotus_position.x = width / 2;
  lotus_position.y = height - lotus_img.height / 2;

  //tulpa position
  tulpa_position.x = width / 2;
  tulpa_position.y = -2;
  
  
  //tulpa2 position
  tulpa2_position.x = width / 2;
  tulpa2_position.y = -2;
  
  //tulpa3 position
  tulpa3_position.x = width / 2;
  tulpa3_position.y = -2;
  
  //tulpa4 position
  tulpa4_position.x = width / 2;
  tulpa4_position.y = -2;
  
  //tulpa5 position
  tulpa5_position.x = width / 2;
  tulpa5_position.y = -2;
  
  //explode position 
  explode_positoin.x = width / 2;
  explode_positoin.y = -2;

  if(stage == 1){//This is Game
  game();
  }

  BGM.play()
  //explode.play()
  
    if(score>= 15){
    winBgm.play();
    stage = 2;
  } 
  
  //Trigger to LoseScreen
  if(lotus_lives<= 0){
    loseBgm.play();
    stage = 3;
  } 

}

//--------------------------------------------------------------------------------------------------


function draw (){
  
  if(stage == 0){ //This is StartScreen
    StartScreen();
  }
  
    if(stage == 1){//This is Game
    game();
  }
  
    if(stage == 2){//This is GameWin
     WinScreen();
  }
  
    if(stage == 3){//This is GameLose
     LoseScreen();
  }
  
  if(keyIsPressed && key == " "){ //https://www.toptal.com/developers/keycode/for/Space
  stage = 1;
	}//click starts game

 GameTimer = millis();// Time limit start

  }



//Background Space--------------------------------------------------------------------------------------------------
// class Star {
//   constructor(x, y) {
//     this.pos = createVector(x, y);
//     this.prevPos = createVector(x, y);

//     this.vel = createVector(0, 0);

//     //Travelling Angle
//     this.ang = atan2(y - height / 2, x - width / 2);
//   }
//   //detect star position
//   isActive() {
//     return onScreen(this.prevPos.x, this.prevPos.y);
//   }

//   //Line Stretchout
//   draw() {
//     line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
//   }
// }

// // bound within screen TRUE OR FAUSE
// function onScreen(x, y) {
//   return x >= 0 && x <= width && y >= 0 && y <= height;
// }
