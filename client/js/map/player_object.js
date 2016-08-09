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
