import Phaser from "phaser";

export class Ring extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture, 0, {
      circleRadius: 128,
    });
    this.setScale(0.25);

    this.setBounce(0.4);
    this.setFriction(0, 0.03);
    this.setMass(8);

    scene.add.existing(this);
  }
}
