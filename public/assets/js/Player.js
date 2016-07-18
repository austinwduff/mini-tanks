// Player.js
var Player = function(_name, startX, startY){
	var name = _name,
		x = startX,
		y = startY,
		dMove = 4;

	var shoot = function(){

	}

	var update = function(keys){

		if(keys.up){
			tank.position.y-=dMove;
			tank.rotation = 270 * (Math.PI / 180);
		}else if(keys.down){
			tank.position.y+=dMove;
			tank.rotation = 90 * (Math.PI / 180);
		}
		if(keys.left){
			tank.position.x-=dMove;
			tank.rotation = 180 * (Math.PI / 180);
		}else if(keys.right){
			tank.position.x+=dMove;
			tank.rotation = 0 * (Math.PI / 180);
		}

		if(keys.up && keys.right){
			tank.rotation = 315 * (Math.PI / 180);
		}
		if(keys.up && keys.left){
			tank.rotation = 225 * (Math.PI / 180);
		}
		if(keys.down && keys.right){
			tank.rotation = 45 * (Math.PI / 180);
		}
		if(keys.down && keys.left){
			tank.rotation = 135 * (Math.PI / 180);
		}

		if(keys.space){
			fireShell();
		}

		gun.position.x = tank.position.x;
		gun.position.y = tank.position.y;

		gun.rotation = Math.atan2(mouseY-tank.position.y, mouseX-tank.position.x);

		//if(x<0)
		//	x=0;
		//if(x>canvas.width)
		//	x=canvas.width;
		//if(y<0)
		//	y=0;
		//if(y>canvas.height)
		//	y=canvas.height;

	};

	var draw = function(ctx){
		
		// Draw Body
		//ctx.fillRect(x-10, y-10, 20, 20);

		// Draw Text
		//ctx.fillText(name, x, y-12);
		
		// Draw Gun
		//ctx.save();

		//var dX = mouseX - x;
		//var dY = mouseY - y;
		//var theta = Math.atan(dY/dX);

		//ctx.fillText(theta, x, y+15);

		//ctx.rotate(theta);
		//ctx.fillRect(100, 100, 20, 20);

		//ctx.beginPath();
		//ctx.moveTo(x, y);
		//ctx.lineTo(mouseX, mouseY);
		//ctx.stroke();

		//ctx.restore();
	};

	return{
		update: update,
		draw: draw
	}

};