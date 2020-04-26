var enemies = []
var laserArr=[]
var status = false

window.onload = function(){
 //get container bei id 
let container=document.querySelector('.container')
////////////////////////////////////////////////////////////
let exploionsound = document.createElement("audio")
exploionsound.src = './audi/Explosion+5.mp3'
exploionsound.setAttribute("preload","auto")
exploionsound.setAttribute("controls","none")
exploionsound.style.display ="none"
container.append(exploionsound)
if(status==true){
  exploionsound.play()
}

/////////////////////////////////////////////
//declering layer1 canvas
let gameCanvas = document.querySelector('#gameCanvas')
let context = gameCanvas.getContext('2d')
/////////////////////////////////////////////////////////
//declering layer3 canvas
let gameCanvas3 = document.querySelector('#gameCanvas3')
let context3 = gameCanvas3.getContext('2d')
 ////////////////////////////////////////////////////
 //declering layer2 canvas
let gameCanvas2 = document.querySelector('#gameCanvas2')
let context2 = gameCanvas2.getContext('2d')
///////////////////////////////////////////////////////////
    //declaring laser sound
    let sound = document.createElement("audio")
    sound.src = './audi/heat-vision.mp3'
    sound.setAttribute("preload","auto")
    sound.setAttribute("controls","none")
    sound.style.display ="none"
    container.append(sound)

///////////////////////////////////////////

let startBtn =document.querySelector('#startBtn')
startBtn.addEventListener('click',function (e) {
  startBtn.classList.add('startBtn')

//////////////////////////////////////////////////////////////////////
//declering explosion img  
let explogenImg  = document.createElement('img')
explogenImg.src ='./img/explosion0.png'

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
      }, 1500);
}  
})
 
}
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
    // let laserCaunter= laserY
     clearInterval(laserInterval)
       
 }else{
       laserCaunter-=10}
ctx.fillStyle ="red"
ctx.clearRect(laserX+15,laserCaunter+10,3,5)
ctx.fillRect(laserX+15,laserCaunter,3,5)
ctx.stroke();
//calling checkExplosion function 
  
 checkExplosion(enemies,laserX,laserY)
      }, 50);

   }
////////////////////////////////////////////////////////
function enemycreator(enemyimg,somCtx,enX) {
 
enemObj = {
  x: enX,
  y: 0
}
let enemIndex = enemies.push(enemObj) - 1
let theEnemy = enemies[enemIndex]/// 


 let enemyInterval= setInterval(() => {
  theEnemy.y += 5 
    // console.log(enemies);
    somCtx.clearRect(theEnemy.x-10,theEnemy.y-30,60,50)
    somCtx.drawImage(enemyimg,0,0,700,400,theEnemy.x,theEnemy.y,40,30)
    
if (theEnemy.y==500 ) {
  clearInterval( enemyInterval)
}
    }, 50);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////


function checkExplosion(array,laserX,laserY) {
  let enWidth = 40
  let enHeight = 30
  let laserWidth = 3
  let laserHeight = 5
  
for (let i = 0; i < array.length; i++) {
  let enX= array[i].x
  let enY = array[i].y
  let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)
  let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY)
  let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
  let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + laserHeight)
  if(topLeftCornerCheck || topRightCornerCheck||buttomRightCornerCheck||buttomLeftCornerCheck){
  
    array.splice(i,1)
  
    status =true
  } 
  setTimeout(()=>{
    status =false
  },1000)
  console.log(status);
  
 }   
}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInside(enX , enY ,enWidth, enHeight, pointX , pointY ){
return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight )
    }
///////////////////////////////////////////////////////////


function drawExplosion(img,context3,x,y) {
  
  img.onload = function () {

  context3.clearRect(x,y,70,50)
  context3.drawImage(img,0,0,200,100,x,y,70,50)
  clearInterval(laserInterval)
  clearInterval(enemyInterval)
  setTimeout(() => {
    context3.clearRect(x,y,70,50)
   }, 1000);
          
  }
}
////////////////////////////////////////
// function exploSaund(exploionsound,status) {
//   if (status==true){
//     exploionsound.currentTime =0;
//     exploionsound.play()
//     log
//   }
  
// }
/////////////////////////////////////////////////////////////////
// function checkExplosion (laserX,laserY,enX,enY) {
      
//       let enWidth = 30
//       let enHeight = 30
//       let laserWidth = 3
//       let laserHeight = 5
//       let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)

//       let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY)
//       let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
//       let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + laserHeight)

//       if(topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck){
//         status = 'explosion'
//       } 

      
//     }



      
       

       
