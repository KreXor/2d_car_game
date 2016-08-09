function Network() {

}

Network.prototype.onSocketConnected = function() {
  console.log("Connected to socket server");
};

Network.prototype.onSocketDisconnect = function() {
  console.log("Disconnected from socket server");
};

Network.prototype.onNewPlayer = function(data) {
  map.spawnNetworkPlayer(data);
};

Network.prototype.onMovePlayer = function(data) {
  map.updateNetworkPlayer(data);

};

Network.prototype.onRemovePlayer = function(data) {
  map.removeNetworkPlayer(data.id);
};

Network.prototype.updatePlayer = function() {
  //socket.emit("move player", {x: (player.x - Math.sin(player.r)*230), y: player.y, z: (player.z - Math.cos(player.r)*230), r: player.r});

};

Network.prototype.joinPlayer = function() {
//  (camera.x - Math.sin(camera.r)*300) , 0, (camera.z - Math.cos(camera.r)*300)
//  socket.emit("new player", {x: (player.x - Math.sin(player.r)*230), y: player.y, z: (player.z - Math.cos(player.r)*230), r: player.r});
};

//var socket;
var network = new Network();

/*socket = io.connect("http://ec2-54-229-3-1.eu-west-1.compute.amazonaws.com:8000", {transports: ["websocket"]});

socket.on("connect", network.onSocketConnected);
socket.on("disconnect", network.onSocketDisconnect);
socket.on("new player", network.onNewPlayer);
socket.on("move player", network.onMovePlayer);
socket.on("remove player", network.onRemovePlayer);*/
