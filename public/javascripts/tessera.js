var pageWidth = (window.innerHeight * 3840 * .98)/ 544;
var pageHeight = (window.innerHeight* .94);
var v = document.getElementById('scrollBody');

//Set up scroll section and give the image size
document.getElementById('scrollSection').style.backgroundSize = pageWidth + "px " + pageHeight +"px";
document.getElementById('scrollSection').style.width = pageWidth +"px";
document.getElementById('scrollSection').style.height = pageHeight + "px";

//Foreground and Midground picture sizes
document.images[0].style.width = pageWidth +"px";
document.images[1].style.width = pageWidth +"px";

//Set up containing divs sizes
document.getElementById("first").style.width = (pageWidth/5) + "px";
document.getElementById("second").style.width = (pageWidth/5) + "px";
document.getElementById("third").style.width = (pageWidth/5) + "px";
document.getElementById("fourth").style.width = (pageWidth/5) + "px";
document.getElementById("fifth").style.width = (pageWidth/5) + "px";

document.getElementById('countdown').style.marginTop = pageHeight * 0.6993693841880984 + "px";
document.getElementById('countdown').style.marginLeft = (pageWidth/5) * 0.19858610852572406 + "px";
document.getElementById('countdown').style.height = pageHeight * 0.08165226312855971 + "px";
document.getElementById('countdown').style.width = (((pageWidth/5)+30) * 0.6359579426876426) + "px";

changecss('.countdownBox', 'width', (pageWidth/5) * 0.052259502243611596 + "px");
changecss('.countdownBox', 'background-size', (pageWidth/5) * 0.738868962490447 + "px " + pageHeight * 0.22247283287201777 + "px");
changecss('#cd2', 'margin-left', (pageWidth/5) * 0.033767678372795186 + "px");
changecss('#cd4', 'margin-left', (pageWidth/5) * 0.033767678372795186 + "px");
changecss('#cd6', 'margin-left', (pageWidth/5) * 0.033767678372795186 + "px");
changecss('#cd3', 'margin-left', (pageWidth/5) * 0.09245911935408205 + "px");
changecss('#cd5', 'margin-left', (pageWidth/5) * 0.11255892790931728 + "px");

changecss('.backgroundPosNull', 'background-position', (pageWidth/5) * -0.013667869817559955 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos0', 'background-position', (pageWidth/5) * -0.0699473337722186 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos1', 'background-position', (pageWidth/5) * -0.1246188130424584 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos2', 'background-position', (pageWidth/5) * -0.17929029231269822 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos3', 'background-position', (pageWidth/5) * -0.23396177158293804 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos4', 'background-position', (pageWidth/5) * -0.28863325085317787 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos5', 'background-position', (pageWidth/5) * -0.3441087224656271 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos6', 'background-position', (pageWidth/5) * -0.3979762093936575 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos7', 'background-position', (pageWidth/5) * -0.4518436963216879 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos8', 'background-position', (pageWidth/5) * -0.5065151755919277 + "px " + pageHeight * -0.11360314870060481 + "px");
changecss('.backgroundPos9', 'background-position', (pageWidth/5) * -0.5627946395465864 + "px " + pageHeight * -0.11360314870060481 + "px");

//Dynamically set size and margins for video based on screen size
var t = document.getElementById('video');
t.width = (pageWidth/5) * 0.684;
t.height = 0.53 * t.width;
t.style.marginLeft = (pageWidth/5) * 0.316 + "px";
t.style.marginTop = (pageWidth/5) * 0.121 + "px";

//On page load scroll page to center
function load(){
	// window.location.hash="#third";
	v = document.getElementById('scrollBody');
	v.scrollLeft = (pageWidth*2/5);
}
load();

//Buttons to scroll page to far left and far right
function scroll(e, dir){
	if(e.button == 0){
		if(dir){
			//scroll right
			// v.scrollLeft += (pageWidth*2/5);
			$('#scrollBody').animate({
				scrollLeft: v.scrollLeft + (pageWidth*2/5)
			}, 1500);
			
		}else{
			//scroll left
			// v.scrollLeft += -(pageWidth*2/5);
			$('#scrollBody').animate({
				scrollLeft: v.scrollLeft - (pageWidth*2/5)
			}, 1500);
		}
	}
}

//Click and Drag the page
$('img').on('dragstart', function(event) { event.preventDefault(); });
$('body').on('mousedown', function(e) {
	$('body').addClass("cursorPointer");//Make the cursor a move symbol
	$('body').on('mousemove', function(evt) {
		$('#scrollBody').stop(false, true).animate({
			scrollLeft: e.offsetX - evt.clientX
		});
	});
});	
$('body').on('mouseup', function() {
	$('body').off('mousemove');
	$('body').removeClass("cursorPointer"); //Remove the class that makes the cursor a move symbol
});

var v1 = document.getElementById('cd1');
var v2 = document.getElementById('cd2');
var v3 = document.getElementById('cd3');
var v4 = document.getElementById('cd4');
var v5 = document.getElementById('cd5');
var v6 = document.getElementById('cd6');

function clockTime(){
	window.setTimeout(clockTime, 1000);
	var t = new Date();
	
	var temp = checkTime(t.getHours());
	v1.className = getClass(temp.substr(0,1));
	v2.className = getClass(temp.substr(1,1));
	
	temp = checkTime(t.getMinutes());
	v3.className = getClass(temp.substr(0,1));
	v4.className = getClass(temp.substr(1));

	temp = checkTime(t.getSeconds());
	v5.className = getClass(temp.substr(0,1));
	v6.className = getClass(temp.substr(1));
}
clockTime();

function checkTime(tm){
	var temp;
	if(tm < 10){
		temp = "0" + tm.toString();
	}else{
		temp = tm.toString();
	}
	return temp;
}

function getClass(n){
	var retVal;
	switch(n){
		case "0":retVal = "countdownBox backgroundPos0"; break;
		case "1":retVal = "countdownBox backgroundPos1"; break;
		case "2":retVal = "countdownBox backgroundPos2"; break;
		case "3":retVal = "countdownBox backgroundPos3"; break;
		case "4":retVal = "countdownBox backgroundPos4"; break;
		case "5":retVal = "countdownBox backgroundPos5"; break;
		case "6":retVal = "countdownBox backgroundPos6"; break;
		case "7":retVal = "countdownBox backgroundPos7"; break;
		case "8":retVal = "countdownBox backgroundPos8"; break;
		case "9":retVal = "countdownBox backgroundPos9"; break;
		default: retVal = "countdownBox backgroundPosNull";
	}
	return retVal;
}