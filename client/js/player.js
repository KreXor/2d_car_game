function Player(texture) {
  //Map keys
  this.key_forward = 87;
  this.key_back = 83;
  this.key_left = 65;
  this.key_right = 68;
  this.key_use_item = 16  ;
  this.key_jump = 32;

  //Player behaviour
  this.acceleration = 150;
  this.deacceleration = 300;
  this.max_speed = 1000;
  this.max_back_speed = 200;
  this.offroad_max_speed = 300;
  this.jump_force = 400;
  this.jump_cooldown = 500;
  this.rotation_speed = 1;

  this.jump_cooldown_timer = 0;
  this.state = PLAYER_STATE_DRIVE;

  this.speed_bonus = 0;

  this.item = ITEM_NONE;
  this.road_type = false;

  this.coins = 0;

  this.vf = 0;
  this.vz = 0;
  this.vy = 0;
  this.x = 450;
  this.y = 0;
  this.z = -3700;
  this.r = 3.14;

  this.oldx = 0;
  this.oldy = 0;
  this.oldz = 0;

  this.animationFrame = 1;
  this.imgSprite = new Image();
  this.imgSprite_flip = new Image();

  this.loadTexture(texture);
}

Player.prototype.loadTexture = function(texture) {
  if(texture == 'mario') {
    this.imgSprite_flip.src = "media/mario_flip.png";
    this.imgSprite.src = "media/mario.png";
  }
}

Player.prototype.itemTaken = function() {
  if(this.item == ITEM_NONE) {
    ui.playItemAnimation(Math.floor(Math.random()*3)+1); //TODO: FIX THIS FUCKING SHIT!
  }
}

//TODO: IMPLEMENT ALL ITEMS.
Player.prototype.itemHit = function(item) {
  if(item == ITEM_BANAN_PEEL) {
    this.state = PLAYER_STATE_SPIN;
    console.log("You spin me round right round.");
  }

}

//Handler when player uses an item.
Player.prototype.useItem = function() {
  if(this.item != ITEM_NONE) {
    if(this.item == ITEM_GREEN_SHELL) {
      var obj = new MapObject(ITEM_GREEN_SHELL, GREEN_SHELL_TEXTURE,  (camera.x - Math.sin(camera.r)*300) , 0, (camera.z - Math.cos(camera.r)*300) , 50, 25, camera.r, 0);
      obj.setMovement(this.vf+500, camera.r);
      map.spawnItem(obj);
   }
    if(this.item == ITEM_COIN) {
      this.coins += 5;
    }
    if(this.item == ITEM_BANAN_PEEL) {
      var obj = new MapObject(ITEM_BANAN_PEEL, BANANA_PEEL_TEXTURE,  (camera.x - Math.sin(camera.r)*155) , 0, (camera.z - Math.cos(camera.r)*155) , 50, 25);
      map.spawnItem(obj);
    }

      this.item = ITEM_NONE;
  }
}

Player.prototype.setX = function(x) {
  this.x = x;
}

Player.prototype.setY = function(y) {
  this.y = y;
}

Player.prototype.setZ = function(z) {
  this.z = z;
}

Player.prototype.setR = function(r) {
  this.r = r;
}

Player.prototype.setAnimationFrame = function(frame) {
  this.animationFrame = frame;
}

Player.prototype.setCollision = function(coll) {
  this.collision = coll;
}

//Rotate camera around player.
Player.prototype.rotate = function(r){
  this.setR(camera.r + r);
  if(r > 0) {
    this.setX(camera.x + Math.cos(camera.r)*(this.rotation_speed*5.5));
    this.setZ(camera.z - Math.sin(camera.r)*(this.rotation_speed*5.5));
  }
  else {
    this.setX(camera.x - Math.cos(camera.r)*(this.rotation_speed*5.5));
    this.setZ(camera.z + Math.sin(camera.r)*(this.rotation_speed*5.5));
  }
}

Player.prototype.update = function(now, deltaTime) {

  //check wall collision with player
  this.onWallCollision();

  //Get road type that player are driving on.
  var p = ctx.getImageData(w/2,h-30,1,1).data;
  this.road_type = map.checkColor(p[0], p[1], p[2]);

  //Handle jump
  if(player.state != PLAYER_STATE_JUMP)
    this.handleInput(now, deltaTime);
  else
    this.calculateJump(deltaTime);

  //Handle knockback of player on collision
  if((this.collision && this.vf) > 0 || (this.road_type == WALL && this.vf > 0)) {
      this.vf = -300;
  }
  else {
    this.move(deltaTime);
  }


  //Update camera to follow player
  camera.setX(this.x);
  camera.setZ(this.z);
  camera.setR(this.r);

  this.oldx = this.x;
  this.oldy = this.y;
  this.oldz = this.z;

  network.updatePlayer();
}

