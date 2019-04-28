;(function(window){

	/********************
	Object Classes
	********************/

	var Canvas = function(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	Canvas.prototype.init = function() {
		
		// Draw things on the canvas here

		for (var i = 0; i < 1000; i++) {

			(function(){
				
				var randX = getRandomNum(0,this.canvas.width);
				var randY = getRandomNum(0,this.canvas.height);

				var circle1 = new Circle(randX,randY,10,this);

				circle1.draw();

			}.bind(this))();

		}



	}

	var Circle = function(x,y,diameter,canvas) {

		// I want Circle to be a child of Canvas
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.canvas = canvas;

	}

	Circle.prototype.draw = function() {

		var radius = this.diameter/2;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(this.x,this.y,radius,0,2*Math.PI);
		this.canvas.ctx.fillStyle = "black";
		this.canvas.ctx.fill();

	}

	window.Canvas = Canvas;


	/********************
	Utility Functions
	********************/

	function getRandomNum(min,max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


})(window);