function Ui(){
  this.item_to_give = ITEM_NONE;
  this.play_item_animation_time = 2000;
  this.play_item_animation_step = 100;
  this.play_item_animation_started = 0;
  this.show_item = ITEM_NONE;

}

Ui.prototype.draw = function(now, coins) {
  ctx.font = "30px mario";
  ctx.fillStyle = 'white';
  ctx.strokStyle = 'black';

  ctx.drawImage(COIN_TEXTURE.get(),30,20, 30,30);
  ctx.fillText(" x "+player.coins, 60, 45);
  ctx.strokeText(" x "+player.coins, 60, 45);


  ctx.fillText((now/1).toString().toHHMMSS() ,w-150,45);
  ctx.strokeText((now/1).toString().toHHMMSS() ,w-150,45);

  ctx.font = "20px mario";
  ctx.fillText("FPS: "+Math.floor(timer.fps(Date.now())) ,5,h-15);
  ctx.strokeText("FPS: "+Math.floor(timer.fps(Date.now())) ,5,h-15);

  //TODO: FIX THIS CLUSTER FUCK!
  //Run item animation
  var animationTimeLeft = Date.now() - this.play_item_animation_started
  if (animationTimeLeft < this.play_item_animation_time) {
      this.show_item = Math.floor(Math.random()*8)+1;
  }
  else if(player.item == ITEM_NONE && this.item_to_give != ITEM_NONE)  {
    player.item = this.item_to_give;
    this.show_item = this.item_to_give;
    this.item_to_give = ITEM_NONE;
  }
  else if(player.item == ITEM_NONE) {
    this.show_item = ITEM_NONE;
  }
  ctx.drawImage(ITEMS_TEXTURE.get(),(this.show_item*ITEMS_TEXTURE.width), (ITEMS_TEXTURE.frame_y*ITEMS_TEXTURE.height), ITEMS_TEXTURE.width, ITEMS_TEXTURE.height,
    w-300,
    10,
    80,
    80);
}

Ui.prototype.playItemAnimation = function(item) {
  this.item_to_give = item;
  this.play_item_animation_started = Date.now();
}
