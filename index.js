// Iniciamos uma nova instância do socket.io passando o objeto http(o servidor http)
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arq = './comentario,txt';
var fs = require('fs');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/telao', function(req, res){
  res.sendfile('telao.html');
});
 
// Recebe comentario
io.on('connection', function(socket){
  socket.on('comentario', function(msg){
    console.log('Comentario Inserido: ' + msg);
	fs.appendFile('comentario.txt', msg + "\r\n", function (err) {
  if (err) {
    console.log('deu erro');
  } else {
    // done
  }
});
  });
});

//Envia comentario
io.on('connection', function(socket){
  socket.on('comentario', function(msg){
    io.emit('comentario', msg);
  });
});



/*   fs.unlink(arq,function(err){
        if(err) return console.log(err);
        console.log('comentarios deletados');
   });  */