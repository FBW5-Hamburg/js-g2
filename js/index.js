var enemies = []
var meteors =[]
var explosionenImg = null
var explosionCtx =null
var exploionsound = null
var scoreCounter=0
var bullets=[]
// var status = false

window.onload = function(){
 //get container bei id 
let container=document.querySelector('.container')
////////////////////////////////////////////////////////////
var score = document.querySelector('#score')


/////////////////////////////////////////////
//declering layer1 canvas
var gameCanvas = document.querySelector('#gameCanvas')
var context = gameCanvas.getContext('2d')
/////////////////////////////////////////////////////////
//declering layer3 canvas
var gameCanvas3 = document.querySelector('#gameCanvas3')
    explosionCtx = gameCanvas3.getContext('2d')
 ////////////////////////////////////////////////////
 //declering layer2 canvas
var gameCanvas2 = document.querySelector('#gameCanvas2')
var context2 = gameCanvas2.getContext('2d')
///////////////////////////////////////////////////////////
// creating exploisin sound 
exploionsound = document.createElement("audio")
exploionsound.src = './audi/Explosion+5.mp3'
exploionsound.setAttribute("preload","auto")
exploionsound.setAttribute("controls","none")
exploionsound.style.display ="none"
container.append(exploionsound)
///////////////////////////////////////////////7
    //declaring laser sound
    let sound = document.createElement("audio")
    sound.src = './audi/heat-vision.mp3'
    sound.setAttribute("preload","auto")
    sound.setAttribute("controls","none")
    sound.style.display ="none"
    container.append(sound)
//////////////////////////////////////////////////////
let gameMusic = document.createElement("audio")
gameMusic.src = './audi/music.mp3'
gameMusic.setAttribute("preload","auto")
gameMusic.setAttribute("controls","none")
gameMusic.style.display ="none"
    container.append(gameMusic)

///////////////////////////////////////////
//declering explosion img  
 explosionenImg  = document.createElement('img')
 explosionenImg.src ='./img/explosion0.png'
//////////////////////////////////////////////////////////////////////
// start button declering + add event listener
let startBtn =document.querySelector('#startBtn')
startBtn.addEventListener('click',function (e) {
  startBtn.classList.add('startBtn')
  gameMusic.play()
////////////////////////////////////////////////////////////////////////
//declaring space ship image 

let spacrShipImg  = document.createElement('img')
spacrShipImg.src ='./img/ship2.png'
spacrShipImg.onload = ()=>{
gameCanvas3.onmousemove = e=>{ 
spaceshipCreator(spacrShipImg,context,sound,context,e.pageX,e.pageY)
} }
/////////////////////////////////////////////////////////////////////
//declaring enemy image
let enemyimg =document.createElement('img')
enemyimg.src ='./img/ship4.png'
enemyimg.onload = () =>{
  setInterval(() => {
  let x = Math.floor(Math.random() * Math.floor(960));
  enemycreator(enemyimg,context2, x)
   enemyBullets(enemyBullet,context2,x)
      }, 2000);
       
}  
/////////////////////////////////////////////////////////

//declaring enemy bullet
var enemyBullet = document.createElement('img')
enemyBullet.src = './img/laser0.png'

////////////////////////////////////////////////////////
let meteoresImg = document.createElement('img')
meteoresImg.src ='./img/Rock0.png'
meteoresImg.onload= ()=>{
  setInterval(() => {
    let x = Math.floor(Math.random() * Math.floor(960))
    meteorCreator(meteoresImg,explosionCtx, x,0)
    
},7000)
setInterval(() => {
  // let x = Math.floor(Math.random() * Math.floor(960))
  meteorCreator(meteoresImg,explosionCtx, 20,-50)
  
},30000)
setInterval(() => {
  // let x = Math.floor(Math.random() * Math.floor(960))
  meteorCreator(meteoresImg,explosionCtx, 600,-100)
  
},30000)
setInterval(() => {
  // let x = Math.floor(Math.random() * Math.floor(960))
  meteorCreator(meteoresImg,explosionCtx, 150,-150)
  
},30000)
setInterval(() => {
  // let x = Math.floor(Math.random() * Math.floor(960))
  meteorCreator(meteoresImg,explosionCtx, 300,0)
  
},30000)
 
}})}


//////////////////////////////////////////////////////////////////////////////////////////
 //creat spaceship function 
function spaceshipCreator(img,ctx,sound,ctx2,x,y) {
if (true) {
        ctx.clearRect(0,0,1000,500)
        ctx.drawImage(img,40,30,300,200,x,y,40,30)  
          
       }
//////////////////////////////////////////////////////////////   
//caling laser shoot function + add Event 
   document.onclick =(e=>{
    LaserShoot(e.pageX,e.pageY,ctx2)
    ////////////////////////////// 
  // LaserShoot(e.pageX-5,e.pageY-5,ctx2)
    sound.currentTime =0;
    sound.play()
  }
    )
  }
