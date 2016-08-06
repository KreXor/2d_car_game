

function MapObject(type, texture, x, y, z, height, width, rotation) {
  this.vf = 0;
  this.vd = 0;

  this.texture = texture;

  this.type = type;
  this.rt = 0;


	var radian = radian,
			length = length;

  this.point = new Point( x, y, z );

  this.width = width;
  this. height = height;


  this.rotate(rotation * Math.PI/180);

}

MapObject.prototype.setMovement = function(vf, vd) {
  this.vf = vf;
  this.vd = vd;
}

MapObject.prototype.move = function(x, y, z) {
  this.point.x += x;
  this.point.y += y;
  this.point.z += z;
}

MapObject.prototype.moveTo = function(x, y, z) {
  this.point.x = x;
  this.point.y = y;
  this.point.z = z;
}

MapObject.prototype.setX = function(x) {
  this.point.x = x;
}

MapObject.prototype.setZ = function(z) {
  this.point.z = z;
}
//Rotates object
MapObject.prototype.rotate = function(rotation){
  this.r = rotation;

  var cos = Math.cos( rotation ) * this.width,
      sin = Math.sin( rotation ) * this.width;

    this.points = [
      new Point( this.point.x + cos, this.point.y, this.point.z + sin ),
      new Point( this.point.x + cos, this.point.y - this.height, this.point.z + sin ),
      new Point( this.point.x - cos, this.point.y - this.height, this.point.z - sin ),
      new Point( this.point.x - cos, this.point.y, this.point.z - sin ),
    ];
}

MapObject.prototype.setRelativeDist = function(){

  this.point.dimensionize();
}

MapObject.prototype.onCollision = function(x, y, z){
//  if(this.type == SOLID || this.type == COIN || this.type == BLOCK) {
    if(this.point.screen.x + this.width*this.point.screen.scale > w/2-15 &&
      this.point.screen.x - this.width*this.point.screen.scale < w/2+15  &&
      this.point.screen.y > h-50 &&
      this.point.screen.y - this.height < h) {
        if( this.type == SOLID )
         player.setCollision(true);

        return this.type;
    }
//  }
  return false;

}
MapObject.prototype.draw = function(){

  if( !this.point.drawable ) return;

  //Make all object face player
  if(this.type == COIN) {
    this.rt += 0.1;
    this.rotate( this.rt * -1  );
  }
  else if(this.type == PLAYER){
    this.rotate( this.r );
  }
  else {
    this.rotate( camera.r * -1  );
  }

  //resize object in distance to player
  for( var i = 0; i < this.points.length; ++i )
    this.points[ i ].dimensionize();

  ctx.drawImage(this.texture.get(),(this.texture.frame_x*this.texture.width), (this.texture.frame_y*this.texture.height), this.texture.width,this.texture.height,
    this.points[ 0 ].screen.x,
    this.points[ 0 ].screen.y,
    (this.points[ 2 ].screen.x - this.points[ 0 ].screen.x),
    (this.points[ 0 ].screen.y - this.points[ 1 ].screen.y));
}

PlayerObject.prototype = new MapObject();
PlayerObject.prototype.constructor = PlayerObject;
function PlayerObject(type, texture, x, y, z, height, width, rotation, id) {

  this.id = id;
  this.vf = 0;
  this.vd = 0;

  this.texture = texture;

  this.type = type;
  this.rt = 0;


	var radian = radian,
			length = length;

  this.point = new Point( x, y, z );

  this.width = width;
  this. height = height;


  this.rotate(rotation * Math.PI/180);
}

//Map function from here:
function Map(map) {
  this.mapObjects = [];
  this.road_colors = [];

  this.gravity = 600;
  this.deacceleration = 150;
  this.mode7;

  if(map == LEVEL1_MAP)
    this.loadLevel1();
}

Map.prototype.loadLevel1 = function() {
  //Load ground
  this.mode7 = new Mode7(LEVEL1_MAP);

  //Set map attributes
  this.gravity = 2000;
  this.deacceleration = 150;

  //Set player start location/rotation
  player.setX(450);
  player.setZ(-3700);
  player.setR(3.14);

  //Add item to map
  this.mapObjects = level1;
//  this.spawnItem(new PlayerObject(PLAYER, MARIO_TEXTURE, 450, 0, -3700, 55, 30, 5));
  //Add clouds
  this.setSkyProperties();
}

Map.prototype.spawnPlayer = function(data) {
  this.spawnItem(new PlayerObject(PLAYER, MARIO_TEXTURE, data.x, data.y, data.z, 55, 30, data.r, data.id));
}

Map.prototype.updatePlayer = function(data){
  for( var i = 0; i < this.mapObjects.length; ++i ) {
    if(this.mapObjects[ i ].type == PLAYER) {
      if(this.mapObjects[ i ].id == data.id) {
        this.mapObjects[ i ].moveTo(data.x, data.y, data.z);
        this.mapObjects[ i ].rotate(data.r);
      }
    }
  }
}

Map.prototype.removePlayer = function(id) {
  for( var i = 0; i < this.mapObjects.length; ++i ) {
    if(this.mapObjects[ i ].type == PLAYER) {
      if(this.mapObjects[ i ].id == id) {
        this.mapObjects.splice(i, 1);
      }
    }
  }
}
Map.prototype.spawnItem = function(object) {
  this.mapObjects.push(object);
}
Map.prototype.checkColor = function(r, g, b) {
  if(r == b && r == g && g == b)
      return ROAD;


  if(b>g+20 && b>r+20 || g>r+20 && g>b+20)
    return WALL;


  return false;
}

var angle = 0;
Map.prototype.update = function(deltaTime) {

  player.setCollision(false);

  for( var i = 0; i < this.mapObjects.length; ++i ) {
    if(this.mapObjects[ i ].vf > 0){
      this.mapObjects[ i ].move((( Math.sin(this.mapObjects[ i ].vd) * this.mapObjects[ i ].vf )*-1)*deltaTime , 0, ((Math.cos(this.mapObjects[ i ].vd) * this.mapObjects[ i ].vf)*-1)*deltaTime)

    }
    var type = this.mapObjects[ i ].onCollision(camera.x, camera.y, camera.z);

    //update coin objects
    if(type == COIN)
    {
      this.mapObjects.splice(i, 1);
      player.coins += 1;
    }
    if(type == BLOCK)
    {
      player.itemTaken();
    }
    if(type == ITEM_BANAN_PEEL)
    {
      player.itemHit(ITEM_BANAN_PEEL);
    }
  }
}

Map.prototype.draw = function() {
  if(camera.draw_mode7)
    this.mode7.draw();

  for( var i = 0; i < this.mapObjects.length; ++i )
    this.mapObjects[ i ].setRelativeDist();

  this.mapObjects.sort( function( a, b ) {
    return b.point.relativeZ - a.point.relativeZ;
  })

  for( var i = 0; i < this.mapObjects.length; ++i ) {
    this.mapObjects[ i ].draw();
  }
}


Map.prototype.setSkyProperties = function() {
  this.sky_color = "lightblue";
  this.sky_cloud_amount = 50;

  for(var i = 0; i < this.sky_cloud_amount; i++) {
    var cx = Math.floor((Math.random() * cameraSettings.renderArea) + 1 );
    var cz = Math.floor((Math.random() * cameraSettings.renderArea) + 1 );
    this.mapObjects.push( new MapObject(CLOUD, CLOUD_TEXTURE, cx, 700, cz*-1, 300, 200 ));
  }

}

Map.prototype.spawnItems = function(item) {

}
