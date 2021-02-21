import { BodiesFactory } from "matter";
import Phaser from "phaser";

const RotationOffset = Math.PI / 2;

const PositionOffset = 75;

const vector = new Phaser.Math.Vector2(0, 0);

export class Arrow extends Phaser.Physics.Matter.Image {
  originX;
  originY;

  offsetX;
  offsetY;

  constructor(scene, x, y) {
    super(scene.matter.world, x, y + PositionOffset, "arrow");
    this.offsetX = PositionOffset;
    this.offsetY = 0;

    this.scene.data.set("arrowRotation", 0);

    this.originY = y;
    this.originX = x;

    this.setScale(0.1);

    this.setInteractive();

    this.on("drag", this.handleDrag);

    this.scene.input.setDraggable(this);
    this.scene.add.existing(this);

    this.scene.data.events.on("changedata-magnitude", (scene, value) => {
      this.setScale(value * 0.3);
    });
  }

  handleDrag(__pointer, dragX, dragY) {
    vector.set(dragX - this.originX, dragY - this.originY);
    const angle = vector.angle();

    this.setRotation(angle);

    this.scene.data.set("arrowRotation", angle);

    const v = new Phaser.Math.Vector2(this.originX, this.originY).add(
      vector.set(PositionOffset, 0).rotate(angle)
    );

    this.setX(v.x);
    this.setY(v.y);
  }

  handleOriginChange(x, y) {
    const xDiff = this.originX - x;
    const yDiff = this.originY - y;

    console.log(xDiff, yDiff);

    this.setX(this.x + xDiff);
    this.setY(this.y + yDiff);
  }
}
