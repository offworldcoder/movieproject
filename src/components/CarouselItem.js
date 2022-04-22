import { Lightning, Utils } from "@lightningjs/sdk";

export class CarouselItem extends Lightning.Component {
  static _template() {
    return {
      flexItem: { margin: 10 },
      w: 300,
      h: 455,
      color: 0xffff0000,
      rect: true,
      Image: {
        x: 20,
        y: 20,
        w: 254,
        h: 381,
        src: this.bindProp('imageUrl')
      },
      Title: {
        x: 150,
        y: 410,
        mountX: 0.5,
        text: {
          fontSize: 25,
          text: this.bindProp('title')
        }
      }
    }
  }
}