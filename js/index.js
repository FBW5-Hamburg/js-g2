var enemies = []
var meteors = []
var explosionenImg = null
var explosionCtx = null
var context=null
var exploionsound = null
var scoreCounter = 0
var bullets = []
var spaceshipCreatorCheck = true
var enemyShipInterval
var meteorInterval
var status = "notExpilo"
// var status = false
window.onload = function () {
  //get container bei id 
  let container = document.querySelector('.container')
  ////////////////////////////////////////////////////////////
  var score = document.querySelector('#score')
  /////////////////////////////////////////////
  //declering layer1 canvas
  var gameCanvas = document.querySelector('#gameCanvas')
   context = gameCanvas.getContext('2d')
  /////////////////////////////////////////////////////////
  //declering layer2 canvas
  var gameCanvas2 = document.querySelector('#gameCanvas2')
  var context2 = gameCanvas2.getContext('2d')
  ////////////////////////////////////////////////////
  //declering layer3 canvas
  var gameCanvas3 = document.querySelector('#gameCanvas3')
  explosionCtx = gameCanvas3.getContext('2d')
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
  ////////////////////////////////////////////////////////    
  gameMusic = document.createElement("audio")
  gameMusic.src = './audi/music.mp3'
  gameMusic.setAttribute("preload", "auto")
  gameMusic.style.display = "none"
  container.append(gameMusic)
  ///////////////////////////////////////////
  //declering explosion img  
  explosionenImg = document.createElement('img')
  explosionenImg.src = './img/explosion0.png'
  //////////////////////////////////////////////////////////////////////
  //declaring enemy bullet
  // var enemyBullet = document.createElement('img')
  // enemyBullet.src = './img/laser0.png'
  // start button declering + add event listener
  let startBtn = document.querySelector('#startBtn')
  startBtn.addEventListener('click', function (e) {
    if(spaceshipCreatorCheck == true){
      startBtn.classList.add('startBtn')
    /////////////////////////////////////////////////////////////////
    gameMusic.play()
    ////////////////////////////////////////////////////////////////////////
    //declaring space ship image 
    let spacrShipImg = document.createElement('img')
    spacrShipImg.src = './img/ship2.png'
    spacrShipImg.onload = () => {
      gameCanvas3.onmousemove = e => {
        spaceshipCreator(spacrShipImg, context, sound, context, e.pageX, e.pageY)
        spaceshipExplosion(e.pageX, e.pageY, context, enemyShipInterval)
        spaceshipExplosion1(e.pageX, e.pageY, context, meteorInterval)
      }
    }
    /////////////////////////////////////////////////////////////////////
    //declaring enemy image
    let enemyimg = document.createElement('img')
    enemyimg.src = './img/ship4.png'
    enemyimg.onload = () => {
      enemyShipInterval = setInterval(() => {
        let x = Math.floor(Math.random() * Math.floor(960));
        enemycreator(enemyimg, context2, x)
      }, 1500);
    }
    } else {
     clearInterval (meteorInterval)
     clearInterval(enemyShipInterval)
    }
    /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    let meteoresImg = document.createElement('img')
    meteoresImg.src = './img/Rock0.png'
    meteoresImg.onload = () => {
      meteorInterval = setInterval(() => {
        let x = Math.floor(Math.random() * Math.floor(960))
        meteorCreator(meteoresImg, explosionCtx, x, 0)
      }, 7000)
     
    }
  })
  let endGame = document.querySelector('#endGame')
}
//////////////////////////////////////////////////////////////////////////////////////////
//creat spaceship function 
function spaceshipCreator(img, ctx, sound, ctx2, x, y) {
  let shipTot= spaceshipCreatorCheck
  if (true) {
    ctx.clearRect(0, 0, 1000, 500)
    ctx.drawImage(img, 40, 30, 300, 200, x, y, 40, 30)
  }
  if (shipTot==false) {
    ctx.clearRect(x,y,40,30)
    
  }
 
  
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
      laserCaunter -= 30
    }
    ctx.fillStyle = "red"
    ctx.clearRect(laserX + 15, laserCaunter + 30, 3, 5)
    ctx.fillRect(laserX + 15, laserCaunter, 3, 5)
    ctx.stroke();
    //calling checkExplosion function 
    checkExplosion(enemies, laserX, laserCaunter)
  }, 30);
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
    theEnemy.y += 5
    // console.log(enemies);
    somCtx.clearRect(theEnemy.x - 10, theEnemy.y - 30, 60, 50)
    somCtx.drawImage(enemyimg, 0, 0, 700, 400, theEnemy.x, theEnemy.y, 50, 40)
    if (theEnemy.y == 500) {
      clearInterval(enemyInterval)
    }
  }, 50);
  enemyBullets(somCtx,theEnemy.x,theEnemy.y)
  enemies[enemIndex].interval = enemyInterval
}
//////////////////////////////////////////////////////////////////////////////////
function meteorCreator(meteoresImg, somCtx, meteorX, meteorY) {
  meteorObj = {
    x: meteorX,
    y: meteorY - 5,
    ctx: somCtx
  }
  let meteorIndex = meteors.push(meteorObj) - 1
  let theMeteor = meteors[meteorIndex]
  let meteorInterval = setInterval(() => {
    theMeteor.y += 5
    somCtx.clearRect(theMeteor.x - 20, theMeteor.y - 30, 244, 100)
    somCtx.drawImage(meteoresImg, 0, 0, 500, 400, theMeteor.x, theMeteor.y, 224, 244)
    if (theMeteor.y == 500) {
      clearInterval(meteorInterval)
    }
    meteors[meteorIndex].interval = meteorInterval
  }, 50);
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
///////////////////////////////////////////////////////////
function spaceshipExplosion(shipX, shipY, ctx, enemyShipInterval) {
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
      drawExplosion(explosionenImg, explosionCtx, shipX, shipY, exploionsound)
      console.log("crash");
      spaceshipCreatorCheck = false
      clearInterval(enemyShipInterval)
      setTimeout(()=>{endGame.classList.add('endGame1')},1000)
      
      
    }
    if(spaceshipCreatorCheck == false){
      clearInterval(enemyShipInterval)
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
function spaceshipExplosion1(shipX, shipY, ctx, meteorInterval) {
  let meWidth = 50
  let meHeight = 70
  let shipWidth = 40
  let shipHeight = 35
  for (let i = 0; i < meteors.length; i++) {
    let meX = meteors[i].x
    let meY = meteors[i].y
    let topLeftCornerCheck = checkInside(meX, meY, meWidth, meHeight, shipX, shipY)
    let topRightCornerCheck = checkInside(meX, meY, meWidth, meHeight, shipX + shipWidth, shipY)
    let buttomRightCornerCheck = checkInside(meX, meY, meWidth, meHeight, shipX + shipWidth, shipY + shipHeight)
    let buttomLeftCornerCheck = checkInside(meX, meY, meWidth, meHeight, shipX, shipY + shipHeight)
    if (topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck) {
      drawExplosion(explosionenImg, context, shipX, shipY, exploionsound)
      console.log("crash");
      spaceshipCreatorCheck = false
      clearInterval(meteorInterval)
      setTimeout(()=>{endGame.classList.add('endGame1')},1000)
    }
  }
  if(spaceshipCreatorCheck == false){
    clearInterval(meteorInterval)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInside(enX, enY, enWidth, enHeight, pointX, pointY) {
  return (pointX >= enX && pointX <= enX + enWidth) && (pointY >= enY && pointY <= enY + enHeight)
}
///////////////////////////////////////////////////////////
function drawExplosion(img, explosionContext, x, y, exploionsound) {
  explosionContext.drawImage(img, 0, 0, 200, 100, x, y, 70, 50)
  setTimeout(() => {
    explosionContext.clearRect(x, y, 70, 50)
  }, 1000);
  exploionsound.currentTime = 0
  exploionsound.play()
}
//////////////////////////////////////////////////////////////////////
function enemyBullets(somCtx,bulletX,bulletY) {
  
  let bulletCaunter = bulletY
  let bulletInterval = setInterval(() => {
    if (bulletCaunter == 500) {
      clearInterval(bulletInterval)
    } else {
      bulletCaunter =bulletCaunter+15
    }
    somCtx.fillStyle = "red"
    somCtx.clearRect(bulletX + 20, bulletCaunter-15, 5, 5)
    somCtx.fillRect(bulletX + 20, bulletCaunter+15, 5, 5)
    somCtx.stroke();
    //calling checkExplosion function 

    // checkExplosion(enemies, laserX, bulletCaunter)
  }, 50);

}