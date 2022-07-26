class Form {
  constructor() {
    this.tiltleImg = createImg("assets/title.png", "gameTitle");
    this.Inputbox = createInput("").attribute("placeholder", "Enter Your name");
    this.playbutton = createButton("play");
    this.greeting = createElement("h2");
  }

  setPosition() {
    this.tiltleImg.position(130, 80);
    this.Inputbox.position(width / 2 - 100, height / 2 - 80);
    this.playbutton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 90, height / 2 - 20);
  }
  setStyle() {
    this.tiltleImg.class("gameTitle");
    this.Inputbox.class("customInput");
    this.playbutton.class("customButton");
    this.greeting.class("greeting");
  }
  hide() {
    this.Inputbox.hide();
    this.playbutton.hide();
    this.greeting.hide();
  }

  handlemousebutton() {
    this.playbutton.mousePressed(() => {
      this.Inputbox.hide();
      this.playbutton.hide();
      var message = `hello ${this.Inputbox.value()} wait for other players to join`;
      this.greeting.html(message);

      myplayercount += 1;
      MyPlayer.updatecount(myplayercount);

      MyPlayer.index = myplayercount;
      MyPlayer.name = this.Inputbox.value();
      MyPlayer.addPlayers();
      MyPlayer.getDistance();
    });
  }
  display() {
    this.setPosition();
    this.setStyle();
    this.handlemousebutton();
  }
}
