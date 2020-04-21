window.onload = function(){

    let container=document.querySelector('.container')
    //creat laser sound
    let sound = document.createElement("audio")
    sound.src = './audi/heat-vision.mp3'
    sound.setAttribute("preload","auto")
    sound.setAttribute("controls","none")
    sound.style.display ="none"
    container.append(sound)
    
    
    let gameCanvas = document.querySelector('#gameCanvas')
    let context = gameCanvas.getContext('2d')
    
    //creat spaceship 
    let img  = document.createElement('img')
    img.src ='./img/spaceship.1.small_.green_.png'
    img.onload = function () {
        let x =10
        let y=10
        //add Event to the space ship 
        gameCanvas.onmousemove = (e=>{
             console.log(e.pageX);
             //let mousePos = getMousePos(gameCanvas, e)
             let mouse = {
                x: e.pageX - this.offsetLeft,
                y: e.pageY - this.offsetTop
            }
            //  x = mousePos.x
            //  y = mousePos.y
            x = mouse.x
            y = mouse.y             
           if (true) {
            //    let x= e.pageX
            //    let y= e.pageY
              context.clearRect(0,0,300,300)
               context.drawImage(img,0,0,100,88,x,y,30,20)
           }
        } )
        //caling laser shoot function + add Event 
       document.onclick =(e=>{
        // console.log(e);
        LaserShoot(e.pageX,e.pageY)
        // LaserShoot(e.pageX-5,e.pageY-5)
        sound.play()
    })

    }
 
     //laser shoot +laser sound
 function LaserShoot(laserX,laserY) {
    let laserCaunter = laserY
    setInterval(() => {
     context.fillStyle ="green"
     context.clearRect(laserX+15,laserCaunter+10,1,5)
     context.fillRect(laserX+15,laserCaunter,1,5)
     if (laserCaunter ==0) {
       laserCaunter= laserY
     }else{
       laserCaunter-=10
     }
      }, 50);

      
    

       
   }

    // let spaceShip =document.createElement('div')
    // spaceShip.classList.add('spaceShip')
    // container.append(spaceShip)

}



function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.pageX - rect.left,
      y: evt.pageY - rect.top
    };
  }
  


      
       

       
  