function Minimap(){


}

Minimap.prototype.draw = function() {
  ctx.drawImage(MAP_TEXTURE.get(),(MAP_TEXTURE.frame_x*MAP_TEXTURE.width), (MAP_TEXTURE.frame_y*MAP_TEXTURE.height), MAP_TEXTURE.width, MAP_TEXTURE.height,
    w-200,
    h-200,
    190,
    190);
}
