import { Lightning, Utils } from "@lightningjs/sdk";

export class CarouselItem extends Lightning.Component {
  static _template() {
    return {
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
        y: 400,
        mountX: 0.5,
        text: {
          text: this.bindProp('title')
        }
      }
    }
  }
}