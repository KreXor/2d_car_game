function MapObject(type, texture, x, y, z, height, width, rotation, in_rotation) {
  this.vf = 0;
  this.vd = 0;

  this.texture = texture;

  this.type = type;
  this.rt = 0;


	var radian = radian,
			length = length;

  this.point = new Point( x, y, z );
  this.previous_x = this.point.x;
  this.previous_z = this.point.z;

  this.width = width;
  this. height = height;

  this.in_rotation = in_rotation;
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

MapObject.prototype.onPlayerCollision = function(x, y, z){
    if(this.point.screen.x + this.width*this.point.screen.scale > w/2-15 &&
      this.point.screen.x - this.width*this.point.screen.scale < w/2+15  &&
      this.point.screen.y > h-50 &&
      this.point.screen.y - this.height < h) {
        if( this.type == SOLID )
         player.setCollision(true);

        return this.type;
    }
  return false;
}

MapObject.prototype.onWallCollision = function(){
  for(var wall in map.wallObjects)
  {

    if(map.wallObjects[wall].x < this.points[0].x + this.width &&
       map.wallObjects[wall].x + map.wallObjects[wall].width > this.points[0].x &&
       map.wallObjects[wall].y > this.points[0].z - this.height &&
       map.wallObjects[wall].y + map.wallObjects[wall].height < this.points[0].z ) {
         if(this.in_rotation != undefined)
           rotation = this.in_rotation;

         var cos = Math.cos( rotation ) * this.width,
             sin = Math.sin( rotation ) * this.width;

         if(this.previous_z - sin >  map.wallObjects[wall].y) {
          //console.log("hit down");
           return DIRECTION_UP;
         }
         if(this.previous_z - sin <  map.wallObjects[wall].y + map.wallObjects[wall].height+30) {
          // console.log("hit up");
           return DIRECTION_DOWN;
         }

         if(this.previous_x - cos <  map.wallObjects[wall].x)  {
           //console.log("hit right");
           return DIRECTION_RIGHT;
         }
         if(this.previous_x- cos >  map.wallObjects[wall].x) {
          // console.log("hit left");
           return DIRECTION_LEFT;
         }

        //console.log("no direction :(");
        return 0;
    }
  }
  return -1;
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
  if(this.texture != 0) {

  ctx.drawImage(this.texture.get(),(this.texture.frame_x*this.texture.width), (this.texture.frame_y*this.texture.height), this.texture.width,this.texture.height,
    this.points[ 0 ].screen.x,
    this.points[ 0 ].screen.y,
    (this.points[ 2 ].screen.x - this.points[ 0 ].screen.x),
    (this.points[ 0 ].screen.y - this.points[ 1 ].screen.y));
  }
}
