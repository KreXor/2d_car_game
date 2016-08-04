var c = document.getElementById("viewport");
var w = c.width = 1350,
    h = c.height = 500,
    ctx = c.getContext( '2d' );

var cameraSettings = {
  renderArea: 7000,
  fov: 480,
  vpx: w / 2,
  vpy: h / 2
};

function Camera(){
  this.x = 450;
  this.y = 120;
  this.z = -3700;
  this.r = 3.14;

  this.cos = 1;
  this.sin = 0;

  this.draw_mode7 = false;

  this.collision = false;

}


Camera.prototype.setX = function(x) {
  this.x = x;
}

Camera.prototype.setY = function(y) {
  this.y = y;
}

Camera.prototype.setZ = function(z) {
  this.z = z;
}

Camera.prototype.setR = function(r) {
  this.r = r;
}

Camera.prototype.setGroundRenderer = function(value) {
  this.draw_mode7 = value;
}
Camera.prototype.update = function() {
  this.sin = Math.sin( this.r );
  this.cos = Math.cos( this.r );
}
