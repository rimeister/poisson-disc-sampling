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
		 Step 2
		*************/
/*
		while (active.length > 0) {

			// Get a random index
			var rand = getRandomNum(1,active.length);

			// Get the x/y object from that point in the array
			var pos = active[rand];

			// Try the number of times we've specified as the 'constant'
			for (var n = 0; n < this.constant; n++) {

				// Get a random x and y position
				var sample = [getRandomNum(0,this.canvas.width),getRandomNum(0,this.canvas.height)];

				// Get a random angle between 0 and 6.28319 radians (i.e., 2 x PI)
				var angle = getRandomNum(0,2*Math.PI);
				
				// Use trigonometry to get offset values, sides of triangle
				var offsetX = Math.cos(angle);
				var offsetY = Math.sin(angle);

				console.log('angle =' + angle);
				console.log('offsetX =' + offsetX);
				console.log('offsetY =' + offsetY);

				// Get a random amount between the spacing value and 2x the spacing value to try placing the point
				var magnitde = getRandomNum(this.spacing,2*this.spacing);

			}

		}
*/


				var angle = getRandomNum(0,2*Math.PI);
				
				// Use trigonometry to get offset values, sides of triangle
				var offsetX = Math.cos(angle);
				var offsetY = Math.sin(angle);

				console.log('angle =' + angle);
				console.log('offsetX =' + offsetX);
				console.log('offsetY =' + offsetY);

				var testX = this.canvas.width/2;
				var testY = this.canvas.height/2;

				var testCirc = 200;

				var testRadius= testCirc/2;

				var testCircle = new Circle (testX,testY, testCirc, '#548f4e', this);
				testCircle.draw();

				// Get radians from degrees
				degrees = 90;
				rads = degrees * (Math.PI/180);

				magnitude = getRandomNum(testRadius,testRadius*2);

				// How can I place this point at 45 of the bigger circle?
				var newX = testX + Math.sin(rads)*magnitude;
				var newY = testY - Math.cos(rads)*magnitude;

				var circlePoint = new Circle (newX,newY, 10, '#000', this);
				circlePoint.draw();

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