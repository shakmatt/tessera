window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp() {
	var mousePos = 20000;
	if (!canvasSupport()) {
		return;
	}

	function  drawScreen () {

		context.fillStyle = '#EEEEEE';
		context.clearRect(0, 0, theCanvas.width, theCanvas.height);

		//Box
		// context.strokeStyle = '#000000';
		// context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);

		context.fillStyle = '#FF0000';
		context.beginPath();
		context.rect(theCanvas.width-37, 2, 35, 25);
		context.closePath();
		context.fill();

		//Place balls
		// context.fillStyle = "#000000";
		var ball;

		for (var i = 0; i <balls.length; i++) {
			ball = balls[i];

			//Determine distances and true positions
			var dx = mousePos.x - ball.x;
			var dy = mousePos.y - ball.y;
			var dis = Math.sqrt(dx*dx + dy*dy);
			if(mousePos.x > theCanvas.width-37 && mousePos.y < 27 && ball.picposy && (mousePos.x < theCanvas.width-5) && (mousePos.y > 5)){
				context.fillStyle = "#00FF00";
				var px = ball.picposx - ball.x;
				var py = ball.picposy - ball.y;

				var dist = Math.sqrt(px*px + py*py);
				var angle = Math.atan2(py,px);
				var mvx = Math.cos(angle);
				var mvy = Math.sin(angle);

				var power = 15;

				if(dist > 15){
					ball.x += (mvx * power);
					ball.y+= (mvy * power);
				}else{
					ball.x = ball.picposx;
					ball.y = ball.picposy;
				}

			}else if(dis <= 150 && (mousePos.y < theCanvas.height-15) && (mousePos.x < theCanvas.width-15) && (mousePos.x > 15) && (mousePos.y >15)){
				//Make the squares magnetic to the cursor
				context.fillStyle = "#0000FF";
				var angle = Math.atan2(dy,dx);
				var mvx = Math.cos(angle);
				var mvy = Math.sin(angle);

				var power = 5;
				ball.x += (mvx * power);
				ball.y+= (mvy * power);
			}else{
				//Original speed and direction
				context.fillStyle = "#A8937B";
				ball.x += ball.xunits;
				ball.y += ball.yunits;
			}


			context.beginPath();
			context.rect(ball.x, ball.y, ball.width, ball.height);
			context.closePath();
			context.fill();

			

			if (ball.x > theCanvas.width || ball.x < 0 ) {
				ball.angle = 180 - ball.angle;
				updateBall(ball);
			} else if (ball.y > theCanvas.height || ball.y < 0) {
				ball.angle = 360 - ball.angle;
				updateBall(ball);
			}
		}

	}

	function updateBall(ball) {

		ball.radians = ball.angle * Math.PI/ 180;
		ball.xunits = Math.cos(ball.radians) * ball.speed;
		ball.yunits = Math.sin(ball.radians) * ball.speed;
	}

	var numBalls =266;
	// var numBalls = 1;
	var maxSize = 15;
	var minSize = 10;
	var maxSpeed = maxSize+5;
	var balls = new Array();
	var tempBall;
	var tempX;
	var tempY;
	var tempSpeed;
	var tempAngle;
	var tempRadius;
	var tempRadians;
	var tempXunits;
	var tempYunits;

	theCanvas = document.getElementById("canvasOne");
	context = theCanvas.getContext("2d");

	for (var i = 0; i < numBalls; i++) {
		// tempRadius = Math.floor(Math.random()*maxSize)+minSize;
		tempRadius = maxSize;
		tempX = tempRadius*2 + (Math.floor(Math.random()*theCanvas.width)-tempRadius*2);
		tempY = tempRadius*2 + (Math.floor(Math.random()*theCanvas.height)-tempRadius*2);
		tempSpeed = maxSpeed-tempRadius;
		tempAngle = Math.floor(Math.random()*360);
		tempRadians = tempAngle * Math.PI/ 180;
		tempXunits = Math.cos(tempRadians) * tempSpeed;
		tempYunits = Math.sin(tempRadians) * tempSpeed;

		tempBall = {x:tempX,y:tempY,radius:tempRadius, width:tempRadius, height:tempRadius, speed:tempSpeed, angle:tempAngle,
		xunits:tempXunits, yunits:tempYunits}
		balls.push(tempBall);
	}

	var width = 30;
	var height = 30;
	var i = 0;

	while(i < numBalls){
		balls[i].picposy = height;
		balls[i].picposx = theCanvas.width - width;

		width += 15;
		if(width > 300){
			width = 30;
			height += 15;
		}
		i++;
	}

	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen()
	}
	gameLoop();

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	theCanvas.addEventListener("mousemove", function(e){
		mousePos = getMousePos(theCanvas, e);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	});


}

function clockTime(){
	window.setTimeout(clockTime, 1000);
	var t = new Date();

	var temp = checkTime(t.getHours());
	document.getElementById("hours1").innerHTML = temp.substr(0,1);
	document.getElementById("hours2").innerHTML = temp.substr(1,1);

	temp = checkTime(t.getMinutes());
	document.getElementById("min1").innerHTML = temp.substr(0,1);
	document.getElementById("min2").innerHTML = temp.substr(1);

	temp = checkTime(t.getSeconds());
	document.getElementById("sec1").innerHTML = temp.substr(0,1);
	document.getElementById("sec2").innerHTML = temp.substr(1);
}

clockTime();

function checkTime(tm){
	var temp;
	if(tm < 10){
		temp = "0" + tm.toString();
	}else{
		temp = tm.toString();
	}
	return temp;
}