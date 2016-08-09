var camera;
var player;
var map;
var main_menu = new MainMenu();
var select_menu = new SelectMenu();
var keyPressed = {};
var coins = 0;
var ui = new Ui();

function init(){
  preLoadTexture();
  preloadLevels();
  anim();
}

var timer = new Timer()
var game_state = STATE_MAIN_MENU;
var lastFrameTime = 0;

function anim(now){

  var deltaTime = (now - lastFrameTime)/1000;
  lastFrameTime = now;
  timer.tick(now);

  window.requestAnimationFrame( anim );
  if(game_state == STATE_MAIN_MENU) {
    main_menu.draw();
    main_menu.update();
  }

  if(game_state == STATE_SELECT_MENU) {
    select_menu.draw();
    select_menu.update();
  }

  if(game_state == STATE_PLAY_MAP)
  {
    //Draw and updates
    map.update(deltaTime);
    map.draw();
    camera.update();
    player.update(now, deltaTime);
    player.draw();

    ui.draw(now, coins)
  }
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num/1000 / 3600);
    var minutes = Math.floor(((sec_num/1000) - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num/1000 - (hours * 3600) - (minutes * 60));
    var millisec = sec_num.toString();

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+":"+seconds+':'+millisec[millisec.length-3]+""+millisec[millisec.length-2];
}

function onloadHandler() {
    /// optionally: "this" contains current image just loaded
    preloader_images_count--;
    if (preloader_images_count === 0) init();
}

for(var i = 0; i < preloader_images_count; i++) {

    /// create a new image element
    var img = new Image();

    /// element is valid so we can push that to stack
    preloader_images.push(img);

    /// set handler and url
    img.onload = onloadHandler;
    img.src = preloader_imageURLs[i];

    /// if image is cached IE (surprise!) may not trigger onload
//    if (img.complete) onloadHandler().bind(img);
}



//init();



document.addEventListener('keydown', function(e) {
   keyPressed[e.keyCode] = true;
}, false);
document.addEventListener('keyup', function(e) {
   keyPressed[e.keyCode] = false;
}, false);
