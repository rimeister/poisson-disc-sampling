;(function(window){

	/********************
	Object Classes
	********************/

	var Canvas = function(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	Canvas.prototype.init = function() {
		
		// Main program goes here
		console.log('hello');

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
		this.canvas.ctx.arc(this.x,this.y,100,0,2*Math.PI);
		this.canvas.ctx.stroke();

	}

	window.Canvas = Canvas;

})(window);