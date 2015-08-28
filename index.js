var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    jquery = require("jquery"),
    qs = require('querystring'),

    port0 = 8888;//process.argv[2] || 8888;
    //port1 = 8887;







var clients = {};
var pubServ = http.createServer(function(request, response) {
  
  if(request.method === 'POST'){
    var body = '';
    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 1e6)
            request.connection.destroy();
    });
    request.on('end', function () {

    });
  }

  console.log('page requested');

  var uri = url.parse(request.url).pathname, 
      filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      console.log('invalid request');
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
      console.log('page returned');
    });
  });
}).listen(parseInt(port0, 10));

var io = require('socket.io')(pubServ);
var pubSoc = io.of('/pub').
                on("connection", function(soc){
                  var clnt = {
                    "tmpId" : genTmpId(),
                    "soc"   : soc,
                    "dat"   : []
                  };
                  soc.emit(regTmp)
                }).

                on("subId", function(id){

                })
                /*
                on("connection", function(soc){
                  function addCli(id){
                    console.log('adding client : ', id, "\n");

                    var cli = {
                      "id": id,
                      "soc": soc,
                      "dat": [],
                    };
                    clients[id] = cli
                  }
                  soc.emit('reg');
                  soc.on("regCli", function(id){
                    clients[id]? soc.emit("reReg") : addCli(id);
                    soc.emit('')
                  });
                });
                */

function genTmpId(){
  var id = "";
  for (var i = 0; i <12; i++){
    id += (Math.floor(Math.random()*10));
  }
  return id;
}

pubSoc.on("regCli"){

}
var prvSoc = io.of('/prv');
/*
pubSoc.on('connection', function(soc){
    socket.emit('regId',);
});
/*
io.on('connection', function (socket) {
  socket.emit('regId', { hello: 'world' });
  socket.on('regCli', function(dat){
    switch(dat.type){
      case "usr":
    }
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


/*
var privServ = http.createServer(function(req, res)){

}
*/
console.log("Static file server running at\n  => http://localhost:" + port0 + "/\nCTRL + C to shutdown")