/* Canvas Settings */
var canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width = window.innerWidth,
	h = canvas.height = window.innerHeight,
	centerX = w / 2,
	centerY = h / 2;

/* Return Distance Between 2 points */
function distBetween(ax, ay, bx, by) {
	return (~~(Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))));
}

var mouse = {
	x: w,
	y: h
};

/*  pistonShape Settings */
var pTb = [],
	pNb = 13,
	pWidth = 34,
	pHeight = 230;

var pistonShape = function(x, y) {
	var self = this;
	this.speed = 35;
	this.acceleration = 0.85;
	this.limit = 0;
	this.sleeping = false;
	this.origins = {
		x: x,
		y: y
	};
	this.positions = {
		x: x,
		y: y
	};
	this.wakeUp = function() {
		self.sleeping = false;
	};
	this.drawPiston = function(c, s, ph) {
		var px = self.positions.x,
			py = self.positions.y;

		if (self.limit <= 2 / 5 && self.positions.y >= self.origins.y + self.speed / 2) {
			var opacity = 0.85;
			var changeGradiant = true;
		} else {
			var opacity = 1;
			var changeGradiant = false;
		}

		/* Top */
		grd = ctx.createLinearGradient(px - s / 4, py - s * 7 / 8, px + s / 4, py - s / 8);
    grd.addColorStop(0, "rgba(255,72,15,1)");
		grd.addColorStop(0.5, "rgba(255,134,4,1)");
		grd.addColorStop(1, "rgba(255,129,0,1)");
		c.fillStyle = grd;
		if (changeGradiant) {
      grd = ctx.createLinearGradient(px - s / 4, py - s * 7 / 8, px + s / 4, py - s / 8);
      grd.addColorStop(0, "rgba(255,72,15,1)");
      grd.addColorStop(0.5, "rgba(255,134,4,1)");
      grd.addColorStop(1, "rgba(255,129,0,1)");
			c.fillStyle = grd;
		}
		c.beginPath();
		c.moveTo(px - s / 2, py - s / 4);
		c.lineTo(px - s * 6 / 8, py - s * 5 / 8);
		c.lineTo(px - s / 4, py - s * 7 / 8);
		c.lineTo(px + s / 2, py - s * 3 / 4);
		c.lineTo(px + s * 6 / 8, py - s * 3 / 8);
		c.lineTo(px + s / 4, py - s / 8);
		c.closePath();
		c.fill();

		/* Left */
		grd = ctx.createLinearGradient(px - s / 2, py - s / 4, px - s * 6 / 8, py - s * 5 / 8 + ph);
		grd.addColorStop(0, "rgba(241,49,41," + opacity + ")");
		grd.addColorStop(0.5, "rgba(143,16,76," + opacity + ")");
		grd.addColorStop(1, "rgba(92,0,55," + opacity + ")");
		c.fillStyle = grd;
		if (changeGradiant) {
			grd = ctx.createLinearGradient(px - s / 2, py - s / 4, px - s * 6 / 8, py - s * 5 / 8 + ph);
			grd.addColorStop(0, "rgba(255,36,105," + opacity + ")");
			grd.addColorStop(0.5, "rgba(177,0,155," + opacity + ")");
			grd.addColorStop(1, "rgba(129,0,137," + opacity + ")");
			c.fillStyle = grd;
		}
		c.beginPath();
		c.moveTo(px - s / 2, py - s / 4);
		c.lineTo(px - s / 2, py + ph);
		c.lineTo(px - s * 6 / 8, py - s * 5 / 8 + ph);
		c.lineTo(px - s * 6 / 8, py - s * 5 / 8);
		c.closePath();
		c.fill();

		/* Front */
		grd = ctx.createLinearGradient(px - s / 2, py - s / 4, px + s / 4, py - s / 8 + ph + s / 4);
		grd.addColorStop(0, "rgba(255,76,21," + opacity + ")");
		grd.addColorStop(0.5, "rgba(223,42,52," + opacity + ")");
		grd.addColorStop(1, "rgba(127,11,116," + opacity + ")");
		c.fillStyle = grd;
		if (changeGradiant) {
			grd = ctx.createLinearGradient(px - s / 2, py - s / 4, px + s / 4, py - s / 8 + ph + s / 4);
			grd.addColorStop(0, "rgba(255,75,98," + opacity + ")");
			grd.addColorStop(0.5, "rgba(255,20,103," + opacity + ")");
			grd.addColorStop(1, "rgba(165,0,191," + opacity + ")");
			c.fillStyle = grd;
		}
		c.beginPath();
		c.moveTo(px + s / 4, py - s / 8);
		c.lineTo(px + s / 4, py - s / 8 + ph + s / 4);
		c.lineTo(px - s / 2, py - s / 8 + ph + s / 8);
		c.lineTo(px - s / 2, py - s / 4);
		c.closePath();
		c.fill();

		/* Right */
		grd = ctx.createLinearGradient(px + s * 6 / 8, py - s * 3 / 8, px + s / 4, py - s / 8 + ph + s / 4);
		grd.addColorStop(0, "rgba(241,49,41," + opacity + ")");
		grd.addColorStop(0.5, "rgba(143,16,105," + opacity + ")");
		grd.addColorStop(1, "rgba(92,0,55," + opacity + ")");
		c.fillStyle = grd;
		if (changeGradiant) {
			grd = ctx.createLinearGradient(px + s * 6 / 8, py - s * 3 / 8, px + s / 4, py - s / 8 + ph + s / 4);
			grd.addColorStop(0, "rgba(255,23,107," + opacity + ")");
			grd.addColorStop(0.5, "rgba(170,0,182," + opacity + ")");
			grd.addColorStop(1, "rgba(136,0,143," + opacity + ")");
			c.fillStyle = grd;
		}
		c.beginPath();
		c.moveTo(px + s * 6 / 8, py - s * 3 / 8);
		c.lineTo(px + s * 6 / 8, py - s * 3 / 8 + ph + s / 4);
		c.lineTo(px + s / 4, py - s / 8 + ph + s / 4);
		c.lineTo(px + s / 4, py - s / 8);
		c.closePath();
		c.fill();
	};
}

