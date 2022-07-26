class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leaderBoard = createElement("h2");
  }

  getstate() {
    var stateref = database.ref("gamestate");
    stateref.on("value", (data) => {
      mygamestate = data.val();
    });
  }

  UpdateState(state) {
    database.ref("/").update({
      gamestate: state,
    });
  }

  start() {
    MyForm = new Form();
    MyForm.display();
    MyPlayer = new Player();
    MyPlayer.getcount();

    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", car1Image);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2Image);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuelGroup = new Group();
    this.addSprite(fuelGroup, 30, fuelImage, 0.02);

    CoinsGroup = new Group();
    this.addSprite(CoinsGroup, 25, CoinsImage, 0.1);
  }

  play() {
    MyForm.hide();
    MyForm.tiltleImg.position(30, 50);
    MyForm.tiltleImg.class("changeImage");
    this.resetTitle.html("resetGame");
    this.resetTitle.position(width / 2 + 200, 40);
    this.resetTitle.class("resetText");

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
    this.leaderBoard.html("leader Board");
    this.leaderBoard.class("resetText");
    this.leaderBoard.position(width / 3 - 60, 100);

    Player.getPlayersInfo();
    this.handlleResetButton();

    if (allPlayers !== undefined) {
      image(trackImage, 0, -height * 5, width, height * 6);
      var index = 0;
      for (var i in allPlayers) {
        index += 1;

        var x = allPlayers[i].positionx;
        var y = height - allPlayers[i].positiony;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === MyPlayer.index) {
          //camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
          this.handllefuel(index)
          this.handlleCoins(index)
        }
      }
      drawSprites();
      this.handllePlayersMoumentt();
    }
  }
  handllePlayersMoumentt() {
    if (keyIsDown(UP_ARROW)) {
      MyPlayer.positiony += 10;
      MyPlayer.UpdatePlayerInfo();
    }

    if (keyIsDown(LEFT_ARROW) && MyPlayer.positionx < width / 3 - 50) {
      MyPlayer.positionx -= 10;
      MyPlayer.UpdatePlayerInfo();
    }

    if (keyIsDown(RIGHT_ARROW) && MyPlayer.positionx > width / 2 + 300) {
      MyPlayer.positionx += 10;
      MyPlayer.UpdatePlayerInfo();
    }
  }
  handlleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").update({
        gamestate: 0,
        playercount: 0,
        players: {},
      });

      window.location.reload();
    });
  }
  addSprite(SpriteGroup, numberofSprites, SpriteImage, scale) {
    for (var i = 0; i < numberofSprites; i += 1) {
      var x, y;

      x = random(width / 2 + 300, width / 2 - 300);
      y = random(-height * 4.5, height - 400);

      var Sprite = createSprite(x, y);
      Sprite.addImage("Sprite", SpriteImage);
      SpriteGroup.add(Sprite);
      Sprite.scale = scale;
    }
  }

  handllefuel(index){
    cars[index-1].overlap(fuelGroup,function(collector,collected){
      collected.remove()
    })
  }

  handlleCoins(index){
    cars[index-1].overlap(CoinsGroup,function(collector,collected){
      collected.remove()
    })
  }
  end() {}
}
