import Phaser from "phaser";
import { Game } from "./Game";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "matter",
    matter: {
      enableSleeping: true,
      gravity: {
        y: 0,
      },
    },
  },
  scene: [Game],
};

export default new Phaser.Game(config);
