function Minimap(){


}

Minimap.prototype.draw = function() {
  ctx.drawImage(MINIMAP_TEXTURE.get(),(MINIMAP_TEXTURE.frame_x*MINIMAP_TEXTURE.width), (MINIMAP_TEXTURE.frame_y*MINIMAP_TEXTURE.height), MINIMAP_TEXTURE.width, MINIMAP_TEXTURE.height,
    w-200,
    h-200,
    190,
    190);
}
