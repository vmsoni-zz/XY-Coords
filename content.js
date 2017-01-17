var bubbleDOM = document.createElement('div');
var referenceMarker = document.createElement('img');
var down = [];
var referencePoint = false;
var referencePointMessage = false;

var referenceX;
var referenceY;
var firstClick = 0;
var menuXYCoords = false; 

var tempX;
var tempY;

//----------------------------------------------------------------------------------   https://jsfiddle.net/7dmxthao/

//Form DOM Attributes
var modalDialogParentDiv = document.createElement("div");
var breakElement = document.createElement("br"); 
var form = document.createElement("form");
var formInput1 = document.createElement("input");
var formInput2 = document.createElement("input");
var formInput3 = document.createElement("button");


modalDialogParentDiv.setAttribute("style","margin: 0 auto;position: absolute; left: 45%px; top: 10%; z-index: 2000; height: 500px; width: 100%;");

form.setAttribute("onsubmit","return false;")
form.setAttribute("style","text-align:left;background: -webkit-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px); background: -moz-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);background: linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);margin: auto;position: relative;width: 400px;height: 180px;font-family: Tahoma, Geneva, sans-serif;font-size: 14px;font-style: italic;line-height: 24px;font-weight: bold;color: #242729;text-decoration: none;border-radius: 10px;padding: 10px;border: 1px solid #999;border: inset 1px solid #333;-webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);");

formInput1.setAttribute("style","width: 375px;display: block;border: 1px solid #999;height: 25px;-webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);");
formInput1.setAttribute("name","xCoord");
formInput1.setAttribute("id","formXCoord");
formInput1.setAttribute("value","123");

formInput2.setAttribute("style","width: 375px;display: block;border: 1px solid #999;height: 25px;-webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);");
formInput2.setAttribute("name","yCoord");
formInput2.setAttribute("id","formYCoord");
formInput2.setAttribute("value","123");

formInput3.setAttribute("style","  width: 100px;position: absolute;background: #09C;color: #fff;font-family: Tahoma, Geneva, sans-serif;height: 30px;border-radius: 15px;border: 1p solid #999;");
formInput3.appendChild(document.createTextNode("Ok"));
formInput3.setAttribute("id","formXYCoordSubmit")
form.appendChild(document.createTextNode("X-Coordinate"));
form.appendChild(formInput1);
form.appendChild(breakElement);
form.appendChild(document.createTextNode("Y-Coordinate"));
form.appendChild(formInput2);
form.appendChild(breakElement);
form.appendChild(breakElement);
form.appendChild(formInput3);

modalDialogParentDiv.appendChild(form);
document.body.appendChild(modalDialogParentDiv);

modalDialogParentDiv.style.visibility = "hidden";

referenceMarker.setAttribute('src',chrome.extension.getURL('referenceMarker.png'));
referenceMarker.setAttribute('class','referenceMarker');
document.body.appendChild(referenceMarker);

bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);




function displayBubbleDom(x,y,reference,refX, refY){
	if (reference){
		bubbleDOM.innerHTML = "Marker is at position: <br/> X: " + refX + "<br/>Y: " + refY;
	}
	else{
		bubbleDOM.innerHTML = "Marker is at position: <br/> X: " + x + "<br/>Y: " + y;
	}
	
	bubbleDOM.style.left = (parseInt(x)+15) + 'px';
	bubbleDOM.style.top = y + 'px';
	bubbleDOM.style.visibility = 'visible';
}
	
 $(document).mousemove(function(e){
     if(menuXYCoords){
		var x = e.pageX;
		var y = e.pageY;
		if(referencePoint){
			var x = e.pageX-referenceX;
			var y = e.pageY-referenceY;
			referenceMarker.style.left = (referenceX-25) + 'px';
			referenceMarker.style.top = (referenceY-49) + 'px';
		}
		if(referencePointMessage){
			bubbleDOM.innerHTML = "Click anywhere to Place a reference marker";
			bubbleDOM.style.left = e.pageX + 'px';
			bubbleDOM.style.top = e.pageY + 'px';
			bubbleDOM.style.visibility = 'visible';
		}
		else{
			displayBubbleDom(e.pageX,e.pageY);
		}
	}
 });
	
