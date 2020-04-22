window.onload = function(){

    let container=document.querySelector('.container')
 ////////////////////////////////////////////////////////////////   
    //creat laser sound
    let sound = document.createElement("audio")
    sound.src = './audi/heat-vision.mp3'
    sound.setAttribute("preload","auto")
    sound.setAttribute("controls","none")
    sound.style.display ="none"
    container.append(sound)
    
///////////////////////////////////////////////
//declering layer1 canvas
    let gameCanvas = document.querySelector('#gameCanvas')
    let context = gameCanvas.getContext('2d')
    
//////////////////////////////////////////
//declering layer2 cnvas1
    let enemyCanvas = document.querySelector('#gameCanvas2')
    let context2 = gameCanvas.getContext('2d',{alpha:false})

     context2.globalCompositeOperation = 'destination-over';
       

 //////////////////////////////////////////////////////
 //declering layer3 canvas3
 let meteorCanvas = document.querySelector('#gameCanvas3')
 let context3 = gameCanvas.getContext('2d')
    //create enemys space ships
    
    
 ////////////////////////////////////////////////////
    //creat spaceship 
    let img  = document.createElement('img')
    img.src ='./img/ship2.png'
    img.onload = function () {
        let x =10
        let y=10
        //add Event to the space ship 
        gameCanvas.onmousemove = (e=>{         
           if (true) {
            let x= e.pageX
            let y= e.pageY
            context.clearRect(0,0,1000,1000)
            context.drawImage(img,40,30,300,200,x,y,40,30)
               
           }
        } )
        //caling laser shoot function + add Event 
       document.onclick =(e=>{
        // console.log(e);
        LaserShoot(e.pageX,e.pageY)
        // LaserShoot(e.pageX-5,e.pageY-5)
        sound.currentTime =0;
        sound.play()
    })
    context.globalCompositeOperation = 'source-over';
    }
 
     //laser shoot +laser sound
 function LaserShoot(laserX,laserY) {
    let laserCaunter = laserY
   
    
    let laserInterval = setInterval(() => {
        
     if (laserCaunter ==0) {
       laserCaunter= laserY
       clearInterval(laserInterval)
       
     }else{
       laserCaunter-=10
     }
     context.fillStyle ="red"
     context.clearRect(laserX+15,laserCaunter+10,3,5)
     context.fillRect(laserX+15,laserCaunter,3,5)
     context.stroke();
      }, 50);
 


       
   }

   //enemys creating function 
  //  function enemycreator(src,somCtx,enX,enY) {
  //    let enX =0
  //    let enY =0
  //    if (enX<1000) {
  //      setInterval(() => {
  //        enX+=100
  //        enY+=10
  //     let enemyimg =document.createElement('img')
  //     enemyimg.src =src

  //     enemyimg.onload= function () {
  //       somCtx.clearRect()
  //       somCtx.drawImage(enemyimg,0,0,700,400,enX,enY,40,30)
  //             } 
       
  //    }, 1000);
  //    }else{
  //     enX =0
  //    }
     
     
  //  }




    
}




  


      
       

       
  