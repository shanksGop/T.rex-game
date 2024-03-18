var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudIm,cloud
var obstacle,obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var cacti,cloudsGroup;
var score;
var PLAY = 1
var END = 0
var gameState = PLAY;
var jumpSound, checkpointSound, endSound;
var restartImg, restart, gameOverImg, gameOver;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudIm = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  endSound = loadSound("die.mp3");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameover.png");
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
   trex.debug = true;
  trex.setCollider("circle",0,0,40);
  //trex.setCollider("rectangle",0,0,400,trex.height)
  //create a ground sprite
  ground = createSprite(200,height-100,400,20);
  ground.addImage("ground",groundImage); 
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-90 ,400,10);
  invisibleGround.visible = false;

  cacti = new Group()
  cloudsGroup = new Group()
  
 gameOver = createSprite(width/2,height/2);
 gameOver.scale = 2
 gameOver.addImage(gameOverImg);
 restart = createSprite(width/2,(height/2)+50);
 restart.scale = 0.5;
 restart.addImage(restartImg);
  
  

}

function draw() {
  //set background color
  background(255);
  
  if(gameState === PLAY){
    restart.visible = false
    gameOver.visible = false
    score = score + Math .round(frameRate()/10 )  
    ground.velocityX = -3; 
    if(score>0 && score%500===0){
      checkpointSound.play(); 
    }

    if(touches.length>0 || keyDown("space")&& trex.y >= height-130 ) {
      trex.velocityY = -12;
      jumpSound.play();
      touches = [];
    }

    spawnClouds();
    spawnObstacles();

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(cacti.isTouching(trex)){
      gameState = END; 
      endSound.play();
      //trex.velocityY = -12
      //jumpSound.play();
    }




    } else if(gameState === END){
      ground.velocityX = 0
      cloudsGroup.setVelocityXEach(0);
      cacti.setVelocityXEach(0);
      cacti.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      trex.changeAnimation("collided",trex_collided);

      restart.visible = true;
      gameOver.visible = true;
      if(mousePressedOver(restart)){
        reset()
      }
  
    }

  text("Score: " + score,width-100,50);
 
  // console.log(trex.y)
  
  // jump when the space key is pressed
 
  
  trex.velocityY = trex.velocityY + 0.8
  
 //console.log(frameRate());
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  drawSprites();
}
function reset(){
  gameState = PLAY
  trex.changeAnimation("running",trex_running);
  cacti.destroyEach();
  cloudsGroup.destroyEach(); 
  score = 0;
}


function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle =createSprite(600,height -110,10,40);
    obstacle.velocityX = -(6+3*score/200);  
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    cacti.add(obstacle);
  }
}
//function to spawn the clouds
function spawnClouds(){
if(frameCount%60===0){
cloud = createSprite(600,100,40,10);
cloud.addImage(cloudIm);
cloud.scale = 0.4;
cloud.depth = trex.depth;
trex.depth+=1;
// console.log(cloud.depth);
// console.log(trex.depth);
cloud.velocityX = -3;
cloud.y = Math.round(random(10,height-200 ));
cloud .lifetime = 200;
cloudsGroup.add(cloud);
}
}



