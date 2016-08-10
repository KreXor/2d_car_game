function SelectMenu() {
  this.key_select = 13;
  this.key_up = 38;
  this.key_down = 40;
  this.selector_position = 0;
  this.keypressed = true;
}

SelectMenu.prototype.update = function() {
  this.handleInput();

}
SelectMenu.prototype.draw = function() {
  ctx.fillRect(0,0,w,h);
  ctx.drawImage(SELECT_MENU.get(),(SELECT_MENU.frame_y*SELECT_MENU.width), (SELECT_MENU.frame_y*SELECT_MENU.height), SELECT_MENU.width, SELECT_MENU.height,
    100,
    0,
    w-200,
    h);
}

SelectMenu.prototype.handleInput = function(now, deltaTime) {
  if(keyPressed[this.key_select]) {
    if(this.keypressed == false) {
      this.setupMap();
      game_state = STATE_PLAY_MAP;
    }
    return;
  }
  if(keyPressed[this.key_up]) {
    if(this.keypressed == false)
      this.selector_position -= 1;
    this.keypressed = true;
    if(this.selector_position<0)
      this.selector_position = 3;
    return;
  }
  if(keyPressed[this.key_down]) {
    if(this.keypressed == false)
      this.selector_position += 1;
    this.keypressed = true;
    if(this.selector_position>3)
      this.selector_position = 0;
    return;
  }
  this.keypressed = false;
}

SelectMenu.prototype.setupMap = function() {
  camera = new Camera();
  player = new Player('peach');
  map = new Map(LEVEL1_MAP);

  //Join player to game!
  network.joinPlayer();
}
