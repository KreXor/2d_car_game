var level1_walls = [
                    //wall around map
                    new WallObject(0, 0, 150, -7200),
                    new WallObject(0, 0, 7200, -100),
                    new WallObject(0, -7168, 7200, -62),
                    new WallObject(7168, 0, 62, -7200),

                    //Big square at start
                    new WallObject((80*14.2), (80*14.2)*-1, (58*14.2), (346*14.2)*-1),

                    //Big suare middle down
                    new WallObject((227*14.0), (0*14.2)*-1, (56*14.0), (115*14.8)*-1),
                  //  new WallObject((*14.2), (*14.2)*-1, (*14.2), (*14.2)*-1),
                  ]

var level1_checkpoints = [new WallObject(4000, -3000, 3000, -3000),
                          new WallObject(0,-2920,1200,-100)];

var level1 = 0;

function preloadLevels(){
   level1 = [
    new MapObject(SOLID, PIPE_TEXTURE, 500, 0, -1800, 100, 50),
    new MapObject(BLOCK, BRICK_TEXTURE, 2700, 0, -1650, 40, 40),
    new MapObject(COIN, COIN_TEXTURE, 400, 0, -1500, 30, 30),
    new MapObject(COIN, COIN_TEXTURE, 500, 0, -1500, 30, 30),
    new MapObject(COIN, COIN_TEXTURE, 600, 0, -1500, 30, 30),
    new MapObject(COIN, COIN_TEXTURE, 700, 0, -1500, 30, 30),
    new MapObject(COIN, COIN_TEXTURE, 800, 0, -1500, 30, 30),


    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (50*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (75*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (100*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (125*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (150*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (175*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (200*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (225*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (250*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (275*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (12*14.2), 0, (300*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (72*14.2), 0, (400*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (85*14.2), 0, (442*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (111*14.2), 0, (461*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (153*14.2), 0, (445*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (125*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (150*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (175*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (200*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (225*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (250*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (275*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (300*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (325*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (66*14.2), 0, (350*13.8)*-1, 250, 40),

    new MapObject(SOLID, TREE_TEXTURE, (150*14.2), 0, (140*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (160*14.2), 0, (160*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (155*14.2), 0, (150*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (170*14.2), 0, (145*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (180*14.2), 0, (175*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (175*14.2), 0, (170*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (165*14.2), 0, (165*13.8)*-1, 250, 40),
    new MapObject(SOLID, TREE_TEXTURE, (158*14.2), 0, (155*13.8)*-1, 250, 40),


  //  new MapObject(SOLID, TREE_TEXTURE, (*14.2), 0, (*13.8)*-1, 300, 40),
   ];
 }
