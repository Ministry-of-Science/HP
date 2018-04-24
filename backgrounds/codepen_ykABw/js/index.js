(function(){

			var d = document,
			canvas = d.getElementById( 'A4' ),
			context = canvas.getContext( '2d' ),
			dec = 0,	cx = 300,	cy = 300;

			setInterval( function() {
				context.fillStyle = "rgba(255,179,0,1)";
				context.fillRect( 0, 0, 600, 600);
				dec = dec + 0.015;
				for (var i = 1; i < 11; i++)
				for (var j = 1; j < 11; j++)
				{
					cx = -(60*i) + (100*j);
					cy = (50*i) + 10*Math.sin(i*dec) + 10*Math.cos(j*dec);

					// right
					context.beginPath();
					context.moveTo(cx,cy);
					context.lineTo(cx + 50, cy - 25);
					context.lineTo(cx + 50, cy + 50);
					context.lineTo(cx , cy + 75);
					context.closePath();
					context.fillStyle = "#385DA8";
					context.fill();

					// left
				  context.beginPath();
					context.moveTo(cx,cy);
					context.lineTo(cx , cy + 75);
					context.lineTo(cx - 50 , cy + 50 );
					context.lineTo(cx - 50 , cy - 25 );
					context.closePath();
					context.fillStyle = "#4F6592";
					context.fill();

					// top
					context.beginPath();
					context.moveTo(cx,cy);
					context.lineTo(cx - 50 , cy - 25 );
					context.lineTo(cx , cy - 50);
					context.lineTo(cx + 50, cy - 25);
					context.closePath();
					context.fillStyle = "rgba(" + (22-i) + "," + (220-i*10) + "," + (220-i*3) + ",0.85)";
					context.fill();
				}
			}, 15 );

		})()