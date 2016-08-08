var util = require("util"),
    io = require("socket.io")({
      transports  : [ 'websocket' ],
    }),
    Player = require("./player").Player;

var socket,
  players;

function init() {
  players = [];
  socket = io.listen(8000);
  util.log("Server Started");
  setEventHandlers();
};

var setEventHandlers = function() {
  socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
  util.log("New player has connected: "+client.id);
  client.on("disconnect", onClientDisconnect);
  client.on("new player", onNewPlayer);
  client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
  var removePlayer = playerById(this.id);

  if (!removePlayer) {
      util.log("Player not found: "+this.id);
      return;
  };

  players.splice(players.indexOf(removePlayer), 1);
  this.broadcast.emit("remove player", {id: this.id});

  util.log("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {
  var newPlayer = new Player(data.x, data.y, data.z, data.r);
  newPlayer.id = this.id;

  util.log("new player: "+data.x+" "+data.y+" "+data.z+" "+data.r);
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), z: newPlayer.getZ(), r: newPlayer.getR()});

  var i, existingPlayer;
  for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), z: existingPlayer.getZ(), r: existingPlayer.getR()});
  };

  players.push(newPlayer);
};

function onMovePlayer(data) {
  this.broadcast.emit("move player", {id: this.id, x: data.x, y: data.y, z: data.z, r: data.r});
  //util.log("Player moved "+this.id);

};

function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};
init();