for (var i = pNb; i > 0; i--) {
	for (var j = 0; j < pNb; j++) {
		pTb.push(new pistonShape(
			 (i) * 50 + j * 60 + (pNb*pWidth/5),
			h / 2 - i * 40 + j * 40
		));
	}
};

var dTb = [];


/* Detections */
var detectionMouse = function(_x, _y) {
	var self = this;
	this.positions = {
		x: _x,
		y: _y
	}
	this.circleRadial = 5;
	this.acceleration = 0.25;
	this.timer = 0.05;
	this.enabled = true;
	this.printCircle = function(c) {
		c.beginPath();
		c.arc(self.positions.x, self.positions.y, self.circleRadial / 2, 0, 2 * Math.PI, false);
		c.fillStyle = 'transparent';
		c.fill();
		c.lineWidth = 15;
		c.strokeStyle = 'rgba(255,23,107,0.25)';
		c.stroke();
	};
}

dTb[0] = new detectionMouse(w / 2, h / 2);

function update() {
	for (var i = 0; i <= pTb.length - 1; i++) {
		for (var k = dTb.length - 1; k >= 0; k--) {
			if (!pTb[i].sleeping) {
				if (distBetween(dTb[k].positions.x, dTb[k].positions.y, pTb[i].origins.x, pTb[i].origins.y) < dTb[k].circleRadial / 2) {
					pTb[i].positions.y += pTb[i].speed;
					pTb[i].speed *= pTb[i].acceleration;
					pTb[i].limit += 0.08;
				}
			}
			if (pTb[i].limit >= pTb[i].speed) {
				pTb[i].positions.y = pTb[i].origins.y + (pTb[i].positions.y - pTb[i].origins.y) * (pTb[i].acceleration);
			}
			if (pTb[i].limit >= 3.75) {
				pTb[i].sleeping = true;
				dTb[k].enabled = false;
				pTb[i].limit = 0;
				pTb[i].speed = 30;
			}
			dTb[k].circleRadial += dTb[k].acceleration + dTb[k].timer;
		};
	};
}

function draw() {
	ctx.save();
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = 'rgba(42,0,113,1)';
	ctx.fillRect(0, 0, w, h);
	for (var i = 0; i <= pTb.length - 1; i++) {
		pTb[i].drawPiston(ctx, pWidth, pHeight);
	};
	for (var k = 0; k <= dTb.length - 1; k++) {
		dTb[k].printCircle(ctx);
	};
	ctx.restore();
}

window.onmousemove = function onmousemove(event) {
	mouse.x = event.x;
	mouse.y = event.y;
}

window.onclick = function onmousemove(event) {
	var rect = canvas.getBoundingClientRect();
	dTb[0] = new detectionMouse(event.x - rect.left, event.y - rect.top);
	for (var i = 0; i <= pTb.length - 1; i++) {
		pTb[i].wakeUp();
	};
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

(function loop() {
	update();
	draw();
	requestAnimFrame(loop);
})();