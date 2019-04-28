;(function(window){

	/********************
	Object Classes
	********************/

	var Canvas = function(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		// Spacing between points, "r"
		this.spacing = 10;
		// Number of times to try spacing before quitting, "k"
		this.constant = 30;
		this.numPoints = 1000;
		this.pointDiameter = 10;
	}

	Canvas.prototype.init = function() {
		
		/* Draw things on the canvas here */

		// Put number of points/circles on the canvas
		/*
		for (var i = 0; i < this.numPoints; i++) {

			(function(){
				
				var randX = getRandomNum(0,this.canvas.width);
				var randY = getRandomNum(0,this.canvas.height);

				var circle1 = new Circle(randX,randY,10,this);

				circle1.draw();

			}.bind(this))();

		}*/

		// 2D background grid
		// Grid cell size, 'w', is r/ sqrt(n)
		// n = number of dimensions, 2 in this case
		// cellSize is the width/height of the cell
		var cellSize = this.spacing/Math.sqrt(2);

		// 'grid' is a 1-dimensional array which will have all the cells in it
		var grid = [];

		// Array of active points
		var active = [];

		// Get number of columns
		var cols = Math.floor(this.canvas.width/cellSize);
		
		// Get number of rows
		var rows = Math.floor(this.canvas.height/cellSize);

		// Step 0
		// Number of cells is number of columns times number of rows
		// Populate each cell index with -1 to start
		for (var i = 0; i < cols*rows; i++) {
			grid[i] = -1;
		}


		/*************
		 Step 1
		*************/

		// Pick a random point, insert it into the background grid
		var randX = getRandomNum(0,this.canvas.width);
		var randY = getRandomNum(0,this.canvas.height);
		var initialCircleColumn = Math.floor(randX/cellSize);		
		var initialCircleColumn = Math.floor(randX,cellSize);
		var initialCircleRow = Math.floor(randY/cellSize);
		var pos = {
			x: randX,
			y: randY
		};


		// Find the correct position in the array for this column and row
		// At this position in the grid array, insert the randomly selected X and Y position
		// The random position is inserted as an object

		grid[initialCircleColumn+initialCircleRow * cols] = pos;

		active.push(pos);


		/*************
		 Draw shapes to canvas
		*************/

		for (var i = 0; i < grid.length; i++) {

			(function(){

				if (grid[i] != -1) {

					//console.log(grid[i]);
					var circle = new Circle(grid[i].x,grid[i].y,this.pointDiameter,'#000',this);
					circle.draw();
				}

			}.bind(this))();

		}

		// For degugging
		for (var i = 0; i < active.length; i++) {

			(function(){

				var circle = new Circle(active[i].x,active[i].y,this.pointDiameter,'#ccc',this);
				circle.draw();

			}.bind(this))();

		}


	}

	var Circle = function(x,y,diameter,colour,canvas) {

		// I want Circle to be a child of Canvas
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.colour = colour;
		this.canvas = canvas;

	}

	Circle.prototype.draw = function() {

		var radius = this.diameter/2;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(this.x,this.y,radius,0,2*Math.PI);
		this.canvas.ctx.fillStyle = this.colour;
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