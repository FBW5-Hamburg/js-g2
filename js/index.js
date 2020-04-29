var enemies = []
var explosionenImg = null
var explosionCtx = null
var exploionsound = null
var scoreCounter = 0
var spaceshipCreatorCheck = true
// var laserArr=[]
// var status = false

window.onload = function () {
  //get container bei id 
  let container = document.querySelector('.container')
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
  exploionsound.setAttribute("preload", "auto")
  exploionsound.setAttribute("controls", "none")
  exploionsound.style.display = "none"
  container.append(exploionsound)
  ///////////////////////////////////////////////7
  //declaring laser sound
  let sound = document.createElement("audio")
  sound.src = './audi/heat-vision.mp3'
  sound.setAttribute("preload", "auto")
  sound.setAttribute("controls", "none")
  sound.style.display = "none"
  container.append(sound)

  ///////////////////////////////////////////
  //declering explosion img  
  explosionenImg = document.createElement('img')
  explosionenImg.src = './img/explosion0.png'
  //////////////////////////////////////////////////////////////////////
  // start button declering + add event listener
  let startBtn = document.querySelector('#startBtn')
  startBtn.addEventListener('click', function (e) {
    startBtn.classList.add('startBtn')
    ////////////////////////////////////////////////////////////////////////
    //declaring space ship image 

    let spacrShipImg = document.createElement('img')
    spacrShipImg.src = './img/ship2.png'
    spacrShipImg.onload = () => {
      gameCanvas3.onmousemove = e => {
        spaceshipCreator(spacrShipImg, context, sound, context, e.pageX, e.pageY)
        spaceshipExplosion(e.pageX, e.pageY, context, enemyShipInterval)
      }
    }
    /////////////////////////////////////////////////////////////////////
    //declaring enemy image
    let enemyimg = document.createElement('img')
    enemyimg.src = './img/ship4.png'
    enemyimg.onload = () => {
      var enemyShipInterval = setInterval(() => {
        let x = Math.floor(Math.random() * Math.floor(960));
        enemycreator(enemyimg, context2, x)
      }, 1500);
    }
  })

}
//////////////////////////////////////////////////////////////////////////////////////////
//creat spaceship function
function spaceshipCreator(img, ctx, sound, ctx2, x, y) {

  //let spaceShipInterval = setInterval(() => {
    
   
  if (true) {
    ctx.clearRect(0, 0, 1000, 500)
    ctx.drawImage(img, 40, 30, 300, 200, x, y, 40, 30)

   } 

   //}, 1);
  //////////////////////////////////////////////////////////////   
  //caling laser shoot function + add Event 
  document.onclick = (e => {
    LaserShoot(e.pageX, e.pageY, ctx2)
    ////////////////////////////// 
    // LaserShoot(e.pageX-5,e.pageY-5,ctx2)
    sound.currentTime = 0;
    sound.play()
  })

  
}
/////////////////////////////////////////////////////////////////////
//laser shoot +laser sound

function LaserShoot(laserX, laserY, ctx) {
  let laserCaunter = laserY
  let laserInterval = setInterval(() => {
    if (laserCaunter == 0) {

      clearInterval(laserInterval)

    } else {
      laserCaunter -= 10
    }
    ctx.fillStyle = "red"
    ctx.clearRect(laserX + 15, laserCaunter + 10, 3, 5)
    ctx.fillRect(laserX + 15, laserCaunter, 3, 5)
    ctx.stroke();
    //calling checkExplosion function 

    checkExplosion(enemies, laserX, laserCaunter)
  }, 50);

}
////////////////////////////////////////////////////////
function enemycreator(enemyimg, somCtx, enX) {

  enemObj = {
    x: enX,
    y: 0,
    ctx: somCtx
  }
  let enemIndex = enemies.push(enemObj) - 1
  let theEnemy = enemies[enemIndex] /// 


  let enemyInterval = setInterval(() => {
    theEnemy.y += 10
    // console.log(enemies);
    somCtx.clearRect(theEnemy.x - 10, theEnemy.y - 30, 60, 50)
    somCtx.drawImage(enemyimg, 0, 0, 700, 400, theEnemy.x, theEnemy.y, 50, 40)

    if (theEnemy.y == 500) {
      clearInterval(enemyInterval)
    }
  }, 50);
  enemies[enemIndex].interval = enemyInterval
}

