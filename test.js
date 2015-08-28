/*
var arr = [
	{
		0:"a",
		1:"b",
		2:"etc"
	},
	"sdfjkh",
	"hshfgd",
];
*/
window.onload = function(e){
	console.log("window loaded");	
	e = e || window.event; // get window.event if e argument missing (in IE)   
	if (e.preventDefault) {
		e.preventDefault(); 
		console.log("preventDefault")

	}else{
		console.log("!preventDefault")
	}
}

$(document).ready(function(){
	/*
	var status = document.getElementById('status');
	var drop   = document.getElementById('drop');
	var list   = document.getElementById('list');

		// file drop
		drop.addEventListener("dragover", FileDragHover, false);
		drop.addEventListener("dragleave", FileDragHover, false);
		drop.addEventListener("drop", FileSelectHandler, false);
		drop.style.display = "block";

	addTxtFile.bindHandler(drop, 'drop', function(txts){
		var txt = txts[0];
		drop.innerText = txt;
		console.log("txt loaded");

	});
*/
	var tstTXT = "this is a txt a text this is a txt a text this"
	MarkovNet.test(tstTXT);

	//console.log(a.val);
});