var enemies = []
window.onload = function(){
 
  let container=document.querySelector('.container')
///////////////////////////////////////////////
//declering layer1 canvas
let gameCanvas = document.querySelector('#gameCanvas')
let context = gameCanvas.getContext('2d')
 ////////////////////////////////////////////////////
let gameCanvas2 = document.querySelector('#gameCanvas2')
let context2 = gameCanvas2.getContext('2d')
///////////////////////////////////////////
let gameCanvas3 = document.querySelector('#gameCanvas3')
let context3 = gameCanvas3.getContext('2d')
//////////////////////////////////////////////////////////////////////7
    //creat laser sound
let sound = document.createElement("audio")
sound.src = './audi/heat-vision.mp3'
sound.setAttribute("preload","auto")
sound.setAttribute("controls","none")
sound.style.display ="none"
container.append(sound)
////////////////////////////////////////////////////////////////////////

let spacrShipImg  = document.createElement('img')
spacrShipImg.src ='./img/ship2.png'
spacrShipImg.onload = ()=>{
gameCanvas3.onmousemove = e=>{ 
spaceshipCreator(spacrShipImg,context,sound,context,context3,e.pageX,e.pageY)
} }
/////////////////////////////////////////////////////////////////////
let enemyimg =document.createElement('img')
enemyimg.src ='./img/ship4.png'
enemyimg.onload = () =>{
  setInterval(() => {
  let x = Math.floor(Math.random() * Math.floor(960));
  enemycreator(enemyimg,context2, x)
      }, 1000);
      
    }
     
}
//////////////////////////////////////////////////////////////////////////////////////////
 //creat spaceship function 
function spaceshipCreator(img,ctx,sound,ctx2,context3,x,y) {
if (true) {
        ctx.clearRect(0,0,1000,500)
        ctx.drawImage(img,40,30,300,200,x,y,40,30)    
       }
//////////////////////////////////////////////////////////////   
//caling laser shoot function + add Event 
   document.onclick =(e=>{
    LaserShoot(e.pageX,e.pageY,ctx2,context3)
 /////////////////////////////////////////////////////////////////////   
  // LaserShoot(e.pageX-5,e.pageY-5,ctx2)
    sound.currentTime =0;
    sound.play()})
  }
/////////////////////////////////////////////////////////////////////
//laser shoot +laser sound
function LaserShoot(laserX,laserY,ctx,context3) {
let laserCaunter = laserY
 laserInterval = setInterval(() => {
  if (laserCaunter ==0) {
    let laserCaunter= laserY
     clearInterval(laserInterval)
       
 }else{
       laserCaunter-=10}
ctx.fillStyle ="red"
ctx.clearRect(laserX+15,laserCaunter+10,3,5)
ctx.fillRect(laserX+15,laserCaunter,3,5)
ctx.stroke();
//calling checkExplosion function 
// checkExplosion(laserX,laserY,enX,enY)
// if(status=='explosion'){
//  console.log(status);
//  clearInterval(laserInterval)
//   drawExplosion('./img/explosion0.png',context3, enX, enY)  
//      }

      }, 50); 
   }
////////////////////////////////////////////////////////
function enemycreator(enemyimg,somCtx,enX) {
  var status= 'notExplosion'
enemObj = {
  x: enX,
  y: 0
}
let enemIndex = enemies.push(enemObj) - 1
let theEnemy = enemies[enemIndex]
 let enemyInterval= setInterval(() => {
  theEnemy.y += 5 
    
    // enX+= // creat function to macke enemy move as cercel
   
    somCtx.clearRect(theEnemy.x-10,theEnemy.y-30,60,50)
    somCtx.drawImage(enemyimg,0,0,700,400,theEnemy.x,theEnemy.y,40,30)
    
if (theEnemy.y==500 ) {
  clearInterval( enemyInterval)
}

////////////////////////////////////////////////////////////////    
if(status=='explosion'){
//  clearInterval(enemyInterval)
  console.log(enX,enY);
  somCtx.clearRect(enX,enY,40,30)
       }

    }, 40);

    
     
    }
//////////////////////////////////////////////////////////////////////////////////////////////////

function checkExplosion (laserX,laserY,enX,enY) {
      
      let enWidth = 30
      let enHeight = 30
      let laserWidth = 3
      let laserHeight = 5
      let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)

      let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY)
      let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
      let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + laserHeight)

      if(topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck){
        status = 'explosion'
      } 

      
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInside(enX , enY ,enWidth, enHeight, pointX , pointY ){
return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight )
    }
///////////////////////////////////////////////////////////
function drawExplosion(src,context3 , x, y) {
  let img  = document.createElement('img')
  img.src =src
  img.onload = function () {
context3.clearRect(x,y,70,50)
  context3.drawImage(img,0,0,200,100,x,y,70,50)
  clearInterval(laserInterval)
  clearInterval(enemyInterval)
   setTimeout(() => {
    context3.clearRect(x,y,70,50)
    status='notExplosion'
   }, 1000);
          
  }
}



      
       

       
  