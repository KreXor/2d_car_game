function MainMenu() {
  this.key_select = 13;
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
}

MainMenu.prototype.handleInput = function(now, deltaTime) {
  if(keyPressed[this.key_select]) {
    this.setupMap();
    game_state = STATE_PLAY_MAP;
  }
}

MainMenu.prototype.setupMap = function() {
  camera = new Camera();
  player = new Player('mario');
  map = new Map(LEVEL1_MAP);

  //Join player to game!
  network.joinPlayer();
}
