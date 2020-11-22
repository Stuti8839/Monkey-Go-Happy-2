var bananaImage, obstacleImage, obstacleGroup, backImage, scene, score, player_running, ground, monkey, bananaGroup;
function setup() {
  createCanvas(600, 200);
  backImage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  scene = createSprite(200,0,200,20);
  scene.addImage("scene", backImage);
  
  ground = createSprite(200,200,600,20);
  ground.visible = false;
  
  monkey = createSprite(50,150, 10, 10);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.06;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  console.log(score);
  
  monkey.collide(ground);
  
  monkey.depth = scene.depth+1;
  
  scene.velocityX=-6;
  
  if(scene.x < 100) {
      scene.x = scene.width/2+400;
    }
  
  if (keyDown("space")) {
      monkey.velocityY = -5;
  }
  
  if (monkey.isTouching(bananaGroup)) {
       score = score + 2;
       bananaGroup.destroyEach();
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.06;
    score = 0;
  }
  
  switch(score) {
    case 10: monkey.scale = 0.08;
          break;
    case 20: monkey.scale = 0.1;
          break;
    case 30: monkey.scale = 0.12;
          break;
    case 40: monkey.scale = 0.14;
          break;
    default: break;
  }
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(10);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnBananas () {
  if (frameCount%80 === 0) {
    var banana = createSprite(400,150,40,10);
    banana.y = random(25,100);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 600;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles () {
  if (frameCount%300 === 0) {
    var obstacle = createSprite(600,170,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 600;
    /*scene.depth = obstacle.depth;
    obstacle.depth = obstacle.depth +1;*/
    obstacleGroup.add(obstacle);
  }
}
