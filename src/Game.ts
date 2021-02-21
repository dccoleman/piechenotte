import Phaser from "phaser";
import { PlayerRing } from "./objects/PlayerRing";
import { Ring } from "./objects/Ring";

export class Game extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.setBaseURL(window.location.origin);
    this.load.image("player", "control_ring.svg");
    this.load.image("arrow", "arrow.png");
  }

  create() {
    this.matter.world.setBounds(
      0,
      0,
      this.game.config.width as number,
      this.game.config.height as number
    );

    this.addRing({ x: 400, y: 100 });
    this.addRing({ x: 400, y: 400, type: "red" });
    this.addRing({ x: 300, y: 400, type: "red" });
    this.addRing({ x: 500, y: 400, type: "red" });
    this.addRing({ x: 300, y: 500, type: "red" });
    this.addRing({ x: 400, y: 500, type: "red" });
    this.addRing({ x: 500, y: 500, type: "red" });
  }

  init() {
    this.data.set("upIsDown", false);
    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    upKey.on("down", () => this.data.set("upIsDown", true));
    upKey.on("up", () => this.data.set("upIsDown", false));

    this.data.set("downIsDown", false);
    const downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    downKey.on("down", () => this.data.set("downIsDown", true));
    downKey.on("up", () => this.data.set("downIsDown", false));
  }

  addRing({ x, y, type = "player" }) {
    if (type === "player") {
      return new PlayerRing(this, x, y, type);
    }

    return new Ring(this, x, y, "player");
  }
}
