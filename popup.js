document.getElementById('displayXYCoord').addEventListener('click', function(){sendMessage('displayXY');});
document.getElementById('placeMarker').addEventListener('click', function(){sendMessage('placeMarker');});
document.getElementById('referenceMarker').addEventListener('click', function(){sendMessage('referenceMarker');});

function sendMessage(messageType){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {menuOption: messageType}, function(response) {
			window.close();
		});
	});
}
