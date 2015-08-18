// window.addEventListener('load', eventWindowLoaded, false);
// function eventWindowLoaded() {
// 	canvasApp();
// }

// function canvasSupport () {
// 	return Modernizr.canvas;
// }

// function canvasApp() {
// 	// var mousePos = 20000;
// 	if (!canvasSupport()) {
// 		return;
// 	}

// 	function  drawScreen () {

// 		// context.fillStyle = '#EEEEEE';
// 		context.clearRect(0, 0, theCanvas.width, theCanvas.height);
		
// 		//Box
// 		// context.strokeStyle = '#000000';
// 		// context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);


// 		//Place balls
// 		// context.fillStyle = "#000000";
// 		var ball;

// 		for (var i = 0; i <balls.length; i++) {
// 			ball = balls[i];

// 			//Original speed and direction
// 			context.fillStyle = "#A8937B";
// 			ball.x += ball.xunits;
// 			ball.y += ball.yunits;


// 			context.beginPath();
// 			context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
// 			context.closePath();
// 			context.fill();

			

// 			if (ball.x > theCanvas.width || ball.x < 0 ) {
// 				ball.angle = 180 - ball.angle;
// 				updateBall(ball);
// 			} else if (ball.y > theCanvas.height || ball.y < 0) {
// 				ball.angle = 360 - ball.angle;
// 				updateBall(ball);
// 			}
// 		}

// 	}

// 	function updateBall(ball) {

// 		ball.radians = ball.angle * Math.PI/ 180;
// 		ball.xunits = Math.cos(ball.radians) * ball.speed;
// 		ball.yunits = Math.sin(ball.radians) * ball.speed;
// 	}

// 	// var numBalls =266;
// 	var numBalls = 500;
// 	var maxSize = 1;
// 	var minSize = 0.5;
// 	var maxSpeed = maxSize+1;
// 	var balls = new Array();
// 	var tempBall;
// 	var tempX;
// 	var tempY;
// 	var tempSpeed;
// 	var tempAngle;
// 	var tempRadius;
// 	var tempRadians;
// 	var tempXunits;
// 	var tempYunits;

// 	theCanvas = document.getElementById("canvasOne");
// 	context = theCanvas.getContext("2d");
// 	context.canvas.width  = window.innerWidth * 0.985;
//  	context.canvas.height = window.innerHeight * 0.99;

// 	for (var i = 0; i < numBalls; i++) {
//       tempRadius = Math.floor(Math.random()*maxSize)+minSize;
//       tempX = tempRadius*2 + (Math.floor(Math.random()*theCanvas.width)-tempRadius*2);
//       tempY = tempRadius*2 + (Math.floor(Math.random()*theCanvas.height)-tempRadius*2);
//       tempSpeed = maxSpeed-tempRadius;
//       tempAngle = Math.floor(Math.random()*360);
//       tempRadians = tempAngle * Math.PI/ 180;
//       tempXunits = Math.cos(tempRadians) * tempSpeed;
//       tempYunits = Math.sin(tempRadians) * tempSpeed;

//       tempBall = {x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed, angle:tempAngle,
//           xunits:tempXunits, yunits:tempYunits}
//       balls.push(tempBall);
//    }

// 	function gameLoop() {
// 		window.setTimeout(gameLoop, 83);
// 		drawScreen()
// 	}
// 	gameLoop();

// 	// function getMousePos(canvas, evt) {
// 	// 	var rect = canvas.getBoundingClientRect();
// 	// 	return {
// 	// 		x: evt.clientX - rect.left,
// 	// 		y: evt.clientY - rect.top
// 	// 	};
// 	// }

// 	// theCanvas.addEventListener("mousemove", function(e){
// 	// 	mousePos = getMousePos(theCanvas, e);
// 	// 	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
// 	// });


// }

//http://stackoverflow.com/questions/30019194/html5-canvas-floating-particles-responsive-fix
//http://eventfuljava.cs.williams.edu/s04/lectures/Lecture8/Spiral.html
//http://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
//http://codepen.io/bionicoz/pen/xCIDH
//


