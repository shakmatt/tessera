var canvas;
var context;
var proton;
var renderer;
var emitter;
var stats;
var mouseObj;
var bgImg;
var repulsionBehaviour, crossZoneBehaviour;

Main();
function Main() {
	canvas = document.getElementById("testCanvas");
	canvas.width = window.innerWidth * 0.9;
	canvas.height = window.innerHeight * 0.9;
	context = canvas.getContext('2d');
	context.canvas.width  = window.innerWidth * 0.9;
	context.canvas.height = window.innerHeight * 0.9;
	beginScene();
}

function beginScene() {
	createProton();
	createRenderer();
	tick();
	canvas.addEventListener('mousemove', mousemoveHandler, false);
}

function createProton() {
	proton = new Proton;
	emitter = new Proton.Emitter();
	emitter.damping = 0.0075;
	emitter.rate = new Proton.Rate(90);
	emitter.addInitialize(new Proton.ImageTarget('http://a-jie.github.io/Proton/example/behaviour/repulsion/image/particle.png', 60));
	emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));
	emitter.addInitialize(new Proton.Mass(1), new Proton.Radius(Proton.getSpan(5, 10)));
	mouseObj = {
		x : canvas.width / 2,
		y : canvas.height / 2
	};
	repulsionBehaviour = new Proton.Repulsion(mouseObj, 0, 0);
	crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(-2, 0, canvas.width, canvas.height), 'cross');
	emitter.addBehaviour(repulsionBehaviour, crossZoneBehaviour);
	emitter.addBehaviour(new Proton.Scale(Proton.getSpan(.1, .6)));
	emitter.addBehaviour(new Proton.Alpha(.5));
	emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));
	emitter.addBehaviour({
		initialize : function(particle) {
			particle.tha = Math.random() * Math.PI;
			particle.thaSpeed = 0.015 * Math.random() + 0.005;
		},

		applyBehaviour : function(particle) {
			particle.tha += particle.thaSpeed;
			particle.alpha = Math.abs(Math.cos(particle.tha));
		}
	});
	emitter.emit('once');
	proton.addEmitter(emitter);
}

function mousemoveHandler(e) {
	if (e.layerX || e.layerX == 0) {
		mouseObj.x = e.layerX;
		mouseObj.y = e.layerY;
	} else if (e.offsetX || e.offsetX == 0) {
		mouseObj.x = e.offsetX;
		mouseObj.y = e.offsetY;
	}

	repulsionBehaviour.reset(mouseObj, 5, 100);
}

function createRenderer() {
	renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.onProtonUpdate = function() {
		// if (bgImg)
			context.clearRect(0, 0, canvas.width, canvas.height);
	};
	renderer.start();
}

function tick() {
	requestAnimationFrame(tick);
	proton.update();
}