Player.prototype.handleInput = function(now, deltaTime) {
  this.setAnimationFrame(1);

  //Turn left and right
  if(keyPressed[this.key_left]) {
    this.rotate((this.rotation_speed*deltaTime)*-1);
    this.setAnimationFrame(3);
  }
  if(keyPressed[this.key_right]) {
  this.rotate((this.rotation_speed*deltaTime));
    this.setAnimationFrame(2);

  }

  //Drive forward and backwards.
  if(keyPressed[this.key_forward]) {
      this.addForce(this.acceleration, deltaTime);
  }
  else if(keyPressed[this.key_back]) {
    this.addForce(-this.deacceleration, deltaTime);
  }
  else { //Deacceleration if player not acceleration
    if(this.vf > 0)
      this.addForce(-map.deacceleration, deltaTime);
    else if(this.vf < 0)
      this.addForce(map.deacceleration, deltaTime);
  }

  //Use item
  if(keyPressed[this.key_use_item]) {
    this.useItem();
  }

  //Jump
  if(keyPressed[this.key_jump]) {
    if(now - this.jump_cooldown_timer > this.jump_cooldown) {
      this.jump_cooldown_timer = now;
      this.vy = this.jump_force;
      this.state = PLAYER_STATE_JUMP;
    }
  }
}

Player.prototype.calculateJump = function(deltaTime) {
  //Calculate new y position for player.
  this.y += this.vy * deltaTime
  this.vy -= map.gravity * deltaTime;

  //If player is on ground change state to driving.
  if(this.y <= 0) {
    this.state = PLAYER_STATE_DRIVE;
    this.vy = 0;
  }

}

Player.prototype.addForce = function(forward_force, deltaTime) {

  //If we are off road the max speed is lowered.
  if(this.vf > this.offroad_max_speed && this.road_type != ROAD) {
    if(forward_force > 0) {
      this.vf -= (forward_force * deltaTime)*8;
    }
    else {
      this.vf += (forward_force * deltaTime)*8;
    }
  }
  else { //If we have not reached max speed add force to vf
    this.vf += forward_force * deltaTime;
  }

  //if player velocity forward is bigger the the max speed, set vf to max:sepeed
  if (this.vf > this.max_speed) {
    this.vf = this.max_speed;
  }

  //Check reverse max speed.
  if (this.vf < this.max_back_speed*-1)
  {
    this.vf = this.max_back_speed*-1;
  }
}

Player.prototype.move = function(deltaTime) {
  if(this.vf != 0) {
    this.x -= camera.sin * (this.vf * deltaTime);
    this.z -= camera.cos * (this.vf * deltaTime);
  }
}

Player.prototype.onWallCollision = function(){
  for(var wall in map.wallObjects)
  {
    if(map.wallObjects[wall].x < (player.x - Math.sin(player.r)*220) + 50 &&
       map.wallObjects[wall].x + map.wallObjects[wall].width > (player.x - Math.sin(player.r)*220)  &&
       map.wallObjects[wall].y > (player.z - Math.cos(player.r)*200) - 100 &&
       map.wallObjects[wall].y + map.wallObjects[wall].height < (player.z - Math.cos(player.r)*220)  ) {

        if(this.oldx <  map.wallObjects[wall].x)
          console.log("hit right");
        if(this.oldx >  map.wallObjects[wall].x+map.wallObjects[wall].width)
          console.log("hit left");
        if(this.oldz >  map.wallObjects[wall].y)
          console.log("hit down");
        if(this.oldz <  map.wallObjects[wall].y+map.wallObjects[wall].height)
          console.log("hit up");

         player.setCollision(true);
         return wall;
    }
  }
  return -1;
}

Player.prototype.draw = function() {
  if(this.animationFrame == 3) {
   ctx.drawImage(this.imgSprite_flip, this.imgSprite_flip.width - this.animationFrame*36,0,36,36,
     w/2-60,
     h-120-this.y,
     120,
     120);
  }
  else {
    ctx.drawImage(this.imgSprite,this.animationFrame*36,0,36,36,
      w/2-60,
      h-120-this.y,
      120,
      120);
  }

}