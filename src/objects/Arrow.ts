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

    // Calculate position 50 units from origin on same angle
    const yDiff = PositionOffset * Math.sin(angle);
    const xDiff = PositionOffset * Math.cos(angle);

    // Set offset based on calculated values
    this.offsetY = yDiff;
    this.offsetX = xDiff;

    this.handleChange(this.originX, this.originY);
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
