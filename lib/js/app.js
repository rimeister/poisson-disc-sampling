;(function(window){

	/********************
	Object Classes
	********************/

	var Canvas = function(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		// Spacing between points, "r"
		this.spacing = 20;
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

		// Ordered array
		var ordered = [];

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
		var randX = getRandomNumInt(0,this.canvas.width);
		var randY = getRandomNumInt(0,this.canvas.height);
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

		while (active.length > 0) {

			if (active.length > 0) {

				// Get a random index
				var randomIndex = getRandomNumInt(0,active.length-1);

				// Get the x/y object from that point in the array
				var pos = active[randomIndex];

				var found = false;

				// Try the number of times we've specified as the 'constant'
				for (var n = 0; n < this.constant; n++) {

					// Get a random angle between 0 and 6.28319 radians (i.e., 2 x PI)
					var angle = getRandomNum(0,2*Math.PI);

					// Get a random amount between the spacing value (i.e., radius) and 2x the spacing value to try placing the point
					var magnitude = getRandomNumInt(this.spacing,this.spacing*2);

					// Using trigonometry, position the sample at the correct X and Y positions
					var sample = {
						x: pos.x + Math.sin(angle)*magnitude,
						y: pos.y - Math.cos(angle)*magnitude
					}

					var col = Math.floor(sample.x/cellSize);
					var row = Math.floor(sample.y/cellSize);



			        if (col > -1 && row > -1 && col < cols && row < rows) { // && !grid[col + row * cols]) {
						var ok = true;


						for (var i = -1; i <= 1; i++) {

							for (var j = -1; j <= 1; j++) {
								
								var index = (col + i) + (row + j) * cols;
								var neighbour = grid[index];

								if (typeof neighbour !== 'undefined' && neighbour != -1) {

									var distance = getDistance(sample.x,sample.y,neighbour.x,neighbour.y);

									if (distance < this.spacing) {
			
										ok = false;

									}
								
								}

							}

						}

						if (ok) {
							found = true;
							grid[col + row * cols] = sample;
							active.push(sample);					
				            ordered.push(sample);
				            break;
						}

					}

				}

				// If we haven't found a point around the current point that works, remove it from active list
				if(!found) {
					active.splice(randomIndex,1);
				}

			}

		}
		
		//}

		/*************
		 Draw shapes to canvas
		*************/

		for (var i = 0; i < ordered.length; i++) {
			(function(){

				if (ordered[i] != -1) {

					var circle = new Circle(ordered[i].x,ordered[i].y,this.pointDiameter,'#000',this);
					circle.draw();
				}

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

	function getRandomNumInt(min,max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomNum(min,max) {
	    return Math.random() * (max - min + 1) + min;
	}

	// Uses pythagorean theorum to calculate the distance between to points
	function getDistance(ax,ay,bx,by) {
		var xLength = bx - ax;
		var yLength = by - ay;
		return Math.sqrt(xLength*xLength + yLength*yLength);
	}

})(window);