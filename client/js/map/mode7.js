var stage_image, stage_data, ground_data, ground_image, ground_canvas;

function Mode7(map) {
  this.stageWidth = w;
  this.stageHeight = h;
  this.angle = 0;
  this.position_x = 0;
  this.position_y = 0;

  var grd = ctx.createLinearGradient(0, c.height, 0, 0);
  grd.addColorStop(0, '#8ED6FF');
  grd.addColorStop(1, '#7481D4');
  ctx.fillStyle = grd;
  ctx.fillRect( 0, 0, w, h );

  stage_image = ctx.getImageData( 0, 0, this.stageWidth, this.stageHeight );
  stage_data = stage_image.data;

  this.texture = new Image();

  this.texture.addEventListener('load', loadData, false);
  this.texture.src = map;

}

function loadData() {
  ground_canvas = document.createElement( 'canvas' );
	ground_canvas.width = this.width;
	ground_canvas.height = this.height;

	ground_context = ground_canvas.getContext( '2d' );
	ground_context.drawImage( this, 0, 0 );

	ground_image = ground_context.getImageData( 0, 0, this.width, this.height );
	ground_data = ground_image.data;

  camera.setGroundRenderer(true);
}

Mode7.prototype.draw = function() {
  var stage_index, ground_index, horizonY,
  ty, xTilt, e, d, c, zf,
  xr, yr, yd, xd, yp, xp;

  horizonY = this.stageHeight/2;

  var plane_scale=1.4;
  var plane_width=1;
  var plane_height=1;

  var cos_a=Math.cos(camera.r)*48*plane_scale*plane_width;
  var sin_a=Math.sin(camera.r)*48*plane_scale*plane_width;

  var cos_an=Math.cos(camera.r+Math.PI/2)*16*plane_scale*plane_height;
  var sin_an=Math.sin(camera.r+Math.PI/2)*16*plane_scale*plane_height;

  var cax, sax, yn, xn, rx, ry;

  var tilt=0;

  for (var x=0;x < this.stageWidth; x++) {

    xr = -((x/this.stageWidth)-0.5);

    cax = (cos_a*xr)+cos_an;
    sax = (sin_a*xr)+sin_an;

    xTilt = tilt * xr;

    xTilt -= horizonY;

    for (var y=h/2+5;y>0;y--) {

      zf=200/y;

      xd = Math.floor((camera.x/14)+cax*zf);
      yd = Math.floor((-camera.z/14)+sax*zf);

      ry=(y*0.98)-xTilt;

      stage_index = (x + Math.floor(ry) * this.stageWidth ) * 4;

      ground_index = ( (yd * ground_canvas.width) + xd) * 4;

      if(ground_index > 0 && ground_index < ground_data.length) {
        stage_data[ stage_index ] =  ground_data[ ground_index ];
        stage_data[ stage_index+1 ] = ground_data[ ground_index+1 ];
        stage_data[ stage_index+2 ] = ground_data[ ground_index+2 ];
      }
      else {
        stage_data[ stage_index ] =  129;
        stage_data[ stage_index+1 ] = 171;
        stage_data[ stage_index+2 ] = 233;
      }
    }

  }
  //var img = ground_canvas.toDataURL("image/png");
  //ctx.drawImage(img, 0, 0, img.width, img.height);
    //ctx.fillStyle = ctx.createPattern(stage_image.Image, "no-repeat");
  ctx.putImageData( stage_image, 0, 0);


}
