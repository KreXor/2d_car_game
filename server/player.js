var Player = function(startX, startY, startZ, startR) {
    var x = startX,
        y = startY,
        z = startZ,
        r = startR,
        id;

    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getZ = function() {
        return z;
    };

    var getR = function() {
        return r;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    var setZ = function(newZ) {
        z = newZ;
    };

    var setR = function(newR) {
        r = newR;
    };

    return {
        getX: getX,
        getY: getY,
        getZ: getZ,
        getR: getR,

        setX: setX,
        setY: setY,
        setZ: setZ,
        setR: setR,

        id: id
    }
};

exports.Player = Player;
