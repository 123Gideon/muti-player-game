class Player {
  constructor() {
    this.name = null;
    this.positionx = 0;
    this.positiony = 0;
    this.index = 0;
  }
  addPlayers() {
    var node = "players/player" + this.index;
    if (this.index === 1) {
      this.positionx = width / 2 - 100;
    } else {
      this.positionx = width / 2 - 100;
    }

    database.ref(node).set({
      name: this.name,
      positionx: this.positionx,
      positiony: this.positiony,
      index: this.index,
    });
  }
  getcount() {
    var countref = database.ref("playercount");
    countref.on("value", (data) => {
      myplayercount = data.val();
    });
  }
  updatecount(count) {
    database.ref("/").update({
      playercount: count,
    });
  }
  static getPlayersInfo() {
    var node = database.ref("players");
    node.on("value", (data) => {
      allPlayers = data.val();
    });
  }
  UpdatePlayerInfo() {
    var node = "players/player" + this.index;
    database.ref(node).update({
      name: this.name,
      positionx: this.positionx,
      positiony: this.positiony,
      index: this.index,
    });
  }

  getDistance() {
    var playerDistance = database.ref("players/player" + this.index);
    playerDistance.on("value", (data) => {
      var distance = data.val();
      this.positionx = distance.positionx;
      this.positiony = distance.positiony;
    });
  }
}
