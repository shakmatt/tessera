// Based on 'JPEG Raster' by Jonathan Puckey:
		// http://www.flickr.com/photos/puckey/3179779686/in/photostream/

		// Create a raster item:
		// var raster = new Raster('/images/mona.jpg');
		// var loaded = false;

		// raster.on('load', function() {
		// 	loaded = true;
		// 	onResize();
		// });

		// // Make the raster invisible:
		// raster.visible = false;

		// var lastPos = view.center;

		


		function moveHandler(event) {
			// console.log(event, mousePos);
			event.point.x = event.event.x * 0.73;
			event.point.y = event.event.y * 0.56;

			
			if (!loaded)
				return;
			if (lastPos.getDistance(event.point) < 10)
				return;
			lastPos = event.point;
			console.log(lastPos.getDistance());



			var size = this.bounds.size.clone();
			var isLandscape = size.width > size.height;

			// If the path is in landscape orientation, we're going to
			// split the path horizontally, otherwise vertically:

			size /= isLandscape ? [2, 1] : [1, 2];

			var path = new Path.Rectangle({
				point: this.bounds.topLeft.floor(),
				size: size.ceil(),
				onMouseMove: moveHandler
			});
			path.fillColor = raster.getAverageColor(path);

			var path = new Path.Rectangle({
				point: isLandscape
					? this.bounds.topCenter.ceil()
					: this.bounds.leftCenter.ceil(),
				size: size.floor(),
				onMouseMove: moveHandler
			});
			path.fillColor = raster.getAverageColor(path);

			this.remove();
		}

		function onResize(event) {
			if (!loaded)
				return;
			project.activeLayer.removeChildren();

			// Transform the raster so that it fills the bounding rectangle
			// of the view:
			raster.fitBounds(view.bounds, true);

			// Create a path that fills the view, and fill it with
			// the average color of the raster:
			new Path.Rectangle({
				rectangle: view.bounds,
				fillColor: raster.getAverageColor(view.bounds),
				onMouseMove: moveHandler
			});
		}

		// theCanvas = document.getElementById("canvas-1");
		// context = theCanvas.getContext("2d");

		// function getMousePos(canvas, evt) {
		// 	var rect = canvas.getBoundingClientRect();
		// 	return {
		// 		x: evt.clientX - rect.left,
		// 		y: evt.clientY - rect.top
		// 	};
		// }
		
		// theCanvas.addEventListener("mousemove", function(e){
		// 	mousePos = getMousePos(theCanvas, e);
		// 	// var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		// });