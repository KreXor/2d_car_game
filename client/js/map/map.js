function WallObject(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

//Map function from here:
function Map(map) {
  this.physics = new Physics();

  this.mapObjects = [];
  this.wallObjects = [];

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
  this.wallObjects = level1_walls;

  //Add clouds
  this.setSkyProperties();
}

//Adds another network player to the map
Map.prototype.spawnNetworkPlayer = function(data) {
  this.spawnItem(new PlayerObject(PLAYER, MARIO_TEXTURE, data.x, data.y, data.z, 55, 30, data.r, data.id));
}

//Update new work player on map by id.
Map.prototype.updateNetworkPlayer = function(data){
  for( var i = 0; i < this.mapObjects.length; ++i ) {
    if(this.mapObjects[ i ].type == PLAYER) {
      if(this.mapObjects[ i ].id == data.id) {
        this.mapObjects[ i ].moveTo(data.x, data.y, data.z);
        this.mapObjects[ i ].rotate(data.r);
      }
    }
  }
}

//Remove network player from game by id
Map.prototype.removeNetworkPlayer = function(id) {
  for( var i = 0; i < this.mapObjects.length; ++i ) {
    if(this.mapObjects[ i ].type == PLAYER) {
      if(this.mapObjects[ i ].id == id) {
        this.mapObjects.splice(i, 1);
      }
    }
  }
}

//Spawn a object on map
Map.prototype.spawnItem = function(object) {
  this.mapObjects.push(object);
}

//Check color
Map.prototype.checkColor = function(r, g, b) {
  if(r == b && r == g && g == b)
      return ROAD;

  return false;
}

Map.prototype.update = function(deltaTime) {

  player.setCollision(false);

  for( var i = 0; i < this.mapObjects.length; ++i ) {

    //Update all moving objects on map
    if(this.mapObjects[ i ].vf > 0) {
      this.mapObjects[ i ].move((( Math.sin(this.mapObjects[ i ].vd) * this.mapObjects[ i ].vf )*-1)*deltaTime , 0, ((Math.cos(this.mapObjects[ i ].vd) * this.mapObjects[ i ].vf)*-1)*deltaTime);

      var hit_direction = this.mapObjects[ i ].onWallCollision();
      this.physics.objectWallBounce(i, hit_direction);
    }

    //Check if object collide with player and handle
    var type = this.mapObjects[ i ].onPlayerCollision(camera.x, camera.y, camera.z);
    this.handleObjectCollision(type, i);

    //Set new relative distance to camera
    this.mapObjects[ i ].setRelativeDist();
  }

  //Sort object after realative depth of camera. This is done so object do not overlap.
  this.mapObjects.sort( function( a, b ) {
    return b.point.relativeZ - a.point.relativeZ;
  })
}


//Handle collision with object on map
Map.prototype.handleObjectCollision = function(type, index){
  if(type == COIN)
  {
    this.mapObjects.splice(index, 1);
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
  if(type == ITEM_GREEN_SHELL)
  {
    this.mapObjects.splice(index, 1);
    player.itemHit(ITEM_GREEN_SHELL);
  }
}

//Draw all objects on map
Map.prototype.draw = function() {
  if(camera.draw_mode7)
    this.mode7.draw();

  for( var i = 0; i < this.mapObjects.length; ++i ) {
    this.mapObjects[ i ].draw();
  }
}

//Set clound an sky properties
Map.prototype.setSkyProperties = function() {
  this.sky_cloud_amount = 50;

  for(var i = 0; i < this.sky_cloud_amount; i++) {
    var cx = Math.floor((Math.random() * cameraSettings.renderArea) + 1 );
    var cz = Math.floor((Math.random() * cameraSettings.renderArea) + 1 );
    this.mapObjects.push( new MapObject(CLOUD, CLOUD_TEXTURE, cx, 700, cz*-1, 300, 200 ));
  }

}

Map.prototype.spawnItems = function(item) {

}
