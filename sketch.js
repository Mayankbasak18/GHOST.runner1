var tower,towerimg;
var door;
var reilings,reilingsImg,reilingGroup;
var ghost,ghostImg;
var invisible_ground,invisible_groundGroup;
var gameState="Play";

var score=0;

function preload(){
  towerimg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  reilingImg=loadImage("climber.png");
    ghostImg=loadImage("ghost-standing.png"); 
}
function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerimg);
  tower.velocityY=1;
  
  doorsGroup=new Group();
  reilingGroup=new Group();
  
  invisible_groundGroup=new Group();
    
  ghost=createSprite(300,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.5;
   
}
function draw(){
  if(gameState==="Play"){
  
    score=score+Math.round(getFrameRate()/60);
    
    
    
  if(tower.y>400)
  {
    tower.y=300;
  }
  spawnDoor();
  drawSprites();
  
if(reilingGroup.isTouching(ghost))
   {
  ghost.velocityY=0;  
}
 
  if(keyDown("space")){
    ghost.velocityY=-10; 
    
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
   
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
      
  ghost.velocityY=ghost.velocityY+0.8; 
  if(invisible_groundGroup.isTouching(ghost)||ghost.y>600){  
    ghost.destroy();
    gameState="End";
  }   
    
  fill("black");  
  text(mouseX+","+mouseY,290,580);
    
    textSize(25)
    stroke("yellow");
    fill("black");
    text( "Score="+score,470,100);    
}
  if(gameState==="End"){
    
    background("grey");
    
    textSize(25)
    stroke("yellow");
    fill("black");
    text("GAME OVER",220,300);
   
        
  }
}
function spawnDoor(){
  if(frameCount%240===0){     
  door=createSprite(200,-50);
  door.velocityY=3;  
  door.addImage(doorImg);
  door.lifeTime=200;
  door.x=Math.round(random(122,400));
  doorsGroup.add(door);
     ghost.depth=door.depth;
    ghost.depth+=1; 
    
  var invisible_ground=createSprite(200,15,100,5);
    invisible_ground.velocityY=3;
    invisible_ground.x=door.x; 
    invisible_ground.lifetime=200;
    invisible_ground.visible=false;
   
    invisible_groundGroup.add(invisible_ground);
    
  reiling=createSprite(200,-1);
  reiling.x=door.x;
  reiling.velocityY=3;
  reiling.addImage(reilingImg);
  reilingGroup.add(reiling);
    
    
  }
}
