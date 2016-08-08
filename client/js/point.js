//Point function from here:
function Point( x, y, z ){

  this.x = x;
  this.y = y;
  this.z = z;

  this.screen = {};
}

Point.prototype.dimensionize = function(){

  var x = camera.x - this.x,
      y = camera.y - this.y,
      z = camera.z - this.z,
      x1 = x;

  x = x * camera.cos - z * camera.sin;
  z = z * camera.cos + x1 * camera.sin;

	z -= cameraSettings.fov;

  var scale = cameraSettings.fov / ( cameraSettings.fov + z );

  this.screen.x = cameraSettings.vpx + x * scale;
  this.screen.y = cameraSettings.vpy + y * scale;
  this.relativeZ = z;

  //player.collision = false;
  this.drawable = ( scale > 0 && z > -cameraSettings.fov * .87 ) && ( this.screen.x > 0 && this.screen.x < w );

  this.screen.scale = scale;
}
