// game.js
/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer;	// Local player

var renderer,
	stage,
	tank_texture,
	tank,
	gun_texture,
	gun;

var rotationText;

var shellSpeed = 10;
var shellDistanceLimit = 300;
var shellSize = 10;

var shellArray = [];

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {

	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor:0x22ccff});
	document.body.appendChild(renderer.view);

	stage = new PIXI.Container();

	tank_texture = PIXI.Texture.fromImage('assets/img/tank_bg.png');
	tank = new PIXI.Sprite(tank_texture);

	tank.anchor.x = 0.5;
	tank.anchor.y = 0.5;

	tank.position.x = 300;
	tank.position.y = 300;

	tank.width = 90;
	tank.height = 60;

	stage.addChild(tank);

	gun_texture = PIXI.Texture.fromImage('assets/img/gun_bg.png');
	gun = new PIXI.Sprite(gun_texture);

	gun.anchor.x = 0;
	gun.anchor.y = 0.5;

	gun.position.x = tank.position.x;
	gun.position.y = tank.position.y;

	gun.width = 80;
	gun.height = 10;

	stage.addChild(gun);

	//rotationText = new PIXI.Text('rotationText');
	//rotationText.x = 50;
	//rotationText.y = 50;

	//stage.addChild(rotationText);

	// Declare the canvas and rendering context
	//canvas = document.getElementById("gameCanvas");
	//ctx = canvas.getContext("2d");

	// Maximise the canvas
	//canvas.width = window.innerWidth - 20;
	//canvas.height = window.innerHeight - 20;

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	//var startX = Math.round(Math.random()*(canvas.width-10)),
	//	startY = Math.round(Math.random()*(canvas.height-10));

	// Initialise the local player
	localPlayer = new Player("Austin", 300, 300);

	mouseX = 0;
	mouseY = 0;

	// Start listening for events
	setEventHandlers();

	animate();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);

	// Mouse movement
	window.addEventListener("mousemove", onMouseMove, false);

	window.addEventListener("mousedown", fireShell, false);

};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	//canvas.width = window.innerWidth - 20;
	//canvas.height = window.innerHeight - 20;
};


function onMouseMove(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
	//var relX = mouseX - tank.position.x;
	//var relY = mouseY - tank.position.y;

	gun.rotation = Math.atan2(mouseY-tank.position.y, mouseX-tank.position.x);

	//rotationText.text = tank.rotation;
}

function fireShell(e){

	var shell;
	shell_texture = PIXI.Texture.fromImage('assets/img/shell_bg.png');
	shell = new PIXI.Sprite(shell_texture);

	shell.anchor.x = 0.5;
	shell.anchor.y = 0.5;

	shell.position.x = tank.position.x +
		gun.width*Math.cos(gun.rotation);
	shell.position.y = tank.position.y +
		gun.width*Math.sin(gun.rotation);

	shell.width = shellSize;
	shell.height = shellSize;

	stage.addChild(shell);

	shellArray.push(new Shell(0, shell, 
		Math.cos(gun.rotation), Math.sin(gun.rotation)));

}

/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	requestAnimationFrame(animate);

	update();
	//draw();

	//tank.rotation += 0.1;

	renderer.render(stage);

	// Request a new animation frame using Paul Irish's shim
	//window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	localPlayer.update(keys);
	updateShells();
};

function updateShells() {
	for (var i = 0; i < shellArray.length; i++) {
		var sh = shellArray[i];
		sh.sprite.position.x += sh.dx*shellSpeed;
		sh.sprite.position.y += sh.dy*shellSpeed;

		sh.travelX += sh.dx*shellSpeed;
		sh.travelY += sh.dy*shellSpeed;

		var travelH = Math.sqrt((sh.travelX*sh.travelX)+
								(sh.travelY*sh.travelY));

		if(travelH >= shellDistanceLimit){
			stage.removeChild(sh.sprite);
			shellArray.splice(i, 1);
		}
	}
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	//ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player
	//localPlayer.draw(ctx);
};