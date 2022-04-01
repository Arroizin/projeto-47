var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart_1, heart_2, heart_3;
var heart1Img, heart2Img, heart3Img
var zombies_group
var zumbi
var zumbiImg
var bala = 70
var balas
var gameState = "lutar"
var perdeu 
var ganhar
var explosao
var life = 3
var score = 0

function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  zumbiImg = loadImage("assets/zombie.png")
  explosao = loadSound("assets/explosion.mp3")
  ganhar = loadSound("assets/win.mp3")
  perdeu = loadSound("assets/lose.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

  //criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.setCollider("rectangle",0, 0, 300, 300)
  player.debug = true

  heart_1 = createSprite(displayWidth-150,40,20,20)
  heart_1.addImage(heart1Img)
  heart_1.scale = 0.4
  heart_1.visible = false

  heart_2 = createSprite(displayWidth-100,40,20,20)
  heart_2.addImage(heart2Img)
  heart_2.scale = 0.4
  heart_2.visible = false

  heart_3 = createSprite(displayWidth-150,40,20,20)
  heart_3.addImage(heart3Img)
  heart_3.scale = 0.4
  heart_3.visible = true

  zombies_group = new Group();
  balas_group = new Group()

}

function draw() {
  background(0); 


if(gameState === "lutar"){

if(life === 3){
  heart_3.visible = true
  heart_2.visible = false
  heart_1.visible = false
}
if(life === 2){
  heart_3.visible = false
  heart_2.visible = true
  heart_1.visible = false
}
if(life === 1){
  heart_3.visible = false
  heart_2.visible = false
  heart_1.visible = true
}
if(life === 0){
gameState = "lost" 
}



//movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")|| touches.length>0){
    player.y = player.y+30
  }

  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
  player.addImage(shooter_shooting)
     balas = createSprite(displayWidth - 1150, player.y -30, 20, 10)
     balas.velocityX = 20
     balas_group.add(balas)
     balas.lifeTime = 60
     balas.depth = player.depth;
     player.depth = player.depth + 2; 
     bala = bala - 1; 
  }
  else if(keyWentUp("space")){
  player.addImage(shooterImg)
  }
  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço

zumbi()
if(bala === 0){
  gameState = "balas"
  }

if(score === 100){
  gameState = "ganhar"
  ganhar.play()
}


  
  if(zombies_group.isTouching(player)){
    for(var i = 0; i < zombies_group.length; i++){
      if(zombies_group[ i ].isTouching(player)){
        zombies_group[i].destroy()
        life -= 1
        perdeu.play()
      }
    }
  }

  if(zombies_group.isTouching(balas_group)){
    for(var i = 0; i < zombies_group.length; i++){
      if(zombies_group[ i ].isTouching(balas_group)){
        zombies_group[i].destroy()
        score += 2
        explosao.play()
      }
    }
  }
  
}

  drawSprites();

  textSize(20) 
  fill("white")
  text("Bala = " + bala,displayWidth-210,displayHeight/2-250) 
  text("Score = " + score,displayWidth-200,displayHeight/2-220) 
  text("Life = " + life,displayWidth-200,displayHeight/2-280)

if(gameState == "lost"){ 
  textSize(100) 
  fill("red") 
  text("Você Perdeu",400,400) 
  zombies_group.destroyEach(); 
  player.destroy(); }
  


else if(gameState == "ganhar"){ 
  textSize(100) 
  fill("red") 
  text("Você ganhou",400,400) 
  zombies_group.destroyEach(); 
  player.destroy(); }
 
  else if(gameState == "balas"){ 
    textSize(100) 
    fill("red") 
    text("Você não tem mais balas",400,400) 
    zombies_group.destroyEach(); 
    player.destroy(); }
    
  
}
function zumbi(){

  if(frameCount % 50 === 0){
    zumbie = createSprite(random(900,1800), random(100,500), 40, 40);
    zumbie.addImage(zumbiImg);
    zumbie.scale = 0.15;    
    zumbie.velocityX = -3;
    zumbie.setCollider("rectangle",0, 0, 400, 400)
    zumbie.debug = true


    //ajustando a profundidade
    //zumbi.depth = trex.depth;
    //trex.depth = trex.depth + 1; 
    
    //Atribuindo tempo de duração a variavel
    zumbie.lifetime = 370;
    
    //add nuvem ao grupo
    zombies_group.add(zumbie);
  }
}