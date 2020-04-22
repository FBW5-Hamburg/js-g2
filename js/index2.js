window.onload = function(){
    


    let container=document.querySelector('.container')
    ////////////////////////////////////////////////////////////////   
       
   ///////////////////////////////////////////////
   //declering layer1 canvas
       let gameCanvas = document.querySelector('#gameCanvas')
       let context = gameCanvas.getContext('2d')
       enemycreator('./img/ship4.png',context)
}


function enemycreator(src,somCtx) {
        let enX =0
        let enY =0
  
          setInterval(() => {
            // enX+=100
          let swetsher =true
         let enemyimg =document.createElement('img')
         enemyimg.src =src
         enY+=5
         enX+=1
         enemyimg.onload= function () {
          somCtx.clearRect(0,0,1000,500)
           somCtx.drawImage(enemyimg,0,0,700,400,enX,enY,40,30)
                 } 
          if (enY==500 && swetsher==true) {
          enY=0
          enX+=50

            
          }
          else{if(enX==1000 && swetsher==true){
            swetsher=false
            enX-=50
          } }
        
          
        }, 10);

        
         
        }
        
        
      