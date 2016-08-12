function MainMenu() {
  this.key_select = 13;
  this.key_up = 38;
  this.key_down = 40;
  this.selector_position = 0;
  this.keypressed = false;
}

MainMenu.prototype.update = function() {
  this.handleInput();

}
MainMenu.prototype.draw = function() {
  ctx.drawImage(MAIN_MENY_BACKGROUND.get(),(MAIN_MENY_BACKGROUND.frame_y*MAIN_MENY_BACKGROUND.width), (MAIN_MENY_BACKGROUND.frame_y*MAIN_MENY_BACKGROUND.height), MAIN_MENY_BACKGROUND.width, MAIN_MENY_BACKGROUND.height,
    0,
    0,
    w,
    h);
  ctx.drawImage(MUSHROOM.get(),(MUSHROOM.frame_y*MUSHROOM.width), (MUSHROOM.frame_y*MUSHROOM.height), MUSHROOM.width, MUSHROOM.height,
    550,
    313 + (this.selector_position*28),
    20,
    20);
}

MainMenu.prototype.handleInput = function(now, deltaTime) {
  if(keyPressed[this.key_select]) {
    this.setupMap();
    game_state = STATE_SELECT_MENU;
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

MainMenu.prototype.setupMap = function() {
  //camera = new Camera();
  //player = new Player('peach');
//  map = new Map(LEVEL1_MAP);

  //Join player to game!
//  network.joinPlayer();
}
