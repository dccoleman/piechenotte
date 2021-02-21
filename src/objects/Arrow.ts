import Phaser from "phaser";

const RotationOffset = Math.PI / 2;

const PositionOffset = 75;

export class Arrow extends Phaser.Physics.Matter.Image {
  originX;
  originY;

  offsetX;
  offsetY;

  constructor(scene, x, y) {
    super(scene.matter.world, x, y + PositionOffset, "arrow");
    this.offsetX = 0;
    this.offsetY = PositionOffset;

    this.scene.data.set("arrowY", this.offsetX);
    this.scene.data.set("arrowX", this.offsetY);

    this.originY = y;
    this.originX = x;

    this.setScale(0.1);

    this.setInteractive();

    this.on("drag", this.handleDrag);

    scene.input.setDraggable(this);
    scene.add.existing(this);
  }

  handleDrag(__pointer, dragX, dragY) {
    // Calculate rotation toward origin
    const rotation = Math.atan2(dragY - this.originY, dragX - this.originX);
    this.setRotation(rotation - RotationOffset);

    // Calculate position 50 units from origin on same angle
    const yDiff = PositionOffset * Math.sin(rotation);
    const xDiff = PositionOffset * Math.cos(rotation);

    // Set offset based on calculated values
    this.offsetY = yDiff;
    this.offsetX = xDiff;

    this.handleChange(this.originX, this.originY);

    this.scene.data.set("arrowY", yDiff);
    this.scene.data.set("arrowX", xDiff);
  }

  handleOriginChange(x, y) {
    this.originY = y;
    this.originX = x;

    this.handleChange(x, y);
  }

  handleChange(x, y) {
    this.setY(y + this.offsetY);
    this.setX(x + this.offsetX);
  }
}
