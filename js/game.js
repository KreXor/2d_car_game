var camera = new Camera();
var player = new Player('mario');
//var player = new Player('mario');
var map = new Map(LEVEL1_MAP);
var keyPressed = {};
var coins = 0;
var ui = new Ui();

function init(){
  anim();
}

function Timer () {
  this.elapsed = 0
  this.last = null
}

Timer.prototype = {
   tick: function (now) {
     this.elapsed = ((now - this.last) / 1000)
     this.last = now
  },
  fps: function () {
    //console.log(this.last+ " " +this.elapsed);
    return 1/this.elapsed
  }
}
var timer = new Timer()
var game_state = STATE_LOAD_ASSETS;

var lastFrameTime = 0;
function anim(now){

  var deltaTime = (now - lastFrameTime)/1000;
  lastFrameTime = now;
  timer.tick(now);

  window.requestAnimationFrame( anim );
  if(game_state == STATE_LOAD_ASSETS) {
    game_state = STATE_PLAY_MAP;
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

init();



document.addEventListener('keydown', function(e) {
   keyPressed[e.keyCode] = true;
}, false);
document.addEventListener('keyup', function(e) {
   keyPressed[e.keyCode] = false;
}, false);
