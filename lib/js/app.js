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

		var circle1 = new Circle(200,200,50,this);
		circle1.draw();

	}

	var Circle = function(x,y,diameter,canvas) {

		// I want Circle to be a child of Canvas
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.canvas = canvas;

	}

	Circle.prototype.draw = function() {

		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(this.x,this.y,10,0,2*Math.PI);
		this.canvas.ctx.fillStyle = "black";
		this.canvas.ctx.fill();

	}

	window.Canvas = Canvas;

})(window);