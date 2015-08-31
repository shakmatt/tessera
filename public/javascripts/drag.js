$('#foreGround').on('mousedown', function(e) {
	$('#foreGround').on('mousemove', function(evt) {
		// console.log(
		// 	e.clientX, e.clientY, e.offsetX, e.offsetY, e.pageX, e.pageY, 
		// 	evt.clientX, evt.clientY, evt.offsetX, evt.offsetY, evt.pageX, evt.pageY
		// );
		$('scrollBody').stop(false, true).animate({
			scrollLeft: e.offsetX - evt.clientX
		});
	});
});