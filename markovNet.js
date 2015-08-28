
var net ={};

function procTxt(txt){

	var words = txt.split(' ');

	for (var i in words){
		addNode(words[i]).addPrev(words[i-1])
						 .addNext(words[i+1]);
	}
	return net;
}

function initMarkovNet(){
	net = {}
	addNode(newNode("STARTNODE"));
	addNode(newNode("TERMNODE"));
}

function addNode(word, val){
	var node = net[word];
	if(net[word]){
		node.val += val||1;
		return node;
	}else{
		net[word] = newNode({id:word})
		return node;
	}
}

function newNode(args){
	var n = {
		id : args.id || " ",
		val: args.val ||1,
		next: args.next ||{},
		prev : args.prev||{},

		addNext : function(a, b){

			this.next[a] ? next[a].val +=b||1 : 
					  this.next[a] = net[a] || addNode("TERMNODE");

			return this;
		},

		addPrev : function(a, b){

			this.prev[a] ? this.prev[a].val +=b||1 : 
					  this.prev[a] = net[a] || addNode("STARTNODE");

			return this;
		}

	}
	return n;
}


function markov(){
	var terminals = {};
	var startwords = [];
	var wordstats = {};

	for (var i = 0; i < titles.length; i++) {
	    var words = titles[i].split(' ');
	    terminals[words[words.length-1]] = true;
	    startwords.push(words[0]);
	    for (var j = 0; j < words.length - 1; j++) {
	        if (wordstats.hasOwnProperty(words[j])) {
	            wordstats[words[j]].push(words[j+1]);
	        } else {
	            wordstats[words[j]] = [words[j+1]];
	        }
	    }
	}

	var choice = function (a) {
	    var i = Math.floor(a.length * Math.random());
	    return a[i];
	};

	var make_title = function (min_length) {
	    word = choice(startwords);
	    var title = [word];
	    while (wordstats.hasOwnProperty(word)) {
	        var next_words = wordstats[word];
	        word = choice(next_words);
	        title.push(word);
	        if (title.length > min_length && terminals.hasOwnProperty(word)) break;
	    }
	    if (title.length < min_length) return make_title(min_length);
	    return title.join(' ');
	};
}

function test(txt){
	console.log('testing markov net');
	var mNet = procTxt(txt)
	for(i in mNet){
		n = mNet[i];

		console.log(JSON.stringify(n));
	}
}

MarkovNet = this;

