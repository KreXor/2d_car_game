function Physics() {

}

Physics.prototype.objectWallBounce = function(i, hit_direction) {
  if(hit_direction != -1) {

    //Add bounce
    if(hit_direction == DIRECTION_RIGHT) {
      map.mapObjects[ i ].vd = map.mapObjects[ i ].vd*-1;
      map.mapObjects[ i ].point.x = map.mapObjects[ i ].previous_x-30;
      map.mapObjects[ i ].point.z = map.mapObjects[ i ].previous_z;
    }
    else if(hit_direction == DIRECTION_LEFT) {
      map.mapObjects[ i ].vd = map.mapObjects[ i ].vd *-1;
      map.mapObjects[ i ].point.x = map.mapObjects[ i ].previous_x+30;
      map.mapObjects[ i ].point.z = map.mapObjects[ i ].previous_z;

    }
    else if(hit_direction == DIRECTION_DOWN) {
      map.mapObjects[ i ].vd = ((map.mapObjects[ i ].vd - 1.57)*-1)+1.57;
      map.mapObjects[ i ].point.x = map.mapObjects[ i ].previous_x;
      map.mapObjects[ i ].point.z = map.mapObjects[ i ].previous_z-30;
    }
    else if(hit_direction == DIRECTION_UP) {
      map.mapObjects[ i ].vd = ((map.mapObjects[ i ].vd - 1.57)*-1)+1.57;
      map.mapObjects[ i ].point.x = map.mapObjects[ i ].previous_x;
      map.mapObjects[ i ].point.z = map.mapObjects[ i ].previous_z+30;

    }
    else if(hit_direction == 0){
      console.log("0");
      map.mapObjects.splice(i, 1);
    }
  }

  map.mapObjects[ i ].previous_x = map.mapObjects[ i ].point.x;
  map.mapObjects[ i ].previous_z = map.mapObjects[ i ].point.z;

  map.mapObjects[ i ].rotate( map.mapObjects[ i ].r );

}
