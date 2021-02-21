import Phaser from "phaser";
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
    // this.addRing({ x: 400, y: 400 });
  }

  addRing({ x, y, type = "player" }) {
    const ring = new Ring(this, x, y, type);
  }
}
