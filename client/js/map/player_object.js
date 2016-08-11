PlayerObject.prototype = new MapObject();
PlayerObject.prototype.constructor = PlayerObject;
function PlayerObject(type, texture, x, y, z, height, width, rotation, id, direction) {

  this.id = id;
  this.vf = 0;
  this.vd = 0;
  this.direction = direction

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

PlayerObject.prototype.changeAngle = function() {
  var r = this.direction;

  var c = Math.cos(r);
  var s = Math.sin(r);


  var new_x = this.point.x*c - player.x*c;
  var new_z = this.point.z*c - player.z*c;
  var theta = Math.atan2(-new_z, new_x);

  if(theta > 1.4+s && theta < 1.7+s) {
    this.texture.frame_x = 1;
    this.texture.frame_y = 0;
  }
  else  if(theta > 1.7+s && theta < 2+s) {
   this.texture.frame_x = 0;
   this.texture.frame_y = 3;
  }
  else if(theta > 2+s && theta < 2.3+s) {
   this.texture.frame_x = 5;
   this.texture.frame_y = 4;
  }
  else if(theta > 2.3+s && theta < 2.6+s) {
   this.texture.frame_x = 4;
   this.texture.frame_y = 4;
  }
  else if(theta > 2.6+s || theta < -2.6+s) {
   this.texture.frame_x = 3;
   this.texture.frame_y = 4;
  }
  else if(theta > -2.6+s && theta < -2.3+s) {
   this.texture.frame_x = 2;
   this.texture.frame_y = 4;
  }
  else if(theta > -2.3+s && theta < -2+s) {
   this.texture.frame_x = 1;
   this.texture.frame_y = 4;
  }
  else if(theta > -2+s && theta < -1.7+s) {
   this.texture.frame_x = 0;
   this.texture.frame_y = 4;
  }

  else if(theta > -1.7+s && theta < -1.4+s) {
   this.texture.frame_x = 0;
   this.texture.frame_y = 0;
  }
  else  if(theta > -1.4+s && theta < -1.1+s) {
    this.texture.frame_x = 5;
    this.texture.frame_y = 2;
  }
  else if(theta > -1.1+s && theta < -0.8+s) {
    this.texture.frame_x = 4;
    this.texture.frame_y = 2;
  }
  else if(theta > -0.8+s && theta < -0.5+s) {
    this.texture.frame_x = 3;
    this.texture.frame_y = 2;
  }
  else if(theta > -0.5+s && theta < 0.5+s) {
    this.texture.frame_x = 2;
    this.texture.frame_y = 2;
  }
  else if(theta > 0.5+s && theta < 0.8+s) {
    this.texture.frame_x = 1;
    this.texture.frame_y = 2;
  }
  else if(theta > 0.8+s && theta < 1.1+s) {
    this.texture.frame_x = 0;
    this.texture.frame_y = 2;
  }
  else if(theta > 1.1+s && theta < 1.4+s) {
    this.texture.frame_x = 5;
    this.texture.frame_y = 1;
  }

}