//Dust Particles Simulation by bionicoz based on
//Basic Particle Animation
//Author: Brandon John-Freso
$(function () {
    var W, H,
        canvas, ctx, //ctx stands for context and is the "curso" of our canvas element.
        particleCount = 700,
        particles = []; //this is an array which will hold our particles Object/Class

    W = window.innerWidth * 0.98;
    H = window.innerHeight * 0.98;
    
    canvas = $("#canvas").get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection
    canvas.width = W;
    canvas.height = H;

    ctx = canvas.getContext("2d"); // settng the context to 2d rather than the 3d WEBGL
    ctx.globalCompositeOperation = "lighter";
    console.log(ctx);
    var mouse = {
      x: 0, 
      y: 0,
      rx:0,
      ry:0,
      speed:45,
      delta:0
    };
    


    document.addEventListener('mousemove', function(e){ 
        
        mouse.x = e.clientX || e.pageX; 
        mouse.y = e.clientY || e.pageY;
        mouse.x-=W/2;
        mouse.y-=H/2;
      
    }, false);
  
    function randomNorm(mean, stdev) {
      
      return Math.abs(Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev)+mean;
    }

    //Setup particle class
    function Particle() {
        //using hsl is easier when we need particles with similar colors
        this.h=parseInt(45);
        this.s=parseInt(40 * Math.random() + 30);
        this.l=parseInt(40 * Math.random() + 30);
        this.a=0.5*Math.random() ;
      
        this.color = "hsla("+ this.h +","+ this.s +"%,"+ this.l +"%,"+(this.a)+")";
        this.shadowcolor = "hsla("+ this.h +","+ this.s +"%,"+ this.l +"%,"+parseFloat(this.a-0.55)+")";
      

        
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.direction = {
            "x": -1 + Math.random() * 2,
            "y": -1 + Math.random() * 2
        };
        //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
        this.radius = randomNorm(0,4);
        this.scale=0.8*Math.random()+0.5;
        this.rotation=Math.PI/4*Math.random();
      
        this.grad=ctx.createRadialGradient( this.x, this.y, this.radius, this.x, this.y, 0 );
        this.grad.addColorStop(0,this.color);
        this.grad.addColorStop(1,this.shadowcolor);
      
        this.vx = (2 * Math.random() + 4)*.01*this.radius;
        this.vy = (2 * Math.random() + 4)*.01*this.radius;
        
        this.valpha = 0.01*Math.random()-0.02;
        
        this.move = function () {
            this.x += this.vx * this.direction.x ;
            this.y += this.vy * this.direction.y ;
            this.rotation+=this.valpha;
            //this.radius*= Math.abs((this.valpha*0.01+1));

        };
        this.changeDirection = function (axis) {
            this.direction[axis] *= -1;
            this.valpha *= -1;
        };
        this.draw = function () {
            ctx.save();
            ctx.translate(this.x+mouse.rx/-20*this.radius,this.y+mouse.ry/-20*this.radius);  
          ctx.rotate(this.rotation);  
          ctx.scale(1,this.scale);
            
            this.grad=ctx.createRadialGradient( 0, 0, this.radius, 0, 0, 0 );
            this.grad.addColorStop(1,this.color);
            this.grad.addColorStop(0,this.shadowcolor);
            ctx.beginPath();
            ctx.fillStyle = this.grad;
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();

            
        };
        this.boundaryCheck = function () {
            if (this.x >= W*1.2) {
                this.x = W*1.2;
                this.changeDirection("x");
            } else if (this.x <= -W*0.2) {
                this.x = -W*0.2;
                this.changeDirection("x");
            }
            if (this.y >= H*1.2) {
                this.y = H*1.2;
                this.changeDirection("y");
            } else if (this.y <= -H*0.2) {
                this.y = -H*0.2;
                this.changeDirection("y");
            }
        };
    } //end particle class

    function clearCanvas() {
        ctx.clearRect(0, 0, W, H);
    } //end clear canvas

    function createParticles() {
        for (var i = particleCount - 1; i >= 0; i--) {
            p = new Particle();
            particles.push(p);
        }
    } // end createParticles

    function drawParticles() {
        for (var i = particleCount - 1; i >= 0; i--) {
            p = particles[i];
            p.draw();
        }

      
    } //end drawParticles

    function updateParticles() {
        for (var i = particles.length - 1; i >= 0; i--) {
            p = particles[i];
            p.move();
            p.boundaryCheck();

        }
    } //end updateParticles

    function initParticleSystem() {
        createParticles();
        drawParticles();
    }

    function animateParticles() {
        clearCanvas();
        setDelta();
        update()
        drawParticles();
        updateParticles();
        requestAnimationFrame(animateParticles);
    }
  
    initParticleSystem();
    requestAnimationFrame(animateParticles);
  
    function setDelta() {  
      this.now    =   (new Date()).getTime();  
      mouse.delta  =   (this.now-this.then)/1000;  
      this.then   =   this.now;  
    }
    function update() {  
 
    if(isNaN(mouse.delta) || mouse.delta <= 0) { return; }  
 
    var distX   =   mouse.x - (mouse.rx),  
        distY   =   mouse.y - (mouse.ry);  

    if(distX !== 0 && distY !== 0) {          
 
        mouse.rx -=  ((mouse.rx - mouse.x) / mouse.speed); 
        mouse.ry -=  ((mouse.ry - mouse.y) / mouse.speed); 
         
    }   
  
};  

});