var getCanvas = document.getElementById('canv1');
var canvas = getCanvas;
var ctx = canvas.getContext('2d');


function redrawMemeText(line, width, height) {
    ctx.fillText(line, width, height);
    ctx.strokeText(line, width, height);
}

function redrawMeme(image, topLine, bottomLine) {
    if (image != null) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    
    ctx.font = '36px impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    
    if (topLine != null) {
        redrawMemeText(topLine, canvas.width/2, 40);  
    }
    
    if (bottomLine != null) {
        redrawMemeText(bottomLine, canvas.width/2, canvas.height - 20);   
    }
}

function textChangeListener(event) {
    var id = event.target.id;
    var text = event.target.value;
    
    if (id === 'topLineText') {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }
    
    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function saveFile() {
	
		window.open(getCanvas.toDataURL('image/jpeg', 1.0));
		
}

function handleFileSelect(event) {
	if(window.FileReader){
		var file = event.target.files[0]; 
		var reader = new FileReader();
			if(file){
				if(file.type.match('image.*')){
				reader.onload = function(fileObject) {
					var data = fileObject.target.result;
        
					var image = new Image();
					image.onload = function() {
						window.imageSrc = this;
						redrawMeme(window.imageSrc, null, null);
				}
        
					image.src = data;
					console.log('fileObject.target.result');
        
				} 
				document.getElementById('saveBtn').disabled = false;
				document.getElementById('topLineText').disabled = false;
				document.getElementById('bottomLineText').disabled = false;
				reader.readAsDataURL(file);
				
			}
		else{
			window.alert("To nie grafika!!!!");
		}
		}
	}
}

function main() {
    window.topLineText = '';
    window.bottomLineText = '';
    var input1 = document.getElementById('topLineText');
    var input2 = document.getElementById('bottomLineText');
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('saveBtn').addEventListener('click', saveFile, false);
}

main();
