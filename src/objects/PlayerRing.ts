import Phaser from "phaser";
import { Arrow } from "./Arrow";
import { Ring } from "./Ring";

const bottom = 0.1;
const top = 1;

export class PlayerRing extends Ring {
  startx;
  starty;

  arrow;

  magnitude;

  lastUpdate;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    const shape = new Phaser.Geom.Circle(128, 128, 128);
    this.setInteractive(shape, Phaser.Geom.Circle.Contains);

    this.on("drag", this.handleDrag);

    this.scene.input.setDraggable(this);

    this.arrow = new Arrow(scene, x, y);

    this.lastUpdate = Date.now();

    this.magnitude = 0.2;
    this.scene.data.set("magnitude", this.magnitude);

    var keyObj = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Get key object
    keyObj.on("down", () => {
      const rotation = this.scene.data.get("arrowRotation");

      const vector = new Phaser.Math.Vector2(this.magnitude, 0).setAngle(
        rotation
      );

      this.applyForce(vector.negate());
    });

    this.scene.events.on("update", () => {
      // this.arrow.handleOriginChange(this.x, this.y);

      const now = Date.now();
      const diff = now - this.lastUpdate;
      if (diff < 100) {
        return;
      }

      const upIsDown = this.scene.data.get("upIsDown");
      if (upIsDown) {
        this.magnitude = Math.min(this.magnitude + 0.1, top);
        this.scene.data.set("magnitude", this.magnitude);
        this.lastUpdate = now;
      }

      const downIsDown = this.scene.data.get("downIsDown");
      if (downIsDown) {
        this.magnitude = Math.max(this.magnitude - 0.1, bottom);
        this.scene.data.set("magnitude", this.magnitude);
        this.lastUpdate = now;
      }
    });
  }

  handleDrag(__pointer, dragX, dragY) {
    this.setX(dragX);
    this.setY(dragY);
    this.setVelocity(0);
  }
}
