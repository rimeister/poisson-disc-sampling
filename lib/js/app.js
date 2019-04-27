window.onload = function(){

	var canvas = document.getElementById('app-canvas');
	var ctx = canvas.getContext('2d');

};

;(function(window){

	var Canvas = function(canvas) {
		this.ele = canvas;
	}

	Canvas.prototype.init = function() {
	
	}

	var Circle = function(x,y,diameter,canvas) {

		this.x = x;
		this.y = y;
		this.diameter = diameter;

	}

	Circle.prototype.draw = function() {

		this.canvas

	}

	window.Canvas = Canvas;

})(window);