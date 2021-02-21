import Phaser from "phaser";
import { Arrow } from "./Arrow";

export class Ring extends Phaser.Physics.Matter.Image {
  startx;
  starty;

  arrow;

  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture, 0, {
      circleRadius: 128,
    });
    this.setScale(0.25);
    const shape = new Phaser.Geom.Circle(128, 128, 128);
    this.setInteractive(shape, Phaser.Geom.Circle.Contains);

    this.on("drag", this.handleDrag);

    scene.input.setDraggable(this);
    scene.add.existing(this);

    this.arrow = new Arrow(scene, x, y);

    var keyObj = scene.input.keyboard.addKey("Space"); // Get key object
    keyObj.on("down", () => {
      const x = this.scene.data.get("arrowX");
      const y = this.scene.data.get("arrowY");

      const ratio = x / y;

      if (ratio > 1) {
        // x is more than y
        const xToUse = x > 0 ? 1 : -1;
        const yToUse = y > 0 ? y / x : -(y / x);
        this.applyForce(new Phaser.Math.Vector2(xToUse, yToUse));
      } else if (ratio === 1) {
        // x = y
        const xToUse = x > 0 ? 1 : -1;
        const yToUse = y > 0 ? 1 : -1;
        this.applyForce(new Phaser.Math.Vector2(xToUse, yToUse));
      } else {
        // y is more than x
        const xToUse = x > 0 ? ratio : -ratio;
        const yToUse = y > 0 ? 1 : -1;
        this.applyForce(new Phaser.Math.Vector2(xToUse, yToUse));
      }
    });

    this.scene.events.on("update", () => {
      this.arrow.handleOriginChange(this.x, this.y);
    });
  }

  handleDrag(__pointer, dragX, dragY) {
    this.setX(dragX);
    this.setY(dragY);
  }
}
