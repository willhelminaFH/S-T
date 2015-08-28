
var txtEl0 = document.getElementById('resTxt');
var txtEl1 = document.getElementById('tmpTxt');
//var txtEl1 = document.getElementById('startbtn');
//var txtEl1 = document.getElementById('stopbtn');
var resList = [];
var trnsList = [];
var disTxt = "";
var resTxt = "";

var conf   = "";
var recognition = "";
var tmpId;
var servAdr = "http://192.168.1.4:8888";
var socket = io(servAdr+"/pub")
			.on("regTmp", function(id){
				tmpId = id;
			}) 


/*
//for use with ajax, would replace initStoT
$(document).ready(function(){
    $("button").click(function(){
        $.post(servAdr,
        {
          name: "Donald Duck",
          city: "Duckburg"
        },
        function(data,status){
            //alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
*/

function initStoT(){

	txtEl0 = document.getElementById('resTxt');
	txtEl1 = document.getElementById('tmpTxt');
	btn = document.getElementById('b1');

	var voices = speechSynthesis.getVoices();

	if(voices.length){
		for (var i in voices){
			resTxt += (voices[i].name + "\n");
		}
		txtEl0.innerHTML = resTxt;
	}
	txtEl0.innerHTML += " awaiting results";

	this.speak("Speach to text initiated",
		function(){
			console.log("spoken")
	});

}

function record(callback){
        var res = [],
        	tmp_res = [],
        	trns = "",
        	tmp_trns,
        	recording;

        recognition = new webkitSpeechRecognition(),
        recognition.continuous = true;
        recognition.interimResults = true;
 		/*
        recognition.onend = function (e) {
        	trns = e.results[0][0].transcript;
        	/*
        	$.ajax({
	            url: servAdr,
	            type: 'post',
	            dataType: 'json',
	            success: function (data) {
	                console.log(data);//$('#target').html(data.msg);
	            },
	            data: {
	            	"res":res,
	            	"tmp_res":tmp_res,
	            	"trns":trns,
	            	"tmp_trns":trns
	            }
	        });
        };
 		*/
 		recognition.onspeechend = function(event){
 			console.log("end caught, restarting");
 			recognition.start();
 		}
 
        recognition.onresult = function (event) {
        	var fin;
        	var tmp;
        	/*
        	for (var i = event.resultIndex; i < event.results.length; ++i) {
		      if (event.results[i].isFinal) {
            	res.push(event.results[i]);
		        //trns += event.results[i][0].transcript;
		      } else {
		        tmp_trns += event.results[i][0].transcript;
            	tmp_res.push(event.results[i]);
		      }

		    }
		    */
		    if (event.results[0].isFinal) {
		    	resTxt = event.results[0][0].transcript;
				txtEl0.innerHTML = resTxt;
		    	//recognition.start();
		    	//record.recording ? recognition.start() : recognition.stop();// maybe not exactly right but something like this
	        }else{
		    	tmp_trns = event.results[0][0].transcript;
		    	$post(servAdr,
		    		  JSON.stringify(event, null,"\t"), 
		    		  handlePCB);
		    	
				txtEl1.innerHTML = tmp_trns;
	        }

		    //console.log(JSON.stringify(res));



        /*
        	resTxt = e.results[0][0].transcript;
        	conf = e.results[0][0].confidence;
        	txtEl0.innerHTML = resTxt;
        	dat = 
	        $.ajax({
	            url: servAdr,
	            type: 'post',
	            dataType: 'json',
	            success: function (data) {
	                console.log(data);//$('#target').html(data.msg);
	            },
	            data: JSON.stringify(e.results);
	        });
		*/
        }
 
        // start listening
        console.log("recording");
        //recording = true
        recognition.start();

}

function stop(callback){
	recognition.onend = null;
	recognition.onresult = function (event) {
	    if (event.results[0].isFinal) {
	    	resTxt = event.results[0][0].transcript;
			txtEl0.innerHTML = " final transcript: "+resTxt;
	    	recognition.stop();
        }else{
	    	tmp_trns = event.results[0][0].transcript;
			txtEl1.innerHTML = " temp transcript: "+tmp_trns;
        }

	}
}

function speak(text, callback){
    var u = new SpeechSynthesisUtterance();
    u ? console.log("u") : console.log("!u");
    u.text = text;
    u.lang = 'en-US';
 
    u.onend = function () {
        if (callback) {
            callback();
        }
    };
 
    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
 	console.log("callingSpeak")
    speechSynthesis.speak(u);
    console.log("called speak");
}

function handlePCB(data){
	$(document).append('<p>'+JSON.stringify(data))
}

function upload(data, callback){

}

socket.on('reg', function (data) {
	console.log(data);
	//socket.emit('my other event', { my: 'data' });
});

function subId(val){
	socket.emit("")
}
/*
StoT = {
	txtEl0:"",
	txt0:"",
	conf:0,
	txt1:"",
	spchRecog: function(){
		return new webkitSpeechRecognition();
	},
	init: function(){
		this.txtEl0 = document.getElementById('resTxt');
		var voices = speechSynthesis.getVoices();
		if(voices.length){
			for (var i in voices){
				this.txt0 += (voices[i].name + "\n");
			}
			this.txtEl0.innerHTML = this.txt0;
		}else{
			this.txtEl0.innerHTML += "\nawaiting results"
		}
		
		this.speak("Speach to text initiated",
			function(){
				console.log("spoken")
			});
	},

	speak : function(text, callback){
	    var u = new SpeechSynthesisUtterance();
	    u ? post("u") : post("!u");
	    u.text = text;
	    u.lang = 'en-US';
	 
	    u.onend = function () {
	        if (callback) {
	            callback();
	        }
	    };
	 
	    u.onerror = function (e) {
	        if (callback) {
	            callback(e);
	        }
	    };
	 	post("callingSpeak")
	    speechSynthesis.speak(u);
	    post("called speak");
	},

	startStoT : function(){
		StoT.txtEl0.innerHTML = "Begin speaking"
		var rec = new webkitSpeechRecognition();
		rec.continuous = false;
		rec.interimResults = false;
		rec.onend = function(){
            if (callback) {
                callback('no results');
            }
		}
		rec.onresult = function (e){
			StoT.txt0 = e.results[0][0].transcript;
			StoT.conf = e.results[0][0].confidence;
			StoT.txtEl0.innerHTML = parent.txt0;
		}
    	rec.start();

	}
}
*/
//function post(){console.log(arguments