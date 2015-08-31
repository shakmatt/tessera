var width = window.innerWidth;
var height = window.innerHeight;

changecss('#content', 'width', width + "px");
changecss('#content', 'height', height+"px");

var tempHeight = height - 30;
var tempWidth = width - 30;


changecss('.picDiv', 'width', (tempWidth/3) - 60 + "px");
changecss('.picDiv', 'height', (tempHeight/3) - 60 + "px");
changecss('.picDiv', 'background-size', tempWidth + "px "+ tempHeight + "px");

tempHeight = (tempHeight/3) - 60;
tempWidth = (tempWidth/3) - 60;

changecss('.col2','margin-left',tempWidth+"px");
changecss('.col3','margin-left',(tempWidth*2)+"px");
changecss('.row2','margin-top', tempHeight+"px");
changecss('.row3','margin-top', (tempHeight*2)+"px");

tempHeight = -tempHeight;
tempWidth = -tempWidth;

document.getElementById('one').style.backgroundPosition = "0px 0px";
document.getElementById('two').style.backgroundPosition = tempWidth + "px 0px";
document.getElementById('three').style.backgroundPosition = (tempWidth * 2) + "px " + 0 + "px";
document.getElementById('four').style.backgroundPosition = "0px " + (tempHeight)+ "px";
document.getElementById('five').style.backgroundPosition = tempWidth + "px " + (tempHeight)+ "px";
document.getElementById('six').style.backgroundPosition = (tempWidth * 2) + "px " + (tempHeight)+ "px";
document.getElementById('seven').style.backgroundPosition = "0px "+ (tempHeight *2 )+ "px";
document.getElementById('eight').style.backgroundPosition = tempWidth + "px " + (tempHeight *2 )+ "px";

var spaceArr = [
	{id:1, open:false, className: "col1 row1 picDiv", nextTo:[1,3]},
	{id:2, open:false, className: "col2 row1 picDiv", nextTo:[0,2,4]},
	{id:3, open:false, className: "col3 row1 picDiv", nextTo:[1,5]},
	{id:4, open:false, className: "col1 row2 picDiv", nextTo:[0,4,6]},
	{id:5, open:false, className: "col2 row2 picDiv", nextTo:[1,3,5,7]},
	{id:6, open:false, className: "col3 row2 picDiv", nextTo:[2,4,8]},
	{id:7, open:false, className: "col1 row3 picDiv", nextTo:[3,7]},
	{id:8, open:false, className: "col2 row3 picDiv", nextTo:[4,6,8]},
	{id:9, open:true, className: "col3 row3 picDiv", nextTo:[5,7]}];

var posArr = [
	{className:"one", position: 0},
	{className:"two", position: 1},
	{className:"three", position: 2},
	{className:"four", position: 3},
	{className:"five", position: 4},
	{className:"six", position: 5},
	{className:"seven", position: 6},
	{className:"eight", position: 7}];

function move(divId){
	for(var i = 0; i < posArr.length; i++){
		if(posArr[i].className == divId){
			var index = posArr[i].position;
			for(var j = 0; j < spaceArr[index].nextTo.length; j++){
				if(spaceArr[spaceArr[index].nextTo[j]].open){
					applyClass(divId, spaceArr[spaceArr[index].nextTo[j]].className);
					spaceArr[index].open = true;
					spaceArr[spaceArr[index].nextTo[j]].open = false;
					posArr[i].position = spaceArr[index].nextTo[j];
					return;
				}
			}
		}
	}
}

function applyClass(divId, classes){
	var el = document.getElementById(divId);
	if(el){
		el.className = "";
		el.className = classes;
	}
	return;
}