$( document.body ).click(function() {
	if(firstClick != 0 || referenceMarker.style.visibility == 'visible'){
		firstClick+=1;
	}
	if(firstClick == 2){
		down[17] = false;
		down[81] = false;
		down[88] = false;	
		referencePoint = false;
		bubbleDOM.style.visibility = 'hidden';
		referenceMarker.style.visibility = 'hidden';
		menuXYCoords=false;
		firstClick = 0;
	}	
});	
	
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.menuOption == "displayXY"){
		menuXYCoords = true;
		firstClick = true;
		sendResponse({response: "responseRecieved"});
	}
	else if (request.menuOption == "referenceMarker"){
		sendResponse({response: "responseRecieved"});
		menuXYCoords = true;
		firstClick = 1;
		referencePointMessage = true;
		document.onclick = function(e){
				referenceX = e.pageX;
				referenceY = e.pageY;
				
				var x = e.pageX;
				var y = e.pageY;
				
				var tempX = x - referenceX;
				var tempY = y - referenceY;
				
				referencePointMessage = false;
				referencePoint = true;
				referenceMarker.style.left = (referenceX-25) + 'px';
				referenceMarker.style.top = (referenceY-49) + 'px';
				referenceMarker.style.visibility = 'visible';
				
				bubbleDOM.innerHTML = "Cursor is at position: <br/> X: " + tempX + "<br/>Y: " + tempY;
				bubbleDOM.style.left = x + 'px';
				bubbleDOM.style.top = y + 'px';
				bubbleDOM.style.visibility = 'visible';
				
				menuXYCoords = true;
				firstClick = 1;
				this.onclick = null;
		};
	}
	else if(request.menuOption == "placeMarker"){
		sendResponse({response: "responseRecieved"});
		request.menuOption = null;
		modalDialogParentDiv.style.visibility = "visible";		
		document.getElementById('formXYCoordSubmit').addEventListener('click', function(){
				var markerX = document.getElementById("formXCoord").value;
				var markerY = document.getElementById("formYCoord").value;
				modalDialogParentDiv.style.visibility = "hidden";
				
				referenceMarker.style.left = (markerX-25) + 'px';
				referenceMarker.style.top = (markerY-49) + 'px';
				referenceMarker.style.visibility = 'visible';
				
				displayBubbleDom(markerX,markerY,false);
				
				window.scrollTo(markerX,markerY-300);
				this.onClick=null;
				firstClick = 0;	
			});
			$(document).keydown(function(e) {
				var code = e.keyCode || e.which;
				if( code === 13 ) {
					var markerX = document.getElementById("formXCoord").value;
					var markerY = document.getElementById("formYCoord").value;
					modalDialogParentDiv.style.visibility = "hidden";
					
					referenceMarker.style.left = (markerX-25) + 'px';
					referenceMarker.style.top = (markerY-49) + 'px';
					referenceMarker.style.visibility = 'visible';
					
					displayBubbleDom(markerX,markerY);
					
					window.scrollTo(markerX,markerY-300);
					this.onClick=null;
					firstClick = 1;	
				}
			});	
	}
});
	
$(document).keydown(function(e) {
	if(e.keyCode==17 || e.keyCode==81 || e.keyCode==77 || e.keyCode==88){
		down[e.keyCode] = true;
	}
	else{
		down[17] = false;
		down[81] = false;
        down[77] = false;
		down[88] = false;
	}
}).keyup(function(e) {
    if(down[17] && down[77]){
		down[17] = false;
        down[77] = false;
			
			modalDialogParentDiv.style.visibility = "visible";
			window.scrollTo(0,0);

			document.getElementById('formXYCoordSubmit').addEventListener('click', function(){
				var markerX = document.getElementById("formXCoord").value;
				var markerY = document.getElementById("formYCoord").value;
				modalDialogParentDiv.style.visibility = "hidden";
				
				referenceMarker.style.left = (markerX-25) + 'px';
				referenceMarker.style.top = (markerY-49) + 'px';
				referenceMarker.style.visibility = 'visible';
				
				displayBubbleDom(markerX,markerY,false);
				
				window.scrollTo(markerX,markerY-300);
				this.onClick=null;
				firstClick = 0;	
			});
			$(document).keydown(function(e) {
				var code = e.keyCode || e.which;
				if( code === 13 ) {
					var markerX = document.getElementById("formXCoord").value;
					var markerY = document.getElementById("formYCoord").value;
					modalDialogParentDiv.style.visibility = "hidden";
					
					referenceMarker.style.left = (markerX-25) + 'px';
					referenceMarker.style.top = (markerY-49) + 'px';
					referenceMarker.style.visibility = 'visible';
					
					displayBubbleDom(markerX,markerY);
					
					window.scrollTo(markerX,markerY-300);
					this.onClick=null;
					firstClick = 1;	
				}
			});	
     }
	
	document.onclick = function(e){
		if(down[17] && down[88]){
				referenceX = e.pageX;
				referenceY = e.pageY;
				
				var x = e.pageX;
				var y = e.pageY;
				
				var tempX = x - referenceX;
				var tempY = y - referenceY;
				
				referencePoint = true;
				referenceMarker.style.left = (referenceX-25) + 'px';
				referenceMarker.style.top = (referenceY-49) + 'px';
				referenceMarker.style.visibility = 'visible';
				
				displayBubbleDom(x,y,true);
				
				firstClick = 1;
				this.onclick = null;
		}	
		if (down[17] && down[81]) { 
				var x = e.pageX + 5;
				var y = e.pageY;
				displayBubbleDom(x,y);
				firstClick = 1;
		}
    }
    
    $(document).mousemove(function(e){
        if(bubbleDOM.style.visibility == 'visible' && (!down[77]) && ((down[81] && down[17]) || (down[88] && down[17]))){
			if(referencePoint){
				var x = e.pageX - referenceX;
				var y = e.pageY - referenceY;
			}
			else{
				var x = e.pageX;
				var y = e.pageY;
			}
			displayBubbleDom(e.pageX,e.pageY,true,x,y);
        }          
    });
});

//-----------------------------------------------------------------------------------------------------------------------------