function MapTexture(path, width, height, frame_x, frame_y){
  this.image = new Image();
  this.image.src = "media/"+path

  this.frame_x = frame_x;
  this.frame_y = frame_y;

  if(width == 0) {
    this.width = this.image.width;
  }
  else {
    this.width = width;
  }

  if(height == 0) {
    this.height = this.image.height;
  }
  else {
    this.height = height;
  }
}

MapTexture.prototype.get = function() {
  return this.image;
}