/////////////////////////////////////////////////////////////////////
//laser shoot +laser sound

function LaserShoot(laserX,laserY,ctx) {
let laserCaunter = laserY
let laserInterval = setInterval(() => {
  if (laserCaunter ==0) {
   
     clearInterval(laserInterval)
       
 }else{
       laserCaunter-=30}
ctx.fillStyle ="red"
ctx.clearRect(laserX+15,laserCaunter+30,3,5)
ctx.fillRect(laserX+15,laserCaunter,3,5)
ctx.stroke();
//calling checkExplosion function 
  
 checkExplosion(enemies,laserX,laserCaunter)
      }, 30);

   }
////////////////////////////////////////////////////////
function enemycreator(enemyimg,somCtx,enX) {
 
enemObj = {
  x: enX,
  y: 0,
  ctx: somCtx
}
let enemIndex = enemies.push(enemObj) - 1
let theEnemy = enemies[enemIndex]/// 


 let enemyInterval= setInterval(() => {
  theEnemy.y += 5 
    // console.log(enemies);
    somCtx.clearRect(theEnemy.x-10,theEnemy.y-30,60,50)
    somCtx.drawImage(enemyimg,0,0,700,400,theEnemy.x,theEnemy.y,50,40)
    
if (theEnemy.y==500 ) {
  clearInterval( enemyInterval)
}
    }, 50);
    enemies[enemIndex].interval = enemyInterval
    }
//////////////////////////////////////////////////////////////////////////////////
function meteorCreator(meteoresImg,somCtx, meteorX,meteorY){
  meteorObj = {
    x:meteorX,
    y:meteorY-5,
    ctx: somCtx
  }
  let meteorIndex = meteors.push(meteorObj)-1
  let theMeteor = meteors[meteorIndex]

  let meteorInterval =setInterval(()=>{
    
    theMeteor.y+=5
    somCtx.clearRect(theMeteor.x-20,theMeteor.y-30,244,100 )
    somCtx.drawImage(meteoresImg,0,0,500,400,theMeteor.x,theMeteor.y,224,244)
    if (theMeteor.y ==500){
      clearInterval( meteorInterval)
    }
    meteors[meteorIndex].interval =meteorInterval

  },50);


}
//////////////////////////////////////////////////////////////////////////////////////////////////


function checkExplosion(array,laserX,laserY) {
  
  let enWidth = 50
  let enHeight = 40
  let laserWidth = 3
  let laserHeight = 5
  
for (let i = 0; i < enemies.length; i++) {
 
  let enX= enemies[i].x
  let enY = enemies[i].y
  let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)
  let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY)
  let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
  let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + laserHeight)
  if(topLeftCornerCheck || topRightCornerCheck||buttomRightCornerCheck||buttomLeftCornerCheck){
  
    //array.splice(i,1)
    clearInterval(enemies[i].interval)
   
    enemies[i].ctx.clearRect(enX, enY, enWidth, enHeight)
    drawExplosion(explosionenImg,explosionCtx,enX,enY,exploionsound)
    enemies.splice(i,1)
    //drawExplosion()
    
    scoreCounter=scoreCounter+1
    score.innerText = scoreCounter
  } 

 }   
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInside(enX , enY ,enWidth, enHeight, pointX , pointY ){
return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight )
    }
///////////////////////////////////////////////////////////
function drawExplosion(img,explosionContext,x,y,exploionsound) {
  
   
  explosionContext.drawImage(img,0,0,200,100,x,y,70,50)
  setTimeout(() => {
    explosionContext.clearRect(x,y,70,50)
   }, 1000);
  
  exploionsound.currentTime=0
   exploionsound.play()       
  
}


//////////////////////////////////////////////////////////////////////
function enemyBullets(enemyBullet,somCtx, bulletX){
  meteorObj = {
    x:bulletX,
    y:-5,
    ctx: somCtx
  }
  let bulletIndex = bullets.push(meteorObj)-1
  let theBullet = bullets[bulletIndex]

  let bulletInterval =setInterval(()=>{
    
    theBullet.y+=10
    somCtx.clearRect(theBullet.x-20,theBullet.y-30,20,20 )
    somCtx.drawImage(enemyBullet,0,0,100,100,theBullet.x,theBullet.y,20,20)
    if (theBullet.y ==500){
      clearInterval( bulletInterval)
    }
    bullets[bulletIndex].interval =bulletInterval

  },30);}