//////////////////////////////////////////////////////////////////////////////////////////////////


function checkExplosion(array, laserX, laserY) {

  let enWidth = 50
  let enHeight = 40
  let laserWidth = 3
  let laserHeight = 5

  for (let i = 0; i < enemies.length; i++) {

    let enX = enemies[i].x
    let enY = enemies[i].y
    let topLeftCornerCheck = checkInside(enX, enY, enWidth, enHeight, laserX, laserY)
    let topRightCornerCheck = checkInside(enX, enY, enWidth, enHeight, laserX + laserWidth, laserY)
    let buttomRightCornerCheck = checkInside(enX, enY, enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
    let buttomLeftCornerCheck = checkInside(enX, enY, enWidth, enHeight, laserX, laserY + laserHeight)
    if (topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck) {

      //array.splice(i,1)
      clearInterval(enemies[i].interval)

      enemies[i].ctx.clearRect(enX, enY, enWidth, enHeight)
      drawExplosion(explosionenImg, explosionCtx, enX, enY, exploionsound)
      enemies.splice(i, 1)
      //drawExplosion()

      scoreCounter = scoreCounter + 1
      score.innerText = scoreCounter
    }

  }
}

////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////spaceShipExplosion/////////////////////////////////////
function spaceshipExplosion(shipX, shipY, ctx,enemyShipInterval) {
  let enWidth = 50
  let enHeight = 40
  let shipWidth = 40
  let shipHeight = 35
  for (let i = 0; i < enemies.length; i++) {
    let enX = enemies[i].x
    let enY = enemies[i].y
    let topLeftCornerCheck = checkInside(enX, enY, enWidth, enHeight, shipX, shipY)
    let topRightCornerCheck = checkInside(enX, enY, enWidth, enHeight, shipX + shipWidth, shipY)
    let buttomRightCornerCheck = checkInside(enX, enY, enWidth, enHeight, shipX + shipWidth, shipY + shipHeight)
    let buttomLeftCornerCheck = checkInside(enX, enY, enWidth, enHeight, shipX, shipY + shipHeight)
    if (topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck) {
      console.log("crash");
      spaceshipCreatorCheck = false
      //clearInterval(spaceShipInterval)

      clearInterval(enemyShipInterval)
      ctx.fillStyle = "red"
      ctx.font = "80px Verdana"
      ctx.fillText("GAME OVER", 250, 250)

    }
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInside(enX, enY, enWidth, enHeight, pointX, pointY) {
  return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight)
}
///////////////////////////////////////////////////////////


function drawExplosion(img, explosionContext, x, y, exploionsound) {


  explosionContext.drawImage(img, 0, 0, 200, 100, x, y, 90, 50)
  setTimeout(() => {
    explosionContext.clearRect(x, y, 70, 50)
  }, 1000);

  exploionsound.currentTime = 0
  exploionsound.play()

}



//  function checkMyshipXplosion(myShipX,myShipY) {
//   let enWidth = 50
//   let enHeight = 40
//   let myShipWidth = 40
//   let myShipHeight = 30

// for (let i = 0; i < enemies.length; i++) {

//   let enX= enemies[i].x
//   let enY = enemies[i].y
//   let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)
//   let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + myShipWidth, laserY)
//   let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + myShipWidth, laserY + myShipHeight)
//   let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + myShipHeight)
//   if(topLeftCornerCheck || topRightCornerCheck||buttomRightCornerCheck||buttomLeftCornerCheck){

//     //array.splice(i,1)
//     clearInterval(enemies[i].interval)

//     enemies[i].ctx.clearRect(enX, enY, enWidth, enHeight)

//     drawExplosion(explosionenImg,explosionCtx,enX,enY,exploionsound)

//     enemies.splice(i,1)



//   } 

//  }   
//   }
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