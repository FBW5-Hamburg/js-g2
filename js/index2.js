
//window.onload=()=>{
// 	let container=document.querySelector('.container')
// 	///////////////////////////////////////////////
// 	//declering layer1 canvas
// 	let gameCanvas = document.querySelector('#gameCanvas')
// 	let context = gameCanvas.getContext('2d')

// 	//////////////////////////////////////////////////////////////////////7
   
//    document.onclick =(e=>{
// 	   LaserShoot(e.pageX,e.pageY,context)
// 	})
	   
   
//    function LaserShoot(laserX,laserY,ctx) {
// 	   let laserCaunter = laserY
// 		laserInterval = setInterval(() => {
// 		 if (laserCaunter <=0) {
// 			clearInterval(laserInterval) 
// 			laserCaunter=laserY
// 		}else{
// 			  laserCaunter-=10}
// 	       ctx.fillStyle ="red"
// 	       ctx.clearRect(laserX+15,laserCaunter+10,3,5)
// 	       ctx.fillRect(laserX+15,laserCaunter,3,5)
// 	       ctx.stroke();
// 			 }, 50); 
// 		  }
// }
// /////////////////////////////////////////////////
// function checkExplosion (laserX,laserY,enX,enY) {
      
// 	let enWidth = 30
// 	let enHeight = 30
// 	let laserWidth = 3
// 	let laserHeight = 5
// 	let topLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX, laserY)

// 	let topRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY)
// 	let buttomRightCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX + laserWidth, laserY + laserHeight)
// 	let buttomLeftCornerCheck = checkInside(enX , enY ,enWidth, enHeight, laserX , laserY + laserHeight)

// 	if(topLeftCornerCheck || topRightCornerCheck || buttomRightCornerCheck || buttomLeftCornerCheck){
// 	  status = 'explosion'
// 	} 

	
//   }

let arr =[{x:50,y:0},{x:30,y:0},{x:8,y:0}]

function checkInside(array,enWidth,laserX) {
	for (let i = 0; i < array.length; i++) {
	if (laserX>=array[i].x || laserX <= (array[i].x + enWidth)) {
		array.splice(i,1)
	 }
	 }}

checkInside(arr,40,10)
console.log(arr.length)

