
window.onload=()=>{
	let container=document.querySelector('.container')
	///////////////////////////////////////////////
	//declering layer1 canvas
	let gameCanvas = document.querySelector('#gameCanvas')
	let context = gameCanvas.getContext('2d')

	//////////////////////////////////////////////////////////////////////7
   
   document.onclick =(e=>{
	   LaserShoot(e.pageX,e.pageY,context)
	})
	   
   
   function LaserShoot(laserX,laserY,ctx) {
	   let laserCaunter = laserY
		laserInterval = setInterval(() => {
		 if (laserCaunter <=0) {
			clearInterval(laserInterval) 
			laserCaunter=laserY
		}else{
			  laserCaunter-=10}
	       ctx.fillStyle ="red"
	       ctx.clearRect(laserX+15,laserCaunter+10,3,5)
	       ctx.fillRect(laserX+15,laserCaunter,3,5)
	       ctx.stroke();
			 }, 50); 
		  }
}


