var static = require('../lib/node-static');

//
// Create a node-static server to serve the current directory
//
var file = new static.Server('/media/Game.of.Thrones.S05E09.PROPER.HDTV.x264-KILLERS.mp4',
							 cache: 7200 });

var http = require('http').createServer(function (request, response) {
    file.serve(request, response, function (err, res) {
        if (err) { // An error as occured
            console.error("> Error serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        } else { // The file was served successfully
            console.log("> " + request.url + " - " + res.message);
        }
    });
}).listen(8080);

console.log("> node-static is listening on http://127.0.0.1:8080");
